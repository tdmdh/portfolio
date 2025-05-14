"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"
import { useSectionRefs } from "@/context/section-context"

export default function NavLinks({
  isMenuOpen,
  closeMenu,
}: {
  isMenuOpen: boolean
  closeMenu: () => void
}) {
  const { sections } = useSectionRefs()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeId, setActiveId] = useState<string>("hero")

  const { scrollY } = useScroll()

  const isActive = 

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const NavLinksStyle = {
    borderRadius: isScrolled ? "2rem" : "3rem",
    zIndex: isScrolled ? 10 : 0,
  }



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
      const currentPosition = window.scrollY;
  
      for (const section of sections) {
        const el = section.ref.current;
        if (el) {
          const offsetTop = el.offsetTop;
          const sectionHeight = window.innerHeight;
          
          if (currentPosition >= offsetTop && currentPosition < offsetTop + sectionHeight) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    closeMenu();
  };
  
  
  


  return (
    <motion.ul
      className={`${styles.nav_links} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.li
          key={section.id}
          className={styles.nav_item}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={NavLinksStyle}
        >
          <button
            className={`${styles.nav_link} ${activeId === section.id ? styles.active : ""}`}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => scrollToSection(section.ref)}
          >

            {hoveredIndex === index && (
              <motion.span
                layoutId="hoverBackground"
                className={styles.hoverBackground}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  
                }}
              />
            )}
            <span className={styles.linkText}>{section.id}</span>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  )
}
