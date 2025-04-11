"use client"
// import { useSpring, animated, config } from "@react-spring/web"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import styles from "./styles/Home.module.css"
import React from "react"
import Magnet from "@/components/magnet/Magnet"
import { AnimatedList } from "@/components/ui/animated-list"
import { AnimatedListDemo } from "@/components/animatedList/AnimatedList"

const Home: React.FC = () => {

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const nameText = "Mohammad"
  const nameLetters = nameText.split("")

  const floatText = "Hi, I'm" 
  const floatTextVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  

  return (
    <div className={styles.main}>
      <div >
        </div>
        <motion.div 
          className={styles.hero} 
          style={{ 
            scale,
            opacity: scrollOpacity,
            y,

          }}
        >
          <div className={styles.heroText}>
            <div className={styles.heroTitle}>
              {floatText.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={floatTextVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.animatedLetter}
                  style={{ display: "inline-block" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <h1 className={styles.heroTitle}>
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.animatedLetter}
                  style={{ display: "inline-block" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <div className={styles.heroSubtitle}>
              <p>Student at Grafisch Lyceum Rotterdam</p>
              <Magnet>
                <motion.div
                  className={styles.ctaButton}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                    <a href="/portfolio" className={styles.ctaLink}>
                      View Projects
                    </a>
                </motion.div>
              </Magnet>
            </div>

          </div>

          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className={styles.scrollDot}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0, duration: 0.5 }}
          exit={{ opacity: 0, y: 50 }}
          >
            <div>
            </div>
            <div>
              <AnimatedListDemo className={styles.animatedList} />
            </div>
              <div>

              </div>
          </motion.div>
    </div>
  )
}

export default Home;