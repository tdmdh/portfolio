import styles from "@/app/school/styles/Assignments.module.css"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { GraduationCap, Target, Rocket, Flame, Lightbulb, Heart, Leaf, Smile } from "lucide-react";

export function AssignmentThree(){
    return(
      <Dialog>
      <DialogTrigger className={styles.dialogbtn}>View Assignment 3</DialogTrigger>
      <DialogContent>
        <DialogTitle className={styles.title} >
              Assignment 3
        </DialogTitle>
        <div className={styles.descriptionC}>

          <span className={styles.subtitle}>
            <Lightbulb size={18} style={{ marginRight: 6 }} />
            Audio Recording
          </span>

          <div className={styles.mediaContainer}>
            <audio 
              controls 
              className={styles.customAudioPlayer}
            >
              <source src="/audio/Oostdijk.m4a" type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <span className={styles.subtitle}>
            <Rocket size={18} style={{ marginRight: 6 }} />
            Visual Documentation
          </span>
          <span className={styles.description}>
            Here are some visual materials from my assignment work:
          </span>
          <div className={styles.imagesContainer}>
            <img 
              src="/assg/IMG_7338.jpg" 
              alt="Assignment documentation 1" 
              className={styles.assignmentImage}
            />
            <img 
              src="/assg/IMG_7344.jpg" 
              alt="Assignment documentation 2" 
              className={styles.assignmentImage}
            />
          </div>
        </div>
        <div className="mt-4">
        </div>
      </DialogContent>
    </Dialog>
    )
}