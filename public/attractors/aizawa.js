/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const aizawa = (length, parameters) => {
  const { a, b, c, d, e, f } = parameters;
  const positions = [];
  const vec = new THREE.Vector3(0.5, 1.0, 0.01);

  const [updateMinMax, getCenter] = minMaxVectors();

  for (let i = 0; i < length; i++) {
    const { x, y, z } = vec;
    updateMinMax(x, y, z);
    positions.push(vec.clone());
    vec.x += ((z - b) * x - d * y) * 0.01;
    vec.y += (d * x + (z - b) * y) * 0.01;
    vec.z +=
      (c +
        a * z -
        (z * z * z) / 3 -
        ((x * x + y * y) * 1 + e * z) +
        f * z * (x * x * x)) *
      0.01;
  }

  const center = getCenter();

  positions.forEach((vec) => vec.sub(center));
  return positions;
};
