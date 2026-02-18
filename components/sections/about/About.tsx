"use client"

import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
    SiGo, SiNodedotjs, SiPhp, SiPostgresql,
    SiGit, SiDocker, SiGooglecloud
} from "react-icons/si"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

interface SkillItem {
    name: string
    icon: IconType
    color: string
}

const skillCategories: { title: string; skills: SkillItem[] }[] = [
    {
        title: "Frontend",
        skills: [
            { name: "React (Native)", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
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
            { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
        ]
    }
]

const aboutText = "I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust."

const fadeUp = {
  hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      mass: 0.8,
      delay,
    },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 22,
      mass: 0.7,
      delay,
    },
  }),
}

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

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

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: grid,
      pinSpacing: false,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => trigger.kill()
  }, [])

  const words = aboutText.split(" ")

  return (
    <div ref={setRefs} className={styles.main}>
      <div ref={gridRef} className={styles.bentoGrid}>
        {/* Top-left corner: Frontend */}
        <motion.div
          className={`${styles.card} ${styles.cornerCard} ${styles.frontendCard}`}
          custom={0}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.cardLabel}>Frontend</span>
          <div className={styles.skillIcons}>
            {skillCategories[0].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top-right corner: Accent gradient */}
        <motion.div
          className={`${styles.card} ${styles.cornerCard} ${styles.accentCard}`}
          custom={0.06}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.accentGradient} />
        </motion.div>

        {/* Center: Text reveal card */}
        <motion.div
          className={`${styles.card} ${styles.textCard}`}
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.textHeader}>
            <span className={styles.label}>Get To Know Me</span>
            <h2 className={styles.title}>
              About <span className={styles.highlight}>Me</span>
            </h2>
          </div>
          <p className={styles.revealText}>
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              const wordOpacity =
                progress <= start
                  ? 0
                  : progress >= end
                    ? 1
                    : (progress - start) / (end - start)
              return (
                <span key={i} className={styles.wordWrapper}>
                  <span className={styles.wordBg}>{word}</span>
                  <span
                    className={styles.wordFg}
                    style={{ opacity: wordOpacity }}
                  >
                    {word}
                  </span>
                </span>
              )
            })}
          </p>
        </motion.div>

        {/* Bottom-left corner: Backend */}
        <motion.div
          className={`${styles.card} ${styles.cornerCard} ${styles.backendCard}`}
          custom={0.16}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.cardLabel}>Backend</span>
          <div className={styles.skillIcons}>
            {skillCategories[1].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom-right corner: Tools & Cloud */}
        <motion.div
          className={`${styles.card} ${styles.cornerCard} ${styles.toolsCard}`}
          custom={0.2}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.cardLabel}>Tools & Cloud</span>
          <div className={styles.skillIcons}>
            {skillCategories[2].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
})

About.displayName = "About"

export default About
