import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { useBufferAnimation } from "./useBufferAnimation";

const CONFIG = { duration: 3, totalDelay: 1 };

export default function Lorenz() {
  const meshRef = useRef();

  const [geo, mat] = useBufferAnimation({ CONFIG });

  useFrame(() => {
    if (!meshRef.current) return;
    const uniforms = meshRef.current.material.uniforms;
    uniforms.time.value += 1 / 60;
    // if (uniforms.time.value > CONFIG.duration + CONFIG.totalDelay) {
    //   uniforms.time.value = -1000;
    // }
  });

  return (
    <>
      {mat && (
        <mesh
          frustumCulled={false}
          ref={meshRef}
          material={mat}
          geometry={geo}
        />
      )}
    </>
  );
}
