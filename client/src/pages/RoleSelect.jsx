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
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">

            <div>
                <PollBadge />
            </div>

            <div className="mt-[14.5px] w-245.45 flex flex-col items-center gap-1.25">
                <h3 className="font-[Sora] font-semibold text-[40px] leading-none text-black text-center">
                    Welcome to the <strong>Live Polling System</strong>
                </h3>

                <p className="font-[Sora] font-normal text-[19px] leading-none text-black/50 text-center">
                    Please select the role that best describes you to begin using the live polling system
                </p>
            </div>

            <div className="mt-12 flex md:flex-row gap-9.5 flex-col">
                <div
                    onClick={() => setRole("student")}
                    className={`rounded-xl cursor-pointer
                        ${role === "student"
                            ? "p-0.75 bg-linear-to-r from-[#8F64E1] to-[#1D68BD]"
                            : "border-[3px] border-[#D9D9D9]"
                        }`}
                >
                    <div className="w-96.75 h-35.75 rounded-[9px] bg-white flex flex-col gap-3 py-4 px-6">
                        <h1 className="font-[Sora] font-semibold text-[23px] text-black leading-tight">
                            I'm a Student
                        </h1>
                        <p className="font-[Sora] text-[16px] text-[#454545] leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        </p>
                    </div>
                </div>

                <div
                    onClick={() => setRole("teacher")}
                    className={`rounded-xl cursor-pointer
                        ${role === "teacher"
                            ? "p-0.75 bg-linear-to-r from-[#8F64E1] to-[#1D68BD]"
                            : "border-[3px] border-[#D9D9D9]"
                        }`}
                >
                    <div className="w-96.75 h-35.75 rounded-[9px] bg-white flex flex-col gap-3 py-4 px-6">
                        <h1 className="font-[Sora] font-semibold text-[23px] text-black leading-tight">
                            I'm a Teacher
                        </h1>
                        <p className="font-[Sora] text-[16px] text-[#454545] leading-relaxed">
                            Submit answers and view live poll results in real-time.
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={continueHandler}
                disabled={!role}
                className={`mt-12.5 w-[233.93px] h-[57.58px] rounded-[34px]
                 font-[Sora] font-semibold text-[16px] text-white
                 flex items-center justify-center transition
                    ${role
                        ? "bg-linear-to-r from-[#8F64E1] to-[#1D68BD] hover:opacity-90 active:scale-[0.98]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Continue
            </button>

        </div>
    );
}
