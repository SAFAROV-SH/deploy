import { CreditCard, Gift, History, ChevronDown, ChevronUp } from 'lucide-react';
import Header from './Header';
import { useState, useEffect } from 'react';

export default function UcMain() {
  const [showHistory, setShowHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Ochilgan buyurtma ID sini saqlash uchun
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // User ID ni olish funktsiyasi
  const getUserId = () => {
    // 1-usul: URL dan parametrni olish
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('user_id');
    if (userIdFromUrl) return userIdFromUrl;
    
    // 2-usul: localStorage dan olish
    const userIdFromStorage = localStorage.getItem('user_id');
    if (userIdFromStorage) return userIdFromStorage;
    
    // 3-usul: Agar sessiyada saqlangan bo'lsa
    const userIdFromSession = sessionStorage.getItem('user_id');
    if (userIdFromSession) return userIdFromSession;
    
    // Agar user ID topilmasa, default qiymat qaytarish mumkin
    return "default_user";
  };
  
  // Buyurtmalar tarixini serverdan olish
  const fetchOrderHistory = async () => {
    if (!showHistory) return; // Faqat ko'rsatish kerak bo'lganda yuklab olish
    
    setLoading(true);
    setError(null);
    
    try {
      // User ID ni olish
      const userId = user.id;
      
      // User ID ni URL parameter sifatida qo'shib so'rov yuborish
      const response = await fetch(`https://probots.uz/api/history.php?user_id=${userId}`);
      
      if (!response.ok) {
        throw new Error(`Server xatosi: ${response.status}`);
      }
      
      const data = await response.json();
      setOrderHistory(data);
    } catch (err) {
      console.error('Ma\'lumotlarni olishda xatolik:', err);
      setError('Buyurtmalar tarixini olishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };
  
  // History bosilganda yangilanishi uchun
  useEffect(() => {
    if (showHistory) {
      fetchOrderHistory();
    }
  }, [showHistory]);

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
    setShowHistory(!showHistory);
  };

  // Buyurtma ustiga bosilganida uni ochish yoki yopish
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Agar xozir ochiq bo'lsa, yopamiz
    } else {
      setExpandedOrderId(orderId); // Aks holda, yangi buyurtmani ochamiz
    }
  };

  // Sanani formatlash uchun funksiya
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      
      // Oy nomlari
      const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
      ];
      
      const day = date.getDate();
      const month = months[date.getMonth()];
      
      return `${month} ${day}`;
    } catch (err) {
      console.error('Sana formatida xatolik:', err);
      return dateString; // Xatolik bo'lsa original stringni qaytarish
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center min-h-screen bg-gray-50 mx-auto mt-1" style={{ width: '98%' }}>
      <div className="w-full max-w-md py-1">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl pt-8 pb-6 px-4 text-center shadow-lg">
          <h1 className="text-white font-bold text-3xl mb-3 tracking-wide">PUBG MOBILE</h1>
          <div className="flex justify-center mb-5">
            <div className="bg-blue-500 p-3 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="border-2 border-blue-400 rounded p-1">
                <div className="text-white font-bold text-3xl tracking-wide">PUBG</div>
                <div className="text-white text-base tracking-wider">MOBILE</div>
              </div>
            </div>
          </div>
          <p className="text-white text-lg px-2 font-medium">PUBG MOBILE o'yiniga qaysi yo'l orqali donat qilmoqchisiz?</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 space-y-5">
          {/* ID Option - with click handler */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 flex items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-102 active:scale-98"
            onClick={handleIdOptionClick}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full text-white mr-4 shadow-md">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">ID orqali</h3>
              <p className="text-gray-600 text-sm">Shaxsiy hisob raqami orqali to'lov</p>
            </div>
          </div>
          
          {/* Promocode Option - with click handler */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 flex items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-102 active:scale-98"
            onClick={handlePromocodeClick}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full text-white mr-4 shadow-md">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Promokod orqali</h3>
              <p className="text-gray-600 text-sm">Promokodni faollashtirish</p>
            </div>
          </div>
          
          {/* History Option - with click handler */}
          <div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 flex items-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-102 active:scale-98"
            onClick={handleHistoryClick}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full text-white mr-4 shadow-md">
              <History size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-gray-800">Buyurtmalar tarixi</h3>
              <p className="text-gray-600 text-sm">Oldingi xaridlaringiz tarixi</p>
            </div>
            <div className="text-blue-500">
              {showHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          {/* History Content - Shows when clicked */}
          {showHistory && (
            <div className="mt-4 bg-white rounded-xl border border-blue-200 shadow-md overflow-hidden transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white text-center shadow-sm">
                <h3 className="font-bold text-lg">Buyurtmalar Tarixi</h3>
              </div>
              
              {loading && (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-3 text-gray-600 font-medium">Ma'lumotlar yuklanmoqda...</p>
                </div>
              )}
              
              {error && (
                <div className="p-6 text-center">
                  <div className="bg-red-100 text-red-500 p-4 rounded-lg mb-4">
                    <p className="font-medium">{error}</p>
                  </div>
                  <button 
                    onClick={fetchOrderHistory} 
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-colors"
                  >
                    Qayta urinish
                  </button>
                </div>
              )}
              
              {!loading && !error && orderHistory.length === 0 && (
                <div className="p-6 text-center">
                  <div className="bg-blue-50 text-blue-600 p-5 rounded-lg">
                    <p className="font-medium">Sizda hali buyurtmalar tarixi mavjud emas</p>
                  </div>
                </div>
              )}
              
              {!loading && !error && orderHistory.length > 0 && (
                <div className="divide-y divide-blue-100">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="hover:bg-blue-50 transition-colors">
                      {/* Buyurtma asosiy qismi - har doim ko'rinadi */}
                      <div 
                        className="flex items-center p-4 cursor-pointer" 
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <div className="bg-blue-100 p-3 rounded-full mr-3">
                          {order.type === 'ID' || order.type === 'id' ? (
                            <CreditCard size={20} className="text-blue-600" />
                          ) : (
                            <Gift size={20} className="text-blue-600" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">
                            {order.type === 'ID' || order.type === 'id' ? 'ID' : 'Promokod'}: {' '}
                            <span className="text-blue-600 font-bold">{order.uc} UC</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-gray-500 mb-1">{formatDate(order.date)}</div>
                          {expandedOrderId === order.id ? (
                            <ChevronUp size={16} className="text-blue-500" />
                          ) : (
                            <ChevronDown size={16} className="text-blue-500" />
                          )}
                        </div>
                      </div>
                      
                      {/* Yashiringan qism - faqat bosilganda ko'rinadi */}
                      {expandedOrderId === order.id && (
                        <div className="bg-blue-50 p-4 border-t border-blue-100 transition-all duration-300 animate-fadeIn">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-700 font-bold">ID</span>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Buyurtma raqami:</div>
                              <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 font-mono text-blue-700 select-all">
                                {order.pid}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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