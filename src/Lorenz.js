import { useEffect, useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Object3D, Quaternion, Vector3 } from "three";

const length = 10000;
const scratchObject3D = new Object3D();
const currentVector = new Vector3();
const targetVector = new Vector3();
const axis = new Vector3(1, 0, 0);

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
  const index = useRef(0);
  // const array = useRef([{ x: 0.0321, y: 0.3106, z: 0.2189 }]);
  const array = useRef([{ x: 0.5, y: 1.0, z: 0.01 }]);
  const start = useRef(new Vector3(0.5, 1.0, 0.01));

  const akaiwa = useMemo(() => {
    const newArray = [];
    let vec = start.current;
    for (let i = 0; i < length; i++) {
      const { x, y, z } = vec;
      newArray.push(vec.clone());
      vec.x += ((z - b) * x - d * y) * 0.01;
      vec.y += (d * x + (z - b) * y) * 0.01;
      vec.z +=
        (c +
          a * z -
          (z * z * z) / 3 -
          ((x * x + y * y) * 1 + e * z) +
          f * z * (x * x * x)) *
        0.01;
      // vec.x = i / 10;
      // vec.y = 0;
      // vec.z = 0;
      // newArray.push(vec.clone());
    }
    return newArray;
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

  useEffect(() => {
    if (!meshRef.current) return;
    const currentVector = new Vector3();
    const targetVector = new Vector3();
    const axis = new Vector3(1, 0, 0);
    for (let i = 0; i < length; i++) {
      const offset = offsets[i];
      const ind1 = i % length;
      const vec1 = akaiwa[ind1];
      currentVector.addVectors(vec1, offset);

      const ind2 = (i + 1) % length;
      const vec2 = akaiwa[ind2];
      targetVector.addVectors(vec2, offset);

      scratchObject3D.position.set(
        currentVector.x,
        currentVector.y,
        currentVector.z
      );
      scratchObject3D.lookAt(targetVector);
      scratchObject3D.rotateOnAxis(axis, Math.PI / 2);
      scratchObject3D.updateMatrix();

      meshRef.current.setMatrixAt(i, scratchObject3D.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [akaiwa, offsets]);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < length; i++) {
      const offset = offsets[i];
      const ind1 = (i + index.current) % length;
      const vec1 = akaiwa[ind1];
      currentVector.addVectors(vec1, offset);

      const ind2 = (i + index.current + 1) % length;
      const vec2 = akaiwa[ind2];
      targetVector.addVectors(vec2, offset);

      scratchObject3D.position.set(
        currentVector.x,
        currentVector.y,
        currentVector.z
      );
      scratchObject3D.lookAt(targetVector);
      scratchObject3D.rotateOnAxis(axis, Math.PI / 2);
      scratchObject3D.updateMatrix();
      meshRef.current.setMatrixAt(i, scratchObject3D.matrix);
    }
    index.current++;
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
