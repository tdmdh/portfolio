"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/Loading.module.css"

export default function LoadingScreen() {
    const [show, setShow] = useState(false)
    const [exit, setExit] = useState(false)
    const progressRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

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

        // Exit animation
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 1.05,
                filter: "blur(12px)",
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    setShow(false)
                    document.body.style.overflow = ""
                },
            })
        }
    }, [])

    // Entrance animations
    useEffect(() => {
        if (!show || exit) return
        const container = containerRef.current
        if (!container) return

        const letters = container.querySelectorAll(`.${styles.letter}`)
        const subtitle = container.querySelector(`.${styles.subtitle}`)
        const progressContainer = container.querySelector(`.${styles.progressContainer}`)

        gsap.fromTo(letters,
            { y: 80, opacity: 0, scale: 0.3, filter: "blur(8px)" },
            {
                y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
                duration: 0.6, ease: "back.out(1.7)",
                stagger: 0.06, delay: 0.15,
            }
        )

        if (subtitle) {
            gsap.fromTo(subtitle,
                { opacity: 0, y: 30, filter: "blur(6px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)",
                    duration: 0.5, ease: "power2.out",
                    delay: 0.15 + 8 * 0.06 + 0.15,
                }
            )
        }

        if (progressContainer) {
            gsap.fromTo(progressContainer,
                { opacity: 0, scaleX: 0 },
                {
                    opacity: 1, scaleX: 1,
                    duration: 0.4, ease: "power2.out",
                    delay: 0.5,
                }
            )
        }
    }, [show, exit])

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

    return (
        <div ref={containerRef} className={styles.loadingContainer}>
            <div className={styles.loadingContent}>
                <div className={styles.nameContainer}>
                    {name.split("").map((letter, i) => (
                        <span
                            key={i}
                            className={styles.letter}
                            style={{ opacity: 0 }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
                <span className={styles.subtitle} style={{ opacity: 0 }}>
                    {subtitle}
                </span>

                <div className={styles.progressContainer} style={{ opacity: 0 }}>
                    <div className={styles.progressBarWrapper}>
                        <div ref={barRef} className={styles.progressBar} />
                    </div>
                </div>
            </div>

            <div className={`${styles.corner} ${styles.cornerTL}`} />
            <div className={`${styles.corner} ${styles.cornerBR}`} />
        </div>
    )
}
