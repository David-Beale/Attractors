/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts("helpers/three.min.js");
importScripts("helpers/minMaxVectors.js");
importScripts("functions/aizawa.js");
importScripts("functions/lorenz.js");
importScripts("functions/halvorsen.js");
importScripts("functions/thomas.js");
importScripts("functions/dadras.js");
importScripts("functions/chen.js");
importScripts("functions/lorenz83.js");
importScripts("functions/rossler.js");
importScripts("functions/rabin.js");
importScripts("functions/threeScroll1.js");
importScripts("functions/threeScroll2.js");
importScripts("functions/sprott.js");
importScripts("functions/fourwing.js");
importScripts("functions/lorenzMod2.js");

const functions = {
  aizawa,
  lorenz,
  halvorsen,
  thomas,
  dadras,
  chen,
  lorenz83,
  rossler,
  rabin,
  threeScroll1,
  threeScroll2,
  sprott,
  fourwing,
  lorenzMod2,
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
  thomas: {
    b: 0.208186,
  },
  dadras: {
    a: 3,
    b: 2.7,
    c: 1.7,
    d: 2,
    e: 9,
  },
  chen: {
    a: 5,
    b: -10,
    c: -0.38,
  },
  lorenz83: {
    a: 0.95,
    b: 7.91,
    c: 4.83,
    d: 4.66,
  },
  rossler: {
    a: 0.2,
    b: 0.2,
    c: 5.7,
  },
  rabin: {
    a: 0.14,
    b: 0.1,
  },
  threeScroll1: {
    a: 40.0,
    b: 0.833,
    c: 20.0,
    d: 0.5,
    e: 0.65,
  },
  threeScroll2: {
    a: 32.48,
    b: 45.84,
    c: 1.18,
    d: 0.13,
    e: 0.57,
    f: 14.7,
  },
  sprott: {
    a: 2.07,
    b: 1.79,
  },
  fourwing: {
    a: 0.2,
    b: 0.01,
    c: -0.4,
  },
  lorenzMod2: {
    a: 0.9,
    b: 5.0,
    c: 9.9,
    d: 1.0,
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
