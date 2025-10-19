import { LEDIcon } from "@/components/led-icon";
import { Reactive } from "@/components/reactive";
import { useState, useEffect } from "react";

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
  const [testValue, setTestValue] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestValue(Math.random() * 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col gap-y-12 items-center justify-center">
      <div className="flex items-center space-x-12">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setHoveredItem('about')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={aboutPattern} trigger={hoveredItem === 'about'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900">About</span>
        </div>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setHoveredItem('research')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={researchPattern} trigger={hoveredItem === 'research'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900">Research</span>
        </div>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setHoveredItem('careers')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LEDIcon matrix={careersPattern} trigger={hoveredItem === 'careers'} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900">Careers</span>
        </div>
      </div>

      <div className="flex items-center space-x-12">
        <Reactive value={testValue} className="text-4xl tracking-tight"/>
      </div>
    </div>
  );
}
