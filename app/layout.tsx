import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/styles/globals.css"
import styles from "@/app/styles/Layout.module.css"
import Navbar from "@/components/navbar/Navbar"
import { SectionProvider } from "@/context/section-context";
import LayoutSwitchButton from "../components/ui/LayoutSwitchButton"
import SchoolNavbar from "@/components/navbar/SchoolNavbar"
import NavbarSwitcher from "@/components/layout/NavbarSwitcher"
import { SectionProviderSwitcher } from "@/context/section-provider-switcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your Site",
  description: "Your site description",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <SectionProviderSwitcher>
          <NavbarSwitcher />
          <LayoutSwitchButton />
          <main className={styles.main}>
            <div className={styles.pageContent}>{children}</div>
          </main>
        </SectionProviderSwitcher>
      </body>
    </html>
  )
}