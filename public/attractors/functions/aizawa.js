/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const aizawa = (length, parameters) => {
  const { a, b, c, d, e, f } = parameters;
  const positions = [];
  const dt = 0.01;
  const vec = new THREE.Vector3(0.5, 1.0, 0.01);

  const [updateSums, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateSums(x, y, z);
    positions.push(vec.clone());
    vec.x += ((z - b) * x - d * y) * dt;
    vec.y += (d * x + (z - b) * y) * dt;
    vec.z +=
      (c +
        a * z -
        (z * z * z) / 3 -
        ((x * x + y * y) * 1 + e * z) +
        f * z * (x * x * x)) *
      dt;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  return positions;
};
