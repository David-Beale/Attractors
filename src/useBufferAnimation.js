import * as THREE from "three";
import { useMemo, useRef } from "react";

import {
  InstancedPrefabBufferGeometry,
  ShaderChunk,
  StandardAnimationMaterial,
} from "three-bas";
import { AdditiveBlending } from "three";

export const useBufferAnimation = ({ positions, rotations, offsets }) => {
  const geometryRef = useRef(null);
  const materialRef = useRef(null);

  return useMemo(() => {
    const length = positions.length;

    const prefab = new THREE.DodecahedronBufferGeometry(0.0031, 0);
    const geometry = new InstancedPrefabBufferGeometry(prefab, length);

    const positionBuffer = geometry.createAttribute("pos", 3);
    const rotationBuffer = geometry.createAttribute("rot", 4);
    const referenceBuffer = geometry.createAttribute("ref", 1);
    //loop through all new points
    for (let i = 0; i < length; i++) {
      geometry.setPrefabData(positionBuffer, i, positions[i].toArray());
      geometry.setPrefabData(rotationBuffer, i, rotations[i]);
      geometry.setPrefabData(referenceBuffer, i, [i]);
    }

    const uniforms = {
      index: { value: length },
      length: { value: length },
      offsets: { value: offsets },
      a: { value: 1103515245 },
      c: { value: 12345 },
      m: { value: 2593123487 },
    };

    const vertexParameters = [
      "uniform float index;",
      "uniform float length;",

      "uniform float a;",
      "uniform float c;",
      "uniform float m;",

      "attribute float ref;",
      "attribute vec3 pos;",
      "attribute vec4 rot;",

      "float rand(float seed) {",
      "float random1 = mod(((a * seed + c) / m) , 1.0);",
      "float random2 = (0.5 - random1) * 0.015;",
      "return random2;",
      "}",
    ];

    const vertexPosition = [
      "vec3 offset;",
      "float ind1 = mod((ref + index) , length);",
      "offset.x = rand(ind1);",
      "offset.y = rand(ind1*100.0);",
      "offset.z = rand(ind1*300.0);",

      "transformed = rotateVector(rot, transformed);",

      "transformed += pos + offset;",
      // "transformed += pos;",
    ];

    const material = new StandardAnimationMaterial({
      // roughness: 0.5,
      // metalness: 0.5,
      // vertexColors: THREE.VertexColors,
      // shading: THREE.FlatShading,
      uniforms,
      vertexParameters,
      vertexPosition,
      vertexFunctions: [ShaderChunk["quaternion_rotation"]],
      color: "white",
      blending: AdditiveBlending,
    });

    geometryRef.current && geometryRef.current.dispose();
    materialRef.current && materialRef.current.dispose();
    geometryRef.current = geometry;
    materialRef.current = material;
    return [geometry, material];
  }, [positions, rotations, offsets]);
};
