import React, { useRef, useEffect } from 'react';
import styles from "@/app/styles/ContactCard.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroTitle from './HeroTitle';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const card = containerRef.current!.querySelector(`.${styles.contactCard}`);
            const image = containerRef.current!.querySelector(`.${styles.contactImage}`);

            gsap.fromTo(containerRef.current!, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current!, start: "top 80%", once: true }
                }
            );

            if (card) {
                gsap.fromTo(card, 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
                        scrollTrigger: { trigger: containerRef.current!, start: "top 80%", once: true }
                    }
                );
            }

            if (image) {
                gsap.fromTo(image, 
                    { opacity: 0, x: 100 },
                    { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: "power2.out",
                        scrollTrigger: { trigger: containerRef.current!, start: "top 80%", once: true }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.contactCardContainer}
            style={{ opacity: 0 }}
        >
            <div 
                className={styles.contactCard}
            >
                <HeroTitle title="Contact me" animationDelay={0.1}
                    animationType="letter"
                    trigger="inView"
                    animationDuration={5} /> 
                    <HeroTitle subtitle="Let's connect and collaborate!" 
                    animationDelay={0.1}
                    animationType="letter"
                    trigger="inView"
                    animationDuration={5}
                    className='text-xl sm:text-2xl md:text-3xl pb-6 sm:pb-8 md:pb-12'
                    />
                        <a href="mailto:haftarou.dev@gmail.com" title='email' className={styles.contactButton}>
                            Email Me
                        </a>
            </div>
            <div 
                className={styles.contactImage}
            >
                <img
                    src="/photo/me.CR3" 
                    alt="Contact"
                    className={styles.contactImage}
                />
            </div>
        </div>
    )};