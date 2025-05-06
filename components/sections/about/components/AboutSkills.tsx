import { motion } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "../../components/HeroTitle"
import { IconCloud3D } from "@/components/sections/components/Icons"

export default function AboutSkills({ isBlurred, showIcon, setShowIcon }: {
  isBlurred: boolean,
  showIcon: boolean,
  setShowIcon: (val: boolean) => void
}) {
  return (
    <div className={styles.mySkillContainer}>
      <motion.div
        className={styles.title}
        animate={{ scale: [0.9, 1], opacity: [0, 1] }}
        transition={{ duration: 0.1 }}
      >
        <HeroTitle
          isBlurred={isBlurred}
          animationDuration={5}
          animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          title="My Skills"
          onAnimationComplete={() => setShowIcon(true)}
        />
      </motion.div>

      {showIcon && (
        <motion.div
          style={{ display: 'inline-block', width: '500px', height: '500px' }}
          className={styles.icons}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* <IconCloud3D /> */}
        </motion.div>
      )}
    </div>
  )
}
