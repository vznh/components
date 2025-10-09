"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

export interface LEDIconProps extends React.HTMLAttributes<HTMLDivElement> {
  matrix?: number[][];
  size?: number;
  animated?: boolean;
  trigger?: boolean;
  activeColor?: string;
  dormantColor?: string;
  variants?: Variants;
  renderDot?: (params: {
    row: number;
    col: number;
    active: boolean;
    x: number;
    y: number;
    size: number;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function snap(value: number): number {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  return Math.round(value * dpr) / dpr;
}

export function LEDIcon({
  matrix = Array.from({ length: 5 }, () => Array(5).fill(0)),
  size = 24,
  animated = false,
  trigger = false,
  activeColor = "#1E1919",
  dormantColor = "#9CA3AF",
  variants,
  renderDot,
  className,
  style,
  ...props
}: LEDIconProps) {
  if (matrix.length !== 5 || matrix.some((r) => r.length !== 5))
    throw new Error("LEDIcon matrix must be exactly 5x5");

  const defaultVariants: Variants = {
    initial: { opacity: 1 },
    hover: {
      opacity: [0, 0, 1],
      transition: { 
        duration: 0.8,
        times: [0, 0.3, 1],
        ease: "easeOut"
      },
    },
  };

  const gapRatio = 0.001;
  const activeRatio = 0.095;
  const dormantRatio = 0.06;

  const gap = size * gapRatio;
  const cell = (size - gap * 4) / 5;
  const activeDot = size * activeRatio;
  const dormantDot = size * dormantRatio;

  return (
    <motion.div
      {...props}
      className={`relative ${className ?? ""}`}
      style={{ width: size, height: size, ...style }}
      whileHover={animated ? "hover" : undefined}
      animate={trigger ? "hover" : "initial"}
      initial="initial"
    >
      {matrix.flat().map((v, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const x = snap(col * (cell + gap));
        const y = snap(row * (cell + gap));
        const active = v === 1;

        if (renderDot)
          return renderDot({
            row,
            col,
            active,
            x,
            y,
            size: activeDot,
          });

        return (
          <React.Fragment key={`${row}-${col}`}>
            <div
              className="absolute opacity-30"
              style={{
                transform: `translate3d(${snap(
                  x + (cell - dormantDot) / 2
                )}px, ${snap(y + (cell - dormantDot) / 2)}px, 0)`,
                width: snap(dormantDot),
                height: snap(dormantDot),
                backgroundColor: dormantColor,
              }}
            />
            
             {active && (
               <motion.div
                 className="absolute"
                 style={{
                   transform: `translate3d(${snap(
                     x + (cell - activeDot) / 2
                   )}px, ${snap(y + (cell - activeDot) / 2)}px, 0)`,
                   width: snap(activeDot),
                   height: snap(activeDot),
                   backgroundColor: activeColor,
                 }}
                 variants={variants ?? {
                   ...defaultVariants,
                   hover: {
                     ...defaultVariants.hover,
                     transition: {
                       ...defaultVariants.hover.transition,
                       delay: ((4 - row) + col) * 0.04,
                     }
                   }
                 }}
               />
             )}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}
