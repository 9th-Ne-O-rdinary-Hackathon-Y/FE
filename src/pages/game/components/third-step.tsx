import { useState } from "react";

import CatIcon from "@/assets/third_game_cat_icon.svg?react";
import ThirdStepIcon from "@/assets/third_game_icon.svg?react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGameResultStore } from "@/lib/zustand/game-result-store";
import { useCreateJob } from "@/pages/result/hooks/use-create-job";
import { errorToast } from "@/utils/toast";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TimeoutModal } from "./timeout-modal";
import { useTimer } from "../hooks/use-timer";
import type { GameForm } from "../schema/game";

interface ThirdStepProps {
  form: UseFormReturn<GameForm>;
}

const ANSWER_STYLES = [
  {
    label: "A. 회사에서 장기적으로 중요한 요청",
    value: 1,
  },
  {
    label: "B. 고객 이팩트가 큰 요청",
    value: 2,
  },
  {
    label: "C. 내가 빨리, 잘 처리 가능한 요청",
    value: 3,
  },
];

const TOTAL_TIME = 12;

export default function ThirdStep({ form }: ThirdStepProps) {
  const navigate = useNavigate();
  const setGameResult = useGameResultStore((state) => state.setGameResult);

  const { mutateAsync: createJob } = useCreateJob();
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);

  const selectedAnswer = form.watch("game3.select");

  const { progressPercentage } = useTimer({
    initialTime: TOTAL_TIME,
    onTimeEnd: () => {
      setIsTimeoutModalOpen(true);
    },
  });

  const onSubmitAnswers = (value: number) => {
    form.setValue("game3.select", value);
    form.handleSubmit(async (data) => {
      try {
        const body = { ...data, game3: { select: value } };
        const response = await createJob(body);
        setGameResult(response.data);
        navigate("/result");
      } catch (error) {
        errorToast("잠시 후 다시 시도해주세요.");
        console.error(error);
      }
    })();
  };

  return (
    <>
      <main className="flex h-screen flex-col justify-between px-5 pt-[calc(var(--spacing-safe-top)+12px)] pb-[calc(var(--spacing-safe-bottom)+24px)]">
        <div className="space-y-4">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">
              업무요청이 마구 들어온다!
              <br />
              먼저 처리할 요청은?
            </h1>
            <ThirdStepIcon className="mt-1" />
          </div>
          <div className="mb-4 flex w-full flex-col items-end justify-center gap-3">
            <div className="relative h-[20px] w-full">
              <div className="bg-gray-03 h-[20px] w-full rounded-full" />

              <div
                className="bg-orange-05 absolute top-0 left-0 h-[20px] rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />

              <div
                className="bg-key-02 absolute top-1/2 h-[32px] w-[32px] -translate-y-1/2 rounded-full transition-all duration-1000"
                style={{
                  left: `calc(${progressPercentage}% - 16px)`,
                }}
              />
            </div>
            <div className="text-xs font-semibold">12초 안에 응답해주세요.</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <CatIcon className="mb-2.5 self-center" />
          {ANSWER_STYLES.map((answer) => (
            <Button
              disabled={form.formState.isSubmitting}
              className={cn(
                "rounded-full border py-4",
                selectedAnswer === answer.value
                  ? "bg-orange-06 border-key-01"
                  : "bg-orange-03 border-orange-06"
              )}
              key={answer.value}
              onClick={() => onSubmitAnswers(answer.value)}
            >
              {answer.label}
            </Button>
          ))}
        </div>
      </main>
      <TimeoutModal isOpen={isTimeoutModalOpen} />
    </>
  );
}
