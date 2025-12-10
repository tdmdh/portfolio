"use client"

import styles from "@/app/styles/Projects.module.css"
import Image from "next/image"

export type ProjectStatus = "done" | "in-progress" | "todo"

interface ProjectCardProps {
    index?: number
    title: string
    description: string
    status: ProjectStatus
    image?: string
    video?: string
    link?: string
    linkText?: string
}

const statusConfig = {
    done: { label: "Completed", className: styles.statusDone },
    "in-progress": { label: "In Progress", className: styles.statusInProgress },
    todo: { label: "Upcoming", className: styles.statusTodo },
}

export const ProjectCard = ({
    index,
    title,
    description,
    status,
    image,
    video,
    link,
    linkText = "Visit Project",
}: ProjectCardProps) => {
    const { label, className } = statusConfig[status]

    return (
        <div className={styles.card}>
            {index !== undefined && (
                <span className={styles.cardNumber}>
                    {String(index).padStart(2, "0")}
                </span>
            )}

            <div className={styles.cardMedia}>
                {video ? (
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.cardVideo}
                    />
                ) : image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={styles.cardImage}
                    />
                ) : (
                    <div className={styles.cardPlaceholder} />
                )}
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <span className={`${styles.status} ${className}`}>
                        {label}
                    </span>
                </div>

                <p className={styles.cardDescription}>{description}</p>

                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardButton}
                    >
                        {linkText}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    )
}