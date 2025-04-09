import React from "react";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";
import styles from "@/app/styles/Layout.module.css";
import  { WavyBackground }  from "@/components/ui/wavy-background";
import "@/app/styles/globals.css"
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
        <body>
            <div className={styles.background} >
                <div className={styles.main} >
                <Navbar />
                    <main className={styles.pageContent} > {children} </main>
                </div>
            </div>
        </body>
    </html>
  );
};

export default Layout;