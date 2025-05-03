import React from 'react';
import Header from './Header';
import { motion } from 'framer-motion';

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
      image: 'https://admin.buypin.uz//storage/01JHACX6C6T8X4E1HF4QDDV7MR.png',
      onClick: () => handleServiceClick('ucshop'),
      color: '#4F46E5' // Indigo
    },
    {
      id: 'mobile-legends',
      title: 'MOBILE LEGENDS (GLOBAL)',
      image: 'https://admin.buypin.uz//storage/01JHADPCRX9CMQ3SMGY7S9HTPE.png',
      onClick: () => handleServiceClick('mobile-legends'),
      color: '#9333EA' // Purple
    },
    {
      id: 'telegram-stars',
      title: 'TELEGRAM STARS',
      image: 'https://admin.buypin.uz//storage/01JNM1AE3BQWZNCJKZXMMMHPB8.png',
      onClick: () => handleServiceClick('telegram-stars'),
      color: '#0EA5E9' // Sky blue
    },
    {
      id: 'telegram-premium',
      title: 'TELEGRAM PREMIUM',
      image: 'https://admin.buypin.uz//storage/01JNXBK4KJCR1RDV30WJF6BRGP.png',
      onClick: () => handleServiceClick('telegram-premium'),
      color: '#2563EB' // Blue
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.95
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full p-6 bg-white min-h-screen">
        <motion.h2 
          className="text-2xl font-bold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bizning Xizmatlar
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              onClick={service.onClick}
              className="rounded-2xl overflow-hidden cursor-pointer shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-100"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="p-6">
                <motion.div 
                  className="w-full h-40 flex items-center justify-center mb-4"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <motion.img 
                    src={service.image} 
                    alt={service.title}
                    className="max-h-full max-w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                </motion.div>
                <motion.div 
                  className="text-center font-medium py-2 px-4 rounded-lg"
                  style={{ 
                    backgroundColor: `${service.color}10`, 
                    color: service.color 
                  }}
                  whileHover={{ 
                    backgroundColor: service.color,
                    color: '#ffffff',
                    transition: { duration: 0.2 } 
                  }}
                >
                  {service.title}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Services;