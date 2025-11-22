import { useEffect, useMemo, useState } from "react";

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
import type { GetGamesResponse } from "../hooks/use-get-games";
import { useTimer } from "../hooks/use-timer";
import type { GameForm } from "../schema/game";

interface SecondStepProps {
  form: UseFormReturn<GameForm>;
  games: GetGamesResponse["games"];
}

const TOTAL_TIME = 25;

const QUESTION_KEYS = ["question1", "question2", "question3", "question4", "question5"] as const;

export default function SecondStep({ form, games }: SecondStepProps) {
  const navigate = useNavigate();
  const answers = form.watch("game2");
  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => a.id - b.id);
  }, [games]);

  const gamePairs = useMemo(() => {
    const pairs: Array<[(typeof games)[0], (typeof games)[0]]> = [];
    for (let i = 0; i < sortedGames.length; i += 2) {
      if (i + 1 < sortedGames.length) {
        pairs.push([sortedGames[i], sortedGames[i + 1]]);
      }
    }
    return pairs;
  }, [sortedGames]);

  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState(false);

  const { progressPercentage } = useTimer({
    initialTime: TOTAL_TIME,
    onTimeEnd: () => {
      setIsTimeoutModalOpen(true);
    },
  });

  const handleSelectAnswer = (pairIndex: number, value: GameAnswer) => {
    form.setValue(`game2.${QUESTION_KEYS[pairIndex]}`, value);
  };

  const allAnswersSelected = QUESTION_KEYS.every((key) => answers[key] !== undefined);

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
          {gamePairs.map((pair, pairIndex) => {
            const isFirstSelected = answers[QUESTION_KEYS[pairIndex]] === "A";
            const isSecondSelected = answers[QUESTION_KEYS[pairIndex]] === "B";

            return (
              <div key={pairIndex} className="flex w-full flex-row items-center justify-between">
                <AnswerCard
                  className={cn(isFirstSelected && "bg-orange-03 border-key-01", "cursor-pointer")}
                  onClick={() => handleSelectAnswer(pairIndex, "A")}
                >
                  <AnswerCardHeader type="A" className={isFirstSelected ? "text-key-01" : ""} />
                  <AnswerCardContent
                    icon={pair[0].icon}
                    text={pair[0].content}
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
                  <AnswerCardHeader type="B" className={isSecondSelected ? "text-key-01" : ""} />
                  <AnswerCardContent
                    icon={pair[1].icon}
                    text={pair[1].content}
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
