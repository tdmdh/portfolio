import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "../../components/HeroTitle"
import { IconCloud3D } from "@/components/sections/components/Icons"

export default function AboutSkills({ isBlurred, showIcon, setShowIcon }: {
  isBlurred: boolean,
  showIcon: boolean,
  setShowIcon: (val: boolean) => void
}) {
  const titleRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" })
    }
  }, [])

  useEffect(() => {
    if (showIcon && iconRef.current) {
      gsap.fromTo(iconRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "back.out(1.4)" })
    }
  }, [showIcon])

  return (
    <div className={styles.mySkillContainer}>
      <div
        ref={titleRef}
        className={styles.title}
        style={{ opacity: 0 }}
      >
        <HeroTitle
          animationDuration={5}
          animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          title="My Skills"
          onAnimationComplete={() => setShowIcon(true)}
        />
      </div>

      {showIcon && (
        <div
          ref={iconRef}
          style={{ display: 'inline-block', width: '500px', height: '500px', opacity: 0 }}
          className={styles.icons}
        >
          {/* <IconCloud3D /> */}
        </div>
      )}
    </div>
  )
}
