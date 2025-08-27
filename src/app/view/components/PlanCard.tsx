// PlanCard.tsx
import { useState, useEffect } from 'react';

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
  isMobile = false 
}: Props) {
  const getPlanQuote = (planType: string) => {
    switch (planType) {
      case 'Premium':
        return "Unlock your full potential with premium features";
      case 'Essential':
        return "Everything you need to get started on your journey";
      case 'Experience':
        return "Experience learning like never before";
      case 'Basic':
        return "Solid foundation for your learning path";
      default:
        return "Quality education at an affordable price";
    }
  };

  const getColorScheme = (planType: string) => {
    switch (planType) {
      case 'Premium':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-purple-500 text-white',
          hover: 'hover:border-[#123a66] hover:shadow-black',
          active: 'active:scale-95 active:border-[#123a66] active:shadow-black',
          button: 'bg-[#123a66] text-white hover:bg-[#123a66]'
        };
      case 'Essential':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-blue-500 text-white',
          hover: 'hover:border-[#123a66] hover:shadow-black',
          active: 'active:scale-95 active:border-[#123a66] active:shadow-black',
          button: 'bg-[#123a66] text-white hover:bg-[#123a66]'
        };
      case 'Experience':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-green-500 text-white',
          hover: 'hover:border-[#123a66] hover:shadow-black',
          active: 'active:scale-95 active:border-[#123a66] active:shadow-black',
          button: 'bg-[#123a66] text-white hover:bg-[#123a66]'
        };
      default:
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-gray-500 text-white',
          hover: 'hover:border-[#123a66] hover:shadow-black',
          active: 'active:scale-95 active:border-[#123a66] active:shadow-black',
          button: 'bg-[#123a66] text-white hover:bg-[#123a66]'
        };
    }
  };

  const colorScheme = getColorScheme(type);
  
  const isStrandedPlan = name.toLowerCase().includes('stranded');
  const displayAsPopular = popular && !isStrandedPlan;
  
  const isDayPass = name.toLowerCase().includes('day') || period === 'day';
  const isFreePlan = name.toLowerCase().includes('free') || price.includes('0');
  const showRecommendedBadge = period === 'month' && !isDayPass && !isFreePlan;

  const selectedStyles = isSelected 
    ? `scale-105 border-2 shadow-xl border-[#123a66] ${colorScheme.bg}` 
    : `border border-black ${colorScheme.bg}`;

  // Compact version for both desktop and mobile
  return (
    <div
      className={`relative flex flex-col p-4 rounded-xl transition-all 
        w-full max-w-[280px] mx-auto cursor-pointer min-h-[420px]
        transform hover:scale-105 duration-300
        ${selectedStyles}
        ${displayAsPopular 
          ? 'border-black bg-black shadow-lg'
          : `${colorScheme.hover} ${colorScheme.active} hover:shadow-xl dark:hover:shadow-xl`
        }`}
      onClick={onCardClick}
    >
      {showRecommendedBadge && (
        <div className={`absolute -top-3 left-3 text-xs font-bold px-2 py-1 rounded-md ${colorScheme.badge}`}>
          Recommended
        </div>
      )}

      <h3 className={`text-base font-bold mt-2 mb-3 ${colorScheme.text}`}>
        {name}
      </h3>

      <div className={`flex items-baseline mb-1 ${colorScheme.text}`}>
        <span className="text-xl font-bold mr-1">{price}</span>
        <span className="text-xs text-gray-300">/{period === 'year' ? 'Year' : period === 'day' ? 'Day' : 'Month'}</span>
      </div>

      {originalPrice && (
        <div className="mb-1">
          <span className="text-xs text-gray-400 line-through mr-2">
            {price.split(' ')[0]} {originalPrice}
          </span>
          <span className="text-xs text-green-400 font-semibold">
            {Math.round((1 - parseInt(price.split(' ')[1])/originalPrice) * 100)}% off
          </span>
        </div>
      )}

      {discountText && (
        <div className="mb-2">
          <span className="text-xs text-green-400 font-semibold">
            {discountText}
          </span>
        </div>
      )}

      <p className="text-xs text-gray-300 italic mb-3 text-left mt-4">
        {getPlanQuote(type)}
      </p>
      
      <div className="w-full h-px bg-gray-700 mb-4"></div>

      <ul className="flex-1 space-y-2 mb-4">
        {perks.map((perk, i) => (
          <li key={i} className="flex items-start">
            <svg 
              className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${colorScheme.text}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300 text-sm">{perk}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-colors ${colorScheme.button}`}
      >
        Get Started
      </button>
    </div>
  );
}

export type Plan = { id:string, name:string, price:number, currency:string, perks:string[], originalPrice?: number, discountText?: string };