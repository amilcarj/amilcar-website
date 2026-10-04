"use client";

import { useEffect, useRef } from "react";

const parallaxOffset = (
  sectionTop: number,
  anchor: number,
  speed: number,
): number => {
  return -(sectionTop - anchor) * speed || 0;
};

export function useParallax(speed: number) {
  const section = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !section.current ||
      !layer.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      globalThis.CSS?.supports?.("animation-timeline: view()")
    ) {
      return;
    }

    const readAnchor = () =>
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      ) || 0;
    let anchor = readAnchor();
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section.current || !layer.current) {
        return;
      }
      const { top } = section.current.getBoundingClientRect();
      layer.current.style.transform = `translate3d(0, ${parallaxOffset(top, anchor, speed)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      anchor = readAnchor();
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, [speed]);

  return { layer, section };
}
