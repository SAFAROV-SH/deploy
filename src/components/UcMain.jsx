import { CreditCard, Gift } from 'lucide-react';
import Header from './Header';
import { useEffect } from 'react';

export default function UcMain() {
  const handleIdOptionClick = () => {
    // Get current URL
    const currentUrl = window.location.href;
    
    // Check if the URL contains ?route=ucshop
    if (currentUrl.includes('?route=ucshop')) {
      // Replace ucshop with ucshop_id
      const newUrl = currentUrl.replace('?route=ucshop', '?route=ucshop_id');
      window.location.href = newUrl;
    } else {
      // If the URL doesn't have the parameter, add it
      const separator = currentUrl.includes('?') ? '&' : '?';
      window.location.href = `${currentUrl}${separator}route=ucshop_id`;
    }
  };

  const handlePromocodeClick = () => {
    // Get current URL
    const currentUrl = window.location.href;
    
    // Check if the URL contains ?route=ucshop
    if (currentUrl.includes('?route=ucshop')) {
      // Replace ucshop with ucshop_pr
      const newUrl = currentUrl.replace('?route=ucshop', '?route=ucshop_pr');
      window.location.href = newUrl;
    } else {
      // If the URL doesn't have the parameter, add it
      const separator = currentUrl.includes('?') ? '&' : '?';
      window.location.href = `${currentUrl}${separator}route=ucshop_pr`;
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center min-h-screen bg-white mx-auto mt-1" style={{ width: '98%' }}>
      <div className="w-full py-1">
        {/* Header with Logo */}
        <div className="bg-blue-600 rounded-t-2xl pt-6 pb-5 px-4 text-center shadow-lg">
          <h1 className="text-white font-bold text-2xl mb-3">PUBG MOBILE</h1>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 p-2 rounded-md">
              <div className="border-2 border-blue-400 rounded p-1">
                <div className="text-white font-bold text-3xl tracking-wide">PUBG</div>
                <div className="text-white text-base tracking-wider">MOBILE</div>
              </div>
            </div>
          </div>
          <p className="text-white text-lg px-2 font-medium">PUBG MOBILE o'yiniga qaysi yo'l orqali donat qilmoqchisiz?</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 space-y-4">
          {/* ID Option - with click handler */}
          <div 
            className="bg-blue-50 rounded-xl p-4 flex items-center cursor-pointer hover:bg-blue-100 transition-all transform hover:scale-105 active:scale-95 shadow-md"
            onClick={handleIdOptionClick}
          >
            <div className="bg-blue-600 p-3 rounded-full text-white mr-4 shadow-md">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">ID orqali</h3>
              <p className="text-gray-600 text-sm">Shaxsiy hisob raqami orqali to'lov</p>
            </div>
          </div>
          
          {/* Promocode Option - with click handler */}
          <div 
            className="bg-blue-50 rounded-xl p-4 flex items-center cursor-pointer hover:bg-blue-100 transition-all transform hover:scale-105 active:scale-95 shadow-md"
            onClick={handlePromocodeClick}
          >
            <div className="bg-blue-600 p-3 rounded-full text-white mr-4 shadow-md">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Promokod orqali</h3>
              <p className="text-gray-600 text-sm">Promokodni faollashtirish</p>
            </div>
          </div>
          
          {/* Bonus Banner */}
          <div className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-3 text-white text-center shadow-lg">
            <p className="font-medium text-blue-100 text-base">Birinchi to'lovda</p>
            <p className="text-2xl font-bold">+20% BONUS</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">© 2025 PUBG MOBILE. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
    </>
  );
}