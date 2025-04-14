"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { useEffect } from "react"
import { useState } from "react"
import { forwardRef } from "react"
import HeroTitle from "../components/HeroTitle"
import { TopCorners } from "@/components/sections/components/Topcorners"
import { TextReveal } from "@/components/sections/components/TextReveal"

const About = forwardRef<HTMLDivElement>((props, ref) => {
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
                </motion.div>
                <div className={styles.cornersContainer} >
                    <motion.div 
                        className={styles.aboutContent}
                        variants={itemVariants}
                    >
                    </motion.div>

                </div>
            </motion.div>
        </motion.div>
    )
});

About.displayName = "About"

export default About