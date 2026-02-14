"use client"

import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef, useRef } from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"
import styles from "@/app/styles/TextReveal.module.css"
import { cn } from "@/app/utils/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

/**
 * Scroll-driven text reveal.
 *
 * Instead of `position: sticky` (which breaks when ANY ancestor has a CSS
 * `transform`, `filter`, or `will-change` — common with Framer Motion), we
 * use `position: absolute` + a scroll-linked translateY to keep the text
 * visually pinned in the viewport. This is immune to ancestor stacking
 * context issues.
 */
export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(({ children, className }, ref) => {
  const internalRef = useRef<HTMLDivElement | null>(null)
  const targetRef = (ref as React.MutableRefObject<HTMLDivElement | null>) || internalRef

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Simulate sticky: translate the absolutely-positioned inner element
  // downward at exactly the scroll rate so it appears pinned in the viewport.
  //
  // scrollYProgress 0 → element at top of container (viewport-top aligned)
  // scrollYProgress 1 → element translated by (containerHeight - windowHeight)
  const y = useTransform(scrollYProgress, (progress) => {
    if (!targetRef.current) return 0
    const containerH = targetRef.current.offsetHeight
    const windowH = window.innerHeight
    return progress * (containerH - windowH)
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={targetRef} className={cn(styles.revealContainer, className)}>
      <motion.div className={styles.revealPinned} style={{ y }}>
        <p className="w-full max-w-5xl text-center text-xl font-semibold leading-relaxed md:text-2xl lg:text-3xl xl:text-4xl">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </motion.div>
    </div>
  )
})

TextReveal.displayName = "TextReveal"

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline-block mx-1">
      <span className={styles.background}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={styles.foreground}
      >
        {children}
      </motion.span>
    </span>
  )
}
