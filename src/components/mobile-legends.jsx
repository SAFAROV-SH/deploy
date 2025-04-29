import React, { useState } from 'react';
import Header from './Header';

const MobileLegends = () => {
  // State for modal and user data
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userId, setUserId] = useState('');
  const [userBalance, setUserBalance] = useState(50000); // Example balance in so'm
  
  // Diamond packages data
  const diamondPackages = [
    {
      id: 'small',
      name: '60 Diamond',
      diamonds: 60,
      price: '12,900 so\'m',
      priceValue: 12900,
      originalPrice: '15,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'medium',
      name: '120 Diamond',
      diamonds: 120,
      price: '25,800 so\'m',
      priceValue: 25800,
      originalPrice: '30,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'large',
      name: '250 Diamond',
      diamonds: 250,
      price: '55,000 so\'m',
      priceValue: 55000,
      originalPrice: '65,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xl',
      name: '500 Diamond',
      diamonds: 500,
      price: '105,000 so\'m',
      priceValue: 105000,
      originalPrice: '120,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xxl',
      name: '1000 Diamond',
      diamonds: 1000,
      price: '210,000 so\'m',
      priceValue: 210000,
      originalPrice: '250,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xxxl',
      name: '2000 Diamond',
      diamonds: 2000,
      price: '420,000 so\'m',
      priceValue: 420000,
      originalPrice: '500,000 so\'m',
      icon: '/api/placeholder/50/50'
    }
  ];

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
    setUserId('');
  };
  
  const confirmPurchase = () => {
    if (!userId.trim()) {
      alert("Iltimos, o'yin ID raqamini kiriting!");
      return;
    }
    
    if (userBalance < selectedPackage.priceValue) {
      // User doesn't have enough balance
      // We'll show the top-up button in the modal
      return;
    }
    
    // Process purchase
    setUserBalance(userBalance - selectedPackage.priceValue);
    alert(`Xaridingiz muvaffaqiyatli yakunlandi!\nHisobingizga ${selectedPackage.diamonds} olmos qo'shiladi.`);
    closeModal();
  };
  
  const topUpBalance = () => {
    // Here you would implement your balance top-up logic
    alert("Hisobni to'ldirish sahifasiga yo'naltirilmoqda...");
    // For demonstration purposes
    setUserBalance(userBalance + 100000);
    closeModal();
  };

  return (
    <>
      <Header />
      <div className="w-full px-4 py-6 bg-gray-50">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <i className="bi bi-controller text-2xl text-purple-600"></i>
            <h1 className="text-2xl font-bold text-gray-800">Mobile Legends</h1>
          </div>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">Olmoslar xizmati</h2>
          <p className="text-gray-600 text-sm mb-3">Eng qulay narxlarda, tezkor va ishonchli olmoslar</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Current Balance */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">Joriy balans:</div>
            <div className="font-bold text-green-600">{userBalance.toLocaleString()} so'm</div>
          </div>
        </div>

        {/* Diamond Packages Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {diamondPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-center mb-2">
                  <img 
                    src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-blue-shiny-clear-diamond-realistic-illustration-png-image_6944721.png" 
                    alt="Diamond" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{pkg.diamonds}</div>
                </div>
              </div>
              
              <div className="p-3 text-center">
                <div className="mb-2">
                  <div className="text-gray-800 font-bold">{pkg.price}</div>
                  <div className="text-gray-400 text-xs line-through">{pkg.originalPrice}</div>
                </div>
                
                <button 
                  onClick={() => handlePurchase(pkg)}
                  className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors duration-200"
                >
                  Sotib olish
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How To Purchase */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Qanday sotib olish mumkin?</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800">O'yin ID raqamini kiriting</h4>
                <p className="text-sm text-gray-600">O'yin ichidagi ID raqamingizni aniq kiriting</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-800">To'lov usulini tanlang</h4>
                <p className="text-sm text-gray-600">Click, Payme, UZCARD yoki boshqa to'lov usullaridan foydalaning</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Buyurtmangizni kuting</h4>
                <p className="text-sm text-gray-600">Olmoslar 5 daqiqa ichida hisobingizga qo'shiladi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {showModal && selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Olmos xarid qilish</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-bold">{selectedPackage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Narxi:</span>
                  <span className="font-bold text-blue-600">{selectedPackage.price}</span>
                </div>
              </div>
              

              {userBalance < selectedPackage.priceValue ? (
                <div className="mb-4 p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 mb-2">Hisobingizda yetarli mablag' yo'q!</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Joriy balans: <span className="font-bold">{userBalance.toLocaleString()} so'm</span><br/>
                    Kerak: <span className="font-bold">{selectedPackage.priceValue.toLocaleString()} so'm</span>
                  </p>
                  <button
                    onClick={topUpBalance}
                    className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors duration-200"
                  >
                    Hisobni to'ldirish
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      O'yin ID raqamingiz:
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Masalan: 12345678"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    onClick={confirmPurchase}
                    className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors duration-200"
                  >
                    Tasdiqlash
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileLegends;