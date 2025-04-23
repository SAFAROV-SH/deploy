import React from 'react';
import Header from './Header';

const MobileLegends = () => {
  // Diamond packages data
  const diamondPackages = [
    {
      id: 'small',
      name: '60 Diamond',
      diamonds: 60,
      price: '12,900 so\'m',
      originalPrice: '15,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'medium',
      name: '120 Diamond',
      diamonds: 120,
      price: '25,800 so\'m',
      originalPrice: '30,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'large',
      name: '250 Diamond',
      diamonds: 250,
      price: '55,000 so\'m',
      originalPrice: '65,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xl',
      name: '500 Diamond',
      diamonds: 500,
      price: '105,000 so\'m',
      originalPrice: '120,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xxl',
      name: '1000 Diamond',
      diamonds: 1000,
      price: '210,000 so\'m',
      originalPrice: '250,000 so\'m',
      icon: '/api/placeholder/50/50'
    },
    {
      id: 'xxxl',
      name: '2000 Diamond',
      diamonds: 2000,
      price: '420,000 so\'m',
      originalPrice: '500,000 so\'m',
      icon: '/api/placeholder/50/50'
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
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">Olmoslar xizmati</h2>
          <p className="text-gray-600 text-sm mb-3">Eng qulay narxlarda, tezkor va ishonchli olmoslar</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
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
                  onClick={() => handlePurchase(pkg.id)}
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

        {/* ID Input */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">O'yin ID raqamingizni kiriting</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">O'yin ID</label>
              <input 
                type="text" 
                placeholder="123456789" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Server</label>
              <input 
                type="text" 
                placeholder="12345" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
              Tekshirish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileLegends;