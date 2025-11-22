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
      "group bg-orange-01 hover:bg-orange-03 active:bg-orange-03 active:border-key-01 flex flex-col items-center justify-center gap-2 rounded-xl border border-[1px] border-transparent px-4 pt-2.5 pb-4 transition-colors",
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
  <div ref={ref} className={cn("text-key-02 group-active:text-key-01", className)} {...props}>
    {type}
  </div>
);

const AnswerCardContent = ({
  className,
  ref,
  text,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
  text: string;
}) => (
  <div
    ref={ref}
    className={cn("flex flex-row items-center justify-center gap-2", className)}
    {...props}
  >
    <div className="bg-orange-05 h-[28px] w-[28px]" />
    <div className="text-orange-09 group-active:text-orange-11 flex min-h-[34px] max-w-[90px] items-center justify-center text-center font-medium group-active:font-semibold">
      {text}
    </div>
  </div>
);

export { AnswerCard, AnswerCardHeader, AnswerCardContent };
