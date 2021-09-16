/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const lorenzMod2 = (length, parameters) => {
  const { a, b, c, d } = parameters;
  const positions = [];
  const dt = 0.0007;
  // const vec = new THREE.Vector3(-0.29, -0.29, -0.59);
  const vec = new THREE.Vector3(0.5, 0.5, 0.5);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += (-a * x + y * y - z * z + a * c) * dt;
    vec.y += (x * (y - b * z) + d) * dt;
    vec.z += (-z + x * (b * y + z)) * dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  positions.forEach((vec) => vec.multiplyScalar(0.13));
  return positions;
};
