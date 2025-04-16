"use client"

import React, { useEffect, useRef, useState, forwardRef } from "react"
import { motion, useScroll } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "../components/HeroTitle"
import { IconCloud3D } from "@/components/sections/components/Icons"

const About = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>((props, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollY } = useScroll({ container: typeof window !== "undefined" ? undefined : undefined })
  const [isBlurred, setIsBlurred] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])


  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.section
        ref={(el) => {
            sectionRef.current = el
            if (ref) {
            if (typeof ref === "function") {
                ref(el)
            } else if ("current" in ref) {
                (ref as React.MutableRefObject<HTMLElement | null>).current = el
            }
            }
        }}      
      className={styles.main}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      {...props}
    >
        <motion.article className={styles.aboutContainer} variants={containerVariants}>
          <motion.header className={styles.title} variants={itemVariants}>
            <HeroTitle
              isBlurred={isBlurred}
              animationDelay={0.5}
              animationType="letter"
              trigger="inView"
              animationDuration={5}
              title="About Me"
              onAnimationComplete={() => setShowIcon(true)} 
              />
          </motion.header>
        </motion.article>

        <motion.article className={styles.aboutContent}>
          <HeroTitle
            isBlurred={isBlurred}
            animationDuration={25}
            animationDelay={0.1}
            animationType="word"
            trigger="onMount"
            text="I'm Joyboy — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust. My approach combines frontend innovation with thoughtful UX, leveraging tools like TypeScript, React, Next.js, and Framer Motion to deliver performant and future-focused solutions."
          />
        </motion.article>

        {showIcon && (
            <motion.div
            style={{ display: 'inline-block', width: '200px', height: '200px' }} // Set width/height
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={styles.icons}
            >
                <IconCloud3D />
            </motion.div>
        )}
    </motion.section>
  )
})

About.displayName = "About"
export default About
