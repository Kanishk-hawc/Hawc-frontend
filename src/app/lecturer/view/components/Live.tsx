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
  const [isStarting, setIsStarting] = useState(false);
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
          apiUrl = "http://lms.hawc.in/api/staff/mydoubtclasses";
        } else if (role === "main_lecturer") {
          apiUrl = "http://lms.hawc.in/api/staff/myclasses";
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
    setIsStarting(true);
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
    
    setTimeout(() => {
      setIsStarting(false);
      if (userRole === "jr_lecturer") {
        navigate.push("/live-doubt");
      } else {
        navigate.push("/live");
      }
    }, 2000);
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
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 p-20 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-96">
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

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-sm text-purple-300 font-medium">
                  {currentClass.short_name}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-3">
                  {currentClass.long_name}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-400 mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-blue-400 mr-2" />
                    <span>{formattedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-blue-400 mr-2" />
                    <span>24 students</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  {currentClass.description}
                </p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex justify-center text-base font-semibold transition-all duration-300 disabled:opacity-50"
                  onClick={() => handleStartClass(currentClass)}
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
                      <FaPlay className="mr-2 self-center text-xs" /> Start Class Now
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
                <h2 className="text-2xl font-bold text-gray-800">24</h2>
                <p className="text-gray-600 text-sm">Expected Students</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={NoFHours} alt="Hours" />
                </div>
                <div className="text-green-600 text-3xl mb-2">
                  <FaClock className="text-5xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentClass.duration} mins
                </h2>
                <p className="text-gray-600 text-sm">No of Hours</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                  <img src={Mark} alt="Marks" />
                </div>
                <div className="text-sky-500 text-3xl mb-2">
                  <FaStar className="text-5xl" />
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
                  <FaUsers className="text-5xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {liveClasses.length}
                </h2>
                <p className="text-gray-600 text-sm">Total Live</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden p-6 space-y-6">
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
              <p className="text-gray-300 text-xs mt-2">
                {currentClass.description}
              </p>
              <button
                className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-white font-semibold disabled:opacity-50"
                onClick={() => handleStartClass(currentClass)}
                disabled={isStarting}
              >
                {isStarting ? "Preparing..." : "Start Class Now"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaUserGraduate className="text-blue-600 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">24</h2>
              <p className="text-gray-600 text-xs">Expected Students</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <FaClock className="text-green-600 mx-auto text-2xl" />
              <h2 className="text-lg font-bold text-gray-800">
                {currentClass.duration} mins
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








// import { useState, useEffect } from "react";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaPlay,
//   FaUsers,
//   FaUserGraduate,
//   FaStar,
//   FaChevronRight,
//   FaVideo,
//   FaRegPlayCircle,
// } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import maths from "../../assets/images/maths.jpg";
// import NoFStudent from "./assets/1.png";
// import NoFHours from "./assets/green.png";
// import Mark from "./assets/green.png";
// import TotalLive from "./assets/orange.png";
// import axios from "axios";

// interface SubTopic {
//   sub_topic_id: number;
//   sub_topic_name: string;
//   meeting_id: string;
//   token: string;
//   preset: string;
// }

// const LiveClass = () => {
//   const [isStarting, setIsStarting] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("liveClass");
//   const navigate = useHistory();

//   const mathClass = {
//     id: 5,
//     src: maths,
//     alt: "Maths",
//     subject: "Mathematics",
//     time: "3:15PM",
//     language: "Hindi",
//     topic: "Introduction to Calculus",
//     date: "Dec 25, 2024",
//     expectedStudents: 24,
//     duration: "60 mins",
//     objectives:
//       "Introduction to Calculus is the study of change and motion, forming the foundation of advanced mathematics and its applications in science, engineering, and economics. It primarily consists of two branches",
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowVideo(true);
//     }, 2000);

//     // Fetch sub-topics from API
//     const fetchSubTopics = async () => {
//       try {
//         const userData = localStorage.getItem("user");
//         let bearerToken = "";

//         if (userData) {
//           try {
//             const parsedUserData = JSON.parse(userData);
//             bearerToken = parsedUserData.token || "";
//           } catch (error) {
//             console.error("Error parsing user data:", error);
//           }
//         }

//         if (!bearerToken) {
//           console.error("No bearer token found in localStorage");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           "http://lms.hawc.in/api/student/myclassdetails?live_class_id=2",
//           {
//             headers: { Authorization: `Bearer ${bearerToken}` },
//           }
//         );

//         if (res.data?.success) {
//           const liveClassDetails = res.data?.data?.liveClassDetails;
//           if (liveClassDetails) {
//             setSubTopics(liveClassDetails.my_sub_topic_list || []);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching sub-topics:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubTopics();

//     return () => clearTimeout(timer);
//   }, []);

//   const handleStartClass = () => {
//     setIsStarting(true);
//     setTimeout(() => {
//       setIsStarting(false);
//       navigate.push("/live");
//     }, 2000);
//   };

//   const handleStartSubTopic = (subTopic: SubTopic) => {
//     localStorage.setItem("dyte_token", subTopic.token);
//     localStorage.setItem("dyte_meetingId", subTopic.meeting_id);
//     navigate.push("/live");
//   };

//   return (
//     <div className="text-white">
//       <div className="mx-auto">
//         <div className="flex justify-center mb-8">
//           <div className="flex rounded-lg gap-2 p-1">
//             <button
//               className={`px-6 py-2 rounded-md font-medium text-sm transition-colors bg-black flex items-center gap-2 ${
//                 activeTab === "liveClass"
//                   ? "bg-[#1a1a1a] text-white"
//                   : "text-gray-300 hover:text-white"
//               }`}
//               onClick={() => setActiveTab("liveClass")}
//             >
//               <FaCalendarAlt className="text-xs" />
//               {activeTab === "liveClass" && "Live Class"}
//             </button>
//             <button
//               className={`px-6 py-2 rounded-md font-medium text-sm transition-colors bg-black flex items-center gap-2 ${
//                 activeTab === "subTopics"
//                   ? "bg-[#1a1a1a] text-white"
//                   : "text-gray-300 hover:text-white"
//               }`}
//               onClick={() => setActiveTab("subTopics")}
//             >
//               <FaVideo className="text-xs" />
//               {activeTab === "subTopics" && "Sub-topics"}
//             </button>
//           </div>
//         </div>

//         {/* Live Class Section */}
//         {activeTab === "liveClass" && (
//           <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 p-20 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               <div className="rounded-2xl overflow-hidden shadow-2xl relative h-96">
//                 {!showVideo ? (
//                   <div className="w-full h-full relative">
//                     <img
//                       src={mathClass.src}
//                       alt={mathClass.alt}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
//                   </div>
//                 ) : (
//                   <div className="w-full h-full relative">
//                     <video
//                       className="w-full h-full object-cover"
//                       autoPlay
//                       muted
//                       loop
//                     >
//                       <source
//                         src="https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4"
//                         type="video/mp4"
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
//                   </div>
//                 )}

//                 <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
//                   <span className="text-sm text-purple-300 font-medium">
//                     {mathClass.subject}
//                   </span>
//                   <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-3">
//                     {mathClass.topic}
//                   </h1>

//                   <div className="flex flex-wrap gap-4 text-sm">
//                     <div className="flex items-center">
//                       <FaCalendarAlt className="text-blue-400 mr-2" />
//                       <span>{mathClass.date}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FaClock className="text-blue-400 mr-2" />
//                       <span>{mathClass.time}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FaUsers className="text-blue-400 mr-2" />
//                       <span>{mathClass.expectedStudents} students</span>
//                     </div>
//                   </div>
//                   <p className="text-gray-300 text-sm leading-relaxed mb-2">
//                     {mathClass.objectives}
//                   </p>
//                   <button
//                     className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex justify-center text-base font-semibold transition-all duration-300 disabled:opacity-50"
//                     onClick={handleStartClass}
//                     disabled={isStarting}
//                   >
//                     {isStarting ? (
//                       <div className="flex items-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 
//                             0 0 5.373 0 12h4zm2 5.291A7.962 
//                             7.962 0 014 12H0c0 3.042 1.135 
//                             5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Preparing...
//                       </div>
//                     ) : (
//                       <>
//                         <FaPlay className="mr-2 text-xs" /> Start Class Now
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4 ml-2 mt-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-x-10 justify-items-center">
//                 <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
//                   <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
//                     <img src={NoFStudent} alt="Students" />
//                   </div>
//                   <div className="text-blue-600 text-3xl">
//                     <FaUserGraduate className="text-5xl" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">
//                     {mathClass.expectedStudents}
//                   </h2>
//                   <p className="text-gray-600 text-sm">Expected Students</p>
//                 </div>
//                 {/* Card 2 */}
//                 <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
//                   <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
//                     <img src={NoFHours} alt="Hours" />
//                   </div>
//                   <div className="text-green-600 text-3xl mb-2">
//                     <FaClock className="text-5xl" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">
//                     {mathClass.duration}
//                   </h2>
//                   <p className="text-gray-600 text-sm">No of Hours</p>
//                 </div>
//                 {/* Card 3 */}
//                 <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
//                   <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
//                     <img src={Mark} alt="Marks" />
//                   </div>
//                   <div className="text-sky-500 text-3xl mb-2">
//                     <FaStar className="text-5xl" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">84%</h2>
//                   <p className="text-gray-600 text-sm">Average Marks</p>
//                 </div>
//                 {/* Card 4 */}
//                 <div className="bg-white rounded-xl p-5 shadow-lg relative overflow-hidden h-40 w-52 group hover:scale-105 transition-all cursor-pointer">
//                   <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
//                     <img src={TotalLive} alt="Live Classes" />
//                   </div>
//                   <div className="text-orange-500 text-3xl mb-2">
//                     <FaUsers className="text-5xl" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">15</h2>
//                   <p className="text-gray-600 text-sm">Total Live</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Sub-topics Section */}
//         {activeTab === "subTopics" && (
//           <div className="p-6 lg:p-20">
//             <h2 className="text-2xl font-bold mb-6">Class Sub-topics</h2>
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//               </div>
//             ) : subTopics.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {subTopics.map((subTopic) => (
//                   <div
//                     key={subTopic.sub_topic_id}
//                     className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
//                     onClick={() => handleStartSubTopic(subTopic)}
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-xl font-semibold">
//                         {subTopic.sub_topic_name}
//                       </h3>
//                       <FaChevronRight className="text-purple-400 mt-1" />
//                     </div>
//                     <div className="flex items-center text-sm text-gray-400 mb-2">
//                       <FaClock className="mr-2" />
//                       <span>60 mins</span>
//                     </div>
//                     <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full text-center">
//                       Join Session
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12 text-gray-400">
//                 No sub-topics available for this class.
//               </div>
//             )}
//           </div>
//         )}

//         {/* --------- MOBILE VIEW --------- */}
//         <div className="lg:hidden p-6 space-y-6">
//           {/* Tab Navigation for Mobile */}
//           <div className="flex justify-center mb-4">
//             <div className="flex rounded-lg gap-2 p-1">
//               <button
//                 className={`px-4 py-2 rounded-md font-medium text-xs transition-colors bg-black flex items-center gap-1 ${
//                   activeTab === "liveClass"
//                     ? "bg-[#1a1a1a] text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//                 onClick={() => setActiveTab("liveClass")}
//               >
//                 <FaCalendarAlt className="text-xs" />
//                 {activeTab === "liveClass" && "Live Class"}
//               </button>
//               <button
//                 className={`px-4 py-2 rounded-md font-medium text-xs transition-colors bg-black flex items-center gap-1 ${
//                   activeTab === "subTopics"
//                     ? "bg-[#1a1a1a] text-white"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//                 onClick={() => setActiveTab("subTopics")}
//               >
//                 <FaVideo className="text-xs" />
//                 {activeTab === "subTopics" && "Sub-topics"}
//               </button>
//             </div>
//           </div>

//           {activeTab === "liveClass" && (
//             <>
//               {/* Video / Banner */}
//               <div className="rounded-xl overflow-hidden shadow relative h-64">
//                 {!showVideo ? (
//                   <img
//                     src={mathClass.src}
//                     alt={mathClass.alt}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <video
//                     className="w-full h-full object-cover"
//                     autoPlay
//                     muted
//                     loop
//                   >
//                     <source
//                       src="https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4"
//                       type="video/mp4"
//                     />
//                   </video>
//                 )}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
//                   <span className="text-sm text-purple-300">
//                     {mathClass.subject}
//                   </span>
//                   <h1 className="text-xl font-bold">{mathClass.topic}</h1>
//                   <p className="text-gray-300 text-xs mt-2">
//                     {mathClass.objectives}
//                   </p>
//                   <button
//                     className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg text-white font-semibold disabled:opacity-50"
//                     onClick={handleStartClass}
//                     disabled={isStarting}
//                   >
//                     {isStarting ? "Preparing..." : "Start Class Now"}
//                   </button>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                   <FaUserGraduate className="text-blue-600 mx-auto text-2xl" />
//                   <h2 className="text-lg font-bold text-gray-800">
//                     {mathClass.expectedStudents}
//                   </h2>
//                   <p className="text-gray-600 text-xs">Expected Students</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                   <FaClock className="text-green-600 mx-auto text-2xl" />
//                   <h2 className="text-lg font-bold text-gray-800">
//                     {mathClass.duration}
//                   </h2>
//                   <p className="text-gray-600 text-xs">No of Hours</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                   <FaStar className="text-sky-500 mx-auto text-2xl" />
//                   <h2 className="text-lg font-bold text-gray-800">84%</h2>
//                   <p className="text-gray-600 text-xs">Average Marks</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow text-center">
//                   <FaUsers className="text-orange-500 mx-auto text-2xl" />
//                   <h2 className="text-lg font-bold text-gray-800">15</h2>
//                   <p className="text-gray-600 text-xs">Total Live</p>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeTab === "subTopics" && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Class Sub-topics</h2>
//               {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
//                 </div>
//               ) : subTopics.length > 0 ? (
//                 <div className="space-y-4">
//                   {subTopics.map((subTopic) => (
//                     <div
//                       key={subTopic.sub_topic_id}
//                       className="bg-gray-800 rounded-lg p-4 shadow-md"
//                       onClick={() => handleStartSubTopic(subTopic)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-semibold">
//                           {subTopic.sub_topic_name}
//                         </h3>
//                         <FaChevronRight className="text-purple-400" />
//                       </div>
//                       <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg w-full text-sm">
//                         Join Session
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-400">
//                   No sub-topics available for this class.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClass;