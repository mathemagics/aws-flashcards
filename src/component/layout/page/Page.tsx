import { cn } from "~/lib/style";

export function Page({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "flex min-h-svh w-full flex-col items-center justify-center bg-black text-slate-200 md:min-h-screen",
        className,
      )}
      {...props}
    >
      {props.children}
    </main>
  );
}
