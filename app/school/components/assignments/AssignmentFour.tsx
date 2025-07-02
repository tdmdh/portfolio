import styles from "@/app/school/styles/Assignments.module.css"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { GraduationCap, Target, Rocket, Flame, Lightbulb, Heart, Leaf, Smile } from "lucide-react";

export function AssignmentFour(){
    return(
      <Dialog>
      <DialogTrigger className={styles.dialogbtn}>View Assignment 4</DialogTrigger>
      <DialogContent>
        <DialogTitle className={styles.title} >
              Assignment 4
        </DialogTitle>
        <div className={styles.descriptionC}>
          <span className={styles.subTitle}>
            <GraduationCap size={20} style={{ marginRight: 8 }} />
            Assignment 4: Project Reflection
          </span>
          
          <span className={styles.subtitle}>
            <Smile size={18} style={{ marginRight: 6 }} />
            What Went Well?
          </span>
          <span className={styles.description}>
            <strong>Which parts of the startup assignment went smoothly?</strong><br />
            All parts went smoothly in the beginning.
          </span>
          <span className={styles.description}>
            <strong>What are you proud of?</strong><br />
            Everything I have created.
          </span>

          <span className={styles.subtitle}>
            <Target size={18} style={{ marginRight: 6 }} />
            What Did You Find Challenging?
          </span>
          <span className={styles.description}>
            <strong>Where did you need help or what would you approach differently?</strong><br />
            In the beginning it was quite difficult because I'm new to JS, but after a while everything went well.
          </span>
          <span className={styles.description}>
            <strong>What do you want to learn to get better at this?</strong><br />
            I'm learning TypeScript, and I plan to use only TS for everything I create.
          </span>

          <span className={styles.subtitle}>
            <Lightbulb size={18} style={{ marginRight: 6 }} />
            What Have You Learned?
          </span>
          <span className={styles.description}>
            <strong>What did you discover about yourself and your skills?</strong><br />
            That I understand things quite quickly.
          </span>
          <span className={styles.description}>
            <strong>What will you take to future projects?</strong><br />
            <strong>Communication</strong> - especially when working in a team.
          </span>

          <span className={styles.subtitle}>
            <Heart size={18} style={{ marginRight: 6 }} />
            Feedback Received
          </span>
          <span className={styles.description}>
            <strong>What did they consider your strongest point?</strong><br />
            A serious attitude towards education, knowing what I'm doing.
          </span>
          <span className={styles.description}>
            <strong>Where do they see opportunities for improvement?</strong><br />
            Taking more opportunities.
          </span>
        </div>
        <div className="mt-4">
        </div>
      </DialogContent>
    </Dialog>
    )
}