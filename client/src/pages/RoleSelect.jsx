import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PollBadge from "../components/PollBadge";

export default function RoleSelect() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const continueHandler = () => {
        if (!role) {
            alert("Please select a role to continue");
            return;
        }

        localStorage.setItem("role", role);

        if (role === "student") navigate("/student");
        if (role === "teacher") navigate("/teacher");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-white to-[#eef2ff] flex flex-col items-center justify-center px-6">

            {/* Logo */}
            <div className="mb-6 animate-fade-in">
                <PollBadge />
            </div>

            {/* Heading Section */}
            <div className="text-center max-w-3xl">
                <h3 className="font-[Sora] font-bold text-[42px] text-gray-900 leading-tight">
                    Welcome to the{" "}
                    <span className="bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] bg-clip-text text-transparent">
                        Live Polling System
                    </span>
                </h3>

                <p className="mt-4 font-[Sora] text-[18px] text-gray-500">
                    Please select the role that best describes you to begin using the live polling system
                </p>
            </div>

            {/* Role Cards */}
            <div className="mt-14 flex md:flex-row flex-col gap-10">

                {/* Student Card */}
                <div
                    onClick={() => setRole("student")}
                    className={`relative w-[380px] h-[170px] rounded-2xl cursor-pointer transition-all duration-300
                        ${role === "student"
                            ? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] p-[3px] scale-105 shadow-2xl"
                            : "bg-white border border-gray-200 hover:shadow-xl hover:scale-105"
                        }`}
                >
                    <div className="w-full h-full bg-white rounded-2xl flex flex-col justify-center px-6">
                        <h1 className="font-[Sora] font-semibold text-[24px] text-gray-900">
                            👨‍🎓 I'm a Student
                        </h1>
                        <p className="mt-2 font-[Sora] text-[15px] text-gray-500 leading-relaxed">
                            Submit answers, participate in live polls, and compare responses in real time.
                        </p>
                    </div>
                </div>

                {/* Teacher Card */}
                <div
                    onClick={() => setRole("teacher")}
                    className={`relative w-[380px] h-[170px] rounded-2xl cursor-pointer transition-all duration-300
                        ${role === "teacher"
                            ? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] p-[3px] scale-105 shadow-2xl"
                            : "bg-white border border-gray-200 hover:shadow-xl hover:scale-105"
                        }`}
                >
                    <div className="w-full h-full bg-white rounded-2xl flex flex-col justify-center px-6">
                        <h1 className="font-[Sora] font-semibold text-[24px] text-gray-900">
                            👩‍🏫 I'm a Teacher
                        </h1>
                        <p className="mt-2 font-[Sora] text-[15px] text-gray-500 leading-relaxed">
                            Create questions, manage polls, and view live student results instantly.
                        </p>
                    </div>
                </div>

            </div>

            {/* Continue Button */}
            <button
                onClick={continueHandler}
                disabled={!role}
                className={`mt-14 w-[240px] h-[58px] rounded-full
                    font-[Sora] font-semibold text-[17px] text-white
                    transition-all duration-300 shadow-lg
                    ${role
                        ? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] hover:scale-105 hover:shadow-purple-400/40"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Continue →
            </button>

        </div>
    );
}
