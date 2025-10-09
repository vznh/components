import React from 'react';
import { motion } from 'framer-motion';

// Utility function to combine class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface LEDIconProps {
  matrix: number[][]; // 5x5 matrix of 0s and 1s
  size?: number; // Size in pixels, controls both grid and dot size
  animated?: boolean;
  trigger?: boolean; // Triggers animation when true
}

export function LEDIcon({ matrix, size = 24, animated = false, trigger = false }: LEDIconProps) {
  // Validate matrix dimensions
  if (matrix.length !== 5 || matrix.some(row => row.length !== 5)) {
    throw new Error('LEDIcon matrix must be exactly 5x5');
  }

  // Calculate dot sizes and spacing with pixel-perfect rounding
  const activeDotSize = Math.round(size * 0.095); // Active dots (9.5% of total size)
  const dormantDotSize = Math.round(size * 0.06); // Much smaller dormant dots (8% of total size)
  const gap = Math.round(size * 0.001); // Condensed spacing between dots (0.1% of total size)
  
  return (
    <motion.div 
      className="relative group-hover:animate-none"
      style={{
        width: size,
        height: size,
      }}
      whileHover="hover"
      animate={trigger ? "hover" : "initial"}
      initial="initial"
    >
      {matrix.flat().map((value, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;
        
        // Calculate exact position for each dot with pixel-perfect rounding
        const cellSize = Math.round((size - gap * 4) / 6.5); // Available space divided by 5 cells minus gaps
        const x = Math.round(col * (cellSize + gap));
        const y = Math.round(row * (cellSize + gap));
        
        // Calculate diagonal distance from bottom-left (4,0) for stagger effect
        const diagonalDistance = (4 - row) + col;
        
        return (
          <div key={`${row}-${col}`}>
            {/* Dormant dot - always present */}
            <div
              className="absolute bg-gray-400 opacity-30"
              style={{
                left: x + (cellSize - dormantDotSize) / 2,
                top: y + (cellSize - dormantDotSize) / 2,
                width: dormantDotSize,
                height: dormantDotSize,
              }}
            />
            
            {/* Active dot - overlays dormant dot when value === 1 */}
            {value === 1 && (
              <motion.div
                className="absolute bg-[#1E1919]"
                style={{
                  left: x + (cellSize - activeDotSize) / 2,
                  top: y + (cellSize - activeDotSize) / 2,
                  width: activeDotSize,
                  height: activeDotSize,
                }}
                variants={{
                  initial: { opacity: 1 },
                  hover: { 
                    opacity: [0, 0, 1],
                    transition: { 
                      delay: diagonalDistance * 0.04,
                      duration: 0.8,
                      times: [0, 0.3, 1],
                      ease: "easeOut"
                    }
                  }
                }}
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
