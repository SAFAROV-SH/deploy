import React, { useState } from 'react';
import Header from './Header';

const MobileLegends = () => {
  // State for modal and user data
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userId, setUserId] = useState('');
  const [userBalance, setUserBalance] = useState(localStorage.getItem('balance') ?? 0);
  
  // Diamond packages data with numeric IDs
  const diamondPackages = [
    {
      id: 1,
      name: '60 Diamond',
      diamonds: 60,
      priceValue: 12900,
      originalPrice: '15,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 2,
      name: '120 Diamond',
      diamonds: 120,
      priceValue: 25800,
      originalPrice: '30,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 3,
      name: '250 Diamond',
      diamonds: 250,
      priceValue: 55000,
      originalPrice: '65,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 4,
      name: '500 Diamond',
      diamonds: 500,
      priceValue: 105000,
      originalPrice: '120,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 5,
      name: '1000 Diamond',
      diamonds: 1000,
      priceValue: 210000,
      originalPrice: '250,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 6,
      name: '2000 Diamond',
      diamonds: 2000,
      priceValue: 420000,
      originalPrice: '500,000 so\'m',
      icon: '/api/placeholder/50/50'
    }
  ];

  // Format price for display
  const formatPrice = (price) => {
    return `${price.toLocaleString()} so'm`;
  };

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
    setUserId('');
  };
  
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  // State for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const confirmPurchase = async () => {
    if (!userId.trim()) {
      alert("Iltimos, o'yin ID raqamini kiriting!");
      return;
    }
    
    if (userBalance < selectedPackage.priceValue) {
      // User doesn't have enough balance
      // We'll show the top-up button in the modal
      return;
    }
    
    try {
      // Send request to API
      const response = await fetch('https://boomuc.uz/api/mobile-legends.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_id: userId,      // Foydalanuvchi kiritgan o'yin ID
          user_id: userId,      // Foydalanuvchi kiritgan o'yin ID
          paket_id: selectedPackage.id
        }),
      });
      
      if (response.ok) {
        // Process purchase
        setUserBalance(userBalance - selectedPackage.priceValue);
        closeModal();
        // Show success modal
        setShowSuccessModal(true);
      } else {
        alert("Xarid jarayonida xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } catch (error) {
      alert("Xarid jarayonida xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      console.error("Purchase error:", error);
    }
  };
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
            <div className="font-bold text-green-600">{Number(userBalance).toLocaleString()} so'm</div>
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
                  <div className="text-gray-800 font-bold">{formatPrice(pkg.priceValue)}</div>
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
                  <span className="font-bold text-blue-600">{formatPrice(selectedPackage.priceValue)}</span>
                </div>
              </div>
              

              {Number(userBalance) < selectedPackage.priceValue ? (
                <div className="mb-4 p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 mb-2">Hisobingizda yetarli mablag' yo'q!</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Joriy balans: <span className="font-bold">{Number(userBalance).toLocaleString()} so'm</span><br/>
                    Kerak: <span className="font-bold">{selectedPackage.priceValue.toLocaleString()} so'm</span>
                  </p>
                  <button
                    onClick={() => window.location.href = "/?route=deposit"}
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
        
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-5 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Xaridingiz muvaffaqiyatli yakunlandi!</h3>
              
              <p className="text-gray-600 mb-6">
                Olmoslar 24 soat ichida hisobingizga tushiriladi. Xaridingiz uchun rahmat!
              </p>
              
              <button
                onClick={closeSuccessModal}
                className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded transition-colors duration-200"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

export default MobileLegends;