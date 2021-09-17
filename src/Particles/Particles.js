import { useBufferAnimation } from "./useBufferAnimation";

export default function Lorenz({ parameters, transition }) {
  const [meshRef, geo, mat] = useBufferAnimation({
    parameters,
    transition,
  });

  return (
    <mesh frustumCulled={false} ref={meshRef} material={mat} geometry={geo} />
  );
}
