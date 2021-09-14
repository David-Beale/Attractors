import { Vector3 } from "three";

const a = 10;
const b = 28;
const c = 8 / 3;

export const lorenz = (length) => {
  const positions = [];
  const vec = new Vector3(0.1, 0, 0);

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    positions.push(vec.clone());
    vec.x += a * (y - x) * 0.002;
    vec.y += x * (b - z) * 0.002;
    vec.z += (x * y - c * z) * 0.002;
  }
  positions.forEach((vec) => vec.multiplyScalar(0.05));

  return positions;
};
