"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"

import { useInView } from "framer-motion"
import { forwardRef } from "react"

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
    const [isBlurred, setIsBlurred] = useState(false)

    

    return (
        <motion.div
            ref={ref}
            className={styles.main}
        >
            <h2>Projects</h2>
            <p>Here are some of my projects!</p>
        </motion.div>
    )
});

Projects.displayName = "Projects" 

export default Projects  