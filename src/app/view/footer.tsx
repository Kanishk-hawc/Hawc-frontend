import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
  FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HawcLogo from "./icons/Hawc Revised Logo.svg";

type FooterProps = {
  isDarkMode: boolean;
  sidebarOpen: boolean;
};

const Footer: React.FC<FooterProps> = ({ isDarkMode, sidebarOpen }) => {
  return (
    <>
      <div className={`w-full h-px ${isDarkMode ? "bg-transparent" : "bg-gray-300"} ${sidebarOpen ? "ml-80" : "ml-16"}`}></div>
      
      <footer
        className={`${
          isDarkMode ? "bg-transparent text-gray-300" : "bg-white text-gray-700"
        } transition-colors duration-300  ${
          sidebarOpen ? "ml-80" : "ml-14"
        } relative top-0 md:right-0 right-10 md:bottom-0 mb-20  `}
      >
        <div className="w-full px-4 py-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-5 gap-8 mb-16 text-left mt-20">
            <div>
              <div className="flex items-center mb-2">
                {/* Added the logo here */}
                <img 
                  src={HawcLogo} 
                  alt="HAWC Logo" 
                  className="h-8 w-8 mr-2" 
                />
                <h3
                  className={`text-1xl font-bold mb-1 ${
                    isDarkMode ? "text-[#123a66]" : "text-black"
                  }`}
                >
                  How and Why
                </h3>
              </div>
              <p
                className={`text-base mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email us: customer@hawc.com
              </p>
              <p
                className={`text-base mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Helpline number
              </p>
              <p
                className={`text-sm font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                +(080) 31604490
              </p>
            </div>
            <div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Class to Watch
              </h3>
              <ul className="space-y-3">
                {["Class 9", "Class 10", "Class 11", "Class 12"].map(
                  (movie) => (
                    <li
                      key={movie}
                      className={`text-sm hover:text-[#123a66] cursor-pointer transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {movie}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", path: "/contact" },
                  { name: "Pricing Plan", path: "#" },
                  { name: "Blog", path: "#" },
                  { name: "FAQ", path: "#" }
                ].map((link) => (
                  <li
                    key={link.name}
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Link 
                      to={link.path}
                      className="hover:text-[#123a66] transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                About Company
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", path: "/about-us" },
                  { name: "Terms and Use", path: "/termsofuse" },
                  { name: "Privacy Policy", path: "/policy" },
                  { name: "Refund Policy", path:"/refund-policy"}
                ].map(
                  (item) => (
                    <li
                      key={item.name}
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <Link 
                        to={item.path}
                        className="hover:text-[#123a66] transition-colors inline-block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Follow Us:
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/Hawc.offici"
                  className={`text-xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-500"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/HownWhyClasses"
                  className={`text-xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-300"
                      : "text-gray-700 hover:text-blue-400"
                  }`}
                >
                  <FaXTwitter />
                </a>
                <a
                  href=""
                  className={`text-xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-pink-500"
                      : "text-gray-700 hover:text-pink-600"
                  }`}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/howandwhyclasses/about/"
                  className={`text-xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@HowAndWhyClasses"
                  className={`text-xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-[#123a66]"
                      : "text-gray-700 hover:text-[#123a66]"
                    }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <FaYoutube />
                </a>
              </div>
            </div>
          </div>
          <div
            className={`pt-6 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            } flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}
          >
            <div className="flex-1">
              <p
                className={`text-xs leading-relaxed max-w-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                © 2025 <span className="text-[#123a66] font-bold">How and Why</span> All
                Rights Reserved. All videos and shows on this platform are
                trademarks of, and all related images and content are the
                property of, HAWC Inc. Duplication and copy of this is strictly
                prohibited.
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <h3
                className={`text-sm font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Download HAWC app
              </h3>
              <div className="flex gap-3">
                <button
                  className={`flex items-center px-3 py-2 border rounded-sm text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                  }`}
                >
                  <FaGooglePlay className="mr-2 text-xs" />
                  <div className="text-left">
                    <div
                      className={`text-xs opacity-75 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      GET IT ON
                    </div>
                    <div
                      className={`font-bold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Google Play
                    </div>
                  </div>
                </button>
                <button
                  className={`flex items-center px-3 py-2 border rounded-sm text-base font-medium transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                  }`}
                >
                  <FaApple className="mr-2 text-xs" />
                  <div className="text-left">
                    <div
                      className={`text-xs opacity-75 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Download on the
                    </div>
                    <div
                      className={`font-bold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      App Store
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;