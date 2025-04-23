import React from 'react';
import Header from './Header';

const MobileLegends = () => {
  // Diamond packages data
  const diamondPackages = [
    {
      id: 'small',
      name: 'Kichik',
      diamonds: 50,
      price: '15,000 so\'m',
      icon: 'bi-gem',
      color: 'blue'
    },
    {
      id: 'medium',
      name: 'O\'rta',
      diamonds: 100,
      price: '30,000 so\'m',
      icon: 'bi-gem-fill',
      color: 'purple'
    },
    {
      id: 'large',
      name: 'Katta',
      diamonds: 250,
      price: '70,000 so\'m',
      icon: 'bi-diamonds',
      color: 'pink'
    },
    {
      id: 'xl',
      name: 'XL',
      diamonds: 500,
      price: '135,000 so\'m',
      icon: 'bi-gem-fill',
      color: 'indigo',
      popular: true
    },
    {
      id: 'xxl',
      name: 'XXL',
      diamonds: 1000,
      price: '260,000 so\'m',
      icon: 'bi-diamonds',
      color: 'cyan'
    },
    {
      id: 'xxxl',
      name: 'XXXL',
      diamonds: 2000,
      price: '500,000 so\'m',
      icon: 'bi-diamond-fill',
      color: 'amber',
      popular: true
    }
  ];

  const handlePurchase = (packageId) => {
    console.log(`Purchasing package: ${packageId}`);
    // Implementation for purchase logic
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
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Olmoslar xizmati</h2>
          <p className="text-gray-600 text-sm mb-3">Eng qulay narxlarda, tezkor va ishonchli olmoslar</p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Diamond Packages Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {diamondPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${pkg.popular ? 'border-2 border-pink-500' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-pink-500 text-white text-xs py-1 px-2 rounded-bl-lg font-medium">
                    TOP
                  </div>
                </div>
              )}
              
              <div className={`p-3 ${pkg.popular ? 'bg-gradient-to-br from-pink-50 to-purple-50' : 'bg-white'}`}>
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-800">{pkg.name}</h3>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full 
                    ${pkg.color === 'purple' ? 'bg-purple-500' : 
                    pkg.color === 'blue' ? 'bg-blue-500' : 
                    pkg.color === 'pink' ? 'bg-pink-500' : 
                    pkg.color === 'indigo' ? 'bg-indigo-500' : 
                    pkg.color === 'cyan' ? 'bg-cyan-500' : 'bg-amber-500'}`}>
                    <i className={`bi ${pkg.icon} text-white text-xs`}></i>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <i className="bi bi-diamond-fill text-blue-500 mr-1"></i>
                  <span className="text-lg font-bold text-gray-900">{pkg.diamonds}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-base font-bold text-gray-900">{pkg.price}</span>
                </div>
                
                <button 
                  onClick={() => handlePurchase(pkg.id)}
                  className={`w-full py-2 rounded text-white text-sm font-medium flex items-center justify-center
                  ${pkg.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 
                  pkg.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : 
                  pkg.color === 'pink' ? 'bg-pink-500 hover:bg-pink-600' : 
                  pkg.color === 'indigo' ? 'bg-indigo-500 hover:bg-indigo-600' : 
                  pkg.color === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-amber-500 hover:bg-amber-600'} 
                  transition-colors duration-200`}
                >
                  Sotib olish
                  <i className="bi bi-cart-plus ml-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white text-center mb-6">
          <h3 className="text-lg font-bold mb-1">Maxsus Taklif!</h3>
          <p className="text-sm mb-2">Bugun buyurtma bering va +10% bonus olmos oling!</p>
          <button className="bg-white text-purple-600 text-sm font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors duration-200">
            <i className="bi bi-gift mr-1"></i> Bonus olish
          </button>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <i className="bi bi-info-circle mr-2 text-blue-500"></i>
            Qanday ishlaydi
          </h3>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Paketni tanlang</h4>
                <p className="text-xs text-gray-600">O'zingizga kerakli olmos paketini tanlang</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">To'lovni amalga oshiring</h4>
                <p className="text-xs text-gray-600">Istalgan to'lov usulidan foydalaning</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Olmoslarni qabul qiling</h4>
                <p className="text-xs text-gray-600">Olmoslar darhol hisobingizga qo'shiladi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game ID Input */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-3">O'yin ID raqamingizni kiriting</h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="O'yin ID" 
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors duration-200">
              <i className="bi bi-search mr-1"></i> Tekshirish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileLegends;