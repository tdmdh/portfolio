
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

const skillCategories: { title: string; skills: SkillEntry[] }[] = [
  {
    title: "Frontend",
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
    skills: [
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { type: 'badge', label: "Node.js", name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { type: "gradient", name: "api-gradient", gradient: "linear-gradient(135deg,#4a4e69 0%,#9a8c98 100%)", label: "API" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { type: "code", name: "curly-code", text: "{ }", color: "#777BB4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { type: "badge", name: "pg-badge", label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ]
  },
  {
    title: "Tools & Cloud",
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

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const wordFgRefs = useRef<(HTMLSpanElement | null)[]>([])


  


  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      containerRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [ref]
  )

  useEffect(() => {
    const container = containerRef.current
    const grid = gridRef.current
    if (!container || !grid) return

    const ctx = gsap.context(() => {
      // Pin the grid while scrolling through the container
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: grid,
        pinSpacing: false,
        onUpdate: (self) => {
          const p = self.progress
          const total = wordFgRefs.current.length
          wordFgRefs.current.forEach((el, i) => {
            if (!el) return
            const start = i / total
            const end = start + 1 / total
            el.style.opacity = p <= start ? "0" : p >= end ? "1" : String((p - start) / (end - start))
          })
        },
      })

      // Animate corner cards on scroll into view
      const cornerCards = grid.querySelectorAll(`.${styles.cornerCard}`)
      cornerCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1,
            duration: 0.6, ease: "back.out(1.4)",
            delay: i * 0.06,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        )
      })

      // Text card
      gsap.fromTo(`.${styles.textCard}`,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.textCard}`, start: "top 90%", once: true },
        }
      )

      // Decoration cards (chaotic grid + floaters)
      const decorCards = grid.querySelectorAll(`.${styles.decorCard}, .${styles.decorCardFloat}`)
      gsap.from(decorCards, {
        opacity: 0,
        scale: 0.3,
        y: () => gsap.utils.random(-40, 40),
        x: () => gsap.utils.random(-20, 20),
        rotation: () => gsap.utils.random(-60, 60),
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: { amount: 0.5, from: "random" },
        scrollTrigger: {
          trigger: grid,
          start: "top 75%",
          once: true
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])
  const words = aboutText.split(" ")


  return (
    <div ref={setRefs} className={styles.main}>
      <div ref={gridRef} className={styles.bentoGrid}>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.frontendCard}`}>
          <div className={styles.skillIcons}>
          <TriangleSkills skills={skillCategories[0].skills} corner='top-left' />
          </div>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.accentCard}`}>
          <div className={styles.meshWrap}>
            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />
            <div className={`${styles.orb} ${styles.orb3}`} />
            <div className={`${styles.orb} ${styles.orb4}`} />
            <div className={styles.meshNoise} />
          </div>
        </div>

        <div className={`${styles.card} ${styles.textCard}`}>
          <div className={styles.textHeader}>
            <span className={styles.label}>Get To Know Me</span>
            <h2 className={styles.title}>
              About <span className={styles.highlight}>Me</span>
            </h2>
          </div>
          <p className={styles.revealText}>
            {words.map((word, i) => (
              <span key={i} className={styles.wordWrapper}>
                <span className={styles.wordBg}>{word}</span>
                <span
                  ref={(el) => { wordFgRefs.current[i] = el }}
                  className={styles.wordFg}
                >
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.backendCard}`}>
          <div className={styles.skillIcons}>
            <TriangleSkills skills={skillCategories[1].skills} corner='bottom-left' />
          </div>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.toolsCard}`}>
          <div className={styles.skillIcons}>
            <TriangleSkills skills={skillCategories[2].skills} corner='bottom-right' />
          </div>
        </div>
      </div>
    </div>
  )
})

About.displayName = "About"

export default About




type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function chunkSkills(skills: SkillEntry[]) {
  const rows: SkillEntry[][] = [];
  let index = 0;
  let size = 1;

  while (index < skills.length) {
    rows.push(skills.slice(index, index + size));
    index += size;
    size++;
  }

  return rows;
}

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
  // default: icon
  return (
    <div className={styles.skillIcon} title={entry.name}>
      <entry.icon size={40} color={entry.color} />
    </div>
  )
}

export function TriangleSkills({
  skills,
  corner,
}: {
  skills: SkillEntry[];
  corner: Corner;
}) {
  const rows = chunkSkills(skills);

  const isRightSide = corner === "top-right" || corner === "bottom-right";

  const displayRows =
    corner === "top-left" || corner === "top-right"
      ? [...rows].reverse()
      : rows;

  return (
    <div className={`${styles.triangle} ${styles[corner]}`}>
      {displayRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`${styles.row} ${isRightSide ? styles.rowRight : styles.rowLeft}`}
        >
          {row.map((entry) => (
            <SkillEntryCard key={entry.name} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}

