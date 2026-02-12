"use client"

import { motion } from "framer-motion"
import styles from "@/app/styles/Skills.module.css"
import { forwardRef, useRef } from "react"
import { useInView } from "framer-motion"
import { Icon } from "@iconify/react"

const skillCategories = [
    {
        title: "Frontend",
        icon: "solar:code-bold-duotone",
        skills: [
            { name: "React Native", icon: "tabler:device-mobile-code" },
            { name: "Next.js", icon: "logos:nextjs-icon" },
            { name: "TypeScript", icon: "logos:typescript-icon" },
            { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
            { name: "SCSS", icon: "logos:sass" },
        ]
    },
    {
        title: "Backend",
        icon: "solar:server-bold-duotone",
        skills: [
            { name: "Go", icon: "logos:go" },
            { name: "Node.js", icon: "logos:nodejs-icon" },
            { name: "PHP", icon: "logos:php" },
            { name: "PostgreSQL", icon: "logos:postgresql" },
        ]
    },
    {
        title: "Tools & Cloud",
        icon: "solar:cloud-bold-duotone",
        skills: [
            { name: "Git", icon: "logos:git-icon" },
            { name: "Docker", icon: "logos:docker-icon" },
            { name: "Google Cloud", icon: "logos:google-cloud" },
            { name: "OAuth/JWT", icon: "logos:jwt-icon" },
            { name: "WebSocket", icon: "carbon:ibm-cloud-websockets" },
            { name: "LLM Integration", icon: "fluent:brain-circuit-24-regular" },
        ]
    }
]

const SkillCard = ({ name, icon, index }: { name: string; icon: string; index: number }) => {
    return (
        <motion.div
            className={styles.skillCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
        >
            <div className={styles.iconWrapper}>
                <Icon icon={icon} className={styles.skillIcon} />
            </div>
            <span className={styles.skillName}>{name}</span>
        </motion.div>
    )
}

const SkillCategory = ({ category, categoryIndex }: { category: typeof skillCategories[0]; categoryIndex: number }) => {
    return (
        <motion.div
            className={styles.categorySection}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
        >
            <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                    <Icon icon={category.icon} width={24} height={24} />
                </div>
                {/* <h3 className={styles.categoryTitle}>{category.title}</h3> */}
            </div>
            <div className={styles.skillsGrid}>
                {category.skills.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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