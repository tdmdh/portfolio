import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function RotatingModel() {
  const modelRef = useRef();
  const { scene } = useGLTF('/3D/motorcycle.glb');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = mousePos.x * Math.PI * 0.2;
      modelRef.current.rotation.x = mousePos.y * Math.PI * 0.2;
    }
  });

  return (
    <mesh ref={modelRef} scale={1}>
      <primitive object={scene} />
    </mesh>
  );
}

export function Model() {
  return (
    <Canvas className="hover:cursor-all-scroll" shadows>
      <RotatingModel />
      <OrbitControls enablePan={true} minPolarAngle={0.1} maxPolarAngle={2} enableZoom={false} />
    </Canvas>
  );
}
