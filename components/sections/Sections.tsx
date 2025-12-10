"use client";

import React from "react";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Contact from "@/components/sections/contact/Contact";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/skills/Skills";
import { useSectionRefs } from "@/context/section-context";
import styles from "@/app/styles/Sections.module.css";

const Sections = () => {
  const { refs } = useSectionRefs();
  const { heroRef, aboutRef, skillsRef, projectsRef, contactRef } = refs;

  return (
    <div className={styles.container}>
      <Hero ref={heroRef} />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
    </div>
  );
};

export default Sections;