"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"

const About: React.FC = () => {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])
    const pathname = usePathname()
    const [isBlurred, setIsBlurred] = useState(false)
    
    useEffect(() => {
        setIsBlurred(false)
    }, [pathname])
    
    return (
        <div className={styles.main}>
        <motion.div
            className={styles.about}
            style={{
            scale,
            opacity: scrollOpacity,
            y,
            }}
        >
            <div className={styles.aboutText}>
            <h1 className={styles.aboutTitle}>About Me</h1>
            <p className={styles.aboutDescription}>
                I am a student at Grafish Lyceum Rotterdam. I am passionate about design and development.
                I love to create beautiful and functional websites and applications.
            </p>
            </div>
            <div className={styles.aboutImage}>
            <Image src="/images/about.jpg" alt="About Me" width={500} height={500} />
            </div>
        </motion.div>
        </div>
    )
    }

export default About