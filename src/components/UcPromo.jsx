import React from 'react';
import Header from './Header';
const UcPromo = () => {
  // Paketlar ma'lumotlari
  const packages = [
    { id: 1, uc: 60, price: 13000, popular: false },
    { id: 2, uc: 325, price: 58000, popular: false },
    { id: 3, uc: 660, price: 115000, popular: false },
    { id: 4, uc: 1800, price: 285000, popular: false },
    { id: 5, uc: 3850, price: 580000, popular: false },
    { id: 6, uc: 8100, price: 1130000, popular: false },
  ];

  // Raqamlarni formatlash funksiyasi
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  // Promokodni tasdiqlash funksiyasi
  const handleRedeem = (e) => {
    e.preventDefault();
    const promoCode = e.target.promoCode.value;
    alert(`Promokod tasdiqlandi: ${promoCode}`);
    e.target.reset();
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
    </>
  );
};

export default UcPromo;