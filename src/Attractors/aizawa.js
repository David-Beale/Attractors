import { Vector3 } from "three";
import { minMaxVectors } from "./minMaxVectors";

const a = 0.95;
const b = 0.7;
const c = 0.6;
const d = 3.5;
const e = 0.25;
const f = 0.1;

export const aizawa = (length) => {
  const positions = [];
  const vec = new Vector3(0.5, 1.0, 0.01);

  const [updateMinMax, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateMinMax(x, y, z);
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

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  return positions;
};
