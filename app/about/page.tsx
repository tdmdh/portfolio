"use client"
import React from "react";
import styles from "../styles/About.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  const sections = ["about", "motivation", "goals","vision","hobbey", "skills"];
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollX;
      const newActiveSection = Math.round(scrollPosition / window.innerWidth );
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
              initial={{ opacity: 0, y: 50}}
              animate={{
                opacity: activeSection === index ? 1 : 1,
                y: 0,
              }}
              transition={{ duration: 0.9, ease: "easeInOut"}}
            >
              {section === "about" && (
                <div className={styles.aboutMe}>
                  <p className={styles.title}>About Me</p>
                  <p className={styles.description}>
                  Ik ben Mohammed Haftarou, een 17-jarige creatieve softwareontwikkelingsstudent aan het Grafisch Lyceum. Ik heb ervaring in het ontwikkelen van softwaretoepassingen met verschillende programmeertalen en tools.

                  </p>
                </div>
              )}

              {section === "motivation" && (
                <div className={styles.myMotivation}>
                  <p className={styles.title}>Motivation</p>
                  <p className={styles.description}>
                  Mijn motivatie komt voort uit mijn passie voor technologie en mijn verlangen om innovatieve oplossingen voor echte problemen te creëren. Ik hou ervan om complexe problemen op te lossen en mijn werk tot leven te zien komen.
                  </p>
                </div>
              )}

              {section === "goals" && (
                <div className={styles.myGoals}>
                  <p className={styles.title}>Goals</p>
                  <p className={styles.description}>
                  Mijn doel is om een professionele softwareontwikkelaar te worden en aan spannende projecten te werken. Uiteindelijk wil ik mijn eigen bedrijf starten en financiële vrijheid bereiken.
                    </p>
                </div>
              )}

              {section === "vision" && (
                <div className={styles.myVision}>
                  <p className={styles.title}>Vision</p>
                  <p className={styles.description}>
                  Enkele van mijn doelen voor de toekomst zijn het leren van nieuwe technologieën, het opdoen van meer ervaring in het veld en het bijdragen aan open-source projecten. Ik wil ook de vaardigheid ontwikkelen om .
                  </p>
                </div>
              )}

              {section === "hobbey" && (
                <div className={styles.myHobbey}>
                  <p className={styles.title}>Hobbey</p>
                  <p className={styles.description}>
                  Ik hou van het spelen van videogames, het kijken van films, het lezen van boeken en het reizen om nieuwe plaatsen te ontdekken. Ik zoek nieuwe avonturen en ervaringen om mijn creativiteit te inspireren.
                  </p>
                </div>
              )}

              {section === "skills" && (
                <div className={styles.mySkills}>
                  <p className={styles.title}>Skills</p>
                  <p className={styles.description}>
                  Ik heb ervaring met programmeertalen zoals JavaScript, TypeScript, HTML en CSS. Ik heb ook gewerkt met frameworks en bibliotheken zoals React en Next.js.                  </p>
                </div>
              )}

            </motion.div>
          ))}
        </div>
    </div>
  );
};

export default About;
