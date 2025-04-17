import React, { useState, useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, selectedPackage, formatPrice, user }) => {
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const promoCodeRef = useRef(null);

  // Promo kodni bazadan olish funksiyasi
  const fetchPromoCode = async () => {
    if (!user || !user.id || !selectedPackage) return;
    
    try {
      setLoading(true);
      const response = await fetch(`http://probots.uz/api/promo.php?user_id=${user.id}`);
      
      if (!response.ok) {
        throw new Error('Promo kodni olishda xatolik yuz berdi');
      }
      
      const data = await response.json();
      if (data && data.promo_code) {
        setPromoCode(data.promo_code);
      } else {
        setPromoCode("Promo kod topilmadi");
      }
    } catch (error) {
      console.error("Promo kodni yuklashda xatolik:", error);
      setPromoCode("Xatolik yuz berdi");
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
    if (promoCodeRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(promoCodeRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // 2 soniyadan so'ng notification yo'qoladi
      } catch (err) {
        console.error('Nusxa olishda xatolik:', err);
      }
      
      selection.removeAllRanges();
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
                <h3 className="text-base font-bold text-gray-800">{selectedPackage.uc} UC</h3>
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
                ) : (
                  <div className="relative">
                    <div 
                      className="bg-white border border-dashed border-green-300 rounded-lg p-2 text-center overflow-x-auto whitespace-nowrap"
                      onClick={copyToClipboard}
                    >
                      <div 
                        ref={promoCodeRef}
                        className="font-mono text-base tracking-wider text-gray-800 px-2 select-all overflow-visible"
                        style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}
                      >
                        {promoCode || "aMbNtKgB2a2771T86d"}
                      </div>
                    </div>
                    
                    <button 
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-100 hover:bg-green-200 text-green-600 rounded-md px-2 py-1 text-xs font-medium transition-colors"
                    >
                      {copySuccess ? "Nusxalandi!" : "Nusxalash"}
                    </button>
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