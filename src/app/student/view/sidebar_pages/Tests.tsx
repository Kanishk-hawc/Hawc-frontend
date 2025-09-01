import React, { useState } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "Which language is used for React?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: "JavaScript",
  },
  {
    id: 3,
    question: "Tailwind CSS is a?",
    options: ["Library", "Framework", "Utility-first CSS framework", "Compiler"],
    correct: "Utility-first CSS framework",
  },
];

const Test: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (qId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Test Page</h1>

        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold">{q.question}</h2>
            <div className="mt-2 space-y-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleSelect(q.id, option)}
                    className="form-radio text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Test
        </button>

        {score !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">
              Your Score: {score} / {questions.length}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
