import { cn } from "~/lib/style";

export function Page({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "min-h-svh w-full bg-gradient-to-b  from-[#196f9a] to-[#05060c] pt-20 text-white md:min-h-screen",
        className,
      )}
      {...props}
    >
      {props.children}
    </main>
  );
}
