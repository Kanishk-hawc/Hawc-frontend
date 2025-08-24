import React, { useState } from "react";
import { FaRegCreditCard, FaRegEnvelope, FaUser, FaCalendar, FaBell, FaShieldAlt, FaPlug } from "react-icons/fa";

interface SettingsPageProps {
  isDarkMode?: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode = false }) => {
  const tabs = ["General", "Meetings", "Plan & Billing", "Notifications", "Apps", "Security"];
  const [activeTab, setActiveTab] = useState("General");

  // Theme classes based on dark mode
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const secondaryTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const tableHeaderColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const hoverColor = isDarkMode ? "hover:text-indigo-400" : "hover:text-indigo-600";
  const activeTabColor = isDarkMode ? "text-indigo-400 border-indigo-400" : "text-indigo-600 border-indigo-600";

  return (
    <div className={`min-h-screen p-6 ${bgColor} ${textColor}`}>
      <div className="max-w-[1700px] mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className={`flex space-x-6 border-b mb-6 ${secondaryTextColor} ${borderColor}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? `border-b-2 font-medium ${activeTabColor}`
                  : `${hoverColor}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "General" && (
          <section className={`${cardBg} rounded-xl shadow p-6`}>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FaUser /> General Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>English (US)</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Time Zone</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Pacific Time (PT)</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="font-medium">Auto-logout</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>After 24 hours of inactivity</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Meetings" && (
          <section className={`${cardBg} rounded-xl shadow p-6`}>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FaCalendar /> Meetings Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Default Meeting Duration</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>30 minutes</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Buffer Time Between Meetings</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>10 minutes</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="font-medium">Advance Scheduling</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Up to 60 days in advance</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Plan & Billing" && (
          <>
            {/* Subscription Section */}
            <section className={`${cardBg} rounded-xl shadow p-6 mb-6`}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold mb-1">Free</h2>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-md">
                    Active
                  </span>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              <p className={`text-sm ${secondaryTextColor} mt-4`}>80 credits left (20 / 100 used)</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-indigo-600">
                    80
                  </div>
                  <span className={secondaryTextColor}>Credits Left</span>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${secondaryTextColor}`}>Subscription end date:</p>
                  <p className="font-medium">12 Mar 2025</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${secondaryTextColor}`}>Balance</p>
                  <p className="text-xl font-bold">$0.00</p>
                </div>
              </div>
            </section>

            {/* Promo Section */}
            <section className={`${cardBg} rounded-xl shadow p-6 mb-6 flex justify-between items-center`}>
              <div>
                <h2 className="font-semibold">Get 1 month FREE</h2>
                <p className={`text-sm ${secondaryTextColor}`}>Pay annually and get more credits</p>
              </div>
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                View Details
              </button>
            </section>

            {/* Payment Info */}
            <section className={`${cardBg} rounded-xl shadow p-6 mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Payment Information</h2>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Edit</button>
              </div>
              <div className="space-y-2">
                <p className={`flex items-center gap-2 ${secondaryTextColor}`}>
                  <FaRegCreditCard /> Payment Method: **** 9007
                </p>
                <p className={`flex items-center gap-2 ${secondaryTextColor}`}>
                  <FaRegEnvelope /> Billing Email:{" "}
                  <span className="ml-1 font-medium">matthew****@gmail.com</span>
                </p>
              </div>
            </section>

            {/* Billing History */}
            <section className={`${cardBg} rounded-xl shadow p-6`}>
              <h2 className="font-semibold mb-4">Billing History</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-sm border-b ${borderColor} ${tableHeaderColor}`}>
                    <th className="py-2">Invoices</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${borderColor}`}>
                    <td className="py-3">Free Plan</td>
                    <td className="py-3">12 Feb 2025, 08:00 am</td>
                    <td className="py-3">$0.00</td>
                    <td className="py-3 text-green-600">Paid</td>
                  </tr>
                  <tr>
                    <td className="py-3">Free Plan</td>
                    <td className="py-3">12 Dec 2024, 08:00 am</td>
                    <td className="py-3">$0.00</td>
                    <td className="py-3 text-green-600">Paid</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}

        {activeTab === "Notifications" && (
          <section className={`${cardBg} rounded-xl shadow p-6`}>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FaBell /> Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="font-medium">SMS Alerts</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Receive text message alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
                </div>
            </div>
          </section>
        )}

        {activeTab === "Apps" && (
          <section className={`${cardBg} rounded-xl shadow p-6`}>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FaPlug /> Connected Apps
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">G</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Google Calendar</h3>
                    <p className={`text-sm ${secondaryTextColor}`}>Connected</p>
                  </div>
                </div>
                <button className={`text-red-600 hover:underline`}>Disconnect</button>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold">O</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Outlook Calendar</h3>
                    <p className={`text-sm ${secondaryTextColor}`}>Not connected</p>
                  </div>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Connect</button>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className={`text-sm ${secondaryTextColor}`}>Not connected</p>
                  </div>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Connect</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Security" && (
          <section className={`${cardBg} rounded-xl shadow p-6`}>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <FaShieldAlt /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Add an extra layer of security</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Enable</button>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>Last changed 3 months ago</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>Change</button>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="font-medium">Active Sessions</h3>
                  <p className={`text-sm ${secondaryTextColor}`}>3 active sessions</p>
                </div>
                <button className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>View All</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;