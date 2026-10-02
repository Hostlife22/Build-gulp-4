import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode } from 'react';
import type { Group } from 'three';
import type { ObjectId, Vec3 } from '../config/objects';
import { boundedDelta } from '../lib/motion';
import { Box, Cylinder } from './Primitives';
import { palette as p } from './palette';

interface RoomProps {
  onSelect: (id: ObjectId) => void;
  moving: boolean;
}
interface InteractiveProps {
  id: ObjectId;
  onSelect: RoomProps['onSelect'];
  children: ReactNode;
}

function Interactive({ id, onSelect, children }: InteractiveProps) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      {children}
    </group>
  );
}
function Shell() {
  return (
    <group>
      <Box
        position={[0, -0.19, 0]}
        size={[6.4, 0.38, 6]}
        color={p.oak}
        radius={0.08}
      />
      <Instances limit={16} range={16} frames={1} castShadow receiveShadow>
        <boxGeometry args={[0.39, 0.06, 5.9]} />
        <meshStandardMaterial roughness={0.85} />
        {Array.from({ length: 16 }, (_, i) => (
          <Instance
            key={i}
            position={[-3 + i * 0.4, 0.015, 0]}
            color={i % 3 === 0 ? '#c9a075' : p.floor}
          />
        ))}
      </Instances>
      <Box position={[-3.1, 1.7, 0]} size={[0.16, 3.4, 6]} color={p.wall} />
      <Box position={[0, 1.7, -2.95]} size={[6.35, 3.4, 0.16]} color={p.wall} />
      <Box
        position={[-2.99, 0.15, 0]}
        size={[0.06, 0.22, 5.9]}
        color={p.trim}
      />
      <Box
        position={[0, 0.15, -2.84]}
        size={[6.1, 0.22, 0.06]}
        color={p.trim}
      />
      <Box
        position={[1.42, 2.08, -2.84]}
        size={[2.08, 2.12, 0.12]}
        color={p.oak}
      />
      <Box
        position={[1.42, 2.08, -2.75]}
        size={[1.88, 1.92, 0.06]}
        color={p.sky}
      />
      <Box
        position={[1.42, 2.08, -2.68]}
        size={[0.065, 1.96, 0.08]}
        color={p.cream}
      />
      <Box
        position={[1.42, 2.08, -2.68]}
        size={[1.96, 0.065, 0.08]}
        color={p.cream}
      />
      <Box
        position={[1.42, 1.05, -2.6]}
        size={[2.25, 0.1, 0.4]}
        color={p.trim}
      />
      {[-0.03, 2.63].map((x) => (
        <group key={x}>
          {Array.from({ length: 5 }, (_, i) => (
            <Cylinder
              key={i}
              position={[x + i * 0.065, 2.02, -2.5]}
              radius={0.085}
              height={2.36}
              color={p.cream}
            />
          ))}
        </group>
      ))}
      <Box
        position={[1.4, 3.25, -2.49]}
        size={[3.2, 0.055, 0.055]}
        color={p.brass}
      />
      <Box
        position={[0, 0.075, 0.6]}
        size={[4.6, 0.045, 3.65]}
        color={p.rug}
        radius={0.02}
      />
      {Array.from({ length: 17 }, (_, i) => (
        <Box
          key={i}
          position={[-2.16 + i * 0.27, 0.103, 0.6]}
          size={[0.018, 0.008, 3.5]}
          color="#cbbd9f"
        />
      ))}
      {[-1.13, 2.33].map((z) => (
        <Box
          key={z}
          position={[0, 0.107, z]}
          size={[4.42, 0.007, 0.04]}
          color={p.oak}
        />
      ))}
    </group>
  );
}
function Sofa() {
  return (
    <group position={[-1.25, 0, -1.3]}>
      {[-1, 1].flatMap((x) =>
        [-0.43, 0.43].map((z) => (
          <Cylinder
            key={`${x}${z}`}
            position={[x, 0.2, z]}
            radius={0.07}
            height={0.35}
            color={p.walnut}
          />
        )),
      )}
      <Box
        position={[0, 0.52, 0]}
        size={[2.95, 0.48, 1.22]}
        radius={0.15}
        color={p.olive}
      />
      <Box
        position={[0, 1.02, -0.49]}
        size={[2.8, 1.05, 0.35]}
        radius={0.16}
        color={p.olive}
      />
      {[-1.38, 1.38].map((x) => (
        <Box
          key={x}
          position={[x, 0.84, 0]}
          size={[0.34, 0.69, 1.25]}
          radius={0.15}
          color={p.olive}
        />
      ))}
      {[-0.64, 0.64].map((x) => (
        <Box
          key={x}
          position={[x, 0.8, 0.06]}
          size={[1.23, 0.25, 0.93]}
          radius={0.11}
          color={p.cushion}
        />
      ))}
      <Box
        position={[-0.9, 1.13, -0.1]}
        size={[0.55, 0.58, 0.2]}
        rotation={[-0.17, 0.1, -0.15]}
        radius={0.09}
        color={p.pillow}
      />
      <Box
        position={[0.75, 1.15, -0.1]}
        size={[0.57, 0.57, 0.23]}
        rotation={[-0.2, 0, 0.18]}
        radius={0.08}
        color={p.rust}
      />
      <Box
        position={[0.17, 0.96, 0.19]}
        size={[0.56, 0.06, 0.83]}
        radius={0.02}
        color={p.pillow}
      />
      <Box
        position={[0.17, 0.69, 0.64]}
        size={[0.56, 0.58, 0.06]}
        radius={0.02}
        color={p.pillow}
      />
    </group>
  );
}
function Table({ moving }: { moving: boolean }) {
  const steam = useRef<Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!moving || !steam.current) return;
    time.current += boundedDelta(delta);
    steam.current.position.y = Math.sin(time.current * 0.8) * 0.025;
    steam.current.rotation.y = time.current * 0.15;
  });
  return (
    <group position={[0, 0, 0.75]}>
      {[-0.68, 0.68].flatMap((x) =>
        [-0.35, 0.35].map((z) => (
          <Box
            key={`${x}${z}`}
            position={[x, 0.31, z]}
            size={[0.12, 0.53, 0.12]}
            color={p.walnut}
            rotation={[0, 0, x * -0.1]}
          />
        )),
      )}
      <Box
        position={[0, 0.62, 0]}
        size={[2, 0.16, 1.2]}
        color={p.oak}
        radius={0.2}
      />
      <Box
        position={[-0.32, 0.735, 0.03]}
        size={[0.62, 0.055, 0.44]}
        color={p.rust}
        rotation={[0, -0.12, 0]}
      />
      <Box
        position={[-0.32, 0.77, 0.03]}
        size={[0.58, 0.035, 0.42]}
        color={p.cream}
        rotation={[0, -0.12, 0]}
      />
      <Cylinder
        position={[0.47, 0.725, 0.07]}
        radius={0.21}
        height={0.025}
        color={p.pillow}
      />
      <Cylinder
        position={[0.47, 0.82, 0.07]}
        radius={0.1}
        height={0.18}
        color={p.cream}
        top={0.13}
      />
      <Cylinder
        position={[0.47, 0.914, 0.07]}
        radius={0.102}
        height={0.003}
        color={p.walnut}
      />
      <mesh position={[0.6, 0.83, 0.07]}>
        <torusGeometry args={[0.065, 0.018, 8, 20]} />
        <meshStandardMaterial color={p.cream} />
      </mesh>
      <group ref={steam}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0.47 + i * 0.025, 1 + i * 0.07, 0.07]}
            scale={[0.012, 0.065, 0.012]}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
              color={p.cream}
              transparent
              opacity={0.22 - i * 0.04}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
function Lamp() {
  return (
    <group position={[-2.5, 0, -1.85]}>
      <Cylinder
        position={[0, 0.1, 0]}
        radius={0.29}
        height={0.1}
        color={p.brass}
      />
      <Cylinder
        position={[0, 1.1, 0]}
        radius={0.025}
        height={2.1}
        color={p.brass}
      />
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.6, 40, 1, true]} />
        <meshStandardMaterial
          color={p.cream}
          side={2}
          emissive="#f5bc60"
          emissiveIntensity={0.2}
        />
      </mesh>
      {Array.from({ length: 32 }, (_, i) => {
        const a = (i * Math.PI) / 16;
        return (
          <Box
            key={i}
            position={[Math.cos(a) * 0.4, 2.3, Math.sin(a) * 0.4]}
            size={[0.012, 0.6, 0.013]}
            rotation={[Math.sin(a) * -0.32, 0, Math.cos(a) * 0.32]}
            color={p.pillow}
          />
        );
      })}
      <pointLight
        position={[0, 2.05, 0]}
        intensity={2.5}
        color="#ffd68a"
        distance={4}
      />
    </group>
  );
}
function Plant({ moving }: { moving: boolean }) {
  const leaves = useRef<Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!moving || !leaves.current) return;
    time.current += boundedDelta(delta);
    leaves.current.rotation.z = Math.sin(time.current * 0.5) * 0.015;
  });
  return (
    <group position={[2.18, 0, -1.95]}>
      <Cylinder
        position={[0, 0.33, 0]}
        radius={0.28}
        top={0.38}
        height={0.6}
        color={p.rust}
      />
      <Cylinder
        position={[0, 0.64, 0]}
        radius={0.36}
        height={0.06}
        color={p.walnut}
      />
      <Cylinder
        position={[0, 1.2, 0]}
        radius={0.035}
        height={1.2}
        color={p.stem}
      />
      <group ref={leaves}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = i * 2.4;
          const position: Vec3 = [
            Math.cos(a) * 0.28,
            1 + i * 0.12,
            Math.sin(a) * 0.28,
          ];
          return (
            <mesh
              key={i}
              position={position}
              rotation={[0.4, -a, 0.5]}
              scale={[0.23, 0.08, 0.4]}
              castShadow
            >
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial
                color={i % 2 ? p.green : '#71814d'}
                roughness={0.85}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
function Records() {
  return (
    <group position={[2.5, 0, 0.25]}>
      <Box
        position={[0, 0.65, 0]}
        size={[0.9, 0.85, 1.55]}
        color={p.walnut}
        radius={0.04}
      />
      <Box
        position={[-0.46, 0.65, 0]}
        size={[0.015, 0.61, 1.3]}
        color={p.ink}
      />
      {Array.from({ length: 11 }, (_, i) => (
        <Box
          key={i}
          position={[-0.48, 0.65, -0.5 + i * 0.075]}
          size={[0.025, 0.52, 0.035]}
          color={[p.rust, p.pillow, p.olive][i % 3] ?? p.oak}
        />
      ))}
      <Box position={[0, 1.1, 0]} size={[0.77, 0.1, 0.94]} color={p.oak} />
      <Cylinder
        position={[0, 1.16, 0.1]}
        radius={0.31}
        height={0.025}
        color={p.ink}
      />
      <Cylinder
        position={[0, 1.175, 0.1]}
        radius={0.09}
        height={0.01}
        color={p.rust}
      />
      <Box
        position={[0.24, 1.2, 0]}
        size={[0.025, 0.03, 0.48]}
        color={p.brass}
        rotation={[0, 0.3, 0]}
      />
      {[-0.3, 0.3].flatMap((x) =>
        [-0.6, 0.6].map((z) => (
          <Cylinder
            key={`${x}${z}`}
            position={[x, 0.14, z]}
            radius={0.045}
            height={0.28}
            color={p.walnut}
          />
        )),
      )}
    </group>
  );
}
function Art() {
  return (
    <group position={[-1.4, 2.35, -2.8]}>
      <Box position={[0, 0, 0]} size={[1.15, 1.36, 0.085]} color={p.oak} />
      <Box position={[0, 0, 0.052]} size={[1.01, 1.22, 0.02]} color={p.cream} />
      <mesh position={[0.12, 0.19, 0.068]}>
        <circleGeometry args={[0.27, 40]} />
        <meshBasicMaterial color={p.rust} />
      </mesh>
      <Box
        position={[-0.18, -0.24, 0.08]}
        size={[0.58, 0.44, 0.01]}
        color={p.olive}
      />
      <Box
        position={[0.25, -0.33, 0.09]}
        size={[0.32, 0.26, 0.01]}
        color={p.floor}
      />
    </group>
  );
}
export function Room({ onSelect, moving }: RoomProps) {
  return (
    <group>
      <Shell />
      <Interactive id="sofa" onSelect={onSelect}>
        <Sofa />
      </Interactive>
      <Interactive id="table" onSelect={onSelect}>
        <Table moving={moving} />
      </Interactive>
      <Interactive id="lamp" onSelect={onSelect}>
        <Lamp />
      </Interactive>
      <Interactive id="plant" onSelect={onSelect}>
        <Plant moving={moving} />
      </Interactive>
      <Interactive id="records" onSelect={onSelect}>
        <Records />
      </Interactive>
      <Interactive id="art" onSelect={onSelect}>
        <Art />
      </Interactive>
    </group>
  );
}
