import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles/Particles";
import Effects from "./Effects/Effects";
import Rig from "./Rig/Rig";
import { useRigMouseEvents } from "./Rig/useRigMouseEvents";
import Menu from "./Menu/Menu";
import { AppContainer } from "./AppStyle";
import { defaultParameters } from "./defaultParameters";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [func, setFunc] = useState("aizawa");
  const [parameters, setParameters] = useState(defaultParameters.aizawa);
  const transition = useRef(false);

  useEffect(() => {
    setParameters(defaultParameters[func]);
  }, [func]);

  const [mouse, onMouseMove, onWheel] = useRigMouseEvents();

  return (
    <AppContainer
      menuOpen={menuOpen}
      onPointerMove={onMouseMove}
      onWheel={onWheel}
    >
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        func={func}
        setFunc={setFunc}
        transition={transition}
        parameters={parameters}
        setParameters={setParameters}
      />
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 40,
          far: 1000,
        }}
      >
        <Particles parameters={parameters} transition={transition} />
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
    </AppContainer>
  );
}
