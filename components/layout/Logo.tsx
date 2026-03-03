"use client"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import styles from "@/app/styles/Logo.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"
import Link from "next/link"
import Image from "next/image"


export default function Logo() {
  const [isBlurred, setIsBlurred] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsBlurred(y > 50)

      const btn = btnRef.current
      if (!btn) return
      const t = Math.min(y / 100, 1)
      btn.style.borderTopLeftRadius = "2rem"
      btn.style.borderTopRightRadius = `${t * 2}rem`
      btn.style.borderBottomRightRadius = `${t * 2}rem`
      btn.style.borderBottomLeftRadius = `${t * 2}rem`
      btn.style.zIndex = t > 0.5 ? "10" : "0"
      btn.style.transform = `translate(${t * -15}px, ${t * -15}px)`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Entry animation
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
    }
  }, [])
  
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div>
        <div ref={mainRef} className={styles.main} style={{ opacity: 0 }}>
        <TopCorners position="left" fill="#4a4e69" rotate={180} isBlurred={isBlurred}  />
          <div
            className={styles.btncontainer}>
            <TopCorners position="right" fill="#4a4e69" rotate={180} isBlurred={isBlurred} />
            <button 
            ref={btnRef}
            className={`${styles.logobtn} ${isBlurred ? styles.logobtnBlur : ""}`}
            style={{ transition: "border-radius 0.3s, transform 0.3s" }}
            >
              <Link href="/"  >
                    <Image src="/svg/MDH.svg"  alt="Logo" width={100} height={100} />
              </Link>

            </button>
          </div>
        </div>
      </div>
  )
}
