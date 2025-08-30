// import { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useHistory } from "react-router-dom";

// type CheckoutPanelProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// type CheckoutData = {
//   plan: {
//     id: string;
//     name: string;
//     price: number;
//     currency: string;
//   };
//   subjects: string[];
//   subjectPrices: Record<string, number>;
//   totalPrice: number;
//   boardGrade?: string;
// };

// const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ isOpen, onClose }) => {
//   const history = useHistory();
//   const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const amount = (checkoutData?.totalPrice || 0) * 100;

//   const paymentHandling = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     const userData = localStorage.getItem("user");
//     let token = "";
//     let user_name = "";

//     if (userData) {
//       try {
//         const parsedUserData = JSON.parse(userData);
//         token = parsedUserData.token || "";
//         user_name = parsedUserData.name;
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//       }
//     }

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     try {
//       const response = await fetch("http://lms.hawc.in/api/student/createorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           user_id: 4,
//           subscription_type_id: 1,
//           amount,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const order = await response.json();
//       var options = {
//         "key": "rzp_test_R8jWiMbBmD7tA5", // Enter the Key ID generated from the Dashboard
//         "amount": amount, // Amount is in currency subunits. 
//         "currency": "INR",
//         "name": "HAWC", //your business name
//         "description": "Test Transaction",
//         "image": "https://example.com/your_logo",
//         "order_id": order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
//         "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//           "name": user_name, //your customer's name
//           "email": "gaurav.kumar@example.com",
//           "contact": "9876543210" //Provide the customer's phone number for better conversion rates 
//         },
//         "notes": {
//           "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//           "color": "#3399cc"
//         }
//       };
      
//       var rzp1 = new (window as any).Razorpay(options);
//       rzp1.open();
      
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   useEffect(() => {
//     const data = sessionStorage.getItem("checkoutData");
//     if (data) {
//       setCheckoutData(JSON.parse(data));
//     } else {
//       history.push("/plan"); 
//     }

//     const isDark = document.documentElement.classList.contains("dark");
//     setIsDarkMode(isDark);

//     const observer = new MutationObserver(() => {
//       const isDark = document.documentElement.classList.contains("dark");
//       setIsDarkMode(isDark);
//     });

//     observer.observe(document.documentElement, { attributes: true });
//     return () => observer.disconnect();
//   }, [history]);

//   const getPeriodForDisplay = (planId: string) => {
//     if (planId.includes("day")) return "day";
//     if (planId.includes("year")) return "year";
//     return "month";
//   };

//   if (!checkoutData) {
//     return (
//       <div
//         className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px] 
//         ${isDarkMode ? "bg-gray-900" : "bg-white"} 
//         shadow-lg transform transition-transform duration-300 z-50 
//         ${isOpen ? "translate-x-0" : "translate-x-full"} 
//         flex flex-col`}
//       >
//         <div className="flex items-center justify-center min-h-screen">
//           <p className={isDarkMode ? "text-white" : "text-gray-800"}>
//             Loading checkout data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { plan, subjects, subjectPrices, totalPrice, boardGrade } =
//     checkoutData;

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px] 
//       ${isDarkMode ? "bg-gray-900" : "bg-white"} 
//       shadow-lg transform transition-transform duration-300 z-50 
//       ${isOpen ? "translate-x-0" : "translate-x-full"} 
//       flex flex-col overflow-y-auto`}
//     >
//       <div
//         className={`flex items-center justify-between px-4 py-3 border-b ${
//           isDarkMode ? "border-gray-700" : "border-gray-200"
//         }`}
//       >
//         <h2
//           className={`flex-grow text-center text-lg md:text-2xl font-semibold ${
//             isDarkMode ? "text-white" : "text-gray-900"
//           }`}
//         >
//           Checkout
//         </h2>
//         <button
//           onClick={() => {
//             onClose();
//             history.push("/plan");
//           }}
//           className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ml-4"
//         >
//           <FaTimes size={22} />
//         </button>
//       </div>
//       <div className="flex flex-col p-4 flex-1">
//         <h2
//           className={`text-sm md:text-xl font-semibold mb-4 md:mb-6 ${
//             isDarkMode ? "text-white" : "text-gray-800"
//           }`}
//         >
//           Order Summary - Class:{" "}
//           <span className={isDarkMode ? "text-white" : "text-gray-800"}>
//             {boardGrade
//               ?.replace("th", "th ")
//               .replace("cbse", "CBSE")
//               .replace("icse", "ICSE")
//               .replace("jee", "JEE")
//               .replace("neet", "NEET")}
//           </span>
//         </h2>
//         <div className="mb-4 md:mb-6">
//           <h3
//             className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${
//               isDarkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             Plan
//           </h3>
//           <div
//             className={`rounded-sm p-3 md:p-4 ${
//               isDarkMode ? "bg-gray-800" : "bg-gray-100"
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <span
//                 className={isDarkMode ? "text-white" : "text-gray-800"}
//               >
//                 {plan.name}
//               </span>
//               <span
//                 className={isDarkMode ? "text-white" : "text-gray-800"}
//               >
//                 {plan.currency} {plan.price}
//               </span>
//             </div>
//             <div
//               className={`text-xs md:text-sm mt-1 ${
//                 isDarkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               {getPeriodForDisplay(plan.id) === "day"
//                 ? "Daily"
//                 : getPeriodForDisplay(plan.id) === "year"
//                 ? "Yearly"
//                 : "Monthly"}{" "}
//               access
//             </div>
//           </div>
//         </div>
//         <div className="mb-4 md:mb-6">
//           <h3
//             className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${
//               isDarkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             Subjects
//           </h3>
//           <div className="space-y-2">
//             {subjects.map((subject, index) => (
//               <div
//                 key={index}
//                 className={`flex justify-between items-center rounded-sm p-2 md:p-3 ${
//                   isDarkMode ? "bg-gray-800" : "bg-gray-100"
//                 }`}
//               >
//                 <span
//                   className={isDarkMode ? "text-white" : "text-gray-800"}
//                 >
//                   {subject}
//                 </span>
//                 <span
//                   className={isDarkMode ? "text-white" : "text-gray-800"}
//                 >
//                   {plan.currency} {subjectPrices[subject]}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex-grow"></div>
//         <div
//           className={`border-t pt-3 md:pt-4 mt-auto ${
//             isDarkMode ? "border-gray-600" : "border-gray-300"
//           }`}
//         >
//           <div className="flex justify-between items-center">
//             <span
//               className={`text-base md:text-sm font-semibold ${
//                 isDarkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               Total
//             </span>
//             <span
//               className={`text-base md:text-sm font-bold ${
//                 isDarkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               {plan.currency} {totalPrice}
//             </span>
//           </div>
//         </div>
//         <button 
//           onClick={paymentHandling}
//           className="w-full self-center bg-[#65c7f7] hover:bg-[#034289] hover:text-white text-[#01486bfc] font-bold py-2 md:py-3 px-4 rounded-sm mt-4 md:mt-6 transition-colors"
//         >
//           Complete Purchase
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPanel;




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
  const amount = (checkoutData?.totalPrice || 0) * 100;

  // Load Razorpay script safely
  useEffect(() => {
    if (!razorpayLoaded && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [razorpayLoaded]);

  const paymentHandling = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!razorpayLoaded) {
      console.error("Razorpay not loaded yet");
      return;
    }

    const userData = localStorage.getItem("user");
    let token = "";
    let user_name = "";

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        token = parsedUserData.token || "";
        user_name = parsedUserData.name;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://lms.hawc.in/api/student/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: 4,
          subscription_type_id: 1,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      
      // Fix for SVG height issue - ensure proper options
      const options = {
        key: "rzp_test_R8jWiMbBmD7tA5",
        amount: amount,
        currency: "INR",
        name: "HAWC",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: user_name,
          email: "gaurav.kumar@example.com",
          contact: "9876543210"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        // Add modal options to handle potential SVG issues
        modal: {
          ondismiss: function() {
            console.log("Checkout form closed");
          },
          // Prevent animation issues that might cause SVG problems
          animation: false
        }
      };
      
      const rzp1 = new (window as any).Razorpay(options);
      
      // Add error handling
      rzp1.on('payment.failed', function(response: any) {
        console.error("Payment failed", response.error);
      });
      
      rzp1.open();
      
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (data) {
      setCheckoutData(JSON.parse(data));
    } else {
      history.push("/plan"); 
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
    );
  }

  const { plan, subjects, subjectPrices, totalPrice, boardGrade } =
    checkoutData;

  return (
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
        <div className="mb-4 md:mb-6">
          <h3
            className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Plan
          </h3>
          <div
            className={`rounded-sm p-3 md:p-4 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <span
                className={isDarkMode ? "text-white" : "text-gray-800"}
              >
                {plan.name}
              </span>
              <span
                className={isDarkMode ? "text-white" : "text-gray-800"}
              >
                {plan.currency} {plan.price}
              </span>
            </div>
            <div
              className={`text-xs md:text-sm mt-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {getPeriodForDisplay(plan.id) === "day"
                ? "Daily"
                : getPeriodForDisplay(plan.id) === "year"
                ? "Yearly"
                : "Monthly"}{" "}
              access
            </div>
          </div>
        </div>
        <div className="mb-4 md:mb-6">
          <h3
            className={`text-base md:text-sm font-medium mb-2 md:mb-3 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
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
                <span
                  className={isDarkMode ? "text-white" : "text-gray-800"}
                >
                  {subject}
                </span>
                <span
                  className={isDarkMode ? "text-white" : "text-gray-800"}
                >
                  {plan.currency} {subjectPrices[subject]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow"></div>
        <div
          className={`border-t pt-3 md:pt-4 mt-auto ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-base md:text-sm font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Total
            </span>
            <span
              className={`text-base md:text-sm font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {plan.currency} {totalPrice}
            </span>
          </div>
        </div>
        <button 
          onClick={paymentHandling}
          disabled={!razorpayLoaded}
          className="w-full self-center bg-[#65c7f7] hover:bg-[#034289] hover:text-white text-[#01486bfc] font-bold py-2 md:py-3 px-4 rounded-sm mt-4 md:mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {razorpayLoaded ? "Complete Purchase" : "Loading Payment..."}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPanel;