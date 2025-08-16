import React, { useRef, useState } from "react";
import { subjectsData } from "../components/data/subject";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

interface Topic {
  name: string;
  duration: string;
  subject: string;
}

interface Section {
  title: string;
  topics: Topic[];
}

const getRandomTopics = (count: number): Topic[] => {
  const allTopics: Topic[] = [];
  subjectsData.forEach((subject) =>
    subject.chapters.forEach((chapter) =>
      chapter.topics.forEach((topic) =>
        allTopics.push({ ...topic, subject: subject.name })
      )
    )
  );

  const shuffled = allTopics.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Recommendation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [sections] = useState<Section[]>(() => [
    { title: "Recommendation", topics: getRandomTopics(12) },
    { title: "For You", topics: getRandomTopics(12) },
    { title: "Learn New", topics: getRandomTopics(12) },
  ]);

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const scrollCards = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth = 256; // Fixed width of each card
    const gap = 24; // Gap between cards
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      // If we're at or near the end, scroll to start
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Calculate how much we can scroll without going past the end
        const remainingScroll = maxScrollLeft - container.scrollLeft;
        const scrollBy = Math.min(scrollAmount, remainingScroll);
        container.scrollBy({ left: scrollBy, behavior: "smooth" });
      }
    } else {
      // If we're at or near the start, scroll to end
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={`p-6 space-y-12 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {sections.map((section, sectionIndex) => (
        <div key={section.title}>
          <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollCards(sectionIndex, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronLeft />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollCards(sectionIndex, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronRight />
            </button>

            <div
              ref={(el) => {
                scrollRefs.current[sectionIndex] = el;
              }}
              className="flex gap-6 overflow-x-hidden overflow-y-hidden py-2 scroll-smooth px-12"
            >
              {section.topics.map((topic, topicIndex) => {
                const uniqueId = `${sectionIndex}-${topicIndex}`;
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
                            <h4
                              className={`font-semibold ${
                                isDarkMode ? "text-white" : "text-black"
                              }`}
                            >
                              {topic.name}
                            </h4>
                            <span
                              className={`text-sm opacity-80 ${
                                isDarkMode ? "text-white" : "text-black"
                              }`}
                            >
                              {topic.duration}
                            </span>
                            <p
                              className={`text-xs opacity-70 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {topic.subject}
                            </p>
                          </div>
                          <button className="absolute bottom-3 right-3 bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-colors">
                            <FaPlay />
                          </button>
                        </>
                      )}
                      {!isHovered && (
                        <div className="flex flex-col items-center">
                          <span
                            className={`text-gray-500 ${
                              isDarkMode ? "dark:text-gray-400" : ""
                            }`}
                          >
                            Photo
                          </span>
                          <p
                            className={`text-xs mt-1 opacity-70 ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {topic.subject}
                          </p>
                        </div>
                      )}
                    </div>

                    {!isHovered && (
                      <div className="mt-2 flex flex-col gap-1">
                        <h4 className="font-semibold">{topic.name}</h4>
                        <span className="text-sm opacity-70">
                          {topic.duration}
                        </span>
                        <p
                          className={`text-xs opacity-70 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {topic.subject}
                        </p>
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

export default Recommendation;
