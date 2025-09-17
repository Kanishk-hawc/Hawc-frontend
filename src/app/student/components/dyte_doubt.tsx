"use client";

import React, { useEffect, useState } from "react";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
import { DyteMeeting, DyteUiProvider } from "@dytesdk/react-ui-kit";
import logo from "../assets/logo.png";

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
  const [classInfo, setClassInfo] = useState<LiveClassData | null>(null);
  
  useEffect(() => {
    const storedClass = localStorage.getItem('currentLiveClass');
    if (storedClass) {
      const classData = JSON.parse(storedClass);
      setClassInfo(classData);
      console.log("Meeting ID from localStorage:", classData.meetingId);
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
          
          console.log("Meeting ID after joining:", classInfo.meetingId);
          console.log("Meeting token after joining:", classInfo.token);
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

  if (loading) {
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
  }

  return (
    <DyteProvider value={meeting}>
      <DyteUiProvider>
        <div className="flex flex-col bg-transparent min-h-screen mt-10 mb-20 md:mb-0">
          <div className="flex-1">
            <div className="mx-auto">
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