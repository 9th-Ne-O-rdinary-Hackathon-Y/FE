import { api } from "@/lib/ky";
import type { BaseResponse } from "@/types/base";
import { useQuery } from "@tanstack/react-query";

interface GetJobDetailResponse {
  getJobDto: {
    name: string;
    keyword: string[];
    content: string;
    image: string;
  };
  youtubeListDto: {
    getYoutubeList: {
      youtubeId: number;
      title: string;
      URL: string;
      image: string;
    }[];
  };
  bootcampListDTO: {
    getBootcampList: {
      bootcampId: number;
      name: string;
      URL: string;
      image: string;
    }[];
  };
}

const getJobDetail = async (jobId: string): Promise<BaseResponse<GetJobDetailResponse>> => {
  return api.get("job/detail", { searchParams: { jobId } }).json();
};

const useGetJobDetail = (jobId?: string) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobDetail(jobId as string),
    select: (data) => data.data,
    enabled: !!jobId,
  });
};

export { useGetJobDetail };
