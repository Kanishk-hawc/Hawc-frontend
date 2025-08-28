// // PlanCard.tsx
// // import { useState, useEffect } from 'react';

// type Props = {
//   name: string;
//   price: string;
//   originalPrice?: number;
//   discountText?: string;
//   period: string;
//   perks: string[];
//   popular?: boolean;
//   onSelect: () => void;
//   type: string;
//   isSelected?: boolean;
//   onCardClick?: () => void;
//   isMobile?: boolean;
// };

// export default function PlanCard({ 
//   name, 
//   price, 
//   originalPrice,
//   discountText,
//   period,
//   perks, 
//   popular, 
//   onSelect, 
//   type, 
//   isSelected = false, 
//   onCardClick,
//   isMobile = false 
// }: Props) {
//   // Function to get a special quote based on plan type
//   const getPlanQuote = (planType: string) => {
//     switch (planType) {
//       case 'Premium':
//         return "Unlock your full potential with premium features";
//       case 'Essential':
//         return "Everything you need to get started on your journey";
//       case 'Experience':
//         return "Experience learning like never before";
//       case 'Basic':
//         return "Solid foundation for your learning path";
//       default:
//         return "Quality education at an affordable price";
//     }
//   };

//   const getColorScheme = (planType: string) => {
//     switch (planType) {
//       case 'Premium':
//         return {
//           border: 'border-black',
//           bg: 'bg-black',
//           text: 'text-white',
//           badge: 'bg-purple-500 text-white',
//           hover: 'hover:border-[#65c7f7] hover:shadow-black',
//           active: 'active:scale-95 active:border-[#65c7f7] active:shadow-black',
//           button: 'bg-[#65c7f7] text-white hover:bg-[#65c7f7]'
//         };
//       case 'Essential':
//         return {
//           border: 'border-black',
//           bg: 'bg-black',
//           text: 'text-white',
//           badge: 'bg-blue-500 text-white',
//           hover: 'hover:border-[#65c7f7] hover:shadow-black',
//           active: 'active:scale-95 active:border-[#65c7f7] active:shadow-black',
//           button: 'bg-[#65c7f7] text-white hover:bg-[#65c7f7]'
//         };
//       case 'Experience':
//         return {
//           border: 'border-black',
//           bg: 'bg-black',
//           text: 'text-white',
//           badge: 'bg-green-500 text-white',
//           hover: 'hover:border-[#65c7f7] hover:shadow-black',
//           active: 'active:scale-95 active:border-[#65c7f7] active:shadow-black',
//           button: 'bg-[#65c7f7] text-white hover:bg-[#65c7f7]'
//         };
//       default:
//         return {
//           border: 'border-black',
//           bg: 'bg-black',
//           text: 'text-white',
//           badge: 'bg-gray-500 text-white',
//           hover: 'hover:border-[#65c7f7] hover:shadow-black',
//           active: 'active:scale-95 active:border-[#65c7f7] active:shadow-black',
//           button: 'bg-[#65c7f7] text-white hover:bg-[#65c7f7]'
//         };
//     }
//   };

//   const colorScheme = getColorScheme(type);
  
//   const isStrandedPlan = name.toLowerCase().includes('stranded');
//   const displayAsPopular = popular && !isStrandedPlan;
  
//   const isDayPass = name.toLowerCase().includes('day') || period === 'day';
//   const isFreePlan = name.toLowerCase().includes('free') || price.includes('0');
//   const showRecommendedBadge = period === 'month' && !isDayPass && !isFreePlan;

//   const selectedStyles = isSelected 
//     ? `scale-105 border-2 shadow-[20px] border-[#65c7f7] ${colorScheme.bg}` 
//     : `border border-black ${colorScheme.bg}`;

//   if (!isMobile) {
//     return (
//       <div
//         className={`relative flex flex-col h-full p-6 rounded-[20px] transition-all 
//           min-h-[560px] w-full max-w-[300px] mx-auto cursor-pointer
//           transform hover:scale-105 duration-300
//           ${selectedStyles}
//           ${displayAsPopular 
//             ? 'border-black bg-black shadow-lg'
//             : `${colorScheme.hover} ${colorScheme.active} hover:shadow-[20px] dark:hover:shadow-[20px]`
//           }`}
//         onClick={onCardClick}
//       >
//         {showRecommendedBadge && (
//           <div className={`absolute -top-3 left-3 text-base font-bold px-3 py-1.5 rounded-md ${colorScheme.badge}`}>
//             Recommended
//           </div>
//         )}

//         <h3 className={`text-lg font-bold mt-3 mb-4 ${colorScheme.text}`}>
//           {name}
//         </h3>

//         <div className={`flex items-baseline mb-2 ${colorScheme.text}`}>
//           <span className="text-2[20px] font-bold mr-1">{price}</span>
//           <span className="text-base text-gray-300">/{period === 'year' ? 'Year' : period === 'day' ? 'Day' : 'Month'}</span>
//         </div>

//         {originalPrice && (
//           <div className="mb-2">
//             <span className="text-base text-gray-400 line-through mr-2">
//               {price.split(' ')[0]} {originalPrice}
//             </span>
//             <span className="text-base text-green-400 font-semibold">
//               {Math.round((1 - parseInt(price.split(' ')[1])/originalPrice) * 100)}% off
//             </span>
//           </div>
//         )}

//         {discountText && (
//           <div className="mb-2">
//             <span className="text-base text-green-400 font-semibold">
//               {discountText}
//             </span>
//           </div>
//         )}

//         <p className="text-base text-gray-300 italic mb-4 text-left mt-6 mb-7">
//           {getPlanQuote(type)}
//         </p>
        
//         <div className="w-full h-px bg-gray-700 mb-5"></div>

//         <ul className="flex-1 space-y-2.5 mb-4">
//           {perks.map((perk, i) => (
//             <li key={i} className="flex items-start">
//               <svg 
//                 className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${colorScheme.text}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               <span className="text-gray-300 text-base">{perk}</span>
//             </li>
//           ))}
//         </ul>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onSelect();
//           }}
//           className={`w-full py-3 px-5 rounded-lg font-bold text-base transition-colors ${colorScheme.button}`}
//         >
//           Get Started
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`relative flex flex-col p-5 rounded-[20px] transition-all 
//         w-full cursor-pointer mb-3 min-h-[70px]
//         ${isSelected 
//           ? `border-2 border-[#65c7f7] ${colorScheme.bg}` 
//           : `border border-black ${colorScheme.bg}`
//         }`}
//       onClick={onCardClick}
//     >
//       <div className="absolute left-4 top-12 flex items-center justify-center">
//         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//           ${isSelected 
//             ? 'border-[#65c7f7]' 
//             : 'border-gray-300 dark:border-gray-600'
//           }`}
//         >
//           {isSelected && (
//             <div className="w-4 h-4 rounded-full bg-[#65c7f7]"></div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="w-6 h-6"></div>
        
//         {showRecommendedBadge && (
//           <div className={`absolute -top-2 right-3 text-base font-bold px-3 py-1.5 rounded-md ${colorScheme.badge}`}>
//             Recommended
//           </div>
//         )}
//       </div>

//       {!isSelected && (
//         <div className="flex justify-between items-center ml-10">
//           <h3 className={`text-base font-bold ${colorScheme.text}`}>
//             {name}
//           </h3>
//           <div className={`flex items-baseline ${colorScheme.text}`}>
//             <span className="text-lg font-extrabold mr-1">{price}</span>
//             <span className="text-base text-gray-300">/{period === 'year' ? 'yr' : period === 'day' ? 'day' : 'mo'}</span>
//           </div>
//         </div>
//       )}

//       {!isSelected && originalPrice && (
//         <div className="ml-10 mt-1">
//           <span className="text-[10px] text-gray-400 line-through mr-2">
//             {price.split(' ')[0]} {originalPrice}
//           </span>
//           <span className="text-[10px] text-green-400 font-semibold">
//             {Math.round((1 - parseInt(price.split(' ')[1])/originalPrice) * 100)}% off
//           </span>
//         </div>
//       )}

//       {!isSelected && discountText && (
//         <div className="ml-10 mt-1">
//           <span className="text-[10px] text-green-400 font-semibold">
//             {discountText}
//           </span>
//         </div>
//       )}

//       {!isSelected && (
//         <p className="text-base text-gray-300 italic mt-2 text-left ml-10">
//           "{getPlanQuote(type)}"
//         </p>
//       )}

//       {isSelected && (
//         <div className="mt-3 ml-10">
//           <h3 className={`text-base font-bold ${colorScheme.text} mb-3`}>
//             {name}
//           </h3>
//                     <p className="text-base text-gray-300 italic mb-4 text-left">
//             {getPlanQuote(type)}
//           </p>
          
//           <div className="w-full h-px bg-gray-700 mb-4"></div>

//           <div className={`flex items-baseline mb-4 ${colorScheme.text}`}>
//             <span className="text-lg font-extrabold mr-1">{price}</span>
//             <span className="text-base text-gray-300">/{period === 'year' ? 'year' : period === 'day' ? 'day' : 'month'}</span>
//           </div>

//           {originalPrice && (
//             <div className="mb-2">
//               <span className="text-base text-gray-400 line-through mr-2">
//                 {price.split(' ')[0]} {originalPrice}
//               </span>
//               <span className="text-base text-green-400 font-semibold">
//                 {Math.round((1 - parseInt(price.split(' ')[1])/originalPrice) * 100)}% off
//               </span>
//             </div>
//           )}

//           {discountText && (
//             <div className="mb-2">
//               <span className="text-base text-green-400 font-semibold">
//                 {discountText}
//               </span>
//             </div>
//           )}

//           <ul className="space-y-2">
//             {perks.map((perk, i) => (
//               <li key={i} className="flex items-start">
//                 <svg 
//                   className={`w-4 h-4 mt-0.5 mr-3 flex-shrink-0 ${colorScheme.text}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-gray-300 text-base">{perk}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export type Plan = { id:string, name:string, price:number, currency:string, perks:string[], originalPrice?: number, discountText?: string };






// PlanCard.tsx for side bar
import { useState } from "react";

type Props = {
  name: string;
  price: string;
  originalPrice?: number;
  discountText?: string;
  period: string;
  perks: string[];
  popular?: boolean;
  onSelect: () => void;
  type: string;
  isSelected?: boolean;
  onCardClick?: () => void;
  isMobile?: boolean;
  showClassCategory?: boolean;
  selectedClassCategory?: string;
  onClassCategoryChange?: (category: string) => void;
};

export default function PlanCard({
  name,
  price,
  originalPrice,
  discountText,
  period,
  perks,
  popular,
  onSelect,
  type,
  isSelected = false,
  onCardClick,
  isMobile = false,
  showClassCategory = false,
  selectedClassCategory = "",
  onClassCategoryChange = () => {},
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const classCategories = [
    "9th CBSE",
    "9th SSLC",
    "10th CBSE",
    "10th SSLC",
    "11th NEET",
    "11th JEE",
    "12th NEET",
    "12th JEE"
  ];

  const getPlanQuote = (planType: string) => {
    switch (planType) {
      case "Premium":
        return "Unlock your full potential with premium features";
      case "Essential":
        return "Everything you need to get started on your journey";
      case "Experience":
        return "Experience learning like never before";
      case "Basic":
        return "Solid foundation for your learning path";
      default:
        return "Quality education at an affordable price";
    }
  };

  const getColorScheme = (planType: string) => {
    switch (planType) {
      case "Premium":
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-purple-500 text-white",
          hover: "hover:border-[#65c7f7] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-white hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      case "Essential":
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-blue-500 text-white",
          hover: "hover:border-[#65c7f7] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-white hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      case "Experience":
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-green-500 text-white",
          hover: "hover:border-[#65c7f7] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-white hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      default:
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-gray-500 text-white",
          hover: "hover:border-[#65c7f7] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-white hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
    }
  };

  const colorScheme = getColorScheme(type);

  const isStrandedPlan = name.toLowerCase().includes("stranded");
  const displayAsPopular = popular && !isStrandedPlan;

  const isDayPass = name.toLowerCase().includes("day") || period === "day";
  const isFreePlan = name.toLowerCase().includes("free") || price.includes("0");
  const showRecommendedBadge =
    period === "month" && !isDayPass && !isFreePlan;

  // 🔹 If selected → blue border
  const selectedStyles = isSelected
    ? `scale-105 border-2 border-blue-500 shadow-[20px] ${colorScheme.bg}`
    : `border border-black ${colorScheme.bg}`;

  return (
    <div
      className={`relative flex flex-col p-6 rounded-[20px] transition-all 
        w-full max-w-[320px] mx-auto cursor-pointer min-h-[480px]
        transform hover:scale-105 duration-300
        ${selectedStyles}
        ${
          displayAsPopular
            ? "border-black bg-black shadow-lg"
            : `${colorScheme.hover} ${colorScheme.active} hover:shadow-[20px] dark:hover:shadow-[20px]`
        }`}
      onClick={onCardClick}
    >
      {showRecommendedBadge && (
        <div
          className={`absolute -top-3 left-3 text-[9px] font-bold px-2 py-1 rounded-md ${colorScheme.badge}`}
        >
          Recommended
        </div>
      )}

      <h3 className={`text-base font-bold mt-2 mb-3 ${colorScheme.text}`}>
        {name}
      </h3>

      <div className={`flex items-baseline mb-1 ${colorScheme.text}`}>
        <span className="text-[18px] font-bold mr-1">{price}</span>
        <span className="text-[9px] text-gray-300">
          /{period === "year" ? "Year" : period === "day" ? "Day" : "Month"}
        </span>
      </div>

      {originalPrice && (
        <div className="mb-1">
          <span className="text-[9px] text-gray-400 line-through mr-2">
            {price.split(" ")[0]} {originalPrice}
          </span>
          <span className="text-[9px] text-green-400 font-semibold">
            {Math.round(
              (1 - parseInt(price.split(" ")[1]) / originalPrice) * 100
            )}
            % off
          </span>
        </div>
      )}

      {discountText && (
        <div className="mb-2">
          <span className="text-[9px] text-green-400 font-semibold">
            {discountText}
          </span>
        </div>
      )}

      <p className="text-[9px] text-gray-300 italic mb-3 text-left mt-4">
        {getPlanQuote(type)}
      </p>

      {/* Class Category Dropdown */}
      {showClassCategory && (
        <div className="mb-4 relative">
          <div 
            className={`w-full py-2 px-3 rounded-lg text-[10px] ${colorScheme.dropdown} border border-gray-700 flex justify-between items-center cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span>{selectedClassCategory || "Select Class Category"}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div 
              className={`absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 shadow-lg ${colorScheme.dropdown} border border-gray-700`}
              onClick={(e) => e.stopPropagation()}
            >
              {classCategories.map((category) => (
                <div
                  key={category}
                  className={`px-3 py-2 text-[10px] cursor-pointer hover:bg-gray-700 ${
                    selectedClassCategory === category ? "bg-gray-700" : ""
                  }`}
                  onClick={() => {
                    onClassCategoryChange(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="w-full h-px bg-gray-700 mb-4"></div>

      <ul className="flex-1 space-y-2 mb-4">
        {perks.map((perk, i) => (
          <li key={i} className="flex items-start">
            <svg
              className={`w-3.5 h-3.5 mt-0.5 mr-2 flex-shrink-0 ${colorScheme.text}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-300 text-[10px]">{perk}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full py-2 px-4 rounded-lg font-bold text-[12px] transition-colors ${colorScheme.button}`}
      >
        Get Started
      </button>
    </div>
  );
}

export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  perks: string[];
  originalPrice?: number;
  discountText?: string;
};