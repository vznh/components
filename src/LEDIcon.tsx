// LEDIcon
// A customizable LED grid icon component with optional hover animations.

// Props:
// - matrix: number[][] (required) - A 5x5 matrix of 0s and 1s representing the LED pattern.
// - size?: number - The size of the icon in pixels. Default is 24.
// - animated?: boolean - Whether to enable hover animation. Default is false.
//
// Example
// import { LEDIcon } from '@vznh/led';
//
// const pattern = [
//   [0, 1, 1, 1, 0],
//   [1, 0, 0, 0, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 0, 0, 1],
//   [0, 1, 1, 1, 0]
// ];
//
// <LEDIcon matrix={pattern} size={24} animated />

import React from 'react';
import { motion } from 'framer-motion';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface LEDIconProps {
  matrix: number[][]; 
  size?: number; 
  animated?: boolean;
}

const LEDIcon: React.FC<LEDIconProps> = ({ matrix, size = 24, animated = false }) => {
  
  // This validates your matrix dimensions, and will throw if it's incompatible
  if (
    matrix.length !== 5 || 
    matrix.some(row => row.length !== 5)
  ) {
    return <></>;
  }

  const activeDotSize = Math.round(size * 0.095); 
  const dormantDotSize = Math.round(size * 0.06); 
  const gap = Math.round(size * 0.001); 
  
  return (
    <motion.div 
      className="relative"
      style={{
        width: size,
        height: size,
      }}
      whileHover="hover"
      initial="initial"
    >
      {matrix.flat().map((value, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;
        
        const cellSize = Math.round((size - gap * 4) / 6.5);
        const x = Math.round(col * (cellSize + gap));
        const y = Math.round(row * (cellSize + gap));
        
        const diagonalDistance = (4 - row) + col;
        
        return (
          <div key={`${row}-${col}`}>
            <div
              className="absolute bg-gray-400 opacity-30"
              style={{
                left: x + (cellSize - dormantDotSize) / 2,
                top: y + (cellSize - dormantDotSize) / 2,
                width: dormantDotSize,
                height: dormantDotSize,
              }}
            />
            
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
                      times: [0, 0.25, 1],
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

export { LEDIcon };