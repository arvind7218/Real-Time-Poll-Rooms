import React, { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket.js';
import PollBadge from '../components/PollBadge';
import { useNavigate } from 'react-router-dom';
// import Chat from '../components/Chat.jsx';


export default function TeacherCreate() {

    const socket = useSocket();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(["", ""])
    const [duration, setDuration] = useState(60);
    const [correctIndex, setCorrectIndex] = useState(null);
    const navigate = useNavigate();
    const [openChat , setOpenChat] = useState(false);

    const optionRef = useRef([]);

    const addOption = () => {

        console.log("add option called")
        if (options.some(opt => !opt.trim())) return;
        if (options.length >= 4) return;

        setOptions(prev => [...prev, ""]);
    };


    useEffect(() => {
        if (options.length > 2) {

            const lastIndex = options.length - 1;
            optionRef.current[lastIndex]?.focus();
        }
    }, [options.length])

    const createPoll = () => {
        socket.emit("create_poll", {
            question,
            options,
            duration,
            correctOptionIndex: correctIndex

        })

        navigate("/teacher/live");
    }

    const isValid =
        question.trim() &&
        options.length >= 2 &&
        options.every(opt => opt.trim()) &&
        correctIndex !== null;

    return (

        <div className='h-screen flex flex-col w-full bg-white'>

            <div className='flex-1 overflow-y-auto mb-8'>
                <div className='mt-20.25 ml-33.5' >
                    <PollBadge />

                </div>

                <div className='w-184.25 h-30.25 gap-8.5 ml-30.75 mt-4' >
                    <div className='flex flex-col gap-3'>

                        <h1 className='w-184.25 h-12.5 font-semibold font-[Sora] text-[40px] leading-none'> Let's Get Started</h1>
                        <p className='w-184.25 h-12 text-black/50 text-[19px] font-[Sora]leading-none font-normal' >you’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.</p>
                    </div>

                </div>

                <div className='mt-8.5 ml-30.75 w-216.25 h-59' >
                    <div className='w-216.25 h-10.75 justify-between flex'>
                        <h1 className='w-40.25 h-6.25 text-[20px] font-[Sora] font-semibold leading-none text-black whitespace-nowrap'>Enter your question</h1>

                        <div className="relative w-42.5">
                            <select
                                value={duration}
                                onChange={e => setDuration(Number(e.target.value))}
                                className='  w-full h-10.75 py-2 px-4 pr-10 bg-[#F1F1F1] text-black font-[Sora] text-[18px] font-normal rounded-lg appearance-none focus:outline-non  '
                            >
                                <option value={60}>60 seconds</option>
                                <option value={80}>80 seconds</option>
                                <option value={120}>120 seconds</option>
                            </select>

                            <img
                                src="/Polygon.png"
                                alt="arrow"
                                className=" absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none "
                            />
                        </div>

                    </div>
                    <div className="relative w-216.25 mt-4.75">
                        <textarea
                            value={question}
                            maxLength={100}
                            onChange={e => setQuestion(e.target.value)}
                            className="w-full h-43.5 rounded-xs bg-[#F2F2F2] resize-none  p-4 pb-8"
                        />

                        <p className="absolute bottom-2 right-3 text-[14px] text-black/40 pointer-events-none">
                            {question.length}/100
                        </p>
                    </div>


                </div>

                <div className="mt-8.5 ml-30.75 grid grid-cols-[auto_1fr] gap-x-4.25">

                    <div>
                        <div className="font-[Sora] font-semibold text-[18px] leading-none h-5.75 mb-4">
                            Edit options
                        </div>

                        {options.map((opt, index) => (
                            <div key={index} className="flex items-center gap-3 h-15 mt-3">

                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#8F64E1] text-white text-[14px]">
                                    {index + 1}
                                </div>

                                <textarea
                                    value={opt}
                                    ref={e => (optionRef.current[index] = e)}
                                    onChange={(e) => {
                                        const newOptions = [...options]
                                        newOptions[index] = e.target.value
                                        setOptions(newOptions)
                                    }}
                                    className="w-126.75 h-15 rounded-sm bg-[#F2F2F2] p-3 resize-none"
                                />

                            </div>
                        ))}


                        <button className="text-[#7C57C2] font-semibold text-[14px] leading-none cursor-pointer text-center w-42.5 h-11.25 mt-6.5 ml-9 rounded-[11px] border border-[#7451B6] p-2.5 " onClick={addOption} type='button'>
                            + Add More Option
                        </button>

                    </div>

                    <div>
                        <div className="font-[Sora] font-semibold text-[18px] leading-none h-5.75 mb-4">
                            Is it Correct?
                        </div>

                        {options.map((_, index) => (
                            <div key={index} className="flex items-center h-15 mt-3 gap-6">

                                <label className="flex items-center gap-2 text-[17px] font-semibold font-[Sora]">
                                    <input
                                        type="radio"
                                        name={`correct-${index}`}
                                        checked={correctIndex === index}
                                        onChange={() => setCorrectIndex(index)}
                                        className="w-5.5 h-5.5 rounded-full border-2 border-[#8F64E1]"
                                    />
                                    <span>Yes</span>
                                </label>

                                <label className="flex items-center gap-2 text-[17px] font-semibold font-[Sora]">
                                    <input
                                        type="radio"
                                        name={`correct-${index}`}
                                        checked={correctIndex !== index}
                                        onChange={() => setCorrectIndex(null)}
                                        className="w-5.5 h-5.5 rounded-full border-2 border-[#8F64E1]"
                                    />
                                    <span>No</span>
                                </label>


                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="border-t border-[#B6B6B6]   px-10 py-4 flex justify-end">
                <button
                    onClick={createPoll}
                    disabled={!isValid}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-[#1D68B6] font-[Sora] text-[18px] leading-none font-semibold"
                >
                    Ask Question
                </button>
            </div>

            

        </div>
    )
}
