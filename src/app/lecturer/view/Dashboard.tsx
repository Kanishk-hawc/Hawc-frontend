import React from "react";
import LiveClass from "./components/Live";
import UpcomingLive from "./components/UpcomingLive";
const Dashboard: React.FC = () => {
  return (
    <div>
      <LiveClass />
      <UpcomingLive />
    </div>
  );
};

export default Dashboard;