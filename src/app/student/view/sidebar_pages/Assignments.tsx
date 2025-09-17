import React, { useState, useEffect } from 'react';

// Define types for our assignments
interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'late';
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const AssignmentsPage: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  // State for assignments
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'late'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);

  // Sample assignments data
  useEffect(() => {
    const sampleAssignments: Assignment[] = [
      {
        id: '1',
        title: 'React Component Development',
        dueDate: '2023-06-15',
        status: 'pending',
        priority: 'high',
        description: 'Create a responsive React component with TypeScript and Tailwind CSS. Implement dark mode support and ensure accessibility standards.'
      },
      {
        id: '2',
        title: 'API Integration Task',
        dueDate: '2023-06-10',
        status: 'completed',
        priority: 'medium',
        description: 'Integrate with the RESTful API and handle all response states. Implement error handling and loading states.'
      },
      {
        id: '3',
        title: 'Database Design Project',
        dueDate: '2023-05-28',
        status: 'late',
        priority: 'high',
        description: 'Design a normalized database schema for an e-commerce application. Include ER diagrams and relationship explanations.'
      },
      {
        id: '4',
        title: 'UI/UX Design Review',
        dueDate: '2023-06-20',
        status: 'pending',
        priority: 'low',
        description: 'Review the provided designs and provide feedback on usability and accessibility. Suggest improvements for mobile experience.'
      },
      {
        id: '5',
        title: 'Testing Implementation',
        dueDate: '2023-06-18',
        status: 'pending',
        priority: 'medium',
        description: 'Write unit tests and integration tests for the core functionality. Achieve at least 80% test coverage.'
      }
    ];
    setAssignments(sampleAssignments);
  }, []);

  // Filter assignments based on selected filter
  const filteredAssignments = assignments.filter(assignment => 
    filter === 'all' || assignment.status === filter
  );

  // Sort assignments based on selected sort option
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });

  // Toggle assignment expansion
  const toggleExpand = (id: string) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300';
      case 'late':
        return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  // Get priority badge class
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-transparent' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Assignments
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage and track your assignments
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-4 rounded-lg backdrop-blur-sm bg-white/70 dark:bg-gray-800/50 shadow-sm">
          <div className="flex space-x-2 mb-4 md:mb-0">
            {(['all', 'pending', 'completed', 'late'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === option
                    ? 'bg-blue-600 text-white'
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority')}
              className={`rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {sortedAssignments.length > 0 ? (
            sortedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`rounded-lg shadow-sm backdrop-blur-sm transition-all overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-800/40 hover:bg-gray-700/50 border border-gray-700/50' 
                    : 'bg-white hover:bg-gray-50/90 border border-gray-200'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleExpand(assignment.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {assignment.title}
                      </h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Due: {formatDate(assignment.dueDate)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Expandable content */}
                {expandedAssignment === assignment.id && (
                  <div className={`px-4 pb-4 pt-2 border-t ${
                    isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
                  }`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {assignment.description}
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button className={`px-3 py-1 rounded text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}>
                        Edit
                      </button>
                      <button className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                        Mark as Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={`text-center py-12 rounded-lg ${
              isDarkMode ? 'bg-gray-800/40' : 'bg-white'
            }`}>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No assignments found. Enjoy your free time!
              </p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className={`mt-8 p-6 rounded-lg backdrop-blur-sm ${
          isDarkMode ? 'bg-gray-800/40' : 'bg-white/70'
        } shadow-sm`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Assignment Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
            }`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                Late
              </h3>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                {assignments.filter(a => a.status === 'late').length}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-100'
            }`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                Pending
              </h3>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                {assignments.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
            }`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                Completed
              </h3>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                {assignments.filter(a => a.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;