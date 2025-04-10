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
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: -50 }}
      className={styles.nav_container}>
      <svg
            className={styles.topLeft}
            width="30"
            height="30"
            viewBox="0 0 50 50"
            fill="#f2e9e4"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(90deg)' }} 
          >
            <g transform="scale(2)" clipPath="url(#clip0_310_2)">
              <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f2e9e4" />
            </g>
            <defs>
              <clipPath id="clip0_310_2">
                <rect width="30" height="30" fill="#f2e9e4" />
              </clipPath>
            </defs>
          </svg>
      <motion.nav 
      className={styles.navbar}
          
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
      <svg
            className={styles.bottomRight}
            width="30"
            height="30"
            viewBox="0 0 50 50"
            fill="#f2e9e4"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(360deg)' }} 
          >
            <g transform="scale(2)" clipPath="url(#clip0_310_2)">
              <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#f2e9e4" />
            </g>
            <defs>
              <clipPath id="clip0_310_2">
                <rect width="30" height="30" fill="#f2e9e4" />
              </clipPath>
            </defs>
          </svg>
    </motion.div>
  );
};

export default Navbar;