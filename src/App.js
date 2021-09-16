import "./App.css";
import { useRef, useState } from "react";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import Effects from "./Effects/Effects";
import Rig from "./Rig/Rig";
import { useRigMouseEvents } from "./Rig/useRigMouseEvents";

export default function App() {
  const [func, setFunc] = useState("arneodo");
  const transition = useRef(false);

  const onClick = () => {
    if (transition.current) return;
    transition.current = true;
    setFunc((prev) => (prev === "lorenz" ? "aizawa" : "lorenz"));
  };

  const [mouse, onMouseMove, onWheel] = useRigMouseEvents();

  return (
    <div
      className="container"
      onClick={onClick}
      onPointerMove={onMouseMove}
      onWheel={onWheel}
    >
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 40,
          far: 1000,
        }}
      >
        <Particles func={func} transition={transition} />
        <Stats className="stats" />
        <directionalLight
          intensity={5}
          position={[-1000, 0, 0]}
          color="hotpink"
        />
        <directionalLight intensity={5} position={[1000, 0, 0]} color="teal" />
        <directionalLight
          intensity={5}
          position={[0, -1000, 0]}
          color="green"
        />
        <Effects />
        <Rig mouse={mouse} />
      </Canvas>
    </div>
  );
}
