"use client"

import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
  }

  return (
    <motion.div ref={ref} className={styles.main}>
      <motion.div
        className={styles.bentoGrid}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ─── Top-Left: Greeting ─── */}
        <motion.div
          className={`${styles.greetingCard}`}
          variants={fadeUp}
        >
          <div className={styles.greetingContent}>
            <HeroTitle
              title="Hi, I'm"
              animationDelay={0.05}
              animationType="letter"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
          <span className={styles.greetingSubtext}>
            Software Developer &amp; Creative Thinker
          </span>
        </motion.div>

        {/* ─── Top-Right: Gradient Card ─── */}
        {/* <motion.div
          className={`${styles.card} ${styles.gradientCard}`}
          variants={scaleIn}
        >
          <div className={styles.gradientOrb} />
          <div className={styles.gradientOrbSecondary} />
          <div className={styles.gradientContent}>
            <span className={styles.gradientLabel}>Portfolio</span>
            <span className={styles.gradientYear}>2026</span>
          </div>
        </motion.div> */}

        {/* ─── Bottom: Name (spans full width) ─── */}
        <motion.div
          className={`${styles.nameCard}`}
          variants={fadeUp}
        >
          <div className={styles.nameContent}>
            <HeroTitle
              title="Mohammed"
              animationDelay={0.05}
              animationType="letter"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

Home.displayName = "Home"
export default Home
