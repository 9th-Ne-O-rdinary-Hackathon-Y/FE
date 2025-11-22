import { z } from "zod";

const gameSchema = z.object({
  game_1: z.object({
    client_x: z.number(),
    client_y: z.number(),
    answer_x: z.number(),
    answer_y: z.number(),
    ms: z.number(),
  }),
  game_2: z.object({
    question_1: z.enum(["A", "B"]).optional(),
    question_2: z.enum(["A", "B"]).optional(),
    question_3: z.enum(["A", "B"]).optional(),
    question_4: z.enum(["A", "B"]).optional(),
    question_5: z.enum(["A", "B"]).optional(),
  }),
  game_3: z.object({
    select: z.number(),
  }),
});

type GameForm = z.infer<typeof gameSchema>;

export { gameSchema, type GameForm };
