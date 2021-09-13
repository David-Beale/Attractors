import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import { useBufferAnimation } from "./useBufferAnimation";

const length = 10000;
const scratchObject3D = new Object3D();

// const a = 10;
// const b = 28;
// const c = 8 / 3;

const a = 0.95;
const b = 0.7;
const c = 0.6;
const d = 3.5;
const e = 0.25;
const f = 0.1;

export default function Lorenz() {
  const meshRef = useRef();
  const start = useRef(new Vector3(0.5, 1.0, 0.01));

  const [positions, rotations] = useMemo(() => {
    const positions = [];
    let vec = start.current;

    for (let i = 0; i < length; i++) {
      const { x, y, z } = vec;
      positions.push(vec.clone());
      vec.x += ((z - b) * x - d * y) * 0.01;
      vec.y += (d * x + (z - b) * y) * 0.01;
      vec.z +=
        (c +
          a * z -
          (z * z * z) / 3 -
          ((x * x + y * y) * 1 + e * z) +
          f * z * (x * x * x)) *
        0.01;
    }

    const rotations = [];
    for (let i = 0; i < length - 1; i++) {
      const currentVector = positions[i];
      const nextVector = positions[i + 1];

      scratchObject3D.position.set(
        currentVector.x,
        currentVector.y,
        currentVector.z
      );
      scratchObject3D.lookAt(nextVector);
      rotations.push(scratchObject3D.quaternion.toArray());
    }
    rotations.push(scratchObject3D.quaternion.toArray());
    return [positions, rotations];
  }, []);

  const [geo, mat] = useBufferAnimation({ positions, rotations });

  useFrame(() => {
    if (!meshRef.current) return;
    const uniforms = meshRef.current.material.uniforms;
    uniforms.index.value--;
    if (uniforms.index.value === 0) uniforms.index.value = length;
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
