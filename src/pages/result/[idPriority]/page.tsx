import CatIcon from "@/assets/result_cat_icon.svg?react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Chip from "@/components/ui/chip";
import { WebviewEvent } from "@/constants/webview";
import { useWebView } from "@/hooks/use-webview";
import { useGameResultStore } from "@/lib/zustand/game-result-store";

import { ChevronLeft, Loader2 } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useGetJobDetail } from "./hooks/use-get-job-detail";

const BOOTCAMP_IMAGE_BASE_URL = import.meta.env.VITE_BOOTCAMP_IMAGE_BASE_URL;

export default function ResultDetailPage() {
  const navigate = useNavigate();
  const { idPriority } = useParams();
  const setGameResult = useGameResultStore((state) => state.setGameResult);

  const [id, priority] = idPriority?.split(",") ?? [];

  const { postMessage } = useWebView();
  const { data: jobDetail, isLoading, isError } = useGetJobDetail(id);

  if (!id || isError) {
    setGameResult(null);
    return <Navigate to="/" replace />;
  }

  const onOpenUrl = (url: string) => {
    postMessage(WebviewEvent.OPEN_URL, { url });
  };

  if (isLoading || !jobDetail) {
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <Loader2 className="text-key-01 size-10 animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex flex-col px-5 py-[calc(var(--spacing-safe-top)+12px)]">
      <button className="mb-4" onClick={() => navigate(-1)}>
        <ChevronLeft className="size-6 text-[#787A94]" />
      </button>
      <div className="text-gray-08 flex items-center gap-2">
        <p className="bg-orange-05 flex size-8 items-center justify-center rounded-full text-sm font-semibold">
          {priority}위
        </p>
        <p className="relative top-0.5 size-8 w-max text-lg font-bold">
          {jobDetail.getJobDto.name}
        </p>
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex gap-1.5">
          {jobDetail.getJobDto.keyword.map((keyword) => (
            <Chip key={keyword}># {keyword}</Chip>
          ))}
        </div>
        <div className="bg-orange-01 text-orange-10 flex flex-col gap-6 rounded-[12px] px-2 py-4 text-[15px]">
          <ul className="ml-4 list-inside list-disc">
            <li>{jobDetail.getJobDto.content}</li>
          </ul>
          <CatIcon className="self-end" />
        </div>
      </div>
      <div className="my-[52px] space-y-4">
        <h2 className="text-gray-08 text-2xl font-bold">관련 영상을 확인해보세요!</h2>
        {jobDetail.youtubeListDto.getYoutubeList.length === 0 ? (
          <p className="text-gray-08 py-10 text-center text-sm">관련 영상이 없어요.</p>
        ) : (
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent>
              {jobDetail.youtubeListDto.getYoutubeList.map((youtube) => (
                <CarouselItem key={`youtube-${youtube.youtubeId}`} className="flex-none">
                  <button
                    className="w-[180px] space-y-2 overflow-hidden"
                    onClick={() => onOpenUrl(youtube.URL)}
                  >
                    <img
                      src={youtube.image}
                      alt={youtube.title}
                      className="aspect-video shrink-0 rounded-[8px] object-cover"
                    />
                    <p className="line-clamp-2 text-start text-sm font-semibold text-[#292B41]">
                      {youtube.title}
                    </p>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-gray-08 text-2xl font-bold">관련 부트캠프를 확인해보세요!</h2>
        {jobDetail.bootcampListDTO.getBootcampList.length === 0 ? (
          <p className="text-gray-08 py-10 text-center text-sm">관련 부트캠프가 없어요.</p>
        ) : (
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent>
              {jobDetail.bootcampListDTO.getBootcampList.map((bootcamp) => (
                <CarouselItem key={`bootcamp-${bootcamp.bootcampId}`} className="flex-none">
                  <button
                    className="w-[180px] space-y-2 overflow-hidden"
                    onClick={() => onOpenUrl(bootcamp.URL)}
                  >
                    <img
                      src={`${BOOTCAMP_IMAGE_BASE_URL}/${bootcamp.image}`}
                      alt={bootcamp.name}
                      className="aspect-video shrink-0 rounded-[8px] object-cover"
                    />
                    <p className="line-clamp-2 text-start text-sm font-semibold text-[#292B41]">
                      {bootcamp.name}
                    </p>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </main>
  );
}
