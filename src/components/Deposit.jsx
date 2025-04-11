import React, { useState } from 'react';
import '../css/Deposit.css';
import Header from './Header';
const Deposit = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputStyle = {
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
        margin: 0
      };
    const handleDeposit = async () => {
        const depositAmount = parseFloat(amount);
        
        if (isNaN(depositAmount) || depositAmount <= 0) {
            setErrorMessage('Iltimos, to\'g\'ri summa kiriting.');
            return;
        }
        
        setIsLoading(true);
        setErrorMessage('');
        
        try {
            // API ga so'rov yuborish
            const response = await fetch('https://probots.uz/api/pay.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id,
                    payment_type: paymentMethod,
                    payment_amount: depositAmount
                })
            });
            
            const data = await response.json();
            console.log(data)
            if (data.status === true && data.url) {
                // Foydalanuvchini to'lov URL manziliga yo'naltirish
                window.location.href = data.url;
            } else {
                // Xatolik bo'lsa
                setErrorMessage(data.message || 'To\'lov so\'rovida xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMessage('Server bilan bog\'lanishda xatolik yuz berdi. Internet aloqasini tekshirib, qayta urinib ko\'ring.');
            setIsLoading(false);
        }
    };

    const isDepositButtonEnabled = () => {
        if (paymentMethod === 'humo-uzcard') {
            return amount >= 1000;
        } else if (paymentMethod === 'foreign') {
            return amount >= 100;
        }
        else if (paymentMethod === 'crypto') {
            return amount >= 1;
        }
        return false;
    };

    const paymentMethods = [
        { id: 'humo-uzcard', name: 'Uzb-So\'m', image: "https://www.unionpayintl.com/jfimg/2022-16/0d9c30aa18ca444984a650170de49ad3.jpg", minAmount: 1000 },
        { id: 'foreign', name: 'Chet eldan', image: "https://admin.buypin.uz/storage/01JNXXSNR0N4AS6G0KRKSJ0FJQ.png", minAmount: 1000 },
        { id: 'crypto', name: 'Crypto', image: "https://zengo.com/wp-content/uploads/USDT-2.png", minAmount: 1 }
    ];


    return (
        <>
        <Header />
        <div className="deposit-container">
            <div className="deposit-card">
                <div className="deposit-header">
                    <h2>Hisobni to'ldirish</h2>
                    <p>To'lov usulini tanlang va summani kiriting</p>
                </div>
                
                <div className="payment-methods">
                    {paymentMethods.map(method => (
                        <div 
                            key={method.id}
                            className={`payment-method ${paymentMethod === method.id ? 'selected' : ''}`} 
                            onClick={() => setPaymentMethod(method.id)}
                        >
                            <div className="payment-logo">
                                <img src={method.image} alt={method.name} />
                            </div>
                            <span className="payment-name">{method.name}</span>
                            {paymentMethod === method.id && <div className="check-mark">✓</div>}
                        </div>
                    ))}
                </div>
                
                {paymentMethod && (
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="amount">To'lov summasi</label>
                            <div className="input-wrapper">
                                <input 
                                style={inputStyle}
                                    type="number" 
                                    id="amount" 
                                    placeholder={`Minimal: ${paymentMethod === 'foreign' ? '100 ₽' : 
                                        paymentMethod === 'crypto' ? '1 USDT' : 
                                        '1000 so\'m'}`}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="currency-label">
    {paymentMethod === 'foreign' ? '₽' : 
     paymentMethod === 'crypto' ? 'USDT' : 
     'so\'m'}
</span>
                            </div>
                        </div>
                        
                        {errorMessage && (
                            <div className="error-message">
                                <span>⚠️</span> {errorMessage}
                            </div>
                        )}
                        
                        <button 
                            className={`deposit-button ${!isDepositButtonEnabled() ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
                            disabled={!isDepositButtonEnabled() || isLoading}
                            onClick={handleDeposit}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                `To'lov qilish`
                            )}
                        </button>
                        
                        {paymentMethod && (
                            <div className="secure-notice">
                                <span className="lock-icon">🔒</span> Xavfsiz to'lov kafolatlanadi
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
        </>);
};

export default Deposit;