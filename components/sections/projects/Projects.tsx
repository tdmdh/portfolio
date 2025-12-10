"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/Projects.module.css"

import { forwardRef, useEffect, useRef } from "react"
import HeroTitle from "../components/HeroTitle"
import { ProjectCard } from "./components/project-card"

gsap.registerPlugin(ScrollTrigger)

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLDivElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation - slide up with fade
            gsap.fromTo(
                titleRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            )

            // Subtitle animation - fade in with slight delay
            gsap.fromTo(
                subtitleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            )

            // Cards stagger animation
            const cards = cardsContainerRef.current?.children
            if (cards && cards.length > 0) {
                gsap.fromTo(
                    cards,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.9,
                        rotateX: 15,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsContainerRef.current,
                            start: "top 85%",
                            end: "top 40%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )

                // Add hover 3D tilt effect to each card
                Array.from(cards).forEach((card) => {
                    const cardEl = card as HTMLElement

                    const handleMouseMove = (e: MouseEvent) => {
                        const rect = cardEl.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const y = e.clientY - rect.top
                        const centerX = rect.width / 2
                        const centerY = rect.height / 2
                        const rotateX = (y - centerY) / 20
                        const rotateY = (centerX - x) / 20

                        gsap.to(cardEl, {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            transformPerspective: 1000,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                    }

                    const handleMouseLeave = () => {
                        gsap.to(cardEl, {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.5)",
                        })
                    }

                    cardEl.addEventListener("mousemove", handleMouseMove)
                    cardEl.addEventListener("mouseleave", handleMouseLeave)
                })
            }

            // Parallax background effect on scroll
            gsap.to(sectionRef.current, {
                backgroundPosition: "50% 30%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={(el) => {
                sectionRef.current = el
                if (typeof ref === "function") {
                    ref(el)
                } else if (ref) {
                    ref.current = el
                }
            }}
            className={styles.main}
        >
            <div ref={titleRef}>
                <HeroTitle
                    title="My project"
                    className={styles.title}
                    animationDelay={0.1}
                    animationType="letter"
                    trigger="inView"
                    animationDuration={5}
                />
            </div>
            <div ref={subtitleRef}>
                <HeroTitle
                    text="As a new developer, I haven't built many projects yet, but I'm currently working on Leornian — a platform designed to make learning more enjoyable and productive."
                    className={styles.subTitle}
                />
            </div>
            <div ref={cardsContainerRef} className={styles.cardsContainer}>
                <ProjectCard
                    title="Leornian"
                    description="Leornian is my first real project - a platform designed to make learning more enjoyable and productive. Still actively developing new features!"
                    status="in-progress"
                    link="https://github.com"
                    linkText="View Repo"
                />
                <ProjectCard
                    title="Leornian"
                    description="Leornian is my first real project - a platform designed to make learning more enjoyable and productive. Still actively developing new features!"
                    status="in-progress"
                    link="https://github.com"
                    linkText="View Repo"
                />
                <ProjectCard
                    title="Leornian"
                    description="Leornian is my first real project - a platform designed to make learning more enjoyable and productive. Still actively developing new features!"
                    status="in-progress"
                    link="https://github.com"
                    linkText="View Repo"
                />
            </div>
        </div>
    )
})

Projects.displayName = "Projects"

export default Projects
