import { cn } from "~/lib/style";

export function Page({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "min-h-svh w-full bg-black pt-20 text-slate-200 md:min-h-screen",
        className,
      )}
      {...props}
    >
      {props.children}
    </main>
  );
}
