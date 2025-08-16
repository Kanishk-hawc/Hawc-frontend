import React, { useRef, useState, useEffect } from "react";
import * as Hls from "hls.js";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaCog,
  FaClosedCaptioning,
} from "react-icons/fa";

interface VideoPlayerProps {
  url?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls.default | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState<Hls.Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [showCC, setShowCC] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    containerRef.current?.requestFullscreen().catch(() => {});

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
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
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  const changeQuality = (level: number) => {
    if (!hlsRef.current) return;
    hlsRef.current.currentLevel = level;
    setCurrentLevel(level);
    setShowQualityOptions(false);
  };

  const toggleCC = () => {
    const video = videoRef.current;
    if (!video) return;
    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = showCC ? "disabled" : "showing";
    }
    setShowCC((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={false}
        autoPlay
        muted={false}
        crossOrigin="anonymous"
      >
        <track
          src="https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      </video>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 p-2 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => skipTime(-10)} className="text-white">
            <FaBackward />
          </button>
          <button onClick={togglePlay} className="text-white">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => skipTime(10)} className="text-white">
            <FaForward />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleCC} className="text-white">
            <FaClosedCaptioning />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowQualityOptions((prev) => !prev)}
              className="text-white px-2 py-1 border border-white rounded"
            >
              {currentLevel === -1
                ? "AUTO"
                : `${levels[currentLevel]?.height}p`}
              <FaCog className="inline ml-1" />
            </button>

            {showQualityOptions && (
              <div className="absolute bottom-8 right-0 bg-gray-800 rounded-md py-1 w-24 z-10">
                <button
                  onClick={() => changeQuality(-1)}
                  className={`w-full text-left px-2 py-1 text-white hover:bg-gray-700 text-sm ${
                    currentLevel === -1 ? "bg-gray-600" : ""
                  }`}
                >
                  AUTO
                </button>
                {levels.map((level, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeQuality(idx)}
                    className={`w-full text-left px-2 py-1 text-white hover:bg-gray-700 text-sm ${
                      currentLevel === idx ? "bg-gray-600" : ""
                    }`}
                  >
                    {level.height}p
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
