import { useEffect, useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Object3D, Vector3 } from "three";

const length = 10000;
const scratchObject3D = new Object3D();
const currentVector = new Vector3();

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
  const index = useRef(length);
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
    const axis = new Vector3(1, 0, 0);
    for (let i = 0; i < length - 1; i++) {
      const currentVector = positions[i];
      const nextVector = positions[i + 1];

      scratchObject3D.position.set(
        currentVector.x,
        currentVector.y,
        currentVector.z
      );
      scratchObject3D.lookAt(nextVector);
      scratchObject3D.rotateOnAxis(axis, Math.PI / 2);
      rotations.push(scratchObject3D.rotation.toArray());
    }
    rotations.push(scratchObject3D.rotation.toArray());
    return [positions, rotations];
  }, []);

  const offsets = useMemo(() => {
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(
        new Vector3(
          (0.5 - Math.random()) * 0.015,
          (0.5 - Math.random()) * 0.015,
          (0.5 - Math.random()) * 0.015
        )
      );
    }
    return newArray;
  }, []);
  // useEffect(() => {
  //   if (!meshRef.current) return;
  //   for (let i = 0; i < length; i++) {
  //     const offset = offsets[i];
  //     const ind1 = i % length;
  //     const vec1 = positions[ind1];
  //     currentVector.addVectors(vec1, offset);

  //     scratchObject3D.position.set(
  //       currentVector.x,
  //       currentVector.y,
  //       currentVector.z
  //     );

  //     scratchObject3D.rotation.set(
  //       rotations[i][0],
  //       rotations[i][1],
  //       rotations[i][2]
  //     );

  //     scratchObject3D.updateMatrix();

  //     meshRef.current.setMatrixAt(i, scratchObject3D.matrix);
  //   }
  //   meshRef.current.instanceMatrix.needsUpdate = true;
  // }, [positions, offsets, rotations]);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < length; i++) {
      const ind1 = (i + index.current) % length;
      const offset = offsets[ind1];
      const vec1 = positions[i];
      currentVector.addVectors(vec1, offset);

      scratchObject3D.position.set(
        currentVector.x,
        currentVector.y,
        currentVector.z
      );

      scratchObject3D.rotation.set(
        rotations[i][0],
        rotations[i][1],
        rotations[i][2]
      );

      scratchObject3D.updateMatrix();
      meshRef.current.setMatrixAt(i, scratchObject3D.matrix);
    }
    index.current--;
    if (index.current === 0) index.current = length;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, length]}
      frustumCulled={false}
    >
      {/* <dodecahedronBufferGeometry args={[0.003, 0]} /> */}
      <coneBufferGeometry
        args={[0.003, 0.01, 3]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <meshStandardMaterial
        attach="material"
        color="white"
        blending={AdditiveBlending}
      />
    </instancedMesh>
  );
}
