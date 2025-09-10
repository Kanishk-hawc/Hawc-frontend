// import React, { useState, useEffect } from "react";
// import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
// import Header from "./student/view/header";
// import Footer from "./student/view/footer";
// import Home from "./student/view/Dashbord";
// import Plan from "./student/view/header/Plans";
// import Test from "./student/view/header/Test";
// import TestsWeekly from "./student/view/header/TestWeekly";
// import LiveVedio from "./student/cards/LiveVideo";
// import CourseClass from "./student/components/CourseClass";
// import VideoPlayer from "./student/cards/VideoPlayer";
// import Assignments from "./student/view/sidebar_pages/Assignments";
// import Demos from "./student/view/sidebar_pages/Demos";
// import Doubts from "./student/view/sidebar_pages/Doubts";
// import Notes from "./student/view/sidebar_pages/Notes";
// import Practice from "./student/view/sidebar_pages/Practice";
// import Policy from "./student/view/footer/policies";
// import RefundPolicy from './student/view/footer/RefundPolicy';
// import TermsOfUse from "./student/view/footer/TermsOfUse";
// import AboutUs from "./student/view/footer/AboutUs";
// import CheckoutPanel from "./student/view/header/checkout_and_payment/Checkout";
// import ProfilePage from "./student/view/Profile";
// import SettingsPage from "./student/view/sidebar_pages/settings";
// import ContactPage from "./student/view/footer/ContectUs";
// import NotificationsPage from "./student/view/components/NotificationsPage";
// import LecturerApp from "./lecturer/LecturerApp"; 

// const AppFront: React.FC = () => {
//   const [theme, setTheme] = useState("dark");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const history = useHistory();
//   const location = useLocation();

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//   }, [theme]);
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         setUserRole(user.role);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setCheckoutOpen(location.pathname === "/checkout");
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleLoginSuccess = (event: CustomEvent) => {
//       const user = event.detail;
//       setUserRole(user.role);
//     };

//     window.addEventListener('loginSuccess', handleLoginSuccess as EventListener);
    
//     return () => {
//       window.removeEventListener('loginSuccess', handleLoginSuccess as EventListener);
//     };
//   }, []);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const isDarkMode = theme === "dark";

//   const handleCheckoutClose = () => {
//     setCheckoutOpen(false);
//     history.push("/");
//   };
//   if (userRole === "main_lecturer" || userRole === "sub_lecturer") {
//     return <LecturerApp />;
//   }
//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         isDarkMode
//           ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]"
//           : "bg-white"
//       } transition-colors duration-300`}
//     >
//       <Header
//         toggleTheme={toggleTheme}
//         isDarkMode={isDarkMode}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="flex flex-1 pt-10">
//         {sidebarOpen && (
//           <aside
//             className={`w-80 shrink-0 border-r border-gray-300 dark:border-gray-700 ${
//               isDarkMode
//                 ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)] text-gray-200"
//                 : "bg-gray-100 text-gray-800"
//             } transition-all duration-300`}
//           ></aside>
//         )}

//         <main
//           className={`flex-1 overflow-x-hidden ${
//             sidebarOpen ? "md:ml-0" : "md:ml-14"
//           } text-gray-900 dark:text-white`}
//         >
//           <Switch>
//             <Route exact path="/">
//               <Home isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/test">
//               <Test />
//             </Route>
//             <Route path="/tests/weekly">
//               <TestsWeekly />
//             </Route>
//             <Route path="/doubts">
//               <Doubts />
//             </Route>
//             <Route path="/practice">
//               <Practice />
//             </Route>
//             <Route path="/assignments">
//               <Assignments />
//             </Route>
//             <Route path="/demos">
//               <Demos isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/plan">
//               <Plan />
//             </Route>
//             <Route path="/notes">
//               <Notes isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/live">
//               <LiveVedio isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/course">
//               <CourseClass isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/notifications">
//               <NotificationsPage />
//             </Route>
//             <Route path="/play">
//               <VideoPlayer />
//             </Route>
//             <Route path="/policy">
//               <Policy isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/refund-policy">
//               <RefundPolicy isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/termsofuse">
//               <TermsOfUse />
//             </Route>
//             <Route path="/about-us">
//               <AboutUs isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/profile/:username">
//               <ProfilePage isDarkMode={isDarkMode}/>
//             </Route>
//             <Route path="/settings">
//               <SettingsPage isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/contact">
//               <ContactPage isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/checkout">
//               {/* Empty route - panel is handled separately */}
//             </Route>
//           </Switch>
//         </main>
//       </div>

//       <CheckoutPanel
//         isOpen={checkoutOpen}
//         onClose={handleCheckoutClose}
//       />

//       <Footer isDarkMode={isDarkMode} sidebarOpen={sidebarOpen} />
//     </div>
//   );
// };

// export default AppFront;



import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation,  } from "react-router-dom";
import Header from "./student/view/header";
import Footer from "./student/view/footer";
import Home from "./student/view/Dashbord";
import Plan from "./student/view/header/Plans";
import Test from "./student/view/header/Test";
import TestsWeekly from "./student/view/header/TestWeekly";
import LiveVedio from "./student/cards/LiveVideo";
import CourseClass from "./student/components/CourseClass";
import Dyte from "./student/components/dyte";
import VideoPlayer from "./student/cards/VideoPlayer";
import Assignments from "./student/view/sidebar_pages/Assignments";
import Demos from "./student/view/sidebar_pages/Demos";
import Doubts from "./student/view/sidebar_pages/Doubts";
import Notes from "./student/view/sidebar_pages/Notes";
import Practice from "./student/view/sidebar_pages/Practice";
import Policy from "./student/view/footer/policies";
import RefundPolicy from './student/view/footer/RefundPolicy';
import TermsOfUse from "./student/view/footer/TermsOfUse";
import AboutUs from "./student/view/footer/AboutUs";
import CheckoutPanel from "./student/view/header/checkout_and_payment/Checkout";
import ProfilePage from "./student/view/Profile";
import SettingsPage from "./student/view/sidebar_pages/settings";
import ContactPage from "./student/view/footer/ContectUs";
import NotificationsPage from "./student/view/components/NotificationsPage";
import LecturerApp from "./lecturer/LecturerApp"; 
import { useAuth } from "./auth/AuthContext";
import DyteDoubt from "./student/components/dyte_doubt"

const AppFront: React.FC = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { user,  } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setCheckoutOpen(location.pathname === "/checkout");
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDarkMode = theme === "dark";

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    history.push("/");
  };
  if (user && (user.role === "main_lecturer" || user.role === "jr_lecturer")) {
    return <LecturerApp />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode
          ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]"
          : "bg-white"
      } transition-colors duration-300`}
    >
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 pt-10">
        {sidebarOpen && (
          <aside
            className={`w-80 shrink-0 border-r border-gray-300 dark:border-gray-700 ${
              isDarkMode
                ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)] text-gray-200"
                : "bg-gray-100 text-gray-800"
            } transition-all duration-300`}
          ></aside>
        )}

        <main
          className={`flex-1 overflow-x-hidden ${
            sidebarOpen ? "md:ml-0" : "md:ml-14"
          } text-gray-900 dark:text-white`}
        >
          <Switch>
            <Route exact path="/">
              <Home isDarkMode={isDarkMode} />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/tests/weekly">
              <TestsWeekly />
            </Route>
            <Route path="/doubts">
              <Doubts />
            </Route>
            <Route path="/practice">
              <Practice />
            </Route>
            <Route path="/assignments">
              <Assignments />
            </Route>
            <Route path="/live-class">
              <Dyte />
              </Route>
            <Route path="/doubt-class">
              <DyteDoubt/>
            </Route>
            <Route path="/demos">
              <Demos isDarkMode={isDarkMode} />
            </Route>
            <Route path="/plan">
              <Plan />
            </Route>
            <Route path="/notes">
              <Notes isDarkMode={isDarkMode} />
            </Route>
            <Route path="/live">
              <LiveVedio isDarkMode={isDarkMode} />
            </Route>
            <Route path="/course">
              <CourseClass isDarkMode={isDarkMode} />
            </Route>
            <Route path="/notifications">
              <NotificationsPage />
            </Route>
            <Route path="/play">
              <VideoPlayer />
            </Route>
            <Route path="/policy">
              <Policy isDarkMode={isDarkMode} />
            </Route>
            <Route path="/refund-policy">
              <RefundPolicy isDarkMode={isDarkMode} />
            </Route>
            <Route path="/termsofuse">
              <TermsOfUse />
            </Route>
            <Route path="/about-us">
              <AboutUs isDarkMode={isDarkMode} />
            </Route>
            <Route path="/profile/:username">
              <ProfilePage isDarkMode={isDarkMode}/>
            </Route>
            <Route path="/settings">
              <SettingsPage  />
            </Route>
            <Route path="/contact">
              <ContactPage isDarkMode={isDarkMode} />
            </Route>
            <Route path="/checkout">
              {/* Empty route - panel is handled separately */}
            </Route>
          </Switch>
        </main>
      </div>

      <CheckoutPanel
        isOpen={checkoutOpen}
        onClose={handleCheckoutClose}
      />

      <Footer isDarkMode={isDarkMode} sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default AppFront;