"use client"
import React from "react"
import { forwardRef } from "react"
import Slogan from "@/components/sections/components/Slogan"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Cta from "@/components/ui/Cta"
import styles from "@/app/school/styles/Assignments.module.css"

import { AssignmentOne } from "@/app/school/components/assignments/AssignmentOne"
import { AssignmentTwo } from "@/app/school/components/assignments/AssignmentTwo"
import { AssignmentThree } from "@/app/school/components/assignments/AssignmentThree"
import { AssignmentFour } from "@/app/school/components/assignments/AssignmentFour"

const Assignments = forwardRef<HTMLDivElement> ((props, ref) => {
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
     <div className={styles.assignmentsContainer}>
        
      </div>
    </div>
  )
});

Assignments.displayName = "Assignments"
export default Assignments
