import { motion } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"

export default function AboutDescription({ isBlurred }: { isBlurred: boolean }) {
  return (
    <motion.article
      className={styles.aboutContent}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1, delay: 0.3 }}
    >
      <HeroTitle
        animationDuration={25}
        animationDelay={0.1}
        animationType="word"
        trigger="onMount"
        text="I'm Joyboy — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust. My approach combines frontend innovation with thoughtful UX, leveraging tools like TypeScript, React, Next.js, and Framer Motion to deliver performant and future-focused solutions."
      />
    </motion.article>
  )
}
