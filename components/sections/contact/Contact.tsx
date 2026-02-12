"use client"

import { useRef, forwardRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Icon } from "@iconify/react"
import styles from "@/app/styles/Contact.module.css"
import Image from "next/image"

const EMAIL = "haftarou.dev@gmail.com"

const socials = [
    { name: "GitHub", href: "https://github.com/tdmdh", icon: "mdi:github" },
    { name: "Twitter / X", href: "https://twitter.com", icon: "ri:twitter-x-fill" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "mdi:linkedin" },
]

/* Magnetic hook */
function useMagnetic(strength = 0.35) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 200, damping: 20 })
    const springY = useSpring(y, { stiffness: 200, damping: 20 })
    const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const reset = () => { x.set(0); y.set(0) }
    return { springX, springY, handleMouse, reset }
}

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-80px" })
    const { springX, springY, handleMouse, reset } = useMagnetic(0.25)

    const [time, setTime] = useState("")
    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                })
            )
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    }
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    }
    const scaleIn = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } },
    }

    return (
        <motion.section ref={ref} className={styles.contactSection}>
            <motion.div
                ref={containerRef}
                className={styles.bentoGrid}
                variants={stagger}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* ─── A: Headline ─── */}
                <motion.div className={`${styles.card} ${styles.headlineCard}`} variants={fadeUp}>
                    <span className={styles.label}>Get In Touch</span>
                    <h2 className={styles.headline}>
                        <span className={styles.line}>Let&apos;s</span>
                        <span className={`${styles.line} ${styles.outlineLine}`}>Work</span>
                        <span className={styles.line}>Together</span>
                    </h2>
                    <p className={styles.headlineSubtext}>
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>
                </motion.div>

                {/* ─── B: Profile Picture ─── */}
                <motion.div className={`${styles.card} ${styles.profileCard}`} variants={scaleIn}>
                    <div className={styles.profileImageWrapper}>
                        <Image
                            src="/photo/me.jpeg"
                            alt="Mohammed"
                            fill
                            className={styles.profileImage}
                            sizes="(max-width: 640px) 100vw, 25vw"
                        />
                    </div>
                    <div className={styles.profileOverlay}>
                        <span className={styles.profileName}>Mohammed</span>
                        <span className={styles.profileRole}>Software Developer</span>
                    </div>
                </motion.div>

                {/* ─── C: Email CTA ─── */}
                <motion.a
                    href={`mailto:${EMAIL}`}
                    className={`${styles.card} ${styles.emailCard}`}
                    variants={fadeUp}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className={styles.emailTop}>
                        <span className={styles.cardLabel}>Get in touch</span>
                        <Icon icon="ph:envelope-simple-fill" className={styles.emailIcon} />
                    </div>
                    <span className={styles.emailAddress}>{EMAIL}</span>
                    <div className={styles.emailArrow}>
                        <Icon icon="ph:arrow-up-right-bold" />
                    </div>
                </motion.a>

                {/* ─── D: Status ─── */}
                <motion.div className={`${styles.card} ${styles.statusCard}`} variants={fadeUp}>
                    <div className={styles.statusDot}>
                        <span className={styles.ping} />
                        <span className={styles.dot} />
                    </div>
                    <span className={styles.statusLabel}>Current Status</span>
                    <span className={styles.statusText}>Available for work</span>
                </motion.div>

                {/* ─── E: Magnetic CTA ─── */}
                <motion.a
                    href={`mailto:${EMAIL}`}
                    className={`${styles.card} ${styles.ctaCard}`}
                    variants={scaleIn}
                >
                    <motion.div
                        className={styles.ctaCircle}
                        style={{ x: springX, y: springY }}
                        onMouseMove={handleMouse}
                        onMouseLeave={reset}
                    >
                        <span className={styles.ctaText}>Send</span>
                        <span className={styles.ctaText}>Email</span>
                        <Icon icon="ph:arrow-up-right-bold" className={styles.ctaArrow} />
                        <div className={styles.ctaRing} />
                    </motion.div>
                </motion.a>

                {/* ─── F: Location ─── */}
                <motion.div className={`${styles.card} ${styles.locationCard}`} variants={fadeUp}>
                    <Icon icon="ph:globe-hemisphere-west-fill" className={styles.locationGlobe} />
                    <div>
                        <span className={styles.cardLabel}>Based in</span>
                        <span className={styles.locationText}>Remote / Rotterdam</span>
                    </div>
                </motion.div>

                {/* ─── G: Clock ─── */}
                <motion.div className={`${styles.card} ${styles.clockCard}`} variants={fadeUp}>
                    <Icon icon="ph:clock-fill" className={styles.clockIcon} />
                    <div>
                        <span className={styles.cardLabel}>Local Time (UTC)</span>
                        <span className={styles.clockTime}>{time}</span>
                    </div>
                </motion.div>

                {/* ─── H, I, J: Socials ─── */}
                {socials.map((s, i) => (
                    <motion.a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.socialCard} ${styles[`social${i + 1}`]}`}
                        variants={fadeUp}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Icon icon={s.icon} className={styles.socialIcon} />
                        <span className={styles.socialName}>{s.name}</span>
                        <Icon icon="ph:arrow-up-right" className={styles.socialArrow} />
                    </motion.a>
                ))}
            </motion.div>
        </motion.section>
    )
})

Contact.displayName = "Contact"
export default Contact