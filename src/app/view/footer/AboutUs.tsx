import React from "react";

interface AboutUsProps {
  isDarkMode: boolean;
}

const AboutUs: React.FC<AboutUsProps> = ({ isDarkMode }) => {
  // Helper function to conditionally apply dark mode classes
  const darkModeClass = (lightClass: string, darkClass: string) => 
    isDarkMode ? darkClass : lightClass;

  return (
    <div
      className={`min-h-screen flex flex-col px-6 py-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#091E37] text-gray-200" : "bg-white text-gray-900"
      }`}
    >      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-4 ${darkModeClass("text-gray-900", "text-white")}`}>
            About Us
          </h1>
          <div className={`h-1 w-24 mx-auto mb-6 ${darkModeClass("bg-indigo-600", "bg-indigo-400")}`}></div>
          <p className={`text-xl ${darkModeClass("text-gray-600", "text-gray-400")}`}>
            How & Why Classes
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-16">
          <p className={`mb-6 text-lg leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
            At <span className="font-semibold">How & Why Classes</span>, we believe that the future of education lies
            not in rote learning, but in curiosity-driven discovery, powered by
            cutting-edge technology. We are not just another edtech company—we are
            building an <span className="font-semibold">ecosystem</span> that merges <span className="font-semibold">artificial intelligence,
            immersive 3D learning, indigenous research, and high-performance
            infrastructure</span> to empower Bharat's learners like never before.
          </p>
          <p className={`text-lg leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
            Our journey started with a simple question: <span className="italic">"What if education could be
            as engaging and intuitive as the way we learn in real life?"</span><br/>
            The answer became our mission: to <span className="font-semibold">transform rudimentary classroom
            teaching into an interactive, dynamic, and deeply impactful
            experience.</span>
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold mb-4 text-center ${darkModeClass("text-indigo-800", "text-indigo-400")}`}>
            What Makes Us Different
          </h2>
          <div className={`h-1 w-20 mx-auto mb-12 ${darkModeClass("bg-indigo-600", "bg-indigo-400")}`}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Two-Teacher Live Model */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                Two-Teacher Live Model
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                Real-time interaction where master lecturers guide students, while junior lecturers resolve doubts instantly.
              </p>
            </div>

            {/* Immersive 3D & AI Integration */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                Immersive 3D & AI Integration
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                The world's first <span className="font-semibold">subject-wise 3D model library</span>, seamlessly embedded into live classes—making concepts in Physics, Chemistry, and Mathematics come alive.
              </p>
            </div>

            {/* OTT-Style Learning Platform */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                OTT-Style Learning Platform
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                A hybrid ecosystem—<span className="font-semibold">free, ad-supported live streams</span> + <span className="font-semibold">layered subscriptions</span>, ensuring accessibility for all while offering premium personalised learning.
              </p>
            </div>

            {/* AI-Powered Test Portal */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                AI-Powered Test Portal
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                Smart assessment engine that generates <span className="font-semibold">revision roadmaps</span> after analyzing results—personalised to each learner's weaknesses and strengths.
              </p>
            </div>

            {/* Multilingual Dubbing Pipeline */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                Multilingual Dubbing Pipeline
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                Real-time AI-driven voice dubbing across <span className="font-semibold">India's languages and dialects</span>, breaking linguistic barriers in education.
              </p>
            </div>

            {/* Next-Gen Infrastructure */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                Next-Gen Infrastructure
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                In-house <span className="font-semibold">data servers and CDN</span> capable of powering HD & 4K live streams with adaptive AI, reducing costs and ensuring massive scalability.
              </p>
            </div>

            {/* Tech Beyond Education */}
            <div className={`p-8 rounded-lg shadow-md ${darkModeClass("bg-blue-50", "bg-blue-900")}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
                Tech Beyond Education
              </h3>
              <p className={`leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
                Our innovations extend beyond classrooms—<span className="font-semibold">video conferencing platforms rivaling Zoom & Meet, AI collaboration tools, and edtech SaaS solutions</span> for schools, colleges, and coaching institutes.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className={`p-12 rounded-lg shadow-md mb-16 ${darkModeClass("bg-indigo-50", "bg-indigo-900")}`}>
          <h2 className={`text-3xl font-bold mb-6 text-center ${darkModeClass("text-indigo-800", "text-indigo-200")}`}>
            Our Vision
          </h2>
          <div className={`h-1 w-16 mx-auto mb-8 ${darkModeClass("bg-indigo-600", "bg-indigo-400")}`}></div>
          <p className={`text-center text-xl leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
            To <span className="font-semibold">democratize world-class education</span> for every student in Bharat,
            while simultaneously creating a platform for <span className="font-semibold">next-generation skill
            development</span> in fields like <span className="font-semibold">chip design, robotics, automation,
            applied sciences, and artificial intelligence</span>.
          </p>
          <p className={`text-center text-xl mt-8 leading-relaxed ${darkModeClass("text-gray-700", "text-gray-300")}`}>
            We are not just preparing students for exams—we are <span className="font-semibold">preparing a
            generation to innovate, build, and lead</span>.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <p className={`text-2xl italic ${darkModeClass("text-gray-700", "text-gray-300")}`}>
            <span className="font-semibold">How & Why Classes</span> is where education meets innovation, and where
            Bharat's youth find the power to change the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;