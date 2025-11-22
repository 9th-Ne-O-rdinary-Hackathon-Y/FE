import type { CreateJobResponse } from "@/pages/result/hooks/use-create-job";

import { create } from "zustand";

interface GameResultStore {
  gameResult: CreateJobResponse | null;
  setGameResult: (gameResult: CreateJobResponse | null) => void;
}

export const useGameResultStore = create<GameResultStore>((set) => ({
  gameResult: null,
  setGameResult: (gameResult: CreateJobResponse | null) => set({ gameResult }),
}));
