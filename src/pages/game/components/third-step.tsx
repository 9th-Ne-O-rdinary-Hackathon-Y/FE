import { useState } from "react";

import CatIcon from "@/assets/third_game_cat_icon.svg?react";
import ThirdStepIcon from "@/assets/third_game_icon.svg?react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { UseFormReturn } from "react-hook-form";

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

export default function ThirdStep({ form }: ThirdStepProps) {
  // TODO: form 연결하고 해당 데이터들로 API 요청하기
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  const onSelectAnswer = (style: number) => {
    setSelectedAnswer(style);
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">
          업무요청이 마구 들어온다!
          <br />
          먼저 처리할 요청은?
        </h1>
        <ThirdStepIcon className="mt-1" />
      </div>
      <div className="flex flex-col gap-3">
        <CatIcon className="mb-2.5 self-center" />
        {ANSWER_STYLES.map((answer) => (
          <Button
            className={cn(
              "rounded-full border py-4",
              selectedAnswer === answer.value
                ? "bg-orange-06 border-key-01"
                : "bg-orange-03 border-orange-06"
            )}
            key={answer.value}
            onClick={() => onSelectAnswer(answer.value)}
          >
            {answer.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
