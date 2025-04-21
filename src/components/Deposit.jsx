import React, { useState, useEffect } from 'react';
import Header from './Header';

const Deposit = () => {
    const [paymentMethod, setPaymentMethod] = useState('humo-uzcard'); // Default Uzb-So'm tanlangan
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    // To'lovlar tarixini olish
    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const fetchPaymentHistory = async () => {
        setHistoryLoading(true);
        try {
            const response = await fetch('https://probots.uz/api/payhistory.php');
            const data = await response.json();
            
            if (data && Array.isArray(data)) {
                setPaymentHistory(data);
            } else {
                setPaymentHistory([]);
            }
        } catch (error) {
            console.error('To\'lovlar tarixini olishda xatolik:', error);
            setPaymentHistory([]);
        } finally {
            setHistoryLoading(false);
        }
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
            console.log(data);
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

    // To'lov statusiga qarab ikonka tanlash
    const getStatusIcon = (status) => {
        switch(status) {
            case 'success':
                return (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <span className="text-green-600 text-lg">✓</span>
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                        <span className="text-yellow-600 text-lg">⏳</span>
                    </div>
                );
            case 'canceled':
                return (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                        <span className="text-red-600 text-lg">✕</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        <span className="text-gray-600 text-lg">•</span>
                    </div>
                );
        }
    };

    // Sanani formatlash uchun yordam funksiyasi
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            
            return `${day} ${month} ${formattedHours}:${minutes} ${ampm}`;
        } catch (error) {
            return dateString;
        }
    };

    return (
        <>
        <Header />
        <div className="flex flex-col items-center px-4 py-6 w-full max-w-md mx-auto">
            {/* Deposit Card */}
            <div className="w-full bg-white rounded-xl shadow-md mb-6 overflow-hidden">
                <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Hisobni to'ldirish</h2>
                    <p className="text-sm text-gray-600 mb-4">To'lov usulini tanlang va summani kiriting</p>
                
                    {/* Payment Methods */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {paymentMethods.map(method => (
                            <div 
                                key={method.id}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all w-full sm:w-28 
                                    ${paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <div className="w-12 h-12 flex items-center justify-center mb-2 overflow-hidden">
                                    <img src={method.image} alt={method.name} className="w-full h-auto object-contain" />
                                </div>
                                
                                <div className="flex items-center">
                                    <span className="text-sm font-medium">{method.name}</span>
                                    {paymentMethod === method.id && (
                                        <span className="ml-1 text-blue-600">✓</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                
                    {/* Input Form */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            To'lov summasi
                        </label>
                        <div className="relative rounded-md">
                            <input 
                                type="number" 
                                id="amount" 
                                placeholder={`Minimal: ${paymentMethod === 'foreign' ? '100 ₽' : 
                                    paymentMethod === 'crypto' ? '1 USDT' : 
                                    '1000 so\'m'}`}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{ 
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'textfield',
                                    margin: 0
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 bg-gray-100 border-l rounded-r-md">
                                {paymentMethod === 'foreign' ? '₽' : 
                                paymentMethod === 'crypto' ? 'USDT' : 
                                'so\'m'}
                            </div>
                        </div>
                    </div>
                    
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                            <span className="mr-2">⚠️</span> 
                            <span className="text-sm">{errorMessage}</span>
                        </div>
                    )}
                    
                    {/* Payment Button */}
                    <button 
                        className={`w-full py-3 rounded-md font-medium transition-all flex items-center justify-center
                            ${!isDepositButtonEnabled() 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        disabled={!isDepositButtonEnabled() || isLoading}
                        onClick={handleDeposit}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "To'lov qilish"
                        )}
                    </button>
                    
                    {/* Secure Notice */}
                    <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                        <span className="mr-2">🔒</span> 
                        <span>Xavfsiz to'lov kafolatlanadi</span>
                    </div>
                </div>
            </div>
            
            {/* Payment History Section */}
            {paymentHistory.length > 0 && (
                <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">To'lovlar tarixi</h3>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                        {paymentHistory.map((payment, index) => (
                            <div key={index} className="px-5 py-4 flex items-center">
                                <div className="mr-4">
                                    {getStatusIcon(payment.status)}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">
                                        {payment.amount} 
                                        {payment.payment_type === 'foreign' ? '₽' : 
                                        payment.payment_type === 'crypto' ? 'USDT' : 
                                        'so\'m'}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 whitespace-nowrap">
                                    {formatDate(payment.date)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Loading State */}
            {historyLoading && (
                <div className="w-full flex flex-col items-center justify-center p-6">
                    <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 text-sm">To'lovlar tarixi yuklanmoqda...</p>
                </div>
            )}
        </div>
        </>
    );
};

export default Deposit;