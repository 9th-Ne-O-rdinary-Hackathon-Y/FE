import BookIcon from "@/assets/book_icon.svg?react";
import CatIcon from "@/assets/result_cat_icon.svg?react";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chip";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { CreateJobResponse } from "../hooks/use-create-job";

export default function AnalyzeResult({
  priority,
  jobId,
  jobName,
  keywords,
  jobSummary,
}: CreateJobResponse["job"][number]) {
  return (
    <section className="bg-orange-01 space-y-6 rounded-[18px] px-3.5 py-3">
      <div className="space-y-[18px]">
        <div className="space-y-2">
          <div className="text-gray-08 flex items-center gap-2">
            <p className="bg-orange-05 flex size-8 items-center justify-center rounded-full text-sm font-semibold">
              {priority}위
            </p>
            <p className="relative top-0.5 size-8 w-max text-lg font-bold">{jobName}</p>
          </div>
          <div className="flex gap-1.5">
            {keywords.map((keyword) => (
              <Chip key={`${priority}-${keyword}`}># {keyword}</Chip>
            ))}
          </div>
        </div>
        {priority === 1 && (
          <div className="flex items-center gap-2">
            <CatIcon className="h-24 shrink-0" />
            <p className="text-orange-10 text-sm">{jobSummary}</p>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        asChild
        className="flex w-full items-center justify-between px-3 py-2"
      >
        <Link to={`/result/${jobId},${priority}`}>
          <div className="flex items-center gap-[5px]">
            <BookIcon className="shrink-0" />
            <p className="text-orange-10 text-sm font-semibold">직무 자세히 보기</p>
          </div>
          <ChevronRight className="text-orange-09 size-6" />
        </Link>
      </Button>
    </section>
  );
}
