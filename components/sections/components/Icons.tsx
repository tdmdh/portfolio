"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense } from "react";

const slugs = [
  "typescript", "javascript", "react", 
  "html5", "css3", "prisma", "vercel", "git", "github","figma",
];

function getSphereCoords(count: number, radius: number) {
  const points = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    points.push([x * radius, y * radius, z * radius]);
  }

  return points;
}

const IconTag = ({ slug, position }: { slug: string; position: [number, number, number] }) => {
  const url = `https://cdn.simpleicons.org/${slug}`;
  return (
    <Html position={position} transform distanceFactor={25}>
      <img src={url} alt={slug} width={24} height={24} />
    </Html>
  );
};

export const IconCloud3D = () => {
  const positions = getSphereCoords(slugs.length, 2.5);

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 90 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        {slugs.map((slug, i) => (
          <mesh
            key={slug}
            position={positions[i] as [number, number, number]}
          >
            <IconTag slug={slug} position={positions[i] as [number, number, number]} />
          </mesh>
        ))}
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};
