import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiSearch, FiHeadphones, FiBell, FiX } from "react-icons/fi";
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
  FaCrown,
  FaCloud ,
  FaBell as FaBellSolid
} from "react-icons/fa";
import { useHistory, Link, useLocation } from "react-router-dom";
import LoginPanel from "./login";
import SignupPanel from "./signup";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Asset106 from "./icons/Asset.png"; 
import NotificationsPage from "./components/NotificationsPage";
import { useAuth } from "../../auth/AuthContext";

type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  isDarkMode,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  
  // Use auth context
  const { isLoggedIn, user, login, logout } = useAuth();

  useEffect(() => {
    // Load mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Test Available',
        message: 'Weekly physics test is now available. You can take it from the Tests section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: true,
        type: 'info'
      },
      {
        id: '2',
        title: 'Assignment Reminder',
        message: 'Your chemistry assignment is due tomorrow. Please submit it before the deadline.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        isRead: false,
        type: 'warning'
      },
      {
        id: '3',
        title: 'Subscription Update',
        message: 'Your premium subscription has been activated. You now have access to all features.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true,
        type: 'success'
      },
      {
        id: '4',
        title: 'New Content Added',
        message: 'New practice questions have been added to the Biology section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        isRead: false,
        type: 'info'
      }
    ];
    
    setNotifications(mockNotifications);
    setHasUnread(mockNotifications.some(n => !n.isRead));
  }, []);

  const handleLoginSuccess = (userData: any) => {
    login(userData);
    setLoginOpen(false);
  };

  const handleSignupSuccess = () => {
    setSignupOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowMobileSearch(false);
  };

  const handleProfileClick = () => {
    if (isLoggedIn && user) {
      if (window.innerWidth < 768) {
        handleLogout();
      } else {
        history.push(`/profile/${user.name || user.email}`);
      }
    } else {
      setLoginOpen(true);
    }
  };

  const handleDesktopProfileClick = () => {
    if (isLoggedIn && user) {
      history.push(`/profile/${user.name || user.email}`);
    } else {
      setLoginOpen(true);
    }
  };

  const handleSidebarProfileClick = () => {
    if (isLoggedIn && user) {
      history.push(`/profile/${user.name || user.email}`);
    }
    else {
      setLoginOpen(true);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    history.push("/notifications");
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

  return (
    <>
      <header
        className={`${
          isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-white"
        } transition-colors duration-300 p-2 flex items-center justify-between fixed top-0 left-0 right-0 z-40`}
      >
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-2 ml-2 text-gray-800 dark:text-gray-200">
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
              to="/plan"
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
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto text-gray-800 dark:text-gray-200">
          <LanguageSwitcher isDarkMode={isDarkMode} />
          
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
            >
              {hasUnread ? (
                <FaBellSolid className="text-xl animate-pulse text-blue-400" />
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
                
                <div className="max-h-72 scrollbar-hide overflow-y-auto">
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
                
                <div className={`p-2 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                  <button 
                    onClick={handleViewAllNotifications}
                    className="w-full py-2 text-sm text-center text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    View all notifications
                  </button>
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

          {!isLoggedIn ? (
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
                title={`Logged in as ${user.name || user.email}`}
              >
                <FaUserCircle size={20} className="text-blue-500" />
                <span className="hidden lg:inline text-sm">{user.name || user.email}</span>
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
            isActivePath(`/profile/${user?.name || user?.email}`) ? 
              `${isDarkMode ? "text-blue-400" : "text-blue-600"} font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2.5 after:h-0.5 ${isDarkMode ? "after:bg-blue-400" : "after:bg-blue-600"}` : 
              `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
          }`}
        >
          <FaUser size={18} className={isLoggedIn ? "text-green-500" : ""} />
          <span className="text-xs mt-0.5">{isLoggedIn ? "Profile" : "Login"}</span>
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
              {isLoggedIn && user && (
                <div className="relative group">
                  <button
                    onClick={handleSidebarProfileClick}
                    className={`flex flex-col items-center p-1.5 rounded-lg w-full ${
                      isDarkMode
                        ? `text-gray-300 hover:bg-gray-700 ${isActivePath(`/profile/${user.name || user.email}`) ? "bg-gray-700" : ""}`
                        : `text-gray-600 hover:bg-gray-200 ${isActivePath(`/profile/${user.name || user.email}`) ? "bg-gray-200" : ""}`
                    }`}
                  >
                    <FaUserCircle size={20} className="text-blue-500" />
                  </button>
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {user.name || user.email}
                  </div>
                </div>
              )}

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
                icon={<FaCloud  size={16} />}
                to="/settings"
                label="Subscribe"
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
            isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-gray-100"
          } border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } hidden md:flex`}
        >
          {isLoggedIn && user ? (
            <div className={`p-3 mb-1 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => history.push(`/profile/${user.name || user.email}`)}
              >
                <div className="mr-2">
                  <FaUserCircle size={28} className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"} text-sm`}>
                    {user.name || user.email}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={` ${isDarkMode ? "bg-transparent" : "bg-white"} shadow-sm`}>
              {/* Login/Signup prompt can be added here if needed */}
            </div>
          )}

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
              icon={<FaCloud size={16} />}
              to="/settings"
              label="Subscribe"
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