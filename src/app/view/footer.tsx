import React from "react";
import {
  FaFacebook,
  // FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
  FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

type FooterProps = {
  isDarkMode: boolean;
  sidebarOpen: boolean;
};

const Footer: React.FC<FooterProps> = ({ isDarkMode, sidebarOpen }) => {
  return (
    <>
      <div className={`w-full h-px ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} ${sidebarOpen ? "ml-80" : "ml-16"}`}></div>
      
      <footer
        className={`${
          isDarkMode ? "bg-[#091E37] text-gray-300" : "bg-white text-gray-700"
        } transition-colors duration-300 relative bottom-16 md:top-20 ${
          sidebarOpen ? "ml-80" : "ml-16"
        } relative top-0 md:right-0 right-10 md:bottom-0 mb-20 `}
      >
        <div className="w-full px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16 text-left">
            <div>
              <div className="flex items-center mb-2">
                <h3
                  className={`text-3xl font-bold mb-1 ${
                    isDarkMode ? "text-[#665bfe]" : "text-black"
                  }`}
                >
                  HAWC
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
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                +(080) 31604490
              </p>
            </div>
            <div>
              <h3
                className={`text-2xl font-bold mb-4 ${
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
                      className={`text-lg hover:text-[#665bfe] cursor-pointer transition-colors ${
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
                className={`text-2xl font-bold mb-4 ${
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
                    className={`text-lg ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Link 
                      to={link.path}
                      className="hover:text-[#665bfe] transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className={`text-2xl font-bold mb-4 ${
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
                      className={`text-lg ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <Link 
                        to={item.path}
                        className="hover:text-[#665bfe] transition-colors inline-block"
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
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Follow Us:
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/Hawc.offici"
                  className={`text-2xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-500"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/HownWhyClasses"
                  className={`text-2xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-300"
                      : "text-gray-700 hover:text-blue-400"
                  }`}
                >
                  <FaXTwitter />
                </a>
                <a
                  href=""
                  className={`text-2xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-pink-500"
                      : "text-gray-700 hover:text-pink-600"
                  }`}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/howandwhyclasses/about/"
                  className={`text-2xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@HowAndWhyClasses"
                  className={`text-2xl transition-colors ${
                    isDarkMode
                      ? "text-gray-300 hover:text-[#665bfe]"
                      : "text-gray-700 hover:text-[#665bfe]"
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
            } flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4`}
          >
            <div className="flex-1">
              <p
                className={`text-base leading-relaxed max-w-2xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                © 2025 <span className="text-[#665bfe] font-bold">HAWC</span> All
                Rights Reserved. All videos and shows on this platform are
                trademarks of, and all related images and content are the
                property of, HAWC Inc. Duplication and copy of this is strictly
                prohibited.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end">
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Download HAWC app
              </h3>
              <div className="flex gap-3">
                <button
                  className={`flex items-center px-3 py-2 border rounded-lg text-base font-medium transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                  }`}
                >
                  <FaGooglePlay className="mr-2 text-lg" />
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
                  className={`flex items-center px-3 py-2 border rounded-lg text-base font-medium transition-colors ${
                    isDarkMode
                      ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                  }`}
                >
                  <FaApple className="mr-2 text-lg" />
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