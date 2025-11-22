import { api } from "@/lib/ky";
import type { GameForm } from "@/pages/game/schema/game";
import type { BaseResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";

interface CreateJobResponse {
  description: string;
  job: {
    priority: number;
    jobName: string;
    jobId: number;
    keywords: string[];
    img: string;
    jobSummary: string;
  }[];
  personality: {
    riskTaking: string;
    pace: number;
    accuracy: number;
    workStyle: string;
  };
}

type GameAnswer = "A" | "B";

const createJob = async (request: GameForm): Promise<BaseResponse<CreateJobResponse>> => {
  return api.post("job", { json: request }).json();
};

const useCreateJob = () => {
  return useMutation({
    mutationFn: createJob,
  });
};

export { useCreateJob, type CreateJobResponse, type GameAnswer };
