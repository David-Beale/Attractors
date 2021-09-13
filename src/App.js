import "./App.css";
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lorenz from "./Lorenz";
import Effects from "./Effects/Effects";

export default function App() {
  return (
    <div className="container">
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 40,
          far: 1000,
        }}
      >
        <Lorenz />
        <Stats className="stats" />
        <directionalLight
          intensity={5}
          position={[-1000, 0, 0]}
          color="hotpink"
        />
        <directionalLight intensity={5} position={[1000, 0, 0]} color="teal" />
        <directionalLight intensity={5} position={[0, 0, 1000]} color="green" />
        <Effects />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
