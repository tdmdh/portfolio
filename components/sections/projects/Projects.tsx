"use client"

import { motion } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"

import { forwardRef } from "react"
import HeroTitle from "../components/HeroTitle"
import { ProjectCard } from "./components/project-card"

const Projects = forwardRef<HTMLDivElement>((props, ref) => {

    

    return (
        <motion.div
            ref={ref}
            className={styles.main}
        >
            <HeroTitle title="My project"  className={styles.title} animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5} />
            <HeroTitle text="

          As a new developer, I haven’t built many projects yet, but I’m currently working on Leornian — a platform designed to make learning more enjoyable and productive."
          className={styles.subTitle}
          />
          <motion.div>
            <ProjectCard />
          </motion.div>
        </motion.div>
    )
});

Projects.displayName = "Projects" 

export default Projects   