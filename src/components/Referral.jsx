import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from './Loading';
import Header from './Header';

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Referral = () => {
  const [referalFriends, setReferalFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const referalLink = "https://example.com/ref/yourcode";

  useEffect(() => {
    fetch('https://probots.uz/api/friends.php?id='+user.uid)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server javob qaytarmadi');
        }
        return response.json();
      })
      .then(data => {
        setReferalFriends(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ma\'lumotlarni olishda xatolik:', error);
        setError(error.message);
        setLoading(false);
        // Xatolik bo'lganda bo'sh massiv bilan davom etish
        setReferalFriends([]);
      });
  }, []);

  const copyReferalLink = () => {
    navigator.clipboard.writeText(referalLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div className="p-4 bg-red-50 rounded-lg text-center">
      <p className="text-red-600 font-medium">Ma'lumotlarni yuklashda xatolik: {error}</p>
      <p className="text-red-500 mt-2">Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.</p>
    </div>
  );

  const totalBonus = referalFriends.reduce((acc, friend) => acc + friend.bonus, 0);
  const totalFriends = referalFriends.length;
  const targetFriends = 20;
  const remainingFriends = targetFriends - totalFriends > 0 ? targetFriends - totalFriends : 0;
  const progressPercentage = (totalFriends / targetFriends) * 100;

  return (
    <>
    <Header />
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between mb-4">
          <div className="text-center flex-1 border-r border-gray-200">
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 rounded-full p-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-gray-800">{totalFriends}</h3>
              <p className="text-sm text-gray-500">Referallarim</p>
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="flex flex-col items-center">
              <span className="bg-green-100 rounded-full p-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3 className="text-xl font-bold text-gray-800">{totalBonus}</h3>
              <p className="text-sm text-gray-500">Yig'ilgan bonuslar</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Keyingi bonusgacha:</span>
            <span className="font-medium text-gray-800">{remainingFriends} ta do'st</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage <= 100 ? progressPercentage : 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1 text-gray-500">{totalFriends}/{targetFriends} do'st</div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center">
          <input 
            type="text" 
            value={referalLink} 
            readOnly 
            className="flex-1 text-sm border border-gray-300 rounded-l-lg py-2 px-3 bg-gray-50"
          />
          <button 
            onClick={copyReferalLink} 
            className={`flex items-center justify-center py-2 px-4 rounded-r-lg text-white font-medium text-sm ${copySuccess ? 'bg-green-600' : 'bg-blue-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copySuccess ? "Nusxalandi!" : "Nusxalash"}
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">Taklif qilingan do'stlar</h3>
      </div>

      {referalFriends.length > 0 ? (
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
        >
          {referalFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className={`bg-white rounded-xl shadow-sm p-3 flex items-center ${friend.status === "pending" ? "border-l-4 border-yellow-400" : "border-l-4 border-green-500"}`}
              variants={itemVariants}
              custom={index}
            >
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{friend.name}</h4>
                <p className="text-xs text-gray-500">{new Date(friend.date).toLocaleDateString("uz-UZ")}</p>
              </div>
              <div>
                {friend.status === "active" ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg className="mr-1 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    +{friend.bonus}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg className="mr-1 h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Kutilmoqda
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 pt-6 pb-10 px-6 text-center">
            <div className="relative mb-6">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 mx-auto opacity-30">
                <path fill="rgba(255, 255, 255, 0.2)" d="M45.7,-61.9C58.9,-53.3,69.2,-39.2,71.1,-24.9C73,-10.5,66.6,4.1,61.3,19.1C56.1,34,52,49.3,41.5,60.1C31,70.9,15.5,77.2,-0.6,78C-16.7,78.8,-33.4,74.1,-45.9,64.4C-58.5,54.7,-66.8,40,-72.1,24.4C-77.3,8.8,-79.6,-7.8,-74.9,-22.4C-70.3,-37,-58.7,-49.5,-45.1,-58C-31.5,-66.5,-15.7,-71,-0.1,-70.8C15.5,-70.7,32.5,-70.5,45.7,-61.9Z" transform="translate(100 100)" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Do'stlaringizni taklif qiling!</h3>
            <p className="text-blue-100 text-sm">Do'stlaringiz bilan birga bo'ling va bonuslar yig'ing</p>
          </div>
          
          <div className="px-6 py-6">
            <div className="flex justify-center mb-6">
              <button 
                onClick={copyReferalLink}
                className="flex items-center justify-center py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium text-sm shadow-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Havolani ulashish
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-center text-gray-600">Ulashing</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-center text-gray-600">Do'st qo'shiling</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-center text-gray-600">Bonus oling</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-medium text-gray-800">Qanday ishlaydi?</h4>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 pl-1">
                <li>Yuqoridagi havolani do'stingizga ulashing</li>
                <li>Do'stingiz havola orqali ro'yxatdan o'tadi</li>
                <li>Do'stingiz ro'yxatdan o'tgach, siz bonus olasiz</li>
                <li>Ko'proq do'stlar = ko'proq bonuslar!</li>
              </ol>
            </div>
          </div>
        </motion.div>
      )}
    </div>
    <br />
    </>
  );
};

export default Referral;