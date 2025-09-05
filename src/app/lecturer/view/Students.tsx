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
  // const [selectedCourse, setSelectedCourse] = useState<string>("Maths");
  const [sortBy, setSortBy] = useState<string>("default");

  const students: Student[] = [
    { id: 1, name: "John Doe", studentId: "S12345", email: "john.doe@example.com", course: "Maths", attendance: 92, grade: 85 },
    { id: 2, name: "Jane Smith", studentId: "S12346", email: "jane.smith@example.com", course: "Maths", attendance: 88, grade: 92 },
    { id: 3, name: "Robert Johnson", studentId: "S12347", email: "robert.j@example.com", course: "Maths", attendance: 95, grade: 78 },
    { id: 4, name: "Emily Davis", studentId: "S12348", email: "emily.d@example.com", course: "Maths", attendance: 90, grade: 88 },
    { id: 5, name: "Michael Wilson", studentId: "S12349", email: "michael.w@example.com", course: "Maths", attendance: 85, grade: 65 },
    { id: 6, name: "Sarah Brown", studentId: "S12350", email: "sarah.b@example.com", course: "Maths", attendance: 96, grade: 95 },
  ];

  const sortOptions = [
    { value: "default", label: "Default Order" },
    { value: "gradeHighToLow", label: "Grade: High to Low" },
    { value: "gradeLowToHigh", label: "Grade: Low to High" },
    { value: "attendanceHighToLow", label: "Attendance: High to Low" },
    { value: "attendanceLowToHigh", label: "Attendance: Low to High" },
  ];

  const filteredStudents = students.filter(student => student.course === "Maths");
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "gradeHighToLow":
        return (b.grade || 0) - (a.grade || 0);
      case "gradeLowToHigh":
        return (a.grade || 0) - (b.grade || 0);
      case "attendanceHighToLow":
        return b.attendance - a.attendance;
      case "attendanceLowToHigh":
        return a.attendance - b.attendance;
      default:
        return 0;
    }
  });

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeColor = (grade?: number) => {
    if (!grade) return "text-gray-600";
    if (grade >= 90) return "text-green-600";
    if (grade >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-5 px-36">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Maths Dashboard</h1>
      <p className="text-gray-600 mb-6">View and manage all students enrolled in Maths</p>

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-full md:w-64">
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
            Sort Students By
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {/* Summary Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-md">
            <p className="text-sm text-blue-700">Total Students</p>
            <p className="text-xl font-bold text-blue-900">{sortedStudents.length}</p>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-md">
            <p className="text-sm text-green-700">Avg. Grade</p>
            <p className="text-xl font-bold text-green-900">
              {Math.round(sortedStudents.reduce((sum, student) => sum + (student.grade || 0), 0) / sortedStudents.length)}%
            </p>
          </div>
          <div className="bg-purple-50 px-4 py-2 rounded-md">
            <p className="text-sm text-purple-700">Avg. Attendance</p>
            <p className="text-xl font-bold text-purple-900">
              {Math.round(sortedStudents.reduce((sum, student) => sum + student.attendance, 0) / sortedStudents.length)}%
            </p>
          </div>
        </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                    {student.attendance}%
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getGradeColor(student.grade)}`}>
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
        {sortedStudents.map((student) => (
          <div key={student.id} className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500"><b>ID:</b> {student.studentId}</p>
            <p className="text-lg font-semibold text-gray-800">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
            <p className={`text-sm font-medium mt-1 ${getAttendanceColor(student.attendance)}`}>
              Attendance: {student.attendance}%
            </p>
            <p className={`text-sm font-medium mt-1 ${getGradeColor(student.grade)}`}>
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