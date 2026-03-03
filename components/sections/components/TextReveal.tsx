"use client";

import { useRef, useEffect, FC, ReactNode, ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/app/utils/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  useEffect(() => {
    if (!targetRef.current || !wordsRef.current) return;
    const wordSpans = wordsRef.current.querySelectorAll("[data-word]");

    const ctx = gsap.context(() => {
      wordSpans.forEach((span, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        gsap.fromTo(span,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: targetRef.current!,
              start: `top+=${start * 100}% top`,
              end: `top+=${end * 100}% top`,
              scrub: true,
            },
          }
        );
      });
    }, targetRef);

    return () => ctx.revert();
  }, [words.length]);

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <span
          ref={wordsRef}
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => (
            <span key={i} className="xl:lg-3 relative mx-1 lg:mx-1.5">
              <span className="absolute opacity-30">{word}</span>
              <span
                data-word
                className={"text-black dark:text-white"}
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};
