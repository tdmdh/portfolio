import React, { useRef } from 'react';
import styles from "@/app/styles/ContactCard.module.css";
import { motion, useInView } from "framer-motion";
import HeroTitle from './HeroTitle';


export default function ContactCard() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1, x: 100 },
        visible: { opacity: 1, scale: 1, x: 0 }
    };

    return (
        <motion.div
            ref={ref}
            className={styles.contactCardContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ duration: 0.8 }}
        >
            <motion.div 
                className={styles.contactCard}
                variants={cardVariants}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <HeroTitle title="Contact me" animationDelay={0.1}
                    animationType="letter"
                    trigger="inView"
                    animationDuration={5} /> 
                    <HeroTitle subtitle="Let's connect and collaborate!" 
                    animationDelay={0.1}
                    animationType="letter"
                    trigger="inView"
                    animationDuration={5}
                    className='text-xl sm:text-2xl md:text-3xl pb-6 sm:pb-8 md:pb-12'
                    />
                        <a href="mailto:haftarou.dev@gmail.com" title='email' className={styles.contactButton}>
                            Email Me
                        </a>
            </motion.div>
            <motion.div 
                className={styles.contactImage}
                variants={imageVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <motion.img
                    src="/photo/me.CR3" 
                    alt="Contact"
                    className={styles.contactImage}
                />
            </motion.div>
        </motion.div>
    )};