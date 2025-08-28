import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiSearch, FiHeadphones } from "react-icons/fi";
import {
  FaQuestionCircle,
  FaBook,
  FaStickyNote,
  FaClipboardList,
  FaTasks,
  FaCube,
  FaCalendarWeek,
  FaHome,
  FaClipboardCheck,
  FaUser,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaCrown
} from "react-icons/fa";
import { useHistory, Link, useLocation } from "react-router-dom";
import LoginPanel from "./login";
import SignupPanel from "./signup";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Asset106 from "./icons/Asset.png"; 

type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  isDarkMode,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || user.email);
        setUserEmail(user.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLoginSuccess = (user: any) => {
    setUserName(user.name || user.email);
    setUserEmail(user.email);
    setLoginOpen(false);
  };

  const handleSignupSuccess = () => {
    setSignupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    setUserEmail(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowMobileSearch(false);
  };

  const handleProfileClick = () => {
    if (userName) {
      if (window.innerWidth < 768) {
        handleLogout();
      } else {
        history.push(`/profile/${userName}`);
      }
    } else {
      setLoginOpen(true);
    }
  };

  const handleDesktopProfileClick = () => {
    if (userName) {
      history.push(`/profile/${userName}`);
    } else {
      setLoginOpen(true);
    }
  };

  const handleSidebarProfileClick = () => {
    if (userName) {
      history.push(`/profile/${userName}`);
    }
    else {
      setLoginOpen(true);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`${
          isDarkMode ? "bg-transparent" : "bg-white"
        } transition-colors duration-300 p-2 flex items-center justify-between fixed top-0 left-0 right-0 z-40`}
      >
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-2 ml-4 text-gray-800 dark:text-gray-200">
            <button
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>

            <Link to="/" className="font-semibold text-lg flex items-center">
              <img src={Asset106} alt="Logo" className="h-8 w-auto" />
            </Link>
            
            <Link
              className="subscribe-btn ml-2 flex items-center mr-4 text-sm"
              to="/plans"
            >
              <FaCrown className="mr-1 text-ecba12" />
              Subscribe
            </Link>
          </nav>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-gray-800 dark:text-gray-200 text-sm">
          <button 
            onClick={() => history.push("/")} 
            className={`relative pb-1 ${isActivePath("/") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Home
          </button>
          <button
            onClick={() => history.push("/test")}
            className={`relative pb-1 ${isActivePath("/test") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Tests
          </button>
          <button
            onClick={() => history.push("/tests/weekly")}
            className={`relative pb-1 ${isActivePath("/tests/weekly") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Weekly Tests
          </button>
          <button
            onClick={() => history.push("/plan")}
            className={`relative pb-1 ${isActivePath("/plan") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Plans
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto text-gray-800 dark:text-gray-200">
          <LanguageSwitcher isDarkMode={isDarkMode} />

          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full p-1 bg-gray-200 dark:bg-gray-800 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <div
              className={`relative w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDarkMode ? (
                <FiMoon className="text-blue-400 text-xs" />
              ) : (
                <FiSun className="text-yellow-500 text-xs" />
              )}
            </div>
          </button>

          {!userName ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#123a66] hover:bg-[#185494] text-white px-3 py-1.5 rounded transition-colors duration-300 text-sm"
              >
                Login
              </button>
              <button
                onClick={() => setSignupOpen(true)}
                className="bg-[#196867] hover:bg-[#1c807e] text-white px-3 py-1.5 rounded transition-colors duration-300 text-sm"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDesktopProfileClick}
                className="flex items-center gap-1 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                title={`Logged in as ${userName}`}
              >
                <FaUserCircle size={20} className="text-blue-500" />
                <span className="hidden lg:inline text-sm">{userName}</span>
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center">
            <img src={Asset106} alt="Logo" className="h-6 w-auto" />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileSearch(true)}
              className={`p-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <FiSearch size={18} />
            </button>
          </div>
        </div>
        
        {/* Header Line - Added at the bottom of the header */}
        <div className={`absolute bottom-0 left-0 right-0 h-px ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}></div>
      </header>
      
      {showMobileSearch && (
        <div
          className={`fixed top-0 left-0 right-0 ${
            isDarkMode ? "bg-transparent" : "bg-white"
          } p-2 z-50 md:hidden`}
        >
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={`flex-1 p-1.5 border rounded-l ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 rounded-r"
            >
              <FiSearch />
            </button>
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className={`ml-1 px-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 ${
          isDarkMode ? "bg-[#091E37] border-gray-700" : "bg-white border-gray-200"
        } border-t flex justify-around items-center py-2 z-40 md:hidden`}
      >
        <button
          onClick={() => history.push("/")}
          className={`flex flex-col items-center relative ${
            isActivePath("/") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaHome size={18} />
          <span className="text-xs mt-0.5">Home</span>
        </button>
        <button
          onClick={() => history.push("/test")}
          className={`flex flex-col items-center relative ${
            isActivePath("/test") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaClipboardCheck size={18} />
          <span className="text-xs mt-0.5">Tests</span>
        </button>
        <button
          onClick={() => history.push("/tests/weekly")}
          className={`flex flex-col items-center relative ${
            isActivePath("/tests/weekly") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaCalendarWeek size={18} />
          <span className="text-xs mt-0.5">Weekly</span>
        </button>
        <button
          onClick={() => history.push("/plan")}
          className={`flex flex-col items-center relative ${
            isActivePath("/plan") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaTasks size={18} />
          <span className="text-xs mt-0.5">Plans</span>
        </button>
        <button
          onClick={toggleTheme}
          className={`flex flex-col items-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {isDarkMode ? (
            <FiMoon size={18} className="text-blue-400" />
          ) : (
            <FiSun size={18} className="text-yellow-500" />
          )}
          <span className="text-xs mt-0.5">Theme</span>
        </button>
        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center relative ${
            isActivePath(`/profile/${userName}`) ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaUser size={18} className={userName ? "text-green-500" : ""} />
          <span className="text-xs mt-0.5">{userName ? "Profile" : "Login"}</span>
        </button>
      </div>
      {!sidebarOpen && (
        <div
          className={`fixed left-0 top-14 bottom-0 z-30 w-14 flex flex-col items-center py-3 ${
            isDarkMode ? "bg-transparent" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="relative group">
                <button
                  onClick={handleSidebarProfileClick}
                  className={`flex flex-col items-center p-1.5 rounded-lg w-full ${
                    isDarkMode
                      ? `text-gray-300 hover:bg-gray-700 ${isActivePath(`/profile/${userName}`) ? "bg-gray-700" : ""}`
                      : `text-gray-600 hover:bg-gray-200 ${isActivePath(`/profile/${userName}`) ? "bg-gray-200" : ""}`
                  }`}
                >
                  <FaUserCircle size={20} className={userName ? "text-blue-500" : ""} />
                </button>
             <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {userName ? userName : "Login"}
                </div>
              </div>

              <SidebarIcon
                icon={<FaQuestionCircle size={16} />}
                to="/doubts"
                label="Doubts"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/doubts")}
              />
              <SidebarIcon
                icon={<FaBook size={16} />}
                to="/practice"
                label="Practice"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/practice")}
              />
              <SidebarIcon
                icon={<FaStickyNote size={16} />}
                to="/notes"
                label="Notes"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/notes")}
              />
              <SidebarIcon
                icon={<FaClipboardList size={16} />}
                to="/tests"
                label="Tests"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/tests")}
              />
              <SidebarIcon
                icon={<FaTasks size={16} />}
                to="/assignments"
                label="Assignments"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/assignments")}
              />
              <SidebarIcon
                icon={<FaCube size={16} />}
                to="/demos"
                label="3D Demos"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/demos")}
              />
              <SidebarIcon
                icon={<FaCalendarWeek size={16} />}
                to="/tests/weekly"
                label="Weekly"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/tests/weekly")}
              />
            </div>
            <div className="space-y-4">
              <SidebarIcon
                icon={<FaCog size={16} />}
                to="/settings"
                label="Settings"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/settings")}
              />
              <SidebarIcon
                icon={<FiHeadphones size={16} />}
                to="/support"
                label="Help & Support"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/support")}
              />
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className={`fixed left-0 top-14 bottom-0 z-30 w-80 flex flex-col ${
            isDarkMode ? "bg-transparent" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          <div className={`p-3 mb-1 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            {!userName ? (
              <div className="flex items-center">
                <div className="mr-2">
                  <FaUserCircle size={28} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setLoginOpen(true)}
                    className={`text-left font-medium ${isDarkMode ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} transition-colors text-sm`}
                  >
                    Login
                  </button>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    or{" "}
                    <button
                      onClick={() => setSignupOpen(true)}
                      className={`${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} underline transition-colors`}
                    >
                      Sign Up
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => history.push(`/profile/${userName}`)}
              >
                <div className="mr-2">
                  <FaUserCircle size={28} className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"} text-sm`}>
                    {userName}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {userEmail}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-1">
            <SidebarItem
              icon={<FaQuestionCircle size={16} />}
              to="/doubts"
              label="Doubts"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/doubts")}
            />
            <SidebarItem
              icon={<FaBook size={16} />}
              to="/practice"
              label="Practice"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/practice")}
            />
            <SidebarItem
              icon={<FaStickyNote size={16} />}
              to="/notes"
              label="Notes"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/notes")}
            />
            <SidebarItem
              icon={<FaClipboardList size={16} />}
              to="/tests"
              label="Tests"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/tests")}
            />
            <SidebarItem
              icon={<FaTasks size={16} />}
              to="/assignments"
              label="Assignments"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/assignments")}
            />
            <SidebarItem
              icon={<FaCube size={16} />}
              to="/demos"
              label="3D Demos"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/demos")}
            />
            <SidebarItem
              icon={<FaCalendarWeek size={16} />}
              to="/tests/weekly"
              label="Weekly Tests"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/tests/weekly")}
            />
          </div>

          <div className="py-3 border-t border-gray-300 dark:border-gray-700">
            <SidebarItem
              icon={<FaCog size={16} />}
              to="/settings"
              label="Settings"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/settings")}
            />
            <SidebarItem
              icon={<FiHeadphones size={16} />}
              to="/support"
              label="Help & Support"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/support")}
            />
          </div>
        </div>
      )}

      <LoginPanel
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <SignupPanel
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSignupSuccess={handleSignupSuccess}
      />

      <style>{`
        .subscribe-btn {
          background-color: #2f2504;
          color: #ecba12;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 0.25rem;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .subscribe-btn:hover {
          opacity: 0.9;
        }
        
        .text-ecba12 {
          color: #ecba12;
        }
      `}</style>
    </>
  );
};

function SidebarIcon({
  icon,
  to,
  label,
  isDarkMode,
  showLabel = true,
  isActive = false,
}: {
  icon: React.ReactNode;
  to: string;
  label: string;
  isDarkMode: boolean;
  showLabel?: boolean;
  isActive?: boolean;
}) {
  return (
    <div className="relative group">
      <Link
        to={to}
        className={`flex flex-col items-center p-1.5 rounded-lg w-full ${
          isDarkMode
            ? `text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            : `text-gray-600 hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
        }`}
        title={label}
      >
        <span className="text-lg">{icon}</span>
        {showLabel && <span className="text-xs mt-0.5">{label}</span>}
      </Link>
      
      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {label}
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  to,
  label,
  isDarkMode,
  isActive = false,
}: {
  icon: React.ReactNode;
  to: string;
  label: string;
  isDarkMode: boolean;
  isActive?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center p-2.5 rounded-lg w-full ${
        isDarkMode
          ? `text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          : `text-gray-600 hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default Header;