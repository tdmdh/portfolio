"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { AboutScrollSection } from "@/components/ui/AboutScrollSection"

const skillCategories = [
  {
    title: "Frontend",
    icon: "solar:code-bold-duotone",
    skills: [
      { name: "React Native", icon: "tabler:device-mobile-code" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "SCSS", icon: "logos:sass" },
    ]
  },
  {
    title: "Backend",
    icon: "solar:server-bold-duotone",
    skills: [
      { name: "Go", icon: "logos:go" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "PHP", icon: "logos:php" },
    ]
  },
  {
    title: "Tools & Cloud",
    icon: "solar:cloud-bold-duotone",
    skills: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" },
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
        ease: [0.25, 0.46, 0.45, 0.94],
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
