"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import styles from "@/app/styles/NotFound.module.css"

export default function NotFound() {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!gridRef.current) return
        const ctx = gsap.context(() => {
            const cards = gridRef.current!.children
            // Scale-in cards
            const scaleCards = gridRef.current!.querySelectorAll(
                `.${styles.codeCard}, .${styles.accentCard}, .${styles.decorCard}`
            )
            // Slide-up cards
            const slideCards = gridRef.current!.querySelectorAll(
                `.${styles.messageCard}, .${styles.ctaCard}`
            )

            gsap.fromTo(scaleCards,
                { opacity: 0, scale: 0.5, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.4)", stagger: 0.06, delay: 0.05 }
            )
            gsap.fromTo(slideCards,
                { opacity: 0, y: 120, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.4)", stagger: 0.06, delay: 0.05 }
            )
        }, gridRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className={styles.main}>
            <div
                ref={gridRef}
                className={styles.bentoGrid}
            >
                <div className={`${styles.card} ${styles.codeCard}`} style={{ opacity: 0 }}>
                    <span className={styles.code}>404</span>
                </div>

                <div className={`${styles.card} ${styles.accentCard}`} style={{ opacity: 0 }}>
                    <div className={styles.accentGradient} />
                </div>

                <div className={`${styles.card} ${styles.messageCard}`} style={{ opacity: 0 }}>
                    <h1 className={styles.title}>Page Not Found</h1>
                    <p className={styles.description}>
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <div className={`${styles.card} ${styles.ctaCard}`} style={{ opacity: 0 }}>
                    <Link href="/" className={styles.ctaLink}>
                        <div
                            className={styles.ctaButton}
                            style={{ transition: "transform 0.2s" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05) translateY(-2px)" }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
                            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)" }}
                            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05) translateY(-2px)" }}
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
                        </div>
                    </Link>
                </div>

                <div className={`${styles.card} ${styles.decorCard}`} style={{ opacity: 0 }}>
                    <div className={styles.decorContent}>
                        <span className={styles.decorSymbol}>&#123; &#125;</span>
                        <span className={styles.decorLabel}>Lost in code</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
