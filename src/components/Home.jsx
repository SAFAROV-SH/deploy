import React, { useState } from 'react';
import '../css/Bonus.css'; // Assuming this file exists for other styling
import Header from './Header';

const Bonus = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  // Roll the dice
  const rollDice = () => {
    if (isRolling) return;
    
    // Set rolling state
    setIsRolling(true);
    
    // Generate random rotation (multiple of 360 plus some extra for realistic effect)
    const newRotation = rotationDeg + 1080 + Math.floor(Math.random() * 360);
    setRotationDeg(newRotation);
    
    // Generate random dice value between 1 and 6
    const randomValue = Math.floor(Math.random() * 6) + 1;
    
    // After animation completes
    setTimeout(() => {
      setDiceValue(randomValue);
      setIsRolling(false);
      // Show alert with dice value
      alert(`You rolled: ${randomValue}!`);
    }, 2000);
  };

  // Dots configuration for dice faces
  const renderDots = () => {
    switch(diceValue) {
      case 1:
        return <div className="dot center-dot"></div>;
      case 2:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot center-dot"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 4:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 5:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot center-dot"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      case 6:
        return (
          <>
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot middle-left"></div>
            <div className="dot middle-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dice-game-container">
      <Header />
      
      <div className="dice-game-content">
        <h1 className="game-title">Random Dice Game</h1>
        
        <div className="dice-wrapper">
          <div 
            className="dice"
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transition: isRolling ? 'transform 2s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'none'
            }}
          >
            <div className="dice-face">
              <div className="dots-container">
                {renderDots()}
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`roll-button ${isRolling ? 'rolling' : ''}`}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      
      <style jsx>{`
        /* Main container */
        .dice-game-container {
          background: linear-gradient(135deg, #8a2be2, #4169e1);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }
        
        /* Content wrapper */
        .dice-game-content {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }
        
        /* Game title */
        .game-title {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 40px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* Dice wrapper */
        .dice-wrapper {
          position: relative;
          margin-bottom: 60px;
          display: flex;
          justify-content: center;
        }
        
        /* Dice styling */
        .dice {
          display: inline-block;
          perspective: 1000px;
        }
        
        .dice-face {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 
                      inset 0 -8px 0 rgba(0, 0, 0, 0.1),
                      inset 0 8px 0 rgba(255, 255, 255, 0.8);
          padding: 20px;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        /* Dots container */
        .dots-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        /* Individual dot styling */
        .dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #333;
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3);
        }
        
        /* Dot positions */
        .center-dot {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .top-left {
          top: 15%;
          left: 15%;
        }
        
        .top-right {
          top: 15%;
          right: 15%;
        }
        
        .middle-left {
          top: 50%;
          left: 15%;
          transform: translateY(-50%);
        }
        
        .middle-right {
          top: 50%;
          right: 15%;
          transform: translateY(-50%);
        }
        
        .bottom-left {
          bottom: 15%;
          left: 15%;
        }
        
        .bottom-right {
          bottom: 15%;
          right: 15%;
        }
        
        /* Roll button */
        .roll-button {
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
          background: linear-gradient(to right, #f7b733, #fc4a1a);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(252, 74, 26, 0.4);
          transition: all 0.3s ease;
          outline: none;
        }
        
        .roll-button:hover:not(.rolling) {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(252, 74, 26, 0.5);
        }
        
        .roll-button:active:not(.rolling) {
          transform: translateY(-1px);
        }
        
        .roll-button.rolling {
          background: #999;
          cursor: not-allowed;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          color: #ddd;
        }
        
        /* Mobile responsiveness */
        @media screen and (max-width: 600px) {
          .game-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
          }
          
          .dice-face {
            width: 100px;
            height: 100px;
            padding: 15px;
          }
          
          .dot {
            width: 14px;
            height: 14px;
          }
          
          .roll-button {
            padding: 14px 28px;
            font-size: 1.1rem;
          }
        }
        
        @media screen and (max-width: 400px) {
          .game-title {
            font-size: 1.6rem;
            margin-bottom: 20px;
          }
          
          .dice-face {
            width: 90px;
            height: 90px;
            padding: 12px;
          }
          
          .dot {
            width: 12px;
            height: 12px;
          }
          
          .roll-button {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Bonus;