import React from 'react';

// Utility function to combine class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface LEDIconProps {
  matrix: number[][]; // 5x5 matrix of 0s and 1s
  size?: number; // Size in pixels, controls both grid and dot size
  animated?: boolean;
}

export function LEDIcon({ matrix, size = 24, animated = false }: LEDIconProps) {
  // Validate matrix dimensions
  if (matrix.length !== 5 || matrix.some(row => row.length !== 5)) {
    throw new Error('LEDIcon matrix must be exactly 5x5');
  }

  // Calculate dot sizes and spacing with pixel-perfect rounding
  const activeDotSize = Math.round(size * 0.095); // Active dots (9.5% of total size)
  const dormantDotSize = Math.round(size * 0.06); // Much smaller dormant dots (8% of total size)
  const gap = Math.round(size * 0.001); // Condensed spacing between dots (0.1% of total size)
  
  return (
    <div 
      className={cn(
        "relative",
        animated && "transition-all duration-300 ease-in-out"
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      {matrix.flat().map((value, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;
        
        // Calculate exact position for each dot with pixel-perfect rounding
        const cellSize = Math.round((size - gap * 4) / 6); // Available space divided by 5 cells minus gaps
        const x = Math.round(col * (cellSize + gap));
        const y = Math.round(row * (cellSize + gap));
        
        return (
          <div key={`${row}-${col}`}>
            {/* Dormant dot - always present */}
            <div
              className={cn(
                "absolute bg-gray-400 opacity-30",
                animated && "transition-all duration-200 ease-in-out"
              )}
              style={{
                left: x + (cellSize - dormantDotSize) / 2,
                top: y + (cellSize - dormantDotSize) / 2,
                width: dormantDotSize,
                height: dormantDotSize,
              }}
            />
            
            {/* Active dot - overlays dormant dot when value === 1 */}
            {value === 1 && (
              <div
                className={cn(
                  "absolute bg-[#1E1919]",
                  animated && "transition-all duration-200 ease-in-out"
                )}
                style={{
                  left: x + (cellSize - activeDotSize) / 2,
                  top: y + (cellSize - activeDotSize) / 2,
                  width: activeDotSize,
                  height: activeDotSize,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
