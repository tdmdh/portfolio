import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/styles/globals.css"
import styles from "@/app/styles/Layout.module.css"
import Navbar from "@/components/navbar/Navbar"
import { SectionProvider } from "@/context/section-context";
import SchoolBtn from "./school/components/Schoolbtn"

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
        <SectionProvider>
          <Navbar />
          <SchoolBtn />
          <div className={styles.main}>
            <main className={styles.pageContent}>{children}</main>
          </div>
        </SectionProvider>
      </body>
    </html>
  )
}