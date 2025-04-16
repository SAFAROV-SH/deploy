import React, { useState } from 'react';
import Header from './Header';

const UcPromo = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const packages = [
    { id: 1, uc: 60, price: 13000, popular: false },
    { id: 2, uc: 325, price: 58000, popular: false },
    { id: 3, uc: 660, price: 115000, popular: false },
    { id: 4, uc: 1800, price: 285000, popular: false },
    { id: 5, uc: 3850, price: 580000, popular: false },
    { id: 6, uc: 8100, price: 1130000, popular: true },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  const handlePurchaseClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Sarlavha */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">PUBG UC Do'koni</h1>
            <p className="text-gray-600 mt-2">Promokodlar va UC paketlarini sotib oling</p>
          </div>

          {/* Paketlar ro'yxati */}
          <div className="space-y-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${pkg.popular ? 'border-2 border-red-400' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-4 z-10">
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Mashhur
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{pkg.uc} UC</h3>
                    <span className="text-lg font-semibold text-gray-700">{formatPrice(pkg.price)} So'm</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{pkg.uc} UC li Redeem kodi arzon narxda</span>
                  </div>
                  <button
                    onClick={() => handlePurchaseClick(pkg)}
                    className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 ${pkg.popular ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    Sotib olish
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} PUBG UC Do'koni. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </div>

      {/* Yangilangan Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out"
            style={{ 
              backdropFilter: 'blur(8px)',
              animation: 'modalFadeIn 0.3s ease-out' 
            }}
          >
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">UC Sotib olish</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* UC ma'lumotlari */}
              <div className="flex items-center justify-between mb-6 bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Paket</span>
                    <h3 className="text-xl font-bold text-gray-800">{selectedPackage.uc} UC</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Narxi</span>
                  <p className="text-xl font-bold text-gray-800">{formatPrice(selectedPackage.price)} So'm</p>
                </div>
              </div>
              
              {user && user.balance >= selectedPackage.price ? (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium text-green-800">Promokodiingiz tayyor!</span>
                    </div>
                    <div className="bg-white border border-dashed border-green-300 rounded-lg p-3 text-center">
                      <span className="font-bold text-lg tracking-wide text-gray-800">AFAFHJST7</span>
                    </div>
                    <p className="text-xs text-green-600 mt-2 text-center">Bu kodni PUBG Mobile o'yinida ishlatishingiz mumkin</p>
                  </div>
                  
                  <button
                    onClick={closeModal}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <span>Yopish</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium text-red-800">Hisobingizda mablag' yetarli emas</span>
                    </div>
                    <p className="mt-2 text-sm text-red-600">Iltimos, hisobingizni to'ldiring va qayta urinib ko'ring.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={closeModal}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      Hisobni to'ldirish
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default UcPromo;