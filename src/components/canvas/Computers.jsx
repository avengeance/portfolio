import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
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
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -4, -2.2] : [0, -4.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // How to check if we are on mobile
    const mediaQuery = window.matchMedia("(max-width:500px)");
    // If we are or are not how do we change the state variable
    setIsMobile(mediaQuery.matches);
    // How would we handle changes to the changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // How do we listen for changes in the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Once we are unmounted what should we do
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas shadows camera={{ position: [20, 3, 5], fov: 25 }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Add scene with lights and model */}
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
