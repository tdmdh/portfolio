"use client"

import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "@/app/styles/About.module.css"
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
    SiGo, SiNodedotjs, SiPhp, SiPostgresql,
    SiGit, SiDocker, SiGooglecloud
} from "react-icons/si"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

interface SkillItem {
    name: string
    icon: IconType
    color: string
}

const skillCategories: { title: string; skills: SkillItem[] }[] = [
    {
        title: "Frontend",
        skills: [
            { name: "React (Native)", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "SCSS", icon: SiSass, color: "#CC6699" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Go", icon: SiGo, color: "#00ADD8" },
            { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ]
    },
    {
        title: "Tools & Cloud",
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
        ]
    }
]

const aboutText = "I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust."

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      containerRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    },
    [ref]
  )

  useEffect(() => {
    const container = containerRef.current
    const grid = gridRef.current
    if (!container || !grid) return

    const ctx = gsap.context(() => {
      // Pin the grid while scrolling through the container
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: grid,
        pinSpacing: false,
        onUpdate: (self) => setProgress(self.progress),
      })

      // Animate corner cards on scroll into view
      const cornerCards = grid.querySelectorAll(`.${styles.cornerCard}`)
      cornerCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.6, filter: "blur(10px)" },
          {
            opacity: 1, scale: 1, filter: "blur(0px)",
            duration: 0.7, ease: "back.out(1.4)",
            delay: i * 0.06,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        )
      })

      // Text card
      gsap.fromTo(`.${styles.textCard}`,
        { opacity: 0, y: 80, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.textCard}`, start: "top 90%", once: true },
        }
      )

      // Decoration cards (chaotic grid + floaters)
      const decorCards = grid.querySelectorAll(`.${styles.decorCard}, .${styles.decorCardFloat}`)
      gsap.from(decorCards, {
        opacity: 0,
        scale: 0.2,
        y: () => gsap.utils.random(-50, 50),
        x: () => gsap.utils.random(-30, 30),
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.9,
        ease: "back.out(1.7)",
        stagger: { amount: 0.7, from: "random" },
        scrollTrigger: {
          trigger: grid,
          start: "top 75%",
          once: true
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  const words = aboutText.split(" ")

  return (
    <div ref={setRefs} className={styles.main}>
      <div ref={gridRef} className={styles.bentoGrid}>
        
        {/* Decorative mini cards (chaotic grid, hidden on mobile) */}
        {/* <div className={`${styles.decorCard} ${styles.dec1}`}><SiReact size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec2}`}><div className="w-2 h-2 rounded-full bg-cyan-400/60"></div></div>
        <div className={`${styles.decorCard} ${styles.dec3}`}><SiNextdotjs size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec4}`}><div className="w-4 h-4 border border-purple-400/50 rotate-45"></div></div>
        <div className={`${styles.decorCard} ${styles.dec5}`}><SiTailwindcss size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec6}`}><div className="w-1.5 h-8 bg-gradient-to-t from-pink-400/50 to-purple-400/50 rounded-full"></div></div>
        <div className={`${styles.decorCard} ${styles.dec7}`}><SiGo size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec8}`}>
          <div className="flex gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"/><div className="w-1.5 h-1.5 rounded-full bg-blue-400/60"/></div>
        </div>
        <div className={`${styles.decorCard} ${styles.dec9}`}><SiDocker size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec10}`}><div className="w-full h-full rounded-full border-2 border-dashed border-teal-500/30"></div></div>
        <div className={`${styles.decorCard} ${styles.dec11}`}><SiTypescript size={25} opacity={0.6} /></div>
        <div className={`${styles.decorCard} ${styles.dec12}`}><div className="w-4 h-4 bg-yellow-400/20 rounded-sm rotate-12"></div></div>


        <div className={`${styles.decorCardFloat} ${styles.floatA}`}><SiNodedotjs size={25} color="#5FA04E" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatB}`}><div className={styles.pillGradient} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatC}`}><SiGit size={25} color="#F05032" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatD}`}><div className={styles.dotCluster}><span/><span/><span/></div></div>
        <div className={`${styles.decorCardFloat} ${styles.floatE}`}><SiSass size={25} color="#CC6699" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatF}`}><div className={styles.ring} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatG}`}><SiPhp size={25} color="#777BB4" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatH}`}><div className={styles.diagBar} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatI}`}><SiGooglecloud size={25} color="#4285F4" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatJ}`}><div className={styles.cross}><span/><span/></div></div>
        <div className={`${styles.decorCardFloat} ${styles.floatK}`}><SiPostgresql size={25} color="#4169E1" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatL}`}><div className={styles.arcPill} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatM}`}><SiGo size={25} color="#00ADD8" opacity={0.7} /></div>
        <div className={`${styles.decorCardFloat} ${styles.floatN}`}><div className={styles.tri} /></div> */}


        <div className={`${styles.card} ${styles.cornerCard} ${styles.frontendCard}`}>
          <span className={styles.cardLabel}>Frontend</span>
          <div className={styles.skillIcons}>
            {skillCategories[0].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.accentCard}`}>
          <div className={styles.accentGradient} />
        </div>

        <div className={`${styles.card} ${styles.textCard}`}>
          <div className={styles.textHeader}>
            <span className={styles.label}>Get To Know Me</span>
            <h2 className={styles.title}>
              About <span className={styles.highlight}>Me</span>
            </h2>
          </div>
          <p className={styles.revealText}>
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              const wordOpacity =
                progress <= start
                  ? 0
                  : progress >= end
                    ? 1
                    : (progress - start) / (end - start)
              return (
                <span key={i} className={styles.wordWrapper}>
                  <span className={styles.wordBg}>{word}</span>
                  <span
                    className={styles.wordFg}
                    style={{ opacity: wordOpacity }}
                  >
                    {word}
                  </span>
                </span>
              )
            })}
          </p>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.backendCard}`}>
          <span className={styles.cardLabel}>Backend</span>
          <div className={styles.skillIcons}>
            {skillCategories[1].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.card} ${styles.cornerCard} ${styles.toolsCard}`}>
          <span className={styles.cardLabel}>Tools & Cloud</span>
          <div className={styles.skillIcons}>
            {skillCategories[2].skills.map((skill) => (
              <div key={skill.name} className={styles.skillIcon} title={skill.name}>
                <skill.icon size={22} color={skill.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

About.displayName = "About"

export default About
