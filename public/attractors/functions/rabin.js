/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const rabin = (length, parameters) => {
  const { dt, x, y, z, a, b } = parameters;
  const positions = [];
  const vec = new THREE.Vector3(x, y, z);
  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (y * (z - 1 + x * x) + b * x) * dt;
    vec.y += x * (3 * z + 1 - x * x) * dt;
    vec.z += -2 * z * (a + x * y) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.6));
  return positions;
};
