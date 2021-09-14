import "./App.css";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";
import Effects from "./Effects/Effects";
import { useRef, useState } from "react";

export default function App() {
  const [func, setFunc] = useState("lorenz");
  const transition = useRef(false);

  const onClick = () => {
    if (transition.current) return;
    transition.current = true;
    setFunc((prev) => (prev === "lorenz" ? "aizawa" : "lorenz"));
  };
  return (
    <div className="container" onClick={onClick}>
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
        {/* <directionalLight
          intensity={5}
          position={[-1000, -1000, 0]}
          color="yellow"
        /> */}
        <Effects />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
