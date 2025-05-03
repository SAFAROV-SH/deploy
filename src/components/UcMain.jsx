import { CreditCard, Gift, History } from 'lucide-react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function UcMain() {
  const navigate = useNavigate();

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

  const handleHistoryClick = () => {
    // Navigate to the OrderHistory page
    navigate('/orderHistory');
  };

  return (
    <>
    <Header />
    <div className="flex justify-center min-h-screen bg-gray-50 mx-auto mt-1" style={{ width: '98%', maxWidth: '100%' }}>
      <div className="w-full max-w-md py-1">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl pt-6 pb-5 px-3 text-center shadow-lg">
          <h1 className="text-white font-bold text-2xl md:text-3xl mb-3 tracking-wide">PUBG MOBILE</h1>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 p-2 md:p-3 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="border-2 border-blue-400 rounded p-1">
                <div className="text-white font-bold text-2xl md:text-3xl tracking-wide">PUBG</div>
                <div className="text-white text-sm md:text-base tracking-wider">MOBILE</div>
              </div>
            </div>
          </div>
          <p className="text-white text-base md:text-lg px-2 font-medium">PUBG MOBILE o'yiniga qaysi yo'l orqali donat qilmoqchisiz?</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-3 md:p-4 space-y-4">
          {/* ID Option - with click handler */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 flex items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-102 active:scale-98"
            onClick={handleIdOptionClick}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 md:p-3 rounded-full text-white mr-3 md:mr-4 shadow-md">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-800">ID orqali</h3>
              <p className="text-gray-600 text-xs md:text-sm">Shaxsiy hisob raqami orqali to'lov</p>
            </div>
          </div>
          
          {/* Promocode Option - with click handler */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 flex items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-102 active:scale-98"
            onClick={handlePromocodeClick}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 md:p-3 rounded-full text-white mr-3 md:mr-4 shadow-md">
              <Gift size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-800">Promokod orqali</h3>
              <p className="text-gray-600 text-xs md:text-sm">Promokodni faollashtirish</p>
            </div>
          </div>
          
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center pb-4">
          <p className="text-gray-500 text-xs">© 2025 PUBG MOBILE. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
    </>
  );
}