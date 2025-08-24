import React, { useRef, useState, useEffect } from "react";
import * as Hls from "hls.js";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaCog,
  FaClosedCaptioning,
  FaExpand,
} from "react-icons/fa";

interface VideoPlayerProps {
  url?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls.default | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState<Hls.Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [showCC, setShowCC] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);

  // Detect orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // Auto-hide controls when video plays
  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true);
    }
    return () => {
      if (controlsTimeout) window.clearTimeout(controlsTimeout);
    };
  }, [isPlaying]);

  // Initialize HLS player
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("play", () => setIsPlaying(true));
      video.addEventListener("pause", () => setIsPlaying(false));
      video.play().catch(() => {});
    } else {
      const hls = new Hls.default();
      hls.attachMedia(video);
      hls.loadSource(url);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        video.play().catch(() => {});
        setIsPlaying(true);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });

      hlsRef.current = hls;
    }

    return () => {
      hlsRef.current?.destroy();
    };
  }, [url]);

  // --- Controls Functions ---
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetControlsTimeout();
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
    resetControlsTimeout();
  };

  const changeQuality = (level: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = level;
    setCurrentLevel(level);
    setShowQualityOptions(false);
    resetControlsTimeout();
  };

  const toggleCC = () => {
    const video = videoRef.current;
    if (!video) return;
    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = showCC ? "disabled" : "showing";
    }
    setShowCC((prev) => !prev);
    resetControlsTimeout();
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
      resetControlsTimeout();
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeout) window.clearTimeout(controlsTimeout);
    const timeout = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  const handleVideoClick = () => {
    if (showControls) {
      setShowControls(false);
      if (controlsTimeout) window.clearTimeout(controlsTimeout);
    } else {
      resetControlsTimeout();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen bg-black z-[9999]" // ensures no header/footer
      onClick={handleVideoClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{
          objectFit: isLandscape || isFullscreen ? "cover" : "contain",
        }}
        autoPlay
        muted={false}
        playsInline
      >
        <track
          src="https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      </video>

      {/* Controls */}
      {showControls && (
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full">
            {/* Left controls */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={togglePlay}
                className="text-white text-lg md:text-2xl"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() => skipTime(-10)}
                className="text-white text-lg md:text-xl"
              >
                <FaBackward />
              </button>
              <button
                onClick={() => skipTime(10)}
                className="text-white text-lg md:text-xl"
              >
                <FaForward />
              </button>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={toggleCC}
                className={`text-white text-lg md:text-xl ${
                  showCC ? "text-blue-400" : ""
                }`}
              >
                <FaClosedCaptioning />
              </button>

              {/* Quality selector */}
              <div className="relative">
                <button
                  onClick={() => setShowQualityOptions((prev) => !prev)}
                  className="text-white px-2 md:px-3 py-1 border border-white rounded text-sm md:text-base flex items-center gap-1"
                >
                  {currentLevel === -1
                    ? "AUTO"
                    : `${levels[currentLevel]?.height}p`}
                  <FaCog />
                </button>

                {showQualityOptions && (
                  <div className="absolute bottom-10 right-0 bg-gray-900 rounded-md py-1 w-20 md:w-24 border border-gray-700">
                    <button
                      onClick={() => changeQuality(-1)}
                      className={`w-full px-3 py-1 text-white hover:bg-gray-700 text-xs md:text-sm ${
                        currentLevel === -1 ? "bg-blue-600" : ""
                      }`}
                    >
                      AUTO
                    </button>
                    {levels.map((level, idx) => (
                      <button
                        key={idx}
                        onClick={() => changeQuality(idx)}
                        className={`w-full px-3 py-1 text-white hover:bg-gray-700 text-xs md:text-sm ${
                          currentLevel === idx ? "bg-blue-600" : ""
                        }`}
                      >
                        {level.height}p
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white text-lg md:text-xl"
              >
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
