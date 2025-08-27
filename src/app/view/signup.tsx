import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

type SignupPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess: (user: any) => void; 
};

const SignupPanel: React.FC<SignupPanelProps> = ({
  isOpen,
  onClose,
  onSignupSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentClass, setStudentClass] = useState("9");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        userClass: studentClass,
      });

      const { message, user } = response.data;

      setMessage(message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStudentClass("9");
      localStorage.setItem("user", JSON.stringify(user));

      onSignupSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background overlay with blur */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Signup panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-[400px] lg:w-[500px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col overflow-y-auto`}
      >
        <div className="flex items-center p-4">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4 mt-6 mb-12"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-28 text-left w-full">
            Sign Up
          </h2>
        </div>

        <div className="flex flex-col items-center justify-start flex-1 p-4 gap-3 -mt-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-green-600 text-xs">{message}</p>}

          <label className="text-gray-700 dark:text-gray-300 text-xs self-start ml-6 md:ml-20">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-64 sm:w-72 md:w-80 p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

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

          <label className="text-gray-700 dark:text-gray-300 text-xs self-start ml-6 md:ml-20">
            Re-enter Password
          </label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-64 sm:w-72 md:w-80 p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <label className="text-gray-700 dark:text-gray-300 text-xs self-start ml-6 md:ml-20">
            Class
          </label>
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-64 sm:w-72 md:w-80 p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{ backgroundColor: "#595959" }}
            className="w-64 sm:w-72 md:w-80 text-white py-2 text-sm rounded mt-4 hover:opacity-90 transition-opacity duration-200"
          >
            {loading ? "Signing up..." : "Continue"}
          </button>

          <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-2 leading-snug">
            By clicking on Continue, I accept the{" "}
            <span className="underline cursor-pointer">Terms & Conditions</span>,{" "}
            <span className="underline cursor-pointer">Privacy Policy</span> &{" "}
            <span className="underline cursor-pointer">Refund Policy</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPanel;
