import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

const target = new Vector3();

const speed = 0.025;
export default function Rig({ mouse }) {
  const prevTheta = useRef(0);
  const prevPhi = useRef(0.5 * Math.PI);
  const prevR = useRef(4);
  const { camera } = useThree();
  useFrame(() => {
    const theta = mouse.current[0] * 2 * Math.PI;
    const phi = mouse.current[1] * Math.PI;
    const r = mouse.current[2];
    const newTheta = prevTheta.current + speed * (theta - prevTheta.current);
    const newPhi = prevPhi.current + speed * (phi - prevPhi.current);
    const newR = prevR.current + speed * (r - prevR.current);
    target.setFromSphericalCoords(newR, newPhi, newTheta);
    camera.position.x = target.x;
    camera.position.y = target.y;
    camera.position.z = target.z;
    camera.lookAt(0, 0, 0);
    prevTheta.current = newTheta;
    prevPhi.current = newPhi;
    prevR.current = newR;
  });
  return null;
}
