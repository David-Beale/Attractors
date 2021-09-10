import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";

const length = 100000;
const scratchObject3D = new Object3D();

const a = 10;
const b = 28;
const c = 8 / 3;

export default function Lorenz() {
  const meshRef = useRef();
  const index = useRef(1);
  const array = useRef([{ x: 0.1, y: 0, z: 0 }]);

  useFrame(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < 10; i++) {
      const item = array.current[index.current];
      if (!item) {
        const newItem = {};
        array.current[index.current] = newItem;
        const { x, y, z } = array.current[index.current - 1];
        const dx = a * (y - x) * 0.001;
        const dy = x * (b - z) * 0.001;
        const dz = (x * y - c * z) * 0.001;
        newItem.x = x + dx;
        newItem.y = y + dy;
        newItem.z = z + dz;
        scratchObject3D.position.set(newItem.x, newItem.y, newItem.z);
        scratchObject3D.updateMatrix();
      } else {
        scratchObject3D.position.set(item.x, item.y, item.z);
        scratchObject3D.rotation.set(Math.PI / 2, 0, 0);
        scratchObject3D.updateMatrix();
      }

      meshRef.current.setMatrixAt(index.current, scratchObject3D.matrix);
      index.current++;
      if (index.current === length) index.current = 0;
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, length]}
      frustumCulled={false}
    >
      <coneBufferGeometry args={[0.1, 0.1, 3]} />

      <meshStandardMaterial attach="material" color="white" />
    </instancedMesh>
  );
}
