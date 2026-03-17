"use client"

import React, { forwardRef, useRef, useEffect } from "react"
import styles from "@/app/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Image from "next/image"

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  const gridRef = useRef<HTMLDivElement>(null)


  return (
    <div ref={ref} className={styles.main}>
      <div ref={gridRef} className={styles.bentoGrid}>
        <div className={`${styles.card} ${styles.greetingCard}`}>
          <div className={styles.greetingContent}>
            <HeroTitle
              title="Hi, I'm"
              animationDelay={0.05}
              animationType="word"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
        </div>

        <div className={`${styles.card} ${styles.profileCard}`}>
          <div className={styles.profileImageWrapper}>
            <Image
              src="/photo/me2.jpeg"
              alt="Mohammed"
              fill
              className={styles.profileImage}
            />
          </div>
        </div>

        <div className={`${styles.card} ${styles.nameCard}`}>
          <div className={styles.nameContent}>
            <HeroTitle
              title="Mohammed"
              animationDelay={0.04}
              animationType="letter"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

Home.displayName = "Home"
export default Home