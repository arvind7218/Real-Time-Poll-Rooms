import { useEffect, useState } from "react";

export const usePollTimer = (poll) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!poll?.startTime) return;

    const interval = setInterval(() => {
      const elapsed =
        (Date.now() - new Date(poll.startTime).getTime()) / 1000;

      const remaining = Math.max(poll.duration - elapsed, 0);
      setTimeLeft(Math.floor(remaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [poll]);

  return timeLeft;
};
