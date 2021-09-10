import "./App.css";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lorenz from "./Lorenz";

export default function App() {
  return (
    <div className="container">
      <Canvas
        camera={{
          position: [0, 0, 500],
          fov: 40,
          far: 1000,
        }}
      >
        <Lorenz />
        <Stats className="stats" />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
