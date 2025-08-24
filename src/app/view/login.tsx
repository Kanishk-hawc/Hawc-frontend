import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ import Link

type LoginPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
};

const LoginPanel: React.FC<LoginPanelProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { message, user } = response.data;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        onLoginSuccess(user);
        onClose();
      } else {
        setError(message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 md:w-[500px] lg:w-[600px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center p-4">
        <button
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4 mt-10 mb-20"
        >
          <FaTimes size={30} />
        </button>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-36 text-left w-full">Login</h2>
      </div>

      <div className="flex flex-col items-center justify-start flex-1 p-6 gap-4 -mt-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Add new / Sign up */}
        <p className="text-sm text-gray-700 dark:text-gray-300 text-left w-full">
          Are you new here?{" "}
          <span className="text-blue-600 underline cursor-pointer">Sign Up</span>
        </p>

        {/* Email */}
        <label className="text-gray-700 dark:text-gray-300 text-sm self-start ml-6 md:ml-20">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-72 sm:w-80 md:w-96 p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        {/* Password */}
        <label className="text-gray-700 dark:text-gray-300 text-sm self-start ml-6 md:ml-20">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-72 sm:w-80 md:w-96 p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        {/* Forget password */}
        <p className="text-sm text-blue-600 underline cursor-pointer self-start ml-20">Forget Password?</p>

        {/* Submit button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ backgroundColor: "#595959" }}
          className="w-72 sm:w-80 md:w-96 text-white py-3 rounded mt-6 hover:opacity-90 transition-opacity duration-200"
        >
          {loading ? "Logging in..." : "Continue"}
        </button>

        {/* Terms & Conditions */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          By clicking on Continue, I accept the{" "}
          <Link to="/termsofuse" className="underline cursor-pointer text-blue-600">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link to="/policy" className="underline cursor-pointer text-blue-600">
            Privacy Policy
          </Link>{" "}
          &{" "}
          <Link to="/refund-policy" className="underline cursor-pointer text-blue-600">
            Refund Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPanel;
