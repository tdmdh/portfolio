"use client"

import { motion, useInView } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"
import { forwardRef, useRef } from "react"
import { ProjectCard } from "./components/project-card"
import { useProjectsAnimation } from "./hooks/useProjectsAnimation"

const projects = [
  {
    title: "LLM Controller",
    description: "A controller for LLMs. Built with Go. A part of an bigger project called Sora",
    status: "done" as const,
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
  },
  {
    title: "FitUpp",
    description: "A comprehensive fitness training platform with a React Native mobile app and an intelligent backend written in Go. It offers personalized workout plans, real-time tracking, and adaptive algorithms for user progress.",
    status: "done" as const,
    link: "https://github.com/Mohammed-glr/fit-up",
    linkText: "View Repo",
  },
  {
    title: "Smart CMS",
    description: "A headless CMS with microservices architecture. Built with Go, gRPC, and PostgreSQL for scalable content management.",
    status: "in-progress" as const,
    link: "https://github.com/tdmdh/smart-cms-server",
    linkText: "View Repo",
  },
  {
    title: "Lornian",
    description: "A comprehensive learning platform designed to make education more enjoyable and productive. Features include interactive courses, progress tracking, and gamification elements.",
    status: "in-progress" as const,
    link: "https://github.com/tdmdh/lornian",
    linkText: "View Repo",
  },
  {
    title: "Sora",
  description: "An AI assistant built with Go and Ollama Models. ",
    status: "todo" as const,
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
  },
   {
    title: "SoraOS",
    description: "An intelligent Operating System.",
    status: "todo" as const,
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
  },
]

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

  useProjectsAnimation({
    sectionRef,
    titleRef: headerRef,
    subtitleRef: headerRef,
    scrollSectionRef,
    cardsContainerRef,
  })

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
    <div
      ref={(el) => {
        sectionRef.current = el
        if (typeof ref === "function") {
          ref(el)
        } else if (ref) {
          ref.current = el
        }
      }}
      className={styles.main}
    >
      <motion.div
        ref={headerRef}
        className={styles.header}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <motion.span className={styles.label} variants={itemVariants}>
          My Work
        </motion.span>
        <motion.h2 className={styles.title} variants={itemVariants}>
          Featured <span className={styles.highlight}>Projects</span>
        </motion.h2>
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Explore my journey through code — from learning platforms to backend systems, each project represents a step forward in my development career.
        </motion.p>
      </motion.div>

      <div ref={scrollSectionRef} className={styles.scrollSection}>
        <div ref={cardsContainerRef} className={styles.cardsContainer}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index + 1}
              title={project.title}
              description={project.description}
              status={project.status}
              link={project.link}
              linkText={project.linkText}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

Projects.displayName = "Projects"

export default Projects
