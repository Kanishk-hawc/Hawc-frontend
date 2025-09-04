import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  studentId: string;
  email: string;
  course: string;
  attendance: number;
  grade?: number;
}

const Students: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("All");

  const students: Student[] = [
    { id: 1, name: "John Doe", studentId: "S12345", email: "john.doe@example.com", course: "Advanced Programming", attendance: 92, grade: 85 },
    { id: 2, name: "Jane Smith", studentId: "S12346", email: "jane.smith@example.com", course: "Advanced Programming", attendance: 88, grade: 92 },
    { id: 3, name: "Robert Johnson", studentId: "S12347", email: "robert.j@example.com", course: "Data Structures", attendance: 95, grade: 78 },
    { id: 4, name: "Emily Davis", studentId: "S12348", email: "emily.d@example.com", course: "Data Structures", attendance: 90, grade: 88 },
    { id: 5, name: "Michael Wilson", studentId: "S12349", email: "michael.w@example.com", course: "Web Development", attendance: 85 },
    { id: 6, name: "Sarah Brown", studentId: "S12350", email: "sarah.b@example.com", course: "Web Development", attendance: 96, grade: 95 },
  ];

  const courses = ["All", "Advanced Programming", "Data Structures", "Web Development"];

  const filteredStudents = selectedCourse === "All" 
    ? students 
    : students.filter(student => student.course === selectedCourse);

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Students</h1>

      {/* Course Filter */}
      <div className="mb-6">
        <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Course
        </label>
        <select
          id="course-filter"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.course}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                    {student.attendance}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.grade ? `${student.grade}%` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500"><b>ID:</b> {student.studentId}</p>
            <p className="text-lg font-semibold text-gray-800">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
            <p className="text-sm text-gray-600 mt-1"><b>Course:</b> {student.course}</p>
            <p className={`text-sm font-medium mt-1 ${getAttendanceColor(student.attendance)}`}>
              Attendance: {student.attendance}%
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Grade: {student.grade ? `${student.grade}%` : "N/A"}
            </p>
            <div className="mt-3 flex space-x-4">
              <button className="text-blue-600 hover:text-blue-900">View</button>
              <button className="text-green-600 hover:text-green-900">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
