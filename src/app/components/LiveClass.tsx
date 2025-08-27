// import React, { useState, useEffect, useRef } from "react";
// import { useHistory } from "react-router-dom";
// import biology from "../assets/images/biology.jpg";
// import zoology1 from "../assets/images/zoology.jpg";
// import physics from "../assets/images/physics.jpg";
// import maths from "../assets/images/maths.jpg";
// import chemistry1 from "../assets/images/chemistry.jpg";
// import {
//   FaChevronUp,
//   FaChevronDown,
//   FaPlay,
//   FaSearch,
//   FaCalendarAlt,
//   FaVolumeMute,
//   FaVolumeUp,
//   FaClock,
//   FaGlobe
// } from "react-icons/fa";

// interface LiveClassProps {
//   isDarkMode: boolean;
//   selectedSubjectId: number | null;
//   onSubjectSelect: (subjectId: number) => void;
// }

// interface ClassInfo {
//   id: number;
//   src: string;
//   alt: string;
//   subject: string;
//   time: string;
//   topic: string;
//   date: string;
//   genres: string[];
//   description: string;
//   videoUrl: string;
//   language: string;
// }

// interface Video {
//   key: string;
//   url: string;
// }

// interface VideosResponse {
//   videos: Video[];
// }

// const LiveClass: React.FC<LiveClassProps> = ({
//   isDarkMode,
//   selectedSubjectId,
//   onSubjectSelect,
// }) => {
//   const history = useHistory();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isMuted, setIsMuted] = useState(true);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:4000/videos");
//         if (!res.ok) throw new Error("Network response was not ok");
//         const data: VideosResponse = await res.json();
//         setVideos(data.videos);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   useEffect(() => {
//     const checkDevice = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width > 768 && width <= 1024);
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
    
//     return () => {
//       window.removeEventListener('resize', checkDevice);
//     };
//   }, []);

//   const images = [
//      {
//       id: 4,
//       src: physics,
//       alt: "Physics",
//       subject: "Physics",
//       time: "6:00AM",
//       language: "English",
//       topic: "Quantum Mechanics",
//       date: "Dec 22, 2024",
//       genres: ["Science", "Quantum", "Theory"],
//       description:
//         "Fundamental theory in physics describing nature at small scales. We'll discuss wave-particle duality, quantum states, and real-world applications.",
//       videoUrl: videos[3]?.url || "",
//     },
//     {
//       id: 1,
//       src: biology,
//       alt: "Biology",
//       subject: "Biology",
//       time: "10:20AM",
//       language: "English",
//       topic: "Cell Biology",
//       date: "Dec 15, 2024",
//       genres: ["Science", "Life", "Molecular"],
//       description:
//         "Exploring the fundamental unit of life - the cell. In this session, we will dive into cell structure, organelles, and their functions, along with an overview of cell communication and division.",
//       videoUrl: videos[2]?.url || "",
//     },
//     {
//       id: 2,
//       src: zoology1,
//       alt: "Zoology",
//       subject: "Zoology",
//       time: "11:15AM",
//       topic: "Animal Behavior",
//       language: "English",
//       date: "Dec 18, 2024",
//       genres: ["Science", "Animal", "Behavior"],
//       description:
//         "Understanding patterns and reasons behind animal actions. We'll explore instinctive behaviors, learned responses, and how environment shapes animal life.",
//       videoUrl: videos[1]?.url || "",
//     },
//     {
//       id: 3,
//       src: chemistry1,
//       alt: "Chemistry",
//       subject: "Chemistry",
//       time: "12:30PM",
//       topic: "Organic Chemistry",
//       language: "Hindi",
//       date: "Dec 20, 2024",
//       genres: ["Science", "Molecular", "Reactions"],
//       description:
//         "Study of carbon-containing compounds and their reactions. This class covers hydrocarbons, functional groups, and reaction mechanisms.",
//       videoUrl: videos[0]?.url || "",
//     },
//     {
//       id: 5,
//       src: maths,
//       alt: "Maths",
//       subject: "Maths",
//       time: "3:15PM",
//       language: "Hindi",
//       topic: "Calculus",
//       date: "Dec 25, 2024",
//       genres: ["Mathematics", "Analysis", "Applications"],
//       description:
//         "Mathematical study of continuous change. Learn limits, derivatives, integrals, and their applications in science and engineering.",
//       videoUrl: videos[4]?.url || "",
//     },
//   ];

//   const [centerIndex, setCenterIndex] = useState(0);
//   const [searchActive, setSearchActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [animateKey, setAnimateKey] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);
//   const [videoTimer, setVideoTimer] = useState<any>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [contentOpacity, setContentOpacity] = useState(1);

//   useEffect(() => {
//     if (!selectedSubjectId && images.length > 0) {
//       onSubjectSelect(images[0].id);
//     }
//   }, [selectedSubjectId, images, onSubjectSelect]);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.muted = isMuted;
//     }
//   }, [isMuted, showVideo]);
  
//   useEffect(() => {
//     if (!isMobile) {
//       if (videoTimer) clearTimeout(videoTimer);
//       setShowVideo(false);

//       const timer = setTimeout(() => setShowVideo(true), 3000);
//       setVideoTimer(timer);

//       return () => clearTimeout(timer);
//     }
//   }, [centerIndex, isMobile]);

//   const moveUp = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setContentOpacity(0);
//     setTimeout(() => {
//       setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
//       setAnimateKey((prev) => prev + 1);
//       setTimeout(() => {
//         setContentOpacity(1);
//         setIsAnimating(false);
//       }, 300);
//     }, 300);
//   };

//   const moveDown = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setContentOpacity(0);
//     setTimeout(() => {
//       setCenterIndex((prev) => (prev + 1) % images.length);
//       setAnimateKey((prev) => prev + 1);
//       setTimeout(() => {
//         setContentOpacity(1);
//         setIsAnimating(false);
//       }, 300);
//     }, 300);
//   };

//   const handleClick = (index: number) => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setContentOpacity(0);
//     setTimeout(() => {
//       setCenterIndex(index);
//       setAnimateKey((prev) => prev + 1);
//       setTimeout(() => {
//         setContentOpacity(1);
//         setIsAnimating(false);
//       }, 300);
//     }, 300);
//   };

//   const getDisplayImages = () => {
//     const prevIndex = (centerIndex - 1 + images.length) % images.length;
//     const nextIndex = (centerIndex + 1) % images.length;
//     return [images[prevIndex], images[centerIndex], images[nextIndex]];
//   };

//   const currentImage = images[centerIndex];
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       setCenterIndex((prev) => (prev + 1) % images.length);
//     }

//     if (touchStart - touchEnd < -50) {
//       setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const handleJoinClass = (classInfo: ClassInfo) => {
//     history.push("/live", { 
//       classInfo: {
//         id: classInfo.id,
//         subject: classInfo.subject,
//         topic: classInfo.topic,
//         time: classInfo.time,
//         date: classInfo.date,
//         description: classInfo.description,
//         image: classInfo.src,
//         videoUrl: classInfo.videoUrl,
//         language: classInfo.language
//       }
//     });
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <div className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
//           <p className={`mt-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Loading videos...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-gray-100"}`}>
//         <div className="text-center">
//           <p className={`text-red-500 mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Error: {error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isMobile) {
//     return (
//       <div className={`relative w-full h-full overflow-hidden ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
//         <div className="h-full flex flex-col pb-20"> 
//           <div 
//             className="relative w-full rounded-xl overflow-hidden mx-auto"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <img
//               src={currentImage.src}
//               alt={currentImage.alt}
//               className="w-full h-60 object-contain bg-black"
//             />
//             <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//               <span className="text-red-400">●</span> LIVE
//             </div>
//             <div className={`absolute bottom-4 left-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//               <h3 className="font-bold text-lg">{currentImage.subject}</h3>
//               <p className="text-sm">{currentImage.topic}</p>
//             </div>
//             <button
//               onClick={() => handleJoinClass(currentImage)}
//               className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full flex items-center justify-center transition-all duration-300"
//             >
//               <FaPlay className="text-sm" />
//             </button>
//           </div>
//           <div className="flex justify-center space-x-2 my-4">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleClick(index)}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   index === centerIndex 
//                     ? 'bg-red-600 w-4' 
//                     : isDarkMode 
//                       ? 'bg-white/50' 
//                       : 'bg-black/50'
//                 }`}
//               />
//             ))}
//           </div>
//           <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
//             <div className="mb-4">
//               <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//                 {currentImage.topic}
//               </h2>
//               <div className="flex flex-wrap items-center gap-2 mb-2">
//                 <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
//                   <FaCalendarAlt className={isDarkMode ? "text-white" : "text-gray-700"} />
//                   <span className="ml-1">
//                     {currentImage.date}
//                   </span>
//                 </div>
//                 <div className={isDarkMode ? "text-white" : "text-gray-700"}>●</div>
//                 <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
//                   <FaClock className={isDarkMode ? "text-white" : "text-gray-700"} />
//                   <span className="ml-1">{currentImage.time}</span>
//                 </div>
//                 <div className={isDarkMode ? "text-white" : "text-gray-700"}>●</div>
//                 <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
//                   <FaGlobe className={isDarkMode ? "text-white" : "text-gray-700"} />
//                   <span className="ml-1">{currentImage.language}</span>
//                 </div>
//               </div>
//               <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
//                 {currentImage.description}
//               </p>
//             </div>
            
//             <div className="mb-6">
//               <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//                 Select Subject:
//               </h3>
//               <div className="flex overflow-x-auto pb-2 space-x-2">
//                 {images.map((subj) => {
//                   const isSelected = selectedSubjectId === subj.id;
//                   return (
//                     <button
//                       key={subj.id}
//                       onClick={() => onSubjectSelect(subj.id)}
//                       className={`px-4 py-2 text-sm rounded-full font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
//                         isSelected 
//                           ? isDarkMode 
//                             ? "bg-white text-black" 
//                             : "bg-[#091E37] text-white"
//                           : isDarkMode 
//                             ? "text-white bg-white/20" 
//                             : "text-gray-900 bg-gray-200"
//                       }`}
//                     >
//                       {subj.subject}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   if (isTablet) {
//     return (
//       <div className="flex flex-col w-full h-full relative overflow-hidden">
//         <div
//           className="relative w-full h-1/2 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: showVideo ? "none" : `url(${currentImage.src})` }}
//         >
//           {showVideo && (
//             <video
//               ref={videoRef}
//               key={currentImage.videoUrl}
//               src={currentImage.videoUrl}
//               autoPlay
//               loop
//               muted={isMuted}
//               className="w-full h-full object-cover"
//               onError={() => setShowVideo(false)}
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2"></div>
        
//           {showVideo && (
//             <button
//               onClick={toggleMute}
//               className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg"
//             >
//               {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//             </button>
//           )}
//         </div>

//         <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-black/80 to-black">
//           <div className="flex gap-2 mb-4">
//             {currentImage.genres.map((genre, index) => (
//               <React.Fragment key={genre}>
//                 <span className="text-white text-sm font-medium">{genre}</span>
//                 {index < currentImage.genres.length - 1 && (
//                   <span className="text-red-500 text-sm">●</span>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">{currentImage.topic}</h1>
//           <div className="flex flex-wrap items-center gap-4 mb-6">
//             <div className="flex items-center gap-1 text-white">
//               <FaCalendarAlt />
//               <span className="ml-1">{currentImage.date}</span>
//             </div>
//             <div className="text-white">●</div>
//             <div className="text-white flex items-center gap-1">
//               <FaClock className="mr-1" />
//               {currentImage.time}
//             </div>
//             <div className="text-white">●</div>
//             <div className="flex items-center gap-1 text-white">
//               <FaGlobe className="mr-1" />
//               {currentImage.language}
//             </div>
//           </div>
//           <p className="text-white text-base max-w-2xl mb-8 leading-relaxed">
//             {currentImage.description}
//           </p>
          
//           <div className="flex flex-wrap gap-4 mb-8">
//             {images.map((subj) => {
//               const isSelected = selectedSubjectId === subj.id;
//               return (
//                 <button
//                   key={subj.id}
//                   onClick={() => onSubjectSelect(subj.id)}
//                   className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
//                     isSelected ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   {subj.subject}
//                 </button>
//               );
//             })}
//           </div>
          
//           <button
//             onClick={() => handleJoinClass(currentImage)}
//             className="bg-[#123a66] hover:bg-[#123a66] text-white py-3 px-6 rounded-lg flex items-center text-base font-semibold transition-all duration-300 hover:scale-105"
//           >
//             <FaPlay className="mr-3" /> Join Class
//           </button>
//         </div>

//         {/* Navigation controls for tablet */}
//         <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
//           <button
//             onClick={moveUp}
//             className="p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95 mb-4"
//           >
//             <FaChevronUp className="text-xl" />
//           </button>
//           <button
//             onClick={moveDown}
//             className="p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
//           >
//             <FaChevronDown className="text-xl" />
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="flex w-full relative overflow-hidden h-[88vh] top-2 ">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: showVideo ? "none" : `url(${currentImage.src})` }}
//       >
//         {showVideo && (
//           <video
//             ref={videoRef}
//             key={currentImage.videoUrl}
//             src={currentImage.videoUrl}
//             autoPlay
//             loop
//             muted={isMuted}
//             className="w-full h-full object-cover"
//             onError={() => setShowVideo(false)}
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2"></div>
      
//         {showVideo && (
//           <button
//             onClick={toggleMute}
//             className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg"
//           >
//             {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//           </button>
//         )}
//       </div>
//       <div className="absolute top-12 z-20 ml-52">
//         <button
//           onClick={moveUp}
//           className="nav-up-btn p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
//         >
//           <FaChevronUp className="text-xl" />
//         </button>
//       </div>
//       <div className="absolute bottom-12 ml-52 z-20">
//         <button
//           onClick={moveDown}
//           className="nav-down-btn p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
//         >
//           <FaChevronDown className="text-xl" />
//         </button>
//       </div>
//       <div className="relative z-10 flex flex-col justify-center items-start pl-16 w-96 gap-6">
//         {getDisplayImages().map((img, index) => {
//           let animationClass =
//             index === 0
//               ? "animate-slide-up-from-bottom"
//               : index === 2
//               ? "animate-slide-down-from-top"
//               : "animate-fade-in-scale";

//           return (
//             <div
//               key={`${img.id}-${animateKey}`}
//               className={`relative cursor-pointer transition-all duration-500 transform ${
//                 index === 1
//                   ? "z-20 brightness-90 shadow-2xl"
//                   : "z-10 hover:brightness-110 opacity-90"
//               } ${animationClass}`}
//               style={{ animationDuration: "500ms", animationFillMode: "both" }}
//               onClick={() =>
//                 handleClick((centerIndex - 1 + index + images.length) % images.length)
//               }
//             >
//               <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-xl bg-black/10 backdrop-blur-sm border border-white/20">
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full h-full object-cover transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
//                 <div className="absolute bottom-4 left-4 text-white">
//                   <h3 className="font-bold text-lg mb-1 drop-shadow-lg">{img.subject}</h3>
//                   <p className="text-sm opacity-95 flex items-center gap-1 drop-shadow-md">
//                     <FaCalendarAlt className="text-xs" />
//                     {img.date}
//                   </p>
//                   <p className="text-xs opacity-85 flex items-center gap-1 drop-shadow-md">
//                     <FaClock className="text-xs" />
//                     {img.time}
//                   </p>
//                 </div>
//                 {index === 1 && (
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 animate-pulse shadow-lg"></div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div
//         className="flex-1 flex flex-col justify-center items-start pl-20 pr-8 relative z-10"
//         style={{ opacity: contentOpacity, transition: "opacity 300ms ease-in-out" }}
//       >
//         <div className="flex gap-2 mb-4 animate-fade-in">
//           {currentImage.genres.map((genre, index) => (
//             <React.Fragment key={genre}>
//               <span className="text-white text-sm font-medium">{genre}</span>
//               {index < currentImage.genres.length - 1 && (
//                 <span className="text-red-500 text-sm">●</span>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//         <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">{currentImage.topic}</h1>
//         <div className="flex items-center gap-4 mb-6 animate-fade-in">
//           <div className="flex items-center gap-1 text-white">
//             <FaCalendarAlt />
//             <span className="ml-1">{currentImage.date}</span>
//           </div>
//           <div className="text-white">●</div>
//           <div className="text-white flex items-center gap-1">
//             <FaClock className="mr-1" />
//             {currentImage.time}
//           </div>
//           <div className="text-white">●</div>
//           <div className="flex items-center gap-1 text-white">
//             <FaGlobe className="mr-1" />
//             {currentImage.language}
//           </div>
//         </div>
//         <p className="text-white text-lg max-w-2xl mb-8 leading-relaxed animate-fade-in">
//           {currentImage.description}
//         </p>
//         <button
//           onClick={() => handleJoinClass(currentImage)}
//           className="bg-[#123a66] hover:bg-[#123a66] text-white py-4 px-8 rounded-lg flex items-center text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in"
//         >
//           <FaPlay className="mr-3" /> Join Class
//         </button>
//       </div>
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex items-center gap-6 bg-black/40 backdrop-blur-sm rounded-full px-8 py-4">
//           <div className="flex gap-3">
//             {images.map((subj) => {
//               const isSelected = selectedSubjectId === subj.id;
//               return (
//                 <button
//                   key={subj.id}
//                   onClick={() => onSubjectSelect(subj.id)}
//                   className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
//                     isSelected ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/20"
//                   }`}
//                 >
//                   {subj.subject}
//                 </button>
//               );
//             })}
//           </div>
//           <div className="border-l border-white/30 pl-6">
//             {searchActive ? (
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search courses..."
//                 autoFocus
//                 className="px-4 py-2 text-sm rounded-full outline-none bg-white/20 text-white placeholder-white/70 backdrop-blur-sm"
//                 onBlur={() => setSearchActive(false)}
//               />
//             ) : (
//               <button
//                 onClick={() => setSearchActive(true)}
//                 className="p-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
//               >
//                 <FaSearch />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveClass;



import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import biology from "../assets/images/biology.jpg";
import zoology1 from "../assets/images/zoology.jpg";
import physics from "../assets/images/physics.jpg";
import maths from "../assets/images/maths.jpg";
import chemistry1 from "../assets/images/chemistry.jpg";
import {
  FaChevronUp,
  FaChevronDown,
  FaPlay,
  FaSearch,
  FaCalendarAlt,
  FaVolumeMute,
  FaVolumeUp,
  FaClock,
  FaGlobe
} from "react-icons/fa";

interface LiveClassProps {
  isDarkMode: boolean;
  selectedSubjectId: number | null;
  onSubjectSelect: (subjectId: number) => void;
}

interface ClassInfo {
  id: number;
  src: string;
  alt: string;
  subject: string;
  time: string;
  topic: string;
  date: string;
  genres: string[];
  description: string;
  videoUrl: string;
  language: string;
}

interface Video {
  key: string;
  url: string;
}

interface VideosResponse {
  videos: Video[];
}

const LiveClass: React.FC<LiveClassProps> = ({
  isDarkMode,
  selectedSubjectId,
  onSubjectSelect,
}) => {
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/videos");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: VideosResponse = await res.json();
        setVideos(data.videos);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const images = [
     {
      id: 4,
      src: physics,
      alt: "Physics",
      subject: "Physics",
      time: "6:00AM",
      language: "English",
      topic: "Quantum Mechanics",
      date: "Dec 22, 2024",
      genres: ["Science", "Quantum", "Theory"],
      description:
        "Fundamental theory in physics describing nature at small scales. We'll discuss wave-particle duality, quantum states, and real-world applications.",
      videoUrl: videos[3]?.url || "",
    },
    {
      id: 1,
      src: biology,
      alt: "Biology",
      subject: "Biology",
      time: "10:20AM",
      language: "English",
      topic: "Cell Biology",
      date: "Dec 15, 2024",
      genres: ["Science", "Life", "Molecular"],
      description:
        "Exploring the fundamental unit of life - the cell. In this session, we will dive into cell structure, organelles, and their functions, along with an overview of cell communication and division.",
      videoUrl: videos[2]?.url || "",
    },
    {
      id: 2,
      src: zoology1,
      alt: "Zoology",
      subject: "Zoology",
      time: "11:15AM",
      topic: "Animal Behavior",
      language: "English",
      date: "Dec 18, 2024",
      genres: ["Science", "Animal", "Behavior"],
      description:
        "Understanding patterns and reasons behind animal actions. We'll explore instinctive behaviors, learned responses, and how environment shapes animal life.",
      videoUrl: videos[1]?.url || "",
    },
    {
      id: 3,
      src: chemistry1,
      alt: "Chemistry",
      subject: "Chemistry",
      time: "12:30PM",
      topic: "Organic Chemistry",
      language: "Hindi",
      date: "Dec 20, 2024",
      genres: ["Science", "Molecular", "Reactions"],
      description:
        "Study of carbon-containing compounds and their reactions. This class covers hydrocarbons, functional groups, and reaction mechanisms.",
      videoUrl: videos[0]?.url || "",
    },
    {
      id: 5,
      src: maths,
      alt: "Maths",
      subject: "Maths",
      time: "3:15PM",
      language: "Hindi",
      topic: "Calculus",
      date: "Dec 25, 2024",
      genres: ["Mathematics", "Analysis", "Applications"],
      description:
        "Mathematical study of continuous change. Learn limits, derivatives, integrals, and their applications in science and engineering.",
      videoUrl: videos[4]?.url || "",
    },
  ];

  const [centerIndex, setCenterIndex] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateKey, setAnimateKey] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoTimer, setVideoTimer] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    if (!selectedSubjectId && images.length > 0) {
      onSubjectSelect(images[0].id);
    }
  }, [selectedSubjectId, images, onSubjectSelect]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, showVideo]);
  
  useEffect(() => {
    if (!isMobile) {
      if (videoTimer) clearTimeout(videoTimer);
      setShowVideo(false);

      const timer = setTimeout(() => setShowVideo(true), 3000);
      setVideoTimer(timer);

      return () => clearTimeout(timer);
    }
  }, [centerIndex, isMobile]);

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

  const currentImage = images[centerIndex];
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCenterIndex((prev) => (prev + 1) % images.length);
    }

    if (touchStart - touchEnd < -50) {
      setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleJoinClass = (classInfo: ClassInfo) => {
    history.push("/live", { 
      classInfo: {
        id: classInfo.id,
        subject: classInfo.subject,
        topic: classInfo.topic,
        time: classInfo.time,
        date: classInfo.date,
        description: classInfo.description,
        image: classInfo.src,
        videoUrl: classInfo.videoUrl,
        language: classInfo.language
      }
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Loading videos...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? "bg-[radial-gradient(circle,_rgba(26,_92,_173,_1)_0%,_rgba(2,_8,_41,_1)_100%)]" : "bg-gray-100"}`}>
        <div className="text-center">
          <p className={`text-red-500 mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
        <div className="h-full flex flex-col pb-20"> 
          <div 
            className="relative w-full rounded-xl overflow-hidden mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-60 object-contain bg-black"
            />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <span className="text-red-400">●</span> LIVE
            </div>
            <div className={`absolute bottom-4 left-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              <h3 className="font-bold text-lg">{currentImage.subject}</h3>
              <p className="text-sm">{currentImage.topic}</p>
            </div>
            <button
              onClick={() => handleJoinClass(currentImage)}
              className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <FaPlay className="text-sm" />
            </button>
          </div>
          <div className="flex justify-center space-x-2 my-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === centerIndex 
                    ? 'bg-red-600 w-4' 
                    : isDarkMode 
                      ? 'bg-white/50' 
                      : 'bg-black/50'
                }`}
              />
            ))}
          </div>
          <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? "bg-[#091E37]" : "bg-gray-100"}`}>
            <div className="mb-4">
              <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {currentImage.topic}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  <FaCalendarAlt className={isDarkMode ? "text-white" : "text-gray-700"} />
                  <span className="ml-1">
                    {currentImage.date}
                  </span>
                </div>
                <div className={isDarkMode ? "text-white" : "text-gray-700"}>●</div>
                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  <FaClock className={isDarkMode ? "text-white" : "text-gray-700"} />
                  <span className="ml-1">{currentImage.time}</span>
                </div>
                <div className={isDarkMode ? "text-white" : "text-gray-700"}>●</div>
                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  <FaGlobe className={isDarkMode ? "text-white" : "text-gray-700"} />
                  <span className="ml-1">{currentImage.language}</span>
                </div>
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {currentImage.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Select Subject:
              </h3>
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {images.map((subj) => {
                  const isSelected = selectedSubjectId === subj.id;
                  return (
                    <button
                      key={subj.id}
                      onClick={() => onSubjectSelect(subj.id)}
                      className={`px-4 py-2 text-sm rounded-full font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                        isSelected 
                          ? isDarkMode 
                            ? "bg-white text-black" 
                            : "bg-[#091E37] text-white"
                          : isDarkMode 
                            ? "text-white bg-white/20" 
                            : "text-gray-900 bg-gray-200"
                      }`}
                    >
                      {subj.subject}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isTablet) {
    return (
      <div className="flex flex-col w-full h-full relative overflow-hidden">
        <div
          className="relative w-full h-1/2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: showVideo ? "none" : `url(${currentImage.src})` }}
        >
          {showVideo && (
            <video
              ref={videoRef}
              key={currentImage.videoUrl}
              src={currentImage.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
              onError={() => setShowVideo(false)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2"></div>
        
          {showVideo && (
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          )}
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-black/80 to-black">
          <div className="flex gap-2 mb-4">
            {currentImage.genres.map((genre, index) => (
              <React.Fragment key={genre}>
                <span className="text-white text-sm font-medium">{genre}</span>
                {index < currentImage.genres.length - 1 && (
                  <span className="text-red-500 text-sm">●</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{currentImage.topic}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-white">
              <FaCalendarAlt className="text-xs" />
              <span className="ml-1 text-sm">{currentImage.date}</span>
            </div>
            <div className="text-white">●</div>
            <div className="text-white flex items-center gap-1">
              <FaClock className="text-xs mr-1" />
              <span className="text-sm">{currentImage.time}</span>
            </div>
            <div className="text-white">●</div>
            <div className="flex items-center gap-1 text-white">
              <FaGlobe className="text-xs mr-1" />
              <span className="text-sm">{currentImage.language}</span>
            </div>
          </div>
          <p className="text-white text-sm max-w-2xl mb-8 leading-relaxed">
            {currentImage.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {images.map((subj) => {
              const isSelected = selectedSubjectId === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSubjectSelect(subj.id)}
                  className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-300 ${
                    isSelected ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  {subj.subject}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handleJoinClass(currentImage)}
            className="bg-[#123a66] hover:bg-[#123a66] text-white py-3 px-6 rounded-lg flex items-center text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
            <FaPlay className="mr-3 text-xs" /> Join Class
          </button>
        </div>

        {/* Navigation controls for tablet */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={moveUp}
            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95 mb-4"
          >
            <FaChevronUp className="text-sm" />
          </button>
          <button
            onClick={moveDown}
            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95"
          >
            <FaChevronDown className="text-sm" />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex w-full relative overflow-hidden h-[88vh] top-2 ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: showVideo ? "none" : `url(${currentImage.src})` }}
      >
        {showVideo && (
          <video
            ref={videoRef}
            key={currentImage.videoUrl}
            src={currentImage.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
            onError={() => setShowVideo(false)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2"></div>
      
        {showVideo && (
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-30 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg"
          >
            {isMuted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
          </button>
        )}
      </div>
      
      {/* Updated navigation arrows as div elements positioned around the image cards */}
      <div className="relative z-10 flex flex-col justify-center items-center pl-16 w-80 gap-2">
        {/* Up arrow above the cards */}
        <div className="flex justify-center mb-2">
          <div 
            onClick={moveUp}
            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95 cursor-pointer"
          >
            <FaChevronUp className="text-sm" />
          </div>
        </div>
        
        {/* Image cards */}
        {getDisplayImages().map((img, index) => {
          let animationClass =
            index === 0
              ? "animate-slide-up-from-bottom"
              : index === 2
              ? "animate-slide-down-from-top"
              : "animate-fade-in-scale";

          return (
            <div
              key={`${img.id}-${animateKey}`}
              className={`relative cursor-pointer transition-all duration-500 transform ${
                index === 1
                  ? "z-20 brightness-90 shadow-2xl"
                  : "z-10 hover:brightness-110 opacity-90"
              } ${animationClass}`}
              style={{ animationDuration: "500ms", animationFillMode: "both" }}
              onClick={() =>
                handleClick((centerIndex - 1 + index + images.length) % images.length)
              }
            >
              <div className="relative w-64 h-40 rounded-xl overflow-hidden shadow-xl bg-black/10 backdrop-blur-sm border border-white/20">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-sm mb-1 drop-shadow-lg">{img.subject}</h3>
                  <p className="text-xs opacity-95 flex items-center gap-1 drop-shadow-md">
                    <FaCalendarAlt className="text-xs" />
                    {img.date}
                  </p>
                  <p className="text-xs opacity-85 flex items-center gap-1 drop-shadow-md">
                    <FaClock className="text-xs" />
                    {img.time}
                  </p>
                </div>
                {index === 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 animate-pulse shadow-lg"></div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Down arrow below the cards */}
        <div className="flex justify-center mt-2">
          <div 
            onClick={moveDown}
            className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg active:scale-95 cursor-pointer"
          >
            <FaChevronDown className="text-sm" />
          </div>
        </div>
      </div>
      
      <div
        className="flex-1 flex flex-col justify-center items-start pl-20 pr-8 relative z-10"
        style={{ opacity: contentOpacity, transition: "opacity 300ms ease-in-out" }}
      >
        <div className="flex gap-2 mb-4 animate-fade-in">
          {currentImage.genres.map((genre, index) => (
            <React.Fragment key={genre}>
              <span className="text-white text-xs font-medium">{genre}</span>
              {index < currentImage.genres.length - 1 && (
                <span className="text-red-500 text-xs">●</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">{currentImage.topic}</h1>
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-1 text-white">
            <FaCalendarAlt className="text-xs" />
            <span className="ml-1 text-sm">{currentImage.date}</span>
          </div>
          <div className="text-white">●</div>
          <div className="text-white flex items-center gap-1">
            <FaClock className="text-xs mr-1" />
            <span className="text-sm">{currentImage.time}</span>
          </div>
          <div className="text-white">●</div>
          <div className="flex items-center gap-1 text-white">
            <FaGlobe className="text-xs mr-1" />
            <span className="text-sm">{currentImage.language}</span>
          </div>
        </div>
        <p className="text-white text-sm max-w-2xl mb-8 leading-relaxed animate-fade-in">
          {currentImage.description}
        </p>
        <button
          onClick={() => handleJoinClass(currentImage)}
          className="bg-[#123a66] hover:bg-[#123a66] text-white py-3 px-6 rounded-lg flex items-center text-sm font-semibold transition-all duration-300 hover:scale-105 animate-fade-in"
        >
          <FaPlay className="mr-3 text-xs" /> Join Class
        </button>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="flex gap-3">
            {images.map((subj) => {
              const isSelected = selectedSubjectId === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => onSubjectSelect(subj.id)}
                  className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-300 ${
                    isSelected ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  {subj.subject}
                </button>
              );
            })}
          </div>
          <div className="border-l border-white/30 pl-4">
            {searchActive ? (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                autoFocus
                className="px-3 py-1 text-xs rounded-full outline-none bg-white/20 text-white placeholder-white/70 backdrop-blur-sm w-32"
                onBlur={() => setSearchActive(false)}
              />
            ) : (
              <button
                onClick={() => setSearchActive(true)}
                className="p-1 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                <FaSearch className="text-xs" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;