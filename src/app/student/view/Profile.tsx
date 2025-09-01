import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Import the auth context

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
          isDarkMode ? "bg-transparent text-gray-300" : "bg-gray-50 text-gray-500"
        }`}
      >
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkMode ? "bg-transparent text-gray-100" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto rounded-2xl shadow p-8 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Profile Header with Sign Out Button */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <p className="text-sm">{user.email}</p>
              <p className="text-xs capitalize">{user.role}</p>
            </div>
          </div>
          
          {/* Sign Out Button */}
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

        {/* Personal Info */}
        <div className="mb-10">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>
          <p className="text-sm mb-4">
            Basic info, like your name and address, that you use on Nio Platform.
          </p>

          <div
            className={`divide-y border rounded-lg ${
              isDarkMode ? "border-gray-600 divide-gray-600" : ""
            }`}
          >
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
                className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {item.label}
                </span>
                <span className="text-gray-900 dark:text-gray-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Preferences */}
        <div>
          <h2 className="text-lg font-medium mb-4">Personal Preferences</h2>
          <p className="text-sm mb-4">
            Your personalized preference allows you best use.
          </p>

          <div
            className={`divide-y border rounded-lg ${
              isDarkMode ? "border-gray-600 divide-gray-600" : ""
            }`}
          >
            {/* Language Preference */}
            <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-gray-600 dark:text-gray-400">
                    Language
                  </span>
                  {isEditing.language ? (
                    <select
                      className="mt-1 p-1 border rounded dark:bg-gray-700 dark:text-white"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange("language", e.target.value)}
                    >
                      <option value="English (United States)">English (United States)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-200">
                      {preferences.language}
                    </span>
                  )}
                </div>
                {isEditing.language ? (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => handleSave("language")}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => toggleEdit("language")}
                  >
                    Change Language
                  </button>
                )}
              </div>
            </div>

            {/* Date Format Preference */}
            <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-gray-600 dark:text-gray-400">
                    Date Format
                  </span>
                  {isEditing.dateFormat ? (
                    <select
                      className="mt-1 p-1 border rounded dark:bg-gray-700 dark:text-white"
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange("dateFormat", e.target.value)}
                    >
                      <option value="M d, YYYY">M d, YYYY (Jan 1, 2023)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (01/01/2023)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (01/01/2023)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2023-01-01)</option>
                    </select>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-200">
                      {preferences.dateFormat}
                    </span>
                  )}
                </div>
                {isEditing.dateFormat ? (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => handleSave("dateFormat")}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => toggleEdit("dateFormat")}
                  >
                    Change
                  </button>
                )}
              </div>
            </div>

            {/* Timezone Preference */}
            <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-gray-600 dark:text-gray-400">
                    Timezone
                  </span>
                  {isEditing.timezone ? (
                    <select
                      className="mt-1 p-1 border rounded dark:bg-gray-700 dark:text-white"
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                    >
                      <option value="Bangladesh (GMT +6)">Bangladesh (GMT +6)</option>
                      <option value="EST (GMT -5)">EST (GMT -5)</option>
                      <option value="PST (GMT -8)">PST (GMT -8)</option>
                      <option value="CET (GMT +1)">CET (GMT +1)</option>
                    </select>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-200">
                      {preferences.timezone}
                    </span>
                  )}
                </div>
                {isEditing.timezone ? (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => handleSave("timezone")}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => toggleEdit("timezone")}
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;