"use client"

import styles from "@/app/styles/Projects.module.css"
import Image from "next/image"
import { useRef, useEffect } from "react"

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
    isExpanded?: boolean
    onClick?: () => void
    expandedPosition?: { x: number; y: number; width: number; height: number }
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
    isExpanded = false,
    onClick,
    expandedPosition,
}: ProjectCardProps) => {
    const { label, className } = statusConfig[status]
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isExpanded && cardRef.current && expandedPosition) {
            const card = cardRef.current
            card.style.setProperty('--expand-x', `${expandedPosition.x}px`)
            card.style.setProperty('--expand-y', `${expandedPosition.y}px`)
            card.style.setProperty('--expand-width', `${expandedPosition.width}px`)
            card.style.setProperty('--expand-height', `${expandedPosition.height}px`)
        }
    }, [isExpanded, expandedPosition])

    return (
        <div
            ref={cardRef}
            className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick?.()
                }
            }}
        >
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

                {isExpanded && (
                    <div className={styles.expandedContent}>
                        <div className={styles.expandedDetails}>
                            <h4>About this project</h4>
                            <p>{description}</p>
                        </div>
                    </div>
                )}

                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardButton}
                        onClick={(e) => e.stopPropagation()}
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

            {isExpanded && (
                <div className={styles.expandedHint}>
                    <span>Scroll to navigate</span>
                    <span className={styles.expandedDivider}>•</span>
                    <span>Click to close</span>
                </div>
            )}
        </div>
    )
}