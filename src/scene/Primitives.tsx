import { RoundedBox } from '@react-three/drei';
import type { Vec3 } from '../config/objects';

interface BoxProps {
  position: Vec3;
  size: Vec3;
  color: string;
  radius?: number;
  rotation?: Vec3;
}
interface CylinderProps {
  position: Vec3;
  radius: number;
  height: number;
  color: string;
  top?: number;
}

export function Box({ position, size, color, radius = 0, rotation }: BoxProps) {
  return radius ? (
    <RoundedBox
      args={size}
      radius={Math.min(radius, Math.min(...size) / 2 - 0.001)}
      smoothness={3}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.85} />
    </RoundedBox>
  ) : (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}
export function Cylinder({
  position,
  radius,
  height,
  color,
  top = radius,
}: CylinderProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[top, radius, height, 32]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}
