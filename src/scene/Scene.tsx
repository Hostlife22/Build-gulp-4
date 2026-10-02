import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import {
  OBJECTS,
  ROOM_VIEW,
  type CameraTarget,
  type ObjectId,
} from '../config/objects';
import { Icon } from '../components/Icon';
import { SceneFallback } from '../components/SceneBoundary';
import { CameraRig } from './CameraRig';
import { Lighting } from './Lighting';
import { Room } from './Room';

interface SceneProps {
  selected: ObjectId | null;
  onSelect: (id: ObjectId) => void;
  target: CameraTarget;
  reduced: boolean;
  moving: boolean;
}

export default function Scene({
  selected,
  onSelect,
  target,
  reduced,
  moving,
}: SceneProps) {
  const [lost, setLost] = useState(false);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const onLost = (event: Event) => {
      event.preventDefault();
      setLost(true);
    };
    canvas.addEventListener('webglcontextlost', onLost);
    return () => canvas.removeEventListener('webglcontextlost', onLost);
  }, [canvas]);
  if (lost) return <SceneFallback />;
  return (
    <Canvas
      orthographic
      frameloop="demand"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: ROOM_VIEW.position, zoom: 65, near: 0.1, far: 100 }}
      fallback={<SceneFallback />}
      onCreated={({ gl }) => setCanvas(gl.domElement)}
    >
      <Lighting />
      <CameraRig target={target} reduced={reduced} moving={moving} />
      <Room onSelect={onSelect} moving={moving} />
      {OBJECTS.map((object, index) => (
        <Html
          key={object.id}
          position={object.marker}
          center
          zIndexRange={[10, 0]}
        >
          <button
            tabIndex={-1}
            aria-label={`Explore ${object.label}`}
            className={`hotspot ${selected === object.id ? 'is-selected' : ''}`}
            onClick={() => onSelect(object.id)}
          >
            <span>
              {selected === object.id ? (
                <Icon name="plus" size={13} />
              ) : (
                String(index + 1).padStart(2, '0')
              )}
            </span>
          </button>
        </Html>
      ))}
    </Canvas>
  );
}
