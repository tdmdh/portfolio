"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense } from "react";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
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
    <Html position={position} transform distanceFactor={8}>
      <img src={url} alt={slug} width={24} height={24} />
    </Html>
  );
};

export const IconCloud3D = () => {
  const positions = getSphereCoords(slugs.length, 2.5);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        {slugs.map((slug, i) => (
          <IconTag key={slug} slug={slug} position={positions[i]} />
        ))}
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};