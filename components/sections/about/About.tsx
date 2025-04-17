"use client"

import { useEffect, useState } from "react"
import { useScroll } from "framer-motion"
import AboutSectionWrapper from "@/components/sections/about/components/AboutSectionWrapper"
import AboutIntro from "@/components/sections/about/components/AboutIntro"
import AboutDescription from "@/components/sections/about/components/AboutDescription"
import AboutSkills from "@/components/sections/about/components/AboutSkills"

const About = () => {
  const { scrollY } = useScroll()
  const [isBlurred, setIsBlurred] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <AboutSectionWrapper
      variants={{
        hidden: { opacity: 0, y: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <AboutIntro isBlurred={isBlurred} />
      <AboutDescription isBlurred={isBlurred} />
      <AboutSkills isBlurred={isBlurred} showIcon={showIcon} setShowIcon={setShowIcon} />
    </AboutSectionWrapper>
  )
}

export default About
