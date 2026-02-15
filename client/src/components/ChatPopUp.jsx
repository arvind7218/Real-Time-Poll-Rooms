import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import React from "react";

export default function ChatPopup({ name, role, pollId, onClose }) {
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [participants, setParticipants] = useState([]);


  useEffect(() => {

    socket.on("participants_update", setParticipants)

    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("participants_update", setParticipants);
      socket.off("receive_message");

    }
  }, []);

  useEffect(() => {
    if (!pollId) return;

    socket.emit("join_poll", {
      pollId,
      studentId: sessionStorage.getItem("studentId") || "teacher",
      name
    });
  }, [pollId]);



  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("send_message", {
      name,
      role,
      message: text
    });

    setText("");
  };

  return (
    <div
      className="
        fixed bottom-24 right-10
        w-107.25 h-119.25
        bg-white
        border border-[#DFCCCC]
        rounded-[5px]
        shadow-[4px_4px_20px_rgba(0,0,0,0.04),-4px_-4px_20px_rgba(0,0,0,0.04)]
        flex flex-col
        z-9999
      "
    >

      <div className="flex border-b border-[#DFCCCC]">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 font-semibold text-sm ${activeTab === "chat"
            ? "text-[#7C6EE6] border-b-2 border-[#7C6EE6]"
            : "text-black/60"
            }`}
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("participants")}
          className={`flex-1 py-3 font-semibold text-sm ${activeTab === "participants"
            ? "text-[#7C6EE6] border-b-2 border-[#7C6EE6]"
            : "text-black/60"
            }`}
        >
          Participants
        </button>
      </div>

      {activeTab === "chat" && (
        <>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map((msg, i) => {
              const isMe = msg.role === role;

              return (
                <div
                  key={i}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"
                    }`}
                >
                  <span
                    className={`text-xs font-semibold mb-1 ${isMe ? "text-[#7C6EE6]" : "text-black/70"
                      }`}
                  >
                    {msg.name}
                  </span>

                  <div
                    className={`px-4 py-2 text-sm rounded-md max-w-[70%] ${isMe
                      ? "bg-[#7C6EE6] text-white"
                      : "bg-[#2E2E2E] text-white"
                      }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#DFCCCC] p-3 flex gap-2">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-3 py-2 border rounded-md outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#7C6EE6] text-white rounded-md text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </>
      )}


      {activeTab === "participants" && (
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="grid grid-cols-[1fr_auto] gap-y-3 text-sm">

            {/* HEADER */}
            <span className="font-semibold text-black/60">Name</span>
            <span className="font-semibold text-black/60">Action</span>

            {/* PARTICIPANTS */}
            {participants
              .filter(p => p.studentId !== "teacher")
              .map(p => (
                <React.Fragment key={p.studentId}>
                  <span className="font-medium text-black">{p.name}</span>

                  {role === "teacher" && (
                    <button
                      className="text-[#1D68BD] font-semibold"
                      onClick={() =>
                        socket.emit("kick_student", {
                          pollId,
                          studentId: p.studentId
                        })
                      }
                    >
                      Kick out
                    </button>
                  )}
                </React.Fragment>
              ))}


            {participants.length === 0 && (
              <span className="col-span-2 text-center text-black/40 mt-6">
                No participants yet
              </span>
            )}
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-black/60"
      >
        ✕
      </button>
    </div>
  );
}
