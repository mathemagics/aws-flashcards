import { type PropsWithChildren } from "react";
import { cn } from "~/lib/style";

export function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center rounded-lg border p-8 backface-hidden even:[transform:rotateY(180deg)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
