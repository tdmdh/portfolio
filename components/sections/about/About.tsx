"use client";

import { useEffect, useState, forwardRef } from "react";
import { useScroll } from "framer-motion";
import AboutSectionWrapper from "@/components/sections/about/components/AboutSectionWrapper";
import AboutIntro from "@/components/sections/about/components/AboutIntro";
import AboutDescription from "@/components/sections/about/components/AboutDescription";
import AboutSkills from "@/components/sections/about/components/AboutSkills";
import styles from "@/app/styles/About.module.css"

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const { scrollY } = useScroll();
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsBlurred(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div 
    ref={ref}
        className={styles.main}
      >
      <AboutSectionWrapper
        variants={{
          hidden: { opacity: 0, y: 100 },
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
        {/* <AboutSkills
          isBlurred={isBlurred}
          showIcon={showIcon}
          setShowIcon={setShowIcon}
        /> */}
      </AboutSectionWrapper>
    </div>
  );
});

About.displayName = "About";

export default About;
