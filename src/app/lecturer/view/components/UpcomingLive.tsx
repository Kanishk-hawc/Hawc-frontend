import { useState } from "react";
import { FaCalendarAlt, FaClock, FaPlay, FaVideo, FaRegPlayCircle } from "react-icons/fa";
import mathsImage1 from "../../assets/images/maths.jpg";
import mathsImage2 from "../../assets/images/biology.jpg";
import mathsImage3 from "../../assets/images/physics.jpg";
import mathsImage4 from "../../assets/images/chemistry.jpg";
import image1 from "../../assets/chemistry/07.png";
import image2 from "../../assets/chemistry/10@2x.png";
import image3 from "../../assets/chemistry/13.png";
import image4 from "../../assets/chemistry/Lecture 04.png";
import image5 from "../../assets/chemistry/Lecture 05.png";
import image6 from "../../assets/chemistry/20@2x.png";

const UpcomingLive = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const Upcominglive = [
    {
      id: 1,
      src: mathsImage1,
      alt: "Calculus",
      subject: "Maths",
      time: "10:00 AM",
      language: "English",
      topic: "Differential Calculus",
      date: "Dec 26, 2024",
      genres: ["Mathematics", "Calculus", "Differentiation"],
      description: "Explore derivatives, rates of change, and applications in real-world problems. Perfect for advanced learners.",
    },
    {
      id: 2,
      src: mathsImage2,
      alt: "Algebra",
      subject: "Maths",
      time: "2:30 PM",
      language: "Hindi",
      topic: "Linear Algebra",
      date: "Dec 27, 2024",
      genres: ["Mathematics", "Algebra", "Vectors"],
      description: "Master vectors, matrices, and linear transformations with practical examples and problem-solving techniques.",
    },
    {
      id: 3,
      src: image5,
      alt: "Geometry",
      subject: "Maths",
      time: "4:45 PM",
      language: "English",
      topic: "Coordinate Geometry",
      date: "Dec 28, 2024",
      genres: ["Mathematics", "Geometry", "Coordinates"],
      description: "Learn about coordinate systems, distance formula, and equations of lines and curves in the coordinate plane.",
    },
    {
      id: 4,
      src: mathsImage4,
      alt: "Statistics",
      subject: "Maths",
      time: "11:15 AM",
      language: "Hindi",
      topic: "Probability & Statistics",
      date: "Dec 29, 2024",
      genres: ["Mathematics", "Statistics", "Data Analysis"],
      description: "Understand probability theory, statistical methods, and data interpretation for real-world applications.",
    },
  ];

  const LiveCourses = [
    {
      id: 1,
      src: image1,
      alt: "Advanced Calculus",
      subject: "Maths",
      duration: "2h 15m",
      language: "English",
      topic: "Advanced Calculus Techniques",
      date: "Dec 20, 2024",
      genres: ["Mathematics", "Calculus", "Integration"],
      description: "Deep dive into integration techniques and their applications in solving complex problems.",
      viewers: 245
    },
    {
      id: 2,
      src: mathsImage3,
      alt: "Number Theory",
      subject: "Maths",
      duration: "1h 45m",
      language: "Hindi",
      topic: "Number Theory Fundamentals",
      date: "Dec 21, 2024",
      genres: ["Mathematics", "Number Theory", "Prime Numbers"],
      description: "Explore the fascinating world of numbers, primes, and divisibility rules.",
      viewers: 187
    },
    {
      id: 3,
      src: image3,
      alt: "Trigonometry",
      subject: "Maths",
      duration: "2h 30m",
      language: "English",
      topic: "Advanced Trigonometry",
      date: "Dec 22, 2024",
      genres: ["Mathematics", "Trigonometry", "Identities"],
      description: "Master trigonometric functions, identities, and their applications in various fields.",
      viewers: 312
    },
    {
      id: 4,
      src: image2,
      alt: "Differential Equations",
      subject: "Maths",
      duration: "2h 05m",
      language: "Hindi",
      topic: "Solving Differential Equations",
      date: "Dec 23, 2024",
      genres: ["Mathematics", "Calculus", "Differential Equations"],
      description: "Learn methods to solve various types of differential equations with practical examples.",
      viewers: 276
    },
  ];

  const RecordedCourses = [
    {
      id: 1,
      src: image2,
      alt: "Basic Algebra",
      subject: "Maths",
      duration: "3h 20m",
      language: "English",
      topic: "Algebra Fundamentals",
      date: "Dec 15, 2024",
      genres: ["Mathematics", "Algebra", "Basics"],
      description: "Comprehensive guide to algebraic expressions, equations, and problem-solving strategies.",
      views: 1245
    },
    {
      id: 2,
      src: image4,
      alt: "Geometry Masterclass",
      subject: "Maths",
      duration: "4h 10m",
      language: "Hindi",
      topic: "Geometry Complete Course",
      date: "Dec 16, 2024",
      genres: ["Mathematics", "Geometry", "Shapes"],
      description: "Complete course covering all aspects of geometry from basic to advanced concepts.",
      views: 987
    },
    {
      id: 3,
      src: image4,
      alt: "Calculus Essentials",
      subject: "Maths",
      duration: "5h 15m",
      language: "English",
      topic: "Calculus Complete Course",
      date: "Dec 17, 2024",
      genres: ["Mathematics", "Calculus", "Fundamentals"],
      description: "From limits to derivatives to integrals - everything you need to master calculus.",
      views: 1567
    },
    {
      id: 4,
      src: image6,
      alt: "Statistics Simplified",
      subject: "Maths",
      duration: "3h 45m",
      language: "Hindi",
      topic: "Statistics for Beginners",
      date: "Dec 18, 2024",
      genres: ["Mathematics", "Statistics", "Data Analysis"],
      description: "Learn statistical concepts, data interpretation, and analysis techniques from scratch.",
      views: 1123
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Tab Selection */}
      <div className="flex justify-center  mb-8">
        <div className="flex rounded-lg gap-2 p-1">
          <button
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors bg-black flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-[#1a1a1a] text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            <FaCalendarAlt className="text-xs" />
            {activeTab === "upcoming" && "Upcoming"}
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors bg-black flex items-center gap-2 ${
              activeTab === "live"
                ? "bg-[#1a1a1a] text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("live")}
          >
            <FaVideo className="text-xs" />
            {activeTab === "live" && "Live Courses"}
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors bg-black flex items-center gap-2 ${
              activeTab === "recorded"
                ? "bg-[#1a1a1a] text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("recorded")}
          >
            <FaRegPlayCircle className="text-xs" />
            {activeTab === "recorded" && "Recorded"}
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "upcoming" && (
        <div className="flex flex-wrap gap-6 justify-center">
          {Upcominglive.map((classItem) => (
            <div 
              key={classItem.id}
              className="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden w-80 flex flex-col"
            >
              {/* Card Header */}
              <div className="relative p-4">
                <img
                  src={classItem.src}
                  alt={classItem.alt}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {classItem.subject}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Upcoming
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {classItem.genres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white">{classItem.topic}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{classItem.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" /> {classItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-xs" /> {classItem.time}
                  </span>
                </div>
                
                <div className="mt-3 text-sm text-gray-400 flex items-center gap-1">
                  <span>🌐</span>
                  <span>{classItem.language}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-center p-4 border-t border-gray-700">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm flex items-center">
                  <FaPlay className="mr-2 text-xs" /> Need to Make Changes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "live" && (
        <div className="flex flex-wrap gap-6 justify-center">
          {LiveCourses.map((classItem) => (
            <div 
              key={classItem.id}
              className="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden w-80 flex flex-col"
            >
              {/* Card Header */}
              <div className="relative p-4">
                <img
                  src={classItem.src}
                  alt={classItem.alt}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {classItem.subject}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Uploaded
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {classItem.genres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white">{classItem.topic}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{classItem.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" /> {classItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-xs" /> {classItem.duration}
                  </span>
                </div>
                
                <div className="mt-3 text-sm text-gray-400 flex items-center gap-1">
                  <span>🌐</span>
                  <span>{classItem.language}</span>
                </div>
                
                <div className="mt-3 text-sm text-gray-400">
                  <span>{classItem.viewers} viewers</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-center p-4 border-t border-gray-700">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm flex items-center">
                  <FaPlay className="mr-2 text-xs" /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "recorded" && (
        <div className="flex flex-wrap gap-6 justify-center">
          {RecordedCourses.map((classItem) => (
            <div 
              key={classItem.id}
              className="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden w-80 flex flex-col"
            >
              {/* Card Header */}
              <div className="relative p-4">
                <img
                  src={classItem.src}
                  alt={classItem.alt}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {classItem.subject}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {classItem.genres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white">{classItem.topic}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{classItem.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" /> {classItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-xs" /> {classItem.duration}
                  </span>
                </div>
                
                <div className="mt-3 text-sm text-gray-400 flex items-center gap-1">
                  <span>🌐</span>
                  <span>{classItem.language}</span>
                </div>
                
                <div className="mt-3 text-sm text-gray-400">
                  <span>{classItem.views} views</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-center p-4 border-t border-gray-700">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm flex items-center">
                  <FaPlay className="mr-2 text-xs" /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingLive;