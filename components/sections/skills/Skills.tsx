"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Skills.module.css"
import { useInView } from "framer-motion"
import { forwardRef } from "react"

const Skills = forwardRef<HTMLDivElement>((props, ref) => {
    const [isBlurred, setIsBlurred] = useState(false)


    return (
        <motion.div 
            ref={ref}
            className={styles.main}
            initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
            animate={{ backdropFilter: isBlurred ? "blur(10px)" : "blur(0px)", opacity: isBlurred ? 0.8 : 1 }}
            transition={{ backdropFilter: { duration: 0.3 }, opacity: { duration: 0.3 } }}
        >
            <h2>Skills</h2>
            <p>Here are some of my skills!</p>
        </motion.div>
    )
} )
Skills.displayName = "Skills"
export default Skills