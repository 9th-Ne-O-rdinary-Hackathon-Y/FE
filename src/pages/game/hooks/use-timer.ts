import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  initialTime: number;
  onTimeEnd?: () => void;
}

export function useTimer({ initialTime, onTimeEnd }: UseTimerOptions) {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          onTimeEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [onTimeEnd]);

  const progressPercentage = (remainingTime / initialTime) * 100;

  return {
    remainingTime,
    progressPercentage,
  };
}
