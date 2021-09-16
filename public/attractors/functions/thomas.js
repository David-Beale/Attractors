/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const thomas = (length, parameters) => {
  const { b } = parameters;
  const positions = [];
  const dt = 0.06;
  const vec = new THREE.Vector3(0.8, 0.8, -0.1);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (Math.sin(y) - b * x) * dt;
    vec.y += (Math.sin(z) - b * y) * dt;
    vec.z += (Math.sin(x) - b * z) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.5));
  return positions;
};
