"use client"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import styles from "@/app/school/styles/School.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, School } from "lucide-react"

export default function LayoutSwitchButton() {
  const [isBlurred, setIsBlurred] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()

  const handleClick = () => {
    router.push(pathname === "/school" ? "/" : "/school")
  }

  // Scroll-driven style updates
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsBlurred(y > 50)

      const btn = btnRef.current
      if (!btn) return
      const t = Math.min(y / 100, 1)
      const radius = `${t * 2}rem`
      btn.style.borderTopLeftRadius = radius
      btn.style.borderTopRightRadius = radius
      btn.style.borderBottomRightRadius = "2rem"
      btn.style.borderBottomLeftRadius = radius
      btn.style.zIndex = t > 0.5 ? "10" : "0"
      btn.style.transform = `translate(${t * 15}px, ${t * 15}px)`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleWitdh = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleWitdh()
    window.addEventListener("resize", handleWitdh)
    return () => window.removeEventListener("resize", handleWitdh)
  }, [])

  // Entry animation
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div ref={mainRef} className={styles.main} style={{ opacity: 0 }}>

      <div className={styles.btncontainer}>
        <button
        ref={btnRef}
        className={`${styles.schoolbtn} ${isBlurred ? styles.schoolbtnBlur : ""}`}
        style={{ transition: "border-radius 0.3s, transform 0.3s" }}
        onClick={handleClick}
        >
         <span className={styles.btnLink}>
            {isMobile ? (
              pathname === "/school" ? <Home size={20} /> : <School size={20} />
            ) : (
              pathname === "/school" ? "Back to Portfolio" : "School Section"
            )}
          </span>
        </button>
      <TopCorners position="right" isBlurred={isBlurred} rotate={0}  fill="#4a4e69"  />
      </div>

      <TopCorners position="left" isBlurred={isBlurred} className={styles.bottomLeftCorner} rotate={0} fill="#4a4e69" />
    </div>
  )
}
