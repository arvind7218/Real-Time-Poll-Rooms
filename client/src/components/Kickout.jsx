import React from 'react'
import PollBadge from './PollBadge'

export default function Kickout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <PollBadge />

      <h1 className="mt-6 text-2xl font-semibold">
        You’ve been Kicked out !
      </h1>

      <p className="mt-2 text-black/60 text-center">
        Looks like the teacher had removed you from the poll system.
        <br />
        Please try again sometime.
      </p>
    </div>
  )
}
