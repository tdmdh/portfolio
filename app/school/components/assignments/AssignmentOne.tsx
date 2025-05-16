import styles from "@/app/school/styles/Assignments.module.css"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { GraduationCap, Target, Rocket, Flame, Lightbulb, Heart, Leaf, Smile } from "lucide-react";

export function AssignmentOne(){
    return(
      <Dialog>
      <DialogTrigger className={styles.dialogbtn}>View Assignment 1</DialogTrigger>
      <DialogContent>
        <DialogTitle className={styles.title} >
              Assignment 1
        </DialogTitle>
        <DialogDescription className={styles.descriptionC} >
        <span className={styles.subtitle}>
            <Smile size={20} style={{ marginRight: 8 }} />
            More about me
          </span>
          <span className={styles.description}>
            I'm Mohammed Haftarou, I'm 17 years old and I'm a creative software developer student. I'm currently studying software development at Grafish Lyceum. I have experience in developing software applications using various programming languages and tools. I'm always looking for new opportunities to learn and grow as a software developer. I'm excited to see what the future holds for me in the world of software development.
          </span>

          <span className={styles.subtitle}>
            <Flame size={20} style={{ marginRight: 8 }} />
            Motivation
          </span>
          <span className={styles.description}>
            My motivation comes from my passion for technology and my desire to create innovative solutions to real-world problems. I love the challenge of solving complex problems and the satisfaction of seeing my work come to life. I'm always looking for new ways to improve my skills and expand my knowledge in the field of software development. I'm excited to see where my journey as a software developer will take me.
          </span>

          <span className={styles.subtitle}>
            <Target size={20} style={{ marginRight: 8 }} />
            My Goals
          </span>
          <span className={styles.description}>
            My goal is to become a professional software developer and work on exciting projects that challenge me to grow and learn new skills. After improving my skills, I'll start my own company to be financially free.
          </span>
        </DialogDescription>
        <div className="mt-4">
        </div>
      </DialogContent>
    </Dialog>
    )
}