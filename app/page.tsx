'use client'
import Sections from "@/components/sections/Sections"
import styles from '@/app/styles/Home.module.css'
import PixelTrail from "@/components/layout/Pixels";

export default function Home() {
  return (
    <main className={styles.main}>
        <div style={{ height: '100vh', width: '100vw', position: 'absolute', overflow: 'hidden'}}>
        <PixelTrail
          gridSize={10}
          trailSize={0.10}
          maxAge={350}
          interpolate={6.6}
          color="#4a4e69"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        />
        </div>
        <Sections />
    </main>
  );
}
