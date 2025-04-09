"use client";
import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/app/styles/Navbar.module.css";
import { motion } from "framer-motion";
import { animate } from "framer-motion";
import { useEffect } from "react";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 1,
      type: "spring",
      stiffness: 100,
      damping: 10,
      when: "afterChildren",
      staggerChildren: 0.5,
      staggerDirection: 1,
      delayChildren: 0.5,
      delay: 0.5,
      bounce: 0.5,
      
    },
  },
};


const NAV_LINKS = [
  { name: "Blog", path: "/blog" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.nav_container}>
      <motion.nav 
      className={styles.navbar}
      initial="initial"
      animate="animate"
      variants={float}
      >
        <ul
          className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}
          id="menu"
        >
          {NAV_LINKS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${
                  pathname.startsWith(item.path) ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`${styles.hamburger} ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu"
        >
          <span></span>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;