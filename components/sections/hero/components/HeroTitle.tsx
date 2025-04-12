"use client"
import React from "react"
import { motion, Variants } from "framer-motion"

import styles from "@/app/styles/Hero.module.css"

interface HeroTitleProps {
  title: string
  subtitle?: string 
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const HeroTitle: React.FC<HeroTitleProps> = ({ title, subtitle }) => {
  const titleLetters = title.split("")
  const subtitleLetters = subtitle ? subtitle.split("") : []

  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>
        {titleLetters.map((letter, i) => (
          <motion.span
            key={`title-${i}`}
            className={styles.letter}
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            custom={i}
            viewport={{ once: false, amount: 0.2 }}
          >
            {letter === "M" ? <span className={styles.mLetter}>M</span> : letter}
          </motion.span>
        ))}
      </h1>
      {subtitle && (
        <h2 className={styles.heroSubtitle}>
          {subtitleLetters.map((letter, i) => (
            <motion.span
              key={`subtitle-${i}`}
              className={styles.subtitleLetter}
              variants={letterVariants}
              initial="hidden"
              whileInView="visible"
              custom={i + titleLetters.length} 
              viewport={{ once: false, amount: 0.2 }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
      )}
    </div>
  )
}

export default HeroTitle