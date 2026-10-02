import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { OrthographicCamera, Vector3 } from 'three';
import { ROOM_VIEW, type CameraTarget } from '../config/objects';
import { approach } from '../lib/motion';

interface CameraRigProps {
  target: CameraTarget;
  reduced: boolean;
  moving: boolean;
}

const AXES = ['x', 'y', 'z'] as const;

export function CameraRig({ target, reduced, moving }: CameraRigProps) {
  const { size, camera } = useThree();
  useLayoutEffect(() => {
    if (camera instanceof OrthographicCamera) {
      camera.zoom = Math.min(size.width / 10.5, size.height / 8.2);
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);
  const look = useRef(new Vector3(...ROOM_VIEW.lookAt));
  useFrame(({ camera, invalidate }, delta) => {
    let transitioning = false;
    for (let index = 0; index < AXES.length; index++) {
      const axis = AXES[index];
      if (!axis) continue;
      camera.position[axis] = approach(
        camera.position[axis],
        target.position[index] ?? 0,
        delta,
        reduced,
      );
      look.current[axis] = approach(
        look.current[axis],
        target.lookAt[index] ?? 0,
        delta,
        reduced,
      );
      transitioning ||=
        camera.position[axis] !== target.position[index] ||
        look.current[axis] !== target.lookAt[index];
    }
    camera.lookAt(look.current);
    if (camera instanceof OrthographicCamera) {
      const zoom =
        Math.min(size.width / 10.5, size.height / 8.2) * target.scale;
      camera.zoom = approach(camera.zoom, zoom, delta, reduced);
      camera.updateProjectionMatrix();
      transitioning ||= camera.zoom !== zoom;
    }
    if (moving || transitioning) invalidate();
  });
  return null;
}
