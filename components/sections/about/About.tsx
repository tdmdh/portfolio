"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { AboutScrollSection } from "@/components/ui/AboutScrollSection"
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
    SiGo, SiNodedotjs, SiPhp, SiPostgresql,
    SiGit, SiDocker, SiGooglecloud
} from "react-icons/si"
import type { IconType } from "react-icons"

interface SkillItem {
    name: string
    icon: IconType
    color: string
}

const skillCategories: { title: string; skills: SkillItem[] }[] = [
    {
        title: "Frontend",
        skills: [
            { name: "React Native", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "SCSS", icon: SiSass, color: "#CC6699" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Go", icon: SiGo, color: "#00ADD8" },
            { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ]
    },
    {
        title: "Tools & Cloud",
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
        ]
    }
]

const aboutText = "I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust."

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <div ref={ref} className={styles.main}>
      <motion.div
        ref={containerRef}
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <span className={styles.label}>Get To Know Me</span>
          <h2 className={styles.title}>
            About <span className={styles.highlight}>Me</span>
          </h2>
        </motion.div>

        <AboutScrollSection text={aboutText} skills={skillCategories} />

      </motion.div>
    </div>
  )
})

About.displayName = "About"

export default About
