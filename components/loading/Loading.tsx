import { useEffect, useState } from "react";
import styles from "../../styles/Loading.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 700);
                    return 100;
                }
                return oldProgress + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.loader}
        >
            <div className={styles.loadingContainer}>
                <div className={styles.loadingLogo}>
                    <Image src="/icons/logo.svg" alt="logo" width={200} height={200} />
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
