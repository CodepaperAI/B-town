"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncHeaderState = () => {
      document.body.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });

    if (reducedMotion) {
      return () => window.removeEventListener("scroll", syncHeaderState);
    }

    const selectors = [
      "main > section > .container-shell",
      "main article",
      "main details",
      "main form",
      "main [data-motion]"
    ];

    const targets = Array.from(
      new Set(document.querySelectorAll<HTMLElement>(selectors.join(",")))
    ).filter((element) => !element.closest("[data-no-motion]"));

    targets.forEach((element, index) => {
      element.classList.add("motion-item");
      element.style.setProperty("--motion-delay", `${Math.min(index % 8, 7) * 45}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", syncHeaderState);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <main key={pathname} id="main" className="site-page-shell">
      {children}
    </main>
  );
}
