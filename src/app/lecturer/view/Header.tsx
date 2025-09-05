import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import {  Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiBell, FiX, FiSearch } from "react-icons/fi";
import { FaBars, FaTimes, FaUserCircle, FaCog, FaCrown, FaHome, FaCalendarWeek, FaUser, FaBook, } from "react-icons/fa";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface LecturerHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LecturerHeader: React.FC<LecturerHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isDarkMode,
  toggleTheme
}) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const history = useHistory();
  const location = useLocation();
  
  const handleSignOut = () => {
    logout();
    window.location.href = "/";
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    setHasUnread(notifications.some(n => !n.isRead && n.id !== id));
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowMobileSearch(false);
  };

  return (
    <>
      <header className={`${isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-white"} transition-colors duration-300 p-2 flex items-center justify-between fixed top-0 left-0 right-0 z-40`}>
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-2 ml-2 text-gray-800 dark:text-gray-200">
            <button
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>

            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                Lecturer Portal
              </h1>
            </div>
          </nav>
        </div>

        <nav className="hidden md:flex ml-5 items-center gap-4 text-gray-800 dark:text-gray-200 text-sm">
          <Link
            to="/lecturer"
            className={`relative pb-1 ${isActivePath("/lecturer") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`relative pb-1 ${isActivePath("/courses") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Courses
          </Link>
          <Link
            to="/schedule"
            className={`relative pb-1 ${isActivePath("/schedule") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Schedule
          </Link>
          <Link
            to="/students"
            className={`relative pb-1 ${isActivePath("/students") ? 
              `${isDarkMode ? "text-[#62c2f1]" : "text-[#62c2f1]"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#62c2f1]` : 
              "hover:text-[#62c2f1] transition-colors"}`}
          >
            Students
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto text-gray-800 dark:text-gray-200">
          <button
            onClick={() => setShowMobileSearch(true)}
            className={`p-1 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            <FiSearch size={18} />
          </button>
          
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
              {hasUnread ? (
                <FiBell className="text-xl animate-pulse text-blue-400" />
              ) : (
                <FiBell className="text-xl" />
              )}
              
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 top-12 w-80 overflow-y-auto rounded-lg shadow-lg z-50 ${
                isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}>
                <div className={`p-3 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                } flex justify-between items-center`}>
                  <h3 className="font-semibold">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b ${
                          isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-200 hover:bg-gray-50"
                        } ${!notification.isRead ? (isDarkMode ? "bg-blue-900/20" : "bg-blue-50") : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-2 flex-shrink-0 ${
                            notification.type === 'info' ? 'bg-blue-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message.length > 80 
                                ? `${notification.message.substring(0, 80)}...` 
                                : notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 ml-2 flex-shrink-0"></span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

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

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              title={`Logged in as ${user?.name || user?.email}`}
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0) || "L"}
                  
                </span>
              </div>
              <span className="hidden lg:inline text-sm">{user?.name || "Lecturer"}</span>
            </button>
          </div>

          {isMenuOpen && (
            <div
              className={`origin-top-right absolute right-2 top-14 mt-2 w-48 rounded-md shadow-lg py-1 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className={`px-4 py-2 text-xs border-b ${
                isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-400 border-gray-200"
              }`}>
                Hello! {user?.name}
                <h1 className="select-none">{user?.email}</h1>
                
              </div>
              <Link
                to="/profile"
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center">
            <h1 className={`text-lg font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Lecturer
            </h1>
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
        <Link
          to="/lecturer"
          className={`flex flex-col items-center relative ${
            isActivePath("/lecturer") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaHome size={18} />
          <span className="text-xs mt-0.5">Home</span>
        </Link>
        <Link
          to="/courses"
          className={`flex flex-col items-center relative ${
            isActivePath("/courses") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaBook size={18} />
          <span className="text-xs mt-0.5">Courses</span>
        </Link>
        <Link
          to="/schedule"
          className={`flex flex-col items-center relative ${
            isActivePath("/schedule") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaCalendarWeek size={18} />
          <span className="text-xs mt-0.5">Schedule</span>
        </Link>
        <Link
          to="/students"
          className={`flex flex-col items-center relative ${
            isActivePath("/students") ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaUser size={18} />
          <span className="text-xs mt-0.5">Students</span>
        </Link>
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
      </div>
      {sidebarOpen && (
        <div
          className={`fixed left-0 top-16 bottom-0 z-30 w-64 flex flex-col ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          {user && (
            <div className={`p-4 mb-1 ${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0) || "L"}
                      <div className="absolute top-3 right-3 bg-[#a9f0c8] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Lecturer
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"} text-sm`}>
                    {user.name || "Lecturer"}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto py-4">
            <SidebarItem
              icon={<FaUserCircle size={16} />}
              to="/lecturer"
              label="Dashboard"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/lecturer")}
            />
            <SidebarItem
              icon={<FaCog size={16} />}
              to="/courses"
              label="Courses"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/courses")}
            />
            <SidebarItem
              icon={<FaCrown size={16} />}
              to="/schedule"
              label="Schedule"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/schedule")}
            />
            <SidebarItem
              icon={<FaUserCircle size={16} />}
              to="/students"
              label="Students"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/students")}
            />
          </div>

          <div className="py-4 border-t border-gray-300 dark:border-gray-700">
            <SidebarItem
              icon={<FaCog size={16} />}
              to="/settings"
              label="Settings"
              isDarkMode={isDarkMode}
              isActive={isActivePath("/settings")}
            />
          </div>
        </div>
      )}
      {!sidebarOpen && (
        <div
          className={`fixed left-0 top-16 bottom-0 z-30 w-14 flex flex-col items-center py-3 ${
            isDarkMode ? "bg-transparent" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              {user && (
                <div className="relative group">
                  <Link
                    to="/profile"
                    className={`flex flex-col items-center p-1.5 rounded-lg w-full ${
                      isDarkMode
                        ? `text-gray-300 hover:bg-gray-700 ${isActivePath("/profile") ? "bg-gray-700" : ""}`
                        : `text-gray-600 hover:bg-gray-200 ${isActivePath("/profile") ? "bg-gray-200" : ""}`
                    }`}
                  >
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {user?.name?.charAt(0) || "L"}
                      </span>
                    </div>
                  </Link>
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    Profile
                  </div>
                </div>
              )}

              <SidebarIcon
                icon={<FaUserCircle size={16} />}
                to="/lecturer"
                label="Dashboard"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/lecturer")}
              />
              <SidebarIcon
                icon={<FaBook size={16} />}
                to="/courses"
                label="Courses"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/courses")}
              />
              <SidebarIcon
                icon={<FaCalendarWeek size={16} />}
                to="/schedule"
                label="Schedule"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/schedule")}
              />
              <SidebarIcon
                icon={<FaUser size={16} />}
                to="/students"
                label="Students"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/students")}
              />
            </div>
            <div className="space-y-4">
              <SidebarIcon
                icon={<FaCog size={16} />}
                to="/profile"
                label="Profile"
                isDarkMode={isDarkMode}
                showLabel={false}
                isActive={isActivePath("/profile")}
              />
            </div>
          </div>
        </div>
      )}
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

export default LecturerHeader;