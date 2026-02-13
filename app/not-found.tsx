"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import styles from "@/app/styles/NotFound.module.css"

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
}

const slideUp = {
    hidden: { opacity: 0, y: 120, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 300, damping: 24, mass: 0.8 },
    },
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 350, damping: 22, mass: 0.7 },
    },
}

export default function NotFound() {
    return (
        <div className={styles.main}>
            <motion.div
                className={styles.bentoGrid}
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={`${styles.card} ${styles.codeCard}`} variants={scaleIn}>
                    <span className={styles.code}>404</span>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.accentCard}`} variants={scaleIn}>
                    <div className={styles.accentGradient} />
                </motion.div>

                <motion.div className={`${styles.card} ${styles.messageCard}`} variants={slideUp}>
                    <h1 className={styles.title}>Page Not Found</h1>
                    <p className={styles.description}>
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.ctaCard}`} variants={slideUp}>
                    <Link href="/" className={styles.ctaLink}>
                        <motion.div
                            className={styles.ctaButton}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className={styles.ctaText}>Go Home</span>
                            <svg
                                className={styles.ctaArrow}
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div className={`${styles.card} ${styles.decorCard}`} variants={scaleIn}>
                    <div className={styles.decorContent}>
                        <span className={styles.decorSymbol}>&#123; &#125;</span>
                        <span className={styles.decorLabel}>Lost in code</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
