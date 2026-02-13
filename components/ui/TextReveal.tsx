"use client"

"use client"

import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef, useRef } from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"
import styles from "@/app/styles/TextReveal.module.css"

import { cn } from "@/app/utils/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal = forwardRef<HTMLDivElement, TextRevealProps>(({ children, className }, ref) => {
  const internalRef = useRef<HTMLDivElement | null>(null)
  // Use the passed ref if available, otherwise use internal
  const targetRef = (ref as React.MutableRefObject<HTMLDivElement | null>) || internalRef

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // To support both internal useScroll and parent using the ref, 
  // we need to ensure the ref is attached. 
  // If 'ref' is a function-style ref, this simple assignment might fail.
  // safer to just use one ref and expose it? 
  // If parent passes ref, they own it. I use it for useScroll.

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={targetRef} className={cn("relative z-0 w-full", className)} style={{ height: '400vh' }}>
      <div className="sticky top-[20vh] left-0 w-full h-[60vh] flex items-center justify-center px-4 overflow-hidden">
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
      </div>
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
