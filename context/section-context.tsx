"use client"

import type React from "react"
import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react"

type SectionRefs = {
    heroRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
    projectsRef: React.RefObject<HTMLDivElement | null>
    contactRef: React.RefObject<HTMLDivElement | null>
};

type SectionInfo = {
    name: string
    id: string
    ref: React.RefObject<HTMLDivElement | null>
    isDark: boolean
}

type SectionContextType = {
    refs: SectionRefs
    sections: SectionInfo[]
    currentSection: string
    isDarkSection: boolean
};

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export function SectionProvider({ children }: { children: React.ReactNode }) {
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)

    const [currentSection, setCurrentSection] = useState("hero")
    const [isDarkSection, setIsDarkSection] = useState(true)

    const refs = {
        heroRef,
        aboutRef,
        projectsRef,
        contactRef
    }

    const sections: SectionInfo[] = [
        { name: "Home", id: "hero", ref: heroRef, isDark: true },
        { name: "About", id: "about", ref: aboutRef, isDark: false },
        { name: "Projects", id: "projects", ref: projectsRef, isDark: false },
        { name: "Contact", id: "contact", ref: contactRef, isDark: true }
    ]

    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.1

        for (const section of sections) {
            const element = section.ref.current
            if (element) {
                const { offsetTop, offsetHeight } = element
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    if (currentSection !== section.id) {
                        setCurrentSection(section.id)
                        setIsDarkSection(section.isDark)
                    }
                    break
                }
            }
        }
    }, [currentSection, sections])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    return (
        <SectionContext.Provider value={{ refs, sections, currentSection, isDarkSection }}>
            {children}
        </SectionContext.Provider>
    )
}

export function useSectionRefs() {
    const context = useContext(SectionContext)
    if (context === undefined) {
        throw new Error("useSectionRefs must be used within a SectionProvider")
    }
    return context
}