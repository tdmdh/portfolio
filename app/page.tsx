import  { Metadata } from 'next'
import Sections from "@/components/sections/Sections"
import styles from '@/app/styles/Home.module.css'
import { SectionProvider } from "@/context/section-context"

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionProvider>
        <Sections />
      </SectionProvider>
    </main>
  );
}

