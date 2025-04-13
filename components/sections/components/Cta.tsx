"use client"

import { useRef } from "react"
import styles from "@/app/styles/Hero.module.css"
import { useSectionRefs } from "@/context/section-context"


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
      {/* Hero content here */}
        <button
          ref={buttonRef}
          className={styles.ctaWarp}
          onClick={scrollToProjects}
          onMouseMove={handleMouseMove}
        >
          Explore The Galaxy
        </button>
    </section>
  )
}
