import { cn } from "@/lib/utils";

export default function Chip(
  props: React.HTMLAttributes<HTMLParagraphElement> & { variant: "orange" }
) {
  const { children, className, ...restProps } = props;

  return (
    <p
      className={cn(
        "text-orange-10 bg-orange-03 border-orange-06 rounded-sm border px-1.5 py-2 text-xs font-semibold",
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}
