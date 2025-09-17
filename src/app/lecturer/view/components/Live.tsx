import { useState, useEffect } from "react";
import axios from "axios";
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

interface LiveClass {
  id: number;
  topic_id?: number;
  sub_topic_id?: number;
  staff_user_id: number;
  short_name: string;
  long_name: string;
  description: string;
  image_url: string | null;
  live_lecture_url: string | null;
  start_date: string;
  end_date: string;
  duration: number;
  lecture_type: string | null;
  tags: string | null;
  is_active: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  meeting_id: string;
  token: string | string[];
  preset?: string;
  topic_short_name?: string;
  topic_long_name?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    liveClasses: LiveClass[];
  };
  message: string;
}

const LiveClass = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useHistory();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const userData = localStorage.getItem("user");
        let bearerToken = "";
        let role = "";

        if (userData) {
          try {
            const parsed = JSON.parse(userData);
            bearerToken = parsed.token || "";
            role = parsed.role || "";
            setUserRole(role);
          } catch (err) {
            console.error("Error parsing user data:", err);
          }
        }

        if (!bearerToken) {
          setError("No bearer token found");
          setLoading(false);
          return;
        }

        // Determine API endpoint based on user role
        let apiUrl = "";
        if (role === "jr_lecturer") {
          apiUrl = "https://lms.hawc.in/api/staff/mydoubtclasses";
        } else if (role === "main_lecturer") {
          apiUrl = "https://lms.hawc.in/api/staff/myclasses";
        } else {
          setError("Unknown user role");
          setLoading(false);
          return;
        }

        const response = await axios.get<ApiResponse>(apiUrl, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });

        if (response.data.success) {
          setLiveClasses(response.data.data.liveClasses);
        } else {
          setError("Failed to fetch live classes");
        }
      } catch (err) {
        console.error("Error fetching live classes:", err);
        setError("Error fetching live classes");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartClass = (liveClass: LiveClass) => {
    const token = Array.isArray(liveClass.token) 
      ? liveClass.token[0] 
      : liveClass.token;
    localStorage.setItem('currentLiveClass', JSON.stringify({
      meetingId: liveClass.meeting_id,
      token: token,
      className: liveClass.long_name,
      shortName: liveClass.short_name,
      description: liveClass.description,
      duration: liveClass.duration,
      startDate: liveClass.start_date,
      endDate: liveClass.end_date,
      preset: liveClass.preset || "default_preset"
    }));
    
    if (userRole === "jr_lecturer") {
      navigate.push("/live-doubt");
    } else {
      navigate.push("/live");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-4">Loading classes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (liveClasses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div>No live classes scheduled</div>
      </div>
    );
  }
  const currentClass = liveClasses[0];
  const startDate = new Date(currentClass.start_date);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-white">
      <div className="mx-auto">
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 p-4 md:p-8 lg:p-12 xl:p-20 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-80 md:h-96">
              {!showVideo ? (
                <div className="w-full h-full relative">
                  <img
                    src={maths}
                    alt={currentClass.short_name}
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

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                <span className="text-sm text-purple-300 font-medium">
                  {currentClass.short_name}
                </span>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 mb-2 md:mb-3">
                  {currentClass.long_name}
                </h1>

                <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-400 mr-1 md:mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-blue-400 mr-1 md:mr-2" />
                    <span>{formattedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-blue-400 mr-1 md:mr-2" />
                    <span>24 students</span>
                  </div>
                </div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-2 mt-2 line-clamp-2">
                  {currentClass.description}
                </p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-lg flex justify-center text-sm md:text-base font-semibold transition-all duration-300 w-full md:w-auto"
                  onClick={() => handleStartClass(currentClass)}
                >
                  <FaPlay className="mr-2 self-center text-xs" /> Start Class Now
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 ml-0 lg:ml-2 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-x-8 xl:gap-x-10 justify-items-center">
              <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg relative overflow-hidden h-32 md:h-36 lg:h-40 w-full max-w-xs group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-30">
                  <img src={NoFStudent} alt="Students" className="w-full h-full object-contain" />
                </div>
                <div className="text-blue-600 text-2xl md:text-3xl">
                  <FaUserGraduate className="text-4xl md:text-5xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">24</h2>
                <p className="text-gray-600 text-xs md:text-sm">Expected Students</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg relative overflow-hidden h-32 md:h-36 lg:h-40 w-full max-w-xs group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-30">
                  <img src={NoFHours} alt="Hours" className="w-full h-full object-contain" />
                </div>
                <div className="text-green-600 text-2xl md:text-3xl mb-1 md:mb-2">
                  <FaClock className="text-4xl md:text-5xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {currentClass.duration} mins
                </h2>
                <p className="text-gray-600 text-xs md:text-sm">No of Hours</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg relative overflow-hidden h-32 md:h-36 lg:h-40 w-full max-w-xs group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-30">
                  <img src={Mark} alt="Marks" className="w-full h-full object-contain" />
                </div>
                <div className="text-sky-500 text-2xl md:text-3xl mb-1 md:mb-2">
                  <FaStar className="text-4xl md:text-5xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">84%</h2>
                <p className="text-gray-600 text-xs md:text-sm">Average Marks</p>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg relative overflow-hidden h-32 md:h-36 lg:h-40 w-full max-w-xs group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-30">
                  <img src={TotalLive} alt="Live Classes" className="w-full h-full object-contain" />
                </div>
                <div className="text-orange-500 text-2xl md:text-3xl mb-1 md:mb-2">
                  <FaUsers className="text-4xl md:text-5xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {liveClasses.length}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm">Total Live</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden p-4 md:p-6 space-y-6">
          <div className="rounded-xl overflow-hidden shadow relative h-64">
            {!showVideo ? (
              <img
                src={maths}
                alt={currentClass.short_name}
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
              <span className="text-sm text-purple-300">
                {currentClass.short_name}
              </span>
              <h1 className="text-xl font-bold">{currentClass.long_name}</h1>
              <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                {currentClass.description}
              </p>
              <button
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-white font-semibold"
                onClick={() => handleStartClass(currentClass)}
              >
                Start Class Now
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <FaUserGraduate className="text-blue-600 mx-auto text-xl md:text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">24</h2>
              <p className="text-gray-600 text-xs">Expected Students</p>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <FaClock className="text-green-600 mx-auto text-xl md:text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">
                {currentClass.duration} mins
              </h2>
              <p className="text-gray-600 text-xs">No of Hours</p>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <FaStar className="text-sky-500 mx-auto text-xl md:text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">84%</h2>
              <p className="text-gray-600 text-xs">Average Marks</p>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow text-center">
              <FaUsers className="text-orange-500 mx-auto text-xl md:text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">
                {liveClasses.length}
              </h2>
              <p className="text-gray-600 text-xs">Total Live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
