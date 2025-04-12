"use client"
import React from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Hero.module.css"
import { Carattere } from "next/font/google"

const cormorant = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cormorant",
})

const Slogan: React.FC = () => {
  const sloganText = "Turning ideas into beautiful, interactive realities."
  const sloganLetters = sloganText.split("")

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <div className={styles.sloganContainer}>
      <motion.h1
        className={`${styles.slogan} ${cormorant.className}`}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
            hidden: { transition: { staggerChildren: 0.05 } },
            
        }}
      >
        {sloganLetters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={styles.sloganLetter}
            whileHover={{ scale: 1.1 }}  
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  )
}

export default Slogan
