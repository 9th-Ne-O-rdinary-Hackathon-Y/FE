import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chip";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalyzeResultProps {
  id: number;
  rank: number;
  title: string;
  tags: string[];
  thumbnail?: string;
  description?: string;
}

export default function AnalyzeResult({
  id,
  rank,
  title,
  tags,
  thumbnail,
  description,
}: AnalyzeResultProps) {
  return (
    <section className="bg-orange-01 space-y-6 rounded-[18px] px-3.5 py-3">
      <div className="space-y-[18px]">
        <div className="space-y-2">
          <div className="text-gray-08 flex items-center gap-2">
            <p className="bg-orange-05 flex size-8 items-center justify-center rounded-full text-sm font-semibold">
              {rank}위
            </p>
            <p className="relative top-0.5 size-8 w-max text-lg font-bold">{title}</p>
          </div>
          <div className="flex gap-1.5">
            {tags.map((tag) => (
              <Chip key={`${rank}-${tag}`} variant="orange">
                # {tag}
              </Chip>
            ))}
          </div>
        </div>
        {thumbnail && (
          <div className="flex items-center gap-2">
            <img src={thumbnail} alt={title} className="size-24 shrink-0 object-cover" />
            <p className="text-orange-10 text-sm">{description}</p>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        asChild
        className="flex w-full items-center justify-between px-3 py-2"
      >
        <Link to={`/result/${id}`}>
          <div className="flex items-center gap-[5px]">
            <div className="bg-gray-03 size-6 shrink-0" />
            <p className="text-orange-10 text-sm font-semibold">직무 자세히 보기</p>
          </div>
          <ChevronRight className="text-orange-09 size-6" />
        </Link>
      </Button>
    </section>
  );
}
