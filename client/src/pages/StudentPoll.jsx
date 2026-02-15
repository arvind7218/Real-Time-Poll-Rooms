import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { API } from "../api";
import ChatPopup from "../components/ChatPopUp";
import { usePollTimer } from "../hooks/usePollTime";
import { MessageCircle } from "lucide-react";
import Loading from "../components/Loading";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";

const api = API;

export default function StudentPoll() {
  const socket = useSocket();

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const navigate = useNavigate();

  const [openChat, setOpenChat] = useState(false);

  const timeLeft = usePollTimer(poll);

  const studentId = sessionStorage.getItem("studentId");
  const studentName = sessionStorage.getItem("studentName");

  useEffect(() => {
    fetch(`${api}/api/poll/active`)
      .then(res => res.json())

      .then(data => {
        if (data && data.active) {
          const endTime =
            new Date(data.startTime).getTime() + data.duration * 1000;

          if (Date.now() < endTime) {
            setPoll(data);
          } else {
            setPoll(null);
          }
        } else {
          setPoll(null);
        }

      });
  }, []);


  useEffect(() => {
    if (!poll?._id) return;

    socket.emit("join_poll", {
      pollId: poll._id,
      studentId,
      name: studentName
    });
  }, [poll?._id]);


  useEffect(() => {
    socket.on("poll_started", (newPoll) => {
      setPoll(newPoll);
      setSelectedOption(null);
      setHasSubmitted(false);
      setResults({});
    });

    socket.on("poll_results", (data) => {
      setResults(data);
    });

    socket.on("poll_ended", () => {
      setHasSubmitted(true);
    });

    return () => {
      socket.off("poll_started");
      socket.off("poll_results");
      socket.off("poll_ended");
    };
  }, []);

  useEffect(() => {
    socket.on("kicked_out", () => {
      sessionStorage.clear();
      navigate("/kicked-out");

    })

    return () => socket.off("kicked_out")
  }, [])

  const submitVote = () => {
    if (selectedOption === null || hasSubmitted) return;

    socket.emit("submit_vote", {
      pollId: poll._id,
      studentId,
      optionIndex: selectedOption
    });

    setHasSubmitted(true);
  };

  if (!poll) {
    return (
      <Loading />
    );
  }

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="w-180">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-semibold text-lg">Question 1</h2>
          <span className="text-red-500 font-semibold">
            ⏱ 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>


        <div className="border border-[#8F64E1] rounded-xl p-4">


          <div className="bg-linear-to-r from-[#343434] to-[#6E6E6E]
                          text-white rounded-md px-4 py-3 mb-4">
            {poll.question}
          </div>


          {!hasSubmitted && timeLeft > 0 && (
            <>
              {poll.options.map((opt, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-md cursor-pointer
                    border
                    ${selectedOption === index
                      ? "border-[#8F64E1]"
                      : "border-[#E5E5E5]"}
                  `}
                >
                  <div className="w-6 h-6 rounded-full bg-[#BDBDBD]
                                  text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium">{opt}</span>
                </div>
              ))}

              {/* SUBMIT BUTTON */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={submitVote}
                  disabled={selectedOption === null}
                  className="bg-[#7C6EE6] text-white
                             px-10 py-3 rounded-full
                             disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          
          {hasSubmitted && (
            <>
              {poll.options.map((opt, index) => {
                const count = results[index] || 0;
                const percent = totalVotes
                  ? Math.round((count / totalVotes) * 100)
                  : 0;

                return (
                  <div
                    key={index}
                    className="relative flex items-center justify-between
                               border border-[#8F64E1]
                               rounded-md h-13.75 px-5 mb-3 overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-[#8F64E1]"
                      style={{ width: `${percent}%` }}
                    />

                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-6 h-6 bg-white rounded-full
                                      flex items-center justify-center
                                      text-[#6766D5]">
                        {index + 1}
                      </div>
                      <span className="text-black font-semibold">
                        {opt}
                      </span>
                    </div>

                    <span className="relative z-10 text-black font-semibold">
                      {percent}%
                    </span>
                  </div>
                );
              })}

             
            </>
          )}

       
        </div>

         {
          hasSubmitted && (
             <p className="mt-6 text-center text-black font-semibold text-[22px]">
                Wait for the teacher to ask a new question
              </p>
          )
        }

      </div>

      <Chat onClick={() => setOpenChat(true)} className="cursor-pointer" />

      {openChat && (
        <ChatPopup
          name={sessionStorage.getItem("studentName") || "Teacher"}
          role="student"
          onClose={() => setOpenChat(false)}
        />
      )}

    </div>
  );
}