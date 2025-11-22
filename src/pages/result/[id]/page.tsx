import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Chip from "@/components/ui/chip";
import { WebviewEvent } from "@/constants/webview";
import { useWebView } from "@/hooks/use-webview";

export default function ResultDetailPage() {
  // TODO: 직무 상세 조회 API 연동
  const { postMessage } = useWebView();

  const onOpenUrl = (url: string) => {
    postMessage(WebviewEvent.OPEN_URL, { url });
  };

  return (
    <main className="flex flex-col px-5 py-3">
      <div className="text-gray-08 flex items-center gap-2">
        <p className="bg-orange-05 flex size-8 items-center justify-center rounded-full text-sm font-semibold">
          1위
        </p>
        <p className="relative top-0.5 size-8 w-max text-lg font-bold">데이터 분석</p>
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex gap-1.5">
          <Chip variant="orange"># SQL 분석</Chip>
          <Chip variant="orange"># 통계적 사고</Chip>
          <Chip variant="orange"># 비지니스 인사이트</Chip>
        </div>
        <div className="bg-orange-01 text-orange-10 flex flex-col gap-6 rounded-[12px] px-2 py-4 text-[15px]">
          <ul className="ml-4 list-inside list-disc">
            <li>SQL・Phyton으로 데이터를 수집・정제・분석해요.</li>
          </ul>
          <img
            src="https://i.namu.wiki/i/8mcZn4QTDZNSyG5LCLIltEOwSsrMoAG9TKsurgtD2zMPJWqQCYvZUsL_66BkJy3JmN4lhegQHg_A2iGdD-AWLw.webp"
            alt="데이터 분석"
            className="size-[90px] shrink-0 self-end object-cover"
          />
        </div>
      </div>
      <div className="my-[52px] space-y-4">
        <h2 className="text-gray-08 text-2xl font-bold">관련 영상을 확인해보세요!</h2>
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent>
            <CarouselItem className="flex-none">
              <button
                className="w-[180px] space-y-2 overflow-hidden"
                onClick={() => onOpenUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
              >
                <img
                  src="https://i.namu.wiki/i/8mcZn4QTDZNSyG5LCLIltEOwSsrMoAG9TKsurgtD2zMPJWqQCYvZUsL_66BkJy3JmN4lhegQHg_A2iGdD-AWLw.webp"
                  alt="데이터 분석"
                  className="aspect-video shrink-0 rounded-[8px] object-cover"
                />
                <p className="line-clamp-2 text-start text-sm font-semibold text-[#292B41]">
                  유튜브 제목
                </p>
              </button>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="space-y-4">
        <h2 className="text-gray-08 text-2xl font-bold">관련 부트캠프를 확인해보세요!</h2>
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent>
            <CarouselItem className="flex-none">
              <button
                className="w-[180px] space-y-2 overflow-hidden"
                onClick={() => onOpenUrl("https://bootcamper.co.kr/class")}
              >
                <img
                  src="https://i.namu.wiki/i/8mcZn4QTDZNSyG5LCLIltEOwSsrMoAG9TKsurgtD2zMPJWqQCYvZUsL_66BkJy3JmN4lhegQHg_A2iGdD-AWLw.webp"
                  alt="데이터 분석"
                  className="aspect-video shrink-0 rounded-[8px] object-cover"
                />
                <p className="line-clamp-2 text-start text-sm font-semibold text-[#292B41]">
                  부트캠프 제목
                </p>
              </button>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
}
