import React, { useState } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "12"],
    answer: "8",
  },
];

const Practice: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === sampleQuestions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < sampleQuestions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        {!showResult ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Practice Question {currentQ + 1}/{sampleQuestions.length}
            </h2>
            <p className="text-lg mb-4">{sampleQuestions[currentQ].question}</p>
            <div className="space-y-3">
              {sampleQuestions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    selected === option
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-50 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
            >
              {currentQ + 1 < sampleQuestions.length ? "Next" : "Submit"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Result 🎉</h2>
            <p className="mt-4 text-lg">
              You scored <span className="font-semibold">{score}</span> out of{" "}
              {sampleQuestions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setShowResult(false);
              }}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
