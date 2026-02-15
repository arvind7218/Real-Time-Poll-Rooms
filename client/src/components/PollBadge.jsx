import React from 'react'

const PollBadge = () => {
    return (
        <div className="flex flex-row items-center justify-center w-33.5 h-7.75 rounded-3xl px-2.25 gap-1.75 bg-linear-to-r  from-[#7565D9] to-[#4D0ACD]">
            <img src="/Vector.png" alt='badge' className='w-[14.66px] h-[14.66px] text-white text-center ' />
            <span className="font-[Sora] text-white font-semibold text-[14px] text-center leading-none w-22.75 h-4.5 py-1" >Intervue Poll</span>
        </div>
    )
}

export default PollBadge
