import React, { useRef, useState } from "react";
import { subjectsData } from "../components/data/subject";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

// Import the images
import biologyImage from "../assets/images/biology.jpg";
import chemistryImage from "../assets/images/chemistry.jpg";
import mathsImage from "../assets/images/maths.jpg";
import physicsImage from "../assets/images/physics.jpg";
import zoologyImage from "../assets/images/zoology.jpg";

interface Topic {
  name: string;
  duration: string;
  subject: string;
}

interface Section {
  title: string;
  topics: Topic[];
}

// Create an array of all available images
const allImages = [biologyImage, chemistryImage, mathsImage, physicsImage, zoologyImage];

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

// Function to get a random image
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};

const Recommendation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [sections] = useState<Section[]>(() => [
    { title: "Recommendation", topics: getRandomTopics(12) },
    { title: "For You", topics: getRandomTopics(12) },
    { title: "Learn New", topics: getRandomTopics(12) },
  ]);

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Generate random images for each card
  const [cardImages] = useState<Record<string, string>>(() => {
    const images: Record<string, string> = {};
    sections.forEach((section, sectionIndex) => {
      section.topics.forEach((_, topicIndex) => {
        const uniqueId = `${sectionIndex}-${topicIndex}`;
        images[uniqueId] = getRandomImage();
      });
    });
    return images;
  });

  const scrollCards = (index: number, direction: "left" | "right") => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const cardWidth = window.innerWidth < 768 ? 180 : 256; // Smaller cards on mobile
    const gap = window.innerWidth < 768 ? 16 : 24; // Smaller gap on mobile
    const scrollAmount = (cardWidth + gap) * (window.innerWidth < 768 ? 1 : 3); // Scroll fewer cards on mobile
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const remainingScroll = maxScrollLeft - container.scrollLeft;
        const scrollBy = Math.min(scrollAmount, remainingScroll);
        container.scrollBy({ left: scrollBy, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`space-y-8 md:space-y-12 ${isDarkMode ? "bg-transparent text-white" : "bg-white text-black"}`}>
      {sections.map((section, sectionIndex) => (
        <div key={section.title}>
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">{section.title}</h2>
          <div className="relative">
            {/* Arrows - hidden on mobile */}
            <button
              onClick={() => scrollCards(sectionIndex, "left")}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => scrollCards(sectionIndex, "right")}
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChevronRight />
            </button>

            <div
              ref={(el) => {
                scrollRefs.current[sectionIndex] = el;
              }}
              className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden py-2 scroll-smooth px-2 md:px-12 md:[&::-webkit-scrollbar]:hidden"
            >
              {section.topics.map((topic, topicIndex) => {
                const uniqueId = `${sectionIndex}-${topicIndex}`;
                const isHovered = hoveredCard === uniqueId;
                const cardImage = cardImages[uniqueId];

                return (
                  <div
                    key={uniqueId}
                    className={`flex-shrink-0 w-40 md:w-64 relative transition-all duration-300 ${
                      isHovered ? "md:scale-110 md:z-10" : "scale-100 z-0"
                    }`}
                    onMouseEnter={() => setHoveredCard(uniqueId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div 
                      className="relative h-32 md:h-40 rounded-lg shadow-md overflow-hidden flex items-center justify-center"
                      style={{ 
                        backgroundImage: `url(${cardImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Dark overlay for better text visibility */}
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      
                      {isHovered && (
                        <>
                          <div className="absolute bottom-0 left-0 p-2 md:p-3 w-full z-10">
                            <h4 className="font-semibold text-sm md:text-base text-white">
                              {topic.name}
                            </h4>
                            <span className="text-xs md:text-sm opacity-80 text-white">
                              {topic.duration}
                            </span>
                            <p className="text-xs opacity-70 text-gray-200">
                              {topic.subject}
                            </p>
                          </div>
                          <button className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-red-600 p-2 md:p-3 rounded-full text-white hover:bg-red-700 transition-colors z-10">
                            <FaPlay className="text-xs md:text-base" />
                          </button>
                        </>
                      )}
                      {!isHovered && (
                        <div className="flex flex-col items-center p-2 z-10">
                          <h4 className="font-semibold text-sm md:text-base text-white text-center line-clamp-2">
                            {/* {topic.name} */}
                          </h4>
                          <p className="text-xs mt-1 text-gray-200">
                            {/* {topic.subject} */}
                          </p>
                        </div>
                      )}
                    </div>

                    {!isHovered && (
                      <div className="mt-2 flex flex-col gap-1">
                        <h4 className="font-semibold text-sm md:text-base line-clamp-1">{topic.name}</h4>
                        <span className="text-xs md:text-sm opacity-70">{topic.duration}</span>
                        <p className={`text-xs opacity-70 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
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