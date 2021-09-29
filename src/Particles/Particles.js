import { Text } from "@react-three/drei";
import { useBufferAnimation } from "./useBufferAnimation";

export default function Particles({ parameters, setWaiting, onError }) {
  const [meshRef, geo, mat] = useBufferAnimation({
    parameters,
    setWaiting,
    onError,
  });

  return (
    <>
      {meshRef ? (
        <mesh
          frustumCulled={false}
          ref={meshRef}
          material={mat}
          geometry={geo}
        />
      ) : (
        <Text
          fontSize={0.3}
          position={[0, 0, 0]}
          color="teal"
          anchorX="center"
          anchorY="middle"
        >
          Loading
        </Text>
      )}
    </>
  );
}
