import React, { useState } from 'react';
import PollBadge from './PollBadge';
import Chat from './Chat';
import ChatPopup from './ChatPopUp';

export default function Loading() {
  const [openChat, setOpenChat] = useState(false);

  const studentName = sessionStorage.getItem("studentName");

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>

      <PollBadge />

      <div className="mt-10 w-12 h-12 rounded-full border-t-[3px] border-r-[3px] border-t-[#500ECE] border-r-transparent animate-spin"></div>

      <div className='mt-10 w-184.25 h-10.5 font-[Sora] font-semibold text-center text-black text-[33px]'>
        Wait for the teacher to ask questions...
      </div>

    
      <Chat onClick={() => setOpenChat(true)} />


      {openChat && (
        <ChatPopup
          name={studentName || "Student"}
          role="student"
          onClose={() => setOpenChat(false)}
        />
      )}

    </div>
  );
}
