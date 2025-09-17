import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";

type CheckoutPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CheckoutData = {
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
  };
  subjects: string[];
  subjectPrices: Record<string, number>;
  totalPrice: number;
  boardGrade?: string;
};

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const amount = (checkoutData?.totalPrice || 0);

  useEffect(() => {
    if (!razorpayLoaded && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [razorpayLoaded]);

  const sendPaymentResponse = async (paymentData: any) => {
    const userData = localStorage.getItem("user");
    let token = "";

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        token = parsedUserData.token || "";
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        throw new Error("Invalid user data");
      }
    }

    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("Authentication token missing");
    }

    try {
      const response = await fetch("https://lms.hawc.in/api/student/paymentresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: 4,
          Bearrer_token: token,
          failure_response:paymentData.failure_response || null ,
          razorpay_payment_id: paymentData.payment_id,
          razorpay_order_id: paymentData.order_id,
          razorpay_signature: paymentData.signature,
          // amount: amount, 
          // currency: "INR"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error details:", errorData);
        throw new Error(`Payment verification failed: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      await console.log("Payment response sent successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error sending payment response:", error);
      throw error;
    }
  };

  const paymentHandling = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!razorpayLoaded) {
      console.error("Razorpay not loaded yet");
      setIsProcessing(false);
      return;
    }

    const userData = localStorage.getItem("user");
    let token = "";
    let user_name = "";
    let user_email = "";
    let user_id = "";

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        token = parsedUserData.token || "";
        user_name = parsedUserData.name || "";
        user_email = parsedUserData.email || "";
        user_id = parsedUserData.id || "";
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setIsProcessing(false);
        return;
      }
    }

    if (!token) {
      console.error("No token found in localStorage");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("https://lms.hawc.in/api/student/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user_id || 4, 
          subscription_type_id: 1,
          amount: amount,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Order creation failed:", response.status, errorText);
        throw new Error(`Order creation failed: ${response.status}`);
      }

      const orderData = await response.json();
      const order = orderData.data;
      
      if (!order || !order.order_id) {
        throw new Error("Invalid order data received from server");
      }

      const options = {
        key: "rzp_test_R8jWiMbBmD7tA5", 
        amount: amount,
        currency: "INR",
        name: "HAWC",
        description: "Education Subscription",
        image: "https://example.com/your_logo",
        order_id: order.order_id,
        prefill: {
          name: user_name,
          email: user_email || "student@example.com",
          contact: "9000000000" 
        },
        notes: {
          address: "HAWC Education"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function(response: any) {
          try {
            const paymentData = {
              // payment_id: String(response.razorpay_payment_id || "").substring(0, 255),
              // order_id: String(response.razorpay_order_id || "").substring(0, 255),
              // signature: String(response.razorpay_signature || "").substring(0, 255),
              payment_id: response.razorpay_payment_id ,
              order_id: response.razorpay_order_id,
              signature:response.razorpay_signature,
              failure_response:response.razorpay_failure_response || null

            };

            console.log("Payment Data:", paymentData);
            await sendPaymentResponse(paymentData);
            
            // alert("Payment successful! Your subscription has been activated.");
            // onClose();
            
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment completed but verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function() {
            console.log("Checkout form closed");
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      
      rzp1.on('payment.failed', function(response: any) {
        console.error("Payment failed", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      rzp1.open();

    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (data) {
      try {
        setCheckoutData(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing checkout data:", error);
      }
    }

    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [history]);

  const getPeriodForDisplay = (planId: string) => {
    if (planId.includes("day")) return "day";
    if (planId.includes("year")) return "year";
    return "month";
  };

  if (!checkoutData) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-40" onClick={(e) => e.stopPropagation()} />
        )}
        <div
          className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px]
          ${isDarkMode ? "bg-gray-900" : "bg-white"}
          shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <p className={isDarkMode ? "text-white" : "text-gray-800"}>
              Loading checkout data...
            </p>
          </div>
        </div>
      </>
    );
  }

  const { plan, subjects, subjectPrices, totalPrice, boardGrade } = checkoutData;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px]
        ${isDarkMode ? "bg-gray-900" : "bg-white"}
        shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col overflow-y-auto`}
      >
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`flex-grow text-center text-lg md:text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Checkout
          </h2>
          <button
            onClick={() => {
              onClose();
              history.push("/plan");
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ml-4"
            disabled={isProcessing}
          >
            <FaTimes size={22} />
          </button>
        </div>
        <div className="flex flex-col p-4 flex-1">
          <h2
            className={`text-sm md:text-xl font-semibold mb-4 md:mb-6 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Order Summary - Class:{" "}
            <span className={isDarkMode ? "text-white" : "text-gray-800"}>
              {boardGrade
                ?.replace("th", "th ")
                .replace("cbse", "CBSE")
                .replace("icse", "ICSE")
                .replace("jee", "JEE")
                .replace("neet", "NEET")}
            </span>
          </h2>
          
          {/* Plan details */}
          <div className="mb-4 md:mb-6">
            <h3 className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Plan
            </h3>
            <div className={`rounded-sm p-3 md:p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                  {plan.name}
                </span>
                <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                  {plan.currency} {plan.price}
                </span>
              </div>
              <div className={`text-xs md:text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {getPeriodForDisplay(plan.id) === "day" ? "Daily" : 
                 getPeriodForDisplay(plan.id) === "year" ? "Yearly" : "Monthly"} access
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-4 md:mb-6">
            <h3 className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Subjects
            </h3>
            <div className="space-y-2">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center rounded-sm p-2 md:p-3 ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                    {subject}
                  </span>
                  <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                    {plan.currency} {subjectPrices[subject]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex-grow"></div>
          <div className={`border-t pt-3 md:pt-4 mt-auto ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
            <div className="flex justify-between items-center">
              <span className={`text-base md:text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Total
              </span>
              <span className={`text-base md:text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {plan.currency} {totalPrice}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={paymentHandling}
            disabled={!razorpayLoaded || isProcessing}
            className="w-full self-center bg-[#65c7f7] hover:bg-[#034289] hover:text-white text-[#01486bfc] font-bold py-2 md:py-3 px-4 rounded-sm mt-4 md:mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : 
             !razorpayLoaded ? "Loading Payment..." : "Complete Purchase"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPanel;