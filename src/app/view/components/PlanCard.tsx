// import { useState } from "react";

type Props = {
  id: string;
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
  isDropdownOpen?: boolean;
  onToggleDropdown?: (id: string) => void;
  expandedCardId?: string;
  setExpandedCardId?: (id: string) => void;
};

export default function PlanCard({
  id,
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
  isDropdownOpen = false,
  onToggleDropdown = () => {},
  expandedCardId = "",
  setExpandedCardId = () => {},
}: Props) {
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
          badge: "bg-[#65c7f7] text-[#01486bfc]",
          hover: "hover:border-[#] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-[#01486bfc] hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      case "Essential":
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-blue-500 text-white",
          hover: "hover:border-[#] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-[#01486bfc] hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      case "Experience":
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-[#65c7f7] text-[#01486bfc]",
          hover: "hover:border-[#] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-[#01486bfc] hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
      default:
        return {
          border: "border-black",
          bg: "bg-black",
          text: "text-white",
          badge: "bg-[#65c7f7] text-[#01486bfc]",
          hover: "hover:border-[] hover:shadow-black",
          active:
            "active:scale-95 active:border-[#65c7f7] active:shadow-black",
          button: "bg-[#65c7f7] text-[#01486bfc] hover:bg-[#65c7f7]",
          dropdown: "bg-gray-800 text-white"
        };
    }
  };

  const colorScheme = getColorScheme(type);

  const isStandardPlan = name.toLowerCase().includes("standard ");
  const displayAsPopular = popular && !isStandardPlan;

  const isDayPass = name.toLowerCase().includes("day") || period === "day";
  const isFreePlan = name.toLowerCase().includes("free") || price.includes("0");
  const showRecommendedBadge =
    period === "month" && !isDayPass && !isFreePlan;

  const selectedStyles = isSelected
    ? `scale-105 border-2 border-blue-500 shadow-[20px] ${colorScheme.bg}`
    : `border border-black ${colorScheme.bg}`;

  const isPerksExpanded = isMobile ? expandedCardId === id : true;

  const handleCardClick = () => {
    if (isMobile) {
      if (showClassCategory) {
        onToggleDropdown(isDropdownOpen ? "" : id);
      } else {
        // Toggle this card's expansion state
        if (expandedCardId === id) {
          setExpandedCardId(""); // Collapse if already expanded
        } else {
          setExpandedCardId(id); // Expand this card
        }
      }
      if (onCardClick) {
        onCardClick();
      }
    } else {
      // Desktop selection logic
      if (onCardClick) {
        onCardClick();
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col p-6 rounded-[20px] transition-all mb 
        w-full max-w-[320px] mx-auto cursor-pointer 
        ${isMobile ? "min-h-[120px]" : "min-h-[480px]"}
        transform ${isMobile ? "" : "hover:scale-105"} duration-300
        ${selectedStyles}
        ${
          displayAsPopular
            ? "border-black bg-black shadow-lg"
            : `${colorScheme.hover} ${colorScheme.active} hover:shadow-[20px] dark:hover:shadow-[20px]`
        }`}
      onClick={handleCardClick}
    >
      {isMobile && (
        <div className="absolute top-4 left-4 ">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              if (onCardClick) onCardClick();
            }}
            className="w-4 h-4 rounded-full appearance-none border-2 border-gray-400 checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition"
          />
        </div>
      )}

      {!isMobile && isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-4 h-4 rounded-full bg-[#65c7f7] flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      {showRecommendedBadge && (
        <div
          className={`absolute -top-3 left-3 text-[12px] font-bold px-2 py-1 rounded-md ${colorScheme.badge}`}
        >
          Recommended
        </div>
      )}

      <div className="flex items-start justify-between">
        <h3 className={`text-base font-bold mt-2 mb-3 ${colorScheme.text} ${isMobile ? "pl-7" : ""}`}>
          {name}
        </h3>
      </div>

      <div className={`flex items-baseline mb-1 ${colorScheme.text}`}>
        <span className="text-[22px] text-[#65c7f7] font-bold mr-1">{price}</span>
        <span className="text-[12px] text-gray-300">
          /{period === "year" ? "Year" : period === "day" ? "Day" : "Month"}
        </span>
      </div>

      {originalPrice && (
        <div className="mb-1">
          <span className="text-[14px] text-gray-400 line-through mr-2">
            {price.split(" ")[0]} {originalPrice}
          </span>
          <span className="text-[12px] text-green-400 font-semibold">
            {Math.round(
              (1 - parseInt(price.split(" ")[1]) / originalPrice) * 100
            )}
            % off
          </span>
        </div>
      )}

      {discountText && (
        <div className="mb-2">
          <span className="text-[13px] text-green-400 font-semibold">
            {discountText}
          </span>
        </div>
      )}

      {(!isMobile || isPerksExpanded || (isMobile && showClassCategory)) && (
        <>
          <p className="text-[13px] text-gray-300 italic mb-3 text-left mt-4">
            {getPlanQuote(type)}
          </p>

          {showClassCategory && (
            <div className="mb-4 relative">
              <div 
                className={`w-full py-2 px-3 rounded-lg text-[10px] ${colorScheme.dropdown} border border-gray-700 flex justify-between items-center cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleDropdown(isDropdownOpen ? "" : id);
                }}
              >
                <span>{selectedClassCategory || "Select Class Category"}</span>
              </div>
              
              {isDropdownOpen && (
                <div 
                  className={`absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-10 shadow-lg ${colorScheme.dropdown} border border-gray-700`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {classCategories.map((category) => (
                    <div
                      key={category}
                      className={`px-3 py-2 text-[12px] cursor-pointer hover:bg-gray-700 ${
                        selectedClassCategory === category ? "bg-gray-700" : ""
                      }`}
                      onClick={() => {
                        onClassCategoryChange(category);
                        onToggleDropdown("");
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
                  className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 bg-[#65c7f7] stroke-[#01486bfc] rounded-full p-0.5 ${colorScheme.text}`}
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
                <span className="text-gray-300 text-[14px]">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Only show Get Started button on desktop */}
          {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className={`w-full py-2 px-4 rounded-lg font-bold text-[14px] transition-colors ${colorScheme.button}`}
            >
              Get Started
            </button>
          )}
        </>
      )}
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