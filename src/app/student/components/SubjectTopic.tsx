// import React, { useRef, useState, useEffect, useCallback,  } from "react";
// import { subjectsData } from "./data/subject";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaUserCircle,
// } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import image1 from "../assets/chemistry/01.png";
// import image2 from "../assets/chemistry/02.png";
// import image3 from "../assets/chemistry/03.png";
// import image4 from "../assets/chemistry/04.png";
// import image5 from "../assets/chemistry/05.png";
// import image6 from "../assets/chemistry/06.png";
// import image7 from "../assets/chemistry/07.png";
// import image8 from "../assets/chemistry/08.png";
// import image9 from "../assets/chemistry/10.png";
// import image10 from "../assets/chemistry/08@2x.png";
// import image11 from "../assets/chemistry/09.png";
// import image12 from "../assets/chemistry/09@2x.png";
// import image13 from "../assets/chemistry/10@2x.png";
// import image14 from "../assets/chemistry/11@2x.png";
// import image15 from "../assets/chemistry/12@2x.png";
// import image16 from "../assets/chemistry/13@2x.png";
// import image17 from "../assets/chemistry/13.png";
// import image18 from "../assets/chemistry/14.png";
// import image19 from "../assets/chemistry/15.png";
// import image20 from "../assets/chemistry/Lecture 04.png";
// import image21 from "../assets/chemistry/13@2x.png";
// import image22 from "../assets/chemistry/14@2x.png";
// import image23 from "../assets/chemistry/15@2x.png";
// import image24 from "../assets/chemistry/16@2x.png";
// import image25 from "../assets/chemistry/17@2x.png";
// import image26 from "../assets/chemistry/18@2x.png";
// import image27 from "../assets/chemistry/19@2x.png";
// import image28 from "../assets/chemistry/20@2x.png";
// import image29 from "../assets/chemistry/25@2x.png";
// import image30 from "../assets/chemistry/Lecture 05.png";
// import image31 from "../assets/chemistry/Lecture 04.png";

// interface SubjectTopicProps {
//   selectedSubjectId: number | null;
//   isDarkMode: boolean;
// }

// interface Video {
//   key: string;
//   url: string;
// }

// const allImages = [
//   image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
//   image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
//   image21, image22, image23, image24, image25, image26, image27, image28, image29, image30, image31
// ];

// const providedVideos = [
//   { key: "PTS+Introduction+Quantum+Mechanical+Model.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/PTS+Introduction+Quantum+Mechanical+Model.mp4" },
//   { key: "Capacitor.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Capacitor.mp4" },
//   { key: "Divya+Bio.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Divya+Bio.mp4" },
//   { key: "PTS+_+HUP.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/PTS+_+HUP.mp4" },
//   { key: "Basics+Of+Bond+Formation.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Basics+Of+Bond+Formation.mp4" },
//   { key: "SN+Reactions+PTS.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/SN+Reactions+PTS.mp4" },
//   { key: "Solutions+3.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4" }
// ];

// const SubjectTopic: React.FC<SubjectTopicProps> = ({
//   selectedSubjectId,
//   isDarkMode,
// }) => {
//   const history = useHistory();
//   const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);

  
//   const [visibleChapters, setVisibleChapters] = useState<number>(2); 
//   const [loadingMore, setLoadingMore] = useState<boolean>(false);
//   const [videos, ] = useState<Video[]>(providedVideos); 
//   const [videoLoading, ] = useState<boolean>(false); 
//   const [videoError, ] = useState<string | null>(null);
//   const [scrollPositions, setScrollPositions] = useState<{[key: string]: number}>({});
//   const [topicImages, setTopicImages] = useState<{[key: string]: string}>({});
//   const [topicVideos, setTopicVideos] = useState<{[key: string]: string}>({});
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [, setHoveredRow] = useState<number | null>(null);
//   const [showMenu, setShowMenu] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [hoveredContainerSide, setHoveredContainerSide] = useState<{
//     index: number;
//     side: "left" | "right" | null;
//   }>({ index: -1, side: null });
//   const [hoveredArrow, setHoveredArrow] = useState<{
//     index: number;
//     side: "left" | "right" | null;
//   }>({ index: -1, side: null });
//   const [, setPlayingVideos] = useState<{[key: string]: boolean}>({});
//   const [videoProgress, setVideoProgress] = useState<{[key: string]: number}>({});
//   const [videoTimes, setVideoTimes] = useState<{[key: string]: {current: string, total: string}}>({});

//   const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
//   const autoScrollIntervals = useRef<(number | null)[]>([]);
//   // const observerRef = useRef<IntersectionObserver | null>(null);
//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const getStableImage = useCallback((chapterIndex: number, topicIndex: number) => {
//     const key = `${chapterIndex}-${topicIndex}`;
    
//     if (topicImages[key]) {
//       return topicImages[key];
//     }
    
//     const imageIndex = (chapterIndex * 100 + topicIndex) % allImages.length;
//     return allImages[imageIndex];
//   }, [topicImages]);
  
//   const getStableVideo = useCallback((chapterIndex: number, topicIndex: number) => {
//     const key = `${chapterIndex}-${topicIndex}`;
//     if (topicVideos[key]) {
//       return topicVideos[key];
//     }
  
//     if (videos.length === 0) return "";
//     const videoIndex = (chapterIndex * 100 + topicIndex) % videos.length;
//     return videos[videoIndex].url;
//   }, [topicVideos, videos]);

//   const getInfiniteTopics = useCallback((topics: any[]) => {
//     return [...topics, ...topics, ...topics];
//   }, []);

//   const startAutoScroll = useCallback((index: number) => {
//     if (autoScrollIntervals.current[index]) return;
    
//     autoScrollIntervals.current[index] = window.setInterval(() => {
//       const container = scrollRefs.current[index];
//       if (!container) return;
      
//       const cardWidth = container.querySelector(".card-item")?.clientWidth || 300;
//       const gap = 24;
//       const scrollAmount = (cardWidth + gap) * 3;
//       const maxScrollLeft = container.scrollWidth - container.clientWidth;
//       const currentPosition = scrollPositions[`${index}`] || 0;
      
//       let newPosition = currentPosition + scrollAmount;
      
//       if (newPosition >= maxScrollLeft) {
//         // Stop at the end instead of looping back
//         newPosition = maxScrollLeft;
//         stopAutoScroll(index);
//       }
      
//       container.scrollTo({
//         left: newPosition,
//         behavior: 'smooth'
//       });
      
//       setScrollPositions(prev => ({
//         ...prev,
//         [`${index}`]: newPosition
//       }));
//     }, 3000);
//   }, [scrollPositions]);

//   const stopAutoScroll = useCallback((index: number) => {
//     if (autoScrollIntervals.current[index]) {
//       clearInterval(autoScrollIntervals.current[index]!);
//       autoScrollIntervals.current[index] = null;
//     }
//   }, []);

//   const scrollCards = useCallback((index: number, direction: "left" | "right") => {
//     const container = scrollRefs.current[index];
//     if (!container) return;

//     const cardWidth = container.querySelector(".card-item")?.clientWidth || 300;
//     const gap = 24;
//     const scrollAmount = (cardWidth + gap) * 3;
//     const maxScrollLeft = container.scrollWidth - container.clientWidth;
//     const currentPosition = scrollPositions[`${index}`] || 0;

//     let newPosition;
    
//     if (direction === "right") {
//       newPosition = currentPosition + scrollAmount;
      
//       // Don't loop back, stop at the end
//       if (newPosition >= maxScrollLeft) {
//         newPosition = maxScrollLeft;
//       }
//     } else {
//       newPosition = currentPosition - scrollAmount;
      
//       // Don't loop back, stop at the beginning
//       if (newPosition <= 0) {
//         newPosition = 0;
//       }
//     }

//     container.scrollTo({
//       left: newPosition,
//       behavior: 'smooth'
//     });

//     setScrollPositions(prev => ({
//       ...prev,
//       [`${index}`]: newPosition
//     }));
//   }, [scrollPositions]);

//   const handleRowMouseEnter = useCallback((index: number) => {
//     setHoveredRow(index);
//     stopAutoScroll(index);
//   }, [stopAutoScroll]);

//   const handleRowMouseLeave = useCallback((index: number) => {
//     setHoveredRow(null);
//     setHoveredContainerSide({ index: -1, side: null });
//     setHoveredArrow({ index: -1, side: null });
//     startAutoScroll(index);
//   }, [startAutoScroll]);

//   const handleContainerHover = useCallback((index: number, e: React.MouseEvent) => {
//     if (isMobile) return;
    
//     const container = e.currentTarget;
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const width = rect.width;
    
//     if (x < width * 0.2) {
//       setHoveredContainerSide({ index, side: "left" });
//     } 
//     else if (x > width * 0.8) {
//       setHoveredContainerSide({ index, side: "right" });
//     } else {
//       setHoveredContainerSide({ index: -1, side: null });
//     }
//   }, [isMobile]);

//   const handleArrowHover = useCallback((index: number, side: "left" | "right") => {
//     setHoveredArrow({ index, side });
//   }, []);

//   const handleArrowLeave = useCallback(() => {
//     setHoveredArrow({ index: -1, side: null });
//   }, []);

//   const handleMenuToggle = useCallback((cardId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowMenu(showMenu === cardId ? null : cardId);
//   }, [showMenu]);

//   const handleMenuOption = useCallback((option: string, chapter: any, topic: any) => {
//     setShowMenu(null);
//     switch (option) {
//       case "watch":
//         handlePlay(chapter, topic);
//         break;
//       case "bookmark":
//         break;
//       case "share":
//         break;
//     }
//   }, []);

//   const handlePlay = useCallback((chapter: any, topic: any) => {
//     const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
//     const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";
//     const chapterIndex = subject?.chapters.findIndex(c => c.chapterId === chapter.chapterId) || 0;
//     const topicIndex = chapter.topics.findIndex((t: any) => t.name === topic.name);
//     const videoUrl = getStableVideo(chapterIndex, topicIndex);

//     history.push({
//       pathname: `/course/${chapter.chapterName.replace(/\s+/g, "-")}/chapter-${chapterNumber}`,
//       state: {
//         subjectName: chapter.subjectName,
//         courseName: chapter.chapterName,
//         courseId: chapter.chapterId,
//         topicName: topic.name,
//         duration: topic.duration,
//         videoUrl: videoUrl, 
//       },
//     });
//   }, [history, subject, getStableVideo]);
  
//   const handleCardHover = useCallback((uniqueId: string, chapterIndex: number) => {
//     setHoveredCard(uniqueId);
//     setHoveredRow(chapterIndex);
//     stopAutoScroll(chapterIndex);
  
//     setPlayingVideos(prev => ({
//       ...prev,
//       [uniqueId]: true
//     }));
//   }, [stopAutoScroll]);

//   const handleCardLeave = useCallback((uniqueId: string, chapterIndex: number) => {
//     setHoveredCard(null);
//     startAutoScroll(chapterIndex);
  
//     setPlayingVideos(prev => ({
//       ...prev,
//       [uniqueId]: false
//     }));
//   }, [startAutoScroll]);
  
//   const handleTimeUpdate = useCallback((uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
//     const video = e.target as HTMLVideoElement;
//     const progress = (video.currentTime / video.duration) * 100;
    
//     setVideoProgress(prev => ({
//       ...prev,
//       [uniqueId]: progress
//     }));
    
//     setVideoTimes(prev => ({
//       ...prev,
//       [uniqueId]: {
//         current: formatTime(video.currentTime),
//         total: formatTime(video.duration)
//       }
//     }));
//   }, [formatTime]);
  
//   const handleLoadedMetadata = useCallback((uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
//     const video = e.target as HTMLVideoElement;
//     setVideoTimes(prev => ({
//       ...prev,
//       [uniqueId]: {
//         current: "0:00",
//         total: formatTime(video.duration)
//       }
//     }));
//   }, [formatTime]);
  
//   const handleProgressClick = useCallback((uniqueId: string, e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     const video = videoRefs.current[uniqueId];
//     if (!video) return;
    
//     const progressBar = e.currentTarget;
//     const rect = progressBar.getBoundingClientRect();
//     const clickPosition = (e.clientX - rect.left) / rect.width;
//     const newTime = clickPosition * video.duration;
    
//     video.currentTime = newTime;
    
//     setVideoTimes(prev => ({
//       ...prev,
//       [uniqueId]: {
//         ...prev[uniqueId],
//         current: formatTime(newTime)
//       }
//     }));
//   }, [formatTime]);

//   useEffect(() => {
//     if (!subject) return;
    
//     const newTopicImages: {[key: string]: string} = {};
//     const newTopicVideos: {[key: string]: string} = {};
    
//     subject.chapters.forEach((chapter, chapterIndex) => {
//       chapter.topics.forEach((_, topicIndex) => {
//         const key = `${chapterIndex}-${topicIndex}`;
//         const imageIndex = (chapterIndex * 100 + topicIndex) % allImages.length;
//         newTopicImages[key] = allImages[imageIndex];
//         if (videos.length > 0) {
//           const videoIndex = (chapterIndex * 100 + topicIndex) % videos.length;
//           newTopicVideos[key] = videos[videoIndex].url;
//         }
//       });
//     });
    
//     setTopicImages(newTopicImages);
//     setTopicVideos(newTopicVideos);
//   }, [subject, videos]);

//   /*
//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setVideoLoading(true);
//         const res = await fetch("http://localhost:4000/videos");
//         if (!res.ok) throw new Error("Network response was not ok");
//         const data: VideosResponse = await res.json();
//         setVideos(data.videos);
//       } catch (err: any) {
//         console.error(err);
//         setVideoError(err.message || "Something went wrong");
//         const videoData = {
//           videos: [
//             {
//               key: "Basics Of Bond Formation.mp4",
//               url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Basics%20Of%20Bond%20Formation.mp4"
//             },
//             {
//               key: "Capacitor.mp4",
//               url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Capacitor.mp4"
//             },
//             {
//               key: "Divya Bio.mp4",
//               url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Divya%20Bio.mp4"
//             }
//           ]
//         };
//         setVideos(videoData.videos);
//       } finally {
//         setVideoLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);
//   */

//   useEffect(() => {
//     if (!subject) return;
    
//     setVisibleChapters(2);
//     setLoadingMore(false);
//     const newPositions: {[key: string]: number} = {};
//     subject.chapters.forEach((_, index) => {
//       newPositions[`${index}`] = 0;
//     });
//     setScrollPositions(newPositions);
//   }, [selectedSubjectId, subject]);

//   useEffect(() => {
//     const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   useEffect(() => {
//     if (!loadMoreRef.current || !subject) return;
    
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && !loadingMore && visibleChapters < subject.chapters.length) {
//         setLoadingMore(true);
  
//         setTimeout(() => {
//           setVisibleChapters((prev) =>
//             Math.min(prev + 2, subject.chapters.length)
//           );
//           setLoadingMore(false);
//         }, 1000);
//       }
//     });

//     observer.observe(loadMoreRef.current);
    
//     return () => {
//       if (loadMoreRef.current) {
//         observer.unobserve(loadMoreRef.current);
//       }
//     };
//   }, [subject, loadingMore, visibleChapters]);

//   useEffect(() => {
//     for (let i = 0; i < visibleChapters; i++) {
//       startAutoScroll(i);
//     }

//     return () => {
//       autoScrollIntervals.current.forEach((interval) => {
//         if (interval) clearInterval(interval);
//       });
//     };
//   }, [visibleChapters, startAutoScroll]);

//   // Now the early return can happen after all hooks
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
//       className={`px-2 py-8 relative bottom-20 md:bottom-0 ${
//         isDarkMode ? "bg-transparent text-white" : "bg-white text-black"
//       }`}
//     >
//       <h2 className="text-3xl font-semibold mb-4">{subject.name} Recorded Lectures</h2>

//       {videoError && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
//           <p className="font-bold">Warning</p>
//           <p>{videoError}. Using sample videos instead.</p>
//         </div>
//       )}

//       <div className="mb-5">
//         {subject.chapters.slice(0, visibleChapters).map((chapter, chapterIndex) => (
//           <div
//             key={chapter.chapterId}
//             className="mb-8 relative"
//             onMouseEnter={() => handleRowMouseEnter(chapterIndex)}
//             onMouseLeave={() => handleRowMouseLeave(chapterIndex)}
//           >
//             <h3 className="text-xl mb-4">
//               Chapter {chapterIndex + 1}: {chapter.chapterName}
//             </h3>

//             <div 
//               className="relative"
//               onMouseMove={(e) => handleContainerHover(chapterIndex, e)}
//               onMouseLeave={() => setHoveredContainerSide({ index: -1, side: null })}
//             >
//               {!isMobile && (
//                 <>
//                   <div className={`absolute left-0 top-0 h-full w-1/5 flex items-center justify-start z-10 pointer-events-none`}>
//                     <button
//                       onClick={() => scrollCards(chapterIndex, "left")}
//                       onMouseEnter={() => handleArrowHover(chapterIndex, "left")}
//                       onMouseLeave={handleArrowLeave}
//                       className={`pointer-events-auto p-2 transition-all duration-200 ${
//                         (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "left") || 
//                         (hoveredArrow.index === chapterIndex && hoveredArrow.side === "left")
//                           ? "opacity-100 scale-110 bg-black/10 rounded-full h-full flex items-center"
//                           : "opacity-0"
//                       }`}
//                     >
//                       <FaChevronLeft size={20} />
//                     </button>
//                   </div>
                  
//                   <div className={`absolute right-0 top-0 h-full w-1/5 flex items-center justify-end z-10 pointer-events-none`}>
//                     <button
//                       onClick={() => scrollCards(chapterIndex, "right")}
//                       onMouseEnter={() => handleArrowHover(chapterIndex, "right")}
//                       onMouseLeave={handleArrowLeave}
//                       className={`pointer-events-auto p-2 transition-all duration-200 ${
//                         (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "right") || 
//                         (hoveredArrow.index === chapterIndex && hoveredArrow.side === "right")
//                           ? "opacity-100 scale-110 bg-black/10 rounded-full h-full flex items-center"
//                           : "opacity-0"
//                       }`}
//                     >
//                       <FaChevronRight size={20} />
//                     </button>
//                   </div>
//                 </>
//               )}

//               <div
//                 ref={(el) => {
//                   scrollRefs.current[chapterIndex] = el;
//                 }}
//                 className={`flex gap-6 py-2 ${
//                   isMobile
//                     ? "overflow-x-auto overflow-y-hidden scrollbar-hide"
//                     : "overflow-x-hidden overflow-y-hidden"
//                 }`}
//               >
//                 {getInfiniteTopics(chapter.topics).map((topic, topicIndex) => {
//                   const uniqueId = `${chapterIndex}-${topicIndex}`;
//                   const isHovered = hoveredCard === uniqueId;
//                   const isMenuOpen = showMenu === uniqueId;
//                   const topicImage = getStableImage(chapterIndex, topicIndex % chapter.topics.length);
//                   const videoUrl = getStableVideo(chapterIndex, topicIndex % chapter.topics.length);
//                   const progress = videoProgress[uniqueId] || 0;
//                   const videoTime = videoTimes[uniqueId] || {current: "0:00", total: "0:00"};

//                   return (
//                     <div
//                       key={uniqueId}
//                       className="card-item flex-shrink-0 w-64 relative transition-transform duration-300 hover:scale-105"
//                       onMouseEnter={() => handleCardHover(uniqueId, chapterIndex)}
//                       onMouseLeave={() => handleCardLeave(uniqueId, chapterIndex)}
//                       onClick={() => handlePlay(chapter, topic)}
//                     >
//                       <div className="relative h-40 w-full rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-left">
//                         {isHovered && videoUrl && !videoLoading ? (
//                           <>
//                             <video
//                               ref={el => {
//                                 if (el) {
//                                   videoRefs.current[uniqueId] = el;
//                                 }
//                               }}
//                               autoPlay
//                               muted
//                               loop
//                               className="absolute inset-0 w-full h-full object-cover"
//                               onTimeUpdate={(e) => handleTimeUpdate(uniqueId, e)}
//                               onLoadedMetadata={(e) => handleLoadedMetadata(uniqueId, e)}
//                             >
//                               <source src={videoUrl} type="video/mp4" />
//                               Your browser does not support the video tag.
//                             </video>
                            
//                             <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                               {videoTime.current} / {videoTime.total}
//                             </div>
                            
//                             <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
//                               <div 
//                                 className="w-full h-1.5 bg-gray-600 rounded-full cursor-pointer"
//                                 onClick={(e) => handleProgressClick(uniqueId, e)}
//                               >
//                                 <div 
//                                   className="h-full bg-red-600 rounded-full transition-all duration-100"
//                                   style={{ width: `${progress}%` }}
//                                 ></div>
//                               </div>
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             <img 
//                               src={topicImage} 
//                               alt={topic.name}
//                               className="absolute inset-0 w-full h-full object-cover"
//                             />
//                             <div className="absolute inset-0 bg-black/20"></div>
                            
//                             <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                               {videoTime.total}
//                             </div>
                            
//                             {videoLoading && (
//                               <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </div>

//                       <div className="mt-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <FaUserCircle className="text-gray-500 mr-2" size={18} />
//                             <h4 className="font-semibold text-base">{topic.name}</h4>
//                           </div>
//                           <div className="relative">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleMenuToggle(uniqueId, e);
//                               }}
//                               className={`p-1 rounded-full transition-colors ${
//                                 isDarkMode
//                                   ? "hover:bg-gray-700 text-gray-300"
//                                   : "hover:bg-gray-200 text-gray-600"
//                               }`}
//                             >
//                               <FaEllipsisV size={14} />
//                             </button>

//                             {isMenuOpen && (
//                               <div
//                                 className={`absolute bottom-full right-0 mb-1 w-32 rounded-lg shadow-lg border z-30 ${
//                                   isDarkMode
//                                     ? "bg-gray-800 border-gray-600"
//                                     : "bg-white border-gray-200"
//                                 }`}
//                               >
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleMenuOption("watch", chapter, topic);
//                                   }}
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-t-lg"
//                                 >
//                                   Watch Now
//                                 </button>
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleMenuOption("bookmark", chapter, topic);
//                                   }}
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80"
//                                 >
//                                   Bookmark
//                                 </button>
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleMenuOption("share", chapter, topic);
//                                   }}
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-b-lg"
//                                 >
//                                   Share
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         <div className=" justify-between mt-2">
//                           <h1 className="text-sm opacity-70">
//                             pts
//                           </h1>
//                           <span className="text-sm opacity-70">
//                             6 days ago .  6k Views
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {visibleChapters < subject.chapters.length && (
//         <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
//           {loadingMore ? (
//             <div className="flex flex-col items-center">
//               <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
//               <p className="text-sm opacity-70">Loading more chapters...</p>
//             </div>
//           ) : (
//             <p className="text-sm opacity-70">Scroll down to load more chapters</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubjectTopic;

















import React, { useRef, useState, useEffect, useCallback,  } from "react";
import { subjectsData } from "./data/subject";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaUserCircle,
  FaLock
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
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
import { useAuth } from "../../auth/AuthContext";

interface SubjectTopicProps {
  selectedSubjectId: number | null;
  isDarkMode: boolean;
}

interface Video {
  key: string;
  url: string;
}

const allImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30, image31
];

const providedVideos = [
  { key: "PTS+Introduction+Quantum+Mechanical+Model.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/PTS+Introduction+Quantum+Mechanical+Model.mp4" },
  { key: "Capacitor.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Capacitor.mp4" },
  { key: "Divya+Bio.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Divya+Bio.mp4" },
  { key: "PTS+_+HUP.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/PTS+_+HUP.mp4" },
  { key: "Basics+Of+Bond+Formation.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Basics+Of+Bond+Formation.mp4" },
  { key: "SN+Reactions+PTS.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/SN+Reactions+PTS.mp4" },
  { key: "Solutions+3.mp4", url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Solutions+3.mp4" }
];

const SubjectTopic: React.FC<SubjectTopicProps> = ({
  selectedSubjectId,
  isDarkMode,
}) => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);

  
  const [visibleChapters, setVisibleChapters] = useState<number>(2); 
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [videos, ] = useState<Video[]>(providedVideos); 
  const [videoLoading, ] = useState<boolean>(false); 
  const [videoError, ] = useState<string | null>(null);
  const [scrollPositions, setScrollPositions] = useState<{[key: string]: number}>({});
  const [topicImages, setTopicImages] = useState<{[key: string]: string}>({});
  const [topicVideos, setTopicVideos] = useState<{[key: string]: string}>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [, setHoveredRow] = useState<number | null>(null);
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
  const [, setPlayingVideos] = useState<{[key: string]: boolean}>({});
  const [videoProgress, setVideoProgress] = useState<{[key: string]: number}>({});
  const [videoTimes, setVideoTimes] = useState<{[key: string]: {current: string, total: string}}>({});
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const autoScrollIntervals = useRef<(number | null)[]>([]);
  // const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getStableImage = useCallback((chapterIndex: number, topicIndex: number) => {
    const key = `${chapterIndex}-${topicIndex}`;
    
    if (topicImages[key]) {
      return topicImages[key];
    }
    
    const imageIndex = (chapterIndex * 100 + topicIndex) % allImages.length;
    return allImages[imageIndex];
  }, [topicImages]);
  
  const getStableVideo = useCallback((chapterIndex: number, topicIndex: number) => {
    const key = `${chapterIndex}-${topicIndex}`;
    if (topicVideos[key]) {
      return topicVideos[key];
    }
  
    if (videos.length === 0) return "";
    const videoIndex = (chapterIndex * 100 + topicIndex) % videos.length;
    return videos[videoIndex].url;
  }, [topicVideos, videos]);

  const getInfiniteTopics = useCallback((topics: any[]) => {
    return [...topics, ...topics, ...topics];
  }, []);

  const startAutoScroll = useCallback((index: number) => {
    if (autoScrollIntervals.current[index]) return;
    
    autoScrollIntervals.current[index] = window.setInterval(() => {
      const container = scrollRefs.current[index];
      if (!container) return;
      
      const cardWidth = container.querySelector(".card-item")?.clientWidth || 300;
      const gap = 24;
      const scrollAmount = (cardWidth + gap) * 3;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const currentPosition = scrollPositions[`${index}`] || 0;
      
      let newPosition = currentPosition + scrollAmount;
      
      if (newPosition >= maxScrollLeft) {
        newPosition = maxScrollLeft;
        stopAutoScroll(index);
      }
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPositions(prev => ({
        ...prev,
        [`${index}`]: newPosition
      }));
    }, 3000);
  }, [scrollPositions]);

  const stopAutoScroll = useCallback((index: number) => {
    if (autoScrollIntervals.current[index]) {
      clearInterval(autoScrollIntervals.current[index]!);
      autoScrollIntervals.current[index] = null;
    }
  }, []);

  const scrollCards = useCallback((index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth = container.querySelector(".card-item")?.clientWidth || 300;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 3;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentPosition = scrollPositions[`${index}`] || 0;

    let newPosition;
    
    if (direction === "right") {
      newPosition = currentPosition + scrollAmount;
      if (newPosition >= maxScrollLeft) {
        newPosition = maxScrollLeft;
      }
    } else {
      newPosition = currentPosition - scrollAmount;
      if (newPosition <= 0) {
        newPosition = 0;
      }
    }

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    setScrollPositions(prev => ({
      ...prev,
      [`${index}`]: newPosition
    }));
  }, [scrollPositions]);

  const handleRowMouseEnter = useCallback((index: number) => {
    setHoveredRow(index);
    stopAutoScroll(index);
  }, [stopAutoScroll]);

  const handleRowMouseLeave = useCallback((index: number) => {
    setHoveredRow(null);
    setHoveredContainerSide({ index: -1, side: null });
    setHoveredArrow({ index: -1, side: null });
    startAutoScroll(index);
  }, [startAutoScroll]);

  const handleContainerHover = useCallback((index: number, e: React.MouseEvent) => {
    if (isMobile) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width * 0.2) {
      setHoveredContainerSide({ index, side: "left" });
    } 
    else if (x > width * 0.8) {
      setHoveredContainerSide({ index, side: "right" });
    } else {
      setHoveredContainerSide({ index: -1, side: null });
    }
  }, [isMobile]);

  const handleArrowHover = useCallback((index: number, side: "left" | "right") => {
    setHoveredArrow({ index, side });
  }, []);

  const handleArrowLeave = useCallback(() => {
    setHoveredArrow({ index: -1, side: null });
  }, []);

  const handleMenuToggle = useCallback((cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(showMenu === cardId ? null : cardId);
  }, [showMenu]);

  const handleMenuOption = useCallback((option: string, chapter: any, topic: any) => {
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
  }, []);

  const handlePlay = useCallback((chapter: any, topic: any) => {
    const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";
    const chapterIndex = subject?.chapters.findIndex(c => c.chapterId === chapter.chapterId) || 0;
    const topicIndex = chapter.topics.findIndex((t: any) => t.name === topic.name);
    const videoUrl = getStableVideo(chapterIndex, topicIndex);

    history.push({
      pathname: `/course/${chapter.chapterName.replace(/\s+/g, "-")}/chapter-${chapterNumber}`,
      state: {
        subjectName: chapter.subjectName,
        courseName: chapter.chapterName,
        courseId: chapter.chapterId,
        topicName: topic.name,
        duration: topic.duration,
        videoUrl: videoUrl, 
      },
    });
  }, [history, subject, getStableVideo]);
  
  const handleCardHover = useCallback((uniqueId: string, chapterIndex: number) => {
    setHoveredCard(uniqueId);
    setHoveredRow(chapterIndex);
    stopAutoScroll(chapterIndex);
  
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: true
    }));
  }, [stopAutoScroll]);

  const handleCardLeave = useCallback((uniqueId: string, chapterIndex: number) => {
    setHoveredCard(null);
    startAutoScroll(chapterIndex);
  
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: false
    }));
  }, [startAutoScroll]);
  
  const handleTimeUpdate = useCallback((uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
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
  }, [formatTime]);
  
  const handleLoadedMetadata = useCallback((uniqueId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setVideoTimes(prev => ({
      ...prev,
      [uniqueId]: {
        current: "0:00",
        total: formatTime(video.duration)
      }
    }));
  }, [formatTime]);
  
  const handleProgressClick = useCallback((uniqueId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRefs.current[uniqueId];
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * video.duration;
    
    video.currentTime = newTime;
    
    setVideoTimes(prev => ({
      ...prev,
      [uniqueId]: {
        ...prev[uniqueId],
        current: formatTime(newTime)
      }
    }));
  }, [formatTime]);


  useEffect(() => {
    if (!subject) return;
    
    const newTopicImages: {[key: string]: string} = {};
    const newTopicVideos: {[key: string]: string} = {};
    
    subject.chapters.forEach((chapter, chapterIndex) => {
      chapter.topics.forEach((_, topicIndex) => {
        const key = `${chapterIndex}-${topicIndex}`;
        const imageIndex = (chapterIndex * 100 + topicIndex) % allImages.length;
        newTopicImages[key] = allImages[imageIndex];
        if (videos.length > 0) {
          const videoIndex = (chapterIndex * 100 + topicIndex) % videos.length;
          newTopicVideos[key] = videos[videoIndex].url;
        }
      });
    });
    
    setTopicImages(newTopicImages);
    setTopicVideos(newTopicVideos);
  }, [subject, videos]);

  useEffect(() => {
    if (!subject) return;
    
    setVisibleChapters(2);
    setLoadingMore(false);
    const newPositions: {[key: string]: number} = {};
    subject.chapters.forEach((_, index) => {
      newPositions[`${index}`] = 0;
    });
    setScrollPositions(newPositions);
  }, [selectedSubjectId, subject]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !subject) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore && visibleChapters < subject.chapters.length) {
        setLoadingMore(true);
  
        setTimeout(() => {
          setVisibleChapters((prev) =>
            Math.min(prev + 2, subject.chapters.length)
          );
          setLoadingMore(false);
        }, 1000);
      }
    });

    observer.observe(loadMoreRef.current);
    
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [subject, loadingMore, visibleChapters]);

  useEffect(() => {
    for (let i = 0; i < visibleChapters; i++) {
      startAutoScroll(i);
    }

    return () => {
      autoScrollIntervals.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [visibleChapters, startAutoScroll]);
  if (!subject) {
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

  return (
    <div
      className={`px-2 py-8 relative bottom-20 md:bottom-0 ${
        isDarkMode ? "bg-transparent text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-4">{subject.name} Recorded Lectures</h2>

      {videoError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Warning</p>
          <p>{videoError}. Using sample videos instead.</p>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold mb-4">Login Required</h3>
            <p className="mb-6">Please log in to access all topics and features.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowLoginPrompt(false)}
                className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Cancel
              </button>
              <button 
                onClick={() => history.push("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-5">
        {subject.chapters.slice(0, visibleChapters).map((chapter, chapterIndex) => (
          <div
            key={chapter.chapterId}
            className="mb-8 relative"
            onMouseEnter={() => !isMobile && handleRowMouseEnter(chapterIndex)}
            onMouseLeave={() => !isMobile && handleRowMouseLeave(chapterIndex)}
          >
            <h3 className="text-xl mb-4">
              Chapter {chapterIndex + 1}: {chapter.chapterName}
            </h3>

            <div 
              className="relative"
              onMouseMove={!isMobile ? (e) => handleContainerHover(chapterIndex, e) : undefined}
              onMouseLeave={() => !isMobile && setHoveredContainerSide({ index: -1, side: null })}
            >
              {!isMobile && (
                <>
                  <div className={`absolute left-0 top-0 h-full w-1/5 flex items-center justify-start z-10 pointer-events-none`}>
                    <button
                      onClick={() => scrollCards(chapterIndex, "left")}
                      onMouseEnter={() => handleArrowHover(chapterIndex, "left")}
                      onMouseLeave={handleArrowLeave}
                      className={`pointer-events-auto p-2 transition-all duration-200 ${
                        (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "left") || 
                        (hoveredArrow.index === chapterIndex && hoveredArrow.side === "left")
                          ? "opacity-100 scale-110 bg-black/10 rounded-full h-full flex items-center"
                          : "opacity-0"
                      }`}
                    >
                      <FaChevronLeft size={20} />
                    </button>
                  </div>
                  
                  <div className={`absolute right-0 top-0 h-full w-1/5 flex items-center justify-end z-10 pointer-events-none`}>
                    <button
                      onClick={() => scrollCards(chapterIndex, "right")}
                      onMouseEnter={() => handleArrowHover(chapterIndex, "right")}
                      onMouseLeave={handleArrowLeave}
                      className={`pointer-events-auto p-2 transition-all duration-200 ${
                        (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "right") || 
                        (hoveredArrow.index === chapterIndex && hoveredArrow.side === "right")
                          ? "opacity-100 scale-110 bg-black/10 rounded-full h-full flex items-center"
                          : "opacity-0"
                      }`}
                    >
                      <FaChevronRight size={20} />
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
                    : "overflow-x-hidden overflow-y-hidden"
                }`}
              >
                {getInfiniteTopics(chapter.topics).map((topic, topicIndex) => {
                  const uniqueId = `${chapterIndex}-${topicIndex}`;
                  const isHovered = hoveredCard === uniqueId;
                  const isMenuOpen = showMenu === uniqueId;
                  const topicImage = getStableImage(chapterIndex, topicIndex % chapter.topics.length);
                  const videoUrl = getStableVideo(chapterIndex, topicIndex % chapter.topics.length);
                  const progress = videoProgress[uniqueId] || 0;
                  const videoTime = videoTimes[uniqueId] || {current: "0:00", total: "0:00"};
                  const isLocked = !isLoggedIn && topicIndex >= 1;

                  return (
                    <div
                      key={uniqueId}
                      className={`card-item flex-shrink-0 w-64 relative transition-transform duration-300 ${isLocked ? "" : "hover:scale-105"}`}
                      onMouseEnter={() => !isMobile && !isLocked && handleCardHover(uniqueId, chapterIndex)}
                      onMouseLeave={() => !isMobile && !isLocked && handleCardLeave(uniqueId, chapterIndex)}
                      onClick={() => !isLocked && handlePlay(chapter, topic)}
                    >
                      <div className="relative h-40 w-full rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-left">
                        {isLocked ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                            <FaLock size={32} className="mb-2" />
                            <p className="text-sm">Login to unlock</p>
                          </div>
                        ) : isHovered && videoUrl && !videoLoading ? (
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
                            
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {videoTime.current} / {videoTime.total}
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                              <div 
                                className="w-full h-1.5 bg-gray-600 rounded-full cursor-pointer"
                                onClick={(e) => handleProgressClick(uniqueId, e)}
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
                              src={topicImage} 
                              alt={topic.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                            
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {videoTime.total}
                            </div>
                            
                            {videoLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaUserCircle className="text-gray-500 mr-2 relative top-5" size={20} />
                            <h4 className="font-semibold text-base">{topic.name}</h4>
                          </div>
                          {!isLocked && (
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
                          )}
                        </div>
                        <div className="justify   r-between mt-2">
                          <h1 className="text-sm relative left-7 opacity-70">
                            pts
                          </h1>
                          <span className="text-sm opacity-70">
                            6 days ago .  6k Views
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleChapters < subject.chapters.length && (
        <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
          {loadingMore ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm opacity-70">Loading more chapters...</p>
            </div>
          ) : (
            <p className="text-sm opacity-70">Scroll down to load more chapters</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectTopic;