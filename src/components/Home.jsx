import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import '../css/Bonus.css'; // Make sure to create this CSS file

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
    <div className="dice-game-container">
      {/* Mobile-friendly header */}
      <div className="game-header">
        <h1>Dice o'yini</h1>
      </div>
      
      <div className="game-content">
        <div className="game-main">
          <h1>Omadingizni sinang!</h1>
          
          <div className="dice-container">
            <motion.div 
              className="dice"
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
            className="roll-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={rollDice}
            disabled={isRolling}
          >
            {isRolling ? "Aylanmoqda..." : "Aylantirish"}
          </motion.button>
          
          {rollCount > 0 && (
            <p className="roll-count">
              O'yinlar soni: {rollCount}
            </p>
          )}
        </div>
        
        <div className="game-rules">
          <h2>O'yin qoidalari</h2>
          <p>Zar tashlash uchun "Aylantirish" tugmasini bosing va omadingizni sinab ko'ring!</p>
        </div>
      </div>
    </div>
  );
};

export default Bonus;