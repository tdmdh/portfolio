import { motion } from "framer-motion"
import styles from "@/app/styles/About.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"
import { TextReveal } from "@/components/ui/TextReveal"

export default function AboutDescription({ isBlurred }: { isBlurred: boolean }) {
  return (
    
      <TextReveal>
        I'm Mohammed — a dedicated software development student with a passion for building clean, scalable, and engaging web applications. With a strong foundation in modern web technologies and an eye for design, I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust. My approach combines frontend innovation with thoughtful UX, leveraging tools like TypeScript, React, Next.js, and Framer Motion to deliver performant and future-focused solutions.
      </TextReveal>
  )
}
