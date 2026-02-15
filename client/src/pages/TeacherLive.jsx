import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { API } from "../api";
import React from "react";
import { usePollTimer } from "../hooks/usePollTime";
import { Eye, Share2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import ChatPopup from "../components/ChatPopUp";

const api = API;

export default function TeacherLive() {
	const socket = useSocket();
	const [results, setResults] = useState({});
	const [poll, setPoll] = useState(null);
	const [openChat, setOpenChat] = useState(false);
	const [copied, setCopied] = useState(false);

	const navigate = useNavigate();
	const timeLeft = usePollTimer(poll);
	const canAskQuestion = timeLeft === 0;

	/* ===============================
	   Fetch Active Poll + Socket
	================================ */
	useEffect(() => {
		fetch(`${api}/api/poll/active`)
			.then(res => res.json())
			.then(data => {
				if (data?.active) setPoll(data);
			})
			.catch(err => console.error(err));

		socket.on("poll_started", (newPoll) => {
			setPoll(newPoll);
			setResults({});
		});

		socket.on("poll_results", (data) => {
			setResults(data);
		});

		socket.on("poll_ended", () => {
			setPoll(null);
		});

		return () => {
			socket.off("poll_started");
			socket.off("poll_results");
			socket.off("poll_ended");
		};
	}, [socket]);

	/* ===============================
	   Auto End Poll When Timer Ends
	================================ */
	useEffect(() => {
		if (timeLeft === 0 && poll?._id) {
			socket.emit("end_poll", poll._id);
		}
	}, [timeLeft, poll?._id, socket]);

	/* ===============================
	   FIXED SHARE LINK (Production Safe)
	================================ */
	const handleShare = async () => {
		// const link = `${window.location.origin}/student/poll`;
		const link = `https://real-time-poll-rooms-f.onrender.com`;

		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
		} catch (err) {
			console.error("Copy failed:", err);
		}

		setTimeout(() => setCopied(false), 3000);
	};

	if (!poll) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
				No active poll running
			</div>
		);
	}

	const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

	return (
		<div className="min-h-screen bg-white relative px-10">

			{/* Top Controls */}
			<div className="flex justify-between items-center mt-10">

				<button
					onClick={() => navigate("/teacher/history")}
					className="flex items-center gap-2 px-6 py-3 rounded-full 
					bg-gradient-to-r from-[#8F64E1] to-[#1D68BD]
					text-white font-semibold shadow-lg hover:scale-105 transition"
				>
					<Eye size={20} />
					View Poll History
				</button>

				<button
					onClick={handleShare}
					className="flex items-center gap-2 px-6 py-3 rounded-full 
					bg-gradient-to-r from-[#8F64E1] via-indigo-500 to-[#1D68BD]
					text-white font-semibold shadow-lg hover:scale-110 transition"
				>
					{copied ? <Check size={18} /> : <Share2 size={18} />}
					{copied ? "Copied!" : "Share Poll"}
				</button>
			</div>

			{/* Question + Timer */}
			<div className="mt-12 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">
					Live Question
				</h1>

				<p className="text-red-500 font-bold text-lg animate-pulse">
					⏳ {timeLeft}s remaining
				</p>
			</div>

			{/* Poll Card */}
			<div className="mt-6 border rounded-xl shadow-md overflow-hidden">

				{/* Question */}
				<div className="bg-gradient-to-r from-[#343434] to-[#6E6E6E] p-5">
					<h2 className="text-white text-lg font-semibold">
						{poll.question}
					</h2>
				</div>

				{/* Options */}
				<div className="p-6 space-y-4">
					{poll.options.map((opt, index) => {
						const count = results[index] || 0;
						const percent = totalVotes
							? Math.round((count / totalVotes) * 100)
							: 0;

						return (
							<div
								key={index}
								className="relative border border-[#8F64E1] rounded-lg h-14 flex items-center justify-between px-5 overflow-hidden"
							>
								<div
									className="absolute left-0 top-0 h-full bg-[#8F64E1] opacity-30 transition-all duration-500"
									style={{ width: `${percent}%` }}
								/>

								<div className="relative z-10 flex items-center gap-3">
									<div className="w-7 h-7 rounded-full bg-white text-[#6766D5] flex items-center justify-center shadow font-semibold">
										{index + 1}
									</div>
									<span className="font-semibold text-black">
										{opt}
									</span>
								</div>

								<div className="relative z-10 font-semibold text-black">
									{percent}%
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Ask New Question */}
			<div className="flex justify-center mt-10">
				<button
					onClick={() => navigate("/teacher")}
					disabled={!canAskQuestion}
					className={`px-10 py-4 rounded-full text-white font-semibold shadow-lg transition
						${canAskQuestion
							? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] hover:scale-105"
							: "bg-gray-400 cursor-not-allowed"
						}`}
				>
					+ Ask New Question
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
