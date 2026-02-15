import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { API } from "../api";
import React from "react";
import { usePollTimer } from "../hooks/usePollTime";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import ChatPopup from "../components/ChatPopUp";

const api = API;
export default function TeacherLive() {
	const socket = useSocket();
	const [results, setResults] = useState({});
	const [poll, setPoll] = useState(null);
	const navigate = useNavigate();
	const [openChat, setOpenChat] = useState(false)

	const timeLeft = usePollTimer(poll);

	const canAskQuestion = timeLeft === 0;

	useEffect(() => {
		fetch(`${api}/api/poll/active`)
			.then(res => res.json())
			.then(setPoll);

		socket.on("poll_started", (newPoll) => {
			setPoll(newPoll);
			setResults({});
		});

		socket.on("poll_results", (data) => {
			setResults(data);
		});

		return () => {
			socket.off("poll_started");
			socket.off("poll_results");
		};
	}, []);


	useEffect(() => {
		if (timeLeft === 0 && poll?._id) {
			socket.emit("end_poll", poll._id);
		}
	}, [timeLeft])

	if (!poll) return null;

	const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

	return (
		<div className="  min-h-screen overflow-y-hidden  bg-white  ">

			<div className="w-66.75 h-13.25 mt-15.5 ml-280 rounded-[34px] bg-[#8F64E1] cursor-pointer flex items-center justify-center">
				<button
					onClick={() => navigate("/teacher/history")}
					className="font-[Sora] font-semibold text-[18px] text-white leading-none flex items-center gap-2"
				>
					<Eye size={25} className="text-white" />
					View Poll history
				</button>
			</div>

			<div className="flex items-center gap-3 ml-91 mt-8.5">
				<h1 className="font-[Sora] text-[22px] font-semibold leading-none w-26.25 h-7">
					Question
				</h1>

				<p className="text-red-500 font-semibold mb-1.5">
					{timeLeft}s remaining
				</p>
			</div>


			<div className="w-181.75 h-88.25 mt-6.25 ml-91 gap-3.5" >
				<div className="h-12.25 w-181.75 opacity-100 rounded-t-[10px] p-4 bg-linear-to-r from-[#343434] to-[#6E6E6E]">

					<h2 className="font-[Sora] font-semibold text-white text-[17px] leading-none">{poll.question}</h2>
				</div>

				<div className="w-181.75 h-72.25 py-4.5 px-4 gap-3.75 flex flex-col">
					{poll.options.map((opt, index) => {
						const count = results[index] || 0;
						const percent = totalVotes
							? Math.round((count / totalVotes) * 100)
							: 0;

						return (
							<div
								key={index}
								className="relative flex items-center justify-between border-[1.5px] border-[#8F64E1] rounded-lg h-13.75 w-169.5  px-5.25 py-6.5 gap-3.75 overflow-hidden bg-white"
							>
								{/* Progress fill */}
								<div
									className="absolute left-0 top-0 h-full bg-[#8F64E1] transition-all"
									style={{ width: `${percent}%` }}
								/>

								{/* Left content */}
								<div className="relative z-10 flex items-center gap-3">
									<div className="w-6 h-6 rounded-[22px] pt-2.25 pr-2.5 pb-2.5 pl-2.5 gap-2.5 bg-white text-[#6766D5] flex justify-center items-center">
										{index + 1}
									</div>
									<span className="text-black text-[16px] font-[Sora] leading-none font-semibold">
										{opt}
									</span>
								</div>

								{/* Percentage */}
								<div className="relative z-10 text-black font-semibold">
									{percent}%
								</div>
							</div>
						);
					})}

				</div>


			</div>
			<div className="w-76.5 h-14.5 mt-7.25 ml-196.25 rounded-[34px] bg-linear-to-r from-[#8F64E1] to-[#1D68BD] flex items-center justify-center" >
				<button onClick={() => navigate("/teacher")} disabled={!canAskQuestion} className="w-48.5 h-5.75 font-[Sora] font-semibold text-[18px] leading-none cursor-pointer text-white" >+ Ask a new question</button>
			</div>

			<Chat onClick={() => setOpenChat(true)} className="cursor-pointer" />
			{openChat && (
				<ChatPopup name="teacher" role="teacher" pollId={poll._id} onClose={() => setOpenChat(false)} />
			)}


		</div>
	);
}