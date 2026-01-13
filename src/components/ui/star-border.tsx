"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type StarBorderProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string
  speed?: React.CSSProperties["animationDuration"]
  thickness?: number
}

export function StarBorder({
  className,
  children,
  color = "var(--primary-blue)",
  speed = "6s",
  thickness = 1,
  style,
  ...props
}: StarBorderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        "relative inline-flex overflow-hidden rounded-xl",
        "[transform:translateZ(0)] will-change-transform",
        className
      )}
      {...props}
      style={{
        padding: thickness,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0",
          "animate-star-movement-bottom",
          reduceMotion && "animate-none"
        )}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0",
          "animate-star-movement-top",
          reduceMotion && "animate-none"
        )}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      <div className="relative z-10 rounded-[inherit]">{children}</div>
    </div>
  )
}

export default StarBorder

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }
