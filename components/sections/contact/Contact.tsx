"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"

import { forwardRef } from "react"


const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    const [isBlurred, setIsBlurred] = useState(false)
    
    useEffect(() => {
        const handleScroll = () => {
        setIsBlurred(window.scrollY > 50)
        }
    
        window.addEventListener("scroll", handleScroll)
        return () => {
        window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    
    return (
        <motion.div
        ref={ref}
        className={styles.contact_container}
        initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
        animate={{ backdropFilter: isBlurred ? "blur(10px)" : "blur(0px)", opacity: isBlurred ? 0.8 : 1 }}
        transition={{ backdropFilter: { duration: 0.3 }, opacity: { duration: 0.3 } }}
        >
        <h2>Contact Me</h2>
        <p>If you would like to get in touch, feel free to reach out!</p>
        </motion.div>
    )
    }
)
Contact.displayName = "Contact"
export default Contact