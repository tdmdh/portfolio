"use client"

import React, { useRef, forwardRef } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import styles from "@/app/styles/About.module.css"

interface AboutSectionProps extends HTMLMotionProps<"section"> {}

const AboutSectionWrapper = forwardRef<HTMLElement, AboutSectionProps>(({ children, ...props }, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <motion.section
      ref={(el) => {
        sectionRef.current = el
        if (ref) {
          if (typeof ref === "function") ref(el)
          else (ref as React.MutableRefObject<HTMLElement | null>).current = el
        }
      }}
      className={styles.main}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.section>
  )
})

AboutSectionWrapper.displayName = "AboutSectionWrapper"
export default AboutSectionWrapper
