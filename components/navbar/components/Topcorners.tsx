import { motion } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"

interface TopCornersProps {
  isBlurred?: boolean
  position: "left" | "right"
  className?: string
  rotate?: number
  scale?: number
  translateX?: number
  translateY?: number
  fill?: string
}

export const TopCorners = ({
  isBlurred,
  position,
  className,
  rotate,
  scale = 1,
  translateX = 0,
  translateY = 0,
  fill = "#f2e9e4",
}: TopCornersProps) => {
  const fallbackRotation = position === "left" ? 180 : 0

  return (
    <motion.svg
      className={`${position === "left" ? styles.topLeft : styles.topRight} ${className || ""}`}
      width="30"
      height="30"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotate ?? fallbackRotation}deg) scale(${scale}) translate(${translateX}px, ${translateY}px)`,
      }}
      animate={{
        y: isBlurred ? -20 : 0,
        opacity: isBlurred ? 0 : 1,
        rotate: rotate ?? (position === "left" ? 90 : 0),
      }}
      transition={{ duration: 0.4 }}
    >
      <g transform="scale(2)" clipPath="url(#clip0_310_2)">
        <path d="M30 0H0V30C0 16.431 16.431 0 30 0Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_310_2">
          <rect width="30" height="30" fill={fill} />
        </clipPath>
      </defs>
    </motion.svg>
  )
}
