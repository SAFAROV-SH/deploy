import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from './components/Home';
import Referral from './components/Referral';
import Tasks from './components/Tasks';
import Deposit from './components/Deposit';
import Navbar from './components/Navbar';
import UcShop from './components/Ucshop';

const App = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentRoute = params.get('route') || 'home';
  
  // Function to render the appropriate component based on the route parameter
  const renderComponent = () => {
    switch(currentRoute) {
      case 'home':
        return <Home />;
      case 'referral':
        return <Referral />;
      case 'tasks':
        return <Tasks />;
      case 'deposit':
        return <Deposit />;
      case 'ucshop':
        return <UcShop />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="mobile-app">
      <div className="main-content">
        <Navbar />
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;