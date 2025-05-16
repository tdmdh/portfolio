"use client"
import React from "react"
import { forwardRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Slogan from "@/components/sections/components/Slogan"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Cta from "@/components/ui/Cta"
import styles from "@/app/school/styles/Assignments.module.css"

import { AssignmentOne } from "@/app/school/components/assignments/AssignmentOne"
import { AssignmentTwo } from "@/app/school/components/assignments/AssignmentTwo"

const Assignments = forwardRef<HTMLDivElement> ((props, ref) => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  
  return (
    <div
    ref={ref} 
    className={styles.main} 
    >
      <HeroTitle  
          title="Assignments" 
          className={styles.header} 
          animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5}
          />
     <div className=" flex gap-10" >
        <AssignmentOne />
        <AssignmentTwo />
      </div>
    </div>
  )
});

Assignments.displayName = "Assignments"
export default Assignments
