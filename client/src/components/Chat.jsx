import React from "react";

export default function Chat({ onClick }) {
  return (
    
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8"
    >
      <img
        src="/chat.png"
        alt="Chat"
        className="w-20 h-19"
      />
    </button>
  );
}
