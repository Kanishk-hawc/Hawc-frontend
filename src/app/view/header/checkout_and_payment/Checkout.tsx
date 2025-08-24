// Checkout.tsx
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface CheckoutData {
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    period: string;
  };
  subjects: string[];
  subjectPrices: { [key: string]: number };
  totalPrice: number;
}

interface CheckoutProps {
  isDarkMode: boolean;
}

export default function Checkout({ isDarkMode }: CheckoutProps) {
  const history = useHistory();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    // Retrieve checkout data from sessionStorage
    const storedData = sessionStorage.getItem('checkoutData');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      // Redirect back to plans if no data
      history.push('/plans');
    }
  }, [history]);

  if (!checkoutData) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-[#091E37]' : 'bg-gray-100'}`}>
        <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>Loading...</div>
      </div>
    );
  }

  const { plan, subjects, subjectPrices, totalPrice } = checkoutData;

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-[#091E37]' : 'bg-gray-100'}`}>
      <div className="flex justify-end">
        {/* Order Summary - Right side with proper spacing for footer */}
        <div className={`w-full md:w-2/3 lg:w-1/2 xl:w-2/5 min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} p-6`}>
          <div className="flex flex-col h-full">
            <h1 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Checkout
            </h1>
            
            <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Order Summary
            </h2>
            
            {/* Plan Details */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Plan</h3>
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center">
                  <span className={isDarkMode ? 'text-white font-medium' : 'text-gray-800 font-medium'}>{plan.name}</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{plan.currency} {plan.price}</span>
                </div>
                <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.period === 'day' ? 'Daily' : plan.period === 'year' ? 'Yearly' : 'Monthly'} access
                </div>
              </div>
            </div>

            {/* Subjects Details */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Subjects</h3>
              <div className="space-y-2">
                {subjects.map((subject, index) => (
                  <div key={index} className={`flex justify-between items-center rounded-lg p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{subject}</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{plan.currency} {subjectPrices[subject]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer to push content up */}
            <div className="flex-grow"></div>

            {/* Total */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center">
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Total</span>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{plan.currency} {totalPrice}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-[#665bfe] hover:bg-[#5a50e5] text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors">
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}