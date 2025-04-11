import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import LoadingSpinner from './Loading'
import Header from './Header'

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
    fetch('https://probots.uz/api/friends.php')
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
    <div className="error-message">
      <p>Ma'lumotlarni yuklashda xatolik: {error}</p>
      <p>Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.</p>
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
    <div className="content-container">
      <div className="referal-stats-card">
        <div className="referal-stat-row">
          <div className="stat-item">
            <i className="fas fa-users stat-icon"></i>
            <div className="stat-info">
              <h3>{totalFriends}</h3>
              <p>Referallarim</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-coins stat-icon"></i>
            <div className="stat-info">
              <h3>{totalBonus}</h3>
              <p>Yig'ilgan bonuslar</p>
            </div>
          </div>
        </div>
        <div className="referal-progress">
          <div className="progress-label">
            <span>Keyingi bonusgacha:</span>
            <span>{remainingFriends} ta do'st</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage <= 100 ? progressPercentage : 100}%` }}
            ></div>
          </div>
          <div className="progress-info">{totalFriends}/{targetFriends} do'st</div>
        </div>
      </div>
      <div className="referal-link-container">
        <div className="referal-link">
          <input type="text" value={referalLink} readOnly />
          <button onClick={copyReferalLink}>
            <i className="fas fa-copy"></i>
            {copySuccess ? "Nusxalandi!" : "Nusxalash"}
          </button>
        </div>
      </div>

      <div className="section-title">
        <i className="fas fa-user-friends"></i>
        <h3>Taklif qilingan do'stlar</h3>
      </div>

      {referalFriends.length > 0 ? (
        <motion.div
          className="referal-friends-list"
          initial="hidden"
          animate="visible"
        >
          {referalFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className={`friend-item ${friend.status === "pending" ? "pending" : ""}`}
              variants={itemVariants}
              custom={index}
            >
              <div className="friend-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="friend-info">
                <h4>{friend.name}</h4>
                <p>{new Date(friend.date).toLocaleDateString("uz-UZ")}</p>
              </div>
              <div className="friend-status">
                {friend.status === "active" ? (
                  <span className="status-active">
                    <i className="fas fa-check-circle"></i> +{friend.bonus}
                  </span>
                ) : (
                  <span className="status-pending">
                    <i className="fas fa-clock"></i> Kutilmoqda
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="no-friends-message">
          <p>Hozircha taklif qilingan do'stlar yo'q.</p>
          <p>Do'stlaringizni taklif qilish uchun yuqoridagi havolani ulashing!</p>
        </div>
      )}
    </div>
    </>);
};

export default Referral;