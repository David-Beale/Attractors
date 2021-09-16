/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const minMaxVectors = () => {
  let avgX = 0;
  let avgY = 0;
  let avgZ = 0;
  let count = 0;

  const updateSums = (x, y, z) => {
    avgX += x;
    avgY += y;
    avgZ += z;
    count++;
  };

  const getCenter = () => {
    return new THREE.Vector3(avgX / count, avgY / count, avgZ / count);
  };

  return [updateSums, getCenter];
};
