"use client"

import { motion } from "framer-motion"
import styles from "@/app/styles/Projects.module.css"
import Image from "next/image"

export const ProjectCard = () => {
    return (
        <motion.div>
            <motion.div
            className={styles.card}
            >
                <motion.p
                className={styles.cardTitle}
                >
                    lornian
                </motion.p>
                <motion.p
                className={styles.discription}
                >
                    lornian is my fisrt real project and im still working on it 
                </motion.p>
                <motion.div
                className={styles.cardImg}
                >
                </motion.div>
            </motion.div>
        </motion.div>
    )
}