import React, { useRef, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  FaShareAlt,
  FaDownload,
  FaPlay,
  FaTimes,
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import Hls from "hls.js";
import Recommendation from "../cards/SampleRandomCards";
import biology from "../assets/biology.png"; // Import your default image

interface CourseState {
  subjectName: string;
  courseName: string;
  courseId: string | number;
  topicName: string;
  duration: string;
  chapterNumber?: number;
  thumbnail?: string; // Optional thumbnail URL
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
  const [showVideo, setShowVideo] = useState(false);
  const [videoTimer, setVideoTimer] = useState<NodeJS.Timeout | null>(null);
  const state = location.state;
  const currentUrl = window.location.href;

  useEffect(() => {
    // Set a timer to show video after 3 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    setVideoTimer(timer);

    // Initialize video when showVideo becomes true
    if (showVideo) {
      const video = videoRef.current;
      if (!video) return;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (videoTimer) clearTimeout(videoTimer);
    };
  }, [showVideo]);

  const navigateToVideoPlayer = () => {
    history.push("/play", { ...state });
  };

  const shareOnSocialMedia = (platform: string) => {
    const shareText = `Check out this course: ${
      state?.topicName || "Amazing course"
    }`;
    let url = "";

    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + currentUrl
        )}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "instagram":
        url = `instagram://`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
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
    <div className="relative w-full" style={{ height: "85vh" }}>
      {/* Background image that shows for first 3 seconds */}
      {!showVideo && (
        <div
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            backgroundImage: `url(${state.thumbnail || biology})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Video element that shows after 3 seconds */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            outline: "none",
            border: "none",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 text-white max-w-2xl space-y-2">
        <p className="text-xs opacity-80">{state.subjectName}</p>
        <h1 className="text-3xl md:text-5xl font-bold">{state.topicName}</h1>
        <p className="text-sm opacity-80">Chapter {state.chapterNumber || 1}</p>
        <p className="text-sm opacity-80">Time: {state.duration}</p>
        <p className="mt-2 text-sm opacity-80">
          Sample description: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Phasellus nec iaculis mauris.
        </p>
        <div className="mt-4 flex items-center gap-4">
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
      {sharePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Share this course</h3>
              <button
                onClick={() => setSharePopup(false)}
                className="text-gray-400 hover:text-white"
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
                  className="flex-1 text-sm p-2 rounded-l bg-gray-800 border border-gray-700"
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
                  onClick={() => shareOnSocialMedia("whatsapp")}
                  className="text-green-500 hover:text-green-400 text-2xl"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </button>
                <button
                  onClick={() => shareOnSocialMedia("facebook")}
                  className="text-blue-500 hover:text-blue-400 text-2xl"
                  title="Share on Facebook"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={() => shareOnSocialMedia("telegram")}
                  className="text-blue-400 hover:text-blue-300 text-2xl"
                  title="Share on Telegram"
                >
                  <FaTelegram />
                </button>
                <button
                  onClick={() => shareOnSocialMedia("instagram")}
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
      <div className="mt-6">
        <Recommendation isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default CourseClass;
