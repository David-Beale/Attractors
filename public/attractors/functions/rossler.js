/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const rossler = (length, parameters) => {
  const { a, b, c } = parameters;
  const positions = [];
  const dt = 0.0059;
  const vec = new THREE.Vector3(-0.2, -2, -2.71);
  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (-y - z) * dt;
    vec.y += (x + a * y) * dt;
    vec.z += (b + z * (x - c)) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.12));
  return positions;
};
