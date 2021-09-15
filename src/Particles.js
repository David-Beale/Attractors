import { useBufferAnimation } from "./useBufferAnimation";

export default function Lorenz({ func, transition }) {
  const [meshRef, geo, mat] = useBufferAnimation({
    func,
    transition,
  });

  return (
    <mesh frustumCulled={false} ref={meshRef} material={mat} geometry={geo} />
  );
}
