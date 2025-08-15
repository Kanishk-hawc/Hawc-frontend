// import React, { useRef, useEffect, useState } from "react";
// import { subjectsData } from "./data/subject";
// import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

// interface SubjectTopicProps {
//   selectedSubjectId: number | null;
//   isDarkMode: boolean;
// }

// const SubjectTopic: React.FC<SubjectTopicProps> = ({
//   selectedSubjectId,
//   isDarkMode,
// }) => {
//   const subject = subjectsData.find((subj) => subj.id === selectedSubjectId);
//   const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const autoScrollIntervals = useRef<(number | null)[]>([]);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);

//   if (!subject) {
//     return (
//       <div
//         className={`p-6 flex justify-center items-center ${
//           isDarkMode ? "bg-black text-white" : "bg-white text-black"
//         }`}
//       >
//         <p>No subject selected</p>
//       </div>
//     );
//   }

//   const scrollCards = (index: number, direction: "left" | "right") => {
//     const container = scrollRefs.current[index];
//     if (!container) return;

//     const cardWidth = container.querySelector(".flex-shrink-0")?.clientWidth || 256;
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
//     const container = scrollRefs.current[index];
//     if (!container) return;

//     const cardWidth = container.querySelector(".flex-shrink-0")?.clientWidth || 256;
//     const gap = 24;
//     const totalScroll = (cardWidth + gap) * 3;

//     autoScrollIntervals.current[index] = window.setInterval(() => {
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

//   useEffect(() => {
//     subject.chapters.forEach((_, index) => startAutoScroll(index));
//     return () => {
//       subject.chapters.forEach((_, index) => stopAutoScroll(index));
//     };
//   }, [selectedSubjectId]);

//   return (
//     <div className={`p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
//       <h2 className="text-3xl font-bold mb-6">{subject.name}</h2>

//       {subject.chapters.map((chapter, chapterIndex) => (
//         <div key={chapter.chapterId} className="mb-8 relative">
//           <h3 className="text-xl font-semibold mb-4">
//             Chapter {chapterIndex + 1}: {chapter.chapterName}
//           </h3>

//           {/* Scroll container wrapper */}
//           <div className="relative">
//             {/* Left Arrow */}
//             <button
//               onClick={() => scrollCards(chapterIndex, "left")}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//             >
//               <FaChevronLeft />
//             </button>

//             {/* Right Arrow */}
//             <button
//               onClick={() => scrollCards(chapterIndex, "right")}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//             >
//               <FaChevronRight />
//             </button>

//             <div
//               ref={(el: HTMLDivElement | null) => {
//                 scrollRefs.current[chapterIndex] = el;
//               }}
//               className="flex gap-6 overflow-x-hidden overflow-y-hidden py-2 scroll-smooth"
//             >
//               {[...chapter.topics, ...chapter.topics].map((topic, topicIndex) => {
//                 const uniqueId = `${chapterIndex}-${topicIndex}`;
//                 const isHovered = hoveredCard === uniqueId;

//                 return (
//                   <div
//                     key={uniqueId}
//                     className={`flex-shrink-0 w-64 relative transition-all duration-300 ${
//                       isHovered ? "scale-110 z-10" : "scale-100 z-0"
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
//                           <div className="absolute bottom-0 left-0 p-3 w-full">
//                             <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
//                               {topic.name}
//                             </h4>
//                             <span className={`text-sm opacity-80 ${isDarkMode ? "text-white" : "text-black"}`}>
//                               {topic.duration}
//                             </span>
//                           </div>
//                           <button className="absolute bottom-3 right-3 bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors">
//                             <FaPlay />
//                           </button>
//                         </>
//                       )}
//                       <span className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`}>
//                         Photo
//                       </span>
//                     </div>

//                     {!isHovered && (
//                       <div className="mt-2 flex justify-between">
//                         <h4 className="font-semibold">{topic.name}</h4>
//                         <span className="text-sm opacity-70">{topic.duration}</span>
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






// import React, { useRef, useState } from "react";
// import { subjectsData } from "./data/subject";
// import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
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
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);

//   if (!subject) {
//     return (
//       <div
//         className={`p-6 flex justify-center items-center ${
//           isDarkMode ? "bg-black text-white" : "bg-white text-black"
//         }`}
//       >
//         <p>No subject selected</p>
//       </div>
//     );
//   }

//   const scrollCards = (index: number, direction: "left" | "right") => {
//     const container = scrollRefs.current[index];
//     if (!container) return;

//     const cardWidth = container.querySelector(".flex-shrink-0")?.clientWidth || 256;
//     const gap = 24;
//     const totalScroll = (cardWidth + gap) * 3; // scroll 3 cards
//     const maxScrollLeft = container.scrollWidth - container.clientWidth;

//     if (direction === "right") {
//       if (container.scrollLeft + totalScroll >= maxScrollLeft) {
//         container.scrollTo({ left: 0, behavior: "smooth" }); // circular back to start
//       } else {
//         container.scrollBy({ left: totalScroll, behavior: "smooth" });
//       }
//     } else {
//       if (container.scrollLeft - totalScroll <= 0) {
//         container.scrollTo({ left: maxScrollLeft, behavior: "smooth" }); // circular to end
//       } else {
//         container.scrollBy({ left: -totalScroll, behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <div className={`p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
//       <h2 className="text-3xl mb-6">{subject.name}</h2>

//       {subject.chapters.map((chapter, chapterIndex) => (
//         <div key={chapter.chapterId} className="mb-8 relative">
//           <h3 className="text-xl mb-4">
//             Chapter {chapterIndex + 1}: {chapter.chapterName}
//           </h3>

//           <div className="relative">
//             <button
//               onClick={() => scrollCards(chapterIndex, "left")}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//             >
//               <FaChevronLeft />
//             </button>
//             <button
//               onClick={() => scrollCards(chapterIndex, "right")}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//             >
//               <FaChevronRight />
//             </button>

//             <div
//               ref={(el: HTMLDivElement | null) => {
//                 scrollRefs.current[chapterIndex] = el;
//               }}
//               className="flex gap-6 overflow-x-hidden overflow-y-hidden py-2 scroll-smooth"
//             >
//               {chapter.topics.map((topic, topicIndex) => {
//                 const uniqueId = `${chapterIndex}-${topicIndex}`;
//                 const isHovered = hoveredCard === uniqueId;

//                 return (
//                   <div
//                     key={uniqueId}
//                     className={`flex-shrink-0 w-64 relative transition-all duration-300 ${
//                       isHovered ? "scale-110 z-10" : "scale-100 z-0"
//                     }`}
//                     onMouseEnter={() => setHoveredCard(uniqueId)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     <div className="relative h-40 rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//                       {isHovered && (
//                         <>
//                           <div className="absolute bottom-0 left-0 p-3 w-full">
//                             <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
//                               {topic.name}
//                             </h4>
//                             <span className={`text-sm opacity-80 ${isDarkMode ? "text-white" : "text-black"}`}>
//                               {topic.duration}
//                             </span>
//                           </div>
//                           <button onClick={() =>history.push("/coures") }
//                            className="absolute bottom-3 right-3 bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors">
//                             <FaPlay />
//                           </button>
//                         </>
//                       )}
//                       {!isHovered && (
//                         <span className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`}>
//                           Photo
//                         </span>
//                       )}
//                     </div>

//                     {!isHovered && (
//                       <div className="mt-2 flex justify-between">
//                         <h4 className="font-semibold">{topic.name}</h4>
//                         <span className="text-sm opacity-70">{topic.duration}</span>
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






import React, { useRef, useState } from "react";
import { subjectsData } from "./data/subject";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const scrollCards = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth = container.querySelector(".flex-shrink-0")?.clientWidth || 256;
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

  // Extract numeric part from chapterId for URL
  const handlePlay = (chapter: any, topic: any) => {
    const chapterNumberMatch = chapter.chapterId.toString().match(/\d+/);
    const chapterNumber = chapterNumberMatch ? chapterNumberMatch[0] : "1";

    history.push({
      pathname: `/course/${subject.name.replace(/\s+/g, "-")}/chapter-${chapterNumber}`,
      state: {
        subjectName: subject.name,
        courseName: chapter.chapterName,
        courseId: chapter.chapterId,
        topicName: topic.name,
        duration: topic.duration,
      },
    });
  };

  return (
    <div className={`p-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2 className="text-3xl mb-6">{subject.name}</h2>

      {subject.chapters.map((chapter, chapterIndex) => (
        <div key={chapter.chapterId} className="mb-8 relative">
          <h3 className="text-xl mb-4">
            Chapter {chapterIndex + 1}: {chapter.chapterName}
          </h3>

          <div className="relative">
            <button
              onClick={() => scrollCards(chapterIndex, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scrollCards(chapterIndex, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronRight />
            </button>

            <div
              ref={(el: HTMLDivElement | null) => {
                scrollRefs.current[chapterIndex] = el;
              }}
              className="flex gap-6 overflow-x-hidden overflow-y-hidden py-2 scroll-smooth"
            >
              {chapter.topics.map((topic, topicIndex) => {
                const uniqueId = `${chapterIndex}-${topicIndex}`;
                const isHovered = hoveredCard === uniqueId;

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
                          <div className="absolute bottom-0 left-0 p-3 w-full">
                            <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                              {topic.name}
                            </h4>
                            <span className={`text-sm opacity-80 ${isDarkMode ? "text-white" : "text-black"}`}>
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
                        <span className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`}>
                          Photo
                        </span>
                      )}
                    </div>

                    {!isHovered && (
                      <div className="mt-2 flex justify-between">
                        <h4 className="font-semibold">{topic.name}</h4>
                        <span className="text-sm opacity-70">{topic.duration}</span>
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
