import { LEDIcon } from "../components/LEDIcon";

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
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-1">
          <LEDIcon matrix={aboutPattern} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">About</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <LEDIcon matrix={researchPattern} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">Research</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <LEDIcon matrix={careersPattern} />
          <span className="text-lg tracking-whyte font-whyte text-gray-900 mb-1">Careers</span>
        </div>
      </div>
    </div>
  );
}