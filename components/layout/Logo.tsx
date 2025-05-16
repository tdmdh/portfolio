"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/Logo.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"
// import { TopCorners } from "@/components/sections/components/Topcorners"
import Link from "next/link"
import Image from "next/image"


export default function Logo() {
  const [isBlurred, setIsBlurred] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 50) {
        setIsBlurred(true)
      } else {
        setIsBlurred(false)
      }
    })
  }, [scrollY])
  
  const pathname = usePathname()


  const borderTopLeftRadius = useTransform(scrollY, [0, 100], ["2rem", "2rem"])
  const borderTopRightRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])
  const borderBottomRightRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])
  const borderBottomLeftRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])  
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const btnTranslateY = useTransform(scrollY, [0, 100], ["0px", "-15px"])
  const btnTranslateX = useTransform(scrollY, [0, 100], ["0px", "-15px"])
  const btnTransition = useTransform(scrollY, [0, 100], ["0.3s", "0.3s"])



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div
    >
        <motion.div className={styles.main} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <TopCorners position="left" fill="#4a4e69" rotate={180} isBlurred={isBlurred}  />
          <motion.div
            className={styles.btncontainer}>
            <TopCorners position="right" fill="#4a4e69" rotate={180} isBlurred={isBlurred} />
            <motion.button 
            className={styles.logobtn}
            style={{
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              zIndex: navZIndex,
              x: btnTranslateX,
              y: btnTranslateY,
              transition: btnTransition
            }}
            >
              <Link href="/"  >
                    <Image src="/svg/MDH.svg"  alt="Logo" width={100} height={100} />
              </Link>

            </motion.button>
          </motion.div>
        </motion.div>
      </div>
  )
}
