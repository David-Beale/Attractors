import { Vector3 } from "three";
export const minMaxVectors = () => {
  const min = new Vector3(Infinity, Infinity, Infinity);
  const max = new Vector3(-Infinity, -Infinity, -Infinity);

  const updateMinMax = (x, y, z) => {
    if (x < min.x) min.x = x;
    if (y < min.y) min.y = y;
    if (z < min.z) min.z = z;
    if (x > max.x) max.x = x;
    if (y > max.y) max.y = y;
    if (z > max.z) max.z = z;
  };

  const getCenter = () => {
    return min.lerp(max, 0.5);
  };

  return [updateMinMax, getCenter];
};
