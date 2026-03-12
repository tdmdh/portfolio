"use client"

import { useEffect, useState, useContext } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"
import { useSectionRefs } from "@/context/section-context"
import { ScrollAnimationContext } from "@/context/scroll-animation-controller"

export default function NavLinks({
  isMenuOpen,
  closeMenu,
  isDarkSection = true,
  isHomePage = false,
}: {
  isMenuOpen: boolean
  closeMenu: () => void
  isDarkSection?: boolean
  isHomePage?: boolean
}) {
  const { sections } = useSectionRefs()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeId, setActiveId] = useState<string>("hero")

  const scrollContext = useContext(ScrollAnimationContext)
  const currentPhase = scrollContext?.currentPhase ?? "hero"
  const timelineProgress = scrollContext?.timelineProgress ?? 0

  useEffect(() => {
    setIsScrolled(timelineProgress > 0.25)
  }, [timelineProgress])

  useEffect(() => {
    const phaseToIdMap: Record<string, string> = {
      hero: "hero",
      about: "about",
      projects: "projects",
      contact: "contact",
    }
    setActiveId(phaseToIdMap[currentPhase] || "hero")
  }, [currentPhase])

  const NavLinksStyle = {
    borderRadius: isScrolled ? "2rem" : "3rem",
    zIndex: isScrolled ? 10 : 0,
  }

  const scrollToPhase = (sectionId: string) => {
    closeMenu()
  }

  const colorModeClass = isDarkSection ? styles.linksLight : styles.linksDark

  return (
    <motion.ul
      className={`${styles.nav_links} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menu_open : ""} ${colorModeClass}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.li
          key={section.id}
          className={styles.nav_item}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={NavLinksStyle}
        >
          <button
            className={`${styles.nav_link} ${activeId === section.id ? styles.active : ""}`}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => scrollToPhase(section.id)}
            title={`${section.name} section`}
          >

            {hoveredIndex === index && (
              <motion.span
                layoutId="hoverBackground"
                className={styles.hoverBackground}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,

                }}
              />
            )}
            <span className={styles.linkText}>{section.name}</span>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  )
}
