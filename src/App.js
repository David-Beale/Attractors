import "./App.css";
import { useState } from "react";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles/Particles";
import Effects from "./Effects/Effects";
import Rig from "./Rig/Rig";
import { useRigMouseEvents } from "./Rig/useRigMouseEvents";
import Menu from "./Menu/Menu";
import { AppContainer } from "./AppStyle";

import Error from "./Error/Error";
import { useParameters } from "./Parameters/useParameters";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [func, setFunc] = useState("aizawa");
  const [waiting, setWaiting] = useState(false);

  const [mouse, onMouseMove, onWheel] = useRigMouseEvents();
  const [
    parameters,
    error,
    onUpdateParameters,
    onResetParameters,
    onError,
    onClearError,
  ] = useParameters(func);

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
        waiting={waiting}
        setWaiting={setWaiting}
        parameters={parameters}
        onUpdateParameters={onUpdateParameters}
        onResetParameters={onResetParameters}
      />
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 40,
          far: 1000,
        }}
      >
        <Particles
          parameters={parameters}
          setWaiting={setWaiting}
          onError={onError}
        />
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
      <Error open={error} onClearError={onClearError} />
    </AppContainer>
  );
}
