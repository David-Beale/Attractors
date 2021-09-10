import * as THREE from "three";
import { useMemo, useRef } from "react";

import {
  InstancedPrefabBufferGeometry,
  StandardAnimationMaterial,
} from "three-bas";

const data = {
  length: 1,
};
export const useBufferAnimation = ({ CONFIG }) => {
  const geometryRef = useRef(null);
  const materialRef = useRef(null);

  return useMemo(() => {
    const length = data.length;

    const prefab = new THREE.ConeBufferGeometry(1, 1, 3);
    const geometry = new InstancedPrefabBufferGeometry(prefab, length);

    const startTimeBuffer = geometry.createAttribute("startTime", 1);

    const tmpa = [];

    //loop through all new points
    for (let i = 0; i < length; i++) {
      //delay
      tmpa[0] = (CONFIG.totalDelay / length) * i;
      geometry.setPrefabData(startTimeBuffer, i, tmpa);
    }

    const uniforms = {
      time: { value: 0 },
      duration: { value: CONFIG.duration },
      spiralAngle: { value: Math.PI * 2 },
      angleStart: { value: 0.57 },
      knotRadius: { value: 75 },
      a: { value: 10 },
      b: { value: 28 },
      c: { value: 8 / 3 },
    };

    const vertexParameters = [
      "uniform float time;",
      "uniform float duration;",
      "uniform float spiralAngle;",
      "uniform float angleStart;",
      "uniform float knotRadius;",
      "uniform float a;",
      "uniform float b;",
      "uniform float c;",

      "attribute vec3 startPosition;",
      "attribute vec3 midPosition;",
      "attribute vec3 endPosition;",
      "attribute vec3 offset;",

      "attribute float startTime;",
      "attribute vec3 startColor;",
      "attribute vec3 endColor;",
    ];

    const vertexPosition = [
      "float progress = mod(max(time - startTime, 0.0) / duration, 1.0);",
      // "float angle = angleStart + spiralAngle * progress;",
      "vec3 pos;",
      // "vec4 gl_Position;",
      // "float startX = transformed.x + 0.01;",
      // "if(transformed.x == 0.0) {",
      // "startX = 0.01;",
      // "} else {",
      // "startX = transformed.x;",
      // "};",
      // "pos.x = knotRadius * (cos(angle) - 2.0 * cos(2.0 * angle));",
      // "float dx = (a * (transformed.y - startX)) * 0.1;",
      // "float dy = (startX * (b - transformed.z)) * 0.1;",
      // "float dz = (startX * transformed.y - c * transformed.z) * 0.1;",
      // "pos.x = startX + dx;",
      // "pos.y = transformed.y + dy;",
      // "pos.z = transformed.z + dz;",
      "pos.x = 2.0;",
      "pos.y = 0.0;",
      "pos.z = 0.0;",
      "transformed = pos;",
      // "gl_Position = vec4(10,1,1,1);",
    ];

    // const vertexParameters = [
    //   "uniform float time;",
    //   "uniform float duration;",

    //   "attribute float startTime;",
    // ];

    // const vertexPosition = [
    //   "float progress = clamp(time - startTime, 0.0, duration) / duration;",
    //   "vec3 pos;",
    //   "float angle = angleStart + spiralAngle * p;",

    //   "pos.x = knotRadius * (cos(angle) - 2.0 * cos(2.0 * angle));",
    //   "pos.y = knotRadius * (sin(angle) + 2.0 * sin(2.0 * angle));",
    //   "pos.z = knotRadius * (sin(3.0 * angle));",
    //   "transformed += pos",
    // ];

    const material = new StandardAnimationMaterial({
      roughness: 0.5,
      metalness: 0.5,
      vertexColors: THREE.VertexColors,
      uniforms,
      vertexParameters,
      vertexPosition,
      color: "hotpink",
    });

    geometryRef.current && geometryRef.current.dispose();
    materialRef.current && materialRef.current.dispose();
    geometryRef.current = geometry;
    materialRef.current = material;
    return [geometry, material];
  }, [CONFIG]);
};
