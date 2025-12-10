import { motion } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"

interface TopCornersProps {
  isBlurred?: boolean
  position?: "left" | "right"
  className?: string
  rotate?: number
  scale?: number
  translateX?: number
  translateY?: number
  fill?: string
  isDarkSection?: boolean
}

export const TopCorners = ({
  isBlurred,
  position,
  className,
  rotate,
  scale = 1,
  translateX = 0,
  translateY = 0,
  isDarkSection = true,
}: TopCornersProps) => {
  const fallbackRotation = position === "left" ? 180 : 0

  const dynamicFill = isDarkSection ? "var(--quinary-color)" : "var(--secondary-color)"

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
        scale: isBlurred ? 0 : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      <g transform="scale(2)" clipPath="url(#clip0_310_2)">
        <motion.path
          d="M30 0H0V30C0 16.431 16.431 0 30 0Z"
          animate={{ fill: dynamicFill }}
          transition={{ duration: 0.4 }}
        />
      </g>
      <defs>
        <clipPath id="clip0_310_2">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  )
}
