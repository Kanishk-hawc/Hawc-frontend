import React, { useState } from "react";

const DoubtPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [className, setClassName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doubtData = { title, description, class: className };

    try {
      const res = await fetch("http://localhost:5000/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doubtData),
      });

      if (res.ok) {
        setSubmitted(true);
        setTitle("");
        setDescription("");
        setClassName("");
      }
    } catch (error) {
      console.error("Error submitting doubt:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Doubt</h2>

        {submitted && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Doubt submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your doubt title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe your doubt..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Class</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Doubt
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoubtPage;
