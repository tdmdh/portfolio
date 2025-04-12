import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/styles/globals.css"
import styles from "@/app/styles/Layout.module.css"
import Navbar from "@/components/layout/Navbar"

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
        <Navbar />
          <div className={styles.main}>
            <main className={styles.pageContent}>{children}</main>
          </div>
      </body>
    </html>
  )
}