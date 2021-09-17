/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const dadras = (length, parameters) => {
  const { dt, x, y, z, a, b, c, d, e } = parameters;
  const positions = [];
  const vec = new THREE.Vector3(x, y, z);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (y - a * x + b * y * z) * dt;
    vec.y += (c * y - x * z + z) * dt;
    vec.z += (d * x * y - e * z) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.13));
  return positions;
};
