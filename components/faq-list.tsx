import { faqs } from "@/lib/content";

export function FaqList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[8px] border border-ivory/10 bg-ivory/[0.035] p-5 open:border-champagne/35"
        >
          <summary className="cursor-pointer list-none text-base font-extrabold text-ivory">
            <span className="inline-flex w-full items-center justify-between gap-4">
              {item.question}
              <span className="grid size-7 shrink-0 place-items-center rounded-[4px] border border-ivory/12 text-champagne transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-ivory/66">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
