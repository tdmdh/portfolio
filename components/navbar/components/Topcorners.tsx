import { motion } from "framer-motion"
import styles from "@/app/styles/Navbar.module.css"

interface TopCornersProps {
  isBlurred: boolean
  position: "left" | "right"
}

export const TopCorners = ({ isBlurred, position }: TopCornersProps) => {
  const style = {
    transform: position === "left" ? "rotate(180deg)" : "rotate(360deg)",
  }

  return (
    <motion.svg
      className={position === "left" ? styles.topLeft : styles.topRight}
      width="30"
      height="30"
      viewBox="0 0 60 60"
      fill="#f2e9e4"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      animate={{
        y: isBlurred ? -20 : 0,
        opacity: isBlurred ? 0 : 1,
        ...(position === "left" && { rotate: 90 }),
      }}
      transition={{ duration: 0.4 }}
    >
      <g transform="scale(2)" clipPath="url(#clip0_310_2)">
        <path d="M30 0H0V30C0 16.431 16.431 0 30 0Z" fill="#f2e9e4" />
      </g>
      <defs>
        <clipPath id="clip0_310_2">
          <rect width="30" height="30" fill="#f2e9e4" />
        </clipPath>
      </defs>
    </motion.svg>
  )
}


