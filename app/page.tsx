import Hero from '@/components/sections/hero/Hero'
import About from '@/components/sections/about/About'
// import Projects from '@/components/sections/Projects'
// import Skills from '@/components/sections/Skills'
// import Contact from '@/components/sections/Contact'
import styles from '@/app/styles/Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <About />
      {/* <Projects />
      <Skills />
      <Contact /> */}
    </main>
  )
};

