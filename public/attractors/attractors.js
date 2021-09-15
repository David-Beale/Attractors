/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("three.min.js");
importScripts("minMaxVectors.js");
importScripts("aizawa.js");
importScripts("lorenz.js");
importScripts("halvorsen.js");

const functions = {
  aizawa,
  lorenz,
  halvorsen,
};

const parameters = {
  lorenz: {
    a: 10,
    b: 28,
    c: 8 / 3,
  },
  aizawa: {
    a: 0.95,
    b: 0.7,
    c: 0.6,
    d: 3.5,
    e: 0.25,
    f: 0.1,
  },
  halvorsen: {
    a: 1.89,
  },
};
const scratchObject3D = new THREE.Object3D();

self.onmessage = (e) => {
  const { func, length } = e.data;

  let positions = functions[func](length, parameters[func]);

  const rotations = [];
  const axis = new THREE.Vector3(1, 0, 0);
  for (let i = 0; i < length - 1; i++) {
    const currentVector = positions[i];
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
