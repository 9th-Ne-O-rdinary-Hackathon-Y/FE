import { api } from "@/lib/ky";
import type { BaseResponse } from "@/types/base";
import { useQuery } from "@tanstack/react-query";

interface GetGamesResponse {
  games: {
    id: number;
    icon: string;
    content: string;
    contentNum: number;
  }[];
}

const getGames = async (): Promise<BaseResponse<GetGamesResponse>> => {
  return api.get("game").json();
};

const useGetGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: () => getGames(),
    select: (data) => data.data.games,
  });
};

export { useGetGames, type GetGamesResponse };
