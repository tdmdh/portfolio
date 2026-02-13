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

    const allSkills = skills.flatMap(cat => cat.skills)
    const totalSkills = allSkills.length

    return (
        <div className={styles.wrapper}>
            <TextReveal ref={containerRef} className={styles.textRevealOverride}>
                {text}
            </TextReveal>

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

    const width = 1600
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

function getRectangularPosition(progress: number, width: number, height: number) {
    const perimeter = 2 * (width + height)
    const distance = progress * perimeter
    
    const halfW = width / 2
    const halfH = height / 2

    let x = 0
    let y = 0
    
    if (distance < width) {
        x = (distance) - halfW
        y = -halfH
    } else if (distance < width + height) {
        x = halfW
        y = (distance - width) - halfH
    } else if (distance < 2 * width + height) {
        x = halfW - (distance - (width + height))
        y = halfH
    } else {
        x = -halfW
        y = halfH - (distance - (2 * width + height))
    }
    
    return { x, y }
}
