// Plans.tsx 
import { useState, useEffect } from "react";
import PlanCard from "../components/PlanCard";
import { getPlans } from "../lib/pricing";
import ChemistryIcon from "./icons/chemistry.png";
import PhysicsIcon from "./icons/physics.png";
import MathIcon from "./icons/math.png";

export default function Plans() {
  const [planType, setPlanType] = useState<"stranded" | "premium">("stranded");
  const [plans, setPlans] = useState(getPlans("IN", "stranded"));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode detection

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPlans(getPlans("IN", planType));
  }, [planType]);
  
  useEffect(() => {
    setSelectAll(selectedSubjects.length === 3);
  }, [selectedSubjects]);
  
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handlePlanTypeChange = (type: "stranded" | "premium") => {
    setPlanType(type);
    setSelectedPlanId(null);
    setSelectedSubjects([]);
    setSelectAll(false);
    setShowCheckout(false);
  };

  const selectedPlan = selectedPlanId
    ? plans.find((p) => p.id === selectedPlanId)
    : null;

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(["Chemistry", "Physics", "Maths"]);
    }
    setSelectAll(!selectAll);
  };

  const handleSubjectHover = (subject: string | null) => {
    setHoveredSubject(subject);
  };

  const getPeriodForDisplay = (planId: string) => {
    if (planId.includes("day")) return "day";
    if (planId.includes("year")) return "year";
    return "month";
  };

  const calculateBasePrice = () => {
    if (!selectedPlan) return 0;
    
    const subjectCount = selectedSubjects.length;
    const planId = selectedPlan.id;
    const period = getPeriodForDisplay(planId);
    
    if (planType === "stranded") {
      if (period === "day") {
        if (subjectCount === 1) return 199;
        if (subjectCount === 2) return 249;
        return 399; 
      } else if (period === "month") {
        if (subjectCount === 1) return 3499;
        if (subjectCount === 2) return 4999;
        return 7999; 
      } else if (period === "year") {
        if (subjectCount === 1) return 34999;
        if (subjectCount === 2) return 49999;
        return 79999; 
      }
    } 

    else if (planType === "premium") {
      if (period === "day") {
        if (subjectCount === 1) return 499;
        if (subjectCount === 2) return 799;
        return 999; 
      } else if (period === "month") {
        if (subjectCount === 1) return 9999;
        if (subjectCount === 2) return 16999;
        return 19999; 
      } else if (period === "year") {
        if (subjectCount === 1) return 89999;
        if (subjectCount === 2) return 149999;
        return 210000; 
      }
    }
    
    return 0;
  };

  const calculateTotalPrice = () => {
    return calculateBasePrice();
  };

  const getSubjectPrices = () => {
    if (!selectedPlan) return {};
    
    const subjectCount = selectedSubjects.length;
    const basePrice = calculateBasePrice();
    
    if (subjectCount === 1) {
      return { [selectedSubjects[0]]: basePrice };
    }
    
    const prices: { [key: string]: number } = {};
    const pricePerSubject = Math.floor(basePrice / subjectCount);
    
    selectedSubjects.forEach((subject, index) => {
      if (index === subjectCount - 1) {
        prices[subject] = basePrice - (pricePerSubject * (subjectCount - 1));
      } else {
        prices[subject] = pricePerSubject;
      }
    });
    
    return prices;
  };

  const handleCheckout = () => {
    if (!selectedPlanId || !selectedPlan || selectedSubjects.length === 0) return;

    const checkoutData = {
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.name,
        price: calculateBasePrice(),
        currency: selectedPlan.currency,
        period: getPeriodForDisplay(selectedPlan.id),
      },
      subjects: selectedSubjects,
      subjectPrices: getSubjectPrices(),
      totalPrice: calculateTotalPrice(),
    };

    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handlePlanSelection = (planId: string) => {
    setSelectedPlanId(planId);
    // Initially select all subjects when a plan is selected
    setSelectedSubjects(["Chemistry", "Physics", "Maths"]);
  };

  return (
    <div className={`flex flex-col md:px-4 lg:px-8 xl:px-20 min-h-screen relative ${
      isDarkMode 
        ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" 
        : "bg-white"
    }`}>
      <div className="flex justify-center items-center mt-4 mb-16 space-x-4">
        {(["stranded", "premium"] as const).map((type) => (
          <button
            key={type}
            onClick={() => handlePlanTypeChange(type)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              planType === type
                ? "bg-[#123a66] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {type === "stranded" ? "Ad Free" : "Premium Model"}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        <div
          className={`flex-1 transition-all duration-300 ${
            showCheckout ? "blur-sm opacity-70" : ""
          }`}
        >
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center md:mb-20 mx-auto max-w-screen-2xl">
            {plans.map((p, i) => (
              <div key={p.id} className="w-full flex justify-center">
                <PlanCard
                  name={p.name}
                  price={`${p.currency} ${p.price}`}
                  originalPrice={p.originalPrice}
                  discountText={p.discountText}
                  period={getPeriodForDisplay(p.id)}
                  perks={p.perks}
                  popular={i === 2}
                  onSelect={() => handlePlanSelection(p.id)}
                  onCardClick={() => handlePlanSelection(p.id)}
                  isSelected={selectedPlanId === p.id}
                  type={getPlanType(p.name)}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {selectedPlanId && !showCheckout && (
            <div className="mx-auto mb-12 w-full max-w-4xl px-4">
              <h2 className={`text-2xl font-bold text-center mb-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Select Your Subjects ({selectedSubjects.length}/3 subjects)
              </h2>

              <div className={`rounded-lg p-6 ${isDarkMode ? "bg-black" : "bg-gray-100"}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    Choose Your Subjects
                  </h3>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={toggleSelectAll}
                  >
                    <span className={`text-sm mr-2 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}>Select All</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectAll ? 'bg-[#665bfe] border-[#665bfe]' : isDarkMode ? 'border-white' : 'border-gray-600'
                    }`}>
                      {selectAll && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <SubjectCard
                    title="Chemistry"
                    icon={ChemistryIcon}
                    isSelected={selectedSubjects.includes("Chemistry")}
                    onClick={() => toggleSubject("Chemistry")}
                    isHovered={hoveredSubject === "Chemistry"}
                    onHover={() => handleSubjectHover("Chemistry")}
                    onLeave={() => handleSubjectHover(null)}
                    isDarkMode={isDarkMode}
                  />
                  <SubjectCard
                    title="Physics"
                    icon={PhysicsIcon}
                    isSelected={selectedSubjects.includes("Physics")}
                    onClick={() => toggleSubject("Physics")}
                    isHovered={hoveredSubject === "Physics"}
                    onHover={() => handleSubjectHover("Physics")}
                    onLeave={() => handleSubjectHover(null)}
                    isDarkMode={isDarkMode}
                  />
                  <SubjectCard
                    title="Maths"
                    icon={MathIcon}
                    isSelected={selectedSubjects.includes("Maths")}
                    onClick={() => toggleSubject("Maths")}
                    isHovered={hoveredSubject === "Maths"}
                    onHover={() => handleSubjectHover("Maths")}
                    onLeave={() => handleSubjectHover(null)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              {selectedSubjects.length > 0 && selectedPlan && (
                <div className="mt-6 text-center">
                  <div className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    Total Price: {selectedPlan.currency} {calculateTotalPrice()}
                  </div>
                  <div className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {selectedPlan.name} × {selectedSubjects.length} subject
                    {selectedSubjects.length > 1 ? "s" : ""}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {selectedSubjects.length === 1 && "Single subject pricing"}
                    {selectedSubjects.length === 2 && "Dual subjects pricing"}
                    {selectedSubjects.length === 3 && "All subjects pricing"}
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  onClick={handleCheckout}
                  disabled={selectedSubjects.length === 0}
                  className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                    selectedSubjects.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#123a66] hover:bg-[#123a66] text-white"
                  }`}
                >
                  {selectedSubjects.length > 0 && selectedPlan
                    ? `Continue to Checkout (${
                        selectedPlan.currency
                      } ${calculateTotalPrice()})`
                    : "Continue to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>

        {showCheckout && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={handleCloseCheckout}
            ></div>

            <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 h-full bg-white dark:bg-black overflow-hidden">
              <div className="h-full flex flex-col">
                <button
                  onClick={handleCloseCheckout}
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <CheckoutPanel
                  checkoutData={{
                    plan: {
                      ...selectedPlan!,
                      price: calculateBasePrice()
                    },
                    subjects: selectedSubjects,
                    subjectPrices: getSubjectPrices(),
                    totalPrice: calculateTotalPrice(),
                  }}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function CheckoutPanel({ checkoutData, isDarkMode }: { checkoutData: any; isDarkMode: boolean }) {
    const { plan, subjects, subjectPrices, totalPrice } = checkoutData;

    return (
      <div className={`flex flex-col h-full p-6 overflow-hidden ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}>
        <h1 className={`text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
          Checkout
        </h1>

        <h2 className={`text-lg md:text-xl font-semibold mb-4 md:mb-6 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>Order Summary</h2>

        <div className="mb-4 md:mb-6">
          <h3 className={`text-base md:text-lg font-medium mb-2 md:mb-3 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>Plan</h3>
          <div className={`rounded-lg p-3 md:p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-white" : "text-gray-800"}>{plan.name}</span>
              <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                {plan.currency} {plan.price}
              </span>
            </div>
            <div className={`text-xs md:text-sm mt-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
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
          <h3 className={`text-base md:text-lg font-medium mb-2 md:mb-3 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>Subjects</h3>
          <div className="space-y-2">
            {subjects.map((subject: string, index: number) => (
              <div
                key={index}
                className={`flex justify-between items-center rounded-lg p-2 md:p-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <span className={isDarkMode ? "text-white" : "text-gray-800"}>{subject}</span>
                <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                  {plan.currency} {subjectPrices[subject]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className={`border-t pt-3 md:pt-4 mt-auto ${
          isDarkMode ? "border-gray-600" : "border-gray-300"
        }`}>
          <div className="flex justify-between items-center">
            <span className={`text-base md:text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}>Total</span>
            <span className={`text-base md:text-lg font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}>
              {plan.currency} {totalPrice}
            </span>
          </div>
        </div>

        <button className="w-full bg-[#665bfe] hover:bg-[#5a50e5] text-white font-bold py-2 md:py-3 px-4 rounded-lg mt-4 md:mt-6 transition-colors">
          Complete Purchase
        </button>
      </div>
    );
  }

  function SubjectCard({
    title,
    icon,
    isSelected = false,
    onClick,
    isHovered = false,
    onHover,
    onLeave,
    isDarkMode,
  }: {
    title: string;
    icon: string;
    isSelected?: boolean;
    onClick: () => void;
    isHovered?: boolean;
    onHover: () => void;
    onLeave: () => void;
    isDarkMode: boolean;
  }) {
    return (
      <div
        className={`relative rounded-lg p-4 border-2 shadow-sm transition-all duration-300 cursor-pointer h-32 flex flex-col items-center justify-center ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Circular Checkbox */}
        <div className="absolute top-3 right-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected 
              ? 'bg-[#665bfe] border-[#665bfe]' 
              : isDarkMode 
                ? 'border-gray-400' 
                : 'border-gray-500'
          }`}>
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="w-12 h-12 mb-2 transition-transform duration-300 transform hover:scale-110 flex items-center justify-center">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className={`text-lg font-semibold text-center ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
          {title}
        </h3>
      </div>
    );
  }

  function getPlanType(name: string): string {
    if (name.toLowerCase().includes("free")) return "Intro";
    if (name.toLowerCase().includes("day pass")) return "Experience";
    if (name.toLowerCase().includes("stranded")) return "Essential";
    if (name.toLowerCase().includes("premium")) return "Premium";
    return "";
  }
}

export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  perks: string[];
};