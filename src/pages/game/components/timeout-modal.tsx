import AlertIcon from "@/assets/alert_icon.svg?react";
import { useGameResultStore } from "@/lib/zustand/game-result-store";

import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/button";

interface TimeoutModalProps {
  isOpen: boolean;
}

export function TimeoutModal({ isOpen }: TimeoutModalProps) {
  const navigate = useNavigate();
  const setGameResult = useGameResultStore((state) => state.setGameResult);

  if (!isOpen) return null;

  const handleGoHome = () => {
    setGameResult(null);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="bg-orange-01 max-w-mobile relative z-10 mx-5 flex w-full flex-col items-center gap-5 rounded-[22px] px-4 py-7">
        <div className="flex items-center gap-4">
          <AlertIcon />
          <p className="text-center text-sm font-semibold">
            제한시간 안에 선택하지 않아,
            <br />
            게임을 재시작해야 해요.
          </p>
        </div>

        <Button variant="default" onClick={handleGoHome} className="w-full">
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
