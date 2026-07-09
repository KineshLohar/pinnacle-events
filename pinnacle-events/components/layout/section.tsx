import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  border = true,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  border?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32 lg:py-40",
        border && "border-t border-border-hairline",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono-tag text-gold-primary text-[13px]", className)}>{children}</p>
  );
}
