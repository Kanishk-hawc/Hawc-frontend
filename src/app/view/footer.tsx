import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type FooterProps = {
  isDarkMode: boolean;
};

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      className={`${
        isDarkMode ? "bg-black text-gray-300" : "bg-white text-gray-700"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Main Row - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-32">
          {/* Contact Info */}
          <div>
            <div className="flex items-center mb-3">
              <h3
                className={`text-4xl font-bold mb-2 ${
                  isDarkMode ? "text-red-700" : "text-black"
                }`}
              >
                HAWC
              </h3>
            </div>
            <p
              className={`text-lg mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email us: customer@hawc.com
            </p>
            <p
              className={`text-lg mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Helpline number
            </p>
            <p
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              +(480) 555-0103
            </p>
          </div>

          {/* Movies to Watch */}
          <div>
            <h3
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Movies to Watch
            </h3>
            <ul className="space-y-4">
              {["The Hunter", "Krishna", "Spiderman", "Fast Furious"].map(
                (movie) => (
                  <li
                    key={movie}
                    className={`text-xl hover:text-red-500 cursor-pointer transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {movie}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Contact Us", "Pricing Plan", "Blog", "FAQ"].map((link) => (
                <li
                  key={link}
                  className={`text-xl hover:text-red-500 cursor-pointer transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              About Company
            </h3>
            <ul className="space-y-4">
              {["About Us", "Shop", "Terms and Use", "Privacy Policy"].map(
                (item) => (
                  <li
                    key={item}
                    className={`text-xl hover:text-red-500 cursor-pointer transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Follow Us:
            </h3>
            <div className="flex space-x-5">
              <a
                href="#"
                className={`text-3xl transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-500"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className={`text-3xl transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-300"
                    : "text-gray-700 hover:text-blue-400"
                }`}
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className={`text-3xl transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-pink-500"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className={`text-3xl transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-600"
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright Left, Download App Right */}
        <div
          className={`pt-8 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6`}
        >
          {/* Copyright Text - Left */}
          <div className="flex-1">
            <p
              className={`text-lg leading-relaxed w-1/2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              © 2025 <span className="text-red-500 font-bold">HAWC</span> All
              Rights Reserved. All videos and shows on this platform are
              trademarks of, and all related images and content are the property
              of, HAWC Inc. Duplication and copy of this is strictly prohibited.
            </p>
          </div>

          {/* Download App - Right */}
          <div className="flex flex-col items-end">
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Download HAWC app
            </h3>
            <div className="flex gap-4">
              <button
                className={`flex items-center px-4 py-3 border rounded-lg text-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                }`}
              >
                <FaGooglePlay className="mr-3 text-xl" />
                <div className="text-left">
                  <div
                    className={`text-sm opacity-75 ${
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
                className={`flex items-center px-4 py-3 border rounded-lg text-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-gray-900 hover:bg-gray-800 border-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                }`}
              >
                <FaApple className="mr-3 text-xl" />
                <div className="text-left">
                  <div
                    className={`text-sm opacity-75 ${
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
  );
};

export default Footer;
