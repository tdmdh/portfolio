"use client"

import { useRef } from "react"
import styles from "@/app/styles/Hero.module.css"
import { useSectionRefs } from "@/context/section-context"
import { motion } from "framer-motion"

interface HeroProps {
  title?: string 
  subtitle?: string
  isBlurred?: boolean
  className?: string
}

export default function Cta({ title, subtitle, isBlurred, className }: HeroProps) {
  const { refs } = useSectionRefs()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    button.style.setProperty("--x", `${x}%`)
    button.style.setProperty("--y", `${y}%`)
  }

  const scrollToProjects = () => {
    const y = refs.projectsRef.current?.getBoundingClientRect().top! + window.scrollY - 70
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section ref={refs.heroRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          ref={buttonRef}
          className={styles.ctaWarp}
          onClick={scrollToProjects}
          onMouseMove={handleMouseMove}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore The Galaxy
        </motion.button>
      </motion.div>
    </section>
  )
}
