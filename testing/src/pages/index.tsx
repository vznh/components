import { LEDIcon } from "../components/LEDIcon";
import { useState } from "react";

// Example patterns
const aboutPattern = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0]
];

const researchPattern = [
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0]
];

const careersPattern = [
  [1, 1, 0, 0, 1],
  [0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 0],
  [1, 0, 0, 1, 1]
];

export default function Home() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center space-x-12">
        <div 
          className="flex items-center space-x-1 cursor-pointer"
          onMouseEnter={() => setHoveredItem('about')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={aboutPattern} trigger={hoveredItem === 'about'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">About</span>
        </div>
        
        <div 
          className="flex items-center space-x-1 cursor-pointer"
          onMouseEnter={() => setHoveredItem('research')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={researchPattern} trigger={hoveredItem === 'research'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">Research</span>
        </div>
        
        <div 
          className="flex items-center space-x-1 cursor-pointer"
          onMouseEnter={() => setHoveredItem('careers')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={careersPattern} trigger={hoveredItem === 'careers'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">Careers</span>
        </div>
      </div>
    </div>
  );
}