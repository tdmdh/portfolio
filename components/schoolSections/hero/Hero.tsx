"use client"
import React from "react"
import { forwardRef } from "react"
import styles from "@/app/school/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"


const Home = forwardRef<HTMLDivElement> ((props, ref) => {
  return (
    <div
      ref={ref}
      className={styles.main}>
      <div
        className={styles.hero}
      >
        <div className={styles.heroText}>
          <div className={styles.heroTitle}>
            <HeroTitle title="Grafisch Lyceum" animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5} />
            <HeroTitle title="Rotterdam" animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5} />
            <div className={styles.heroSubtitle} >
              <HeroTitle subtitle="Student" animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

Home.displayName = "Home"
export default Home
