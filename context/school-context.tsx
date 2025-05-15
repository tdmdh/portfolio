// components/context/SchoolSectionContext.tsx

"use client"
import { createContext, useContext, useRef, RefObject } from "react"
import type React from "react"

type SchoolRefs = {
  assignmentsRef: RefObject<HTMLDivElement | null>
  heroRef: RefObject<HTMLDivElement | null>
}

type SchoolSectionContextType = {
  refs: SchoolRefs
  sections: { id: string; ref: RefObject<HTMLDivElement | null> }[]
}

const SchoolSectionContext = createContext<SchoolSectionContextType | undefined>(undefined)

export function SchoolSectionProvider({ children }: { children: React.ReactNode }) {
  const assignmentsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const refs = { assignmentsRef, heroRef }
  const sections = [
    { id: "assignments", ref: assignmentsRef },
    { id: "hero", ref: heroRef }
  ]

  return (
    <SchoolSectionContext.Provider value={{ refs, sections }}>
      {children}
    </SchoolSectionContext.Provider>
  )
}

export function useSchoolSectionRefs() {
  const context = useContext(SchoolSectionContext)
  if (!context) throw new Error("useSchoolSectionRefs must be used within SchoolSectionProvider")
  return context
}
