import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PaymentModal = ({ isOpen, onClose, item, user }) => {
  const [pubgId, setPubgId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Balansni user obyektidan olish
  const userBalance = user.balance;
  const hasSufficientBalance = userBalance >= item.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasSufficientBalance) {
      return;
    }
    
    if (!pubgId || pubgId.trim() === "") {
      setError("PUBG ID kiritish majburiy!");
      return;
    }
    
    // To'lovni amalga oshirish
    setIsLoading(true);
    setError("");
    
    try {
      // Serverga so'rov yuborish
      const response = await fetch('https://probots.uz/api/ucid.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ucAmount: item.mainAmount,
          pubgId: pubgId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "To'lov amalga oshirilmadi");
      }
      
      // Serverdan ijobiy javob keldi
      setSuccess(true);
    } catch (err) {
      setError(err.message || "To'lov jarayonida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setPubgId("");
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="payment-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>To'lov ma'lumotlari</h3>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="item-details">
                <div className="item-image">
                  <img src={item.image} alt="UC" />
                </div>
                <div className="item-info">
                  <div className="item-amount">
                    <img 
                      src="https://cdn.midasbuy.com/images/uc-small.bc30c95b.png" 
                      alt="Currency icon" 
                      className="uc-icon" 
                    />
                    <span>{item.mainAmount} {item.bonusAmount > 0 ? `+${item.bonusAmount}` : ""}</span>
                  </div>
                  <div className="item-price">{item.price} {item.currency}</div>
                </div>
              </div>
              
              <div className="balance-info">
                <div className="balance-label">Sizning balansingiz:</div>
                <div className={`balance-amount ${!hasSufficientBalance ? "insufficient" : ""}`}>
                  {userBalance} {item.currency}
                </div>
              </div>
              
              {!hasSufficientBalance ? (
                <div className="insufficient-balance">
                  <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="error-message"
                  >
                    Balans yetarli emas! Iltimos hisobingizni to'ldiring.
                  </motion.div>
                  <button className="primary-btn" onClick={() => window.location.href = "/?route=deposit"}>Hisobni to'ldirish</button>
                </div>
              ) : success ? (
                <div className="success-message">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="success-icon"
                  >
                    ✓
                  </motion.div>
                  <h4>To'lov muvaffaqiyatli amalga oshirildi!</h4>
                  <p>UC hisobingizga 24 soat ichida tushiriladi.</p>
                  <button className="primary-btn" onClick={onClose}>Yopish</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="form-groupp">
                    <label htmlFor="pubgId">PUBG ID raqamingizni kiriting:</label>
                    <input
                      type="number"
                      id="pubgId"
                      value={pubgId}
                      onChange={(e) => {
                        setPubgId(e.target.value);
                        setError("");
                      }}
                      className={error ? "error" : ""}
                      placeholder="Misol: 513524862"
                    />
                    {error && <div className="error-text">{error}</div>}
                    <div className="id-info">
                      ID raqamni qanday topish haqida <a href="#">ma'lumot</a>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      "To'lovni tasdiqlash"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;