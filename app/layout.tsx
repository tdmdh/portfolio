import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/styles/globals.css"
import styles from "@/app/styles/Layout.module.css"
import LayoutSwitchButton from "../components/ui/LayoutSwitchButton"
import NavbarSwitcher from "@/components/layout/NavbarSwitcher"
import { SectionProviderSwitcher } from "@/context/section-provider-switcher"
import Logo from "@/components/layout/Logo"
import LoadingScreen from "@/components/ui/LoadingScreen"
import PixelTrail from "@/components/layout/Pixels"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohammed Haftarou - Portfolio",
  description: "Mohammed Haftarou's portfolio showcasing web development projects and skills.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <LoadingScreen /> */}
        <div className={styles.glassContainer}>
          <SectionProviderSwitcher>
            <NavbarSwitcher />
            {/* <LayoutSwitchButton /> */}
            <main className={styles.main}>
              <div className={styles.pageContent}>{children}</div>
            </main>
            {/* <Logo /> */}
          </SectionProviderSwitcher>
        </div>
      </body>
    </html>
  )
}
