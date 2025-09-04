import React, { useState } from "react";

interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  course: string;
  room: string;
  type: "lecture" | "lab" | "office hours";
}

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  
  const schedule: ScheduleItem[] = [
    { id: 1, day: "Monday", time: "9:00 AM - 10:30 AM", course: "Advanced Programming", room: "A-101", type: "lecture" },
    { id: 2, day: "Monday", time: "2:00 PM - 3:30 PM", course: "Data Structures", room: "B-205", type: "lecture" },
    { id: 3, day: "Tuesday", time: "10:00 AM - 11:30 AM", course: "Web Development", room: "C-312", type: "lecture" },
    { id: 4, day: "Tuesday", time: "4:00 PM - 5:00 PM", course: "Office Hours", room: "D-408", type: "office hours" },
    { id: 5, day: "Wednesday", time: "9:00 AM - 11:00 AM", course: "Advanced Programming Lab", room: "Lab-3", type: "lab" },
    { id: 6, day: "Thursday", time: "11:00 AM - 12:30 PM", course: "Data Structures", room: "B-205", type: "lecture" },
    { id: 7, day: "Friday", time: "10:00 AM - 11:30 AM", course: "Web Development Lab", room: "Lab-2", type: "lab" },
  ];

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const filteredSchedule = selectedDay === "All" 
    ? schedule 
    : schedule.filter(item => item.day === selectedDay);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-blue-100 text-blue-800";
      case "lab": return "bg-purple-100 text-purple-800";
      case "office hours": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Schedule</h1>
      
      {/* Day Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedDay === day 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
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
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{item.course}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                {item.type}
              </span>
            </div>
            <p className="text-sm text-gray-600"><b>Day:</b> {item.day}</p>
            <p className="text-sm text-gray-600"><b>Time:</b> {item.time}</p>
            <p className="text-sm text-gray-600"><b>Room:</b> {item.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
