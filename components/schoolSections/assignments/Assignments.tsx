"use client"
import React from "react"
import { forwardRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "@/app/school/styles/Assignments.module.css"
import Slogan from "@/components/sections/components/Slogan"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Cta from "@/components/ui/Cta"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { GraduationCap, Target, Rocket, Flame, Lightbulb, Heart, Leaf, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

const Assignments = forwardRef<HTMLDivElement> ((props, ref) => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  
  return (
    <div
    ref={ref} 
    className={styles.main} 
    >

      <Dialog>
        <DialogTrigger className={styles.dialogbtn}>View Assignment 1</DialogTrigger>
        <DialogContent>
          <DialogTitle className={styles.title} >
                Assignment 1
          </DialogTitle>
          <DialogDescription className={styles.descriptionC} >
          <span className={styles.subtitle}>
              <Smile size={20} style={{ marginRight: 8 }} />
              More about me
            </span>
            <span className={styles.description}>
              I'm Mohammed Haftarou, I'm 17 years old and I'm a creative software developer student. I'm currently studying software development at Grafish Lyceum. I have experience in developing software applications using various programming languages and tools. I'm always looking for new opportunities to learn and grow as a software developer. I'm excited to see what the future holds for me in the world of software development.
            </span>

            <span className={styles.subtitle}>
              <Flame size={20} style={{ marginRight: 8 }} />
              Motivation
            </span>
            <span className={styles.description}>
              My motivation comes from my passion for technology and my desire to create innovative solutions to real-world problems. I love the challenge of solving complex problems and the satisfaction of seeing my work come to life. I'm always looking for new ways to improve my skills and expand my knowledge in the field of software development. I'm excited to see where my journey as a software developer will take me.
            </span>

            <span className={styles.subtitle}>
              <Target size={20} style={{ marginRight: 8 }} />
              My Goals
            </span>
            <span className={styles.description}>
              My goal is to become a professional software developer and work on exciting projects that challenge me to grow and learn new skills. After improving my skills, I'll start my own company to be financially free.
            </span>
          </DialogDescription>
          <div className="mt-4">
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className={styles.dialogbtn}>View Assignment 2</DialogTrigger>
        <DialogContent>
          <DialogTitle className={styles.title} >
                Assignment 2
          </DialogTitle>
            <DialogDescription className={styles.descriptionC} >
                <span className={styles.subTitle}>
                <GraduationCap size={20} style={{ marginRight: '8px' }} />
                My Vision as a Software Developer
              </span>

              <span className={styles.subtitle}>
                <Target size={18} style={{ marginRight: '6px' }} />
                Short-Term Goals
              </span>
              <span className={styles.description}>
                <span>Learn to work with <strong>Next.js</strong>, <strong>JavaScript</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Go</strong></span>
                <span>Improve my <strong>teamwork</strong> and <strong>communication</strong> skills</span>
                <span>Grow personally by having <strong>more conversations</strong> with friends and classmates</span>
              </span>

              <span className={styles.subtitle}>
                <Rocket size={18} style={{ marginRight: '6px' }} />
                Looking Ahead
              </span>
              <span className={styles.description}>
                I don’t see myself working for a company right away. First, I want to take a <strong>gap year</strong> to start my own project: 
                an <strong>affordable educational AI tool</strong> for students. My goal is to help others learn better and grow through technology.
              </span>

              <span className={styles.subTitle}>
                <Flame size={20} style={{ marginRight: '8px' }} />
                What Drives Me
              </span>

              <span className={styles.subtitle}>
                <Lightbulb size={18} style={{ marginRight: '6px' }} />
                Inspiration
              </span>
              <span className={styles.description}>
                I’m driven by <strong>discipline</strong> and a strong <strong>desire to help people</strong> — especially students who need it most.
              </span>

              <span className={styles.subtitle}>
                <Heart size={18} style={{ marginRight: '6px' }} />
                Interests
              </span>
              <span className={styles.description}>
                <span>Making an <strong>impact</strong> on others</span>
                <span>Coming up with <strong>creative solutions</strong></span>
                <span>Solving challenges through <strong>code</strong></span>
              </span>

              <span className={styles.subTitle}>
                <Leaf size={20} style={{ marginRight: '8px' }} />
                Why This Path Suits Me
              </span>
              <span className={styles.description}>
                Software development gives me the freedom to build something meaningful. My passion for <strong>helping others</strong>, my 
                <strong>discipline</strong>, and my love for <strong>problem-solving</strong> come together in my dream: creating a platform that truly makes a difference for students.
              </span>
              </DialogDescription>
            <div className="mt-4">
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
});

Assignments.displayName = "Assignments"
export default Assignments
