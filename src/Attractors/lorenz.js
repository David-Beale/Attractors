import { Vector3 } from "three";
import { minMaxVectors } from "./minMaxVectors";

const a = 10;
const b = 28;
const c = 8 / 3;

export const lorenz = (length) => {
  const positions = [];
  const vec = new Vector3(0.1, 0, 0);

  const [updateMinMax, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateMinMax(x, y, z);
    positions.push(vec.clone());
    vec.x += a * (y - x) * 0.002;
    vec.y += x * (b - z) * 0.002;
    vec.z += (x * y - c * z) * 0.002;
  }
  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.05));

  return positions;
};
