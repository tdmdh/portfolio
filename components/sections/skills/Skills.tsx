"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/Skills.module.css"
import { forwardRef, useRef, useEffect } from "react"
import type { IconType } from "react-icons"
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
    SiGo, SiNodedotjs, SiPhp, SiPostgresql,
    SiGit, SiDocker, SiGooglecloud, SiJsonwebtokens, SiSocketdotio, SiOpenai
} from "react-icons/si"
import { Code2, Server, Cloud } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
    name: string
    icon: IconType
    color: string
}

interface SkillCategoryData {
    title: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    skills: Skill[]
}

const skillCategories: SkillCategoryData[] = [
    {
        title: "Frontend",
        icon: Code2,
        skills: [
            { name: "React Native", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#171717" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "SCSS", icon: SiSass, color: "#CC6699" },
        ]
    },
    {
        title: "Backend",
        icon: Server,
        skills: [
            { name: "Go", icon: SiGo, color: "#00ADD8" },
            { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ]
    },
    {
        title: "Tools & Cloud",
        icon: Cloud,
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
            { name: "OAuth/JWT", icon: SiJsonwebtokens, color: "#000000" },
            { name: "WebSocket", icon: SiSocketdotio, color: "#010101" },
            { name: "LLM Integration", icon: SiOpenai, color: "#412991" },
        ]
    }
]

const SkillCard = ({ skill }: { skill: Skill }) => {
    const IconComp = skill.icon
    return (
        <div className={styles.skillCard}>
            <div className={styles.iconWrapper}>
                <IconComp size={28} color={skill.color} />
            </div>
            <span className={styles.skillName}>{skill.name}</span>
        </div>
    )
}

const SkillCategory = ({ category }: { category: SkillCategoryData }) => {
    const CategoryIcon = category.icon
    return (
        <div className={styles.categorySection}>
            <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                    <CategoryIcon size={24} />
                </div>
            </div>
            <div className={styles.skillsGrid}>
                {category.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
    )
}

const Skills = forwardRef<HTMLDivElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                `.${styles.header}`,
                { opacity: 0, y: 100, filter: "blur(8px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)",
                    duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: `.${styles.header}`, start: "top 85%", once: true },
                }
            )

            gsap.fromTo(
                `.${styles.categorySection}`,
                { opacity: 0, y: 80, filter: "blur(8px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)",
                    duration: 0.7, ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: `.${styles.categoriesContainer}`, start: "top 85%", once: true },
                }
            )

            gsap.fromTo(
                `.${styles.skillCard}`,
                { opacity: 0, scale: 0.5, filter: "blur(6px)" },
                {
                    opacity: 1, scale: 1, filter: "blur(0px)",
                    duration: 0.5, ease: "back.out(1.4)",
                    stagger: 0.03,
                    scrollTrigger: { trigger: `.${styles.categoriesContainer}`, start: "top 80%", once: true },
                }
            )
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className={styles.main}>
            <div ref={sectionRef} className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.label}>Expertise</span>
                    <h2 className={styles.title}>
                        Technical <span className={styles.highlight}>Skills</span>
                    </h2>
                    <p className={styles.subtitle}>
                        A comprehensive toolkit enabling scalable, performant, and user-centric solutions.
                    </p>
                </div>

                <div className={styles.categoriesContainer}>
                    {skillCategories.map((category) => (
                        <SkillCategory key={category.title} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
})

Skills.displayName = "Skills"
export default Skills