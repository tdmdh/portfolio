"use client"
import React, { useState, useEffect } from "react";
import styles from "../styles/Portfolio.module.css";
import Marquee from "@/components/marquee/Marquee";
import { motion } from "framer-motion";
import Card from "@/components/card/Card";
import CardTwo from "@/components/card/Card-2";


const Portfolio = () => {
  const sections = ["projects", "skills", "about"];
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newActiveSection = Math.round(scrollPosition / window.innerHeight );
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.main}>
      

      <div className={styles.contentWrapper}>
        {sections.map((section, index) => (
          <motion.div
            key={section}
            className={styles.section}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: activeSection === index ? 1 : 1,
              y: 0,
            }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {section === "projects" && (
              <div className={styles.aboutMyProjects}>
                <p className={styles.title}>Projects</p>
                <p className={styles.description}>
                  Ik heb aan verschillende projecten gewerkt tijdens mijn studie aan het Grafisch Lyceum.
                </p>
              </div>
            )}

            {section === "skills" && (
              <div className={styles.mySkills}>
                <p className={styles.title}>Skills</p>
                <p className={styles.description}>
                  Ik heb verschillende vaardigheden geleerd tijdens mijn studie aan het Grafisch Lyceum.
                </p>
                <div className={styles.skills}>
                  <Marquee />
                </div>
              </div>
            )}

            {section === "about" && (
              <div className={styles.projects}>
                <div className={styles.project}>
                  <Card />
                </div>
                <div className={styles.project}>
                </div>
                  <CardTwo />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;