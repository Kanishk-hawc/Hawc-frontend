// import React, { useRef, useState, useEffect } from "react";
// import { subjectsData } from "./data/subject";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaPlay,
//   FaEllipsisV,
// } from "react-icons/fa";
// import { useHistory } from "react-router-dom";

// interface SubjectTopicProps {
//   selectedSubjectId: number | null;
//   isDarkMode: boolean;
// }

// const SubjectTopic: React.FC<SubjectTopicProps> = ({
//   selectedSubjectId,
//   isDarkMode,
// }) => {
//   const history = useHistory();
//   const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);
//   const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const autoScrollIntervals = useRef<(number | null)[]>([]);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [hoveredRow, setHoveredRow] = useState<number | null>(null);
//   const [showMenu, setShowMenu] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIfMobile);
//     };
//   }, []);

//   const scrollCards = (index: number, direction: "left" | "right") => {
//     const container = scrollRefs.current[index];
//     if (!container) return;

//     const cardWidth =
//       container.querySelector(".flex-shrink-0")?.clientWidth || 256;
//     const gap = 24;
//     const totalScroll = (cardWidth + gap) * 3;
//     const maxScrollLeft = container.scrollWidth - container.clientWidth;

//     if (direction === "right") {
//       if (container.scrollLeft + totalScroll >= maxScrollLeft) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: totalScroll, behavior: "smooth" });
//       }
//     } else {
//       if (container.scrollLeft - totalScroll <= 0) {
//         container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: -totalScroll, behavior: "smooth" });
//       }
//     }
//   };

//   const startAutoScroll = (index: number) => {
//     if (autoScrollIntervals.current[index]) return;

//     const container = scrollRefs.current[index];
//     if (!container) return;

//     autoScrollIntervals.current[index] = window.setInterval(() => {
//       const cardWidth =
//         container.querySelector(".flex-shrink-0")?.clientWidth || 256;
//       const gap = 24;
//       const totalScroll = cardWidth + gap;
//       const maxScrollLeft = container.scrollWidth - container.clientWidth;

//       if (container.scrollLeft + totalScroll >= maxScrollLeft) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: totalScroll, behavior: "smooth" });
//       }
//     }, 5000);
//   };

//   const stopAutoScroll = (index: number) => {
//     if (autoScrollIntervals.current[index]) {
//       clearInterval(autoScrollIntervals.current[index]!);
//       autoScrollIntervals.current[index] = null;
//     }
//   };

//   const handleRowMouseEnter = (index: number) => {
//     setHoveredRow(index);
//     stopAutoScroll(index);
//   };

//   const handleRowMouseLeave = (index: number) => {
//     setHoveredRow(null);
//     startAutoScroll(index);
//   };

//   const handleMenuToggle = (cardId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowMenu(showMenu === cardId ? null : cardId);
//   };

//   const handleMenuOption = (option: string, chapter: any, topic: any) => {
//     setShowMenu(null);
//     console.log(`Selected option: ${option}`, { chapter, topic });
//     switch (option) {
//       case "watch":
//         handlePlay(chapter, topic);
//         break;
//       case "bookmark":
//         break;
//       case "share":
//         break;
//     }
//   };

//   const handlePlay = (chapter: any, topic: any) => {
//     const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
//     const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";

//     history.push({
//       pathname: `/course/${subject.name.replace(/\s+/g, "-")}/chapter-${chapterNumber}`,
//       state: {
//         subjectName: subject.name,
//         courseName: chapter.chapterName,
//         courseId: chapter.chapterId,
//         topicName: topic.name,
//         duration: topic.duration,
//       },
//     });
//   };

//   useEffect(() => {
//     if (!subject) return;

//     subject.chapters.forEach((_, index) => {
//       setTimeout(() => startAutoScroll(index), 100);
//     });

//     return () => {
//       subject.chapters.forEach((_, index) => stopAutoScroll(index));
//     };
//   }, [selectedSubjectId, subject]);

//   useEffect(() => {
//     const handleClickOutside = () => setShowMenu(null);
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   if (!subject) {
//     return (
//       <div
//         className={`p-6 flex justify-center items-center ${
//           isDarkMode ? "bg-[#091E37] text-white" : "bg-white text-black"
//         }`}
//       >
//         <p>No subject selected</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`px-2  relative bottom-20 md:bottom-0 ${
//         isDarkMode ? "bg-[#091E37] text-white" : "bg-white text-black"
//       }`}
//     >
//       <h2 className="text-3xl mb-6">Recorded Video</h2>
//       <h2 className="text-3xl mb-6">{subject.name}</h2>

//       {subject.chapters.map((chapter, chapterIndex) => (
//         <div
//           key={chapter.chapterId}
//           className="mb-8 relative"
//           onMouseEnter={() => handleRowMouseEnter(chapterIndex)}
//           onMouseLeave={() => handleRowMouseLeave(chapterIndex)}
//         >
//           <h3 className="text-xl mb-4">
//             Chapter {chapterIndex + 1}: {chapter.chapterName}
//           </h3>

//           <div className="relative">
//             {hoveredRow === chapterIndex && !isMobile && (
//               <>
//                 <button
//                   onClick={() => scrollCards(chapterIndex, "left")}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 hover:bg-black/20  transition-all duration-200"
//                 >
//                   <FaChevronLeft className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white" />
//                 </button>
//                 <button
//                   onClick={() => scrollCards(chapterIndex, "right")}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 hover:bg-black/20 hover:h-full transition-all duration-200"
//                 >
//                   <FaChevronRight className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white" />
//                 </button>
//               </>
//             )}

//             <div
//               ref={(el: HTMLDivElement | null) => {
//                 scrollRefs.current[chapterIndex] = el;
//               }}
//               className={`flex gap-6 py-2 ${
//                 isMobile 
//                   ? "overflow-x-auto overflow-y-hidden scrollbar-hide" 
//                   : "overflow-x-hidden overflow-y-hidden scroll-smooth"
//               }`}
//             >
//               {chapter.topics.map((topic, topicIndex) => {
//                 const uniqueId = `${chapterIndex}-${topicIndex}`;
//                 const isHovered = hoveredCard === uniqueId;
//                 const isMenuOpen = showMenu === uniqueId;

//                 return (
//                   <div
//                     key={uniqueId}
//                     className={`flex-shrink-0 w-64 relative transition-all duration-300 ${
//                       isHovered && !isMobile ? "scale-110 z-10" : "scale-100 z-0"
//                     }`}
//                     onMouseEnter={() => {
//                       setHoveredCard(uniqueId);
//                       stopAutoScroll(chapterIndex);
//                     }}
//                     onMouseLeave={() => {
//                       setHoveredCard(null);
//                       startAutoScroll(chapterIndex);
//                     }}
//                   >
//                     <div className="relative h-40 rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//                       {isHovered && (
//                         <>
//                           <div className="absolute bottom-0 left-0 p-3 w-full bg-gradient-to-t from-black/60 to-transparent">
//                             <h4 className="font-semibold text-white text-sm">
//                               {topic.name}
//                             </h4>
//                             <span className="text-xs text-white/80">
//                               {topic.duration}
//                             </span>
//                             <h1 className="text-xs text-white/80">
//                                6k views
//                             </h1>
//                             <h1 className="text-xs text-white/80">
//                                6 days ago
//                             </h1>
                            
//                           </div>
//                           <button
//                             onClick={() => handlePlay(chapter, topic)}
//                             className="absolute bottom-3 right-3 bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors"
//                           >
//                             <FaPlay />
//                           </button>
//                         </>
//                       )}
//                       {!isHovered && (
//                         <span
//                           className={`text-gray-500 ${
//                             isDarkMode ? "dark:text-gray-400" : ""
//                           }`}
//                         >
//                           Photo
//                         </span>
//                       )}
//                     </div>

//                     {!isHovered && (
//                       <div className="mt-2">
//                         <h4 className="font-semibold text-sm">{topic.name}</h4>
//                         <span className="text-xs opacity-70 block">
//                           {topic.duration}   
//                         </span>
//                         <span className="text-xs opacity-70 block">
//                           7k views
//                         </span>
//                         <span className="text-xs opacity-70 block">
//                           6 days ago
//                         </span>
                        
//                       </div>
//                     )}

//                     {isHovered && (
//                       <div className="relative flex justify-center mt-2 ml-48">
//                         <button
//                           onClick={(e) => handleMenuToggle(uniqueId, e)}
//                           className={`p-2 rounded-full transition-colors ${
//                             isDarkMode
//                               ? "hover:bg-gray-700 text-gray-300"
//                               : "hover:bg-gray-200 text-gray-600"
//                           }`}
//                         >
//                           <FaEllipsisV size={12} />
//                         </button>

//                         {isMenuOpen && (
//                           <div
//                             className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 rounded-lg shadow-lg border z-30 ${
//                               isDarkMode
//                                 ? "bg-gray-800 border-gray-600"
//                                 : "bg-white border-gray-200"
//                             }`}
//                           >
//                             <button
//                               onClick={() =>
//                                 handleMenuOption("watch", chapter, topic)
//                               }
//                               className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-t-lg transition-colors ${
//                                 isDarkMode
//                                   ? "hover:bg-gray-700 text-white"
//                                   : "hover:bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               Watch Now
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleMenuOption("bookmark", chapter, topic)
//                               }
//                               className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 transition-colors ${
//                                 isDarkMode
//                                   ? "hover:bg-gray-700 text-white"
//                                   : "hover:bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               Bookmark
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleMenuOption("share", chapter, topic)
//                               }
//                               className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-b-lg transition-colors ${
//                                 isDarkMode
//                                   ? "hover:bg-gray-700 text-white"
//                                   : "hover:bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               Share
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubjectTopic;









import React, { useRef, useState, useEffect, useCallback } from "react";
import { subjectsData } from "./data/subject";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaUserCircle,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";

// Import the subject images
import biologyImage from "../assets/images/biology.jpg";
import chemistryImage from "../assets/images/chemistry.jpg";
import mathsImage from "../assets/images/maths.jpg";
import physicsImage from "../assets/images/physics.jpg";
import zoologyImage from "../assets/images/zoology.jpg";

interface SubjectTopicProps {
  selectedSubjectId: number | null;
  isDarkMode: boolean;
}

interface Video {
  key: string;
  url: string;
}

const SubjectTopic: React.FC<SubjectTopicProps> = ({
  selectedSubjectId,
  isDarkMode,
}) => {
  const history = useHistory();

  // ✅ Find the subject index based on selected ID
  const subjectIndex = subjectsData.findIndex(
    (subj) => subj.id === selectedSubjectId
  );

  if (subjectIndex === -1) {
    return (
      <div
        className={`p-6 flex justify-center items-center ${
          isDarkMode ? "bg-[#091E37] text-white" : "bg-white text-black"
        }`}
      >
        <p>No subject selected</p>
      </div>
    );
  }

  const rotatedSubjects = [
    ...subjectsData.slice(subjectIndex),
    ...subjectsData.slice(0, subjectIndex),
  ];

  // ✅ Lazy load state for subjects
  const [visibleSubjects, setVisibleSubjects] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  // ✅ Fetch videos on component mount
  useEffect(() => {
    async function fetchVideos() {
      try {
        setVideoLoading(true);
        const res = await fetch("http://localhost:4000/videos");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setVideos(data.videos);
      } catch (err: any) {
        console.error(err);
        setVideoError(err.message || "Something went wrong");
      } finally {
        setVideoLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // ✅ Get a random video URL
  const getRandomVideoUrl = useCallback(() => {
    if (videos.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex].url;
  }, [videos]);

  // ✅ Reset when subject changes
  useEffect(() => {
    setVisibleSubjects(1);
    setLoadingMore(false);
  }, [selectedSubjectId]);

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const autoScrollIntervals = useRef<(number | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredContainerSide, setHoveredContainerSide] = useState<{
    index: number;
    side: "left" | "right" | null;
  }>({ index: -1, side: null });
  const [hoveredArrow, setHoveredArrow] = useState<{
    index: number;
    side: "left" | "right" | null;
  }>({ index: -1, side: null });
  const [playingVideos, setPlayingVideos] = useState<{[key: string]: boolean}>({});
  const [videoProgress, setVideoProgress] = useState<{[key: string]: number}>({});
  const [videoTimes, setVideoTimes] = useState<{[key: string]: {current: string, total: string}}>({});

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Function to get the appropriate subject image
  const getSubjectImage = (subjectName: string) => {
    const lowerCaseName = subjectName.toLowerCase();
    if (lowerCaseName.includes("biology")) return biologyImage;
    if (lowerCaseName.includes("chemistry")) return chemistryImage;
    if (lowerCaseName.includes("math")) return mathsImage;
    if (lowerCaseName.includes("physics")) return physicsImage;
    if (lowerCaseName.includes("zoology")) return zoologyImage;
    return biologyImage; // default image
  };

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // ✅ Scroll functions
  const scrollCards = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth =
      container.querySelector(".flex-shrink-0")?.clientWidth || 300;
    const gap = 24;
    const totalScroll = (cardWidth + gap) * 3;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft + totalScroll >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: totalScroll, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft - totalScroll <= 0) {
        container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -totalScroll, behavior: "smooth" });
      }
    }
  };

  const startAutoScroll = (index: number) => {
    if (autoScrollIntervals.current[index]) return;
    const container = scrollRefs.current[index];
    if (!container) return;

    autoScrollIntervals.current[index] = window.setInterval(() => {
      const cardWidth =
        container.querySelector(".flex-shrink-0")?.clientWidth || 300;
      const gap = 24;
      const totalScroll = cardWidth + gap;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft + totalScroll >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: totalScroll, behavior: "smooth" });
      }
    }, 5000);
  };

  const stopAutoScroll = (index: number) => {
    if (autoScrollIntervals.current[index]) {
      clearInterval(autoScrollIntervals.current[index]!);
      autoScrollIntervals.current[index] = null;
    }
  };

  const handleRowMouseEnter = (index: number) => {
    setHoveredRow(index);
    stopAutoScroll(index);
  };

  const handleRowMouseLeave = (index: number) => {
    setHoveredRow(null);
    setHoveredContainerSide({ index: -1, side: null });
    setHoveredArrow({ index: -1, side: null });
    startAutoScroll(index);
  };

  const handleContainerHover = (index: number, e: React.MouseEvent) => {
    if (isMobile) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Show left arrow when hovering on left 20% of container
    if (x < width * 0.2) {
      setHoveredContainerSide({ index, side: "left" });
    } 
    // Show right arrow when hovering on right 20% of container
    else if (x > width * 0.8) {
      setHoveredContainerSide({ index, side: "right" });
    } else {
      setHoveredContainerSide({ index: -1, side: null });
    }
  };

  const handleArrowHover = (index: number, side: "left" | "right") => {
    setHoveredArrow({ index, side });
  };

  const handleArrowLeave = () => {
    setHoveredArrow({ index: -1, side: null });
  };

  const handleMenuToggle = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(showMenu === cardId ? null : cardId);
  };

  const handleMenuOption = (option: string, chapter: any, topic: any) => {
    setShowMenu(null);
    switch (option) {
      case "watch":
        handlePlay(chapter, topic);
        break;
      case "bookmark":
        break;
      case "share":
        break;
    }
  };

  const handlePlay = (chapter: any, topic: any) => {
    const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";

    history.push({
      pathname: `/course/${chapter.chapterName.replace(/\s+/g, "-")}/chapter-${chapterNumber}`,
      state: {
        subjectName: chapter.subjectName,
        courseName: chapter.chapterName,
        courseId: chapter.chapterId,
        topicName: topic.name,
        duration: topic.duration,
      },
    });
  };

  // Handle video play on hover
  const handleCardHover = (uniqueId: string, chapterIndex: number) => {
    setHoveredCard(uniqueId);
    setHoveredRow(chapterIndex);
    stopAutoScroll(chapterIndex);
    
    // Start playing the video for this card
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: true
    }));
  };

  const handleCardLeave = (uniqueId: string, chapterIndex: number) => {
    setHoveredCard(null);
    startAutoScroll(chapterIndex);
    
    // Pause the video for this card
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: false
    }));
  };

  // Handle video progress
  const handleTimeUpdate = (uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const progress = (video.currentTime / video.duration) * 100;
    
    setVideoProgress(prev => ({
      ...prev,
      [uniqueId]: progress
    }));
    
    setVideoTimes(prev => ({
      ...prev,
      [uniqueId]: {
        current: formatTime(video.currentTime),
        total: formatTime(video.duration)
      }
    }));
  };

  // Handle video loaded metadata to get duration
  const handleLoadedMetadata = (uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setVideoTimes(prev => ({
      ...prev,
      [uniqueId]: {
        current: "0:00",
        total: formatTime(video.duration)
      }
    }));
  };

  // Handle progress bar click to seek
  const handleProgressClick = (uniqueId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRefs.current[uniqueId];
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * video.duration;
    
    video.currentTime = newTime;
    
    // Update the time display immediately
    setVideoTimes(prev => ({
      ...prev,
      [uniqueId]: {
        ...prev[uniqueId],
        current: formatTime(newTime)
      }
    }));
  };

  // Handle progress bar hover to show time preview
  const handleProgressHover = (uniqueId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRefs.current[uniqueId];
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const hoverPosition = (e.clientX - rect.left) / rect.width;
    const previewTime = hoverPosition * video.duration;
    
    // You could implement a preview tooltip here if needed
  };

  // ✅ Observer for lazy load
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          
          // Load next subject after a delay
          setTimeout(() => {
            setVisibleSubjects((prev) =>
              Math.min(prev + 1, rotatedSubjects.length)
            );
            setLoadingMore(false);
          }, 1000); // 1 second delay
        }
      });

      observerRef.current.observe(node);
    },
    [rotatedSubjects, loadingMore]
  );

  // ✅ Start auto-scroll when subjects become visible
  useEffect(() => {
    for (let i = 0; i < visibleSubjects; i++) {
      rotatedSubjects[i].chapters.forEach((_, chapterIndex) => {
        startAutoScroll(chapterIndex);
      });
    }

    return () => {
      autoScrollIntervals.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [visibleSubjects]);

  return (
    <div
      className={`px-2 relative bottom-20 md:bottom-0 ${
        isDarkMode ? "bg-[#091E37] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl mb-6">Recorded Video</h2>

      {rotatedSubjects.slice(0, visibleSubjects).map((subject, sIndex) => (
        <div key={subject.id} className="mb-12">
          <h2 className="text-2xl mb-6">{subject.name}</h2>

          {subject.chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.chapterId}
              className="mb-8 relative"
              onMouseEnter={() => handleRowMouseEnter(chapterIndex)}
              onMouseLeave={() => handleRowMouseLeave(chapterIndex)}
            >
              <h3 className="text-xl mb-4">
                Chapter {chapterIndex + 1}: {chapter.chapterName}
              </h3>

              <div 
                className="relative"
                onMouseMove={(e) => handleContainerHover(chapterIndex, e)}
                onMouseLeave={() => setHoveredContainerSide({ index: -1, side: null })}
              >
                {!isMobile && (
                  <>
                    {/* Left arrow - show when hovering left side of container OR the arrow itself */}
                    <div className={`absolute left-0 top-0 h-full w-1/5 flex items-center justify-start z-10 pointer-events-none`}>
                      <button
                        onClick={() => scrollCards(chapterIndex, "left")}
                        onMouseEnter={() => handleArrowHover(chapterIndex, "left")}
                        onMouseLeave={handleArrowLeave}
                        className={`pointer-events-auto p-2 transition-all duration-200 ${
                          (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "left") || 
                          (hoveredArrow.index === chapterIndex && hoveredArrow.side === "left")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <FaChevronLeft />
                      </button>
                    </div>
                    
                    {/* Right arrow - show when hovering right side of container OR the arrow itself */}
                    <div className={`absolute right-0 top-0 h-full w-1/5 flex items-center justify-end z-10 pointer-events-none`}>
                      <button
                        onClick={() => scrollCards(chapterIndex, "right")}
                        onMouseEnter={() => handleArrowHover(chapterIndex, "right")}
                        onMouseLeave={handleArrowLeave}
                        className={`pointer-events-auto p-2 transition-all duration-200 ${
                          (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "right") || 
                          (hoveredArrow.index === chapterIndex && hoveredArrow.side === "right")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </>
                )}

                <div
                  ref={(el) => {
                    scrollRefs.current[chapterIndex] = el;
                  }}
                  className={`flex gap-6 py-2 ${
                    isMobile
                      ? "overflow-x-auto overflow-y-hidden scrollbar-hide"
                      : "overflow-x-hidden overflow-y-hidden scroll-smooth"
                  }`}
                >
                  {chapter.topics.map((topic, topicIndex) => {
                    const uniqueId = `${sIndex}-${chapterIndex}-${topicIndex}`;
                    const isHovered = hoveredCard === uniqueId;
                    const isMenuOpen = showMenu === uniqueId;
                    const subjectImage = getSubjectImage(subject.name);
                    const isPlaying = playingVideos[uniqueId];
                    const progress = videoProgress[uniqueId] || 0;
                    const videoUrl = getRandomVideoUrl();
                    const videoTime = videoTimes[uniqueId] || {current: "0:00", total: "0:00"};

                    return (
                      <div
                        key={uniqueId}
                        className="flex-shrink-0 w-80 relative" // Increased card width
                        onMouseEnter={() => handleCardHover(uniqueId, chapterIndex)}
                        onMouseLeave={() => handleCardLeave(uniqueId, chapterIndex)}
                        onClick={() => handlePlay(chapter, topic)}
                      >
                        <div className="relative h-52 w-full rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-left">
                          {isHovered && videoUrl ? (
                            <>
                              <video
                                ref={el => {
                                  if (el) {
                                    videoRefs.current[uniqueId] = el;
                                  }
                                }}
                                autoPlay
                                muted
                                loop
                                className="absolute inset-0 w-full h-full object-cover"
                                onTimeUpdate={(e) => handleTimeUpdate(uniqueId, e)}
                                onLoadedMetadata={(e) => handleLoadedMetadata(uniqueId, e)}
                              >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              
                              {/* Video time display */}
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {videoTime.current} / {videoTime.total}
                              </div>
                              
                              {/* Progress bar */}
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <div 
                                  className="w-full h-1.5 bg-gray-600 rounded-full cursor-pointer"
                                  onClick={(e) => handleProgressClick(uniqueId, e)}
                                  onMouseMove={(e) => handleProgressHover(uniqueId, e)}
                                >
                                  <div 
                                    className="h-full bg-red-600 rounded-full transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <img 
                                src={subjectImage} 
                                alt={subject.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20"></div>
                              
                              {/* Video time display */}
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {videoTime.total}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Topic info (always visible) */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaUserCircle className="text-gray-500 mr-2" size={18} />
                              <h4 className="font-semibold text-base">{topic.name}</h4>
                            </div>
                            {/* Three-dot menu (always visible) */}
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuToggle(uniqueId, e);
                                }}
                                className={`p-1 rounded-full transition-colors ${
                                  isDarkMode
                                    ? "hover:bg-gray-700 text-gray-300"
                                    : "hover:bg-gray-200 text-gray-600"
                                }`}
                              >
                                <FaEllipsisV size={14} />
                              </button>

                              {isMenuOpen && (
                                <div
                                  className={`absolute bottom-full right-0 mb-1 w-32 rounded-lg shadow-lg border z-30 ${
                                    isDarkMode
                                      ? "bg-gray-800 border-gray-600"
                                      : "bg-white border-gray-200"
                                  }`}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMenuOption("watch", chapter, topic);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-t-lg"
                                  >
                                    Watch Now
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMenuOption("bookmark", chapter, topic);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80"
                                  >
                                    Bookmark
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMenuOption("share", chapter, topic);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-b-lg"
                                  >
                                    Share
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm opacity-70">
                              6 days ago
                            </span>
                          </div>
                          <span className="text-sm opacity-70 block mt-1">
                            6k Views
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Lazy load trigger */}
      {visibleSubjects < rotatedSubjects.length && (
        <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
          {loadingMore ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm opacity-70">Loading next subject...</p>
            </div>
          ) : (
            <p className="text-sm opacity-70">Scroll down to load more subjects</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectTopic;