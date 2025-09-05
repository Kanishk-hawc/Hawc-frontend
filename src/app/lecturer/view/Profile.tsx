import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; 

type User = {
  name: string;
  email: string;
  role: string;
};

type Preferences = {
  language: string;
  dateFormat: string;
  timezone: string;
};

type ProfilePageProps = {
  isDarkMode: boolean;
};
const BillingPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Current Subscription</h3>
        <div className="border rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="font-medium">
              Premium Model -{" "}
              <span className="text-gray-700 font-semibold">₹ 89999/ Yearly</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Unlimited access with priority support, 99.95% uptime, powerful
              features and more...
            </p>
          </div>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Change Plan
          </button>
        </div>
        <div className="flex items-center mt-3">
          <label className="mr-2 text-sm text-gray-600">Auto Renewal</label>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Billing Cycle</h3>
        <p className="text-sm text-gray-500 mb-3">
          Your subscription renews on <strong>Jan 28, 2020</strong>{" "}
          <span className="text-gray-400">(2 months 17 days remaining)</span>.
        </p>
        <div className="border rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="font-medium">Yearly Subscription</p>
            <p className="text-sm text-gray-500 mt-1">
              Next payment: <strong>89999 INR</strong> on Jan 28, 2026
              <br />
              Last payment made: Jan 28, 2025
            </p>
          </div>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Switch Billing Cycle
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Manage Licenses</h3>
        <div className="border rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="text-sm text-gray-600">
            <strong>20 Licenses</strong>
            <br />
            Licensed members have full access to all NioAccount Features.
          </p>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Manage License
          </button>
        </div>
      </div>
    </div>
  );
};
const SettingsPage: React.FC = () => {
  const [logsEnabled, setLogsEnabled] = useState(true);
  const [twoFA, setTwoFA] = useState(true);

  const recentActivities = [
    {
      browser: "Chrome on Window",
      ip: "192.149.122.128",
      time: "11:34 PM",
    },
    {
      browser: "Mozilla on Window",
      ip: "86.188.154.225",
      time: "Nov 20, 2019 10:24 PM",
    },
    {
      browser: "Chrome on iMac",
      ip: "192.149.122.128",
      time: "Nov 12, 2019 08:56 PM",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Security Settings */}
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      <p className="text-sm text-gray-500 mb-6">
        These settings are helps you keep your account secure.
      </p>

      {/* Save Activity Logs */}
      <div className="border rounded-lg p-6 mb-4 flex justify-between items-center">
        <div>
          <p className="font-medium">Save my Activity Logs</p>
          <p className="text-sm text-gray-500">
            You can save all your activity logs including unusual activity
            detected.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={logsEnabled}
            onChange={() => setLogsEnabled(!logsEnabled)}
            className="sr-only"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition ${
              logsEnabled ? "translate-x-5" : ""
            }`}
          ></div>
        </label>
      </div>

      {/* Change Password */}
      <div className="border rounded-lg p-6 mb-4 flex justify-between items-center">
        <div>
          <p className="font-medium">Change Password</p>
          <p className="text-sm text-gray-500">
            Set a unique password to protect your account.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Last changed: <span className="italic">Oct 2, 2019</span>
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Change Password
        </button>
      </div>

      {/* 2FA Authentication */}
      <div className="border rounded-lg p-6 mb-8 flex justify-between items-center">
        <div>
          <p className="font-medium">
            2FA Authentication{" "}
            {twoFA && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Enabled
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Secure your account with 2FA security. When it is activated you will
            need to enter not only your password, but also a special code using
            app. You can receive this code by in mobile app.
          </p>
        </div>
        <button
          onClick={() => setTwoFA(!twoFA)}
          className={`px-4 py-2 rounded-lg ${
            twoFA
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {twoFA ? "Disable" : "Enable"}
        </button>
      </div>

      {/* Recent Activity */}
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <p className="text-sm text-gray-500 mb-4">
        This information about the last login activity on your account.
      </p>
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Browser</th>
              <th className="px-6 py-3">IP</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((log, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-3">{log.browser}</td>
                <td className="px-6 py-3">{log.ip}</td>
                <td className="px-6 py-3">{log.time}</td>
                <td className="px-6 py-3 text-red-500 cursor-pointer">✕</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-right">
        <button className="text-blue-600 text-sm hover:underline">
          See full log
        </button>
      </div>
    </div>
  );
};

// NotificationsPage component
const NotificationsPage: React.FC = () => {
  const [alerts, setAlerts] = useState({
    unusualActivity: true,
    newBrowser: false,
  });

  const [news, setNews] = useState({
    sales: true,
    features: false,
    tips: true,
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Notification Settings */}
      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
      <p className="text-sm text-gray-500 mb-6">
        You will get only notification what have enabled.
      </p>

      {/* Security Alerts */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Security Alerts</h4>
        <p className="text-sm text-gray-500 mb-4">
          You will get only those email notification what you want.
        </p>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">
              Email me whenever encounter unusual activity
            </span>
            <input
              type="checkbox"
              checked={alerts.unusualActivity}
              onChange={() =>
                setAlerts((prev) => ({
                  ...prev,
                  unusualActivity: !prev.unusualActivity,
                }))
              }
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                alerts.unusualActivity ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition ${
                  alerts.unusualActivity ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">
              Email me if new browser is used to sign in
            </span>
            <input
              type="checkbox"
              checked={alerts.newBrowser}
              onChange={() =>
                setAlerts((prev) => ({
                  ...prev,
                  newBrowser: !prev.newBrowser,
                }))
              }
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                alerts.newBrowser ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition ${
                  alerts.newBrowser ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* News Section */}
      <div>
        <h4 className="font-medium mb-2">News</h4>
        <p className="text-sm text-gray-500 mb-4">
          You will get only those email notification what you want.
        </p>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">
              Notify me by email about sales and latest news
            </span>
            <input
              type="checkbox"
              checked={news.sales}
              onChange={() =>
                setNews((prev) => ({ ...prev, sales: !prev.sales }))
              }
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                news.sales ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition ${
                  news.sales ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">
              Email me about new features and updates
            </span>
            <input
              type="checkbox"
              checked={news.features}
              onChange={() =>
                setNews((prev) => ({ ...prev, features: !prev.features }))
              }
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                news.features ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition ${
                  news.features ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">
              Email me about tips on using account
            </span>
            <input
              type="checkbox"
              checked={news.tips}
              onChange={() =>
                setNews((prev) => ({ ...prev, tips: !prev.tips }))
              }
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                news.tips ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition ${
                  news.tips ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ isDarkMode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    language: "English (United States)",
    dateFormat: "M d, YYYY",
    timezone: "Bangladesh (GMT +6)",
  });
  const [isEditing, setIsEditing] = useState<{
    language: boolean;
    dateFormat: boolean;
    timezone: boolean;
  }>({
    language: false,
    dateFormat: false,
    timezone: false,
  });
  
  const [activeTab, setActiveTab] = useState<string>('Personal');
  
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPreferences = localStorage.getItem("preferences");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);
    localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
  };

  const toggleEdit = (field: keyof typeof isEditing) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field],
    });
  };

  const handleSave = (field: keyof Preferences) => {
    toggleEdit(field as keyof typeof isEditing);
  };

  const handleSignOut = () => {
    logout(); 
    history.push("/"); 
  };

  if (!user) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? "bg-transparent text-gray-300" : "bg-white text-gray-500"
        }`}
      >
        Loading profile...
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-transparent text-gray-100" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Account Setting</h2>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            You have full control to manage your own account setting.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b mb-6">
          {['Personal', 'Billing', 'Settings', 'Notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 ${
                tab === activeTab 
                  ? 'border-blue-500 text-blue-500' 
                  : `border-transparent ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Personal Tab Content */}
        {activeTab === 'Personal' && (
          <>
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Basic info, like your name and address, that you use on Nio Platform.
              </p>
              
              <div className={`border rounded-lg divide-y ${isDarkMode ? "border-gray-600 divide-gray-600" : ""}`}>
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Role", value: user.role },
                  { label: "Phone Number", value: "Not added yet" },
                  { label: "Date of Birth", value: "—" },
                  { label: "Address", value: "—" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center p-4 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                      {item.label}
                    </span>
                    <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Preferences */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Preferences</h2>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Your personalized preference allows you best use.
              </p>
              
              <div className={`border rounded-lg divide-y ${isDarkMode ? "border-gray-600 divide-gray-600" : ""}`}>
                {/* Language Preference */}
                <div className={`p-4 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Language
                      </span>
                      {isEditing.language ? (
                        <select
                          className={`mt-1 p-1 border rounded ${isDarkMode ? "bg-gray-700 text-white" : ""}`}
                          value={preferences.language}
                          onChange={(e) => handlePreferenceChange("language", e.target.value)}
                        >
                          <option value="English (United States)">English (United States)</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      ) : (
                        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                          {preferences.language}
                        </span>
                      )}
                    </div>
                    {isEditing.language ? (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => handleSave("language")}
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => toggleEdit("language")}
                      >
                        Change Language
                      </button>
                    )}
                  </div>
                </div>

                {/* Date Format Preference */}
                <div className={`p-4 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Date Format
                      </span>
                      {isEditing.dateFormat ? (
                        <select
                          className={`mt-1 p-1 border rounded ${isDarkMode ? "bg-gray-700 text-white" : ""}`}
                          value={preferences.dateFormat}
                          onChange={(e) => handlePreferenceChange("dateFormat", e.target.value)}
                        >
                          <option value="M d, YYYY">M d, YYYY (Jan 1, 2023)</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY (01/01/2023)</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY (01/01/2023)</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD (2023-01-01)</option>
                        </select>
                      ) : (
                        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                          {preferences.dateFormat}
                        </span>
                      )}
                    </div>
                    {isEditing.dateFormat ? (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => handleSave("dateFormat")}
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => toggleEdit("dateFormat")}
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>

                {/* Timezone Preference */}
                <div className={`p-4 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Timezone
                      </span>
                      {isEditing.timezone ? (
                        <select
                          className={`mt-1 p-1 border rounded ${isDarkMode ? "bg-gray-700 text-white" : ""}`}
                          value={preferences.timezone}
                          onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                        >
                          <option value="Bangladesh (GMT +6)">Bangladesh (GMT +6)</option>
                          <option value="EST (GMT -5)">EST (GMT -5)</option>
                          <option value="PST (GMT -8)">PST (GMT -8)</option>
                          <option value="CET (GMT +1)">CET (GMT +1)</option>
                        </select>
                      ) : (
                        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>
                          {preferences.timezone}
                        </span>
                      )}
                    </div>
                    {isEditing.timezone ? (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => handleSave("timezone")}
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        className="text-blue-500 hover:underline text-sm"
                        onClick={() => toggleEdit("timezone")}
                      >
                        Change
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSignOut}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                Sign Out
              </button>
            </div>
          </>
        )}

        {/* Billing Tab Content */}
        {activeTab === 'Billing' && (
          <BillingPage />
        )}

        {/* Settings Tab Content */}
        {activeTab === 'Settings' && (
          <SettingsPage />
        )}

        {/* Notifications Tab Content */}
        {activeTab === 'Notifications' && (
          <NotificationsPage />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;