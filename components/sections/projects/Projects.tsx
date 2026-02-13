"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"
import { forwardRef, useRef, useState, useEffect, useCallback } from "react"
import { ProjectCard } from "./components/project-card"
import { useProjectsAnimation } from "./hooks/useProjectsAnimation"

const projects = [
  {
    title: "LLM Controller",
    description: "A controller for LLMs. Built with Go. A part of an bigger project called Sora",
    fullDescription: "A powerful controller for Large Language Models built with Go. This project serves as the backbone of the Sora AI assistant, providing seamless integration with various LLM providers and offering a clean API for model interactions. Features include request queuing, response streaming, and intelligent token management.",
    status: "done" as const,
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
  },
  {
    title: "FitUpp",
    description: "A comprehensive fitness training platform with a React Native mobile app and an intelligent backend written in Go. It offers personalized workout plans, real-time tracking, and adaptive algorithms for user progress.",
    fullDescription: "A comprehensive fitness training platform featuring a React Native mobile application paired with an intelligent Go backend. The platform delivers personalized workout plans based on user goals and fitness levels, real-time exercise tracking with form feedback, and adaptive algorithms that evolve with user progress. Includes social features, achievement systems, and detailed analytics.",
    status: "done" as const,
    link: "https://github.com/Mohammed-glr/fit-up",
    linkText: "View Repo",
  },
  {
    title: "Smart CMS",
    description: "A headless CMS with microservices architecture. Built with Go, gRPC, and PostgreSQL for scalable content management.",
    fullDescription: "A next-generation headless CMS built on a robust microservices architecture. Developed using Go for high performance, gRPC for efficient inter-service communication, and PostgreSQL for reliable data persistence. Features include multi-tenant support, real-time content synchronization, advanced caching strategies, and a flexible content modeling system.",
    status: "in-progress" as const,
    link: "https://github.com/tdmdh/smart-cms-server",
    linkText: "View Repo",
  },
  {
    title: "Lornian",
    description: "A comprehensive learning platform designed to make education more enjoyable and productive. Features include interactive courses, progress tracking, and gamification elements.",
    fullDescription: "A revolutionary learning platform that transforms education into an engaging experience. Built with modern web technologies, Lornian offers interactive courses with multimedia content, real-time progress tracking across learning paths, and gamification elements including achievements, leaderboards, and rewards. The platform adapts to individual learning styles and paces.",
    status: "in-progress" as const,
    link: "https://github.com/tdmdh/lornian",
    linkText: "View Repo",
  },
  {
    title: "Sora",
    description: "An AI assistant built with Go and Ollama Models.",
    fullDescription: "An intelligent AI assistant powered by Go and Ollama Models. Sora combines natural language understanding with task automation capabilities. Features include multi-modal interactions, context-aware responses, plugin architecture for extensibility, and integration with various productivity tools. Designed with privacy in mind, all processing happens locally.",
    status: "todo" as const,
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
  },
  {
    title: "SoraOS",
    description: "An intelligent Operating System.",
    fullDescription: "An ambitious project to create an intelligent operating system that puts AI at the core of user interaction. SoraOS reimagines how humans interact with computers, featuring natural language system control, predictive resource management, and seamless integration with the Sora AI assistant. Built from the ground up with security and privacy as foundational principles.",
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [expandedPosition, setExpandedPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

  useProjectsAnimation({
    sectionRef,
    titleRef: headerRef,
    subtitleRef: headerRef,
    scrollSectionRef,
    cardsContainerRef,
    isExpanded: expandedIndex !== null,
  })

  const handleCardClick = useCallback((index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null)
      setExpandedPosition(null)
      document.body.style.overflow = ''
    } else {
      const card = cardRefs.current[index]
      if (card) {
        const rect = card.getBoundingClientRect()
        setExpandedPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        })
      }
      setExpandedIndex(index)
      document.body.style.overflow = 'hidden'
    }
  }, [expandedIndex])

  useEffect(() => {
    if (expandedIndex === null) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return
      isScrolling = true

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 600)

      if (e.deltaY > 0 && expandedIndex < projects.length - 1) {
        setScrollDirection('down')
        setExpandedIndex(expandedIndex + 1)
      } else if (e.deltaY < 0 && expandedIndex > 0) {
        setScrollDirection('up')
        setExpandedIndex(expandedIndex - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedIndex(null)
        setExpandedPosition(null)
        document.body.style.overflow = ''
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (expandedIndex < projects.length - 1) {
          setScrollDirection('down')
          setExpandedIndex(expandedIndex + 1)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (expandedIndex > 0) {
          setScrollDirection('up')
          setExpandedIndex(expandedIndex - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(scrollTimeout)
    }
  }, [expandedIndex])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const itemVariants = {
    hidden: { opacity: 0, x: 120, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        mass: 0.8,
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
            transition: { staggerChildren: 0.08 },
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
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className={styles.cardWrapper}
            >
              <ProjectCard
                index={index + 1}
                title={project.title}
                description={project.description}
                status={project.status}
                link={project.link}
                linkText={project.linkText}
                // onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            className={styles.expandedOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setExpandedIndex(null)
              setExpandedPosition(null)
              document.body.style.overflow = ''
            }}
          >
            <div className={styles.expandedCardContainer} onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={expandedIndex}
                  className={styles.expandedCard}
                  initial={{
                    opacity: 0,
                    y: scrollDirection === 'down' ? 100 : -100,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: scrollDirection === 'down' ? -100 : 100,
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 350,
                    mass: 0.8,
                  }}
                >
                  <div className={styles.expandedCardInner}>
                    <span className={styles.expandedCardNumber}>
                      {String(expandedIndex + 1).padStart(2, "0")}
                    </span>

                    <div className={styles.expandedCardMedia}>
                      <div className={styles.cardPlaceholder} />
                    </div>

                    <div className={styles.expandedCardContent}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.expandedCardTitle}>
                          {projects[expandedIndex].title}
                        </h3>
                        <span className={`${styles.status} ${projects[expandedIndex].status === 'done' ? styles.statusDone :
                            projects[expandedIndex].status === 'in-progress' ? styles.statusInProgress :
                              styles.statusTodo
                          }`}>
                          {projects[expandedIndex].status === 'done' ? 'Completed' :
                            projects[expandedIndex].status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>

                      <p className={styles.expandedCardDescription}>
                        {projects[expandedIndex].fullDescription}
                      </p>

                      {projects[expandedIndex].link && (
                        <a
                          href={projects[expandedIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardButton}
                        >
                          {projects[expandedIndex].linkText}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={styles.expandedNavigation}>
                <div className={styles.expandedNavigationDots}>
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.navigationDot} ${idx === expandedIndex ? styles.navigationDotActive : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setScrollDirection(idx > expandedIndex ? 'down' : 'up')
                        setExpandedIndex(idx)
                      }}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className={styles.expandedHint}>
                  <span>Scroll or use arrows to navigate</span>
                  <span className={styles.expandedDivider}>•</span>
                  <span>Press ESC or click outside to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

Projects.displayName = "Projects"

export default Projects
