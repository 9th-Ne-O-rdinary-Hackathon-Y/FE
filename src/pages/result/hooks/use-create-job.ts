import { api } from "@/lib/ky";
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

interface CreateJobRequest {
  game_1: {
    client_x: number;
    client_y: number;
    answer_x: number;
    answer_y: number;
    ms: number;
  };
  game_2: {
    question_1: GameAnswer;
    question_2: GameAnswer;
    question_3: GameAnswer;
    question_4: GameAnswer;
    question_5: GameAnswer;
  };
  game_3: {
    select: number;
  };
}

const createJob = async (request: CreateJobRequest): Promise<CreateJobResponse> => {
  return api.post("job", { json: request }).json();
};

const useCreateJob = () => {
  return useMutation({
    mutationFn: createJob,
  });
};

export { useCreateJob, type CreateJobResponse, type CreateJobRequest, type GameAnswer };
