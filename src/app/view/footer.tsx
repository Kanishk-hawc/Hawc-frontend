import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";

type FooterProps = {
  isDarkMode: boolean;
};

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer 
      className={`${isDarkMode ? 'text-gray-300 bg-[#111111]' : 'bg-white text-gray-700'} transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-12">
        {/* First Row - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>iqonic2</h3>
            <p className="mb-2">Email us: customer@streamit.com</p>
            <p className="mb-4">Helpline number: +(480) 555-0103</p>
          </div>

          {/* Movies to Watch */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Movies to Watch</h3>
            <ul className="space-y-2">
              {['The Hunter', 'Krishna', 'Spiderman', 'Fast Furious'].map(movie => (
                <li key={movie}>{movie}</li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Quick Links</h3>
            <ul className="space-y-2">
              {['Contact Us', 'Pricing Plan', 'Blog', 'FAQ'].map(link => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Shop', 'Terms and Use', 'Privacy Policy'].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          {/* Newsletter */}
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Subscribe Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email" 
                placeholder="Email" 
                className={`px-4 py-2 w-full sm:flex-1 rounded-l ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-800'}`}
              />
              <button className={`px-4 py-2 rounded-r ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Follow Us:</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-400"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-blue-400"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-pink-500"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-red-500"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Download App */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4">
          <h3 className={`text-lg font-bold mb-2 sm:mb-0 ${isDarkMode ? 'text-white' : 'text-black'}`}>Download streamit app</h3>
          <button className={`flex items-center px-4 py-2 border rounded ${isDarkMode ? 'bg-[#121212] hover:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <FaApple className="mr-2" /> App Store
          </button>
          <button className={`flex items-center px-4 py-2 border rounded ${isDarkMode ? 'bg-[#121212] hover:bg-[#1a1a1a]' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <FaGooglePlay className="mr-2" /> Google Play
          </button>
        </div>

        {/* Bottom Text */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-center text-sm sm:text-base">
            © 2025 STREAMIT. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
