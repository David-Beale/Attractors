import { useBufferAnimation } from "./useBufferAnimation";

export default function Lorenz({ func, transition }) {
  const [meshRef, geo, mat] = useBufferAnimation({
    func,
    transition,
  });

  return (
    <>
      {mat && (
        <mesh
          // rotation={[-1.571, 0, -0.8]}
          frustumCulled={false}
          ref={meshRef}
          material={mat}
          geometry={geo}
        />
      )}
    </>
  );
}
