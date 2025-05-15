"use client"
import { usePathname } from "next/navigation"
import SchoolNavbar from "@/components/navbar/SchoolNavbar"
import Navbar from "@/components/navbar/Navbar"

export default function NavbarSwitcher() {
    const pathname = usePathname()
    const isSchoolPage = pathname.startsWith("/school")
    return(
        <div>
            {isSchoolPage ? <SchoolNavbar /> : <Navbar />}
        </div>
    )
}