"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/Hero.module.css"
import { useSectionRefs } from "@/context/section-context"

interface HeroProps {
  title?: string 
  subtitle?: string
  isBlurred?: boolean
  className?: string
  children?: React.ReactNode
}

export default function Cta({ title, subtitle, isBlurred, className, children }: HeroProps) {
  const { refs } = useSectionRefs()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapRef.current) {
      gsap.fromTo(wrapRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
    }
  }, [])

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
      <div ref={wrapRef} style={{ opacity: 0 }}>
        <button
          ref={buttonRef}
          className={styles.ctaWarp}
          onClick={scrollToProjects}
          onMouseMove={handleMouseMove}
          style={{ transition: "transform 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)" }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
          onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.95)" }}
          onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)" }}
        >
          Explore The Galaxy 
        </button>
      </div>
    </section>
  )
}
