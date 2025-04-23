import React from 'react';
import Header from './Header';

const Services = () => {
  const handleServiceClick = (service) => {
    console.log(`Navigating to ${service} service page`);
    // Bu yerda routing orqali kerakli sahifaga o'tish logikasi bo'ladi
    // navigate(`/${service}`);
  };

  const services = [
    {
      id: 'pubg',
      title: 'PUBG Mobile UC',
      description: 'O\'yin uchun UC sotib olish',
      icon: <i className="bi bi-controller"></i>,
      onClick: () => handleServiceClick('pubg-uc')
    },
    {
      id: 'telegram-premium',
      title: 'Telegram Premium',
      description: 'Premium obunani faollashtirish',
      icon: <i className="bi bi-telegram"></i>,
      onClick: () => handleServiceClick('telegram-premium')
    },
    {
      id: 'telegram-stars',
      title: 'Telegram Stars',
      description: 'Stars va yulduzlar sotib olish',
      icon: <i className="bi bi-star-fill"></i>,
      onClick: () => handleServiceClick('telegram-stars')
    },
    {
      id: 'mobile-legends',
      title: 'Mobile Legends',
      description: 'Olmoslar sotib olish xizmati',
      icon: <i className="bi bi-diamond-fill"></i>,
      onClick: () => handleServiceClick('mobile-legends')
    }
  ];

  return (
    <>
      <Header />
      <div className="w-full p-4 bg-gray-50 mt-1">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Bizning Xizmatlar</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-col space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={service.onClick}
              style={{ border: '0.5px solid #333' }}
              className="bg-blue-50 rounded-xl flex items-center p-4 cursor-pointer transition-all hover:bg-blue-100 active:bg-blue-200"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mr-4">
                {service.icon}
              </div>
              <div className="flex flex-col">
                <div className="text-gray-800 font-medium">{service.title}</div>
                <div className="text-gray-500 text-sm">{service.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;