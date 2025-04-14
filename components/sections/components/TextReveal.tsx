"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useMemo,
  useEffect
} from "react";

import styles from "@/app/styles/About.module.css"; 

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  trailColor?: string;
  highlightColor?: string;
  speed?: number;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  trailColor = "textTrail",
  highlightColor = "textHighlight",
  speed = 1,
  ...props
}) => {




  const { scrollYProgress } = useScroll();

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const units = useMemo(() => children.split(" "), [children]);



  return (
    <div className={styles.revealContainer}>
      <div className={styles.sticky}>
        <div className={styles.textContainer}>
          {units.map((unit, i) => {
            const start = (i * speed) / units.length;
            const end = start + speed / units.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                trailColor={trailColor}
                highlightColor={highlightColor}
              >
                {unit}
              </Word>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  trailColor: string;
  highlightColor: string;
}

const Word: FC<WordProps> = ({
  children,
  progress,
  range,
  trailColor,
  highlightColor,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <span className={styles.wordWrapper}>
      <span className={`${styles.trail} ${trailColor}`}>{children}</span>
      <motion.span
        style={{ opacity, y }}
        className={`${styles.word} ${highlightColor}`}
      >
        {children}
      </motion.span>
    </span>
  );
};
