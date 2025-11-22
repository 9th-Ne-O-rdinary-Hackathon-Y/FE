import { api } from "@/lib/ky";
import type { GameForm } from "@/pages/game/schema/game";
import type { BaseResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";

interface CreateJobResponse {
  description: string;
  job: {
    priority: number;
    jobName: string;
    keyword_1: string;
    keyword_2: string;
    keyword_3: string;
    img: string;
    jobSummary: string;
  }[];
  persolaity: {
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
