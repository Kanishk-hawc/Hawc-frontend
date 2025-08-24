import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface ContactPageProps {
  isDarkMode?: boolean;
}

const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode = false }) => {
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const textSecondaryColor = isDarkMode ? "text-gray-300" : "text-gray-500";
  const cardBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardTextColor = isDarkMode ? "text-gray-200" : "text-gray-600";
  const iconColor = isDarkMode ? "text-indigo-400" : "text-indigo-600";

  return (
    <div className={`min-h-screen ${bgColor} p-8 flex flex-col items-center `}>
      {/* Title */}
      <h1 className={`text-2xl font-bold ${textColor} mt-40 mb-2`}>Contact Us</h1>
      <p className={`${textSecondaryColor} mb-8 max-w-xl text-center`}>
        Get in touch with How & Why Cognition R&D Private Limited. We're here to help you.
      </p>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-8 mt-4 w-full max-w-6xl">
        
        {/* Google Map */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">
          <iframe
            title="company-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.7932745074324!2d75.82701!3d22.724383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdc5f65a79a9%3A0xdda3c1b69a4e2e6c!2s178%2C%20Aerodrum%20Rd%2C%20Shakti%20Nagar%2C%20Parihar%20Market%2C%20Sadhna%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452006!5e0!3m2!1sen!2sin!4v1692789000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className={`${cardBgColor} rounded-xl shadow p-6 flex flex-col justify-center space-y-6`}>
          {/* Address */}
          <div>
            <h2 className={`font-semibold ${textColor} flex items-center gap-2`}>
              <FaMapMarkerAlt className={iconColor} /> Our Offices
            </h2>
            <p className={`${cardTextColor} mt-2`}>
              Panchvati Nagar 178 Aerodrum Road, Aerodrum Road, Near Airport, Indore, 452006
            </p>
            <p className={`${cardTextColor} mt-2`}>
              C 02 Club Meadows House of Hiranandani, Begur, near Meenakshi Mall, Bengaluru, 560076
            </p>
          </div>

          {/* Phone */}
          <div>
            <h2 className={`font-semibold ${textColor} flex items-center gap-2`}>
              <FaPhoneAlt className={iconColor} /> Phone
            </h2>
            <p className={`${cardTextColor} mt-2`}>+91 9902570374</p>
          </div>

          {/* Email */}
          <div>
            <h2 className={`font-semibold ${textColor} flex items-center gap-2`}>
              <FaEnvelope className={iconColor} /> Email
            </h2>
            <p className={`${cardTextColor} mt-2`}>hawc.technologies@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;