import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-extrabold uppercase text-champagne">{eyebrow}</p>
      ) : null}
      <h2 className="balanced-text font-display text-4xl font-bold leading-[0.95] text-ivory md:text-6xl">
        {title}
      </h2>
      {text ? <p className="mt-5 text-base leading-8 text-ivory/66 md:text-lg">{text}</p> : null}
    </div>
  );
}
