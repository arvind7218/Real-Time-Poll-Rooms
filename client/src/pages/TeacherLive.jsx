import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { API } from "../api";
import React from "react";
import { usePollTimer } from "../hooks/usePollTime";
import { Eye, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import ChatPopup from "../components/ChatPopUp";

const api = API;

export default function TeacherLive() {
	const socket = useSocket();
	const [results, setResults] = useState({});
	const [poll, setPoll] = useState(null);
	const [openChat, setOpenChat] = useState(false);
	const [copied, setCopied] = useState(null);

	const navigate = useNavigate();
	const timeLeft = usePollTimer(poll);
	const canAskQuestion = timeLeft === 0;

	/* ===============================
	   Fetch & Socket Listeners
	================================ */
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

	/* ===============================
	   Auto End Poll
	================================ */
	useEffect(() => {
		if (timeLeft === 0 && poll?._id) {
			socket.emit("end_poll", poll._id);
		}
	}, [timeLeft]);

	/* ===============================
	   Share Poll Function
	================================ */
	const handleShare = () => {
		const link = `${window.location.origin}/student`;

		navigator.clipboard.writeText(link);

		setCopied(link);

		setTimeout(() => setCopied(null), 3000);
	};

	if (!poll) return null;

	const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

	return (
		<div className="min-h-screen bg-white relative">

			{/* History Button */}
			<div className="w-66.75 h-13.25 mt-15.5 ml-280 rounded-[34px] bg-[#8F64E1] cursor-pointer flex items-center justify-center shadow-lg hover:scale-105 transition">
				<button
					onClick={() => navigate("/teacher/history")}
					className="font-[Sora] font-semibold text-[18px] text-white leading-none flex items-center gap-2"
				>
					<Eye size={25} className="text-white" />
					View Poll history
				</button>
			</div>

			{/* Question + Timer + Share */}
			<div className="flex items-center justify-between ml-91 mt-8.5 w-181.75 relative">

				<div className="flex items-center gap-4">
					<h1 className="font-[Sora] text-[22px] font-semibold leading-none">
						Question
					</h1>

					<p className="text-red-500 font-semibold animate-pulse">
						{timeLeft}s remaining
					</p>
				</div>

				<button
					onClick={handleShare}
					className="flex items-center gap-2 px-6 py-2 rounded-full 
					bg-gradient-to-r from-[#8F64E1] via-indigo-500 to-[#1D68BD]
					text-white font-semibold text-[15px]
					shadow-lg hover:shadow-purple-400/50
					transition-all duration-300 hover:scale-110"
				>
					<Share2 size={18} />
					Share Poll
				</button>

				{/* URL Display Toast */}
				{copied && (
					<div className="absolute right-0 -bottom-14 bg-black text-white text-xs px-4 py-3 rounded-lg shadow-lg animate-bounce max-w-xs">
						<p className="break-all text-center">
							{copied}
						</p>
					</div>
				)}
			</div>

			{/* Poll Card */}
			<div className="w-181.75 h-88.25 mt-6.25 ml-91 gap-3.5">
				<div className="h-12.25 w-181.75 rounded-t-[10px] p-4 bg-gradient-to-r from-[#343434] to-[#6E6E6E]">
					<h2 className="font-[Sora] font-semibold text-white text-[17px] leading-none">
						{poll.question}
					</h2>
				</div>

				<div className="w-181.75 h-72.25 py-4.5 px-4 gap-4 flex flex-col">
					{poll.options.map((opt, index) => {
						const count = results[index] || 0;
						const percent = totalVotes
							? Math.round((count / totalVotes) * 100)
							: 0;

						return (
							<div
								key={index}
								className="relative flex items-center justify-between 
								border-[1.5px] border-[#8F64E1] 
								rounded-lg h-13.75 w-169.5 px-5 py-6
								overflow-hidden bg-white shadow-sm hover:shadow-md transition"
							>
								<div
									className="absolute left-0 top-0 h-full bg-[#8F64E1] opacity-30 transition-all duration-500"
									style={{ width: `${percent}%` }}
								/>

								<div className="relative z-10 flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-white text-[#6766D5] flex justify-center items-center shadow">
										{index + 1}
									</div>
									<span className="text-black text-[16px] font-[Sora] font-semibold">
										{opt}
									</span>
								</div>

								<div className="relative z-10 text-black font-semibold">
									{percent}%
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Ask New Question */}
			<div className="w-76.5 h-14.5 mt-7.25 ml-196.25 rounded-[34px] 
			bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] 
			flex items-center justify-center shadow-lg hover:scale-105 transition">
				<button
					onClick={() => navigate("/teacher")}
					disabled={!canAskQuestion}
					className="font-[Sora] font-semibold text-[18px] text-white"
				>
					+ Ask a new question
				</button>
			</div>

			{/* Chat */}
			<Chat onClick={() => setOpenChat(true)} className="cursor-pointer" />
			{openChat && (
				<ChatPopup
					name="teacher"
					role="teacher"
					pollId={poll._id}
					onClose={() => setOpenChat(false)}
				/>
			)}

		</div>
	);
}
