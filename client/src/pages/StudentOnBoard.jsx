import React, { useState } from 'react'
import PollBadge from '../components/PollBadge'
import { useNavigate } from 'react-router-dom';
export default function StudentOnBoard() {


    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = ()=>{

        sessionStorage.setItem("studentName" , name);
        sessionStorage.setItem("studentId" , crypto.randomUUID());
        navigate("/student/poll")

    }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-white'>
            <div >
                <PollBadge />
    
            </div>

            <div className="mt-6.5 w-245.45 h-12.5 flex flex-col items-center gap-17.25">
                <div className='w-184.25 h-12.5 gap-6.5'>

                <h3 className="font-[Sora] font-semibold text-[40px] leading-none text-black text-center">
                    Let's get started
                </h3>
                </div>

            </div>
            <div className='w-190.5 h-17.25 mt-3' >

                <p className="font-[Sora] font-light text-[19px] leading-none text-black/50 text-center">
                     If you’re a student, you’ll be able to submit your answers, participate in live polls, and see how your responses compare with your classmates
                </p>
            </div>

            <div className='w-126.75 h-23.75 mt-7.75 flex flex-col gap-3' >

                <label className='w-126.75 h-5.75 text-[18px] font-[Sora] font-normal leading-none'>Enter your name</label>
                <input type='text' className='w-126.75 h-15 rounded-xs bg-[#F2F2F2] font-[Sora] font-normal pl-4 py-2 text-black text-[18px]' onChange={e=> setName(e.target.value)} value={name}  />

            </div>

             <button
                onClick={handleSubmit}
                disabled={!name}
                className="mt-11.5 w-[233.93px] h-[57.58px] rounded-[34px]
                 font-[Sora] font-semibold text-[16px] text-white
                 flex items-center justify-center transition bg-linear-to-r from-[#8F64E1] to-[#1D68BD] hover:opacity-90 active:scale-[0.98] cursor-pointer"
                    
            >
                Continue
            </button>
    </div>
  )
}
