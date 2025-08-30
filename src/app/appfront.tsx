// import React, { useState, useEffect } from "react";
// import { Route, Switch } from "react-router-dom";
// import Header from "./view/header";
// import Footer from "./view/footer";
// import Home from "./view/home";
// import Plan from "./view/header/Plans";
// import Test from "./view/header/Test";
// import TestsWeekly from "./view/header/TestWeekly";
// import LiveVedio from "./cards/LiveVideo";
// import CourseClass from "./components/CourseClass";
// import VideoPlayer from "./cards/VideoPlayer";
// import Assignments from "./view/sidebar_pages/Assignments";
// import Demos from "./view/sidebar_pages/Demos";
// import Doubts from "./view/sidebar_pages/Doubts";
// import Notes from "./view/sidebar_pages/Notes";
// import Practice from "./view/sidebar_pages/Practice";
// import Policy from "./view/footer/policies"
// import RefundPolicy from './view/footer/RefundPolicy'
// import TermsOfUse from "./view/footer/TermsOfUse";
// import AboutUs from "./view/footer/AboutUs";
// import CheckoutPanel from "./view/header/checkout_and_payment/Checkout";
// import ProfilePage from "./view/Profile";
// import SettingsPage from "./view/sidebar_pages/settings";
// import ContactPage from "./view/footer/ContectUs";

// const AppFront: React.FC = () => {
//   const [theme, setTheme] = useState("dark");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const isDarkMode = theme === "dark";

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-white"
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
//           >
//           </aside>
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
//               <Demos />
//             </Route>
//             <Route path="/plan">
//               <Plan />
//             </Route>
//             <Route path="/notes">
//               <Notes />
//             </Route>
//             <Route path="/live">
//               <LiveVedio isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/course">
//               <CourseClass isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/play">
//               <VideoPlayer />
//             </Route>
//             <Route path="/policy">
//               <Policy isDarkMode={isDarkMode}/>
//             </Route>
//             <Route path="/refund-policy">
//               <RefundPolicy  isDarkMode={isDarkMode}/>
//             </Route>
//             <Route path="/refund-policy">
//               <RefundPolicy  isDarkMode={isDarkMode}/>
//             </Route>
//             <Route path="/termsofuse">
//               <TermsOfUse  />
//             </Route>
//             <Route path="/about-us">
//               <AboutUs isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/checkout">
//               <CheckoutPanel />
//             </Route>
//             <Route path="/profile/:username">
//               <ProfilePage />
//             </Route>
//             <Route path="/settings">
//               <SettingsPage isDarkMode={isDarkMode} />
//             </Route>
//             <Route path="/contact">
//               <ContactPage isDarkMode={isDarkMode} />
//             </Route>
//           </Switch>
//         </main>
//       </div>

//       <Footer isDarkMode={isDarkMode} sidebarOpen={sidebarOpen} />
//     </div>
//   );
// };

// export default AppFront;




import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./view/header";
import Footer from "./view/footer";
import Home from "./view/home";
import Plan from "./view/header/Plans";
import Test from "./view/header/Test";
import TestsWeekly from "./view/header/TestWeekly";
import LiveVedio from "./cards/LiveVideo";
import CourseClass from "./components/CourseClass";
import VideoPlayer from "./cards/VideoPlayer";
import Assignments from "./view/sidebar_pages/Assignments";
import Demos from "./view/sidebar_pages/Demos";
import Doubts from "./view/sidebar_pages/Doubts";
import Notes from "./view/sidebar_pages/Notes";
import Practice from "./view/sidebar_pages/Practice";
import Policy from "./view/footer/policies";
import RefundPolicy from "./view/footer/RefundPolicy";
import TermsOfUse from "./view/footer/TermsOfUse";
import AboutUs from "./view/footer/AboutUs";
import CheckoutPanel from "./view/header/checkout_and_payment/Checkout";
import ProfilePage from "./view/Profile";
import SettingsPage from "./view/sidebar_pages/settings";
import ContactPage from "./view/footer/ContectUs";

const AppFront: React.FC = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // NEW: control checkout panel
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDarkMode = theme === "dark";

  // When user goes to /checkout route → open the panel
  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname === "/checkout") {
        setCheckoutOpen(true);
      } else {
        setCheckoutOpen(false);
      }
    });
  }, [history]);

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
            <Route path="/demos">
              <Demos />
            </Route>
            <Route path="/plan">
              <Plan />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/live">
              <LiveVedio isDarkMode={isDarkMode} />
            </Route>
            <Route path="/course">
              <CourseClass isDarkMode={isDarkMode} />
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
            {/* No direct render here! Panel is handled separately */}
            <Route path="/profile/:username">
              <ProfilePage />
            </Route>
            <Route path="/settings">
              <SettingsPage isDarkMode={isDarkMode} />
            </Route>
            <Route path="/contact">
              <ContactPage isDarkMode={isDarkMode} />
            </Route>
          </Switch>
        </main>
      </div>

      {/* CheckoutPanel is mounted outside Switch, controlled by state */}
      <CheckoutPanel
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          history.push("/plans"); // go back when closing
        }}
      />

      <Footer isDarkMode={isDarkMode} sidebarOpen={sidebarOpen} />
    </div>
  );
};

export default AppFront;



