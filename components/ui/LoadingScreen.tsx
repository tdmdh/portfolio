"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "@/app/styles/Loading.module.css"

export default function LoadingScreen() {
    const [show, setShow] = useState(false)
    const [exit, setExit] = useState(false)
    const progressRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        const seen = sessionStorage.getItem("intro-seen")
        if (!seen) {
            setShow(true)
            document.body.style.overflow = "hidden"
        }
    }, [])

    const finish = useCallback(() => {
        setExit(true)
        sessionStorage.setItem("intro-seen", "1")
        setTimeout(() => {
            setShow(false)
            document.body.style.overflow = ""
        }, 800)
    }, [])

    useEffect(() => {
        if (!show || exit) return

        const duration = 2400
        const start = performance.now()

        const tick = (now: number) => {
            const elapsed = now - start
            const p = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            progressRef.current = eased * 100
            if (barRef.current) {
                barRef.current.style.width = `${progressRef.current}%`
            }
            if (p < 1) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                setTimeout(finish, 400)
            }
        }
        const timeout = setTimeout(() => {
            rafRef.current = requestAnimationFrame(tick)
        }, 600)

        return () => {
            clearTimeout(timeout)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [show, exit, finish])

    if (!show) return null

    const name = "MOHAMMED"
    const subtitle = "Software Developer"

    const letterVariants = {
        hidden: { y: 80, opacity: 0, scale: 0.3, filter: "blur(8px)" },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 20,
                mass: 0.6,
                delay: 0.15 + i * 0.06,
            },
        }),
        exit: (i: number) => ({
            y: -60,
            opacity: 0,
            scale: 0.7,
            filter: "blur(6px)",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 25,
                delay: i * 0.03,
            },
        }),
    }

    const subtitleVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 20,
                delay: 0.15 + name.length * 0.06 + 0.15,
            },
        },
        exit: {
            opacity: 0,
            y: -30,
            filter: "blur(6px)",
            transition: { duration: 0.3 },
        },
    }

    const barContainerVariants = {
        hidden: { opacity: 0, scaleX: 0 },
        visible: {
            opacity: 1,
            scaleX: 1,
            transition: {
                delay: 0.5,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
        exit: {
            opacity: 0,
            scaleX: 0,
            transition: { duration: 0.3 },
        },
    }

    return (
        <AnimatePresence>
            {!exit ? (
                <motion.div
                    className={styles.loadingContainer}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(12px)",
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                    }}
                    key="loader"
                >
                    <div className={styles.loadingContent}>
                        <div className={styles.nameContainer}>
                            {name.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.letter}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                        <motion.span
                            className={styles.subtitle}
                            variants={subtitleVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {subtitle}
                        </motion.span>

                        <motion.div
                            className={styles.progressContainer}
                            variants={barContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className={styles.progressBarWrapper}>
                                <div ref={barRef} className={styles.progressBar} />
                            </div>
                        </motion.div>
                    </div>

                    <div className={`${styles.corner} ${styles.cornerTL}`} />
                    <div className={`${styles.corner} ${styles.cornerBR}`} />
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
