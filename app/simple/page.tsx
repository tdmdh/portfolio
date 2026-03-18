import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSimple.module.css';

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="28" width="28">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
    </svg>
)

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="28" width="28">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
)

export default function SimplePortfolio() {
  return (
    <div className={styles.main}>
      <div className={styles.switchContainer}>
        <Link href="/" className={styles.switchButton}>
          <span>Interactive Version</span>
        </Link>
      </div>

      <div className={styles.bentoGrid}>
        
        {/* HERO CARD (2x2) */}
        <div className={`${styles.card} ${styles.heroCard}`}>
          <div className={styles.heroContentWrapper}>
             <div className={styles.profileWrapper}>
                 <Image
                    src="/photo/me2.jpeg"
                    alt="Mohammed"
                    fill
                    className={styles.profileImage}
                    priority
                  />
             </div>
             <div className={styles.heroTitles}>
                <h2 className={styles.greeting}>Hi, I'm</h2>
                <h1 className={styles.name}>Mohammed</h1>
                <p className={styles.role}>Web Developer & Designer</p>
             </div>
          </div>
        </div>

        {/* BIO CARD (2x1) */}
        <div className={`${styles.card} ${styles.bioCard}`}>
            <span className={styles.cardLabel}>About Me</span>
            <p className={styles.bioText}>
              I'm a dedicated software development student with a passion for building clean, scalable, and engaging applications. I specialize in crafting intuitive user experiences that are both aesthetically pleasing and technically robust.
            </p>
        </div>

         {/* SKILLS CARD (1x2) */}
         <div className={`${styles.card} ${styles.skillsCard}`}>
            <span className={styles.cardLabel}>Tech Stack</span>
            <div className={styles.skillsList}>
               <span className={styles.skillTag}>React & Next.js</span>
               <span className={styles.skillTag}>TypeScript</span>
               <span className={styles.skillTag}>Go (Golang)</span>
               <span className={styles.skillTag}>PostgreSQL</span>
               <span className={styles.skillTag}>Tailwind CSS</span>
               <span className={styles.skillTag}>Docker & GCP</span>
            </div>
        </div>

        {/* PROJECTS CARD (1x2) */}
        <div className={`${styles.card} ${styles.projectsCard}`}>
            <span className={styles.cardLabel}>Featured Work</span>
            <div className={styles.projectList}>
                <a href="https://github.com/Mohammed-glr/fit-up" target="_blank" rel="noopener noreferrer" className={styles.projectItem}>
                    <strong>FitUpp</strong>
                    <span>React Native & Go</span>
                    <p>AI-powered fitness platform with tailored plans.</p>
                </a>
                <a href="https://github.com/tdmdh/smart-cms-server" target="_blank" rel="noopener noreferrer" className={styles.projectItem}>
                    <strong>Smart CMS</strong>
                    <span>Go, gRPC, Next.js</span>
                    <p>Headless microservices CMS with real-time sync.</p>
                </a>
                <a href="https://github.com/tdmdh/ai-controller" target="_blank" rel="noopener noreferrer" className={styles.projectItem}>
                    <strong>Sora AI</strong>
                    <span>Go, Ollama</span>
                    <p>Local-first AI assistant and controller API.</p>
                </a>
            </div>
        </div>

        {/* CONTACT CARD (1x1) */}
        <div className={`${styles.card} ${styles.contactCard}`}>
            <span className={styles.cardLabel}>Get in Touch</span>
            <div className={styles.statusIndicator}>
                <div className={styles.statusDotWrapper}>
                    <span className={styles.ping}></span>
                    <span className={styles.statusDot}></span>
                </div>
                Available for work
            </div>
            
            <a href="mailto:haftarou.dev@gmail.com" className={styles.emailLink}>
               haftarou.dev@gmail.com
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
            <span className={styles.location}>Remote / Rotterdam</span>
        </div>

         {/* SOCIALS CARD (1x1) */}
        <div className={`${styles.card} ${styles.socialCard}`}>
            <span className={styles.cardLabel}>Connect</span>
            <div className={styles.socialWrapper}>
                <a href="https://github.com/tdmdh" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <GitHubIcon />
                </a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <LinkedInIcon />
                </a>
            </div>
        </div>

      </div>
    </div>
  );
}
