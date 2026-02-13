"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import styles from "@/app/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Europe/Amsterdam",
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } as const,
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } as const,
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
        <motion.div className={`${styles.card} ${styles.greetingCard}`} variants={fadeUp}>
          <div className={styles.greetingContent}>
            <HeroTitle
              title="Hi, I'm"
              animationDelay={0.05}
              animationType="letter"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
        </motion.div>

        <motion.div className={`${styles.card} ${styles.accentCard}`} variants={scaleIn}>
          <div className={styles.accentGradient} />
          <div className={styles.accentContent}>
            {/* <span className={styles.accentTime}>{time}</span> */}
            {/* <span className={styles.accentLocation}>Rotterdam, NL</span> */}
          </div>
        </motion.div>

        <motion.div className={`${styles.card} ${styles.nameCard}`} variants={fadeUp}>
          <div className={styles.nameContent}>
            <HeroTitle
              title="Mohammed"
              animationDelay={0.04}
              animationType="letter"
              trigger="onMount"
              animationDuration={0.5}
            />
          </div>
        </motion.div>

        <motion.div className={`${styles.card} ${styles.tagCard}`} variants={fadeUp}>
          <p className={styles.tagText}>
            Building digital experiences with clean code &amp; creative design
          </p>
        </motion.div>

        <motion.div className={`${styles.card} ${styles.roleCard}`} variants={scaleIn}>
          <div className={styles.statusDot}>
            <span className={styles.ping} />
            <span className={styles.dot} />
          </div>
          <span className={styles.roleLabel}>Current Role</span>
          <span className={styles.roleText}>Software Developer</span>
        </motion.div>

        <motion.div className={`${styles.card} ${styles.scrollCard}`} variants={fadeUp}>
          <div className={styles.scrollInner}>
            <motion.div
              className={styles.scrollLine}
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className={styles.scrollText}>Scroll</span>
          <Icon icon="ph:arrow-down" className={styles.scrollArrow} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

Home.displayName = "Home"
export default Home