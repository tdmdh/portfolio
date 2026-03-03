"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/Hero.module.css"
import { Carattere } from "next/font/google"

const cormorant = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cormorant",
})

const Slogan: React.FC = () => {
  const sloganText = "Turning ideas into beautiful, interactive realities."
  const sloganLetters = sloganText.split("")
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const letters = containerRef.current.querySelectorAll(`.${styles.sloganLetter}`)
    gsap.fromTo(letters,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }
    )
  }, [])

  return (
    <div className={styles.sloganContainer}>
      <h1
        ref={containerRef}
        className={`${styles.slogan} ${cormorant.className}`}
      >
        {sloganLetters.map((letter, index) => (
          <span
            key={index}
            className={styles.sloganLetter}
            style={{ opacity: 0, display: "inline-block", transition: "transform 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default Slogan
