import { motion } from "framer-motion"
import React from "react"

interface TopCornersProps {
  isBlurred?: boolean
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  rotation?: number
  scale?: number
  translateX?: number
  translateY?: number
  className?: string
  color?: string
  size?: number
  style?: React.CSSProperties
}

export const TopCorners = ({
  isBlurred = false,
  position = { top: "0", right: "0" },
  rotation = 0,
  scale = 1,
  translateX = 0,
  translateY = 0,
  className = "",
  color = "#f2e9e4",
  size = 30,
  style = {},
}: TopCornersProps) => {
  const dynamicStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    ...position,
    transform: `rotate(${rotation}deg) scale(${scale}) translate(${translateX}px, ${translateY}px)`,
    ...style,
  }

  const clipId = React.useId() // unique per render

  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      style={dynamicStyle}
      animate={{
        y: isBlurred ? -20 : 0,
        opacity: isBlurred ? 0 : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      <g transform="scale(2,1.5)" clipPath={`url(#${clipId})`}>
        <path d="M30 0H0V30C0 16.431 16.431 0 30 0Z" fill={color} />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="30" height="30" fill={color} />
        </clipPath>
      </defs>
    </motion.svg>
  )
}
