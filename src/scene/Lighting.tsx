export function Lighting() {
  return (
    <>
      <ambientLight intensity={1.05} />
      <hemisphereLight args={['#fff4df', '#a08a66', 1.1]} />
      <directionalLight
        position={[2, 7, 5]}
        intensity={3.1}
        color="#fff0d1"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-autoUpdate={false}
        shadow-needsUpdate
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-normalBias={0.035}
      />
    </>
  );
}
