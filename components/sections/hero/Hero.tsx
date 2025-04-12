"use client"
import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"
import Slogan from "@/components/sections/hero/components/Slogan"
import HeroTitle from "@/components/sections/hero/components/HeroTitle"
import Cta from "./components/Cta"

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <div className={styles.main}>
      <motion.div
        className={styles.hero}
        style={{
          scale,
          opacity: scrollOpacity,
          y,
        }}
      >
        <div className={styles.heroText}>
          <div className={styles.heroTitle}>
            <HeroTitle title="Hi, I'm" />
            <HeroTitle title="Mohammed"  subtitle="Student at Grafish Lyceum Rotterdam"  />
            <Slogan />
          </div>
          <Cta title="Explore the Galaxy" />
        </div>
      </motion.div>
    </div>
  )
}

export default Home
