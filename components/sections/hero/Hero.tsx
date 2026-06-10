"use client"

import React, { forwardRef } from "react"
import styles from "@/app/styles/Hero.module.css"
import HeroTitle from "@/components/sections/components/HeroTitle"
import Image from "next/image"
import Link from "next/link"
import me2Img from "@/public/photo/me2.jpeg"

const Home = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className={styles.main}>
      {/*<div className={styles.switchContainer}>
        <Link href="/simple" className={styles.switchButton}>
          <span>View Simple Version</span>
        </Link>
      </div>*/}

      <div className={styles.photoBackground}>
        <Image
          src={me2Img}
          alt="Mohammed"
          fill
          priority
          placeholder="blur"
          className={styles.profileImage}
          sizes="100vw"
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.topContent}>
          <HeroTitle
            title="Hi, I'm"
            animationDelay={0.05}
            animationType="word"
            trigger="onMount"
            animationDuration={0.5}
          />
        </div>
        <div className={styles.bottomContent}>
          <HeroTitle
            title="Mohammed"
            animationDelay={0.04}
            animationType="letter"
            trigger="onMount"
            animationDuration={0.5}
          />
        </div>
      </div>
    </div>
  )
})

Home.displayName = "Home"
export default Home
