"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import styles from "@/app/school/styles/Navbar.module.css"
import { useSchoolSectionRefs } from "@/context/school-context"

export default function SchoolNavLinks({
  isMenuOpen,
  closeMenu,
}: {
  isMenuOpen: boolean
  closeMenu: () => void
}) {
  const { sections } = useSchoolSectionRefs()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeId, setActiveId] = useState<string>("hero")
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = list.querySelectorAll("li")
    gsap.fromTo(list, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    gsap.fromTo(items,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
    )
  }, [])

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
    <ul
      ref={listRef}
      className={`${styles.nav_links} ${isScrolled ? styles.scrolled : ""}${isMenuOpen ? styles.menu_open : ""}`}
      style={{ opacity: 0 }}
    >
      {sections.map((section, index) => (
        <li
          key={section.id}
          className={styles.nav_item}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={NavLinksStyle}
        >
          <button
            className={`${styles.nav_link} ${activeId === section.id ? styles.active : ""}`}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => scrollToSection(section.ref)}
          >
            {hoveredIndex === index && (
              <span className={styles.hoverBackground} />
            )}
            <span className={styles.linkText}>{section.id}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
