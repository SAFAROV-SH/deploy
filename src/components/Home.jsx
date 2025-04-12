import React, { useState } from 'react';
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
    <>
    <Header />
    <div className="dice-game-container">
      <div className="game-header">
        <h1 className="app-title">Dice Game</h1>
      </div>
      
      <div className="dice-game-content">
        <h2 className="game-title">Random Dice Game</h2>
        
        {/* Removed the extra wrapper div around dice */}
        <div 
          className="dice"
          style={{
            transform: `rotate(${rotationDeg}deg)`,
            transition: isRolling ? 'transform 2s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'none'
          }}
        >
          {renderDots()}
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
          background: #ffffff;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }
        
        /* Header styling */
        .game-header {
          width: 100%;
          padding: 15px 0;
          margin-bottom: 30px;
          text-align: center;
          background-color: #f0f0f0;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .app-title {
          margin: 0;
          color: #333;
          font-size: 1.8rem;
        }
        
        /* Content wrapper */
        .dice-game-content {
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        /* Game title */
        .game-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 40px;
          color: #333;
        }
        
        /* Dice styling - simplified, removed extra containers */
        .dice {
          background-color: #e74c3c;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 120px;
          height: 120px;
          display: inline-block;
          position: relative;
          margin-bottom: 60px;
          perspective: 1000px;
        }
        
        /* Individual dot styling */
        .dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: white;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
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
          background: #3498db;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
          transition: all 0.3s ease;
          outline: none;
        }
        
        .roll-button:hover:not(.rolling) {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(52, 152, 219, 0.5);
          background: #2980b9;
        }
        
        .roll-button:active:not(.rolling) {
          transform: translateY(-1px);
        }
        
        .roll-button.rolling {
          background: #95a5a6;
          cursor: not-allowed;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          color: #ddd;
        }
        
        /* Mobile responsiveness */
        @media screen and (max-width: 600px) {
          .app-title {
            font-size: 1.6rem;
          }
          
          .game-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
          }
          
          .dice {
            width: 100px;
            height: 100px;
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
          .app-title {
            font-size: 1.4rem;
          }
          
          .game-title {
            font-size: 1.6rem;
            margin-bottom: 20px;
          }
          
          .dice {
            width: 90px;
            height: 90px;
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
    </>
  );
};

export default Bonus;