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
          isDarkMode ? "bg-[#091E37]" : "bg-white"
        } transition-colors duration-300 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40`}
      >
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-4 ml-6 text-gray-800 dark:text-gray-200">
            <button
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <Link to="/" className="font-semibold text-xl flex items-center">
              How & Why
            </Link>
            
            <Link
              className="subscribe-btn ml-4 flex items-center mr-6"
              to="/plans"
            >
              <FaCrown className="mr-2 text-ecba12" />
              Subscribe
            </Link>
          </nav>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-gray-800 dark:text-gray-200">
          <button 
            onClick={() => history.push("/")} 
            className={`hover:underline ${isActivePath("/") ? 
              `${isDarkMode ? "text-blue-400 border-b-2 border-blue-400" : "text-blue-600 border-b-2 border-blue-600"} font-medium` : 
              ""}`}
          >
            Home
          </button>
          <button
            onClick={() => history.push("/test")}
            className={`hover:underline ${isActivePath("/test") ? 
              `${isDarkMode ? "text-blue-400 border-b-2 border-blue-400" : "text-blue-600 border-b-2 border-blue-600"} font-medium` : 
              ""}`}
          >
            Tests
          </button>
          <button
            onClick={() => history.push("/tests/weekly")}
            className={`hover:underline ${isActivePath("/tests/weekly") ? 
              `${isDarkMode ? "text-blue-400 border-b-2 border-blue-400" : "text-blue-600 border-b-2 border-blue-600"} font-medium` : 
              ""}`}
          >
            Weekly Tests
          </button>
          <button
            onClick={() => history.push("/plan")}
            className={`hover:underline ${isActivePath("/plan") ? 
              `${isDarkMode ? "text-blue-400 border-b-2 border-blue-400" : "text-blue-600 border-b-2 border-blue-600"} font-medium` : 
              ""}`}
          >
            Plans
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto text-gray-800 dark:text-gray-200">
          <LanguageSwitcher isDarkMode={isDarkMode} />

          <button
            onClick={toggleTheme}
            className="relative w-14 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-800 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <div
              className={`relative w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDarkMode ? (
                <FiMoon className="text-blue-400 text-sm" />
              ) : (
                <FiSun className="text-yellow-500 text-sm" />
              )}
            </div>
          </button>

          {!userName ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => setSignupOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-300"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDesktopProfileClick}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                title={`Logged in as ${userName}`}
              >
                <FaUserCircle size={24} className="text-blue-500" />
                <span className="hidden lg:inline">{userName}</span>
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <div
            className={`font-semibold text-lg ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            How & Why
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileSearch(true)}
              className={`p-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </header>
      {showMobileSearch && (
        <div
          className={`fixed top-0 left-0 right-0 ${
            isDarkMode ? "bg-[#091E37]" : "bg-white"
          } p-2 z-50 md:hidden`}
        >
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={`flex-1 p-2 border rounded-l ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r"
            >
              <FiSearch />
            </button>
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className={`ml-2 px-3 ${
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
        } border-t flex justify-around items-center py-3 z-40 md:hidden`}
      >
        <button
          onClick={() => history.push("/")}
          className={`flex flex-col items-center ${
            isActivePath("/") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => history.push("/test")}
          className={`flex flex-col items-center ${
            isActivePath("/test") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaClipboardCheck size={20} />
          <span className="text-xs mt-1">Tests</span>
        </button>
        <button
          onClick={() => history.push("/tests/weekly")}
          className={`flex flex-col items-center ${
            isActivePath("/tests/weekly") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaCalendarWeek size={20} />
          <span className="text-xs mt-1">Weekly</span>
        </button>
        <button
          onClick={() => history.push("/plan")}
          className={`flex flex-col items-center ${
            isActivePath("/plan") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaTasks size={20} />
          <span className="text-xs mt-1">Plans</span>
        </button>
        <button
          onClick={toggleTheme}
          className={`flex flex-col items-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {isDarkMode ? (
            <FiMoon size={20} className="text-blue-400" />
          ) : (
            <FiSun size={20} className="text-yellow-500" />
          )}
          <span className="text-xs mt-1">Theme</span>
        </button>
        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center ${
            isActivePath(`/profile/${userName}`) ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaUser size={20} className={userName ? "text-green-500" : ""} />
          <span className="text-xs mt-1">{userName ? "Profile" : "Login"}</span>
        </button>
      </div>
      {!sidebarOpen && (
        <div
          className={`fixed left-0 top-16 bottom-0 z-30 w-16 flex flex-col items-center py-4 ${
            isDarkMode ? "bg-[#091E37]" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="relative group">
                <button
                  onClick={handleSidebarProfileClick}
                  className={`flex flex-col items-center p-2 rounded-lg w-full ${
                    isDarkMode
                      ? `text-gray-300 hover:bg-gray-700 ${isActivePath(`/profile/${userName}`) ? "bg-gray-700" : ""}`
                      : `text-gray-600 hover:bg-gray-200 ${isActivePath(`/profile/${userName}`) ? "bg-gray-200" : ""}`
                  }`}
                >
                  <FaUserCircle size={24} className={userName ? "text-blue-500" : ""} />
                </button>
             <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {userName ? userName : "Login"}
                </div>
              </div>

              <SidebarIcon
                icon={<FaQuestionCircle size={20} />}
                to="/doubts"
                label="Doubts"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/doubts")}
              />
              <SidebarIcon
                icon={<FaBook size={20} />}
                to="/practice"
                label="Practice"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/practice")}
              />
              <SidebarIcon
                icon={<FaStickyNote size={20} />}
                to="/notes"
                label="Notes"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/notes")}
              />
              <SidebarIcon
                icon={<FaClipboardList size={20} />}
                to="/tests"
                label="Tests"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/tests")}
              />
              <SidebarIcon
                icon={<FaTasks size={20} />}
                to="/assignments"
                label="Assignments"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/assignments")}
              />
              <SidebarIcon
                icon={<FaCube size={20} />}
                to="/demos"
                label="3D Demos"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/demos")}
              />
              <SidebarIcon
                icon={<FaCalendarWeek size={20} />}
                to="/tests/weekly"
                label="Weekly"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/tests/weekly")}
              />
            </div>
            <div className="space-y-6">
              <SidebarIcon
                icon={<FaCog size={20} />}
                to="/settings"
                label="Settings"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/settings")}
              />
              <SidebarIcon
                icon={<FiHeadphones size={20} />}
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
          className={`fixed left-0 top-16 bottom-0 z-30 w-80 flex flex-col ${
            isDarkMode ? "bg-[#091E37]" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          <div className={`p-4 mb-2 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            {!userName ? (
              <div className="flex items-center">
                <div className="mr-3">
                  <FaUserCircle size={32} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setLoginOpen(true)}
                    className={`text-left font-medium ${isDarkMode ? "text-white hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} transition-colors`}
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
                <div className="mr-3">
                  <FaUserCircle size={32} className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {userName}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {userEmail}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <SidebarItem
              icon={<FaQuestionCircle size={18} />}
              to="/doubts"
              label="Doubts"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/doubts")}
            />
            <SidebarItem
              icon={<FaBook size={18} />}
              to="/practice"
              label="Practice"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/practice")}
            />
            <SidebarItem
              icon={<FaStickyNote size={18} />}
              to="/notes"
              label="Notes"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/notes")}
            />
            <SidebarItem
              icon={<FaClipboardList size={18} />}
              to="/tests"
              label="Tests"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/tests")}
            />
            <SidebarItem
              icon={<FaTasks size={18} />}
              to="/assignments"
              label="Assignments"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/assignments")}
            />
            <SidebarItem
              icon={<FaCube size={18} />}
              to="/demos"
              label="3D Demos"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/demos")}
            />
            <SidebarItem
              icon={<FaCalendarWeek size={18} />}
              to="/tests/weekly"
              label="Weekly Tests"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/tests/weekly")}
            />
          </div>

          <div className="py-4 border-t border-gray-300 dark:border-gray-700">
            <SidebarItem
              icon={<FaCog size={18} />}
              to="/settings"
              label="Settings"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/settings")}
            />
            <SidebarItem
              icon={<FiHeadphones size={18} />}
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
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
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
        className={`flex flex-col items-center p-2 rounded-lg w-full ${
          isDarkMode
            ? `text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            : `text-gray-600 hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
        }`}
        title={label}
      >
        <span className="text-xl">{icon}</span>
        {showLabel && <span className="text-xs mt-1">{label}</span>}
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
      className={`flex items-center p-3 rounded-lg w-full ${
        isDarkMode
          ? `text-gray-300 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          : `text-gray-600 hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default Header;