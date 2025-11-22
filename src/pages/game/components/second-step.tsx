import { useEffect, useState } from "react";

import SecondStepIcon from "@/assets/second_game_icon.svg?react";
import { cn } from "@/lib/utils";

import { TimeoutModal } from "./timeout-modal";
import {
  AnswerCard,
  AnswerCardContent,
  AnswerCardHeader,
} from "../../../components/ui/answer-card";
import { useTimer } from "../hooks/use-timer";

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

export default function SecondStep() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B">>({});
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);

  const { remainingTime, progressPercentage } = useTimer({
    initialTime: TOTAL_TIME,
    onTimeEnd: () => {
      setIsTimeoutModalOpen(true);
    },
  });

  const handleSelectAnswer = (pairIndex: number, value: "A" | "B") => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [pairIndex]: value,
    }));
  };

  const allAnswersSelected = ANSWER_STYLES.every(
    (_, index) => selectedAnswers[index] !== undefined
  );

  // TODO: 모든 답변이 선택되었을 때 또는 시간이 끝났을 때 처리
  useEffect(() => {
    if (allAnswersSelected || remainingTime === 0) {
      // TODO: 다음 단계로 이동하는 로직 추가
    }
  }, [allAnswersSelected, remainingTime, selectedAnswers]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center gap-2">
        <div className="text-2xl font-bold">내가 일하는 스타일은! </div>
        <SecondStepIcon />
      </div>

      <div className="mb-4 flex w-[335px] flex-col items-end justify-center gap-3">
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

      <div>
        <div className="flex flex-col items-center justify-center gap-7">
          {ANSWER_STYLES.map((pair, pairIndex) => {
            const isFirstSelected = selectedAnswers[pairIndex] === "A";
            const isSecondSelected = selectedAnswers[pairIndex] === "B";

            return (
              <div key={pairIndex} className="flex flex-row items-center justify-center gap-4.5">
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
