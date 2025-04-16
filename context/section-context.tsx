"use client"

import type React from "react"
import { createContext, useContext, useRef } from "react"

type SectionRefs = {
    heroRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
    projectsRef: React.RefObject<HTMLDivElement | null>
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
    const contactRef = useRef<HTMLDivElement>(null)

    const refs ={
        heroRef,
        aboutRef,
        projectsRef,
        contactRef
    }

    const sections = [
        { name : "Projects", id: "projects", ref: projectsRef },
        { name : "About", id: "about", ref: aboutRef },
        { name : "Home", id: "hero", ref: heroRef },
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