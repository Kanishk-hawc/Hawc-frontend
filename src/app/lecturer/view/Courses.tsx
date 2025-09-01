import React from "react";

interface Course {
  id: number;
  title: string;
  code: string;
  enrolledStudents: number;
  semester: string;
  status: "active" | "completed" | "upcoming";
}

const Courses: React.FC = () => {
  const courses: Course[] = [
    { id: 1, title: "Advanced Programming", code: "CS401", enrolledStudents: 42, semester: "Fall 2023", status: "active" },
    { id: 2, title: "Data Structures", code: "CS301", enrolledStudents: 38, semester: "Fall 2023", status: "active" },
    { id: 3, title: "Web Development", code: "CS201", enrolledStudents: 35, semester: "Fall 2023", status: "active" },
    { id: 4, title: "Database Systems", code: "CS302", enrolledStudents: 27, semester: "Spring 2023", status: "completed" },
    { id: 5, title: "Machine Learning", code: "CS501", enrolledStudents: 0, semester: "Spring 2024", status: "upcoming" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Create New Course
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{course.code} | {course.semester}</p>
              <p className="text-gray-700 mb-4">{course.enrolledStudents} students enrolled</p>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View Details
                </button>
                {course.status === "active" && (
                  <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                    Manage
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;