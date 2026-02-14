"use client"

import { ComponentPropsWithoutRef, FC, useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { TextReveal } from "@/components/ui/TextReveal"
import type { IconType } from "react-icons"

export interface SkillData {
    name: string
    icon: IconType
    color: string
}

export interface AboutScrollSectionProps extends ComponentPropsWithoutRef<"div"> {
    text: string
    skills: {
        title: string
        skills: SkillData[]
    }[]
}

export const AboutScrollSection: FC<AboutScrollSectionProps> = ({ text, skills }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    // Orbit animation — full visibility range
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Pinning — same range that TextReveal uses
    const { scrollYProgress: pinProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // JS-driven pinning for the skill overlay (avoids broken position:sticky)
    const skillPinY = useTransform(pinProgress, (progress) => {
        if (!containerRef.current) return 0
        const containerH = containerRef.current.offsetHeight
        const windowH = window.innerHeight
        return progress * (containerH - windowH)
    })

    const allSkills = skills.flatMap(cat => cat.skills)
    const totalSkills = allSkills.length

    return (
        <div className={styles.wrapper}>
            <TextReveal ref={containerRef} className={styles.textRevealOverride}>
                {text}
            </TextReveal>

            <div className={styles.skillsOverlay}>
                <motion.div className={styles.pinnedContainer} style={{ y: skillPinY }}>
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
                </motion.div>
            </div>
        </div>
    )
}

interface SkillCardProps {
    skill: SkillData
    index: number
    total: number
    progress: MotionValue<number>
}

const SkillCard: FC<SkillCardProps> = ({ skill, index, total, progress }) => {
    const IconComp = skill.icon

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
                <IconComp size={50} color={skill.color} />
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
