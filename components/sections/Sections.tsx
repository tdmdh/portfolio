"use client";

import React from "react";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Skills from "@/components/sections/skills/Skills";
import Contact from "@/components/sections/contact/Contact";
import About from "@/components/sections/about/About";
import { useSectionRefs } from "@/context/section-context";
import styles from "@/app/styles/Home.module.css";

const Sections = () => {
  const { refs } = useSectionRefs();
  const { heroRef, aboutRef, projectsRef, skillsRef, contactRef } = refs;

  return (
    <div className={styles.container}>
      <Hero ref={heroRef} />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
      <Skills ref={skillsRef} />
      <Contact ref={contactRef} />
    </div>
  );
};

export default Sections;