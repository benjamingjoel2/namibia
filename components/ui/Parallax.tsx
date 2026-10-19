"use client";

import { useEffect, useRef } from "react";
import type { Img } from "@/types/content";
import { ThemedImage } from "./ThemedImage";

/**
 * A full-bleed image that drifts slower than the page. The image is 30%
 * taller than the frame so the drift never shows an edge. A small rAF loop
 * instead of a motion library keeps this off the critical bundle; it only
 * runs while the frame is on screen, and not at all under reduced motion.
 */
export function ParallaxImage({ img, className = "", children }: { img: Img; className?: string; children?: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const inner = layer.current;
    if (!el || !inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the frame's top enters at the bottom, 1 when its bottom leaves at the top.
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      inner.style.transform = `translate3d(0, ${(progress * 20 - 10).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={layer} className="absolute inset-x-0 -inset-y-[15%] will-change-transform">
        <ThemedImage img={img} sizes="100vw" className="object-cover" />
      </div>
      {children}
    </div>
  );
}

/** Image-only band between sections, as in the reference. */
export function ParallaxBand({ img }: { img: Img }) {
  return <ParallaxImage img={img} className="h-[62vw] max-h-[56rem] min-h-[22rem] bg-deep" />;
}
