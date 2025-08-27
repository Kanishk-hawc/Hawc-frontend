import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaUserCircle, FaPhone, FaEnvelope, FaSchool, FaMapMarkerAlt, FaUser,  } from "react-icons/fa";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState({
    phone: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    school: "",
    state: "",
    district: "",
    city: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const response = await axios.get(`http://localhost:5000/user/${userData.id}`);
          if (response.status === 200) {
            const latestUserData = response.data.user;
            setUser(latestUserData);
            setUpdatedInfo({
              phone: latestUserData.phone || "",
              parentName: latestUserData.parentName || "",
              parentPhone: latestUserData.parentPhone || "",
              parentEmail: latestUserData.parentEmail || "",
              school: latestUserData.school || "",
              state: latestUserData.state || "",
              district: latestUserData.district || "",
              city: latestUserData.city || ""
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleUpdate = async () => {
    if (!user || !user.id) {
      setMessage("User information is not available");
      return;
    }
    setSaving(true);
    try {
      const response = await axios.post("http://localhost:5000/update-info", {
        userId: user.id,
        ...updatedInfo
      });
      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://localhost:5000/user/${user.id}`);
        if (updatedResponse.status === 200) {
          const updatedUserData = updatedResponse.data.user;
          setUser(updatedUserData);
          setMessage("Information updated successfully!");
          setIsEditing(false);
          setTimeout(() => setMessage(""), 3000);
        }
      }
    } catch (error: any) {
      console.error("Update error:", error);
      setMessage(error.response?.data?.message || "Update failed. Please check if the server is running.");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#091E37]">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]">
        <div className="text-xl text-gray-600 dark:text-gray-300">User not found. Please log in.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#091E37] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaEdit className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes("success") 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="w-full aspect-square bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-8xl text-blue-600 dark:text-blue-300" />
              )}
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FaPhone className="text-sm" /> Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={updatedInfo.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Add your phone number"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                  />
                </div>
              </div>

              <div className="w-full mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Class Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Class</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user.class}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Student ID</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user.id?.substring(0, 8)}</span>
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div className="w-full mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Parent Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <FaUser className="text-sm" /> Parent's Name
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={updatedInfo.parentName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Add parent's name"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <FaPhone className="text-sm" /> Parent's Phone
                    </label>
                    <input
                      type="text"
                      name="parentPhone"
                      value={updatedInfo.parentPhone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Add parent's phone number"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <FaEnvelope className="text-sm" /> Parent's Email
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={updatedInfo.parentEmail}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Add parent's email"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Subscription
                </h2>
              </div>

              <div className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {user.subscription || "Day Pass"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Ends within 14hr
                </p>

                {/* New line: Packs */}
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Packs end within 14hr
                </p>

                {/* New Subject Title */}
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Subject</h3>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Physics</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Chemistry</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mathematics</div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> Location Information
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <FaSchool className="text-sm" /> School Name
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={updatedInfo.school}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Add your school name"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={updatedInfo.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="State"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={updatedInfo.district}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="District"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={updatedInfo.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="City"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 transition-colors"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setUpdatedInfo({
                        phone: user.phone || "",
                        parentName: user.parentName || "",
                        parentPhone: user.parentPhone || "",
                        parentEmail: user.parentEmail || "",
                        school: user.school || "",
                        state: user.state || "",
                        district: user.district || "",
                        city: user.city || ""
                      });
                    }}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
