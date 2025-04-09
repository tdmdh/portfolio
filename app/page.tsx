"use client";
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
import styles from "./styles/Home.module.css";
import BackgroundGradient from "@/components/background/BackgroundGradient";

const Home = () => {
  const floatAnimation = useSpring({
    loop: true,
    to: [{ transform: "translateY(-10px)" }, { transform: "translateY(0px)" }],
    from: { transform: "translateY(0px)" },
    config: { tension: 100, friction: 30 },
  });

  return (
    <div className={styles.main}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className={styles.modelContainer}>
          {/* <Model /> */}
        </div>
        <div className={styles.main_content}>
          <animated.p className={styles.title} style={floatAnimation}>Hi, I&#39;m</animated.p>
          <motion.p
            className={styles.title}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Mohammed
          </motion.p>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            A software development student at Grafish Lyceum Rotterdam
          </motion.p>
          <div className={styles.socials}></div>
          <div className={styles.bg_container}>
            <BackgroundGradient />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
