import { useEffect, useState } from "react";

import SecondStepIcon from "@/assets/second_game_icon.svg?react";
import { cn } from "@/lib/utils";
import type { GameAnswer } from "@/pages/result/hooks/use-create-job";

import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TimeoutModal } from "./timeout-modal";
import {
  AnswerCard,
  AnswerCardContent,
  AnswerCardHeader,
} from "../../../components/ui/answer-card";
import { useTimer } from "../hooks/use-timer";
import type { GameForm } from "../schema/game";

interface SecondStepProps {
  form: UseFormReturn<GameForm>;
}

const TOTAL_TIME = 25;

// TODO: API 응답으로 받을 데이터
const ANSWER_STYLES = [
  [
    {
      label: "정해진 규정 내에서 일하기",
      value: "A" as const,
    },
    {
      label: "새로운 시도 계속하기",
      value: "B" as const,
    },
  ],
  [
    {
      label: "오타 없게 꼼꼼하게",
      value: "A" as const,
    },
    {
      label: "빠르게 넘기기",
      value: "B" as const,
    },
  ],
  [
    {
      label: "직감대로 선택",
      value: "A" as const,
    },
    {
      label: "근거 찾아보기",
      value: "B" as const,
    },
  ],
] as const;

const QUESTION_KEYS = ["question1", "question2", "question3", "question4", "question5"] as const;

export default function SecondStep({ form }: SecondStepProps) {
  const answers = form.watch("game2");
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const { progressPercentage } = useTimer({
    initialTime: TOTAL_TIME,
    onTimeEnd: () => {
      setIsTimeoutModalOpen(true);
    },
  });

  const handleSelectAnswer = (pairIndex: number, value: GameAnswer) => {
    form.setValue(`game2.${QUESTION_KEYS[pairIndex]}`, value);
  };

  const allAnswersSelected = ANSWER_STYLES.every(
    (_, index) => answers[QUESTION_KEYS[index]] !== undefined
  );

  useEffect(() => {
    if (allAnswersSelected) {
      navigate("?step=3");
    }
  }, [allAnswersSelected]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 px-5 pt-[calc(var(--spacing-safe-top)+12px)] pb-[calc(var(--spacing-safe-bottom)+12px)]">
      <div className="flex w-full items-center gap-2">
        <div className="text-2xl font-bold">내가 일하는 스타일은! </div>
        <SecondStepIcon />
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
        <div className="text-xs font-semibold">25초 안에 응답해주세요.</div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-7">
          {ANSWER_STYLES.map((pair, pairIndex) => {
            const isFirstSelected = answers[QUESTION_KEYS[pairIndex]] === "A";
            const isSecondSelected = answers[QUESTION_KEYS[pairIndex]] === "B";

            return (
              <div key={pairIndex} className="flex w-full flex-row items-center justify-between">
                <AnswerCard
                  className={cn(isFirstSelected && "bg-orange-03 border-key-01", "cursor-pointer")}
                  onClick={() => handleSelectAnswer(pairIndex, "A")}
                >
                  <AnswerCardHeader
                    type={pair[0].value}
                    className={isFirstSelected ? "text-key-01" : ""}
                  />
                  <AnswerCardContent
                    text={pair[0].label}
                    className={cn(
                      isFirstSelected && "[&>div:last-child]:text-orange-11 font-semibold"
                    )}
                  />
                </AnswerCard>
                <div className="font-normal">vs</div>
                <AnswerCard
                  className={cn(isSecondSelected && "bg-orange-03 border-key-01", "cursor-pointer")}
                  onClick={() => handleSelectAnswer(pairIndex, "B")}
                >
                  <AnswerCardHeader
                    type={pair[1].value}
                    className={isSecondSelected ? "text-key-01" : ""}
                  />
                  <AnswerCardContent
                    text={pair[1].label}
                    className={cn(
                      isSecondSelected && "[&>div:last-child]:text-orange-11 font-semibold"
                    )}
                  />
                </AnswerCard>
              </div>
            );
          })}
        </div>
      </div>
      <TimeoutModal isOpen={isTimeoutModalOpen} />
    </section>
  );
}
