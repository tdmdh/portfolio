"use client"
import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "@/app/styles/Navbar.module.css"
import { motion, useScroll, useTransform } from "framer-motion"

const NAV_LINKS = [
  { name: "Blog", path: "/blog" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollY } = useScroll()
  const navHeight = useTransform(scrollY, [0, 100], ["67px", "70px"])
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0rem 0rem 1.7rem 1.7rem", "0rem 0rem 1rem 1rem"])
  const navBoxShadow = useTransform(scrollY, [0, 100], ["none", "0 4px 20px rgba(0, 0, 0, 0.1)"])
  
  // Calculate scroll height only on client side
  const scrollMax = isMounted ? document.body.scrollHeight - window.innerHeight : 1000
  const progressScaleX = useTransform(scrollY, [0, scrollMax], [0, 1])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  if (!isMounted) {
    return null // Or a loading placeholder
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.nav_container}
    >
      <svg
        className={styles.topLeft}
        width="30"
        height="30"
        viewBox="0 0 60 60"
        fill="#f2e9e4"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(90deg)" }}
      >
        <g transform="scale(2)" clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f2e9e4" />
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="#f2e9e4" />
          </clipPath>
        </defs>
      </svg>

      <motion.nav
        className={styles.navbar}
        style={{
          height: navHeight,
          boxShadow: navBoxShadow,
          borderRadius: navBorderRadius,
        }}
        aria-label="Main navigation"
      >
        {/* Progress indicator */}
        <motion.div
          className={styles.progressBar}
          style={{
            scaleX: progressScaleX,
            transformOrigin: "left",
          }}
        />

        <ul
          className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}
          id="menu"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_LINKS.map((item, index) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${pathname.startsWith(item.path) ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
              >
                <motion.span
                  className={styles.linkText}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.name}
                </motion.span>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="hoverBackground"
                    className={styles.hoverBackground}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                {pathname.startsWith(item.path) && (
                  <motion.div className={styles.activeIndicator} layoutId="activeIndicator" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.nav>

      <svg
        className={styles.bottomRight}
        width="30"
        height="30"
        viewBox="0 0 60 60"
        fill="#f2e9e4"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(360deg)" }}
      >
        <g transform="scale(2)" clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f2e9e4" />
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="#f2e9e4" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  )
}