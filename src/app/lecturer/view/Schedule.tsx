import React, { useState } from "react";

interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  topic: string;
  room: string;
  type: "lecture" | "problem session" | "office hours";
}

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  
  const schedule: ScheduleItem[] = [
    { id: 1, day: "Monday", time: "8:00 AM - 9:30 AM", topic: "Calculus I: Limits and Continuity", room: "M-201", type: "lecture" },
    { id: 2, day: "Monday", time: "10:00 AM - 11:30 AM", topic: "Linear Algebra: Vector Spaces", room: "M-105", type: "lecture" },
    { id: 3, day: "Monday", time: "2:00 PM - 3:30 PM", topic: "Calculus Problem Session", room: "M-205", type: "problem session" },
    { id: 4, day: "Tuesday", time: "9:00 AM - 10:30 AM", topic: "Differential Equations", room: "M-301", type: "lecture" },
    { id: 5, day: "Tuesday", time: "1:00 PM - 2:00 PM", topic: "Office Hours", room: "M-408", type: "office hours" },
    { id: 6, day: "Wednesday", time: "8:00 AM - 9:30 AM", topic: "Calculus I: Derivatives", room: "M-201", type: "lecture" },
    { id: 7, day: "Wednesday", time: "10:00 AM - 11:30 AM", topic: "Linear Algebra: Matrix Operations", room: "M-105", type: "lecture" },
    { id: 8, day: "Wednesday", time: "2:00 PM - 3:30 PM", topic: "Differential Equations Problem Session", room: "M-305", type: "problem session" },
    { id: 9, day: "Thursday", time: "9:00 AM - 10:30 AM", topic: "Advanced Calculus", room: "M-301", type: "lecture" },
    { id: 10, day: "Thursday", time: "1:00 PM - 2:00 PM", topic: "Office Hours", room: "M-408", type: "office hours" },
    { id: 11, day: "Friday", time: "8:00 AM - 9:30 AM", topic: "Calculus I: Applications of Derivatives", room: "M-201", type: "lecture" },
    { id: 12, day: "Friday", time: "10:00 AM - 11:30 AM", topic: "Linear Algebra: Eigenvalues", room: "M-105", type: "lecture" },
  ];

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const filteredSchedule = selectedDay === "All" 
    ? schedule 
    : schedule.filter(item => item.day === selectedDay);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-blue-100 text-blue-800 border border-blue-300";
      case "problem session": return "bg-purple-100 text-purple-800 border border-purple-300";
      case "office hours": return "bg-green-100 text-green-800 border border-green-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your class Schedule</h1>
        <p className="text-gray-600 mb-6">Professor Weekly Schedule</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDay === day 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedule.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{item.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.topic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{item.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredSchedule.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-gray-800">{item.topic}</h2>
                <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">{item.day}</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">{item.time}</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <p className="text-sm text-gray-600">{item.room}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;