"use client"
import React from "react"
import { forwardRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"
import Slogan from "@/components/sections/components/Slogan"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Cta from "../../ui/Cta"


const Home = forwardRef<HTMLDivElement> ((props, ref) => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  
  return (
    <div
      ref={ref}
      className={styles.main}>
      <motion.div
        className={styles.hero}
      >
        <div className={styles.heroText}>
          <div className={styles.heroTitle}>
            <HeroTitle title="Hi, I'm" animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5} />
            <HeroTitle title="Mohammed" animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5} />
            <div className={styles.heroSubtitle} >
              <HeroTitle subtitle="Student at Grafish Lyceum Rotterdam"  />
            </div>
            <Slogan />
          </div>
          <Cta title="Explore the Galaxy" />
        </div>
      </motion.div>
    </div>
  )
});

Home.displayName = "Home"
export default Home
