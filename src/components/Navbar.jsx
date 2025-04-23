import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('home');
  
  useEffect(() => {
    // URL parametrlarini tekshirish
    const params = new URLSearchParams(location.search);
    const routeParam = params.get('route');
    
    if (routeParam) {
      // Agar URL parametri bo'lsa, uni aktivlashtirish
      setActiveItem(routeParam);
      localStorage.setItem('activeItem', routeParam);
    } else {
      // Agar URL parametri bo'lmasa, avtomatik ?route=home ga yo'naltirish
      setActiveItem('home');
      localStorage.setItem('activeItem', 'home');
      navigate('?route=home', { replace: true });
    }
  }, [location.pathname, location.search, navigate]);

  const handleMenuClick = (route) => {
    setActiveItem(route);
    localStorage.setItem('activeItem', route);
    // URLga GET parametrini qo'shish
    navigate(`?route=${route}`);
  };

  return (
    <div className="sticky-nav">
      <button 
        className={`nav-item ${activeItem === 'ucshop' ? 'active' : ''}`} 
        onClick={() => handleMenuClick('ucshop')}
      >
        <i className="fas fa-shopping-cart"></i>
        <span>Uc servis</span>
      </button>
      <button 
        className={`nav-item ${activeItem === 'service' ? 'active' : ''}`} 
        onClick={() => handleMenuClick('service')}
      >
        <i className="fas bi bi-shield-check"></i>
        <span>Xizmatlar</span>
      </button>
      <button 
        className={`nav-item ${activeItem === 'home' ? 'active' : ''}`} 
        onClick={() => handleMenuClick('home')}
      >
        <i className="fas fa-gift"></i>
        <span>Bonus</span>
      </button>
      <button 
        className={`nav-item ${activeItem === 'tasks' ? 'active' : ''}`} 
        onClick={() => handleMenuClick('tasks')}
      >
        <i className="fas fa-tasks"></i>
        <span>Vazifalar</span>
      </button> 
      <button 
        className={`nav-item ${activeItem === 'deposit' ? 'active' : ''}`} 
        onClick={() => handleMenuClick('deposit')}
      >
        <i className="fas fa-wallet"></i>
        <span>Hisob</span>
      </button>
    </div>
  );
};

export default Navbar;