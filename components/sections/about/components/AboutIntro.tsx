import { motion } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AboutIntro({ isBlurred }: { isBlurred: boolean }) {
  return (
    <motion.article
      className={styles.aboutContainer}
      animate={{ y: [50, 0], opacity: [0, 1] }}
      transition={{ duration: 0.8 }}
    >
      <motion.header
        className={styles.title}
        variants={itemVariants}
        animate={{ scale: [0.9, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <HeroTitle
          isBlurred={isBlurred}
          animationDelay={0.5}
          animationType="letter"
          trigger="inView"
          animationDuration={5}
          title="About Me"
        />
      </motion.header>
    </motion.article>
  )
}
