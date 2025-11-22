import OnboardingIcon from "@/assets/onboarding_icon.svg?react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function RootPage() {
  return (
    <main className="flex h-screen flex-col px-5 py-14">
      <section className="flex flex-1 flex-col items-center justify-center space-y-[68px]">
        <div className="space-y-5 text-center">
          <h1 className="text-gray-08 text-2xl font-bold">
            간단한 게임을 통해
            <br />
            나의 직군을 추천해드릴게요!
          </h1>
          <h2 className="text-gray-07 font-semibold">나는 어떤 직업이 잘 어울릴까?</h2>
        </div>
        <OnboardingIcon />
      </section>
      <Button variant="secondary" asChild className="w-full">
        <Link to="/game">게임 시작하기</Link>
      </Button>
    </main>
  );
}
