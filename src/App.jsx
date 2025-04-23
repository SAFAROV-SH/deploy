import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './components/Home';
import Referral from './components/Referral';
import Tasks from './components/Tasks';
import Deposit from './components/Deposit';
import Navbar from './components/Navbar';
import UcShop from './components/Ucshop';
import UcMain from './components/UcMain';
import UcPromo from './components/UcPromo';
import Service from './components/Services';
import TelegramStars from './components/telegram-stars';
import MobileLegends from './components/mobile-legends';

const App = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentRoute = params.get('route') || 'home';
  const contentRef = useRef(null);
  
  // Har safar route o'zgarganda scroll tepaga qaytaradi - kuchaytirilgan versiya
  useEffect(() => {
    // Scroll boshiga qaytarish usullarining kombinatsiyasi
    if (contentRef.current) {
      // Contentning scroll pozitsiyasini qaytarish
      contentRef.current.scrollTop = 0;
    }
    
    // Window scroll pozitsiyasini qaytarish
    window.scrollTo(0, 0);
    
    // Qo'shimcha - timeout bilan qayta urinish
    // ba'zan render jarayoni tugaganidan keyin scroll qilish kerak bo'ladi
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      
      // document body va html uchun ham scroll qaytarish
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);
    
  }, [currentRoute]);
  
  // Function to render the appropriate component based on the route parameter
  const renderComponent = () => {
    switch(currentRoute) {
      case 'home':
        return <Home key="home" />;
      case 'service':
        return <Service key="service" />;
      case 'tasks':
        return <Tasks key="tasks" />;
      case 'deposit':
        return <Deposit key="deposit" />;
      case 'ucshop':
        return <UcMain key="ucmain" />;
      case 'ucshop_id':
        return <UcShop key="ucshop" />;
      case 'ucshop_pr':
        return <UcPromo key="ucpromo" />;
        case 'telegram-stars':
        return <TelegramStars key="ucpromo" />;
      default:
        return <MobileLegends key="default-home" />;
    }
  };

  return (
    <div className="mobile-app">
      <div className="main-content" ref={contentRef}>
        <Navbar />
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;