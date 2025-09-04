"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDyteClient, DyteProvider, useDyteMeeting } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";

// ✅ Child component to render Dyte meeting UI
const MyMeeting: React.FC = () => {
  const { meeting } = useDyteMeeting();

  if (!meeting) {
    return <p className="text-center text-gray-500">Loading meeting...</p>;
  }

  return (
    <div className="h-[600px] w-full border rounded-2xl shadow-lg overflow-hidden">
      <DyteMeeting mode="fill" meeting={meeting} />
    </div>
  );
};

const DyteMeetingPage: React.FC = () => {
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dyteClient, initDyteClient] = useDyteClient();

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const userData = localStorage.getItem("user");
        let bearerToken = "";

        if (userData) {
          try {
            const parsedUserData = JSON.parse(userData);
            bearerToken = parsedUserData.token || "";
            console.log("User from localStorage:", parsedUserData);
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }

        if (!bearerToken) {
          console.error("No bearer token found in localStorage");
          setLoading(false);
          return;
        }

        // ✅ Fetch user's classes
        const res = await axios.get("http://lms.hawc.in/api/staff/myclasses", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        console.log("Full API response:", res.data);

        if (res.data?.success) {
          const liveClasses = res.data.data.liveClasses;
          console.log("Live Classes:", liveClasses);

          // ✅ Pick the first class that actually has a token
          const validClass = liveClasses.find(
            (cls: any) => cls?.token?.length > 0 && cls?.meeting_id
          );

          if (validClass) {
            console.log("Joining Class:", validClass.short_name);
            console.log("Meeting ID:", validClass.meeting_id);
            console.log("Auth Token:", validClass.token[0]);

            const meetingInstance = await initDyteClient({
              authToken: validClass.token[0],
              defaults: {
                audio: true,
                video: true,
              },
            });

            setMeeting(meetingInstance);
          } else {
            console.error("No valid class with token + meeting_id found");
          }
        }
      } catch (err) {
        console.error("Error fetching meeting:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [initDyteClient]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <DyteProvider value={meeting} fallback={<p>Joining meeting...</p>}>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-4">Live Class</h1>
        <MyMeeting />
      </div>
    </DyteProvider>
  );
};

export default DyteMeetingPage;
