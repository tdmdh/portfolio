"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"

import { useInView } from "framer-motion"
import { forwardRef } from "react"
import HeroTitle from "../components/HeroTitle"

const Projects = forwardRef<HTMLDivElement>((props, ref) => {

    

    return (
        <motion.div
            ref={ref}
            className={styles.main}
        >
            <HeroTitle title="My project"  className={styles.title} />
            <HeroTitle text="

          As a new developer, I haven’t built many projects yet, but I’m currently working on Leornian — a platform designed to make learning more enjoyable and productive."
          className={styles.subTitle}
          />
        </motion.div>
    )
});

Projects.displayName = "Projects" 

export default Projects  