import * as React from "react";

import { cn } from "@/lib/utils";

const AnswerCard = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cn(
      "bg-orange-01 flex min-h-[108px] w-[160px] flex-col items-center justify-center gap-2 rounded-xl border border-transparent px-4 pt-2.5 pb-4 transition-colors",
      className
    )}
    {...props}
  />
);

const AnswerCardHeader = ({
  className,
  ref,
  type,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
  type: "A" | "B";
}) => (
  <div ref={ref} className={cn("text-key-02", className)} {...props}>
    {type}
  </div>
);

const AnswerCardContent = ({
  className,
  ref,
  text,
  icon,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
  text: string;
  icon: string;
}) => (
  <div
    ref={ref}
    className={cn("flex flex-row items-center justify-center gap-2", className)}
    {...props}
  >
    <img src={icon} alt={text} width={28} height={28} />
    <div className="text-orange-09 flex min-h-[34px] max-w-[90px] min-w-[90px] items-center justify-center text-center font-medium">
      {text}
    </div>
  </div>
);

export { AnswerCard, AnswerCardHeader, AnswerCardContent };
