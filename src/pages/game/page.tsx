import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import FirstStep from "./components/first-step";
import SecondStep from "./components/second-step";
import ThirdStep from "./components/third-step";
import { type GameForm, gameSchema } from "./schema/game";

const DEFAULT_VALUES = {
  game_1: {
    client_x: 0,
    client_y: 0,
    answer_x: 0,
    answer_y: 0,
    ms: 0,
  },
  game_2: {
    question_1: undefined,
    question_2: undefined,
    question_3: undefined,
    question_4: undefined,
    question_5: undefined,
  },
  game_3: {
    select: 0,
  },
};

export default function GamePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentStep = searchParams.get("step") || "1";

  const form = useForm<GameForm>({
    resolver: zodResolver(gameSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const onResetGame = () => {
    form.reset(DEFAULT_VALUES);
    navigate("/");
  };

  switch (currentStep) {
    case "1":
      return <FirstStep form={form} />;
    case "2":
      return <SecondStep form={form} />;
    case "3":
      return <ThirdStep form={form} />;
    default:
      return (
        <section className="flex h-screen flex-col items-center justify-center space-y-5 px-5">
          <div className="text-center">
            <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
            <p className="text-gray-07 font-semibold">올바른 접근 방법을 사용해주세요.</p>
          </div>
          <Button onClick={onResetGame} className="w-full">
            처음부터 다시하기
          </Button>
        </section>
      );
  }
}
