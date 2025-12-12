"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { RefObject, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

interface UseProjectsAnimationProps {
    sectionRef: RefObject<HTMLDivElement | null>
    titleRef: RefObject<HTMLDivElement | null>
    subtitleRef: RefObject<HTMLDivElement | null>
    scrollSectionRef: RefObject<HTMLDivElement | null>
    cardsContainerRef: RefObject<HTMLDivElement | null>
    isExpanded?: boolean
}

export const useProjectsAnimation = ({
    sectionRef,
    titleRef,
    subtitleRef,
    scrollSectionRef,
    cardsContainerRef,
    isExpanded = false,
}: UseProjectsAnimationProps) => {
    useEffect(() => {
        if (isExpanded) return

        const ctx = gsap.context(() => {
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

            const scrollSection = scrollSectionRef.current
            const cardsContainer = cardsContainerRef.current

            if (scrollSection && cardsContainer) {
                const cards = cardsContainer.children

                const getScrollAmount = () => {
                    const containerWidth = cardsContainer.scrollWidth
                    const viewportWidth = window.innerWidth
                    return -(containerWidth - viewportWidth + 100)
                }

                gsap.fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: scrollSection,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )

                gsap.to(cardsContainer, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollSection,
                        start: "top top",
                        end: () => `+=${Math.abs(getScrollAmount())}`,
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [sectionRef, titleRef, subtitleRef, scrollSectionRef, cardsContainerRef, isExpanded])
}
