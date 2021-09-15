import { useRef } from "react";

export const useRigMouseEvents = () => {
  const mouse = useRef([0, 0.5, 4]);

  const onMouseMove = (e) => {
    mouse.current[0] = e.clientX / window.innerWidth - 0.5;
    mouse.current[1] = e.clientY / window.innerHeight;
  };

  const onWheel = (e) => {
    if (e.deltaY < 0) {
      mouse.current[2] *= 0.8;
    } else {
      mouse.current[2] *= 1.25;
    }
  };

  return [mouse, onMouseMove, onWheel];
};
