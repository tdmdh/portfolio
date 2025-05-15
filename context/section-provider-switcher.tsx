"use client"
import { usePathname } from "next/navigation"
import { SchoolSectionProvider } from "./school-context"
import { SectionProvider } from "./section-context"

export function SectionProviderSwitcher({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/school")) {
    return <SchoolSectionProvider>{children}</SchoolSectionProvider>
  }

  return <SectionProvider>{children}</SectionProvider>
}
