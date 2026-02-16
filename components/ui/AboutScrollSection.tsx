"use client"

import { ComponentPropsWithoutRef, FC, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"
import { TextReveal } from "@/components/ui/TextReveal"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

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
    const skillPinRef = useRef<HTMLDivElement | null>(null)
    const [orbitProgress, setOrbitProgress] = useState(0)

    // GSAP ScrollTrigger for skill orbit pinning + progress
    useEffect(() => {
        const container = containerRef.current
        const skillPin = skillPinRef.current
        if (!container || !skillPin) return

        // Pin the skill overlay alongside the text
        const pinTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            pin: skillPin,
            pinSpacing: false,
        })

        // Orbit progress — full range for smooth rotation
        const orbitTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                setOrbitProgress(self.progress)
            },
        })

        return () => {
            pinTrigger.kill()
            orbitTrigger.kill()
        }
    }, [])

    const allSkills = skills.flatMap(cat => cat.skills)
    const totalSkills = allSkills.length

    return (
        <div className={styles.wrapper}>
            <TextReveal ref={containerRef} className={styles.textRevealOverride}>
                {text}
            </TextReveal>

            <div className={styles.skillsOverlay}>
                <div ref={skillPinRef} className={styles.pinnedContainer}>
                     <div className={styles.rotatingFrame}> 
                        {allSkills.map((skill, i) => (
                            <SkillCard 
                                key={skill.name} 
                                skill={skill} 
                                index={i} 
                                total={totalSkills} 
                                progress={orbitProgress} 
                            />
                        ))}
                     </div>
                </div>
            </div>
        </div>
    )
}

interface SkillCardProps {
    skill: SkillData
    index: number
    total: number
    progress: number
}

const SkillCard: FC<SkillCardProps> = ({ skill, index, total, progress }) => {
    const IconComp = skill.icon

    const width = 1600
    const height = 700

    const currentP = (progress + (index / total)) % 1
    const pos = getRectangularPosition(currentP, width, height)

    return (
        <div
            className={styles.orbitingSkillCard}
            style={{ 
                left: `50%`, 
                top: `50%`,
                transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
        >
            <div className={styles.orbitIconWrapper}>
                <IconComp size={50} color={skill.color} />
            </div>
        </div>
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
