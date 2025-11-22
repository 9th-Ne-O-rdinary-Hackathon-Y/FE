import AlertIcon from "@/assets/alert_icon.svg?react";

import { Link } from "react-router-dom";

import { Button } from "../../../components/ui/button";

interface TimeoutModalProps {
  isOpen: boolean;
}

export function TimeoutModal({ isOpen }: TimeoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="bg-orange-01 relative z-10 flex w-[335px] flex-col items-center gap-5 rounded-[22px] px-4 py-7">
        <div className="flex items-center gap-4">
          <AlertIcon />
          <p className="text-center text-sm font-semibold">
            제한시간 안에 선택하지 않아,
            <br />
            게임을 재시작해야 해요.
          </p>
        </div>
        <Button variant="default" asChild className="flex w-full items-center px-3 py-4">
          <Link to={`/`}>
            <div className="flex items-center gap-[5px]">처음으로 돌아가기</div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
