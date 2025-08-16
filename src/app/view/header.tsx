import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header
      className={`${isDarkMode ? "bg-black" : "bg-white"} text-${
        isDarkMode ? "white" : "gray-900"
      } transition-colors duration-300 p-4 flex justify-between items-center`}
    >
      <nav className="space-x-4"></nav>
      <button
        onClick={toggleTheme}
        className="ml-4 relative w-14 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-800 transition-colors duration-300 focus:outline-none"
        aria-label="Toggle dark mode"
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-yellow-200 to-blue-500 opacity-20 dark:opacity-30 transition-opacity duration-300`}
          />
        </div>
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
    </header>
  );
};

export default Header;
