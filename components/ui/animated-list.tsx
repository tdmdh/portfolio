"use client";

import { cn } from "@/app/utils/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -20, opacity: 0, scale: 0.9 }} 
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
      layout
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}



export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  visibleCount?: number;

}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1500,
    visibleCount = 5,
    ...props
  }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      const shown = childrenArray.slice(0, index + 1);
      return shown.slice(-visibleCount).reverse(); 
    }, [index, childrenArray, visibleCount]);

    return (
      <div className={cn("flex flex-col items-center gap-4", className)} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);



AnimatedList.displayName = "AnimatedList";
