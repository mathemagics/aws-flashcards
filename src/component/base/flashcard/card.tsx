import { type PropsWithChildren } from "react";
import { cn } from "~/lib/style";

export function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center rounded-lg border bg-neutral-950 p-8 backface-hidden even:[transform:rotateY(180deg)] lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
