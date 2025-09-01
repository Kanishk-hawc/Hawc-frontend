import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

type SignupPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess: (user: any) => void; 
};
interface BoardOption {
  id: string;
  name: string;
}

interface ClassOption {
  id: string;
  name: string;
}

const SignupPanel: React.FC<SignupPanelProps> = ({
  isOpen,
  onClose,
  onSignupSuccess,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const boards: BoardOption[] = [
    { id: "cbse", name: "CBSE" },
    { id: "icse", name: "ICSE" },
    { id: "state", name: "State Board" },
  ];

  const classes: ClassOption[] = [
    { id: "9", name: "Class 9" },
    { id: "10", name: "Class 10" },
    { id: "11", name: "Class 11" },
    { id: "12", name: "Class 12" },
  ];

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !mobile || !password || !selectedBoard || !selectedClass) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://lms.hawc.in/api/register/student", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
        password: password,
        board: selectedBoard,
        class: selectedClass,
      });

      const { message: responseMessage, user } = response.data;

      setMessage(responseMessage);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      setSelectedBoard("");
      setSelectedClass("");
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        onSignupSuccess(user);
      }
      
      onClose();
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
      <div
        className={`fixed top-0 right-0 scrollbar-hide h-full w-80 md:w-[400px] lg:w-[500px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col overflow-y-auto`}
      >
        <div className="flex items-center p-4 mt-9">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4 mt-0 mb-12"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt- text-left w-full mt-10">
            Sign Up
          </h2>
        </div>

        <div className="flex flex-col items-center justify-start flex-1 p-4 gap-3 -mt-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-green-600 text-xs">{message}</p>}

          <div className="flex gap-4 w-64 sm:w-72 md:w-80">
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="w-64 sm:w-72 md:w-80">
            <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="w-64 sm:w-72 md:w-80">
            <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
              Mobile
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-4 w-64 sm:w-72 md:w-80">
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 w-64 sm:w-72 md:w-80">
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                Select Board
              </label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select Board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-xs self-start">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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