import React, { useRef, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FaShareAlt, FaDownload, FaPlay, FaTimes, FaWhatsapp, FaFacebook, FaTelegram, FaInstagram, FaHeart, FaClock, FaStar, FaGlobe } from "react-icons/fa";
import Recommendation from "../cards/SampleRandomCards";
import maths from "../assets/images/maths.jpg";

interface CourseState {
  subjectName: string;
  courseName: string;
  courseId: string | number;
  topicName: string;
  duration: string;
  videoUrl: string;
  chapterNumber?: number;
  date?: string;
  rating?: number;
}

interface CourseClassProps {
  isDarkMode: boolean;
}

const CourseClass: React.FC<CourseClassProps> = ({ isDarkMode }) => {
  const location = useLocation<CourseState | undefined>();
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sharePopup, setSharePopup] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const state = location.state;
  const currentUrl = window.location.href;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showImage || !state?.videoUrl) return;
    const video = videoRef.current;
    if (!video) return;

    video.src = state.videoUrl;
    video.play().catch(() => {});
  }, [showImage, state?.videoUrl]);

  const navigateToVideoPlayer = () => {
    history.push("/play", { ...state });
  };

  const shareOnSocialMedia = (platform: string) => {
    const shareText = `Check out this course: ${state?.topicName || 'Amazing course'}`;
    let url = '';
    
    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        url = `instagram://`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!state) {
    return (
      <div className="p-6">
        <p>No course data provided.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => history.push("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-3 flex flex-col">
      {!isMobile && (
        <div className="relative w-full" style={{ height: "85vh" }}>
          {showImage && (
            <img
              src={maths}
              alt="Course Preview"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              style={{ transition: "opacity 0.5s" }}
            />
          )}
          {!showImage && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                outline: 'none',
                border: 'none',
                transition: "opacity 0.5s"
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent rounded-md"></div>

          <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 text-white max-w-2xl space-y-4" style={{ bottom: "100px", left: 30 }}>
            <p className="text-xs opacity-80">{state.subjectName}</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{state.topicName}</h1>
            <p className="text-sm opacity-80">Chapter {state.chapterNumber || 1}</p>
            
            <div className="flex items-center gap-4 text-sm opacity-80 mt-2">
              <div className="flex items-center gap-2">
                <h1 className="mr-3">{state.date || '2011'}</h1>
                <FaClock /> <span>{state.duration}</span>
                <h1 className="ml-3">1.6k views</h1>
              </div>
            </div>

            <h2 className="mt-4 flex items-center gap-2">
              <FaGlobe /> English (US)
            </h2>

            <div className="flex items-center gap-2 mt-2">
              {[...Array(state.rating || 5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>

            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              Sample description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus nec iaculis mauris.
            </p>

            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <button 
                onClick={navigateToVideoPlayer}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                <FaPlay />
                Start Watch
              </button>

              <button 
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <FaHeart className={isWishlisted ? "text-red-500" : "text-white"} />
                Wishlist
              </button>

              <div className="flex items-center gap-2 ml-4 relative">
                <button
                  className="p-2 hover:bg-gray-800 rounded-full"
                  onClick={() => setSharePopup(!sharePopup)}
                >
                  <FaShareAlt size={18} />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full">
                  <FaDownload size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="flex flex-col">
          <div 
            className="w-full h-48 bg-black flex items-center justify-center relative"
            onClick={navigateToVideoPlayer}
          >
            {showImage ? (
              <img
                src={maths}
                alt="Course Preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-contain"
              />
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-2">
                <p className="text-xs text-gray-600 dark:text-gray-400">{state.subjectName}</p>
                <h1 className="text-xl font-bold mt-1 line-clamp-2">{state.topicName}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Chapter {state.chapterNumber || 1}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2"
                >
                  <FaHeart 
                    size={18} 
                    className={isWishlisted ? "text-red-500" : "text-gray-600 dark:text-gray-400"} 
                  />
                </button>
                <button
                  className="p-2"
                  onClick={() => setSharePopup(!sharePopup)}
                >
                  <FaShareAlt size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2">
                  <FaDownload size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 flex-wrap">
              <div className="flex items-center gap-1">
                <FaClock size={12} />
                <span>{state.duration}</span>
              </div>
              <span>•</span>
              <span>{state.date || '2011'}</span>
              <span>•</span>
              <span>1.6k views</span>
            </div>

            <div className="flex items-center gap-1 mt-2">
              {[...Array(state.rating || 5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" size={14} />
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              Sample description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus nec iaculis mauris.
            </p>
          
          </div>
        </div>
      )}

      <div className="flex-grow py-6 md:py-8 relative bottom-20 mt-12 md:mt-0 md:bottom-0">
        <Recommendation isDarkMode={isDarkMode} />
      </div>
      
      {sharePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Share this course</h3>
              <button 
                onClick={() => setSharePopup(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm mb-2">Copy this link:</p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className={`flex-1 text-sm p-2 rounded-l border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r"
                  onClick={() => {
                    navigator.clipboard.writeText(currentUrl);
                    alert("Link copied to clipboard!");
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm mb-3">Share via:</p>
              <div className="flex justify-center space-x-6">
                <button 
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="text-green-500 hover:text-green-400 text-2xl"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </button>
                <button 
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="text-blue-500 hover:text-blue-400 text-2xl"
                  title="Share on Facebook"
                >
                  <FaFacebook />
                </button>
                <button 
                  onClick={() => shareOnSocialMedia('telegram')}
                  className="text-blue-400 hover:text-blue-300 text-2xl"
                  title="Share on Telegram"
                >
                  <FaTelegram />
                </button>
                <button 
                  onClick={() => shareOnSocialMedia('instagram')}
                  className="text-pink-500 hover:text-pink-400 text-2xl"
                  title="Share on Instagram"
                >
                  <FaInstagram />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseClass;