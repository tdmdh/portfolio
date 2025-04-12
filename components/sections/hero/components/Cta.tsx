"use client"
import React from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"   
import Magnet from "@/components/magnet/Magnet"
import gsap from "gsap"
import { useEffect } from "react"


interface CtaProps {
    title: string
}


const Cta: React.FC<CtaProps> = ({title}) => {
    useEffect(() => {
        gsap.fromTo(
            `.${styles.ctaButton}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 1 }
        )
    }, [])
    
    

    
    return (
        <div className={styles.ctaContainer}>
        <Magnet>
            <motion.div
                className={styles.ctaButton}
            >
                {title}
            </motion.div>
        </Magnet>
        </div>
    )};

export default Cta