import React, { useRef, useState, useEffect, useCallback } from "react";
import { subjectsData } from "./data/subject";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaUserCircle,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
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

interface VideosResponse {
  videos: Video[];
}

const SubjectTopic: React.FC<SubjectTopicProps> = ({
  selectedSubjectId,
  isDarkMode,
}) => {
  const history = useHistory();
  const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);

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

  const [visibleChapters, setVisibleChapters] = useState<number>(2); 
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [scrollPositions, setScrollPositions] = useState<{[key: string]: number}>({});

  // Fetch videos from API
  useEffect(() => {
    async function fetchVideos() {
      try {
        setVideoLoading(true);
        const res = await fetch("http://localhost:4000/videos");
        if (!res.ok) throw new Error("Network response was not ok");
        const data: VideosResponse = await res.json();
        setVideos(data.videos);
      } catch (err: any) {
        console.error(err);
        setVideoError(err.message || "Something went wrong");
        
        // Fallback to sample videos if API fails
        const videoData = {
          videos: [
            {
              key: "Basics Of Bond Formation.mp4",
              url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Basics%20Of%20Bond%20Formation.mp4"
            },
            {
              key: "Capacitor.mp4",
              url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Capacitor.mp4"
            },
            {
              key: "Divya Bio.mp4",
              url: "https://hawc-sample-video.s3.ap-south-1.amazonaws.com/Divya%20Bio.mp4"
            }
          ]
        };
        setVideos(videoData.videos);
      } finally {
        setVideoLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const getRandomVideoUrl = useCallback(() => {
    if (videos.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex].url;
  }, [videos]);

  useEffect(() => {
    setVisibleChapters(2);
    setLoadingMore(false);
    const newPositions: {[key: string]: number} = {};
    subject.chapters.forEach((_, index) => {
      newPositions[`${index}`] = 0;
    });
    setScrollPositions(newPositions);
  }, [selectedSubjectId, subject]);

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

  const getSubjectImage = (subjectName: string) => {
    const lowerCaseName = subjectName.toLowerCase();
    if (lowerCaseName.includes("biology")) return biologyImage;
    if (lowerCaseName.includes("chemistry")) return chemistryImage;
    if (lowerCaseName.includes("math")) return mathsImage;
    if (lowerCaseName.includes("physics")) return physicsImage;
    if (lowerCaseName.includes("zoology")) return zoologyImage;
    return biologyImage; 
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getInfiniteTopics = useCallback((topics: any[]) => {
    return [...topics, ...topics, ...topics];
  }, []);

  const scrollCards = (index: number, direction: "left" | "right") => {
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
        newPosition = newPosition - (container.scrollWidth / 3);
      }
    } else {
      newPosition = currentPosition - scrollAmount;
      
      if (newPosition <= 0) {
        newPosition = newPosition + (container.scrollWidth / 3);
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
  };

  const startAutoScroll = (index: number) => {
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
        newPosition = newPosition - (container.scrollWidth / 3);
        
        container.scrollLeft = newPosition;
        setScrollPositions(prev => ({
          ...prev,
          [`${index}`]: newPosition
        }));
      } else {
        container.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
        
        setScrollPositions(prev => ({
          ...prev,
          [`${index}`]: newPosition
        }));
      }
    }, 3000);
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
    
    if (x < width * 0.2) {
      setHoveredContainerSide({ index, side: "left" });
    } 
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
  
  const handleCardHover = (uniqueId: string, chapterIndex: number) => {
    setHoveredCard(uniqueId);
    setHoveredRow(chapterIndex);
    stopAutoScroll(chapterIndex);
  
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: true
    }));
  };

  const handleCardLeave = (uniqueId: string, chapterIndex: number) => {
    setHoveredCard(null);
    startAutoScroll(chapterIndex);
  
    setPlayingVideos(prev => ({
      ...prev,
      [uniqueId]: false
    }));
  };
  
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
  
  const handleProgressClick = (uniqueId: string, e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
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

      observerRef.current.observe(node);
    },
    [subject.chapters.length, loadingMore, visibleChapters]
  );

  useEffect(() => {
    for (let i = 0; i < visibleChapters; i++) {
      startAutoScroll(i);
    }

    return () => {
      autoScrollIntervals.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [visibleChapters]);

  return (
    <div
      className={`px-2 md:mt-10 relative bottom-20 md:bottom-0 ${
        isDarkMode ? "bg-[#091E37] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl mb-6">Recorded Video</h2>

      {videoError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Warning</p>
          <p>{videoError}. Using sample videos instead.</p>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl mb-6">{subject.name}</h2>

        {subject.chapters.slice(0, visibleChapters).map((chapter, chapterIndex) => (
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
                  <div className={`absolute left-0 top-0 h-full w-1/5 flex items-center justify-start z-10 pointer-events-none`}>
                    <button
                      onClick={() => scrollCards(chapterIndex, "left")}
                      onMouseEnter={() => handleArrowHover(chapterIndex, "left")}
                      onMouseLeave={handleArrowLeave}
                      className={`pointer-events-auto p-2 transition-all duration-200 ${
                        (hoveredContainerSide.index === chapterIndex && hoveredContainerSide.side === "left") || 
                        (hoveredArrow.index === chapterIndex && hoveredArrow.side === "left")
                          ? "opacity-100 scale-110 bg-black/20 rounded-full"
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
                          ? "opacity-100 scale-110 bg-black/20 rounded-full"
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
                  const subjectImage = getSubjectImage(subject.name);
                  const progress = videoProgress[uniqueId] || 0;
                  const videoUrl = getRandomVideoUrl();
                  const videoTime = videoTimes[uniqueId] || {current: "0:00", total: "0:00"};

                  return (
                    <div
                      key={uniqueId}
                      className="card-item flex-shrink-0 w-80 relative transition-transform duration-300 hover:scale-105"
                      onMouseEnter={() => handleCardHover(uniqueId, chapterIndex)}
                      onMouseLeave={() => handleCardLeave(uniqueId, chapterIndex)}
                      onClick={() => handlePlay(chapter, topic)}
                    >
                      <div className="relative h-52 w-full rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-left">
                        {isHovered && videoUrl && !videoLoading ? (
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
                              src={subjectImage} 
                              alt={subject.name}
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
                            <FaUserCircle className="text-gray-500 mr-2" size={18} />
                            <h4 className="font-semibold text-base">{topic.name}</h4>
                          </div>
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