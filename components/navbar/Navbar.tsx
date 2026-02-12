"use client"

import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"
import NavLinks from "@/components/navbar/components/NavLinks"
import { TopCorners } from "@/components/navbar/components/Topcorners"
import { useSectionRefs } from "@/context/section-context"

export default function Navbar() {
  const [isBlurred, setIsBlurred] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const { isDarkSection } = useSectionRefs()

  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const navWidth = useTransform(scrollY, [0, 100], ["100%", "fit-content"])
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0rem 0rem 1.7rem 1.7rem", "2rem 2rem 2rem 2rem"])
  const navPaddingInline = useTransform(scrollY, [0, 100], ["5rem", "0rem"])
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const navTranslateY = useTransform(scrollY, [0, 100], ["0px", "15px"])
  const navTransition = useTransform(scrollY, [0, 100], ["0.3s", "0.3s"])
  // const scrollMax = typeof window !== "undefined" ? document.body.scrollHeight - window.innerHeight : 100
  // const scrollProgress = useTransform(scrollY, [0, 100], [0, 100])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  const colorModeClass = isDarkSection ? styles.navbarLight : styles.navbarDark

  return (
    <motion.div
      className={styles.nav_container}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <TopCorners isBlurred={isBlurred} position="left" className=" z-50" isDarkSection={isDarkSection} />

      <motion.nav
        className={`${styles.navbar} ${isBlurred ? styles.navbarBlur : ""} ${colorModeClass}`}
        aria-label="Main navigation"
        style={{
          borderRadius: navBorderRadius,
          zIndex: navZIndex,
          width: navWidth,
          y: navTranslateY,
          transition: navTransition,
          position: 'relative',
          paddingInline: navPaddingInline
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] border-[3px] border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]"
        >
          {/* <motion.div
            className="absolute aspect-square bg-gradient-to-l opacity-80"
            style={{
              width: 60,
              offsetPath: `rect(0 auto auto 0 round 60px)`,
              background: isDarkSection
                ? `linear-gradient(to left, var(--quaternary-color), var(--quinary-color), transparent)`
                : `linear-gradient(to left, var(--secondary-color), var(--primary-color), transparent)`,
              offsetDistance: useTransform(scrollProgress, [0, 100], ["375%", "100%"])
            }}
          /> */}
        </motion.div>
        <div
          className={styles.mobileMenuToggle}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
        >
          <div className={`${styles.hamburger} ${isMenuOpen ? 'open' : ''}`}>
          </div>
        </div>

        <NavLinks isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} isDarkSection={isDarkSection} />
      </motion.nav>

      <TopCorners isBlurred={isBlurred} position="right" className=" z-50" isDarkSection={isDarkSection} />
    </motion.div>
  )
}
