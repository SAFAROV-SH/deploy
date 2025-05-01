import { useState, useEffect, useRef } from 'react';
import '../css/Header.css';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      // Store numbers in array to animate each digit
      const startValue = prevValueRef.current;
      const endValue = value;
      const duration = 1000; // Animation duration in ms
      const start = Date.now();

      const animateNumber = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        
        // Easing function for smooth animation (ease-out)
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOut(progress);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animateNumber);
        } else {
          setDisplayValue(endValue);
        }
      };

      requestAnimationFrame(animateNumber);
      prevValueRef.current = value;
    }
  }, [value]);

  return (
    <div className="relative overflow-hidden inline-block">
      <span className="font-bold">{displayValue.toLocaleString()}</span>
    </div>
  );
};

const Header = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({ name: 'User', id: '1' }); // Default user data
  
  useEffect(() => {
    // Get user data from localStorage or other source
    try {
      const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User', id: '1' };
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    
    // Fetch balance from server
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://boomuc.uz/api/main.php?uid=${user.id}`);
        const data = await response.json();
        
        if (data && data.balance !== undefined) {
          setBalance(parseInt(data.balance, 10));
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    
    fetchBalance();
    
    // Optional: Update balance periodically
    const intervalId = setInterval(fetchBalance, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [user.id]);
  
  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-lg font-semibold">
        {user.name}
      </div>
      <div className="text-xl">
        <AnimatedNumber value={balance} /> so'm
      </div>
    </div>
  );
};

export default Header;