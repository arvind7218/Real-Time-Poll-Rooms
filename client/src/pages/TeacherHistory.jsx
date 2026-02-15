import { useEffect, useState } from "react";
import React from "react";
import { API } from "../api";

const api = API;

export default function TeacherHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${api}/api/poll/history`)
    .then(res => res.json())
    .then(data => {
      setHistory(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Loading poll history...</p>
    </div>
  );
}



  return (
    <div className="min-h-screen bg-white w-181.75 mt-19.25 ml-83.75 mb-10">
      <div className="w-86.25 h-12.5 flex items-center justify-center gap-1 text-[40px] font-[Sora] leading-none whitespace-nowrap">
        <span className="font-normal">View </span>
        <span className="font-semibold">Poll History</span>
      </div>


      <div>
        {history.map((poll, idx) => {
          const totalVotes = Object.values(poll.results).reduce(
            (a, b) => a + b,
            0
          );

          return (
            <div key={poll._id} className="mt-11.25">
              <h2 className="font-semibold mb-2 text-[22px] font-[Sora] leading-none">
                Question {idx + 1}
              </h2>

              <div className="border border-[#8F64E1] rounded-xl">
                <div className="bg-linear-to-r from-[#343434] to-[#6E6E6E] text-white px-4 py-3 rounded-t-xl">
                  {poll.question}
                </div>

                <div className="p-4 space-y-3">
                  {poll.options.map((opt, i) => {
                    const count = poll.results[i] || 0;
                    const percent = totalVotes
                      ? Math.round((count / totalVotes) * 100)
                      : 0;

                    return (
                      <div
                        key={i}
                        className="relative flex items-center justify-between border border-[#8F64E1] rounded-md px-4 py-3 overflow-hidden"
                      >
                        <div
                          className="absolute left-0 top-0 h-full bg-[#8F64E1]"
                          style={{ width: `${percent}%` }}
                        />

                        <span className="relative z-10 text-black font-semibold">
                          {opt}
                        </span>

                        <span className="relative z-10 text-black font-semibold">
                          {percent}%
                        </span>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}