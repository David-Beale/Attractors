/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const arneodo = (length, parameters) => {
  const { a, b, c } = parameters;
  const positions = [];
  const dt = 0.0065;
  const vec = new THREE.Vector3(0.5, 0.38, 0.4);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += y * dt;
    vec.y += z * dt;
    vec.z += (-a * x - b * y - z + c * Math.pow(x, 3)) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.19));
  return positions;
};
