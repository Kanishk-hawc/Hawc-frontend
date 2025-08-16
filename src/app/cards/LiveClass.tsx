import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import biology from "../assets/biology.png";
import zoology from "../assets/zoology.jpeg";
import zoology1 from "../assets/zoology1.jpeg";
import chemistry from "../assets/chemistry.jpeg";
import physics from "../assets/physics.jpeg";
import maths from "../assets/maths.png";
import chemistry1 from "../assets/chemistry1.png";
import {
  FaChevronUp,
  FaChevronDown,
  FaPlay,
  FaSearch,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";

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
  const history = useHistory();

  // Sample video URLs - you can replace these with actual video URLs
  const sampleVideos = [
    "https://videos.pexels.com/video-files/4178359/4178359-hd_1906_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/1456996/1456996-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/8485636/8485636-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6738879/6738879-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/8197045/8197045-hd_1920_1080_25fps.mp4",
  ];

  const images = [
    {
      id: 1,
      src: biology,
      alt: "Biology",
      subject: "Biology",
      time: "10.20hr",
      topic: "Cell Biology",
      date: "Dec 15, 2024",
      genres: ["Science", "Life", "Molecular"],
      description:
        "Exploring the fundamental unit of life - the cell. In this session, we will dive into cell structure, organelles, and their functions, along with an overview of cell communication and division.",
      videoUrl: sampleVideos[0],
    },
    {
      id: 2,
      src: zoology1,
      alt: "Zoology",
      subject: "Zoology",
      time: "11.15hr",
      topic: "Animal Behavior",
      date: "Dec 18, 2024",
      genres: ["Science", "Animal", "Behavior"],
      description:
        "Understanding patterns and reasons behind animal actions. We'll explore instinctive behaviors, learned responses, and how environment shapes animal life.",
      videoUrl: sampleVideos[1],
    },
    {
      id: 3,
      src: chemistry1,
      alt: "Chemistry",
      subject: "Chemistry",
      time: "12.30hr",
      topic: "Organic Chemistry",
      date: "Dec 20, 2024",
      genres: ["Science", "Molecular", "Reactions"],
      description:
        "Study of carbon-containing compounds and their reactions. This class covers hydrocarbons, functional groups, and reaction mechanisms.",
      videoUrl: sampleVideos[2],
    },
    {
      id: 4,
      src: physics,
      alt: "Physics",
      subject: "Physics",
      time: "14.00hr",
      topic: "Quantum Mechanics",
      date: "Dec 22, 2024",
      genres: ["Science", "Quantum", "Theory"],
      description:
        "Fundamental theory in physics describing nature at small scales. We'll discuss wave-particle duality, quantum states, and real-world applications.",
      videoUrl: sampleVideos[3],
    },
    {
      id: 5,
      src: maths,
      alt: "Maths",
      subject: "Maths",
      time: "15.15hr",
      topic: "Calculus",
      date: "Dec 25, 2024",
      genres: ["Mathematics", "Analysis", "Applications"],
      description:
        "Mathematical study of continuous change. Learn limits, derivatives, integrals, and their applications in science and engineering.",
      videoUrl: sampleVideos[4],
    },
  ];

  const [centerIndex, setCenterIndex] = useState(1);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateKey, setAnimateKey] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoTimer, setVideoTimer] = useState<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    if (!selectedSubjectId && images.length > 0) {
      onSubjectSelect(images[0].id);
    }
  }, [selectedSubjectId, images, onSubjectSelect]);

  // Auto-play video after 3 seconds
  useEffect(() => {
    if (videoTimer) {
      clearTimeout(videoTimer);
    }

    setShowVideo(false);
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    setVideoTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [centerIndex]);

  const moveUp = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setContentOpacity(0);

    setTimeout(() => {
      setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
      setAnimateKey((prev) => prev + 1);

      setTimeout(() => {
        setContentOpacity(1);
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const moveDown = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setContentOpacity(0);

    setTimeout(() => {
      setCenterIndex((prev) => (prev + 1) % images.length);
      setAnimateKey((prev) => prev + 1);

      setTimeout(() => {
        setContentOpacity(1);
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const handleClick = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setContentOpacity(0);

    setTimeout(() => {
      setCenterIndex(index);
      setAnimateKey((prev) => prev + 1);

      setTimeout(() => {
        setContentOpacity(1);
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const getDisplayImages = () => {
    const prevIndex = (centerIndex - 1 + images.length) % images.length;
    const nextIndex = (centerIndex + 1) % images.length;
    return [images[prevIndex], images[centerIndex], images[nextIndex]];
  };

  const displayImages = getDisplayImages();
  const currentImage = images[centerIndex];

  return (
    <div className="flex w-full h-screen relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: showVideo ? "none" : `url(${currentImage.src})`,
        }}
      >
        {/* Video background */}
        {showVideo && (
          <video
            key={currentImage.videoUrl}
            src={currentImage.videoUrl}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            onError={() => setShowVideo(false)}
          />
        )}

        {/* Enhanced gradient overlay - darker on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        {/* Extra dark overlay for the left side where cards are */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2"></div>
      </div>

      {/* Settings button - top right */}
      <div className="absolute top-6 right-6 z-20">
        <button className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300">
          <FaCog className="text-xl" />
        </button>
      </div>

      {/* Navigation arrows - positioned at top and bottom edges, centered with cards */}
      {/* Up arrow - at very top */}
      <div className="absolute top-3 z-20 ml-44">
        <button
          onClick={moveUp}
          className="nav-up-btn p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
        >
          <FaChevronUp className="text-xl" />
        </button>
      </div>

      {/* Down arrow - at very bottom */}
      <div className="absolute bottom-3 ml-44 z-20">
        <button
          onClick={moveDown}
          className="nav-down-btn p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
        >
          <FaChevronDown className="text-xl" />
        </button>
      </div>

      {/* Left sidebar with course cards */}
      <div className="relative z-10 flex flex-col justify-center items-start pl-8 w-96 gap-6">
        {displayImages.map((img, index) => {
          // Calculate animation direction based on card position
          let animationClass = "";
          if (index === 0) animationClass = "animate-slide-up-from-bottom";
          else if (index === 2) animationClass = "animate-slide-down-from-top";
          else animationClass = "animate-fade-in-scale";

          return (
            <div
              key={`${img.id}-${animateKey}`}
              className={`relative cursor-pointer transition-all duration-500 transform ${
                index === 1
                  ? "z-20 brightness-110 shadow-2xl"
                  : "z-10 hover:brightness-110 opacity-90"
              } ${animationClass}`}
              style={{
                animationDuration: "500ms",
                animationFillMode: "both",
              }}
              onClick={() =>
                handleClick(
                  (centerIndex - 1 + index + images.length) % images.length
                )
              }
            >
              <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-xl bg-black/10 backdrop-blur-sm border border-white/20">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                {/* Card overlay - lighter for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Card content */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg mb-1 drop-shadow-lg">
                    {img.subject}
                  </h3>
                  <p className="text-sm opacity-95 flex items-center gap-1 drop-shadow-md">
                    <FaCalendarAlt className="text-xs" />
                    {img.date}
                  </p>
                  <p className="text-xs opacity-85 drop-shadow-md">
                    {img.time}
                  </p>
                </div>

                {/* Selected indicator */}
                {index === 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 animate-pulse shadow-lg"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col justify-center items-start pl-16 pr-8 relative z-10"
        style={{
          opacity: contentOpacity,
          transition: "opacity 300ms ease-in-out",
        }}
      >
        {/* Genre tags */}
        <div className="flex gap-2 mb-4 animate-fade-in">
          {currentImage.genres.map((genre, index) => (
            <React.Fragment key={genre}>
              <span className="text-white text-sm font-medium">{genre}</span>
              {index < currentImage.genres.length - 1 && (
                <span className="text-red-500 text-sm">●</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          {currentImage.topic}
        </h1>

        {/* Course info */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-1 text-yellow-400">
            <FaCalendarAlt />
            <span className="text-white ml-1">{currentImage.date}</span>
          </div>
          <div className="text-white">●</div>
          <div className="text-white flex items-center gap-1">
            <span>{currentImage.time}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white text-lg max-w-2xl mb-8 leading-relaxed animate-fade-in">
          {currentImage.description}
        </p>

        {/* Play button */}
        <button
          onClick={() => history.push("/live")}
          className="bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-lg flex items-center text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in"
        >
          <FaPlay className="mr-3" /> Play Now
        </button>
      </div>

      {/* Bottom controls - moved to very bottom */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 bg-black/40 backdrop-blur-sm rounded-full px-8 py-4">
          {/* Subject filter buttons */}
          <div className="flex gap-3">
            {images.map((subj) => {
              const isSelected = selectedSubjectId === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSubjectSelect(subj.id)}
                  className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-white text-black shadow-lg"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {subj.subject}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="border-l border-white/30 pl-6">
            {searchActive ? (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                autoFocus
                className="px-4 py-2 text-sm rounded-full outline-none bg-white/20 text-white placeholder-white/70 backdrop-blur-sm"
                onBlur={() => setSearchActive(false)}
              />
            ) : (
              <button
                onClick={() => setSearchActive(true)}
                className="p-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                <FaSearch />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;

/* Custom animations for card transitions */
<style jsx global>{`
  @keyframes slide-up-from-bottom {
    from {
      transform: translateY(100px) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 0.9;
    }
  }

  @keyframes slide-down-from-top {
    from {
      transform: translateY(-100px) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 0.9;
    }
  }

  @keyframes fade-in-scale {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up-from-bottom {
    animation: slide-up-from-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards;
  }

  .animate-slide-down-from-top {
    animation: slide-down-from-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards;
  }

  .animate-fade-in-scale {
    animation: fade-in-scale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-bounce-up {
    animation: bounce-up 0.3s ease-out forwards;
  }

  .animate-bounce-down {
    animation: bounce-down 0.3s ease-out forwards;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`}</style>;
