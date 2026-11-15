import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary: "border border-border bg-background hover:bg-subtle",
};

export type ButtonVariant = keyof typeof variants;

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className,
  );
}
