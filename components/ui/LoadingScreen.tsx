"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/Loading.module.css"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Letters entrance
      tl.fromTo(
        letterRefs.current,
        {  
          y: 100, 
          opacity: 0,
          scale: 0.3
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1, 
          stagger: 0.08, 
          ease: "elastic.out(1, 0.5)" 
        }
      )

      // Progress bar smooth animation
      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 2.5,
            ease: "power2.inOut"
          },
          "-=0.5"
        )
      }

      tl.to(
        letterRefs.current,
        { 
          y: -100,
          opacity: 0,
          scale: 0.5,
          duration: 0.7, 
          stagger: 0.05,
          ease: "back.in(2)" 
        },
        "+=0.3"
      )

      tl.to(
        containerRef.current,
        { 
          opacity: 0,
          scale: 1.1,
          duration: 0.6, 
          ease: "power2.inOut", 
          onComplete: () => setIsLoading(false) 
        },
        "-=0.3"
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!isLoading) return null

  const name = "MOHAMMED"
  
  return (
    <div ref={containerRef} className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        {/* Name letters */}
        <div className={styles.nameContainer}>
          {name.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) letterRefs.current[i] = el
              }}
              className={styles.letter}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBarWrapper}>
            <div ref={progressRef} className={styles.progressBar} />
          </div>
        </div>
      </div>
    </div>
  )
}
