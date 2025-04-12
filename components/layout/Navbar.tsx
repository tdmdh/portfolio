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
  const [isBlurred, setIsBlurred] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const navHeight = useTransform(scrollY, [0, 100], ["67px", "70px"])
  const navWidth = useTransform(scrollY, [0, 100], ["100vw", "40vw"])
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0rem 0rem 1.7rem 1.7rem", "2rem 2rem 2rem 2rem"])
  const navBoxShadow = useTransform(scrollY, [0, 100], ["none", "0 4px 20px rgba(0, 0, 0, 0.1)"])
  const navPadding = useTransform(scrollY, [0, 100], ["0rem 0rem", "0rem 0.5rem"])
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0])
  const navTranslateY = useTransform(scrollY, [0, 100], ["0px", "15px"])

  const scrollMax = typeof window !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1000
  const progressScaleX = useTransform(scrollY, [0, scrollMax], [0, 1])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.nav_container}
    >
      <motion.svg
        className={styles.topLeft}
        width="30"
        height="30"
        viewBox="0 0 60 60"
        fill="#f2e9e4"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(180deg)" }}
        animate={{
          y: isBlurred ? -20 : 0,
          opacity: isBlurred ? 0 : 1,
          rotate: 90,
        }}
        transition={{ duration: 0.4 }}
      >
        <g transform="scale(2)" clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 16.431 16.431 0 30 0Z" fill="#f2e9e4" />
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="#f2e9e4" />
          </clipPath>
        </defs>
      </motion.svg>

      <motion.nav
        className={`${styles.navbar} ${isBlurred ? styles.navbarBlur : ""}`}
        style={{
          height: navHeight,
          boxShadow: navBoxShadow,
          borderRadius: navBorderRadius,
          padding: navPadding,
          zIndex: navZIndex,
          width: navWidth,
          y: navTranslateY,
        }}
        aria-label="Main navigation"
        initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
        animate={{
          backdropFilter: isBlurred ? "blur(10px)" : "blur(0px)",
          opacity: isBlurred ? 0.8 : 1,
        }}
        transition={{
          backdropFilter: { duration: 0.3 },
          opacity: { duration: 0.3 },
        }}
      >
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
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                prefetch={true}
              >
                <motion.span
                  className={styles.linkText}
                  whileHover={{ scale: 1.1 }}
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
                {pathname === item.path && (
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

      <motion.svg
        className={styles.topRight}
        width="30"
        height="30"
        viewBox="0 0 60 60"
        fill="#f2e9e4"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(360deg)" }}
        animate={{
          y: isBlurred ? -20 : 0,
          opacity: isBlurred ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <g transform="scale(2)" clipPath="url(#clip0_310_2)">
          <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f2e9e4" />
        </g>
        <defs>
          <clipPath id="clip0_310_2">
            <rect width="30" height="30" fill="#f2e9e4" />
          </clipPath>
        </defs>
      </motion.svg>
    </motion.div>
  )
}