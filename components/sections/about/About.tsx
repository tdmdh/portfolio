"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import { forwardRef } from "react"
import HeroTitle from "../components/HeroTitle"

const About = forwardRef<HTMLDivElement>((props, ref) => {
    const { scrollY } = useScroll()
    const [isBlurred, setIsBlurred] = useState(false)
    const pathname = usePathname()
    
    const scrollMax = typeof window !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1000
    const progressScaleX = useTransform(scrollY, [0, scrollMax], [0, 1])

    // Animation variants
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
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
        setIsBlurred(latest > 50)
        })
        return () => unsubscribe()
    }, [scrollY])

    return (
        <motion.div
            ref={ref}
            className={styles.main}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <motion.div 
                className={styles.progressBar} 
                style={{ scaleX: progressScaleX, transformOrigin: "left" }} 
            />
            <motion.div 
                className={styles.aboutContainer}
                variants={containerVariants}
            >
                <motion.div 
                    className={styles.title}
                    variants={itemVariants}
                >
                    <HeroTitle 
                        title="About Me" 
                    />
                </motion.div>
                <motion.div 
                    className={styles.subtitle}
                    variants={itemVariants}
                >
                    <HeroTitle
                        subtitle="Who am I?"
                    />
                </motion.div>
                <motion.div 
                    className={styles.aboutContent}
                    variants={itemVariants}
                >
                    <motion.div 
                        className={styles.textContainer}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className={styles.aboutText}>
                            I am a passionate computer science student with a keen interest in web development and artificial intelligence. I love exploring new technologies and applying them to real-world problems. My goal is to create innovative solutions that make a positive impact on people's lives.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
});

About.displayName = "About"

export default About