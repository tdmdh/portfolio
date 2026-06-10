"use client"

import { useEffect, useState, useContext } from "react"
import { motion } from "framer-motion"
import { ScrollAnimationContext, type ScrollPhase } from "@/context/scroll-animation-controller"
import styles from "@/app/styles/Navbar.module.css"

const SECTIONS: { id: ScrollPhase; label: string; index: number }[] = [
  { id: "hero",     label: "Home",     index: 0 },
  { id: "about",    label: "About",    index: 1 },
  { id: "projects", label: "Projects", index: 2 },
  { id: "contact",  label: "Contact",  index: 3 },
]

export default function Navbar() {
  const scrollContext = useContext(ScrollAnimationContext)
  const [activePhase, setActivePhase] = useState<ScrollPhase>("hero")

  useEffect(() => {
    if (!scrollContext) return
    const cb = (phase: ScrollPhase) => setActivePhase(phase)
    scrollContext.onSectionEnter(cb)
    return () => scrollContext.offSectionEnter(cb)
  }, [scrollContext])

  const navigate = (index: number) => scrollContext?.navigateTo(index)

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          className={`${styles.navLink} ${activePhase === section.id ? styles.active : ""}`}
          onClick={() => navigate(section.index)}
          aria-current={activePhase === section.id ? "page" : undefined}
        >
          {activePhase === section.id && (
            <motion.div
              layoutId="navPill"
              className={styles.activePill}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className={styles.label}>{section.label}</span>
        </button>
      ))}
    </nav>
  )
}
