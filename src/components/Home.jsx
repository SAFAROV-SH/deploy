import { useState, useRef, useEffect } from 'react';
import Header from './Header'

export default function PrizeWheel() {
  // Define the prizes on the wheel
  const prizes = [
    { value: '$10', color: '#3b82f6' },
    { value: 'ZERO', color: '#38bdf8' },
    { value: '$2', color: '#7dd3fc' },
    { value: '$50', color: '#0ea5e9' },
    { value: '$1', color: '#2563eb' },
    { value: '$5', color: '#60a5fa' },
    { value: '$20', color: '#93c5fd' },
    { value: 'JACKPOT', color: '#a855f7' },
    { value: '$175', color: '#d946ef' },
    { value: '$100', color: '#ec4899' },
    { value: '$15', color: '#f472b6' },
    { value: '$200', color: '#f43f5e' },
  ];
  
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [spinButtonDisabled, setSpinButtonDisabled] = useState(false);
  const spinTimeRef = useRef(null);
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinButtonDisabled(true);
    setWinner(null);
    setSpinning(true);
    
    // Random number of complete rotations plus a random position
    const spinTime = 5000 + Math.random() * 3000; // 5-8 seconds
    const totalRotation = rotation + (3600 + Math.floor(Math.random() * 360));
    
    spinTimeRef.current = setTimeout(() => {
      setSpinning(false);
      
      // Calculate winner based on final position
      const degreePerSegment = 360 / prizes.length;
      const normalizedRotation = totalRotation % 360;
      const winningIndex = prizes.length - 1 - Math.floor(normalizedRotation / degreePerSegment);
      const adjustedIndex = winningIndex % prizes.length;
      
      setWinner(prizes[adjustedIndex].value);
      setSpinButtonDisabled(false);
    }, spinTime);
    
    setRotation(totalRotation);
  };
  
  useEffect(() => {
    return () => {
      if (spinTimeRef.current) {
        clearTimeout(spinTimeRef.current);
      }
    };
  }, []);

  // Calculate segments for SVG rendering
  const segments = prizes.map((prize, index) => {
    const angle = 360 / prizes.length;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;
    
    // Convert angles to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    // Calculate points
    const x1 = 150 + 150 * Math.cos(startRad);
    const y1 = 150 + 150 * Math.sin(startRad);
    const x2 = 150 + 150 * Math.cos(endRad);
    const y2 = 150 + 150 * Math.sin(endRad);
    
    // Path for segment
    const largeArcFlag = angle > 180 ? 1 : 0;
    const path = `M 150 150 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    // Calculate text position (halfway between center and edge)
    const textAngle = startAngle + angle / 2;
    const textRad = (textAngle - 90) * Math.PI / 180;
    const textX = 150 + 90 * Math.cos(textRad);
    const textY = 150 + 90 * Math.sin(textRad);
    
    return {
      path,
      color: prize.color,
      value: prize.value,
      textX,
      textY,
      textAngle
    };
  });

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-xl">
      <div className="relative w-80 h-80">
        {/* Wheel Container with Shadow */}
        <div className="absolute inset-0 rounded-full shadow-2xl flex items-center justify-center">
          {/* SVG Wheel */}
          <svg 
            width="300" 
            height="300" 
            viewBox="0 0 300 300" 
            className="w-full h-full transition-transform duration-5000"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? `transform ${spinning ? '5s' : '0s'} cubic-bezier(0.2, 0.8, 0.3, 1)` : 'none'
            }}
          >
            {/* Golden Circle Border */}
            <circle cx="150" cy="150" r="149" fill="none" stroke="#F1BE48" strokeWidth="8" />
            
            {/* Wheel Segments */}
            {segments.map((segment, index) => (
              <g key={index}>
                <path 
                  d={segment.path} 
                  fill={segment.color}
                  stroke="#ffffff" 
                  strokeWidth="2"
                />
                <text
                  x={segment.textX}
                  y={segment.textY}
                  fill="white"
                  fontWeight="bold"
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${90 + segment.textAngle}, ${segment.textX}, ${segment.textY})`}
                  style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
                >
                  {segment.value}
                </text>
              </g>
            ))}
            
            {/* Central Circle */}
            <circle cx="150" cy="150" r="20" fill="#F1BE48" stroke="#E9A800" strokeWidth="4" />
          </svg>
        </div>
        
        {/* Outer blue border */}
        <div className="absolute inset-0 rounded-full border-8 border-blue-600 pointer-events-none"></div>
        
        {/* Arrow/Marker */}
        <div className="absolute w-10 h-10 bg-yellow-500 rotate-45 transform -translate-x-1/2 left-1/2 -top-2 z-10 border-2 border-yellow-600 shadow-md"></div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={spinWheel}
          disabled={spinButtonDisabled}
          className={`px-8 py-4 rounded-full text-xl font-bold text-white ${spinButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors shadow-lg`}
        >
          {spinning ? 'Spinning...' : 'SPIN'}
        </button>
        
        {winner && (
          <div className="mt-4 p-3 bg-white rounded-lg shadow-md border-2 border-blue-300">
            <div className="text-lg font-semibold text-gray-700">You won:</div>
            <div className="text-3xl mt-1 font-bold text-blue-600">{winner}</div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}