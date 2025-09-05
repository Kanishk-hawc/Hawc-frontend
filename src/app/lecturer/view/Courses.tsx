import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { liveCourses } from "../data/live";
import { recordedCourses } from "../data/recorded";
import image1 from "../assets/chemistry/01.png";
import image2 from "../assets/chemistry/02.png";
import image3 from "../assets/chemistry/03.png";
import image4 from "../assets/chemistry/04.png";
import image5 from "../assets/chemistry/05.png";
import image6 from "../assets/chemistry/06.png";
import image7 from "../assets/chemistry/07.png";
import image8 from "../assets/chemistry/08.png";
import image9 from "../assets/chemistry/10.png";
import image10 from "../assets/chemistry/08@2x.png";
import image11 from "../assets/chemistry/09.png";
import image12 from "../assets/chemistry/09@2x.png";
import image13 from "../assets/chemistry/10@2x.png";
import image14 from "../assets/chemistry/11@2x.png";
import image15 from "../assets/chemistry/12@2x.png";
import image16 from "../assets/chemistry/13@2x.png";
import image17 from "../assets/chemistry/13.png";
import image18 from "../assets/chemistry/14.png";
import image19 from "../assets/chemistry/15.png";
import image20 from "../assets/chemistry/Lecture 04.png";
import image21 from "../assets/chemistry/13@2x.png";
import image22 from "../assets/chemistry/14@2x.png";
import image23 from "../assets/chemistry/15@2x.png";
import image24 from "../assets/chemistry/16@2x.png";
import image25 from "../assets/chemistry/17@2x.png";
import image26 from "../assets/chemistry/18@2x.png";
import image27 from "../assets/chemistry/19@2x.png";
import image28 from "../assets/chemistry/20@2x.png";
import image29 from "../assets/chemistry/25@2x.png";
import image30 from "../assets/chemistry/Lecture 05.png";
import image31 from "../assets/chemistry/Lecture 04.png";
const allImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30, image31
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};

interface CourseCardProps {
  course: {
    id: number;
    alt: string;
    subject: string;
    duration: string;
    language: string;
    topic: string;
    date: string;
    genres: string[];
    description: string;
    viewers?: number;
    views?: number;
  };
  type: "live" | "recorded";
}

const CourseCard: React.FC<CourseCardProps> = ({ course, type }) => {
  const history = useHistory();
  const image = getRandomImage();

  const handleCardClick = () => {
    // Navigate to course detail page
    history.push(`/course/${type}/${course.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <img 
        src={image} 
        alt={course.alt} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {course.subject}
          </span>
          <span className="text-gray-500 text-sm">{course.duration}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2">{course.topic}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {course.genres.slice(0, 3).map((genre, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {genre}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{course.date}</span>
          <span className="text-gray-500 text-sm">
            {type === "live" 
              ? `${course.viewers} viewers` 
              : `${course.views} views`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper function to parse duration string to minutes
const parseDurationToMinutes = (duration: string): number => {
  const parts = duration.split(' ');
  let totalMinutes = 0;
  
  for (const part of parts) {
    if (part.includes('h')) {
      totalMinutes += parseInt(part.replace('h', '')) * 60;
    } else if (part.includes('m')) {
      totalMinutes += parseInt(part.replace('m', ''));
    }
  }
  
  return totalMinutes;
};

// Main Component
const ExploreCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"live" | "recorded">("live");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  // Filter courses based on search query (only by topic)
  const filterCourses = (courses: any[]) => {
    if (!searchQuery) return courses;
    
    return courses.filter(course => 
      course.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Sort courses based on selected option
  const sortCourses = (courses: any[]) => {
    switch (sortOption) {
      case "time-low-to-high":
        return [...courses].sort((a, b) => {
          const aMinutes = parseDurationToMinutes(a.duration);
          const bMinutes = parseDurationToMinutes(b.duration);
          return aMinutes - bMinutes;
        });
      case "time-high-to-low":
        return [...courses].sort((a, b) => {
          const aMinutes = parseDurationToMinutes(a.duration);
          const bMinutes = parseDurationToMinutes(b.duration);
          return bMinutes - aMinutes;
        });
      case "views-low-to-high":
        return [...courses].sort((a, b) => {
          const aViews = a.views || a.viewers || 0;
          const bViews = b.views || b.viewers || 0;
          return aViews - bViews;
        });
      case "views-high-to-low":
        return [...courses].sort((a, b) => {
          const aViews = a.views || a.viewers || 0;
          const bViews = b.views || b.viewers || 0;
          return bViews - aViews;
        });
      default:
        return courses;
    }
  };

  const filteredLiveCourses = sortCourses(filterCourses(liveCourses));
  const filteredRecordedCourses = sortCourses(filterCourses(recordedCourses));

  // Get current courses for pagination
  const getCurrentCourses = () => {
    const courses = activeTab === "live" ? filteredLiveCourses : filteredRecordedCourses;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    return courses.slice(indexOfFirstCourse, indexOfLastCourse);
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = () => {
    const courses = activeTab === "live" ? filteredLiveCourses : filteredRecordedCourses;
    const currentCourses = getCurrentCourses();

    if (courses.length === 0) {
      return (
        <div className="flex flex-col items-center text-gray-500 py-10">
          <img
            src={activeTab === "live" 
              ? "https://cdn-icons-png.flaticon.com/512/1048/1048953.png" 
              : "https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
            }
            alt={activeTab}
            className="w-20 opacity-50 mb-4"
          />
          <p>
            No results found in <strong>{activeTab === "live" ? "Live Classes" : "Recorded Courses"}</strong>.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              type={activeTab} 
            />
          ))}
        </div>
        
        {/* Pagination */}
        {courses.length > coursesPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === number 
                      ? 'bg-black text-white border-black' 
                      : 'border-gray-300'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(courses.length / coursesPerPage)}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="bg-black text-white px-4 md:px-6 py-12 md:py-16 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Courses</h1>
        <p className="mb-6 max-w-lg text-sm md:text-base">
          Authentic and high quality courses, specially curated by experienced
          instructors for deep study.
        </p>
        <div className="flex items-center bg-white rounded-lg max-w-xl p-2">
          <input
            type="text"
            placeholder="Search for courses by topic"
            className="flex-1 p-2 rounded-md outline-none text-gray-800 text-sm md:text-base"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when search changes
            }}
          />
          <button className="bg-black text-white px-3 md:px-4 py-2 rounded-md text-sm md:text-base">
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-start border-b border-gray-300 px-4 md:px-0 overflow-x-auto">
        <div className="flex min-w-full md:min-w-0 md:ml-64">
          <button
            onClick={() => {
              setActiveTab("live");
              setCurrentPage(1); // Reset to first page when tab changes
            }}
            className={`px-4 md:px-6 py-3 whitespace-nowrap ${
              activeTab === "live"
                ? "border-b-4 border-black font-semibold"
                : "text-gray-600"
            }`}
          >
            Live Classes
          </button>
          <button
            onClick={() => {
              setActiveTab("recorded");
              setCurrentPage(1); // Reset to first page when tab changes
            }}
            className={`px-4 md:px-6 py-3 whitespace-nowrap ${
              activeTab === "recorded"
                ? "border-b-4 border-black font-semibold"
                : "text-gray-600"
            }`}
          >
            Recorded Course
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 mt-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full p-3 bg-gray-100 rounded-lg flex items-center justify-between"
        >
          <span>FILTERS & SORT</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-4 md:mt-8 px-4 md:px-6 pb-8">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-52 mb-4 md:mb-0`}>
          <h3 className="text-lg font-medium mb-2 hidden md:block">SORT BY</h3>
          <div className="bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0">
            <label htmlFor="sort" className="block mb-1 text-sm">
              Sort Options
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1); // Reset to first page when sort changes
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base"
            >
              <option value="default">Default</option>
              <option value="time-low-to-high">Duration: Low to High</option>
              <option value="time-high-to-low">Duration: High to Low</option>
              <option value="views-low-to-high">Views: Low to High</option>
              <option value="views-high-to-low">Views: High to Low</option>
            </select>
            
            <div className="mt-4 md:hidden flex justify-between">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
                onClick={() => {
                  setSortOption("default");
                  setCurrentPage(1);
                }}
              >
                Reset
              </button>
              <button 
                className="px-4 py-2 bg-black text-white rounded-md text-sm"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[200px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;