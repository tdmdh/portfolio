import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"

export default function AboutIntro({ isBlurred }: { isBlurred: boolean }) {
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (articleRef.current) {
      gsap.fromTo(articleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
    }
  }, [])

  return (
    <article
      ref={articleRef}
      className={styles.aboutContainer}
      style={{ opacity: 0 }}
    >
      <header className={styles.title}>
        <HeroTitle
          animationDelay={0.1}
          animationType="letter"
          trigger="inView"
          animationDuration={5}
          title="About Me"
        />
      </header>
    </article>
  )
}
