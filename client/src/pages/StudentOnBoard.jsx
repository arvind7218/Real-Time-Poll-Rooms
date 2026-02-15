import React, { useState } from 'react';
import PollBadge from '../components/PollBadge';
import { useNavigate } from 'react-router-dom';

export default function StudentOnBoard() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = () => {

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Store email as studentId (unique per email)
    sessionStorage.setItem("studentEmail", email);
    sessionStorage.setItem("studentId", email);

    navigate("/student/poll");
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-white'>

      <PollBadge />

      <h3 className="mt-10 text-4xl font-semibold text-black text-center">
        Let's get started
      </h3>

      <p className="mt-4 text-lg text-black/50 text-center w-[600px]">
        Enter your email to participate in live polls and submit answers.
      </p>

      <div className='mt-10 w-[500px] flex flex-col gap-2'>
        <label className='text-lg font-medium'>Enter your Email</label>

        <input
          type='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setError('');
          }}
          className='h-12 rounded bg-[#F2F2F2] px-4 text-black text-lg'
          placeholder="example@email.com"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!email}
        className="mt-10 w-[230px] h-[55px] rounded-full
        text-white font-semibold
        bg-gradient-to-r from-[#8F64E1] to-[#1D68BD]
        hover:opacity-90 active:scale-95 transition"
      >
        Continue
      </button>

    </div>
  );
}
