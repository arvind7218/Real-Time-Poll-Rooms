import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket.js";
import PollBadge from "../components/PollBadge";
import { useNavigate } from "react-router-dom";

export default function TeacherCreate() {
  const socket = useSocket();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(60);
  const [correctIndex, setCorrectIndex] = useState(null);

  const optionRef = useRef([]);

  const addOption = () => {
    if (options.some((opt) => !opt.trim())) return;
    if (options.length >= 4) return;
    setOptions((prev) => [...prev, ""]);
  };

  useEffect(() => {
    if (options.length > 2) {
      const lastIndex = options.length - 1;
      optionRef.current[lastIndex]?.focus();
    }
  }, [options.length]);

  const createPoll = () => {
    socket.emit("create_poll", {
      question,
      options,
      duration,
      correctOptionIndex: correctIndex, // can be null now
    });

    navigate("/teacher/live");
  };

  // ✅ Correct option NOT compulsory now
  const isValid =
    question.trim() &&
    options.length >= 2 &&
    options.every((opt) => opt.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
      <div className="flex-1 overflow-y-auto pb-10">

        {/* Badge */}
        <div className="mt-20 ml-32">
          <PollBadge />
        </div>

        {/* Heading */}
        <div className="ml-32 mt-6">
          <h1 className="text-[40px] font-bold text-gray-800">
            Let’s Create a Poll
          </h1>
          <p className="text-gray-500 text-[18px] mt-2">
            Ask questions and get instant responses.
          </p>
        </div>

        {/* Question Card */}
        <div className="mt-10 ml-32 w-[865px] bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-semibold text-gray-700">
              Enter your question
            </h2>

            {/* Duration Dropdown (UNCHANGED) */}
            <div className="relative w-[170px]">
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-10 py-2 px-4 pr-10 bg-[#F1F1F1] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value={60}>60 seconds</option>
                <option value={80}>80 seconds</option>
                <option value={120}>120 seconds</option>
                <option value={1200}>1200 seconds</option>
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <div className="relative mt-6">
            <textarea
              value={question}
              maxLength={100}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-36 rounded-xl bg-gray-100 p-4 resize-none focus:ring-2 focus:ring-purple-400 outline-none transition"
              placeholder="Type your question..."
            />
            <p className="absolute bottom-3 right-4 text-sm text-gray-400">
              {question.length}/100
            </p>
          </div>
        </div>

        {/* Options Card */}
        <div className="mt-10 ml-32 w-[865px] bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-[20px] font-semibold text-gray-700 mb-6">
            Select Correct Option (Optional)
          </h2>

          {options.map((opt, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl mb-4 transition cursor-pointer
              ${correctIndex === index
                ? "bg-purple-50 border-2 border-purple-500 shadow-md"
                : "bg-gray-50 border border-gray-200 hover:border-purple-400"
              }`}
              onClick={() => setCorrectIndex(index)}
            >
              <div className="flex items-center gap-4 w-full">

                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold
                ${correctIndex === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-700"
                }`}>
                  {index + 1}
                </div>

                <textarea
                  value={opt}
                  ref={(el) => (optionRef.current[index] = el)}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="flex-1 h-12 bg-transparent resize-none outline-none"
                  placeholder="Enter option..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addOption}
            type="button"
            className="mt-4 px-6 py-2 rounded-full border border-purple-500 text-purple-600 font-semibold hover:bg-purple-100 transition"
          >
            + Add More Option
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white px-10 py-4 flex justify-end shadow-inner">
        <button
          onClick={createPoll}
          disabled={!isValid}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-3 rounded-full font-semibold text-lg hover:scale-105 transition disabled:opacity-50"
        >
          Ask Question
        </button>
      </div>
    </div>
  );
}
