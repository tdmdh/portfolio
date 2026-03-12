"use client";

import React from "react";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Contact from "@/components/sections/contact/Contact";
import About from "@/components/sections/about/About";
import { useSectionRefs } from "@/context/section-context";
import styles from "@/app/styles/Sections.module.css";

const SectionsContent = () => {
  const { refs } = useSectionRefs();
  const { heroRef, aboutRef, projectsRef, contactRef } = refs;

  return (
    <>
      <div className={styles.hero}>
        <Hero ref={heroRef} />
      </div>
      <div className={styles.about}>
        <About ref={aboutRef} />
      </div>
      <div className={styles.contact}>
        <Contact ref={contactRef} />
      </div>
      <div className={styles.projects}>
        <Projects ref={projectsRef} />
      </div>
    </>
  );
};

const Sections = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionsWrapper} data-sections-wrapper>
        <SectionsContent />
      </div>
      <div className={styles.scrollPlaceholder} />
    </div>
  );
};

export default Sections;