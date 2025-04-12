import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const Bonus = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  
  const diceIcons = [
    <Dice1 size={64} />,
    <Dice2 size={64} />,
    <Dice3 size={64} />,
    <Dice4 size={64} />,
    <Dice5 size={64} />,
    <Dice6 size={64} />
  ];
  
  // Function to roll the dice
  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setRollCount(prev => prev + 1);
    
    // Create animation effect by changing dice values quickly
    let rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Stop the rolling after 2 seconds
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);
      
      // Show alert with result
      setTimeout(() => {
        alert(`Sizning natijangiz: ${finalValue}`);
      }, 500);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-600 text-white flex flex-col">
      {/* Mobile-friendly header */}
      <div className="bg-blue-900 bg-opacity-70 py-3 px-4 shadow-md">
        <h1 className="text-xl font-bold">Dice o'yini</h1>
      </div>
      
      <div className="flex-1 flex flex-col justify-between px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">Omadingizni sinang!</h1>
          
          <div className="flex justify-center mb-8">
            <motion.div 
              className="bg-white text-blue-900 rounded-lg p-6 shadow-xl"
              animate={{ 
                rotate: isRolling ? [0, 360, 720, 1080] : 0,
                scale: isRolling ? [1, 1.2, 0.8, 1.1, 0.9, 1] : 1
              }}
              transition={{ duration: isRolling ? 2 : 0.5 }}
            >
              {diceIcons[diceValue - 1]}
            </motion.div>
          </div>
          
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={rollDice}
            disabled={isRolling}
          >
            {isRolling ? "Aylanmoqda..." : "Aylantirish"}
          </motion.button>
          
          {rollCount > 0 && (
            <p className="mt-4 text-sm opacity-80">
              O'yinlar soni: {rollCount}
            </p>
          )}
        </div>
        
        <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mt-6">
          <h2 className="text-lg font-bold mb-2">O'yin qoidalari</h2>
          <p className="text-sm">Zar tashlash uchun "Aylantirish" tugmasini bosing va omadingizni sinab ko'ring!</p>
        </div>
      </div>
    </div>
  );
};

export default Bonus;