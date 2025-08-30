import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import SignupPanel from "./signup"; 

// Set the base URL for API requests
axios.defaults.baseURL = "http://lms.hawc.in/";

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
  const [showSignup, setShowSignup] = useState(false); 

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const { data } = response.data;

      if (data) {
        // Extract token and user info from response
        const { token, name, role_name } = data;
        const role = role_name.toLowerCase();
        const userData = { token, name, role, email };
        
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Call the success callback
        onLoginSuccess(userData);
        onClose();
      } else {
        setError("Login failed: No user data received");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleSignupSuccess = (user: any) => {
    setShowSignup(false);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center p-4">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4 mt-6 mb-12"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-28 text-left w-full">
            Login
          </h2>
        </div>

        <div className="flex flex-col items-center justify-start flex-1 p-4 gap-3 -mt-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <p className="text-xs text-gray-700 dark:text-gray-300 text-left w-full">
            Are you new here?{" "}
            <span 
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setShowSignup(true)} 
            >
              Sign Up
            </span>
          </p>

          <label className="text-gray-700 dark:text-gray-300 text-xs self-start ml-6 md:ml-20">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 sm:w-72 md:w-80 p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <label className="text-gray-700 dark:text-gray-300 text-xs self-start ml-6 md:ml-20">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-64 sm:w-72 md:w-80 p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <p className="text-xs text-blue-600 underline cursor-pointer self-start ml-12">
            Forget Password?
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ backgroundColor: "#595959" }}
            className="w-64 sm:w-72 md:w-80 text-white py-2 text-sm rounded mt-4 hover:opacity-90 transition-opacity duration-200"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-2 leading-snug">
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

      <SignupPanel 
        isOpen={showSignup} 
        onClose={handleCloseSignup}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default LoginPanel;