import { useState, useEffect } from 'react';
import { CreditCard, Gift, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();
  
  const getUserId = () => {
    return user.id;
  };
  
  const fetchOrderHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = getUserId();
      const response = await fetch(`https://boomuc.uz/api/history.php?user_id=${userId}`);
      
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
  
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      
      const months = [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
      ];
      
      const day = date.getDate();
      const month = months[date.getMonth()];
      
      return `${month} ${day}`;
    } catch (err) {
      console.error('Sana formatida xatolik:', err);
      return dateString;
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <><Header />
    <div className="bg-white min-h-screen">
      
      {/* Main Content */}
      <div className={`px-4 pt-4 pb-20 ${!loading && !error && orderHistory.length === 0 ? 'flex items-center justify-center min-h-[80vh]' : ''}`}>
        <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${!loading && !error && orderHistory.length === 0 ? 'w-full max-w-md' : 'w-full'}`}>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white text-center">
            <h3 className="font-medium">Buyurtmalar Tarixi</h3>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-3 text-gray-600">Ma'lumotlar yuklanmoqda...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="p-6 text-center">
              <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
                <p>{error}</p>
              </div>
              <button 
                onClick={fetchOrderHistory} 
                className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 shadow transition-colors"
              >
                Qayta urinish
              </button>
            </div>
          )}
          
          {/* Empty State */}
          {!loading && !error && orderHistory.length === 0 && (
            <div className="flex flex-col justify-center items-center min-h-[50vh] p-6 text-center">
              <div className="bg-gray-50 text-gray-600 p-5 rounded-lg w-full mb-4">
                <p>Sizda hali buyurtmalar tarixi mavjud emas</p>
              </div>
              <p className="text-gray-700 mb-4">Siz yangi buyurtma yaratmoqchimisiz?</p>
              <div className="flex flex-col sm:flex-row w-full gap-3">
                <button 
                onClick={() => window.location.href = "/?route=service"}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm transition-colors"
                >
                  Buyurtma berish
                </button>
                <button 
                onClick={() => window.location.href = "/?route=deposit"}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm transition-colors"
                >
                  Hisobni to'ldirish
                </button>
              </div>
            </div>
          )}
          
          {/* Order List */}
          {!loading && !error && orderHistory.length > 0 && (
            <div className="divide-y divide-gray-100">
              {orderHistory.map((order) => (
                <div key={order.id} className="hover:bg-gray-50 transition-colors">
                  {/* Order Summary Row */}
                  <div 
                    className="flex items-center p-4 cursor-pointer" 
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      order.type === 'mLegends' ? 'bg-yellow-100' : 
                      (order.type === 'ID' || order.type === 'id') ? 'bg-indigo-100' : 'bg-purple-100'
                    }`}>
                      {order.type === 'mLegends' ? (
                        <i className="bi bi-gem"></i>
                      ) : order.type === 'ID' || order.type === 'id' ? (
                        <CreditCard size={18} className="text-indigo-600" />
                      ) : (
                        <Gift size={18} className="text-purple-600" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">
                        {order.type === 'mLegends' ? 'M.Legends' : 
                         (order.type === 'ID' || order.type === 'id') ? 'ID' : 'Promokod'}: {' '}
                        <span className="text-indigo-600 font-bold">
                          {order.uc} {order.type === 'mLegends' ? 'Almaz' : 'UC'}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-500 mb-1">{formatDate(order.date)}</div>
                      {expandedOrderId === order.id ? (
                        <ChevronUp size={16} className="text-indigo-500" />
                      ) : (
                        <ChevronDown size={16} className="text-indigo-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  {expandedOrderId === order.id && (
                    <div className="bg-gray-50 p-4 border-t border-gray-100 animate-fadeIn">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-indigo-700 font-bold">ID</span>
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs text-gray-500 mb-1">Buyurtma raqami:</div>
                          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 font-mono text-indigo-700 select-all text-sm">
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
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 text-center">
        <p className="text-gray-500 text-xs">© 2025 PUBG MOBILE. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
    </>
  );
}