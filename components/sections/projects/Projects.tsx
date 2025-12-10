"use client"

import styles from "@/app/styles/Projects.module.css"
import { forwardRef, useRef } from "react"
import HeroTitle from "../components/HeroTitle"
import { ProjectCard } from "./components/project-card"
import { useProjectsAnimation } from "./hooks/useProjectsAnimation"

const projects = [
  {
    title: "Leornian",
    description: "A comprehensive learning platform designed to make education more enjoyable and productive. Features include interactive courses, progress tracking, and gamification elements.",
    status: "in-progress" as const,
    link: "https://github.com",
    linkText: "View Repo",
  },
  {
    title: "Portfolio",
    description: "My personal portfolio website showcasing my projects and skills. Built with Next.js, TypeScript, and GSAP for smooth animations.",
    status: "done" as const,
    link: "https://github.com",
    linkText: "View Repo",
  },
  {
    title: "Smart CMS",
    description: "A headless CMS with microservices architecture. Built with Go, gRPC, and PostgreSQL for scalable content management.",
    status: "in-progress" as const,
    link: "https://github.com",
    linkText: "View Repo",
  },
  {
    title: "Messaging Service",
    description: "Real-time messaging service with WebSocket support. Features include conversations, read receipts, and typing indicators.",
    status: "in-progress" as const,
    link: "https://github.com",
    linkText: "View Repo",
  },
  {
    title: "Auth System",
    description: "Secure authentication system with OAuth, JWT tokens, and session management. Supports Google, GitHub, and email providers.",
    status: "done" as const,
    link: "https://github.com",
    linkText: "View Repo",
  },
]

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useProjectsAnimation({
    sectionRef,
    titleRef,
    subtitleRef,
    scrollSectionRef,
    cardsContainerRef,
  })

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
      <div ref={titleRef}>
        <HeroTitle
          title="My Projects"
          className={styles.title}
          animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5}
        />
      </div>
      <div ref={subtitleRef}>
        <HeroTitle
          text="Explore my journey through code — from learning platforms to backend systems, each project represents a step forward in my development career."
          className={styles.subTitle}
        />
      </div>

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
