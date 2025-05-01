import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Header.css';

const Header = () => {
  const [balance, setBalance] = useState(0);
  const [prevBalance, setPrevBalance] = useState(0);
  const [balanceChanged, setBalanceChanged] = useState(false);
  const [user, setUser] = useState({ id: '1', name: 'Foydalanuvchi' }); // Default user data

  useEffect(() => {
    // Assuming user data is available from somewhere (localStorage, context, etc.)
    // For this example, let's assume we get it from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Fetch balance from server
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://boomuc.uz/api/main.php?uid=${user.id}`);
        const data = await response.json();
        
        if (data && data.balance !== undefined) {
          // Save previous balance for animation comparison
          setPrevBalance(balance);
          setBalance(data.balance);
          
          // If balance changed, trigger animation
          if (prevBalance !== 0 && prevBalance !== data.balance) {
            setBalanceChanged(true);
            setTimeout(() => {
              setBalanceChanged(false);
            }, 1500);
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    
    fetchBalance();
    
    // Set up interval to refresh balance periodically
    const intervalId = setInterval(fetchBalance, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [user.id]);

  return (
    <div className="game-header1">
      <div className="user-info1">
        <img src="https://www.freeiconspng.com/uploads/pubg-circle-battlegrounds-photo-23.png" alt="Profile" />
        <span>{user.name}</span>
      </div>
      <div className="balance-info1">
        <AnimatePresence mode="wait">
          <motion.span
            key={balance}
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: balanceChanged ? [1, 1.15, 1] : 1,
              color: balanceChanged ? 
                [
                  "rgba(255, 255, 255, 1)", 
                  balance > prevBalance ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)", 
                  "rgba(255, 255, 255, 1)"
                ] : 
                "rgba(255, 255, 255, 1)"
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              duration: 0.4,
              scale: { duration: 0.6 },
              color: { duration: 0.8 }
            }}
          >
            <b>{balance.toLocaleString()}</b> so'm
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;