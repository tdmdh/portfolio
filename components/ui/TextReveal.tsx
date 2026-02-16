"use client"

import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/TextReveal.module.css"
import { cn } from "@/app/utils/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

/**
 * GSAP ScrollTrigger-powered text reveal.
 *
 * Uses ScrollTrigger's `pin: true` which physically reparents the pinned
 * element, making it immune to ancestor `transform` / `filter` / `will-change`
 * that break CSS `position: sticky`.
 */
export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(
  ({ children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const pinRef = useRef<HTMLDivElement | null>(null)
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
    const [progress, setProgress] = useState(0)

    // Expose the container ref to the parent if they need it
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(containerRef.current)
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            containerRef.current
        }
      }
    }, [ref])

    useEffect(() => {
      const container = containerRef.current
      const pin = pinRef.current
      if (!container || !pin) return

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress)
        },
      })

      return () => {
        trigger.kill()
      }
    }, [])

    if (typeof children !== "string") {
      throw new Error("TextReveal: children must be a string")
    }

    const words = children.split(" ")

    return (
      <div ref={containerRef} className={cn(styles.revealContainer, className)}>
        <div ref={pinRef} className={styles.revealPin}>
          <p className="w-full max-w-5xl text-center text-xl font-semibold leading-relaxed md:text-2xl lg:text-3xl xl:text-4xl">
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word
                  key={i}
                  ref={(el) => { wordRefs.current[i] = el }}
                  progress={progress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              )
            })}
          </p>
        </div>
      </div>
    )
  }
)

TextReveal.displayName = "TextReveal"

interface WordProps {
  children: ReactNode
  progress: number
  range: [number, number]
}

const Word = forwardRef<HTMLSpanElement, WordProps>(
  ({ children, progress, range }, ref) => {
    // Map progress within range to 0–1
    const wordOpacity =
      progress <= range[0]
        ? 0
        : progress >= range[1]
          ? 1
          : (progress - range[0]) / (range[1] - range[0])

    return (
      <span ref={ref} className="relative inline-block mx-1">
        <span className={styles.background}>{children}</span>
        <span
          style={{ opacity: wordOpacity }}
          className={styles.foreground}
        >
          {children}
        </span>
      </span>
    )
  }
)

Word.displayName = "Word"
