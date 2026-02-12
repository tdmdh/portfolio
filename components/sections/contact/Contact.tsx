"use client"

import { useRef, forwardRef } from "react"
import { motion, useInView } from "framer-motion"
import { Icon } from "@iconify/react"
import styles from "@/app/styles/Contact.module.css"

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <motion.section
            ref={ref}
            className={styles.contactSection}
        >
            <motion.div
                ref={containerRef}
                className={styles.container}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div className={styles.header} variants={itemVariants}>
                    <h2 className={styles.title}>
                        Let's work <br />
                        <span className={styles.highlight}>together</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Have a project in mind? Let's build something amazing.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className={styles.bentoGrid}>

                    {/* Primary Action: Email */}
                    <motion.a
                        href="mailto:haftarou.dev@gmail.com"
                        className={`${styles.card} ${styles.emailCard}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardLabel}>Get in touch</span>
                                <Icon icon="ph:envelope-simple-duotone" className={styles.cardIcon} />
                            </div>
                            <span className={styles.emailText}>haftarou.dev@gmail.com</span>
                        </div>
                        <div className={styles.actionIcon}>
                            <Icon icon="ph:arrow-up-right-bold" />
                        </div>
                    </motion.a>

                    {/* Status Card */}
                    <motion.div
                        className={`${styles.card} ${styles.statusCard}`}
                        variants={itemVariants}
                    >
                        <div className={styles.statusIndicator}>
                            <span className={styles.ping} />
                            <span className={styles.dot} />
                        </div>
                        <div className={styles.statusContent}>
                            <span className={styles.cardLabel}>Current Status</span>
                            <span className={styles.statusText}>Available for work</span>
                        </div>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        className={`${styles.card} ${styles.locationCard}`}
                        variants={itemVariants}
                    >
                        <div className={styles.cardContent}>
                            <Icon icon="ph:globe-hemisphere-west-duotone" className={styles.largeIcon} />
                            <div>
                                <span className={styles.cardLabel}>Based In</span>
                                <span className={styles.locationText}>Worldwide / Remote</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Socials - Group or Individual? Let's do 3 small distinct cards for clickability */}
                    <motion.a
                        href="https://github.com/tdmdh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.socialCard} ${styles.github}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        <Icon icon="logos:github-icon" width="40" />
                    </motion.a>

                    <motion.a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.socialCard} ${styles.twitter}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                    >
                        <Icon icon="logos:twitter" width="32" />
                    </motion.a>

                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.socialCard} ${styles.linkedin}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        <Icon icon="logos:linkedin-icon" width="40" />
                    </motion.a>

                </div>
            </motion.div>
        </motion.section>
    )
})

Contact.displayName = "Contact"
export default Contact