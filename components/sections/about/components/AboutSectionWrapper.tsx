"use client"

import React, { useRef, useEffect, forwardRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"

gsap.registerPlugin(ScrollTrigger)

interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {}

const AboutSectionWrapper = forwardRef<HTMLElement, AboutSectionProps>(({ children, ...props }, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current!,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current!, start: "top 80%", once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        if (ref) {
          if (typeof ref === "function") ref(el)
          else (ref as React.MutableRefObject<HTMLElement | null>).current = el
        }
      }}
      style={{ opacity: 0 }}
      {...props}
    >
      {children}
    </section>
  )
})

AboutSectionWrapper.displayName = "AboutSectionWrapper"
export default AboutSectionWrapper
