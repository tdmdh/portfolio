"use client"
import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"
import { Hamburger } from "@/components/navbar/components/Hamburger"
import  NavLinks  from "@/components/navbar/components/NavLinks"
import { TopCorners } from "@/components/navbar/components/Topcorners"

export default function Navbar() {
  const [isBlurred, setIsBlurred] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const navHeight = useTransform(scrollY, [0, 100], ["60px", "60px"])
  const navWidth = useTransform(scrollY, [0, 100], ["100vw", "40rem"])
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0rem 0rem 1.7rem 1.7rem", "2rem 2rem 2rem 2rem"])
  const navBoxShadow = useTransform(scrollY, [0, 100], ["none", "0 4px 20px rgba(0, 0, 0, 0.1)"])
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const navTranslateY = useTransform(scrollY, [0, 100], ["0px", "15px"])
  const navTransition = useTransform(scrollY, [0, 100], ["0.3s", "0.3s"])
  const scrollMax = typeof window !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1000
  const progressScaleX = useTransform(scrollY, [0, scrollMax], [0, 1])

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
    <motion.div className={styles.nav_container} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <TopCorners isBlurred={isBlurred} position="left" />

      <motion.nav
        className={`${styles.navbar} ${isBlurred ? styles.navbarBlur : ""}`}
        aria-label="Main navigation"
        initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
        animate={{ backdropFilter: isBlurred ? "blur(10px)" : "blur(0px)"}}
        exit={{ backdropFilter: "blur(0px)", opacity: 1 }}
        transition={{ backdropFilter: { duration: 0.3 }, opacity: { duration: 0.3 } }}
        style={{ height: navHeight, boxShadow: navBoxShadow, borderRadius: navBorderRadius, zIndex: navZIndex, width: navWidth, y: navTranslateY, transition: navTransition }}
      >
        <motion.div
         className={styles.progressBar} 
         style={{ scaleX: progressScaleX, transformOrigin: "left"  }} 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
         />
        <NavLinks
         isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </motion.nav>

      <TopCorners isBlurred={isBlurred} position="right" />
    </motion.div>
  )
}
