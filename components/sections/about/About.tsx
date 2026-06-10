"use client"

import { forwardRef, useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"
import { useScrollAnimation } from "@/context/scroll-animation-controller"
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass, SiHtml5, SiCss,
  SiGo, SiNodedotjs, SiPhp, SiPostgresql, SiMysql, SiRedis,
  SiGit, SiDocker, SiGooglecloud, SiLinux, SiGithubactions,
} from "react-icons/si"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

type Skill = { name: string; icon: IconType; color: string }

const skillCategories: { title: string; areaClass: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    areaClass: "feCard",
    skills: [
      { name: "React",       icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",     icon: SiNextdotjs,   color: "#000000" },
      { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6" },
      { name: "Tailwind",    icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Sass",        icon: SiSass,        color: "#CC6699" },
      { name: "HTML5",       icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS3",        icon: SiCss,         color: "#1572B6" },
    ],
  },
  {
    title: "Backend",
    areaClass: "beCard",
    skills: [
      { name: "Go",         icon: SiGo,         color: "#00ADD8" },
      { name: "Node.js",    icon: SiNodedotjs,  color: "#5FA04E" },
      { name: "PHP",        icon: SiPhp,        color: "#777BB4" },
      { name: "MySQL",      icon: SiMysql,      color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis",      icon: SiRedis,      color: "#FF4438" },
    ],
  },
  {
    title: "Tools & Cloud",
    areaClass: "toolsCard",
    skills: [
      { name: "Git",            icon: SiGit,            color: "#F05032" },
      { name: "Docker",         icon: SiDocker,         color: "#2496ED" },
      { name: "Google Cloud",   icon: SiGooglecloud,    color: "#4285F4" },
      { name: "Linux",          icon: SiLinux,          color: "#FCC624" },
      { name: "GitHub Actions", icon: SiGithubactions,  color: "#2088FF" },
    ],
  },
]

const aboutText =
  "I'm Mohammed — a dedicated software engineer student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust."

interface AboutProps {
  onEnterViewport?: () => void
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ onEnterViewport }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollContext = useScrollAnimation()

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      sectionRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [ref]
  )

  useEffect(() => {
    if (onEnterViewport) {
      onEnterViewport()
      return
    }
    if (scrollContext) return

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean)
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, stagger: 0.065, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [onEnterViewport, scrollContext])

  return (
    <div ref={setRefs} className={styles.main}>
      <div className={styles.bentoGrid}>

        {/* Bio */}
        <div ref={(el) => { cardRefs.current[0] = el }} className={`${styles.card} ${styles.bioCard}`}>
          <span className={styles.sectionLabel}>Get To Know Me</span>
          <h2 className={styles.bioTitle}>
            About <span className={styles.highlight}>Me</span>
          </h2>
          <p className={styles.bioText}>{aboutText}</p>
        </div>

        {/* Skill cards */}
        {skillCategories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => { cardRefs.current[i + 1] = el }}
            className={`${styles.card} ${styles.skillCard} ${styles[cat.areaClass]}`}
          >
            <span className={styles.cardLabel}>{cat.title}</span>
            <div className={styles.skillGrid}>
              {cat.skills.map((skill) => (
                <div key={skill.name} className={styles.skillChip} title={skill.name}>
                  <skill.icon size={20} color={skill.color} className={styles.chipIcon} />
                  <span className={styles.chipName}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
})

About.displayName = "About"
export default About
