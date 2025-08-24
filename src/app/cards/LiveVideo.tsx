import React, { useRef, useEffect, useState } from "react";
// import { FaCog, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaCog, FaVolumeMute, FaVolumeUp, FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface PlayProps {
  isDarkMode: boolean;
}

interface ClassInfo {
  id: number;
  subject: string;
  topic: string;
  time: string;
  date: string;
  description: string;
  image: string;
  videoUrl: string;
}

// Define the type for location state
interface LocationState {
  classInfo: ClassInfo;
}

const LiveVideo: React.FC<PlayProps> = ({ isDarkMode }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [liveEnded, setLiveEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get the class info passed from the previous page
  useEffect(() => {
    // Type assertion for location.state
    const state = location.state as LocationState;
    if (state && state.classInfo) {
      setClassInfo(state.classInfo);
    }
  }, [location.state]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !classInfo) return;

    // Reset error state
    setError(null);

    // For MP4 files, use native HTML5 video
    video.src = classInfo.videoUrl;
    
    video.addEventListener('loadedmetadata', () => {
      video.play().catch((err) => {
        console.error("Error playing video:", err);
        setError("Failed to play video. Please try again.");
      });
    });
    
    video.addEventListener('playing', () => {
      setIsPlaying(true);
    });
    
    video.addEventListener('pause', () => {
      setIsPlaying(false);
    });
    
    video.addEventListener('ended', () => {
      setLiveEnded(true);
      setIsPlaying(false);
    });
    
    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
      setError("Failed to load video. The video may be unavailable or in an unsupported format.");
    });

    // Function to force fullscreen
    const goFullscreen = () => {
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    };

    // Enter fullscreen on mount
    goFullscreen();

    // Prevent exiting fullscreen
    const preventExitFullscreen = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "F11") {
        e.preventDefault();
      }
    };

    // If user exits fullscreen, go back in immediately
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        goFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", preventExitFullscreen);

    // Check fullscreen state periodically in case other methods are used to exit
    const fullscreenCheckInterval = setInterval(goFullscreen, 1000);

    return () => {
      video.removeEventListener("ended", () => setLiveEnded(true));
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", preventExitFullscreen);
      clearInterval(fullscreenCheckInterval);
    };
  }, [classInfo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => console.error("Play error:", err));
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (!classInfo) {
    return (
      <div className={`fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}>
        <div className="text-center">
          <p>Loading class information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}>
        <div className="text-center p-4">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-screen z-50 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Class info overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`p-3 rounded-lg backdrop-blur-sm ${
          isDarkMode ? "bg-black/50 text-white" : "bg-white/80 text-black"
        }`}>
          <h2 className="text-lg font-bold">{classInfo.subject}</h2>
          <p className="text-sm">{classInfo.topic}</p>
          {/* <p className="text-xs opacity-80 mt-1">{classInfo.time} • {classInfo.date}</p> */}
        </div>
      </div>

      <video
        ref={videoRef}
        className="w-full h-full object-contain sm:object-cover"
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
      />

      {/* Play/Pause overlay button */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-black/50 rounded-full p-4">
            <FaPlay className="text-white text-4xl" />
          </div>
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:gap-3">
        {/* Live indicator */}
        <div
          className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm ${
            isDarkMode ? "bg-black/50" : "bg-white/20"
          }`}
        >
          <div
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              liveEnded ? "bg-gray-400" : "bg-red-600 animate-pulse"
            }`}
          ></div>
          <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            {liveEnded ? "ENDED" : "LIVE"}
          </span>
        </div>

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-80 ${
            isDarkMode ? "bg-black/50 text-white" : "bg-white/20 text-black"
          }`}
        >
          {isMuted ? <FaVolumeMute className="text-sm sm:text-base" /> : <FaVolumeUp className="text-sm sm:text-base" />}
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-80 ${
            isDarkMode ? "bg-black/50 text-white" : "bg-white/20 text-black"
          }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default LiveVideo;