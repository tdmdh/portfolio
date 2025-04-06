import React from "react";
import Navbar from "./Navbar";
import { ReactNode } from "react";
import styles from "../../styles/Layout.module.css";
import  {WavyBackground}  from "../ui/wavy-background";



interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className={styles.main} >
      <Navbar />
          <div className={styles.background}>
            <WavyBackground/>
              <div className={styles.custome_shape_div_container}>
                <div className={styles.custome_shape_centering_div}>
                    <svg className={styles.svg_corner_top_left} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_310_2)">
                        <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#fffcf2"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_310_2">
                          <rect width="30" height="30" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    
                  <div className={styles.custome_shape_div}></div>
                    <svg className={styles.svg_corner_top_right} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_310_2)">
                        <path d="M30 0H0V30C0 13.431 13.431 0 30 0Z" fill="#fffcf2"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_310_2">
                          <rect width="30" height="30" fill="white"></rect>
                        </clipPath>
                      </defs> 
                    </svg>
                </div>
            </div>
        </div>
        <main className={styles.pageContent} > {children} </main>
      </div>
  );
};

export default Layout;
