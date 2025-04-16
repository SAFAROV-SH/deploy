import React, { useState } from 'react';
import Header from './Header';
import Modal from './Modal'; // Alohida modal komponentini import qilish

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

  // Simulyatsiya qilingan foydalanuvchi
  const user = {
    balance: 500000,
  };

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
                className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  pkg.popular ? 'border border-blue-300 bg-blue-50/30' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md" style={{marginTop: '10px'}}>
                    ㅤㅤㅤㅤㅤ
                    </span>
                  </div>
                )}
                <div className={`p-6 ${pkg.popular ? 'pt-8' : ''}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{pkg.uc} UC</h3>
                    <span className="text-lg font-semibold text-gray-700">{formatPrice(pkg.price)} So'm</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{pkg.uc} UC li Redeem kodi arzon narxda</span>
                  </div>
                  <button
                    onClick={() => handlePurchaseClick(pkg)}
                    className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 ${
                      pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    Sotib olish
                  </button>
                </div>
                
                {/* Mashhur paket uchun ko'proq vizual elementlar */}
                {pkg.popular && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} PUBG UC Do'koni. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </div>

      {/* Modal komponentini chaqirish */}
      <Modal 
        isOpen={showModal}
        onClose={closeModal}
        selectedPackage={selectedPackage}
        formatPrice={formatPrice}
        user={user}
      />
    </>
  );
};

export default UcPromo;