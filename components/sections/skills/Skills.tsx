"use client"

import { motion } from "framer-motion"
import styles from "@/app/styles/Skills.module.css"
import { forwardRef, useRef } from "react"
import { useInView } from "framer-motion"
import type { IconType } from "react-icons"
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
    SiGo, SiNodedotjs, SiPhp, SiPostgresql,
    SiGit, SiDocker, SiGooglecloud, SiJsonwebtokens, SiSocketdotio, SiOpenai
} from "react-icons/si"
import { Code2, Server, Cloud } from "lucide-react"

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

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const IconComp = skill.icon
    return (
        <motion.div
            className={styles.skillCard}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.6, delay: index * 0.03 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
        >
            <div className={styles.iconWrapper}>
                <IconComp size={28} color={skill.color} />
            </div>
            <span className={styles.skillName}>{skill.name}</span>
        </motion.div>
    )
}

const SkillCategory = ({ category, categoryIndex }: { category: SkillCategoryData; categoryIndex: number }) => {
    const CategoryIcon = category.icon
    return (
        <motion.div
            className={styles.categorySection}
            initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.8, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
        >
            <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                    <CategoryIcon size={24} />
                </div>
                {/* <h3 className={styles.categoryTitle}>{category.title}</h3> */}
            </div>
            <div className={styles.skillsGrid}>
                {category.skills.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    )
}

const Skills = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef(null)

    return (
        <section ref={ref} className={styles.main}>
            <div className={styles.content}>
                <motion.div
                    ref={containerRef}
                    className={styles.header}
                    initial={{ opacity: 0, y: 100, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className={styles.label}>Expertise</span>
                    <h2 className={styles.title}>
                        Technical <span className={styles.highlight}>Skills</span>
                    </h2>
                    <p className={styles.subtitle}>
                        A comprehensive toolkit enabling scalable, performant, and user-centric solutions.
                    </p>
                </motion.div>

                <div className={styles.categoriesContainer}>
                    {skillCategories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            category={category}
                            categoryIndex={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
})

Skills.displayName = "Skills"
export default Skills