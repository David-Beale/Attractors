/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("helpers/three.min.js");
importScripts("helpers/minMaxVectors.js");
importScripts("functions.js");

const scratchObject3D = new THREE.Object3D();

self.onmessage = (e) => {
  const { parameters, length } = e.data;
  let positions = functions[parameters.name](length, parameters);

  const rotations = [];
  const axis = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i < length - 1; i++) {
    const currentVector = positions[i];
    if (
      isNaN(currentVector.x) ||
      isNaN(currentVector.y) ||
      isNaN(currentVector.z)
    ) {
      self.postMessage({ error: true });
      return;
    }
    const nextVector = positions[i + 1];

    scratchObject3D.position.set(
      currentVector.x,
      currentVector.y,
      currentVector.z
    );
    scratchObject3D.lookAt(nextVector);
    scratchObject3D.rotateOnAxis(axis, Math.PI / 2);
    rotations.push(scratchObject3D.rotation.toArray());
  }
  rotations.push(scratchObject3D.rotation.toArray());

  positions = positions.map((vec) => vec.toArray());
  self.postMessage({ positions, rotations });
};
