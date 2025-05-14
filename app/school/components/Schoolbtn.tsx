"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/school/styles/School.module.css"
import { TopCorners } from "@/components/navbar/components/Topcorners"

export default function SchoolBtn() {
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


  const borderTopLeftRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])
  const borderTopRightRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])
  const borderBottomRightRadius = useTransform(scrollY, [0, 100], ["2rem", "2rem"])
  const borderBottomLeftRadius = useTransform(scrollY, [0, 100], ["0rem", "2rem"])  
  const navZIndex = useTransform(scrollY, [0, 100], ["0", "10"])
  const navTranslateY = useTransform(scrollY, [0, 100], ["0px", "15px"])
  const navTranslateX = useTransform(scrollY, [0, 100], ["0px", "15px"])
  const navTransition = useTransform(scrollY, [0, 100], ["0.3s", "0.3s"])



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <motion.div className={styles.main} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

      <motion.div
        className={styles.btncontainer}
        style={{
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          zIndex: navZIndex,
          x: navTranslateX,
          y: navTranslateY,
          transition: navTransition
        }}
              >
        <button className={styles.schoolbtn} >
          School
        </button>
      <TopCorners position="right" isBlurred={isBlurred} rotate={0}  fill="#4a4e69"  />
      </motion.div>

      <TopCorners position="left" isBlurred={isBlurred} className={styles.bottomLeftCorner} rotate={0} fill="#4a4e69" />
    </motion.div>
  )
}
