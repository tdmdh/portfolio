"use client"

import React, { forwardRef, useRef, useEffect } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Image from "next/image"
import { TopCorners } from "@/components/navbar/components/Topcorners"

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children
      if (!cards) return

      gsap.set(cards, { opacity: 0 })

      gsap.fromTo(
        `.${styles.greetingCard}`,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.05 }
      )

      gsap.fromTo(
        `.${styles.profileCard}`,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.11 }
      )

      gsap.fromTo(
        `.${styles.nameCard}`,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.17 }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

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