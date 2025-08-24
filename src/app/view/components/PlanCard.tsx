// PlanCard.tsx - Updated with custom icons
// import { useState, useEffect } from 'react';

// import AllSubjectsIcon from '../../view/header/icons/all-subjects.png';
// import ChemistryIcon from '../../view/header/icons/chemistry.png';
// import PhysicsIcon from '../../view/header/icons/physics.png';
// import MathIcon from '../../view/header/icons/math.png';

type Props = {
  name: string;
  price: string;
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
  period,
  perks, 
  popular, 
  onSelect, 
  type, 
  isSelected = false, 
  onCardClick,
  isMobile = false 
}: Props) {
  // Function to get a special quote based on plan type
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

  // Function to get color scheme based on plan type
  const getColorScheme = (planType: string) => {
    switch (planType) {
      case 'Premium':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-purple-500 text-white',
          hover: 'hover:border-[#665bfe] hover:shadow-black',
          active: 'active:scale-95 active:border-[#665bfe] active:shadow-black',
          button: 'bg-[#665bfe] text-white hover:bg-[#5a50e5]'
        };
      case 'Essential':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-blue-500 text-white',
          hover: 'hover:border-[#665bfe] hover:shadow-black',
          active: 'active:scale-95 active:border-[#665bfe] active:shadow-black',
          button: 'bg-[#665bfe] text-white hover:bg-[#5a50e5]'
        };
      case 'Experience':
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-green-500 text-white',
          hover: 'hover:border-[#665bfe] hover:shadow-black',
          active: 'active:scale-95 active:border-[#665bfe] active:shadow-black',
          button: 'bg-[#665bfe] text-white hover:bg-[#5a50e5]'
        };
      default:
        return {
          border: 'border-black',
          bg: 'bg-black',
          text: 'text-white',
          badge: 'bg-gray-500 text-white',
          hover: 'hover:border-[#665bfe] hover:shadow-black',
          active: 'active:scale-95 active:border-[#665bfe] active:shadow-black',
          button: 'bg-[#665bfe] text-white hover:bg-[#5a50e5]'
        };
    }
  };

  const colorScheme = getColorScheme(type);
  
  // Check if this is the Stranded plan to treat it as normal
  const isStrandedPlan = name.toLowerCase().includes('stranded');
  const displayAsPopular = popular && !isStrandedPlan;

  // Apply selected styles if the card is selected - border color changed to [#665bfe]
  const selectedStyles = isSelected 
    ? `scale-105 border-2 shadow-xl border-[#665bfe] ${colorScheme.bg}` 
    : `border border-black ${colorScheme.bg}`;

  // Desktop view (with increased height and width)
  if (!isMobile) {
    return (
      <div
        className={`relative flex flex-col h-full p-6 rounded-xl transition-all 
          min-h-[560px] w-[300px] mx-auto cursor-pointer
          transform hover:scale-105 duration-300
          ${selectedStyles}
          ${displayAsPopular 
            ? 'border-black bg-black shadow-lg'
            : `${colorScheme.hover} ${colorScheme.active} hover:shadow-xl dark:hover:shadow-xl`
          }`}
        onClick={onCardClick}
      >
        {/* Plan Type Tile */}
        {type && (
          <div className={`absolute -top-3 left-3 text-sm font-bold px-3 py-1.5 rounded-md ${colorScheme.badge}`}>
            {type}
          </div>
        )}

        {/* Name first, then price - both aligned left */}
        <h3 className={`text-lg font-bold mt-3 mb-4 ${colorScheme.text}`}>
          {name}
        </h3>

        <div className={`flex items-baseline mb-2 ${colorScheme.text}`}>
          <span className="text-2xl font-bold mr-1">{price}</span>
          <span className="text-sm text-gray-300">/{period === 'year' ? 'Year' : period === 'day' ? 'Day' : 'Month'}</span>
        </div>

        {/* Special quote for each plan */}
        <p className="text-sm text-gray-300 italic mb-4 text-left mt-6 mb-7">
          {getPlanQuote(type)}
        </p>
        
        {/* Divider line after quote */}
        <div className="w-full h-px bg-gray-700 mb-5"></div>

        <ul className="flex-1 space-y-2.5 mb-4">
          {perks.map((perk, i) => (
            <li key={i} className="flex items-start">
              <svg 
                className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${colorScheme.text}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300 text-base">{perk}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-full py-3 px-5 rounded-lg font-bold text-base transition-colors ${colorScheme.button}`}
        >
          Get Started
        </button>
      </div>
    );
  }

  // Mobile view - only shows basic info (no button)
  return (
    <div
      className={`relative flex flex-col p-5 rounded-xl transition-all 
        w-full cursor-pointer mb-3 min-h-[70px]
        ${isSelected 
          ? `border-2 border-[#665bfe] ${colorScheme.bg}` 
          : `border border-black ${colorScheme.bg}`
        }`}
      onClick={onCardClick}
    >
      {/* Selection circle - moved down a bit */}
      <div className="absolute left-4 top-12 flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${isSelected 
            ? 'border-[#665bfe]' 
            : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {isSelected && (
            <div className="w-4 h-4 rounded-full bg-[#665bfe]"></div>
          )}
        </div>
      </div>

      {/* Selection circle and Plan Type on the right */}
      <div className="flex justify-between items-center">
        {/* Empty div to balance the layout */}
        <div className="w-6 h-6"></div>
        
        {/* Plan Type moved to border line */}
        {type && (
          <div className={`absolute -top-2 right-3 text-sm font-bold px-3 py-1.5 rounded-md ${colorScheme.badge}`}>
            {type}
          </div>
        )}
      </div>

      {/* Header with name and price when not selected */}
      {!isSelected && (
        <div className="flex justify-between items-center ml-10">
          <h3 className={`text-base font-bold ${colorScheme.text}`}>
            {name}
          </h3>
          <div className={`flex items-baseline ${colorScheme.text}`}>
            <span className="text-lg font-extrabold mr-1">{price}</span>
            <span className="text-sm text-gray-300">/{period === 'year' ? 'yr' : period === 'day' ? 'day' : 'mo'}</span>
          </div>
        </div>
      )}

      {/* Quote when not selected */}
      {!isSelected && (
        <p className="text-sm text-gray-300 italic mt-2 text-left ml-10">
          "{getPlanQuote(type)}"
        </p>
      )}

      {/* Expanded content if selected */}
      {isSelected && (
        <div className="mt-3 ml-10">
          {/* Name only when selected */}
          <h3 className={`text-base font-bold ${colorScheme.text} mb-3`}>
            {name}
          </h3>
          
          {/* Special quote for each plan */}
          <p className="text-sm text-gray-300 italic mb-4 text-left">
            {getPlanQuote(type)}
          </p>
          
          {/* Divider line after quote */}
          <div className="w-full h-px bg-gray-700 mb-4"></div>

          {/* Price moved below the quote when selected */}
          <div className={`flex items-baseline mb-4 ${colorScheme.text}`}>
            <span className="text-lg font-extrabold mr-1">{price}</span>
            <span className="text-sm text-gray-300">/{period === 'year' ? 'year' : period === 'day' ? 'day' : 'month'}</span>
          </div>

          <ul className="space-y-2">
            {perks.map((perk, i) => (
              <li key={i} className="flex items-start">
                <svg 
                  className={`w-4 h-4 mt-0.5 mr-3 flex-shrink-0 ${colorScheme.text}`}
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
        </div>
      )}
    </div>
  );
}

export type Plan = { id:string, name:string, price:number, currency:string, perks:string[] };