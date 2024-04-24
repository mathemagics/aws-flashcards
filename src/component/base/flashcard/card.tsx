import { type PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="backface-hidden absolute flex h-[400px] w-[600px] flex-col items-center justify-center even:[transform:rotateY(180deg)]">
      {children}
    </div>
  );
}
