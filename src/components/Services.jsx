import React from 'react';
import Header from './Header';

const Services = () => {
  const handleServiceClick = (service) => {
    const currentUrl = window.location.href;
    
    // Check if the URL contains ?route=service
    if (currentUrl.includes('?route=service')) {
      // Replace service with specific service
      const newUrl = currentUrl.replace('?route=service', '?route='+service);
      window.location.href = newUrl;
    } else {
      // If the URL doesn't have the parameter, add it
      const separator = currentUrl.includes('?') ? '&' : '?';
      window.location.href = `${currentUrl}${separator}route=`+service;
    }
  };

  const services = [
    {
      id: 'pubg',
      title: 'PUBG MOBILE',
      image: 'https://admin.buypin.uz//storage/01JHACX6C6T8X4E1HF4QDDV7MR.png', // Replace with your image URL
      onClick: () => handleServiceClick('ucshop')
    },
    {
      id: 'mobile-legends',
      title: 'MOBILE LEGENDS (GLOBAL)',
      image: 'https://admin.buypin.uz//storage/01JHADPCRX9CMQ3SMGY7S9HTPE.png', // Replace with your image URL
      onClick: () => handleServiceClick('mobile-legends')
    },
    {
      id: 'telegram-stars',
      title: 'TELEGRAM STARS',
      image: 'https://admin.buypin.uz//storage/01JNM1AE3BQWZNCJKZXMMMHPB8.png', // Replace with your image URL
      onClick: () => handleServiceClick('telegram-stars')
    },
    {
      id: 'telegram-premium',
      title: 'TELEGRAM PREMIUM',
      image: 'https://admin.buypin.uz//storage/01JNXBK4KJCR1RDV30WJF6BRGP.png', // Replace with your image URL
      onClick: () => handleServiceClick('telegram-premium')
    }
  ];

  return (
    <>
      <Header />
      <div className="w-full p-4 bg-white">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={service.onClick}
              className="rounded-lg px-3 py-1 cursor-pointer flex flex-col items-center"
              style={{backgroundColor: 'gainsboro', color: 'darkblue'}}
            >
              <div className="w-full h-32 flex items-center justify-center mb-2">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center text-sm font-medium" style={{color: 'darkblue'}}>
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;