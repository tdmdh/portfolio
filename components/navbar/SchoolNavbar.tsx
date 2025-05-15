"use client"
import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/school/styles/Navbar.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"
import SchoolNavLinks from "./components/SchoolNavLinks"

export default function SchoolNavbar() {
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

  const navWidth = useTransform(scrollY, [0, 100], ["80rem", "26.2rem"])
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0rem 0rem 1.7rem 1.7rem", "2rem 2rem 2rem 2rem"])
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const navTranslateY = useTransform(scrollY, [0, 100], ["0px", "15px"])
  const navTransition = useTransform(scrollY, [0, 100], ["0.3s", "0.3s"])
  const scrollMax = typeof window !== "undefined" ? document.body.scrollHeight - window.innerHeight : 100
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
      <TopCorners isBlurred={isBlurred} position="left" fill="#050a30" />

      <motion.nav
        className={styles.navbar}
        aria-label="Main navigation"
        style={{ borderRadius: navBorderRadius, zIndex: navZIndex, width: navWidth, y: navTranslateY, transition: navTransition, }}
      >
        <motion.div
         className={styles.progressBar} 
         style={{ scaleX: progressScaleX, transformOrigin: "left"  }} 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
         />
          <SchoolNavLinks isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      </motion.nav>

      <TopCorners isBlurred={isBlurred} position="right" fill="#050a30" />
    </motion.div>
  )
}
