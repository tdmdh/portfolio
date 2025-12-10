"use client"

import styles from "@/app/styles/Projects.module.css"
import Image from "next/image"

export type ProjectStatus = "done" | "in-progress" | "todo"

interface ProjectCardProps {
    title: string
    description: string
    status: ProjectStatus
    image?: string
    video?: string
    link?: string
    linkText?: string
}

const statusConfig = {
    done: { label: "Done", className: styles.statusDone },
    "in-progress": { label: "In Progress", className: styles.statusInProgress },
    todo: { label: "Todo", className: styles.statusTodo },
}

export const ProjectCard = ({
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
                    </a>
                )}
            </div>
        </div>
    )
}