"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/Hero.module.css"

gsap.registerPlugin(ScrollTrigger)

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
  const containerRef = useRef<HTMLDivElement>(null)

  const split = (str: string) =>
    animationType === "word" ? str.split(" ") : str.split("")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const spans = container.querySelectorAll(`.${styles.letter}, .gsap-subtitle-letter, .gsap-text-letter`)
      if (spans.length === 0) return

      gsap.set(spans, { opacity: 0, y: 20 })

      const animProps = {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        ease: "power2.out",
        stagger: animationDelay,
        onComplete: onAnimationComplete,
      }

      if (trigger === "onMount") {
        gsap.to(spans, animProps)
      } else if (trigger === "inView") {
        gsap.to(spans, {
          ...animProps,
          scrollTrigger: { trigger: container, start: "top 85%", once: true },
        })
      }
    }, container)

    return () => ctx.revert()
  }, [trigger, animationDelay, animationDuration, onAnimationComplete])

  const titleUnits = title ? split(title) : []
  const subtitleUnits = subtitle ? split(subtitle) : []
  const textUnits = text ? split(text) : []

  return (
    <div ref={containerRef} className={`${styles.heroContainer} ${className || ""}`}>
      {title && (
        <h1 className={styles.heroTitle}>
          {titleUnits.map((unit, i) => (
            <span
              key={`title-${i}`}
              className={styles.letter}
              style={{ opacity: 0 }}
            >
              {(unit === "m" || unit === "M") ? (
                <span className={styles.mLetter}>{unit}</span>
              ) : (
                <>
                  {unit}
                  {animationType === "word" && " "}
                </>
              )}
            </span>
          ))}
        </h1>
      )}

      {subtitle && (
        <h2>
          {subtitleUnits.map((unit, i) => (
            <span
              key={`subtitle-${i}`}
              className={`${styles.subtitleLetter || ""} gsap-subtitle-letter`}
              style={{ opacity: 0, display: "inline-block" }}
            >
              {unit}
              {animationType === "word" && " "}
            </span>
          ))}
        </h2>
      )}

      {text && (
        <p>
          {textUnits.map((unit, i) => (
            <span
              key={`text-${i}`}
              className={`${styles.textLetters || ""} gsap-text-letter`}
              style={{ opacity: 0, display: "inline-block" }}
            >
              {unit}
              {animationType === "word" && " "}
            </span>
          ))}
        </p>
      )}
    </div>
  )
}

export default HeroTitle
