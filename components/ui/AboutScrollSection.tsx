"use client"

import { ComponentPropsWithoutRef, FC, useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { Icon } from "@iconify/react"
import styles from "@/app/styles/About.module.css"
import { TextReveal } from "@/components/ui/TextReveal"

export interface AboutScrollSectionProps extends ComponentPropsWithoutRef<"div"> {
    text: string
    skills: {
        title: string
        icon: string
        skills: { name: string; icon: string }[]
    }[]
}

export const AboutScrollSection: FC<AboutScrollSectionProps> = ({ text, skills }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Flatten all skills into a single array
    const allSkills = skills.flatMap(cat => cat.skills)
    const totalSkills = allSkills.length

    return (
        <div className={styles.wrapper}>
            {/* The TextReveal component handles its own height/scroll, 
                but we pass a ref to track it for the skills. 
                TextReveal has h-400vh. */}
            <TextReveal ref={containerRef} className={styles.textRevealOverride}>
                {text}
            </TextReveal>

            {/* Skills Overlay */}
            <div className={styles.skillsOverlay}>
                <div className={styles.stickyContainer}>
                     <div className={styles.rotatingFrame}> 
                        {allSkills.map((skill, i) => (
                            <SkillCard 
                                key={skill.name} 
                                skill={skill} 
                                index={i} 
                                total={totalSkills} 
                                progress={scrollYProgress} 
                            />
                        ))}
                     </div>
                </div>
            </div>
        </div>
    )
}

interface SkillCardProps {
    skill: { name: string, icon: string }
    index: number
    total: number
    progress: MotionValue<number>
}

const SkillCard: FC<SkillCardProps> = ({ skill, index, total, progress }) => {
    // 1400px width, 700px height (matches CSS approx or larger)
    // We'll calculate percent-based to be responsive if possible, or fixed large px.
    // User asked for "bigger". Let's go with 1200x700 which is roughly typical laptop screen area minus margins.
    const width = 1200
    const height = 700

    const x = useTransform(progress, (p) => {
        const currentP = (p + (index / total)) % 1
        return getRectangularPosition(currentP, width, height).x
    })

    const y = useTransform(progress, (p) => {
        const currentP = (p + (index / total)) % 1
        return getRectangularPosition(currentP, width, height).y
    })

    return (
        <motion.div
            className={styles.orbitingSkillCard}
            style={{ 
                left: `calc(50 %)`, 
                top: `calc(50 %)`,
                x,
                y
            }}
        >
            <div className={styles.orbitIconWrapper}>
                <Icon icon={skill.icon} width={50} height={50} />
            </div>
            {/* <span className={styles.orbitSkillName}>{skill.name}</span> */}
        </motion.div>
    )
}

// Helper to calculate position on a rectangle perimeter based on progress (0-1)
function getRectangularPosition(progress: number, width: number, height: number) {
    const perimeter = 2 * (width + height)
    const distance = progress * perimeter
    
    // To center it:
    const halfW = width / 2
    const halfH = height / 2

    let x = 0
    let y = 0
    
    if (distance < width) {
        // Top edge: x from -halfW to halfW, y = -halfH
        x = (distance) - halfW
        y = -halfH
    } else if (distance < width + height) {
        // Right edge: x = halfW, y from -halfH to halfH
        x = halfW
        y = (distance - width) - halfH
    } else if (distance < 2 * width + height) {
        // Bottom edge: x from halfW to -halfW, y = halfH
        x = halfW - (distance - (width + height))
        y = halfH
    } else {
        // Left edge: x = -halfW, y from halfH to -halfH
        x = -halfW
        y = halfH - (distance - (2 * width + height))
    }
    
    return { x, y }
}
