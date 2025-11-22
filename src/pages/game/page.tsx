import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import FirstStep from "./components/first-step";
import SecondStep from "./components/second-step";
import ThirdStep from "./components/third-step";
import { useGetGames } from "./hooks/use-get-games";
import { type GameForm, gameSchema } from "./schema/game";

const DEFAULT_VALUES = {
  game1: {
    clientX: 0,
    clientY: 0,
    answerX: 0,
    answerY: 0,
    ms: 0,
  },
  game2: {
    question1: undefined,
    question2: undefined,
    question3: undefined,
    question4: undefined,
    question5: undefined,
  },
  game3: {
    select: 0,
  },
};

export default function GamePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentStep = searchParams.get("step") || "1";
  const { data: games = [], isLoading } = useGetGames();

  const form = useForm<GameForm>({
    resolver: zodResolver(gameSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const onResetGame = () => {
    form.reset();
    navigate("/");
  };

  switch (currentStep) {
    case "1":
      return <FirstStep form={form} isLoading={isLoading} />;
    case "2":
      return <SecondStep form={form} games={games} />;
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
