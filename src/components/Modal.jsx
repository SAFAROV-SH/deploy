import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, selectedPackage, formatPrice, user }) => {
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState(null);

  // Promo kodni bazadan olish funksiyasi
  const fetchPromoCode = async () => {
    if (!user || !user.id || !selectedPackage) return;
    
    try {
      setLoading(true);
      setError(null); // Xatolik xabarini tozalash
      
      // Server URL manzili - GET parametri bilan
      const apiUrl = `https://probots.uz/api/promo.php?user_id=${user.id}&type=${selectedPackage.type}`;
      
      // CORS muammolarini hal qilish uchun parametrlar
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // CORS muammolari uchun no-cors rejimini sinab ko'ring (lekin bu natijani o'qishni qiyinlashtiradi)
        // mode: 'no-cors',
      };
      
      const response = await fetch(apiUrl, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Server xatoligi: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data && data.promo_code) {
        setPromoCode(data.promo_code);
      } else if (data && data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Server javobida promo_code topilmadi');
      }
    } catch (error) {
      console.error("Promo kodni yuklashda xatolik:", error);
      if (error.message === 'Failed to fetch') {
        setError('Server bilan aloqa o\'rnatilmadi. Internet aloqangizni tekshiring yoki keyinroq qayta urinib ko\'ring.');
      } else {
        setError(error.message);
      }
      setPromoCode(""); // Promo kodni tozalash
    } finally {
      setLoading(false);
    }
  };

  // Modal ochilganda promo kodni yuklash
  useEffect(() => {
    if (isOpen && selectedPackage && user && user.balance >= selectedPackage.price) {
      fetchPromoCode();
    }
  }, [isOpen, selectedPackage, user]);

  // Nusxalash funksiyasi
  const copyToClipboard = () => {
    if (!promoCode) return;
    
    try {
      // Modern Navigator Clipboard API bilan urinib ko'ramiz
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(promoCode)
          .then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
          })
          .catch(err => {
            console.error('Nusxa olishda xatolik:', err);
          });
      } else {
        // Eski usul
        const textarea = document.createElement('textarea');
        textarea.value = promoCode;
        textarea.style.position = 'fixed';  // Prevent scrolling to bottom
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        const successful = document.execCommand('copy');
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        }
        
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error('Nusxa olishda xatolik:', err);
    }
  };

  // Qayta urinish funksiyasi
  const handleRetry = () => {
    fetchPromoCode();
  };

  // Debug funksiyasi - serverdan qaytgan xatolarni ko'rish uchun
  const debugFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Oddiy URL bilan sinab ko'rish
      const testUrl = 'https://probots.uz/api/promo.php';
      
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      const text = await response.text();
      console.log("Server javobi (text):", text);
      
      try {
        const json = JSON.parse(text);
        console.log("Server javobi (json):", json);
        setError("Debug: Server javob berdi, console logini tekshiring");
      } catch (e) {
        setError(`Debug: Server javob berdi, lekin JSON emas: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error("Debug so'rovda xatolik:", error);
      setError(`Debug xatoligi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !selectedPackage) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 pb-10">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out mb-10"
        style={{ 
          backdropFilter: 'blur(8px)',
          animation: 'modalFadeIn 0.3s ease-out' 
        }}
      >
        {/* Modal Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">UC Sotib olish</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          {/* UC ma'lumotlari */}
          <div className="flex items-center justify-between mb-4 bg-blue-50 p-3 rounded-xl">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <span className="text-xs text-gray-500">Paket</span>
                <h3 className="text-base font-bold text-gray-800">{selectedPackage.type} UC</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Narxi</span>
              <p className="text-base font-bold text-gray-800">{formatPrice(selectedPackage.price)} So'm</p>
            </div>
          </div>
          
          {user && user.balance >= selectedPackage.price ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <div className="flex items-center mb-1">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium text-sm text-green-800">Promokodiingiz tayyor!</span>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                    <div className="flex space-x-2 justify-center">
                      <button 
                        onClick={handleRetry}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-md text-sm font-medium"
                      >
                        Qayta urinish
                      </button>
                      <button 
                        onClick={debugFetch}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-1 rounded-md text-sm font-medium"
                      >
                        Tashxis
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div 
                      className="bg-white border border-dashed border-green-300 rounded-lg p-2 text-center overflow-x-auto"
                    >
                      <div 
                        className="font-mono text-base tracking-wider text-gray-800 px-2 select-all"
                        style={{ wordBreak: 'break-all' }}
                      >
                        {promoCode}
                      </div>
                    </div>
                    
                    {promoCode && (
                      <button 
                        onClick={copyToClipboard}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-100 hover:bg-green-200 text-green-600 rounded-md px-2 py-1 text-xs font-medium transition-colors"
                      >
                        {copySuccess ? "Nusxalandi!" : "Nusxalash"}
                      </button>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-green-600 mt-2 text-center">
                  Bu kodni PUBG Mobile o'yinida ishlatishingiz mumkin
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <span>Yopish</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium text-sm text-red-800">Hisobingizda mablag' yetarli emas</span>
                </div>
                <p className="mt-1 text-xs text-red-600">Iltimos, hisobingizni to'ldiring va qayta urinib ko'ring.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-200 text-sm"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => window.location.href = "/?route=deposit"}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm"
                >
                  Hisobni to'ldirish
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Modal;