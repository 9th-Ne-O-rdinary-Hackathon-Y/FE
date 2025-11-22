import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-5 px-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요.</h1>
        <p className="text-gray-07 font-semibold">메인 페이지로 돌아가서 다시 시도해주세요.</p>
      </div>
      <Button asChild className="w-full">
        <Link to="/">메인 페이지로 돌아가기</Link>
      </Button>
    </main>
  );
}
