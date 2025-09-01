import { useState, useEffect } from "react";
import { useAuth } from '../../../auth/AuthContext';
// import { useHistory } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import { getPlans } from "../lib/pricing";
import ChemistryIcon from "./icons/chemistry.png";
import PhysicsIcon from "./icons/physics.png";
import MathIcon from "./icons/math.png";
import BiologyIcon from "./icons/biology.png";
import ZoologyIcon from "./icons/zoology.png";
import LoginPanel from "../login";
import Checkout from "./checkout_and_payment/Checkout";

export default function Plans() {
  const { isLoggedIn, login } = useAuth();
  // const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [planType, setPlanType] = useState<"stranded" | "premium">("stranded");
  const [plans, setPlans] = useState(getPlans("IN", "stranded"));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBoardGrade, ] = useState<string | null>("9th-cbse");
  // const [activeTab, setActiveTab] = useState("9th-cbse");
  const [expandedCardId, setExpandedCardId] = useState("");
  const [showCheckout, setShowCheckout] = useState(false); // Added state for checkout modal

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
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
    if (selectedBoardGrade) {
      setSelectedSubjects([]);
      setSelectAll(false);
      setSelectedPlanId(null);
    }
  }, [selectedBoardGrade]);
  
  useEffect(() => {
    if (selectedBoardGrade) {
      const isJee = selectedBoardGrade.includes("jee");
      // const isNeet = selectedBoardGrade.includes("neet");
      
      let maxSubjects = 3; 
      if (selectedBoardGrade.includes("11th") || selectedBoardGrade.includes("12th")) {
        maxSubjects = isJee ? 3 : 4; 
      }
      
      setSelectAll(selectedSubjects.length === maxSubjects);
    }
  }, [selectedSubjects, selectedBoardGrade]);
  
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

  const handleLoginSuccess = (userData: any) => {
    login(userData); // Use the context login function
    setShowLogin(false);
  };

  const handlePlanTypeChange = (type: "stranded" | "premium") => {
    setPlanType(type);
    setSelectedPlanId(null);
    setSelectedSubjects([]);
    setSelectAll(false);
    setExpandedCardId(""); 
  };

  const selectedPlan = selectedPlanId
    ? plans.find((p) => p.id === selectedPlanId)
    : null;

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      const isJee = selectedBoardGrade?.includes("jee");
      // const isNeet = selectedBoardGrade?.includes("neet");
      
      let maxSubjects = 3; 
      if (selectedBoardGrade && (selectedBoardGrade.includes("11th") || selectedBoardGrade.includes("12th"))) {
        maxSubjects = isJee ? 3 : 4; 
      }
      
      if (selectedSubjects.length < maxSubjects) {
        setSelectedSubjects([...selectedSubjects, subject]);
      }
    }
  };

  const toggleSelectAll = () => {
    if (!selectedBoardGrade) return;
    
    const isJee = selectedBoardGrade.includes("jee");
    const isNeet = selectedBoardGrade.includes("neet");
    
    let maxSubjects = 3;
    let availableSubjects = ["Chemistry", "Physics", "Maths"];
    
    if (selectedBoardGrade.includes("11th") || selectedBoardGrade.includes("12th")) {
      if (isJee) {
        maxSubjects = 3;
        availableSubjects = ["Chemistry", "Physics", "Maths"];
      } else if (isNeet) {
        maxSubjects = 4;
        availableSubjects = ["Chemistry", "Physics", "Biology", "Zoology"];
      }
    }
    
    if (selectAll) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(availableSubjects.slice(0, maxSubjects));
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
    if (!selectedPlan || !selectedBoardGrade) return 0;
    
    const subjectCount = selectedSubjects.length;
    const planId = selectedPlan.id;
    const period = getPeriodForDisplay(planId);
    
    if (planType === "stranded") {
      if (period === "day") {
        if (subjectCount === 1) return 199;
        if (subjectCount === 2) return 249;
        if (subjectCount === 3) return 399;
        if (subjectCount === 4) return 499;
        return 599; 
      } else if (period === "month") {
        if (subjectCount === 1) return 3499;
        if (subjectCount === 2) return 4999;
        if (subjectCount === 3) return 7999;
        if (subjectCount === 4) return 9999;
        return 11999; 
      } else if (period === "year") {
        if (subjectCount === 1) return 34999;
        if (subjectCount === 2) return 49999;
        if (subjectCount === 3) return 79999;
        if (subjectCount === 4) return 99999;
        return 119999; 
      }
    } 

    else if (planType === "premium") {
      if (period === "day") {
        if (subjectCount === 1) return 499;
        if (subjectCount === 2) return 799;
        if (subjectCount === 3) return 999;
        if (subjectCount === 4) return 1299;
        return 1499; 
      } else if (period === "month") {
        if (subjectCount === 1) return 9999;
        if (subjectCount === 2) return 16999;
        if (subjectCount === 3) return 19999;
        if (subjectCount === 4) return 24999;
        return 29999; 
      } else if (period === "year") {
        if (subjectCount === 1) return 89999;
        if (subjectCount === 2) return 149999;
        if (subjectCount === 3) return 210000;
        if (subjectCount === 4) return 249999;
        return 299999; 
      }
    }
    
    return 0;
  };

  const calculateTotalPrice = () => {
    return calculateBasePrice();
  };

  const getSubjectPrices = () => {
    if (!selectedPlan || !selectedBoardGrade) return {};
    
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
    if (!selectedPlanId || !selectedPlan || selectedSubjects.length === 0 || !selectedBoardGrade) return;

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
      boardGrade: selectedBoardGrade,
    };

    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    setShowCheckout(true); // Show checkout modal instead of routing
  };

  const handlePlanSelection = (planId: string) => {
    if (!selectedBoardGrade) return;
    
    setSelectedPlanId(planId);
    const isJee = selectedBoardGrade.includes("jee");
    const isNeet = selectedBoardGrade.includes("neet");
    
    if (selectedBoardGrade.includes("9th") || selectedBoardGrade.includes("10th")) {
      setSelectedSubjects(["Chemistry", "Physics", "Maths"]);
    } else if (isJee) {
      setSelectedSubjects(["Chemistry", "Physics", "Maths"]);
    } else if (isNeet) {
      setSelectedSubjects(["Chemistry", "Physics", "Biology", "Zoology"]);
    }
  };
  const isHigherGrade = selectedBoardGrade ? (selectedBoardGrade.includes("11th") || selectedBoardGrade.includes("12th")) : false;
  const isJee = selectedBoardGrade ? selectedBoardGrade.includes("jee") : false;
  const isNeet = selectedBoardGrade ? selectedBoardGrade.includes("neet") : false;
  let maxSubjects = 3; 
  let availableSubjects = ["Chemistry", "Physics", "Maths"];
  
  if (isHigherGrade) {
    if (isJee) {
      maxSubjects = 3;
      availableSubjects = ["Chemistry", "Physics", "Maths"];
    } else if (isNeet) {
      maxSubjects = 4;
      availableSubjects = ["Chemistry", "Physics", "Biology", "Zoology"];
    }
  }

  return (
    <div className={`flex flex-col md:px-4 sm:px-8 xl:px-20 min-h-screen relative mb-20 md:mb-5 ${
      isDarkMode 
        ? "bg-transparent" 
        : "bg-white"
    }`}>
      
      <div className="flex justify-center items-center mt-10 mb-10 space-x-4">
        {(["stranded", "premium"] as const).map((type) => (
          <button
            key={type}
            onClick={() => handlePlanTypeChange(type)}
            className={`px-4 py-2 rounded-2xl font-medium text-sm transition-colors ${
              planType === type
                ? "bg-[#65c7f7] text-[#01486bfc]"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {type === "stranded" ? "Ads Free" : "Premium Model"}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        <div className="flex-1 transition-all duration-300">
          <div className={`p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center md:mb-20 mx-auto max-w-5xl ${
            !isLoggedIn ? "blur-sm opacity-70" : ""
          }`}>
            {plans.map((p, i) => (
              <div key={p.id} className="w-full flex justify-center">
                <PlanCard
                  id={p.id}
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
                  expandedCardId={expandedCardId}
                  setExpandedCardId={setExpandedCardId}
                />
              </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative z-10 bg-white dark:bg-[#000111] p-8 rounded-lg shadow-xl max-w-md w-full mx-4 pointer-events-auto">
                <h2 className={`text-2xl font-semibold mb-6 text-center ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}>
                  Please Login to Select Plans
                </h2>
                <div className="text-center">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="w-52 py-3 bg-[#65c7f7] text-xl text-[#01486bfc] font-medium rounded-xl hover:bg-[#5ab5e0] transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedPlanId && (
            <div className={`mx-auto mb-5 w-full max-w-4xl px-4 ${
              !isLoggedIn ? "blur-sm opacity-70" : ""
            }`}>
              <h2 className={`text-xl font-bold text-center mb-6 text-[#024a6d] ${
                isDarkMode ? "text-white" : "text-[#024a6d]"
              }`}>
               Choose Your Subjects
              </h2>
              

              <div className={`rounded-sm p-6 ${isDarkMode ? "bg-black" : "bg-gray-100"}`}>
                <div className="flex justify-between items-center mb-6">
                               <h3 className={`text-xl font-bold text-center mb-6 text-[#024a6d] ${
                isDarkMode ? "text-[#024a6d]" : "text-[#024a6d]"
              }`}>
                Select Your <span className="text-[14px] text-[#65c7f7]">({selectedSubjects.length}/{maxSubjects} Subjects)</span>
              </h3>
                  {availableSubjects.length > 1 && (
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={toggleSelectAll}
                    >
                      <span className={`text-sm font-semibold mr-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>Select All</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectAll ? 'bg-[#65c7f7] border-[#65c7f7]' : isDarkMode ? 'border-white' : 'border-gray-600'
                      }`}>
                        {selectAll && (
                          <svg className="w-3 h-3 text-white stroke-[#01486bfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`grid ${availableSubjects.length > 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'} gap-4 max-w-${availableSubjects.length > 3 ? '4xl' : 'xl'} mx-auto`}>
                  {availableSubjects.map((subject) => (
                    <SubjectCard
                      key={subject}
                      title={subject}
                      icon={
                        subject === "Chemistry" ? ChemistryIcon :
                        subject === "Physics" ? PhysicsIcon :
                        subject === "Maths" ? MathIcon :
                        subject === "Biology" ? BiologyIcon :
                        ZoologyIcon
                      }
                      isSelected={selectedSubjects.includes(subject)}
                      onClick={() => toggleSubject(subject)}
                      isHovered={hoveredSubject === subject}
                      onHover={() => handleSubjectHover(subject)}
                      onLeave={() => handleSubjectHover(null)}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedPlanId && selectedSubjects.length > 0 && selectedPlan && (
            <div className={`text-center ${!isLoggedIn ? "blur-sm opacity-70" : ""}`}>
              <div className={`text-lg font-bold ${
                isDarkMode ? "text-[#65c7f7]" : "text-gray-800"
              }`}>
                Total Price: {selectedPlan.currency} {calculateTotalPrice()}
              </div>
            
              <div className={`text-lg mt-1 ${
                isDarkMode ? "text-[#65c7f7]" : "text-gray-500"
              }`}>
                {selectedPlan.name} × {selectedSubjects.length} subject
                {selectedSubjects.length > 1 ? "s" : ""} (
                {selectedSubjects.length === 1 && "Single subject pricing"}
                {selectedSubjects.length === 2 && "Dual subjects pricing"}
                {selectedSubjects.length === 3 && "Three subjects pricing"}
                {selectedSubjects.length === 4 && "Four subjects pricing"}
                {selectedSubjects.length === 5 && "All subjects pricing"})
              </div>
              
              <div className="mt-4 text-center mb-5">
                <button
                  onClick={handleCheckout}
                  disabled={selectedSubjects.length === 0}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-colors ${
                    selectedSubjects.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#65c7f7] hover:bg-[#65c7f7] text-[#01486bfc]"
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

        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowLogin(false)}></div>
            <div className="relative z-50">
              <LoginPanel
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>
          </div>
        )}

        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCheckout(false)}></div>
            <div className="relative z-50">
              <Checkout
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
              />
            </div>
          </div>
        )}
      </div>
    
    </div>
  );

  function SubjectCard({
    title,
    icon,
    isSelected = false,
    onClick,
    // isHovered = false,
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
        className={`relative rounded-sm p-4 border-2 shadow-sm transition-all duration-300 cursor-pointer h-32 flex flex-col items-center justify-center ${
          isSelected 
            ? "bg-[#65c7f7] border-[#65c7f7]" 
            : "bg-[#9db2c7] border-gray-200"
        }`}
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Circular Checkbox */}
        <div className="absolute top-3 right-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected 
              ? 'bg-white border-white' 
              : isDarkMode 
                ? 'border-gray-400' 
                : 'border-gray-500'
          }`}>
            {isSelected && (
              <svg className="w-3 h-3 text-[#65c7f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <h3 className={`text-sm font-semibold text-center ${
          isSelected ? "text-white" : "text-[#024a6d]"
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