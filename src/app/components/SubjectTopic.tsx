import React, { useRef, useState, useEffect } from "react";
import { subjectsData } from "./data/subject";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaEllipsisV,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface SubjectTopicProps {
  selectedSubjectId: number | null;
  isDarkMode: boolean;
}

const SubjectTopic: React.FC<SubjectTopicProps> = ({
  selectedSubjectId,
  isDarkMode,
}) => {
  const history = useHistory();
  const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoScrollIntervals = useRef<(number | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const scrollCards = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth =
      container.querySelector(".flex-shrink-0")?.clientWidth || 256;
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
    if (autoScrollIntervals.current[index]) return; // Prevent multiple intervals

    const container = scrollRefs.current[index];
    if (!container) return;

    autoScrollIntervals.current[index] = window.setInterval(() => {
      const cardWidth =
        container.querySelector(".flex-shrink-0")?.clientWidth || 256;
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
    // Start auto scroll after a short delay
    setTimeout(() => {
      if (hoveredRow !== index) {
        startAutoScroll(index);
      }
    }, 100);
  };

  const handleMenuToggle = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(showMenu === cardId ? null : cardId);
  };

  const handleMenuOption = (option: string, chapter: any, topic: any) => {
    setShowMenu(null);
    console.log(`Selected option: ${option}`, { chapter, topic });
    // Handle different menu options here
    switch (option) {
      case "watch":
        handlePlay(chapter, topic);
        break;
      case "bookmark":
        // Add bookmark logic
        break;
      case "share":
        // Add share logic
        break;
    }
  };

  // Extract numeric part from chapterId for URL
  const handlePlay = (chapter: any, topic: any) => {
    const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";

    history.push({
      pathname: `/course/${subject.name.replace(
        /\s+/g,
        "-"
      )}/chapter-${chapterNumber}`,
      state: {
        subjectName: subject.name,
        courseName: chapter.chapterName,
        courseId: chapter.chapterId,
        topicName: topic.name,
        duration: topic.duration,
      },
    });
  };

  // Initialize auto scroll for all rows when component mounts or subject changes
  useEffect(() => {
    if (!subject) return;

    subject.chapters.forEach((_, index) => {
      setTimeout(() => startAutoScroll(index), 100); // Small delay to ensure refs are set
    });

    return () => {
      subject.chapters.forEach((_, index) => stopAutoScroll(index));
    };
  }, [selectedSubjectId, subject]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!subject) {
    return (
      <div
        className={`p-6 flex justify-center items-center ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <p>No subject selected</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl mb-6">{subject.name}</h2>

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

          <div className="relative">
            {/* Conditional Chevron Buttons - Only show when row is hovered */}
            {hoveredRow === chapterIndex && (
              <>
                <button
                  onClick={() => scrollCards(chapterIndex, "left")}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 opacity-80 hover:opacity-100"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() => scrollCards(chapterIndex, "right")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 opacity-80 hover:opacity-100"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div
              ref={(el: HTMLDivElement | null) => {
                scrollRefs.current[chapterIndex] = el;
              }}
              className="flex gap-6 overflow-x-hidden overflow-y-hidden py-2 scroll-smooth"
            >
              {chapter.topics.map((topic, topicIndex) => {
                const uniqueId = `${chapterIndex}-${topicIndex}`;
                const isHovered = hoveredCard === uniqueId;
                const isMenuOpen = showMenu === uniqueId;

                return (
                  <div
                    key={uniqueId}
                    className={`flex-shrink-0 w-64 relative transition-all duration-300 ${
                      isHovered ? "scale-110 z-10" : "scale-100 z-0"
                    }`}
                    onMouseEnter={() => setHoveredCard(uniqueId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative h-40 rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                      {isHovered && (
                        <>
                          <div className="absolute bottom-0 left-0 p-3 w-full bg-gradient-to-t from-black/60 to-transparent">
                            <h4 className="font-semibold text-white text-sm">
                              {topic.name}
                            </h4>
                            <span className="text-xs text-white/80">
                              {topic.duration}
                            </span>
                          </div>
                          <button
                            onClick={() => handlePlay(chapter, topic)}
                            className="absolute bottom-3 right-3 bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors"
                          >
                            <FaPlay />
                          </button>
                        </>
                      )}
                      {!isHovered && (
                        <span
                          className={`text-gray-500 ${
                            isDarkMode ? "dark:text-gray-400" : ""
                          }`}
                        >
                          Photo
                        </span>
                      )}
                    </div>

                    {!isHovered && (
                      <div className="mt-2">
                        <h4 className="font-semibold text-sm">{topic.name}</h4>
                        <span className="text-xs opacity-70 block">
                          {topic.duration}
                        </span>
                      </div>
                    )}

                    {/* Three Dots Menu - Show on hover */}
                    {isHovered && (
                      <div className="relative flex justify-center mt-2 ml-48">
                        <button
                          onClick={(e) => handleMenuToggle(uniqueId, e)}
                          className={`p-2 rounded-full transition-colors ${
                            isDarkMode
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-200 text-gray-600"
                          }`}
                        >
                          <FaEllipsisV size={12} />
                        </button>

                        {/* Menu Options */}
                        {isMenuOpen && (
                          <div
                            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 rounded-lg shadow-lg border z-30 ${
                              isDarkMode
                                ? "bg-gray-800 border-gray-600"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <button
                              onClick={() =>
                                handleMenuOption("watch", chapter, topic)
                              }
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-t-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-gray-700 text-white"
                                  : "hover:bg-gray-100 text-gray-800"
                              }`}
                            >
                              Watch Now
                            </button>
                            <button
                              onClick={() =>
                                handleMenuOption("bookmark", chapter, topic)
                              }
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 transition-colors ${
                                isDarkMode
                                  ? "hover:bg-gray-700 text-white"
                                  : "hover:bg-gray-100 text-gray-800"
                              }`}
                            >
                              Bookmark
                            </button>
                            <button
                              onClick={() =>
                                handleMenuOption("share", chapter, topic)
                              }
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-80 rounded-b-lg transition-colors ${
                                isDarkMode
                                  ? "hover:bg-gray-700 text-white"
                                  : "hover:bg-gray-100 text-gray-800"
                              }`}
                            >
                              Share
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectTopic;
