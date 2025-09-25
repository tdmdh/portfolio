"use client"
import React from "react"
import { forwardRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"
import Slogan from "@/components/sections/components/Slogan"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Cta from "../../ui/Cta"
import Silk from "@/components/ui/silk"
import { BorderBeam } from "@/components/ui/Border"


const Home = forwardRef<HTMLDivElement> ((props, ref) => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  
  return (
    <div
      ref={ref}
      className={styles.main}>
        <div className="relative overflow-hidden" style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          width: "85%",
          height: "75%",
          transform: "translate(-50%, -50%)",
          borderRadius: "2rem",
        }}>
          <Silk
            speed={4}
            scale={1}
            color="#9a8c98"
            noiseIntensity={1.5}
            rotation={45}
          />
          <BorderBeam 
           size={80}
            duration={6}
            delay={0}
            colorFrom="var(--primary-color)"
            colorTo="var(--quinary-color)"
            borderWidth={4}
            
          />
        </div>
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
              {/* <HeroTitle subtitle="Student at Grafish Lyceum Rotterdam"  /> */}
            </div>
            {/* <Slogan /> */}
          </div>
          <Cta title="Explore the Galaxy" />
        </div>
      </motion.div>
    </div>
  )
});

Home.displayName = "Home"
export default Home
