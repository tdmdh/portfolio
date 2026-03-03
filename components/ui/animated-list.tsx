"use client";

import { cn } from "@/app/utils/lib/utils";
import { gsap } from "gsap";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, []);

  return (
    <div
      ref={itemRef}
      className="mx-auto w-full"
      style={{ opacity: 0 }}
    >
      {children}
    </div>
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
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </div>
    );
  }
);



AnimatedList.displayName = "AnimatedList";
