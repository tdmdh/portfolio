"use client"

import type React from "react"
import { createContext, useContext, useRef } from "react"

type SectionRefs = {
    heroRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
    projectsRef: React.RefObject<HTMLDivElement | null>
    skillsRef: React.RefObject<HTMLDivElement | null>
    contactRef: React.RefObject<HTMLDivElement | null>
};

type SectionContextType = {
    refs: SectionRefs;
    sections: {
        id: string;
        ref: React.RefObject<HTMLDivElement | null>;
    }[];
};

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export function SectionProvider({ children }: { children: React.ReactNode}){
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const skillsRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)

    const refs ={
        heroRef,
        aboutRef,
        projectsRef,
        skillsRef,
        contactRef
    }

    const sections = [
        { name : "Home", id: "hero", ref: heroRef },
        { name : "About", id: "about", ref: aboutRef },
        { name : "Projects", id: "projects", ref: projectsRef },
        { name : "Skills", id: "skills", ref: skillsRef },
        { name : "Contact", id: "contact", ref: contactRef }
    ]


    return <SectionContext.Provider value={{ refs, sections }}>
        {children}</SectionContext.Provider>
}

export function useSectionRefs() {
    const context = useContext(SectionContext)
    if (context === undefined) {
        throw new Error("useSectionRefs must be used within a SectionProvider")
    }
    return context
}