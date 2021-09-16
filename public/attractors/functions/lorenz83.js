/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const lorenz83 = (length, parameters) => {
  const { a, b, c, d } = parameters;
  const positions = [];
  const dt = 0.0027;
  const vec = new THREE.Vector3(-0.2, -2, -2.71);
  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (-a * x - y * y - z * z + a * c) * dt;
    vec.y += (-y + x * y - b * x * z + d) * dt;
    vec.z += (-z + b * x * y + x * z) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.4));
  return positions;
};
