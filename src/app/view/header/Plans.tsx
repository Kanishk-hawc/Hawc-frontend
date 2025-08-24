// // Plans.tsx
// import { useState, useEffect } from 'react';
// import PlanCard from '../components/PlanCard';
// import { getPlans } from '../lib/pricing';
// import { useHistory } from 'react-router-dom';

// export default function Plans() {
//   const history = useHistory();
//   const [planType, setPlanType] = useState<'stranded' | 'premium'>('stranded');
//   const [plans, setPlans] = useState(getPlans('IN', 'stranded'));
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
//   const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  
//   // Update plans when plan type changes
//   useEffect(() => {
//     setPlans(getPlans('IN', planType));
//   }, [planType]);
  
//   // Set no plan as initially selected
//   const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//     };
//   }, []);

//   // Handle plan type change
//   const handlePlanTypeChange = (type: 'stranded' | 'premium') => {
//     setPlanType(type);
//     // Reset selection when plan type changes
//     setSelectedPlanId(null);
//     setSelectedSubjects([]);
//   };

//   // Find the selected plan
//   const selectedPlan = selectedPlanId ? plans.find(p => p.id === selectedPlanId) : null;

//   // Toggle subject selection
//   const toggleSubject = (subject: string) => {
//     if (subject === 'All Subjects') {
//       setSelectedSubjects(['All Subjects']);
//     } else {
//       if (selectedSubjects.includes(subject)) {
//         setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
//       } else {
//         // Remove 'All Subjects' if any individual subject is selected
//         const newSubjects = selectedSubjects.filter(s => s !== 'All Subjects');
//         setSelectedSubjects([...newSubjects, subject]);
//       }
//     }
//   };

//   // Handle subject hover
//   const handleSubjectHover = (subject: string | null) => {
//     setHoveredSubject(subject);
//   };

//   // Determine period for display based on plan ID
//   const getPeriodForDisplay = (planId: string) => {
//     if (planId === 'day') return 'day';
//     if (planId.includes('year')) return 'year';
//     return 'month';
//   };

//   // Calculate total price based on selected plan and subjects
//   const calculateTotalPrice = () => {
//     if (!selectedPlan) return 0;
    
//     const basePrice = selectedPlan.price;
//     const subjectCount = selectedSubjects.includes('All Subjects') ? 3 : selectedSubjects.length;
    
//     return basePrice * subjectCount;
//   };

//   // Calculate individual subject prices
//   const getSubjectPrices = () => {
//     if (!selectedPlan) return {};
    
//     const basePrice = selectedPlan.price;
//     const prices: { [key: string]: number } = {};
    
//     selectedSubjects.forEach(subject => {
//       prices[subject] = basePrice;
//     });
    
//     return prices;
//   };

//   // Handle checkout
//   const handleCheckout = () => {
//     if (!selectedPlanId || !selectedPlan) return;
    
//     // Prepare checkout data
//     const checkoutData = {
//       plan: {
//         id: selectedPlan.id,
//         name: selectedPlan.name,
//         price: selectedPlan.price,
//         currency: selectedPlan.currency,
//         period: getPeriodForDisplay(selectedPlan.id)
//       },
//       subjects: selectedSubjects,
//       subjectPrices: getSubjectPrices(),
//       totalPrice: calculateTotalPrice()
//     };
    
//     // Store in sessionStorage to pass to checkout page
//     sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
//     history.push('/checkout');
//   };

//   return (
//     <div className="flex flex-col bg-white dark:bg-[#091E37] md:px-40 min-h-screen">
//       {/* Plan type selection - Reduced margins */}
//       <div className="flex justify-center items-center mt-4 mb-2 space-x-4">
//         {(['stranded', 'premium'] as const).map((type) => (
//           <button
//             key={type}
//             onClick={() => handlePlanTypeChange(type)}
//             className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
//               planType === type
//                 ? 'bg-[#665bfe] text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//             }`}
//           >
//             {type === 'stranded' ? 'Ad Free' : 'Premium'}
//           </button>
//         ))}
//       </div>

//       {/* Reduced padding and margins for mobile */}
//       <div className={`${isMobile ? 'p-2' : 'p-4'} grid ${isMobile ? 'grid-cols-1 gap-1' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'} ${isMobile ? 'mx-2' : 'mx-4 md:mx-16 lg:mx-32 xl:mx-64'} ${isMobile ? 'my-2' : 'my-8 md:my-16 lg:my-24 xl:my-36'}`}>
//         {plans.map((p, i) => (
//           <div key={p.id} className={isMobile ? '' : 'px-1'}>
//             <PlanCard
//               name={p.name}
//               price={`${p.currency} ${p.price}`}
//               period={getPeriodForDisplay(p.id)}
//               perks={p.perks}
//               popular={i === 2}
//               onSelect={() => setSelectedPlanId(p.id)}
//               onCardClick={() => setSelectedPlanId(p.id)}
//               isSelected={selectedPlanId === p.id}
//               type={getPlanType(p.name)}
//               isMobile={isMobile}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Subject selection section - Only show when a plan is selected */}
//       {selectedPlanId && (
//         <div className="mx-auto mb-12 w-full max-w-4xl px-4">
//           <h2 className="text-2xl font-bold text-center text-white mb-6">
//             Select Your Subjects
//           </h2>
          
//           {/* Wrapper div with black background */}
//           <div className="bg-black rounded-lg p-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Individual Subjects */}
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
//                   Subjects
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <SubjectCard 
//                     title="Chemistry" 
//                     icon="⚗️"
//                     isSelected={selectedSubjects.includes('Chemistry')}
//                     onClick={() => toggleSubject('Chemistry')}
//                     isHovered={hoveredSubject === 'Chemistry'}
//                     onHover={() => handleSubjectHover('Chemistry')}
//                     onLeave={() => handleSubjectHover(null)}
//                   />
//                   <SubjectCard 
//                     title="Physics" 
//                     icon="🌌"
//                     isSelected={selectedSubjects.includes('Physics')}
//                     onClick={() => toggleSubject('Physics')}
//                     isHovered={hoveredSubject === 'Physics'}
//                     onHover={() => handleSubjectHover('Physics')}
//                     onLeave={() => handleSubjectHover(null)}
//                   />
//                   <SubjectCard 
//                     title="Maths" 
//                     icon="🧮"
//                     isSelected={selectedSubjects.includes('Maths')}
//                     onClick={() => toggleSubject('Maths')}
//                     isHovered={hoveredSubject === 'Maths'}
//                     onHover={() => handleSubjectHover('Maths')}
//                     onLeave={() => handleSubjectHover(null)}
//                   />
//                 </div>
//               </div>
              
//               {/* All Subjects */}
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
//                   Complete Access
//                 </h3>
//                 <SubjectCard 
//                   title="All Subjects" 
//                   icon="📚"
//                     isSelected={selectedSubjects.includes('All Subjects')}
//                     onClick={() => toggleSubject('All Subjects')}
//                     isAllSubjects={true}
//                     isHovered={hoveredSubject === 'All Subjects'}
//                     onHover={() => handleSubjectHover('All Subjects')}
//                     onLeave={() => handleSubjectHover(null)}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Price calculation display */}
//             {selectedSubjects.length > 0 && selectedPlan && (
//               <div className="mt-6 text-center">
//                 <div className="text-white text-lg font-semibold">
//                   Total Price: {selectedPlan.currency} {calculateTotalPrice()}
//                 </div>
//                 <div className="text-gray-300 text-sm mt-1">
//                   {selectedPlan.name} ({selectedPlan.currency} {selectedPlan.price}) × 
//                   {selectedSubjects.includes('All Subjects') ? ' 3 subjects' : ` ${selectedSubjects.length} subject${selectedSubjects.length > 1 ? 's' : ''}`}
//                 </div>
//               </div>
//             )}

//             {/* Continue to Checkout Button */}
//             <div className="mt-8 text-center">
//               <button
//                 onClick={handleCheckout}
//                 disabled={selectedSubjects.length === 0}
//                 className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
//                   selectedSubjects.length === 0
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-[#665bfe] hover:bg-[#5a50e5] text-white'
//                 }`}
//               >
//                 Continue to Checkout
//               </button>
//             </div>
//           </div>
//         )}

//         {/* REMOVED: Common button for mobile only - reduced spacing */}
//         {/* This section has been completely removed as requested */}
//       </div>
//     );
//   }

//   // Subject Card Component
//   function SubjectCard({ 
//     title, 
//     icon, 
//     isSelected = false, 
//     onClick,
//     isAllSubjects = false,
//     isHovered = false,
//     onHover,
//     onLeave
//   }: { 
//     title: string, 
//     icon: string, 
//     isSelected?: boolean,
//     onClick: () => void,
//     isAllSubjects?: boolean,
//     isHovered?: boolean,
//     onHover: () => void,
//     onLeave: () => void
//   }) {
//     // Determine card styles based on selection and hover state
//     const getCardStyles = () => {
//       if (isSelected) {
//         return 'border-[#665bfe] bg-[#665bfe]/20 transform scale-105';
//       }
//       if (isHovered) {
//         return 'border-[#665bfe] bg-[#665bfe]/10 transform scale-105';
//       }
//       return 'border-gray-600 bg-gray-900';
//     };

//     // Determine text color based on selection and hover state
//     const getTextColor = () => {
//       if (isSelected || isHovered) {
//         return 'text-[#665bfe]';
//       }
//       return 'text-white';
//     };

//     return (
//       <div 
//         className={`rounded-lg p-4 border-2 shadow-sm transition-all duration-300 cursor-pointer ${isAllSubjects ? 'h-40' : 'h-32'} flex flex-col items-center justify-center ${getCardStyles()}`}
//         onClick={onClick}
//         onMouseEnter={onHover}
//         onMouseLeave={onLeave}
//       >
//         <div className="text-4xl mb-2 transition-transform duration-300 transform hover:scale-110">
//           {icon}
//         </div>
//         <h3 className={`text-lg font-semibold text-center transition-colors duration-300 ${getTextColor()}`}>
//           {title}
//         </h3>
//         {isAllSubjects && (
//           <p className="text-sm text-gray-400 mt-2 text-center transition-colors duration-300">
//             Access to all subjects including future additions
//           </p>
//         )}
//       </div>
//     );
//   }

//   function getPlanType(name: string): string {
//     if (name.toLowerCase().includes('free')) return 'Intro';
//     if (name.toLowerCase().includes('day pass')) return 'Experience';
//     if (name.toLowerCase().includes('stranded')) return 'Essential';
//     if (name.toLowerCase().includes('premium')) return 'Premium';
//     return '';
//   }

//   function getButtonColor(planType: string): string {
//     switch (planType) {
//       case 'Premium':
//         return 'bg-[#665bfe] hover:bg-[#5a50e5] text-white';
//       case 'Essential':
//         return 'bg-[#665bfe] hover:bg-[#5a50e5] text-white';
//       case 'Experience':
//         return 'bg-[#665bfe] hover:bg-[#5a50e5] text-white';
//     default:
//         return 'bg-[#665bfe] hover:bg-[#5a50e5] text-white';
//     }
//   }

//   export type Plan = { id:string, name:string, price:number, currency:string, perks:string[] };






// Plans.tsx - Updated with custom icons
import { useState, useEffect } from 'react';
import PlanCard from '../components/PlanCard';
import { getPlans } from '../lib/pricing';

// Import the icons
import AllSubjectsIcon from './icons/all-subjects.png';
import ChemistryIcon from './icons/chemistry.png';
import PhysicsIcon from './icons/physics.png';
import MathIcon from './icons/math.png';

export default function Plans() {
  const [planType, setPlanType] = useState<'stranded' | 'premium'>('stranded');
  const [plans, setPlans] = useState(getPlans('IN', 'stranded'));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Update plans when plan type changes
  useEffect(() => {
    setPlans(getPlans('IN', planType));
  }, [planType]);
  
  // Set no plan as initially selected
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle plan type change
  const handlePlanTypeChange = (type: 'stranded' | 'premium') => {
    setPlanType(type);
    // Reset selection when plan type changes
    setSelectedPlanId(null);
    setSelectedSubjects([]);
    setShowCheckout(false);
  };

  // Find the selected plan
  const selectedPlan = selectedPlanId ? plans.find(p => p.id === selectedPlanId) : null;

  // Toggle subject selection
  const toggleSubject = (subject: string) => {
    if (subject === 'All Subjects') {
      setSelectedSubjects(['All Subjects']);
    } else {
      if (selectedSubjects.includes(subject)) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
      } else {
        // Remove 'All Subjects' if any individual subject is selected
        const newSubjects = selectedSubjects.filter(s => s !== 'All Subjects');
        setSelectedSubjects([...newSubjects, subject]);
      }
    }
  };

  // Handle subject hover
  const handleSubjectHover = (subject: string | null) => {
    setHoveredSubject(subject);
  };

  // Determine period for display based on plan ID
  const getPeriodForDisplay = (planId: string) => {
    if (planId === 'day') return 'day';
    if (planId.includes('year')) return 'year';
    return 'month';
  };

  // Calculate total price based on selected plan and subjects
  const calculateTotalPrice = () => {
    if (!selectedPlan) return 0;
    
    const basePrice = selectedPlan.price;
    const subjectCount = selectedSubjects.includes('All Subjects') ? 3 : selectedSubjects.length;
    
    return basePrice * subjectCount;
  };

  // Calculate individual subject prices
  const getSubjectPrices = () => {
    if (!selectedPlan) return {};
    
    const basePrice = selectedPlan.price;
    const prices: { [key: string]: number } = {};
    
    selectedSubjects.forEach(subject => {
      prices[subject] = basePrice;
    });
    
    return prices;
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!selectedPlanId || !selectedPlan) return;
    
    // Prepare checkout data
    const checkoutData = {
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.name,
        price: selectedPlan.price,
        currency: selectedPlan.currency,
        period: getPeriodForDisplay(selectedPlan.id)
      },
      subjects: selectedSubjects,
      subjectPrices: getSubjectPrices(),
      totalPrice: calculateTotalPrice()
    };
    
    // Store in sessionStorage to pass to checkout page
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Show checkout panel instead of navigating
    setShowCheckout(true);
  };

  // Handle checkout close
  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-[#091E37] md:px-20 min-h-screen relative">
      {/* Plan type selection - Reduced margins */}
      <div className="flex justify-center items-center mt-4 mb-2 space-x-4">
        {(['stranded', 'premium'] as const).map((type) => (
          <button
            key={type}
            onClick={() => handlePlanTypeChange(type)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              planType === type
                ? 'bg-[#665bfe] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {type === 'stranded' ? 'Ad Free' : 'Premium'}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Plans section - will blur when checkout is open */}
        <div className={`flex-1 transition-all duration-300 ${showCheckout ? 'blur-sm opacity-70' : ''}`}>
          {/* Reduced padding and margins for mobile */}
          <div className={`${isMobile ? 'p-2' : 'p-4'} grid ${isMobile ? 'grid-cols-1 gap-1' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'} ${isMobile ? 'mx-2' : 'mx-4 md:mx-16 lg:mx-32 xl:mx-64'} ${isMobile ? 'my-2' : 'my-8 md:my-16 lg:my-24 xl:my-36'}`}>
            {plans.map((p, i) => (
              <div key={p.id} className={isMobile ? '' : 'px-1'}>
                <PlanCard
                  name={p.name}
                  price={`${p.currency} ${p.price}`}
                  period={getPeriodForDisplay(p.id)}
                  perks={p.perks}
                  popular={i === 2}
                  onSelect={() => setSelectedPlanId(p.id)}
                  onCardClick={() => setSelectedPlanId(p.id)}
                  isSelected={selectedPlanId === p.id}
                  type={getPlanType(p.name)}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* Subject selection section - Only show when a plan is selected */}
          {selectedPlanId && !showCheckout && (
            <div className="mx-auto mb-12 w-full max-w-4xl px-4">
              <h2 className="text-2xl font-bold text-center text-white mb-6">
                Select Your Subjects
              </h2>
              
              {/* Wrapper div with black background */}
              <div className="bg-black rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Individual Subjects */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
                      Subjects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SubjectCard 
                        title="Chemistry" 
                        icon={ChemistryIcon}
                        isSelected={selectedSubjects.includes('Chemistry')}
                        onClick={() => toggleSubject('Chemistry')}
                        isHovered={hoveredSubject === 'Chemistry'}
                        onHover={() => handleSubjectHover('Chemistry')}
                        onLeave={() => handleSubjectHover(null)}
                      />
                      <SubjectCard 
                        title="Physics" 
                        icon={PhysicsIcon}
                        isSelected={selectedSubjects.includes('Physics')}
                        onClick={() => toggleSubject('Physics')}
                        isHovered={hoveredSubject === 'Physics'}
                        onHover={() => handleSubjectHover('Physics')}
                        onLeave={() => handleSubjectHover(null)}
                      />
                      <SubjectCard 
                        title="Maths" 
                        icon={MathIcon}
                        isSelected={selectedSubjects.includes('Maths')}
                        onClick={() => toggleSubject('Maths')}
                        isHovered={hoveredSubject === 'Maths'}
                        onHover={() => handleSubjectHover('Maths')}
                        onLeave={() => handleSubjectHover(null)}
                      />
                    </div>
                  </div>
                  
                  {/* All Subjects */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
                      Complete Access
                    </h3>
                    <SubjectCard 
                      title="All Subjects" 
                      icon={AllSubjectsIcon}
                      isSelected={selectedSubjects.includes('All Subjects')}
                      onClick={() => toggleSubject('All Subjects')}
                      isAllSubjects={true}
                      isHovered={hoveredSubject === 'All Subjects'}
                      onHover={() => handleSubjectHover('All Subjects')}
                      onLeave={() => handleSubjectHover(null)}
                    />
                  </div>
                </div>
              </div>

              {/* Price calculation display */}
              {selectedSubjects.length > 0 && selectedPlan && (
                <div className="mt-6 text-center">
                  <div className="text-white text-lg font-semibold">
                    Total Price: {selectedPlan.currency} {calculateTotalPrice()}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">
                    {selectedPlan.name} ({selectedPlan.currency} {selectedPlan.price}) × 
                    {selectedSubjects.includes('All Subjects') ? ' 3 subjects' : ` ${selectedSubjects.length} subject${selectedSubjects.length > 1 ? 's' : ''}`}
                  </div>
                </div>
              )}

              {/* Continue to Checkout Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleCheckout}
                  disabled={selectedSubjects.length === 0}
                  className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                    selectedSubjects.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#665bfe] hover:bg-[#5a50e5] text-white'
                  }`}
                >
                  {selectedSubjects.length > 0 && selectedPlan 
                    ? `Continue to Checkout (${selectedPlan.currency} ${calculateTotalPrice()})`
                    : 'Continue to Checkout'
                  }
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Panel - Slides in from right */}
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={handleCloseCheckout}
            ></div>
            
            {/* Checkout Panel */}
            <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 h-full bg-white dark:bg-black overflow-y-auto">
              <div className="p-6">
                {/* Close button */}
                <button
                  onClick={handleCloseCheckout}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Checkout content */}
                <CheckoutPanel 
                  checkoutData={{
                    plan: selectedPlan!,
                    subjects: selectedSubjects,
                    subjectPrices: getSubjectPrices(),
                    totalPrice: calculateTotalPrice()
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Checkout Panel Component
  function CheckoutPanel({ checkoutData }: { checkoutData: any }) {
    const { plan, subjects, subjectPrices, totalPrice } = checkoutData;

    return (
      <div className="flex flex-col h-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Checkout
        </h1>
        
        <h2 className="text-xl font-semibold mb-6 text-white">
          Order Summary
        </h2>
        
        {/* Plan Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-white">Plan</h3>
          <div className="rounded-lg p-4 bg-gray-800">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{plan.name}</span>
              <span className="text-white">{plan.currency} {plan.price}</span>
            </div>
            <div className="text-sm mt-1 text-gray-300">
              {plan.period === 'day' ? 'Daily' : plan.period === 'year' ? 'Yearly' : 'Monthly'} access
            </div>
          </div>
        </div>

        {/* Subjects Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-white">Subjects</h3>
          <div className="space-y-2">
            {subjects.map((subject: string, index: number) => (
              <div key={index} className="flex justify-between items-center rounded-lg p-3 bg-gray-800">
                <span className="text-white">{subject}</span>
                <span className="text-white">{plan.currency} {subjectPrices[subject]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer to push content up */}
        <div className="flex-grow"></div>

        {/* Total */}
        <div className="border-t border-gray-600 mt-[60%] pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className="text-lg font-bold text-white">{plan.currency} {totalPrice}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-[#665bfe] hover:bg-[#5a50e5] text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors">
          Complete Purchase
        </button>
      </div>
    );
  }

  // Subject Card Component - Updated to use image icons
  function SubjectCard({ 
    title, 
    icon, 
    isSelected = false, 
    onClick,
    isAllSubjects = false,
    isHovered = false,
    onHover,
    onLeave
  }: { 
    title: string, 
    icon: string, 
    isSelected?: boolean,
    onClick: () => void,
    isAllSubjects?: boolean,
    isHovered?: boolean,
    onHover: () => void,
    onLeave: () => void
  }) {
    // Determine card styles based on selection and hover state
    const getCardStyles = () => {
      if (isSelected) {
        return 'border-[#665bfe] bg-[#665bfe]/20 transform scale-105';
      }
      if (isHovered) {
        return 'border-[#665bfe] bg-[#665bfe]/10 transform scale-105';
      }
      return 'border-gray-600 bg-gray-900';
    };

    // Determine text color based on selection and hover state
    const getTextColor = () => {
      if (isSelected || isHovered) {
        return 'text-[#665bfe]';
      }
      return 'text-white';
    };

    return (
      <div 
        className={`rounded-lg p-4 border-2 shadow-sm transition-all duration-300 cursor-pointer ${isAllSubjects ? 'h-40' : 'h-32'} flex flex-col items-center justify-center ${getCardStyles()}`}
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="w-12 h-12 mb-2 transition-transform duration-300 transform hover:scale-110 flex items-center justify-center">
          <img src={icon} alt={title} className="w-full h-full object-contain" />
        </div>
        <h3 className={`text-lg font-semibold text-center transition-colors duration-300 ${getTextColor()}`}>
          {title}
        </h3>
        {isAllSubjects && (
          <p className="text-sm text-gray-400 mt-2 text-center transition-colors duration-300">
            <ul>
              <li>Physics</li>
              <li>Chemistry</li>
              <li>Maths</li>
            </ul>
          </p>
        )}
      </div>
    );
  }

  function getPlanType(name: string): string {
    if (name.toLowerCase().includes('free')) return 'Intro';
    if (name.toLowerCase().includes('day pass')) return 'Experience';
    if (name.toLowerCase().includes('stranded')) return 'Essential';
    if (name.toLowerCase().includes('premium')) return 'Premium';
    return '';
  }
}

export type Plan = { id:string, name:string, price:number, currency:string, perks:string[] };