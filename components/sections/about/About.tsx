"use client"

import React from "react"
import { delay, motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { useEffect, useState, forwardRef } from "react"
import HeroTitle from "../components/HeroTitle"

const About = forwardRef<HTMLElement>((props, ref) => {
    const { scrollY } = useScroll()
    const [isBlurred, setIsBlurred] = useState(false)
    
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            delay: 2,
            y: 0,
            transition: { duration: 1 },
            ease: [0.22, 1, 0.36,1],
        },
    }

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
        setIsBlurred(latest > 50)
        })
        return () => unsubscribe()
    }, [scrollY])

    return (
        <motion.section
            ref={ref}
            className={styles.main}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <motion.article 
                className={styles.aboutContainer}
                variants={containerVariants}
            >
                <motion.header 
                    className={styles.title}
                    variants={itemVariants}
                >
                    <HeroTitle 
                        title="About Me" 
                    />
                </motion.header>
            </motion.article>
            <HeroTitle
             text="I'm Joyboy — a dedicated software development student with a passion for building clean, scalable, and engaging web applications.  With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust. My approach combines frontend innovation with thoughtful UX, leveraging tools like TypeScript, React, Next.js, and Framer Motion to deliver performant and future-focused solutions."
            />
        </motion.section>
    )
}); 

About.displayName = "About"

export default About
