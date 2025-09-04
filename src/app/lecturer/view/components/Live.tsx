import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPlay,
  FaUsers,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import maths from "../../assets/images/maths.jpg";
import NoFStudent from "./assets/1.png";
import NoFHours from "./assets/green.png";
import Mark from "./assets/green.png";
import TotalLive from "./assets/orange.png";

const LiveClass = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useHistory();

  const mathClass = {
    id: 5,
    src: maths,
    alt: "Maths",
    subject: "Mathematics",
    time: "3:15PM",
    language: "Hindi",
    topic: "Introduction to Calculus",
    date: "Dec 25, 2024",
    expectedStudents: 24,
    duration: "60 mins",
    objectives:
      "Introduction to Calculus is the study of change and motion, forming the foundation of advanced mathematics and its applications in science, engineering, and economics. It primarily consists of two branches",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartClass = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      navigate.push("/live"); 
    }, 2000);
  };

  return (
    <div className="text-white">
      <div className="mx-auto">
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 p-20 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-96">
              {!showVideo ? (
                <div className="w-full h-full relative">
                  <img
                    src={mathClass.src}
                    alt={mathClass.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  >
                    <source
                      src="https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-sm text-purple-300 font-medium">
                  {mathClass.subject}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-3">
                  {mathClass.topic}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-400 mr-2" />
                    <span>{mathClass.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-blue-400 mr-2" />
                    <span>{mathClass.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-blue-400 mr-2" />
                    <span>{mathClass.expectedStudents} students</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  {mathClass.objectives}
                </p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex justify-center text-base font-semibold transition-all duration-300 disabled:opacity-50"
                  onClick={handleStartClass}
                  disabled={isStarting}
                >
                  {isStarting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 
                          0 0 5.373 0 12h4zm2 5.291A7.962 
                          7.962 0 014 12H0c0 3.042 1.135 
                          5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Preparing...
                    </div>
                  ) : (
                    <>
                      <FaPlay className="mr-2 text-xs" /> Start Class Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 ml-2 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-x-10 justify-items-center">

              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={NoFStudent} alt="Students" />
                </div>
                <div className="text-blue-600 text-3xl">
                  <FaUserGraduate className="text-5xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {mathClass.expectedStudents}
                </h2>
                <p className="text-gray-600 text-sm">Expected Students</p>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={NoFHours} alt="Hours" />
                </div>
                <div className="text-green-600 text-3xl mb-2">
                  <FaClock className="text-5xl"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {mathClass.duration}
                </h2>
                <p className="text-gray-600 text-sm">No of Hours</p>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={Mark} alt="Marks" />
                </div>
                <div className="text-sky-500 text-3xl mb-2">
                  <FaStar className="text-5xl"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">84%</h2>
                <p className="text-gray-600 text-sm">Average Marks</p>
              </div>
              {/* Card 4 */}
              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={TotalLive} alt="Live Classes" />
                </div>
                <div className="text-orange-500 text-3xl mb-2">
                  <FaUsers className="text-5xl"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">15</h2>
                <p className="text-gray-600 text-sm">Total Live</p>
              </div>
            </div>
          </div>
        </div>

        {/* --------- MOBILE VIEW --------- */}
        <div className="lg:hidden p-6 space-y-6">
          {/* Video / Banner */}
          <div className="rounded-xl overflow-hidden shadow relative h-64">
            {!showVideo ? (
              <img
                src={mathClass.src}
                alt={mathClass.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <video className="w-full h-full object-cover" autoPlay muted loop>
                <source
                  src="https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4"
                  type="video/mp4"
                />
              </video>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-sm text-purple-300">{mathClass.subject}</span>
              <h1 className="text-xl font-bold">{mathClass.topic}</h1>
              <p className="text-gray-300 text-xs mt-2">{mathClass.objectives}</p>
              <button
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-white font-semibold disabled:opacity-50"
                onClick={handleStartClass}
                disabled={isStarting}
              >
                {isStarting ? "Preparing..." : "Start Class Now"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaUserGraduate className="text-blue-600 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">
                {mathClass.expectedStudents}
              </h2>
              <p className="text-gray-600 text-xs">Expected Students</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaClock className="text-green-600 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">
                {mathClass.duration}
              </h2>
              <p className="text-gray-600 text-xs">No of Hours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaStar className="text-sky-500 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">84%</h2>
              <p className="text-gray-600 text-xs">Average Marks</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaUsers className="text-orange-500 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">15</h2>
              <p className="text-gray-600 text-xs">Total Live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
