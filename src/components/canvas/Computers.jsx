import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = () => {
  // Create lights as refs
  const hemiLight = useRef();
  const pointLight = useRef();
  const spotLight = useRef();

  // Load model
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Add lights to scene */}
      <hemisphereLight ref={hemiLight} args={[0xffffff, 0xffffff, 1]} />
      <pointLight ref={pointLight} args={[0xffffff, 20]} position={[0, 0, 0]} />
      <spotLight ref={spotLight} args={[0xffffff, 1, 0, 10, 1, 0]} />
      {/* Add model */}
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  return (
    <Canvas shadows camera={{ position: [20, 3, 5], fov: 25 }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Add scene with lights and model */}
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
