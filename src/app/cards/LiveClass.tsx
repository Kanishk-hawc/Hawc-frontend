import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import biology from "../assets/biology.jpeg";
import zoology from "../assets/zoology.jpeg";
import chemistry from "../assets/chemistry.jpeg";
import physics from "../assets/physics.jpeg";
import maths from "../assets/maths.jpg";
import { FaChevronUp, FaChevronDown, FaPlay, FaSearch } from "react-icons/fa";

interface LiveClassProps {
  isDarkMode: boolean;
  selectedSubjectId: number | null;
  onSubjectSelect: (subjectId: number) => void;
}

const LiveClass: React.FC<LiveClassProps> = ({
  isDarkMode,
  selectedSubjectId,
  onSubjectSelect,
}) => {
  const history = useHistory(); // <-- change here
  const images = [
    {
      id: 1,
      src: biology,
      alt: "Biology",
      subject: "Biology",
      time: "10.20hr",
      topic: "Cell Biology",
      description:
        "Exploring the fundamental unit of life - the cell. In this session, we will dive into cell structure, organelles, and their functions, along with an overview of cell communication and division.",
    },
    {
      id: 2,
      src: zoology,
      alt: "Zoology",
      subject: "Zoology",
      time: "11.15hr",
      topic: "Animal Behavior",
      description:
        "Understanding patterns and reasons behind animal actions. We'll explore instinctive behaviors, learned responses, and how environment shapes animal life.",
    },
    {
      id: 3,
      src: chemistry,
      alt: "Chemistry",
      subject: "Chemistry",
      time: "12.30hr",
      topic: "Organic Chemistry",
      description:
        "Study of carbon-containing compounds and their reactions. This class covers hydrocarbons, functional groups, and reaction mechanisms.",
    },
    {
      id: 4,
      src: physics,
      alt: "Physics",
      subject: "Physics",
      time: "14.00hr",
      topic: "Quantum Mechanics",
      description:
        "Fundamental theory in physics describing nature at small scales. We'll discuss wave-particle duality, quantum states, and real-world applications.",
    },
    {
      id: 5,
      src: maths,
      alt: "Maths",
      subject: "Maths",
      time: "15.15hr",
      topic: "Calculus",
      description:
        "Mathematical study of continuous change. Learn limits, derivatives, integrals, and their applications in science and engineering.",
    },
  ];

  const [centerIndex, setCenterIndex] = useState(1);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateKey, setAnimateKey] = useState(0); 
  useEffect(() => {
    if (!selectedSubjectId && images.length > 0) {
      onSubjectSelect(images[0].id);
    }
  }, [selectedSubjectId, images, onSubjectSelect]);

  const moveUp = () => {
    setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
    setAnimateKey((prev) => prev + 1);
  };
  const moveDown = () => {
    setCenterIndex((prev) => (prev + 1) % images.length);
    setAnimateKey((prev) => prev + 1);
  };
  const handleClick = (index: number) => {
    setCenterIndex(index);
    setAnimateKey((prev) => prev + 1);
  };

  const getDisplayImages = () => {
    const prevIndex = (centerIndex - 1 + images.length) % images.length;
    const nextIndex = (centerIndex + 1) % images.length;
    return [images[prevIndex], images[centerIndex], images[nextIndex]];
  };

  const displayImages = getDisplayImages();

  return (
    <div
      className="flex flex-col w-full relative"
      style={{
        backgroundImage: `url(${images[centerIndex].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-4 left-4 sm:left-6 md:left-10 lg:left-16 ml-40">
        <button
          onClick={moveUp}
          className="p-2 border-2 border-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <FaChevronUp className="text-xl text-white" />
        </button>
      </div>
      <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 my-16 pl-4 sm:pl-6 md:pl-10 lg:pl-16">
        {displayImages.map((img, index) => (
          <div key={img.id} className={`relative flex items-center ${index === 1 ? "pb-2" : ""}`}>
            <div className="relative">
              <img
                src={img.src}
                alt={img.alt}
                onClick={() => handleClick((centerIndex - 1 + index + images.length) % images.length)}
                className={`w-[60vw] sm:w-64 md:w-80 lg:w-96 h-40 sm:h-48 md:h-56 lg:h-60 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  index === 1
                    ? "scale-110 brightness-100 border-b-4 border-red-600"
                    : "opacity-60"
                }`}
                style={{
                  boxShadow: " -10px 0 20px rgba(0,0,0,0.5)", 
                }}
              />
              <div className="absolute left-2 bottom-4 text-white">
                <p className="font-bold text-2xl sm:text-xl">{img.subject}</p>
                <p className="text-xs sm:text-sm">{img.time}</p>
              </div>
            </div>

            {index === 1 && (
              <div
                key={animateKey} 
                className="ml-8 sm:ml-12 md:ml-16 lg:ml-20 w-48 sm:w-56 md:w-64 lg:w-72 flex flex-col gap-2"
              >
                <h3 className="text-white  text-3xl sm:text-4xl lg:text-5xl whitespace-nowrap transform translate-y-4 opacity-0 transition-all duration-500 delay-100 animate-slide-up">
                  {img.topic}
                </h3>
                <p className="text-white text-lg  mt-1 transform translate-y-4 opacity-0 transition-all duration-500 delay-200 animate-slide-up">
                  {img.time}
                </p>
                <p className="text-white text-sm sm:text-base md:text-lg mt-2 transform translate-y-4 opacity-0 transition-all duration-500 delay-300 animate-slide-up">
                  {img.description}
                </p>
                <button onClick={() => history.push("/live")} 
                 className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center text-sm sm:text-base transform translate-y-4 opacity-0 transition-all duration-500 delay-400 animate-slide-up">
                  <FaPlay className="mr-2" /> Play Live
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 sm:left-6 md:left-10 lg:left-16 ml-40">
        <button
          onClick={moveDown}
          className="p-2 border-2 border-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <FaChevronDown className="text-xl text-white" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-auto mb-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {images.map((subj) => {
            const isSelected = selectedSubjectId === subj.id;
            const bgClass = isSelected
              ? isDarkMode
                ? "bg-white text-black"
                : "bg-black text-white"
              : isDarkMode
              ? "bg-gray-800 text-white border border-white"
              : "bg-gray-100 text-black border border-black";
            return (
              <button
                key={subj.id}
                onClick={() => onSubjectSelect(subj.id)}
                className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${bgClass}`}
              >
                {subj.subject}
              </button>
            );
          })}
        </div>
        <div>
          {searchActive ? (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className={`px-3 py-1 text-xs sm:text-sm rounded-full outline-none transition-all duration-300 ${
                isDarkMode
                  ? "bg-black text-white border border-white"
                  : "bg-white text-black border border-black"
              }`}
              onBlur={() => setSearchActive(false)}
            />
          ) : (
            <button
              onClick={() => setSearchActive(true)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              <FaSearch />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
