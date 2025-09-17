"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
import { DyteUiProvider, DyteMeeting } from "@dytesdk/react-ui-kit";
import { X, FileText, HelpCircle, List } from "lucide-react";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png"
const DyteMeetingPage: React.FC = () => {
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [dyteClient, initDyteClient] = useDyteClient();
  const [showSubTopics, setShowSubTopics] = useState(false);
  const [subTopics, setSubTopics] = useState<any[]>([]);

  const history = useHistory();

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const userData = localStorage.getItem("user");
        let bearerToken = "";

        if (userData) {
          try {
            const parsedUserData = JSON.parse(userData);
            bearerToken = parsedUserData.token || "";
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }

        if (!bearerToken) {
          console.error("No bearer token found in localStorage");
          setLoading(false);
          return;
        }
        const res = await axios.get(
          "https://lms.hawc.in/api/student/myclassdetails?live_class_id=2",
          {
            headers: { Authorization: `Bearer ${bearerToken}` },
          }
        );
        console.log("API response:", res.data);

        if (res.data?.success) {
          const liveClassDetails = res.data?.data?.liveClassDetails;

          if (!liveClassDetails) {
            console.error("No liveClassDetails found in API response");
            setLoading(false);
            return;
          }
          setSubTopics(liveClassDetails.my_sub_topic_list || []);

          const token: string = liveClassDetails.token;
          const meetingId: string = liveClassDetails.meeting_id;
          setMeetingId(meetingId);

          const meetingInstance = await initDyteClient({
            authToken: token,
            defaults: { audio: true, video: true },
          });

          if (!meetingInstance) throw new Error("Failed to init Dyte client");

          await meetingInstance.join();
          setMeeting(meetingInstance);

          localStorage.setItem("dyte_token", token);
          localStorage.setItem("dyte_meetingId", meetingId);
        } else {
          console.log("API call not successful:", res.data);
        }
      } catch (err) {
        console.error("Error fetching meeting:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [initDyteClient]);

  useEffect(() => {
    if (!meetingId) return;
    const socket = new WebSocket("wss://livesocket.hawc.in");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join_notification",
          meetingId: meetingId,
          userRole: "participant",
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "PAUSE_TOGGLE" && data.meetingId === meetingId) {
          setIsPaused(data.isPaused);
          if (data.isPaused) setShowSidebar(true);
        } else if (data.type === "PAUSE_STATE") {
          setIsPaused(data.isPaused);
          if (data.isPaused) setShowSidebar(true);
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    return () => socket.close();
  }, [meetingId]);

  const handleSubTopicClick = (sub: any) => {
    console.log("Sub-topic clicked:");
    console.log("Meeting ID:", sub.meeting_id);
    console.log("Token:", sub.token);
    localStorage.setItem("currentLiveClass", JSON.stringify({
      meetingId: sub.meeting_id,
      token: sub.token
    }));
    
    history.push('/doubt-class');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!meeting) {
      return (
    <div className="flex items-center justify-center min-h-screen bg-transparent ">
      <div className="text-center p-8 max-w-[90%] w-[400px] ">
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
    <div className="md:mt-10 mb-20 md:mb-0">
      <DyteProvider value={meeting}>
        <DyteUiProvider>
          <div className="h-screen w-full flex bg-transparent relative">
            <div
              className={`flex-1 transition-all duration-300`}
              style={{ marginRight: showSidebar ? 384 : 0 }}
            >
              <DyteMeeting mode="fill" meeting={dyteClient} />
            </div>
            {!showSidebar && isPaused && (
              <button
                onClick={() => setShowSidebar(true)}
                className="absolute right-9 bottom-20"
                style={{   }}
                aria-label="Open meeting info"
              >
                <FileText className="text-white" size={28} />
              </button>
            )}
            {isPaused && showSidebar && (
              <div
                className="w-96 bg-[#141414] text-white p-4 shadow-xl absolute right-0  flex flex-col"
                style={{ top: 0, height: `calc(100% - 0px)` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Meeting Paused</h2>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Close sidebar"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                    onClick={() => history.push("/queue")}
                  >
                    <List size={20} />
                    Queue
                  </button>
                  <button
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                    onClick={() => setShowSubTopics(!showSubTopics)}
                  >
                    <HelpCircle size={20} />
                    Doubt Section
                  </button>

                  {showSubTopics && (
                    <div className="ml-6 flex flex-col gap-1 mt-1">
                      {subTopics.length > 0 ? (
                        subTopics.map((sub) => (
                          <button
                            key={sub.sub_topic_id}
                            className="text-sm text-left p-1 rounded hover:bg-gray-200"
                            onClick={() => handleSubTopicClick(sub)}
                          >
                            {sub.sub_topic_name}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No subtopics available
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 mt-4">
                  <p>The meeting has been paused by another participant.</p>
                  <p className="mt-4 text-sm">
                    Please wait until it is resumed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </DyteUiProvider>
      </DyteProvider>
    </div>
  );
};

export default DyteMeetingPage;
