"use client"

import React from "react"
import { motion, Variants } from "framer-motion"

import styles from "@/app/styles/Hero.module.css"

interface HeroTitleProps {
  size?: string
  title?: string
  subtitle?: string
  text?: string
  animationType?: "letter" | "word"
  animationDelay?: number
  animationDuration?: number
  trigger?: "inView" | "onMount" | "hover" | "manual"
  className?: string
  onAnimationComplete?: () => void
}

const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  subtitle,
  text,
  animationType = "letter",
  animationDelay = 0.05,
  animationDuration = 1,
  trigger = "inView",
  className,
  onAnimationComplete
}) => {
  const split = (str: string) =>
    animationType === "word" ? str.split(" ") : str.split("")

  const titleUnits = title ? split(title) : []
  const subtitleUnits = subtitle ? split(subtitle) : []
  const textUnits = text ? split(text) : []

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * animationDelay,
        duration: animationDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const getMotionProps = (i: number) => {
    const props: any = {
      variants: letterVariants,
      initial: "hidden",
      custom: i,
    }

    if (trigger === "inView") {
      props.whileInView = "visible"
      props.viewport = { once: true, amount: 0.2 }
    } else if (trigger === "onMount") {
      props.animate = "visible"
    } else if (trigger === "hover") {
      props.whileHover = "visible"
    }

    return props
  }

  return (
    <div className={`${styles.heroContainer} ${className || ""}`}>
      {title && (
        <h1 className={styles.heroTitle}>
          {titleUnits.map((unit, i) => (
            <motion.span
              key={`title-${i}`}
              className={styles.letter}
              onAnimationComplete={onAnimationComplete}
              {...getMotionProps(i)}
            >
              {(unit === "m" || unit === "M") ? (
                <span className={styles.mLetter}>{unit}</span>
              ) : (
                <>
                  {unit}
                  {animationType === "word" && " "}
                </>
              )}
            </motion.span>
          ))}
        </h1>
      )}

      {subtitle && (
        <h2>
          {subtitleUnits.map((unit, i) => (
            <motion.span
              key={`subtitle-${i}`}
              className={styles.subtitleLetter}
              {...getMotionProps(i + titleUnits.length)}
            >
              {unit}
              {animationType === "word" && " "}
            </motion.span>
          ))}
        </h2>
      )}

      {text && (
        <p>
          {textUnits.map((unit, i) => (
            <motion.span
              key={`text-${i}`}
              className={styles.textLetters}
              {...getMotionProps(i + titleUnits.length + subtitleUnits.length)}
            >
              {unit}
              {animationType === "word" && " "}
            </motion.span>
          ))}
        </p>
      )}
    </div>
  )
}

export default HeroTitle
