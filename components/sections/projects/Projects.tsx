"use client"

import styles from "@/app/styles/Projects.module.css"
import { forwardRef, useRef, useState, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export type ProjectStatus = "done" | "in-progress" | "todo"

type ProjectType = "app" | "desktop"

interface Project {
  title: string
  description: string
  fullDescription: string
  status: ProjectStatus
  type: ProjectType
  link: string
  linkText: string
  tech: string[]
  features: string[]
  images: string[]
}

const projects: Project[] = [
  {
    title: "LLM Controller",
    description: "A controller for LLMs. Built with Go. A part of a bigger project called Sora.",
    fullDescription: "A powerful controller for Large Language Models built with Go. This project serves as the backbone of the Sora AI assistant, providing seamless integration with various LLM providers and offering a clean API for model interactions. Features include request queuing, response streaming, and intelligent token management.",
    status: "done",
    type: "desktop",
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
    tech: ["Go", "REST API", "gRPC", "Docker"],
    features: [
      "Request queuing and rate limiting",
      "Response streaming with SSE",
      "Intelligent token management",
      "Multi-provider support",
    ],
    images: [
    ],
  },
  {
    title: "FitUpp",
    description: "A comprehensive fitness training platform with React Native and Go backend.",
    fullDescription: "A comprehensive fitness training platform featuring a React Native mobile application paired with an intelligent Go backend. The platform delivers personalized workout plans based on user goals and fitness levels, real-time exercise tracking with form feedback, and adaptive algorithms that evolve with user progress. Includes social features, achievement systems, and detailed analytics.",
    status: "done",
    type: "app",
    link: "https://github.com/Mohammed-glr/fit-up",
    linkText: "View Repo",
    tech: ["React Native", "Go","REST API", "PostgreSQL", "Docker"],
    features: [
      "Personalized workout plans",
      "Real-time exercise tracking",
      "Social features & achievements",
      "Progress analytics dashboard",
      "Adaptive algorithms for evolving plans",
      "Role-based access control for trainers and users",
      "Generate workout plans based on user goals and fitness levels",
      "Generate receipies based on user dietary preferences and restrictions",

    ],
     images: [
      "/photo/fu5.jpg",
      "/photo/fu1.jpg", 
      "/photo/fu2.jpg", 
      "/photo/fu3.jpg",
      "/photo/fu4.jpg",
      "/photo/fu6.jpg",
      "/photo/fu7.jpg",
      "/photo/fu8.jpg",
      "/photo/fu9.jpg",
      "/photo/fu10.jpg",
      "/photo/fu11.jpg",
      "/photo/fu12.jpg",
    ],
  },
  {
    title: "Smart CMS",
    description: "A headless CMS with microservices architecture. Built with Go, gRPC, and PostgreSQL.",
    fullDescription: "A next-generation headless CMS built on a robust microservices architecture. Developed using Go for high performance, gRPC for efficient inter-service communication, and PostgreSQL for reliable data persistence. Features include multi-tenant support, real-time content synchronization, advanced caching strategies, and a flexible content modeling system.",
    status: "in-progress",
    type: "desktop",
    link: "https://github.com/tdmdh/smart-cms-server",
    linkText: "View Repo",
    tech: ["Go", "gRPC", "Next.js", "PostgreSQL", "Redis"],
    features: [
      "Multi-tenant architecture",
      "Real-time content sync",
      "Advanced caching layer",
      "Flexible content modeling",
    ],
    images: [
      "/photo/cms1.png",
    ],
  },
  {
    title: "Lornian",
    description: "A comprehensive learning platform designed to make education more enjoyable and productive.",
    fullDescription: "A revolutionary learning platform that transforms education into an engaging experience. Built with modern web technologies, Lornian offers interactive courses with multimedia content, real-time progress tracking across learning paths, and gamification elements including achievements, leaderboards, and rewards. The platform adapts to individual learning styles and paces.",
    status: "in-progress",
    type: "desktop",
    link: "https://github.com/tdmdh/lornian",
    linkText: "View Repo",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
    features: [
      "Interactive multimedia courses",
      "Adaptive learning paths",
      "Gamification with achievements",
      "Real-time progress tracking",
    ],
    images: [],
  },
  {
    title: "Sora",
    description: "An AI assistant built with Go and Ollama Models.",
    fullDescription: "An intelligent AI assistant powered by Go and Ollama Models. Sora combines natural language understanding with task automation capabilities. Features include multi-modal interactions, context-aware responses, plugin architecture for extensibility, and integration with various productivity tools. Designed with privacy in mind, all processing happens locally.",
    status: "todo",
    type: "desktop",
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
    tech: ["Go", "Ollama", "React"],
    features: [
      "Multi-modal interactions",
      "Context-aware responses",
      "Plugin architecture",
      "Local-first processing",
    ],
    images: [],
  },
  {
    title: "SoraOS",
    description: "An intelligent Operating System.",
    fullDescription: "An ambitious project to create an intelligent operating system that puts AI at the core of user interaction. SoraOS reimagines how humans interact with computers, featuring natural language system control, predictive resource management, and seamless integration with the Sora AI assistant. Built from the ground up with security and privacy as foundational principles.",
    status: "todo",
    type: "desktop",
    link: "https://github.com/tdmdh/ai-controller",
    linkText: "View Repo",
    tech: ["C++", "Rust", "Assembly", "Go"],
    features: [
      "AI-driven system control",
      "Predictive resource management",
      "Natural language interface",
      "Security-first design",
    ],
    images: [],
  },
]

const statusConfig = {
  done: { label: "Completed", className: styles.statusDone },
  "in-progress": { label: "In Progress", className: styles.statusInProgress },
  todo: { label: "Upcoming", className: styles.statusTodo },
}

/* ═══════════════════════════════════════════
   Project Card (Bento)
   ═══════════════════════════════════════════ */
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) => {
  const { label, className } = statusConfig[project.status]

  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick() } }}>
      <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>

      <div className={styles.cardMedia}>
        {project.images[0] ? (
          <Image src={project.images[0]} alt={project.title} fill className={styles.cardImage} />
        ) : (
          <div className={styles.cardPlaceholder} />
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={`${styles.status} ${className}`}>{label}</span>
        </div>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.techTags}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
        <span className={styles.viewPrompt}>
          View details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   Expanded Project View
   ═══════════════════════════════════════════ */
const ExpandedProject = ({
  project,
  index,
  galleryIndex,
  onGalleryChange,
  onClose,
  overlayRef,
  containerRef,
}: {
  project: Project
  index: number
  galleryIndex: number
  onGalleryChange: (i: number) => void
  onClose: () => void
  overlayRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
}) => {
  const { label, className } = statusConfig[project.status]
  const contentRef = useRef<HTMLDivElement>(null)

  // GSAP entrance for content elements
  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.querySelectorAll("[data-animate]")
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.25,
      }
    )
  }, [project])

  const nextSlide = () => onGalleryChange((galleryIndex + 1) % Math.max(project.images.length, 1))
  const prevSlide = () => onGalleryChange((galleryIndex - 1 + Math.max(project.images.length, 1)) % Math.max(project.images.length, 1))

  return (
    <>
      {/* Close button */}
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18" /><path d="M6 6l12 12" />
        </svg>
      </button>

      <div ref={containerRef} className={`${styles.expandedCardContainer} ${project.type === "app" ? styles.expandedContainerApp : styles.expandedContainerDesktop}`}>
        {/* Gallery Side */}
        <div className={`${styles.expandedGallery} ${project.type === "app" ? styles.expandedGalleryApp : styles.expandedGalleryDesktop}`}>
          {project.images.length > 0 ? (
            project.images.map((img, i) => (
              <div key={i} className={`${styles.gallerySlide} ${i === galleryIndex ? styles.gallerySlideActive : ""}`}>
                <Image src={img} alt={`${project.title} - ${i + 1}`} fill className={`${styles.galleryImage} ${project.type === "app" ? styles.galleryImageApp : styles.galleryImageDesktop}`} />
              </div>
            ))
          ) : (
            <div className={styles.galleryPlaceholder}>
              <svg className={styles.galleryPlaceholderIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}

          {project.images.length > 1 && (
            <>
              <span className={styles.galleryCounter}>
                {galleryIndex + 1} / {project.images.length}
              </span>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`} onClick={(e) => { e.stopPropagation(); prevSlide() }} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowRight}`} onClick={(e) => { e.stopPropagation(); nextSlide() }} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className={styles.galleryNav}>
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.galleryDot} ${i === galleryIndex ? styles.galleryDotActive : ""}`}
                    onClick={(e) => { e.stopPropagation(); onGalleryChange(i) }}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Side */}
        <div ref={contentRef} className={styles.expandedContent}>
          <span data-animate className={styles.expandedNumber}>Project {String(index + 1).padStart(2, "0")}</span>

          <div data-animate className={styles.expandedHeader}>
            <h3 className={styles.expandedTitle}>{project.title}</h3>
            <div className={styles.expandedStatus}>
              <span className={`${styles.status} ${className}`}>{label}</span>
            </div>
          </div>

          <hr data-animate className={styles.expandedDivider} />

          <p data-animate className={styles.expandedDescription}>{project.fullDescription}</p>

          <div data-animate className={styles.expandedTechSection}>
            <span className={styles.expandedTechLabel}>Tech Stack</span>
            <div className={styles.expandedTechTags}>
              {project.tech.map((t) => (
                <span key={t} className={styles.expandedTechTag}>{t}</span>
              ))}
            </div>
          </div>

          <div data-animate className={styles.expandedFeatures}>
            <span className={styles.expandedFeaturesLabel}>Key Features</span>
            <ul className={styles.featuresList}>
              {project.features.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.featureBullet} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {project.link && (
            <div data-animate className={styles.expandedAction}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.expandedButton} onClick={(e) => e.stopPropagation()}>
                {project.linkText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={styles.expandedNavigation}>
        <div className={styles.expandedNavigationDots}>
          {projects.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.navigationDot} ${idx === index ? styles.navigationDotActive : ""}`}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Project ${idx + 1}`}
            />
          ))}
        </div>
        <div className={styles.expandedHint}>
          <span>Press ESC or click outside to close</span>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════
   Main Projects Section
   ═══════════════════════════════════════════ */
const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)
  const expandedContainerRef = useRef<HTMLDivElement>(null)

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  // ── GSAP: Bento grid card entrance ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const headerEls = headerRef.current.children
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }

      // Card stagger reveal
      const cards = cardRefs.current.filter(Boolean)
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }

      // Subtle parallax on cards
      cards.forEach((card) => {
        if (!card) return
        gsap.to(card, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Open expanded view ──
  const handleCardClick = useCallback((index: number) => {
    setExpandedIndex(index)
    setGalleryIndex(0)
    document.body.style.overflow = "hidden"

    // Animate overlay + container in
    requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.classList.add(styles.expandedOverlayVisible)
      }
      if (expandedContainerRef.current) {
        gsap.to(expandedContainerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        })
      }
    })
  }, [])

  // ── Close expanded view ──
  const handleClose = useCallback(() => {
    if (expandedContainerRef.current) {
      gsap.to(expandedContainerRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.97,
        duration: 0.3,
        ease: "power2.in",
      })
    }
    if (overlayRef.current) {
      overlayRef.current.classList.remove(styles.expandedOverlayVisible)
    }
    setTimeout(() => {
      setExpandedIndex(null)
      setGalleryIndex(0)
      document.body.style.overflow = ""
    }, 400)
  }, [])

  // ── ESC key ──
  useEffect(() => {
    if (expandedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") {
        const proj = projects[expandedIndex]
        if (proj.images.length > 1) setGalleryIndex((g) => (g + 1) % proj.images.length)
      }
      if (e.key === "ArrowLeft") {
        const proj = projects[expandedIndex]
        if (proj.images.length > 1) setGalleryIndex((g) => (g - 1 + proj.images.length) % proj.images.length)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [expandedIndex, handleClose])

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      ref={(el) => {
        sectionRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      }}
      className={styles.main}
    >
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <span className={styles.label}>My Work</span>
        <h2 className={styles.title}>
          Featured <span className={styles.highlight}>Projects</span>
        </h2>
        <p className={styles.subtitle}>
          Explore my journey through code — from learning platforms to backend systems,
          each project represents a step forward in my development career.
        </p>
      </div>

      {/* Bento Grid */}
      <div ref={gridRef} className={styles.bentoGrid}>
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            className={styles.cardWrapper}
          >
            <ProjectCard
              project={project}
              index={index}
              onClick={() => handleCardClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Expanded Overlay (always mounted, toggled via CSS class) */}
      <div
        ref={overlayRef}
        className={styles.expandedOverlay}
        onClick={handleClose}
      >
        {expandedIndex !== null && (
          <div onClick={(e) => e.stopPropagation()}>
            <ExpandedProject
              project={projects[expandedIndex]}
              index={expandedIndex}
              galleryIndex={galleryIndex}
              onGalleryChange={setGalleryIndex}
              onClose={handleClose}
              overlayRef={overlayRef}
              containerRef={expandedContainerRef}
            />
          </div>
        )}
      </div>
    </div>
  )
})

Projects.displayName = "Projects"

export default Projects

