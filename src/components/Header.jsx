import { useState, useEffect } from 'react';
import '../css/Header.css';

const Header = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Assuming user data is available from somewhere (localStorage, context, etc.)
    // For this example, let's assume we get it from localStorage
    
    // Fetch balance from server
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://boomuc.uz/api/main.php?uid=${user.id}`);
        const data = await response.json();
        
        if (data && data.balance !== undefined) {
          setBalance(data.balance);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    
    fetchBalance();
  }, []);

  return (
    <div className="game-header1">
      <div className="user-info1">
        <img src="https://www.freeiconspng.com/uploads/pubg-circle-battlegrounds-photo-23.png" alt="Profile" />
        <span>{user.name}</span>
      </div>
      <div className="balance-info1">
        <span><b>{balance}</b> so'm</span>
      </div>
    </div>
  );
};

export default Header;