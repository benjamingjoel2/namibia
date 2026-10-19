"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Img } from "@/types/content";
import { ThemedImage } from "./ThemedImage";

/**
 * A full-bleed image that drifts slower than the page. The image is 30%
 * taller than the frame so the drift never shows an edge. Still under
 * reduced motion.
 */
export function ParallaxImage({ img, className = "", children }: { img: Img; className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0 -inset-y-[15%]" style={reduce ? undefined : { y }}>
        <ThemedImage img={img} sizes="100vw" className="object-cover" />
      </motion.div>
      {children}
    </div>
  );
}

/** Image-only band between sections, as in the reference. */
export function ParallaxBand({ img }: { img: Img }) {
  return <ParallaxImage img={img} className="h-[62vw] max-h-[56rem] min-h-[22rem] bg-deep" />;
}
