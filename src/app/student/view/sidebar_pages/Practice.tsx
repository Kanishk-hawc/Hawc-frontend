import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PracticeQuestion: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sample questions data
  useEffect(() => {
    const sampleQuestions: Question[] = [
      {
        id: 1,
        question: "What is the main benefit of using React?",
        options: [
          "It makes CSS styling easier",
          "It provides a virtual DOM for better performance",
          "It includes built-in backend functionality",
          "It automatically optimizes images"
        ],
        correctAnswer: 1,
        explanation: "React's virtual DOM allows for efficient updates and rendering, which improves application performance compared to directly manipulating the real DOM."
      },
      {
        id: 2,
        question: "Which hook is used to manage state in functional components?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 1,
        explanation: "The useState hook is specifically designed to add state management capabilities to functional components in React."
      },
      {
        id: 3,
        question: "What does TSX stand for in React?",
        options: [
          "TypeScript Extension",
          "TypeScript XML",
          "TypeScript Expression",
          "TypeScript Syntax"
        ],
        correctAnswer: 1,
        explanation: "TSX stands for TypeScript XML, which is a syntax extension for JavaScript that allows writing HTML-like code in TypeScript files."
      }
    ];
    setQuestions(sampleQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    
    setSelectedOption(index);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetQuestion();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      resetQuestion();
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-transparent' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`w-full max-w-2xl rounded-xl shadow-2xl p-6 transition-all duration-300 ${isDarkMode ? 'bg-transparent text-white' : 'bg-white text-gray-800'}`}>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Practice Questions</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isDarkMode ? 'bg-purple-600/30 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        
        <div className={`p-6 rounded-lg mb-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                  selectedOption === index
                    ? isDarkMode 
                      ? 'border-purple-400 bg-purple-900/30' 
                      : 'border-blue-500 bg-blue-100'
                    : isDarkMode 
                      ? 'border-gray-600 hover:border-gray-400 bg-gray-700/30 hover:bg-gray-600/50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedOption === index
                      ? isDarkMode
                        ? 'bg-purple-500'
                        : 'bg-blue-500'
                      : isDarkMode
                        ? 'bg-gray-600'
                        : 'bg-gray-200'
                  }`}>
                    {selectedOption === index && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <div className={`p-4 rounded-lg mb-6 transition-all duration-300 ${isCorrect ? (isDarkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-100 border border-green-200') : (isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-100 border border-red-200')}`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-1 ${isCorrect ? (isDarkMode ? 'bg-green-500' : 'bg-green-400') : (isDarkMode ? 'bg-red-500' : 'bg-red-400')}`}>
                {isCorrect ? (
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-semibold">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                <p className="mt-2">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={selectedOption === null}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''} ${
                isDarkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-400 text-white'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={resetQuestion}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className={`h-3 flex-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestion;