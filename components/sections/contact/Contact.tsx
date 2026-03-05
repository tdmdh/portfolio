"use client"

import { useRef, forwardRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Icon } from "@iconify/react"
import styles from "@/app/styles/Contact.module.css"

gsap.registerPlugin(ScrollTrigger)

const EMAIL = "haftarou.dev@gmail.com"

const socials = [
    { name: "GitHub", href: "https://github.com/tdmdh", icon: "mdi:github" },
    { name: "Twitter / X", href: "https://twitter.com", icon: "ri:twitter-x-fill" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "mdi:linkedin" },
]

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const ctaCircleRef = useRef<HTMLDivElement>(null)

    const [time, setTime] = useState("")
    useEffect(() => {
        const tick = () =>
            setTime(
                // Netherlands is UTC+2 during daylight savingme
                new Date().toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "Europe/Amsterdam",
                })
            )
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                [
                    `.${styles.headlineCard}`,
                    `.${styles.emailCard}`,
                    `.${styles.statusCard}`,
                    `.${styles.locationCard}`,
                    `.${styles.clockCard}`,
                    `.${styles.socialCard}`,
                ],
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    duration: 0.65, ease: "power3.out",
                    stagger: 0.05,
                    scrollTrigger: { trigger: container, start: "top 80%", once: true },
                }
            )

            gsap.fromTo(
                `.${styles.ctaCard}`,
                { opacity: 0, scale: 0.6 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.65, ease: "back.out(1.4)",
                    scrollTrigger: { trigger: container, start: "top 80%", once: true },
                }
            )
        }, container)

        return () => ctx.revert()
    }, [])

    const handleCtaMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ctaCircleRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25
        gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" })
    }

    const handleCtaLeave = () => {
        if (ctaCircleRef.current) {
            gsap.to(ctaCircleRef.current, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" })
        }
    }

    return (
        <section ref={ref} className={styles.contactSection}>
            <div ref={containerRef} className={styles.bentoGrid}>
                <div className={`${styles.card} ${styles.headlineCard}`}>
                    <span className={styles.label}>Get In Touch</span>
                    <h2 className={styles.headline}>
                        <span className={styles.line}>Let&apos;s</span>
                        <span className={`${styles.line} ${styles.outlineLine}`}>Work</span>
                        <span className={styles.line}>Together</span>
                    </h2>
                    <p className={styles.headlineSubtext}>
                        Have a project in mind? I&apos;d love to hear about it.
                    </p>
                </div>

                <a
                    href={`mailto:${EMAIL}`}
                    className={`${styles.card} ${styles.emailCard}`}
                >
                    <div className={styles.emailTop}>
                        <span className={styles.cardLabel}>Get in touch</span>
                        <Icon icon="ph:envelope-simple-fill" className={styles.emailIcon} />
                    </div>
                    <span className={styles.emailAddress}>{EMAIL}</span>
                    <div className={styles.emailArrow}>
                        <Icon icon="ph:arrow-up-right-bold" />
                    </div>
                </a>

                <div className={`${styles.card} ${styles.statusCard}`}>
                    <div className={styles.statusDot}>
                        <span className={styles.ping} />
                        <span className={styles.dot} />
                    </div>
                    <span className={styles.statusLabel}>Current Status</span>
                    <span className={styles.statusText}>Available for work</span>
                </div>

                <a
                    href={`mailto:${EMAIL}`}
                    className={`${styles.card} ${styles.ctaCard}`}
                >
                    <div
                        ref={ctaCircleRef}
                        className={styles.ctaCircle}
                        onMouseMove={handleCtaMouse}
                        onMouseLeave={handleCtaLeave}
                    >
                        <span className={styles.ctaText}>Send</span>
                        <span className={styles.ctaText}>Email</span>
                        <Icon icon="ph:arrow-up-right-bold" className={styles.ctaArrow} />
                        <div className={styles.ctaRing} />
                    </div>
                </a>

                <div className={`${styles.card} ${styles.locationCard}`}>
                    <div>
                        <span className={styles.cardLabel}>Based in</span>
                        <span className={styles.locationText}>Remote / Rotterdam</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.clockCard}`}>
                    <div>
                        <span className={styles.cardLabel}>Local Time (UTC)</span>
                        <span className={styles.clockTime}>{time}</span>
                    </div>
                </div>

                {socials.map((s, i) => (
                    <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.socialCard} ${styles[`social${i + 1}`]}`}
                    >
                        <Icon icon={s.icon} className={styles.socialIcon} />
                        <span className={styles.socialName}>{s.name}</span>
                        <Icon icon="ph:arrow-up-right" className={styles.socialArrow} />
                    </a>
                ))}
            </div>
        </section>
    )
})

Contact.displayName = "Contact"
export default Contact