"use client";

import { cn } from "@/app/utils/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import styles from "@/app/styles/Notification.module.css";
import React from "react";
import { useEffect, useState } from "react";


interface NotificationProps {
  name: string
  description: string
  icon: string
  time: string
  color: string
  isUnread?: boolean
  category?: string
}

let notifications = [
  {
    name: "Embrace Growth",
    description: "Life is not about waiting for the storm to pass, it's about learning to dance in the rain.",
    time: "15m ago",
    icon: "🌱",
    color: "var(--primary-color)",
  },
  {
    name: "Stay Positive",
    description: "The only way to do great work is to love what you do.",
    time: "10m ago",
    icon: "✨",
    color: "var(--secondary-color)",
  },
  {
    name: "Dream Big",
    description: "All our dreams can come true if we have the courage to pursue them.",
    time: "5m ago",
    icon: "🌟",
    color: "var(--tertiary-color)",
  },
  {
    name: "Keep Going",
    description: "The future belongs to those who believe in the beauty of their dreams.",
    time: "2m ago",
    icon: "🚀",
    color: "var(--quaternary-color)",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({
  name,
  description,
  icon,
  time,
  color,
  isUnread = false,
  category = "Reminder",
}: NotificationProps) => {
  return (
    <div className={styles.notificationCard}>
      {isUnread && <div className={styles.unreadDot} />}
      <div className={styles.notificationHeader}>
        <div className={styles.iconCircle} style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className={styles.notificationContent}>
          <div className={styles.notificationTitleRow}>
            <span className={styles.titleText}>{name}</span>
            <span className={styles.badge}>{category}</span>
          </div>
          <span className={styles.timeText} >
            {time}
          </span>
          <p className={styles.description}>{description}</p>
          <button className={styles.dismissButton}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}


export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[500px] w-full p-2 overflow-hidden flex flex-col", className)}>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--quinary-color)] dark:from-[var(--primary-color)]" />
    </div>
  );
}
