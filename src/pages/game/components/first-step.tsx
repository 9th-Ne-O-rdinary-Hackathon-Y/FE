import type { UseFormReturn } from "react-hook-form";

import type { GameForm } from "../schema/game";

interface FirstStepProps {
  form: UseFormReturn<GameForm>;
}

export default function FirstStep({ form }: FirstStepProps) {
  return <section>FirstStep</section>;
}
