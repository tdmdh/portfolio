import { motion } from "framer-motion"
import React from "react"

interface TopCornersProps {
  isBlurred: boolean
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  rotation?: number
  className?: string
  color?: string
  size?: number
}

export const TopCorners = ({
  isBlurred,
  position = { top: "0", right: "0" },
  rotation = 0,
  className = "",
  color = "#f2e9e4",
  size = 30,
}: TopCornersProps) => {
  const dynamicStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    ...position,
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={dynamicStyle}
    >
      <g transform="scale(2,1.5)" clipPath="url(#clip0)">
        <path d="M30 0H0V30C0 16.431 16.431 0 30 0Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="30" height="30" fill={color} />
        </clipPath>
      </defs>
    </motion.svg>
  )
}
