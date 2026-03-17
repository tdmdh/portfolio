import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSimple.module.css';

// Using icon placeholders or simple SVG data for brevity
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
    </svg>
)

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
)


export default function SimplePortfolio() {
  return (
    <div className={styles.main}>
      <div className={styles.switchContainer}>
        <Link href="/" className={styles.switchButton}>
          <span>Interactive Form</span>
        </Link>
      </div>

      <div className={styles.bentoGrid}>
        {/* Hero Card */}
        <div className={`${styles.card} ${styles.heroCard}`}>
          <div className={styles.profileWrapper}>
             <Image
                src="/photo/me2.jpeg"
                alt="Mohammed"
                fill
                className={styles.profileImage}
                priority
              />
          </div>
          <div className={styles.heroContent}>
            <h2 className={styles.greeting}>Hi, I'm</h2>
            <h1 className={styles.name}>Mohammed</h1>
            <p className={styles.role}>Software Developer & Designer</p>
          </div>
        </div>

        {/* Bio Card */}
        <div className={`${styles.card} ${styles.bioCard}`}>
            <h3 className={styles.cardTitle}>About Me</h3>
            <p className={styles.bioText}>
              A dedicated software development student with a passion for building clean, scalable, and engaging web and mobile applications.
              I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust.
            </p>
        </div>

         {/* Skills Card */}
         <div className={`${styles.card} ${styles.skillsCard}`}>
            <h3 className={styles.cardTitle}>Top Tech Stack</h3>
            <div className={styles.skillsList}>
               <span className={styles.skillTag}>React & Next.js</span>
               <span className={styles.skillTag}>TypeScript</span>
               <span className={styles.skillTag}>Go</span>
               <span className={styles.skillTag}>PostgreSQL</span>
               <span className={styles.skillTag}>Tailwind CSS</span>
               <span className={styles.skillTag}>Docker</span>
            </div>
        </div>

        {/* Projects Card */}
        <div className={`${styles.card} ${styles.projectsCard}`}>
            <h3 className={styles.cardTitle}>Featured Projects</h3>
            <ul className={styles.projectList}>
                <li>
                    <a href="https://github.com/Mohammed-glr/fit-up" target="_blank" rel="noopener noreferrer">
                        <strong>FitUpp</strong> <span>(React Native, Go)</span>
                        <p>Comprehensive fitness training platform with personalized generated AI plans.</p>
                    </a>
                </li>
                 <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                         <strong>Smart CMS</strong> <span>(Go, gRPC)</span>
                        <p>Headless microservices CMS with real-time sync.</p>
                    </a>
                </li>
            </ul>
        </div>

        {/* Work Status / Contact */}
        <div className={`${styles.card} ${styles.contactCard}`}>
            <div className={styles.statusIndicator}>
                <span className={styles.statusDot}></span>
                Available for work
            </div>
            
            <a href="mailto:haftarou.dev@gmail.com" className={styles.emailLink}>
               haftarou.dev@gmail.com
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
            <span className={styles.location}>Remote / Rotterdam</span>
        </div>

         {/* Socials Map */}
        <div className={`${styles.card} ${styles.socialCard}`}>
            <a href="https://github.com/tdmdh" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <GitHubIcon />
            </a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <LinkedInIcon />
            </a>
        </div>

      </div>
    </div>
  );
}
