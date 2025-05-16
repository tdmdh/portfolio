import styles from "@/app/school/styles/Assignments.module.css"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { GraduationCap, Target, Rocket, Flame, Lightbulb, Heart, Leaf, Smile } from "lucide-react";

export function AssignmentTwo(){
    return(
      <Dialog>
      <DialogTrigger
       className={styles.dialogbtn}
       >View Assignment 2</DialogTrigger>
      <DialogContent>
        <DialogTitle className={styles.title} >
              Assignment 2
        </DialogTitle>
          <DialogDescription className={styles.descriptionC} >
              <span className={styles.subTitle}>
              <GraduationCap size={20} style={{ marginRight: '8px' }} />
              My Vision as a Software Developer
            </span>

            <span className={styles.subtitle}>
              <Target size={18} style={{ marginRight: '6px' }} />
              Short-Term Goals
            </span>
            <span className={styles.description}>
              <span>Learn to work with <strong>Next.js</strong>, <strong>JavaScript</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Go</strong></span>
              <span>Improve my <strong>teamwork</strong> and <strong>communication</strong> skills</span>
              <span>Grow personally by having <strong>more conversations</strong> with friends and classmates</span>
            </span>

            <span className={styles.subtitle}>
              <Rocket size={18} style={{ marginRight: '6px' }} />
              Looking Ahead
            </span>
            <span className={styles.description}>
              I don’t see myself working for a company right away. First, I want to take a <strong>gap year</strong> to start my own project: 
              an <strong>affordable educational AI tool</strong> for students. My goal is to help others learn better and grow through technology.
            </span>

            <span className={styles.subTitle}>
              <Flame size={20} style={{ marginRight: '8px' }} />
              What Drives Me
            </span>

            <span className={styles.subtitle}>
              <Lightbulb size={18} style={{ marginRight: '6px' }} />
              Inspiration
            </span>
            <span className={styles.description}>
              I’m driven by <strong>discipline</strong> and a strong <strong>desire to help people</strong> — especially students who need it most.
            </span>

            <span className={styles.subtitle}>
              <Heart size={18} style={{ marginRight: '6px' }} />
              Interests
            </span>
            <span className={styles.description}>
              <span>Making an <strong>impact</strong> on others</span>
              <span>Coming up with <strong>creative solutions</strong></span>
              <span>Solving challenges through <strong>code</strong></span>
            </span>

            <span className={styles.subTitle}>
              <Leaf size={20} style={{ marginRight: '8px' }} />
              Why This Path Suits Me
            </span>
            <span className={styles.description}>
              Software development gives me the freedom to build something meaningful. My passion for <strong>helping others</strong>, my 
              <strong>discipline</strong>, and my love for <strong>problem-solving</strong> come together in my dream: creating a platform that truly makes a difference for students.
            </span>
            </DialogDescription>
          <div className="mt-4">
        </div>
      </DialogContent>
    </Dialog>
    )
}