"use client"

import { motion } from "framer-motion"
import styles from "@/app/styles/Skills.module.css"
import { forwardRef, useRef } from "react"
import { useInView } from "framer-motion"

const skillCategories = [
    {
        title: "Frontend",
        icon: "",
        skills: [

            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "TypeScript", level: 85 },
            { name: "GSAP", level: 80 },
            { name: "Tailwind CSS", level: 85 },
            { name: "Framer Motion", level: 80 },
            { name: "Sass", level: 100 },
        ]
    },
    {
        title: "Backend",
        icon: "",
        skills: [
            { name: "Go", level: 80 },
            { name: "Node.js", level: 75 },
            { name: "PHP", level: 60 },
            { name: "REST API", level: 90 },
            { name: "gRPC", level: 10 },
            { name: "PostgreSQL", level: 60 },
            { name: "Redis", level: 20 },
        ]
    },
    {
        title: "Tools & Services",
        icon: "",
        skills: [
            { name: "Git", level: 50 },
            { name: "Docker", level: 45 },
            { name: "Google Cloud", level: 60 },
            { name: "WebSocket", level: 60 },
            { name: "OAuth/JWT", level: 85 },
            { name: "Virtual Machines", level: 30 },
            { name: "LLM", level: 15 },
        ]
    }
]

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            className={styles.skillItem}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className={styles.skillHeader}>
                <span className={styles.skillName}>{name}</span>
                <span className={styles.skillLevel}>{level}%</span>
            </div>
            <div className={styles.skillBarBg}>
                <motion.div
                    className={styles.skillBarFill}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    )
}

const SkillCategory = ({ category, categoryIndex }: { category: typeof skillCategories[0]; categoryIndex: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            className={styles.categoryCard}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
        >
            <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
            </div>
            <div className={styles.skillsList}>
                {category.skills.map((skill, index) => (
                    <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    )
}

const Skills = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            className={styles.main}
        >
            <div className={styles.content}>
                <motion.div
                    ref={containerRef}
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className={styles.label}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        What I Work With
                    </motion.span>
                    <h2 className={styles.title}>
                        My <span className={styles.highlight}>Skills</span> & Expertise
                    </h2>
                    <p className={styles.subtitle}>
                        From frontend animations to backend microservices, here are the technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className={styles.categoriesGrid}>
                    {skillCategories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            category={category}
                            categoryIndex={index}
                        />
                    ))}
                </div>

                {/* Tech Stack Icons */}
                <motion.div
                    className={styles.techStack}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <span className={styles.techLabel}>Currently building with</span>
                    <div className={styles.techIcons}>
                        {["Next.js", "TypeScript", "Go", "PostgreSQL", "gRPC", "Redis"].map((tech, index) => (
                            <motion.div
                                key={tech}
                                className={styles.techBadge}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
})

Skills.displayName = "Skills"
export default Skills