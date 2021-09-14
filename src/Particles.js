import { useMemo, useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import { useBufferAnimation } from "./useBufferAnimation";
import { lorenz } from "./Attractors/lorenz";
import { aizawa } from "./Attractors/aizawa";

export default function Lorenz({ func, transition }) {
  const meshRef = useRef();

  const [geo, mat] = useBufferAnimation({
    meshRef,
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
