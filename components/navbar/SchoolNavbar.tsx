"use client"
import { useState, useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import styles from "@/app/school/styles/Navbar.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"
import SchoolNavLinks from "./components/SchoolNavLinks"

export default function Navbar() {
  const [isBlurred, setIsBlurred] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 50
      setIsBlurred(scrolled)

      const nav = navRef.current
      if (!nav) return
      const t = Math.min(window.scrollY / 100, 1)
      nav.style.borderRadius = scrolled ? "2rem" : "0rem 0rem 1.7rem 1.7rem"
      nav.style.zIndex = scrolled ? "10" : "0"
      nav.style.width = `${60 - t * 33.8}rem`
      nav.style.transform = `translateY(${t * 15}px)`

      // Progress bar
      const scrollMax = document.body.scrollHeight - window.innerHeight
      if (progressBarRef.current && scrollMax > 0) {
        progressBarRef.current.style.transform = `scaleX(${window.scrollY / scrollMax})`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Entry animation
  useEffect(() => {
    const container = navContainerRef.current
    if (!container) return
    gsap.fromTo(container,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])
 
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div ref={navContainerRef} className={styles.nav_container} style={{ opacity: 0 }}>
      <TopCorners isBlurred={isBlurred} position="left" fill="#050a30" />

      <nav
        ref={navRef}
        className={`${styles.navbar} ${isBlurred ? styles.navbarBlur : ""}`}
        aria-label="Main navigation"
        style={{ transition: "all 0.3s ease" }}
      >
        <div
         ref={progressBarRef}
         className={styles.progressBar} 
         style={{ transform: "scaleX(0)", transformOrigin: "left" }}
         />
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
        <SchoolNavLinks isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      </nav>

      <TopCorners isBlurred={isBlurred} position="right" fill="#050a30" />
    </div>
  )
}
