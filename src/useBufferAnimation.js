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

    const prefab = new THREE.ConeBufferGeometry(0.003, 0.01, 3);
    const geometry = new InstancedPrefabBufferGeometry(prefab, length);

    const positionBuffer = geometry.createAttribute("pos", 3);
    const rotationBuffer = geometry.createAttribute("rot", 3);
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
      xAxis: { value: [1.0, 0.0, 0.0] },
      yAxis: { value: [0.0, 1.0, 0.0] },
      zAxis: { value: [0.0, 0.0, 1.0] },
    };

    const vertexParameters = [
      "uniform float index;",
      "uniform float length;",

      "uniform float a;",
      "uniform float c;",
      "uniform float m;",

      "uniform vec3 xAxis;",
      "uniform vec3 yAxis;",
      "uniform vec3 zAxis;",

      "attribute float ref;",
      "attribute vec3 pos;",
      "attribute vec3 rot;",

      "float rand(float seed) {",
      "float random1 = fract(((a * seed + c) / m));",
      "return (0.5 - random1) * 0.015;",
      "}",
    ];

    const vertexPosition = [
      "vec3 offset;",
      "float ind1 = mod((ref + index) , length);",
      "offset.x = rand(ind1);",
      "offset.y = rand(ind1*100.0);",
      "offset.z = rand(ind1*300.0);",

      "transformed = rotateVector(quatZ, transformed);",
      "transformed = rotateVector(quatY, transformed);",
      "transformed = rotateVector(quatX, transformed);",

      "transformed += pos + offset;",
      // "transformed += pos;",
    ];

    const material = new StandardAnimationMaterial({
      roughness: 0.9,
      metalness: 0.1,
      uniforms,
      vertexParameters,
      vertexNormal: [
        "vec4 quatZ = quatFromAxisAngle(zAxis, rot.z);",
        "objectNormal  = rotateVector(quatZ, objectNormal );",

        "vec4 quatY = quatFromAxisAngle(yAxis, rot.y);",
        "objectNormal  = rotateVector(quatY, objectNormal );",

        "vec4 quatX = quatFromAxisAngle(xAxis, rot.x);",
        "objectNormal  = rotateVector(quatX, objectNormal );",
      ],
      vertexPosition,
      vertexFunctions: [ShaderChunk["quaternion_rotation"]],
      color: "white",
      blending: AdditiveBlending,
    });
    geometry.computeVertexNormals();

    geometryRef.current && geometryRef.current.dispose();
    materialRef.current && materialRef.current.dispose();
    geometryRef.current = geometry;
    materialRef.current = material;
    return [geometry, material];
  }, [positions, rotations, offsets]);
};
