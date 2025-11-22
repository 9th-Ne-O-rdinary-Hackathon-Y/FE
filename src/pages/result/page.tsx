import { Button } from "@/components/ui/button";
import { useGameResultStore } from "@/lib/zustand/game-result-store";

import { Navigate, useNavigate } from "react-router-dom";

import AnalyzeResult from "./components/analyze-result";

export default function ResultPage() {
  const navigate = useNavigate();

  const gameResult = useGameResultStore((state) => state.gameResult);

  const onRestart = () => {
    navigate("/");
  };

  if (!gameResult) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex flex-col px-5 pt-[calc(var(--spacing-safe-top)+12px)] pb-[calc(var(--spacing-safe-bottom)+16px)]">
      <h1 className="mb-6 text-2xl font-bold">{gameResult.description}</h1>
      <div className="space-y-6">
        {gameResult.job.map((result) => (
          <AnalyzeResult key={result.jobId} {...result} />
        ))}
      </div>
      <div className="my-[52px] space-y-3">
        <h1 className="text-2xl font-bold">나의 성향은 !</h1>
        <div className="bg-orange-00 grid grid-cols-2 gap-5 rounded-[12px] px-6 py-[30px] text-nowrap">
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              리스크 감수
            </p>
            <p className="text-orange-10 font-semibold">{gameResult.personality.riskTaking}</p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              실행 속도
            </p>
            <p className="text-orange-10 font-semibold">
              {Math.round(gameResult.personality.pace)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              정확도 선호
            </p>
            <p className="text-orange-10 font-semibold">
              {Math.round(gameResult.personality.accuracy)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              판단 방식
            </p>
            <p className="text-orange-10 font-semibold">{gameResult.personality.workStyle}</p>
          </div>
        </div>
      </div>
      <Button variant="secondary" onClick={onRestart} className="w-full">
        게임 다시하기
      </Button>
    </main>
  );
}
