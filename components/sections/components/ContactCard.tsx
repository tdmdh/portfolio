import React from 'react';
import styles from "@/app/styles/ContactCard.module.css";
import { motion } from "framer-motion";

export default function ContactCard() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },  
        visible: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };





    return (
        <motion.div
            className={styles.contactCardContainer}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
        >
            <motion.div className={styles.contactCard}>
                <p>Contact Me</p>
                <p>If you have any questions or just want to say hi, feel free to reach out!</p>
                <a href="mailto:haftarou.dev@gmail.com" className={styles.contactButton}>
                    Email Me
                </a>
            </motion.div>
            <motion.div className={styles.contactImage}>
                <img src="/images/contact-image.png" alt="Contact" />
            </motion.div>
        </motion.div>
    )};