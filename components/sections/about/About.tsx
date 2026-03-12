
"use client"
import { forwardRef, useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
  SiGo, SiNodedotjs, SiPhp, SiPostgresql,
  SiGit, SiDocker, SiGooglecloud, SiHtml5, SiMysql, SiRedis
} from "react-icons/si"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

type SkillEntry =
  | { type?: "icon"; name: string; icon: IconType; color: string }
  | { type: "gradient"; name: string; gradient: string; label?: string }
  | { type: "code"; name: string; text: string; color: string }
  | { type: "badge"; name: string; label: string; icon: IconType; color: string }

const skillCategories: { title: string; areaClass: string; skills: SkillEntry[] }[] = [
  {
    title: "Frontend",
    areaClass: "feCard",
    skills: [
      { name: "React (Native)", type: "badge", label: "React (Native)", icon: SiReact, color: "#61DAFB" },
      { name: "React 19", type: "badge", label: "React 19", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { type: "gradient", name: "web-gradient", gradient: "linear-gradient(135deg,#c9ada7 0%,#4a4e69 100%)", label: "Web" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { type: "code", name: "jsx-code", text: "</>", color: "#CC6699" },
      { name: "SCSS", type: "badge", label: "SCSS", icon: SiSass, color: "#CC6699" },
      { name: "HTML", type: "badge", label: "HTML", icon: SiHtml5, color: "#E34F26" },
    ]
  },
  {
    title: "Backend",
    areaClass: "beCard",
    skills: [
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { type: "badge", label: "Node.js", name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { type: "gradient", name: "api-gradient", gradient: "linear-gradient(135deg,#4a4e69 0%,#9a8c98 100%)", label: "API" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { type: "code", name: "curly-code", text: "{ }", color: "#777BB4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { type: "badge", name: "pg-badge", label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ]
  },
  {
    title: "Tools & Cloud",
    areaClass: "toolsCard",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { type: "gradient", name: "devops-gradient", gradient: "linear-gradient(135deg,#050a30 0%,#4a4e69 100%)", label: "DevOps" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
      { type: "code", name: "terminal-code", text: ">_", color: "#4285F4" },
      { name: "Redis", icon: SiRedis, color: "#FF4438" },
      { type: "badge", name: "docker-badge", label: "Docker", icon: SiDocker, color: "#2496ED" },
    ]
  },
]

const aboutText = "I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust."

function SkillEntryCard({ entry }: { entry: SkillEntry }) {
  if (entry.type === "gradient") {
    return (
      <div
        className={styles.skillDecorGradient}
        style={{ ["--decor-bg" as string]: entry.gradient }}
        title={entry.label}
      >
        {entry.label && <span className={styles.skillDecorGradientLabel}>{entry.label}</span>}
      </div>
    )
  }
  if (entry.type === "code") {
    return (
      <div className={styles.skillDecorCode} title={entry.name}>
        <span
          className={styles.skillDecorCodeText}
          style={{ ["--decor-color" as string]: entry.color }}
        >
          {entry.text}
        </span>
      </div>
    )
  }
  if (entry.type === "badge") {
    return (
      <div className={styles.skillDecorBadge} title={entry.name}>
        <entry.icon size={14} color={entry.color} />
        <span
          className={styles.skillDecorBadgeLabel}
          style={{ ["--decor-color" as string]: entry.color }}
        >
          {entry.label}
        </span>
      </div>
    )
  }
  return (
    <div className={styles.skillIcon} title={entry.name}>
      <entry.icon size={36} color={entry.color} />
    </div>
  )
}

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      sectionRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [ref]
  )

  useEffect(() => {
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
  }, [])

  return (
    <div ref={setRefs} className={styles.main}>
      <div className={styles.bentoGrid}>
        {/* Bio Card */}
        <div ref={(el) => { cardRefs.current[0] = el }} className={`${styles.card} ${styles.bioCard}`}>
          <span className={styles.sectionLabel}>Get To Know Me</span>
          <h2 className={styles.bioTitle}>
            About <span className={styles.highlight}>Me</span>
          </h2>
          <p className={styles.bioText}>{aboutText}</p>
        </div>

        {/* Accent Card */}
        <div ref={(el) => { cardRefs.current[1] = el }} className={`${styles.card} ${styles.accentCard}`}>
          <div className={styles.meshWrap}>
            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />
            <div className={`${styles.orb} ${styles.orb3}`} />
            <div className={`${styles.orb} ${styles.orb4}`} />
            <div className={styles.meshNoise} />
          </div>
        </div>

        {/* Skill Cards */}
        {skillCategories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => { cardRefs.current[i + 2] = el }}
            className={`${styles.card} ${styles.skillCard} ${styles[cat.areaClass]}`}
          >
            <span className={styles.cardLabel}>{cat.title}</span>
            <div className={styles.skillGrid}>
              {cat.skills.map((skill) => (
                <SkillEntryCard key={skill.name} entry={skill} />
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
