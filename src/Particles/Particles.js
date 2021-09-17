import { useBufferAnimation } from "./useBufferAnimation";

export default function Lorenz({ parameters, transition, setError }) {
  const [meshRef, geo, mat] = useBufferAnimation({
    parameters,
    transition,
    setError,
  });

  return (
    <mesh frustumCulled={false} ref={meshRef} material={mat} geometry={geo} />
  );
}
