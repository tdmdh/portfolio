'use client'
import Sections from "@/components/sections/Sections"
import styles from '@/app/styles/Home.module.css'
import PixelTrail from "@/components/layout/Pixels";

export default function Home() {
  return (
    <main className={styles.main}>
        <Sections />
    </main>
  );
}
