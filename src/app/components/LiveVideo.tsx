import React, { useRef, useEffect, useState } from "react";
import * as Hls from "hls.js";
import { FaExpand, FaCog, FaCompress } from "react-icons/fa";
import Recommendation from "../cards/SampleRandomCards";

interface PlayProps {
  isDarkMode: boolean;
}

const Play: React.FC<PlayProps> = ({ isDarkMode }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls.default | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [levels, setLevels] = useState<Hls.Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [liveEnded, setLiveEnded] = useState(false);

  const masterUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = masterUrl;
      video.play().catch(() => {});
    } else {
      const hls = new Hls.default();
      hls.attachMedia(video);
      hls.loadSource(masterUrl);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });

      hlsRef.current = hls;
    }

    const handleEnded = () => setLiveEnded(true);
    video.addEventListener("ended", handleEnded);

    return () => {
      hlsRef.current?.destroy();
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const changeQuality = (level: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = level;
    setCurrentLevel(level);
    setShowQualityOptions(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Video Section */}
      <div
        ref={containerRef}
        className={`relative w-full h-screen flex items-center justify-center ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          controls={false}
        />

        {/* LIVE / ENDED badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              isDarkMode ? "bg-black/50" : "bg-white/20"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                liveEnded ? "bg-gray-400 animate-none" : "bg-red-600 animate-pulse"
              }`}
            ></div>
            <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
              {liveEnded ? "LIVE ENDED" : "LIVE"}
            </span>
          </div>

          {/* Quality selector */}
          <div className="relative">
            <button
              onClick={() => setShowQualityOptions(prev => !prev)}
              className={`px-3 py-1 rounded-full flex items-center gap-2 hover:opacity-80 ${
                isDarkMode ? "bg-black/50 text-white" : "bg-white/20 text-black"
              }`}
            >
              <FaCog /> {currentLevel === -1 ? "AUTO" : `${levels[currentLevel]?.height}p`}
            </button>

            {showQualityOptions && (
              <div
                className={`absolute bottom-10 left-0 rounded-md shadow-lg py-1 w-32 z-10 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                <button
                  onClick={() => changeQuality(-1)}
                  className={`w-full text-left px-3 py-2 text-sm hover:opacity-80 ${
                    currentLevel === -1
                      ? isDarkMode
                        ? "bg-gray-600 text-white"
                        : "bg-gray-400 text-black"
                      : isDarkMode
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  AUTO
                </button>
                {levels.map((level, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeQuality(idx)}
                    className={`w-full text-left px-3 py-2 text-sm hover:opacity-80 ${
                      currentLevel === idx
                        ? isDarkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-400 text-black"
                        : isDarkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {level.height}p
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className={`px-3 py-1 rounded-full flex items-center gap-2 hover:opacity-80 ${
              isDarkMode ? "bg-black/50 text-white" : "bg-white/20 text-black"
            }`}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} w-full`}>
        <Recommendation isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Play;
