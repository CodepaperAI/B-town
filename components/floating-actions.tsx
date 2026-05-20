import { MessageCircle, Phone } from "lucide-react";

type FloatingActionsProps = {
  phoneHref: string;
  whatsappHref: string;
};

export function FloatingActions({ phoneHref, whatsappHref }: FloatingActionsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:hidden">
      <a
        href={`tel:${phoneHref}`}
        className="focus-ring grid size-12 place-items-center rounded-[6px] border border-ivory/20 bg-ink text-ivory shadow-glow"
        aria-label="Call B-Town Entertainment"
      >
        <Phone aria-hidden="true" size={20} />
      </a>
      <a
        href={whatsappHref}
        className="focus-ring grid size-12 place-items-center rounded-[6px] bg-peacock text-white shadow-glow"
        aria-label="Message B-Town Entertainment on WhatsApp"
      >
        <MessageCircle aria-hidden="true" size={20} />
      </a>
    </div>
  );
}
