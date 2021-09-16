/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const lorenz = (length, parameters) => {
  const { a, b, c } = parameters;
  const positions = [];
  const dt = 0.002;
  const vec = new THREE.Vector3(0.1, 0, 0);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += a * (y - x) * dt;
    vec.y += x * (b - z) * dt;
    vec.z += (x * y - c * z) * dt;
  }
  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.05));

  return positions;
};
