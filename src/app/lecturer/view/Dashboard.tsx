import React from "react";

const Dashboard: React.FC = () => {
  // Sample data
  const stats = [
    { label: "Total Courses", value: 5 },
    { label: "Upcoming Classes", value: 3 },
    { label: "Total Students", value: 142 },
    { label: "Pending Grading", value: 12 },
  ];

  const upcomingClasses = [
    { id: 1, course: "Advanced Programming", time: "10:00 AM", room: "A-101" },
    { id: 2, course: "Data Structures", time: "2:00 PM", room: "B-205" },
    { id: 3, course: "Web Development", time: "4:30 PM", room: "C-312" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Classes</h2>
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-medium text-gray-800">{classItem.course}</h3>
                <p className="text-sm text-gray-600">{classItem.time} | {classItem.room}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Assignment Deadline Extended</h3>
              <p className="text-sm text-gray-600">The deadline for Data Structures assignment has been extended to Friday.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Class Canceled</h3>
              <p className="text-sm text-gray-600">Web Development class on Wednesday has been canceled.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;