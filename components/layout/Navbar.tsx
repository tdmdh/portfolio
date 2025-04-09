"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.nav_container}>
      <nav className={styles.navbar}>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}>
          {[
            { name: "Blog", path: "/blog" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${router.pathname === item.path ? styles.active : ""}`}
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
        >
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
