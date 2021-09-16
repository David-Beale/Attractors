/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const sprott = (length, parameters) => {
  const { a, b } = parameters;
  const positions = [];
  const dt = 0.01;
  const vec = new THREE.Vector3(0.63, 0.47, -0.54);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (y + a * x * y + x * z) * dt;
    vec.y += (1 - b * x * x + y * z) * dt;
    vec.z += (x - x * x - y * y) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(1.5));
  return positions;
};
