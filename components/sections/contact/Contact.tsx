"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import styles from "@/app/styles/Contact.module.css"
import { forwardRef } from "react"

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/tdmdh",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    // {
    //     name: "LinkedIn",
    //     href: "https://linkedin.com",
    //     icon: (
    //         <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    //             <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    //         </svg>
    //     ),
    // },
    {
        name: "Twitter",
        href: "https://twitter.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
]

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: 60 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            className={styles.main}
        >
            <motion.div
                ref={containerRef}
                className={styles.contactWrapper}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={styles.bgDecoration}>
                    <div className={styles.gradientOrb1} />
                    <div className={styles.gradientOrb2} />
                </div>

                <div className={styles.contactContainer}>
                    <motion.div className={styles.contentSide} variants={itemVariants}>
                        <motion.span className={styles.label} variants={itemVariants}>
                            Get In Touch
                        </motion.span>

                        <motion.h2 className={styles.title} variants={itemVariants}>
                            Let's Create Something
                            <span className={styles.highlight}> Amazing </span>
                            Together
                        </motion.h2>

                        <motion.p className={styles.description} variants={itemVariants}>
                            I'm always excited to connect with fellow developers, potential collaborators,
                            and anyone interested in creating impactful digital experiences.
                            Whether you have a project in mind or just want to say hello, feel free to reach out!
                        </motion.p>

                        <motion.div className={styles.contactInfo} variants={itemVariants}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className={styles.infoText}>
                                    <span className={styles.infoLabel}>Email</span>
                                    <a href="mailto:haftarou.dev@gmail.com" className={styles.infoValue}>
                                        haftarou.dev@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className={styles.infoText}>
                                    <span className={styles.infoLabel}>Location</span>
                                    <span className={styles.infoValue}>Open to Remote Work</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={styles.actions} variants={itemVariants}>
                            <a href="mailto:haftarou.dev@gmail.com" className={styles.primaryButton}>
                                <span>Send a Message</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>

                            <div className={styles.socialLinks}>
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className={styles.imageSide} variants={imageVariants}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageGlow} />
                            <motion.img
                                src="/photo/me.jpg"
                                alt="Profile"
                                className={styles.profileImage}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className={styles.imageBorder} />
                        </div>

                        <motion.div
                            className={styles.floatingBadge}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className={styles.badgeText}>Available for work</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
})

Contact.displayName = "Contact"
export default Contact