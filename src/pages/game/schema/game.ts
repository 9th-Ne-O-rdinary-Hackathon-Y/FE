import { z } from "zod";

const gameSchema = z.object({
  game1: z.object({
    clientX: z.number(),
    clientY: z.number(),
    answerX: z.number(),
    answerY: z.number(),
    ms: z.number(),
  }),
  game2: z.object({
    question1: z.enum(["A", "B"]).optional(),
    question2: z.enum(["A", "B"]).optional(),
    question3: z.enum(["A", "B"]).optional(),
    question4: z.enum(["A", "B"]).optional(),
    question5: z.enum(["A", "B"]).optional(),
  }),
  game3: z.object({
    select: z.number(),
  }),
});

type GameForm = z.infer<typeof gameSchema>;

export { gameSchema, type GameForm };
