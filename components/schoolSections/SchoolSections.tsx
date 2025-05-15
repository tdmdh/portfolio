"use client";

import React from "react";
import Hero from "@/components/schoolSections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Contact from "@/components/sections/contact/Contact";
import About from "@/components/sections/about/About";
import styles from "@/app/styles/Sections.module.css";
import { useSchoolSectionRefs } from "@/context/school-context";
import Assignments from "@/components/schoolSections/assignments/Assignments";
const SchoolSections = () => {
  const { refs } = useSchoolSectionRefs();
  const { assignmentsRef, heroRef} = refs;

  return (
    <div className={styles.container}>
      <Hero ref={heroRef} />
      <Assignments ref={assignmentsRef} />
    </div>
  );
};

export default SchoolSections;