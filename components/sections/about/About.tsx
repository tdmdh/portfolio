"use client"

import { forwardRef, useRef } from "react"
import { motion, useInView } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import { TextReveal } from "@/components/ui/TextReveal"

const infoCards = [
  {
    icon: "",
    title: "Focus",
    text: "Full-stack development with emphasis on clean architecture"
  },
  {
    icon: "",
    title: "Passion",
    text: "Building scalable and performant web and mobile applications"
  },
  {
    icon: "",
    title: "Learning",
    text: "Always exploring new technologies and best practices"
  }
]

const About = forwardRef<HTMLDivElement>((props, ref) => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div ref={ref} className={styles.main}>
      <motion.div
        ref={containerRef}
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <span className={styles.label}>Get To Know Me</span>
          <h2 className={styles.title}>
            About <span className={styles.highlight}>Me</span>
          </h2>
        </motion.div>

        <div className={styles.textRevealContainer}>
          <TextReveal>
            I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust.
          </TextReveal>
        </div>

        <div className={styles.infoGrid}>
          {infoCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={styles.infoCard}
              variants={itemVariants}
              custom={index}
            >
              <span className={styles.infoIcon}>{card.icon}</span>
              <h3 className={styles.infoTitle}>{card.title}</h3>
              <p className={styles.infoText}>{card.text}</p>
            </motion.div>
          ))}
        </div>
{/* 
        <motion.div className={styles.ctaSection} variants={itemVariants}>
          <a href="#contact" className={styles.ctaButton}>
            Let's Connect
          </a>
          <a href="#projects" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
            View Projects
          </a>
        </motion.div> */}
      </motion.div>
    </div>
  )
})

About.displayName = "About"

export default About
