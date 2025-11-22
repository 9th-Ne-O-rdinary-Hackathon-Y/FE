import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import AnalyzeResult from "./components/analyze-result";

const analyzeResults = [
  {
    id: 1,
    rank: 1,
    title: "데이터 분석",
    tags: ["SQL 분석", "통계적 사고", "비지니스 인사이트"],
    thumbnail:
      "https://i.namu.wiki/i/8mcZn4QTDZNSyG5LCLIltEOwSsrMoAG9TKsurgtD2zMPJWqQCYvZUsL_66BkJy3JmN4lhegQHg_A2iGdD-AWLw.webp",
    description:
      "데이터를 분석해 인사이트를 만들고 문제를 해결하는 직무에요. 의사결정 데이터 기반으로 지원하는 역할이에요.",
  },
  {
    id: 2,
    rank: 2,
    title: "운영(Operation)",
    tags: ["정확성", "프로세스 관리", "리스크 대응"],
  },
];

export default function ResultPage() {
  const navigate = useNavigate();

  const onRestart = () => {
    // TODO: 분석 결과 전역상태 초기화하기
    navigate("/");
  };

  return (
    <main className="flex flex-col px-5 pt-3 pb-4">
      <h1 className="mb-6 text-2xl font-bold">
        분석적으로 안정을 추구하며,
        <br />
        정확하게 처리하는 성향이에요.
      </h1>
      <div className="space-y-6">
        {analyzeResults.map((result) => (
          <AnalyzeResult key={result.id} {...result} />
        ))}
      </div>
      <div className="my-[52px] space-y-3">
        <h1 className="text-2xl font-bold">나의 성향은 !</h1>
        <div className="bg-orange-00 grid grid-cols-2 gap-5 rounded-[12px] px-6 py-[30px] text-nowrap">
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              리스크 감수
            </p>
            <p className="text-orange-10 font-semibold">위험 감수</p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              실행 속도
            </p>
            <p className="text-orange-10 font-semibold">100</p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              정확도 선호
            </p>
            <p className="text-orange-10 font-semibold">10</p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <p className="bg-orange-02 text-orange-08 border-orange-05 rounded-[8px] border px-2.5 py-1.5 font-medium">
              판단 방식
            </p>
            <p className="text-orange-10 font-semibold">직관</p>
          </div>
        </div>
      </div>
      <Button variant="secondary" onClick={onRestart} className="w-full">
        게임 다시하기
      </Button>
    </main>
  );
}
