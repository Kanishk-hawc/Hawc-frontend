"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
import { DyteMeeting, DyteUiProvider } from "@dytesdk/react-ui-kit";
import { FaPlay, FaPause } from "react-icons/fa";
// import loadingGif from "./assets/loading.gif";
import logo from "./assets/logo.png";


interface LiveClassData {
  meetingId: string;
  token: string;
  className: string;
  shortName: string;
  description: string;
  duration: number;
  startDate: string;
  endDate: string;
}

const DyteMeetingPage: React.FC = () => {
  const [meeting, setMeeting] = useState<any>(null);
  const [dyteClient, initDyteClient] = useDyteClient();
  const [loading, setLoading] = useState(true);
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [, setWs] = useState<WebSocket | null>(null);
  const [classInfo, setClassInfo] = useState<LiveClassData | null>(null);
  useEffect(() => {
    const storedClass = localStorage.getItem('currentLiveClass');
    if (storedClass) {
      const classData = JSON.parse(storedClass);
      setClassInfo(classData);
      setMeetingId(classData.meetingId);
    }
  }, []);
  useEffect(() => {
    const initializeMeeting = async () => {
      if (!classInfo) return;

      try {
        const instance = await initDyteClient({
          authToken: classInfo.token,
          defaults: { audio: true, video: false },
        });

        if (instance) {
          await instance.join();
          setMeeting(instance);
        }
      } catch (err) {
        console.error("Error initializing meeting:", err);
      } finally {
        setLoading(false);
      }
    };

    if (classInfo) {
      initializeMeeting();
    } else {
      setLoading(false);
    }
  }, [classInfo, initDyteClient]);
  useEffect(() => {
    if (!meetingId) return;
    const socket = new WebSocket("ws://localhost:3001");
    setWs(socket);

    socket.onopen = () => {
      console.log("✅ WS connected");
      socket.send(JSON.stringify({ 
        type: "join_notification", 
        meetingId, 
        userRole: "student" 
      }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 WS message received:", data);

        if ((data.type === "PAUSE_TOGGLE" || data.type === "PAUSE_STATE") && data.meetingId === meetingId) {
          setIsPaused(data.isPaused);
          console.log(`🔄 Pause state updated from WS → ${data.isPaused ? "⏸️ Paused" : "▶️ Resumed"}`);
        }
      } catch (err) {
        console.error("WS message error:", err);
      }
    };

    socket.onclose = () => console.log("❌ WS disconnected");
    return () => socket.close();
  }, [meetingId]);

  const togglePause = async () => {
    try {
      if (!meetingId) return;
      if (isPaused) {
        console.log("▶️ Sending resume request...");
        await axios.post("http://localhost:3001/api/resume", { meetingId, name: "teacher" });
      } else {
        console.log("⏸️ Sending pause request...");
        await axios.post("http://localhost:3001/api/pause", { meetingId, name: "teacher" });
      }
    } catch (err) {
      console.error("Pause toggle error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!meeting || !classInfo) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#141414]">
      <div className="text-center p-8 max-w-[90%] w-[400px]">
        <div className="relative mx-auto mb-8 w-[150px] h-[150px]">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-10 border-t-10 border-blue-400 border-opacity-20 animate-spinLoader"></div>
          <div className="absolute top-1/2 left-1/2 w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <img src={logo} alt="Loader Logo" className="w-[80%] h-[80%] object-contain" />
          </div>
        </div>

        <div className="text-blue-400 font-medium mt-5 tracking-widest animate-pulse">
          LOADING
        </div>
      </div>
    </div>
  );
};

  return (
    <DyteProvider value={meeting}>
      <DyteUiProvider>
        <div className="flex flex-col bg-black min-h-screen">
          <div className="bg-gray-900 text-white p-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{classInfo.shortName}</p>
              </div>
              <div className="mt-2 md:mt-0 flex">
                <p className="text-sm self-center mr-4">
                  Duration: {classInfo.duration} mins
                </p>
                <div className="flex 1">
                  <button
                  onClick={togglePause}
                  className={`px-6 py-3 rounded-lg font-medium shadow flex items-center ${
                    isPaused ? "bg-green-500 text-white" : "bg-yellow-400 text-black"
                  }`}
                >
                  {isPaused ? (
                    <FaPlay className="mr-2" />
                  ) : (
                    <FaPause className="mr-2" />
                  )}
                  {isPaused ? "Resume" : "Pause"}
                </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className=" mx-auto">
              <div className="flex justify-center mb-6">
              </div>
              <div className="h-[600px] w-full border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
                <DyteMeeting mode="fill" meeting={dyteClient} showSetupScreen />
              </div>
            </div>
          </div>
        </div>
      </DyteUiProvider>
    </DyteProvider>
  );
};

export default DyteMeetingPage;