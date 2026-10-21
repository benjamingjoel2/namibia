import Image from "next/image";
import type { Img } from "@/types/content";

type Props = {
  img: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

/**
 * Renders the day image, and the night image when one exists. CSS shows the
 * right one for the current theme, so there's no hydration flash. The hidden
 * night image is lazy, so day visitors don't download it.
 */
export function ThemedImage({ img, sizes, priority, className = "", fill = true, width, height }: Props) {
  const common = { sizes, className, ...(fill ? { fill: true as const } : { width, height }) };
  // Hero images: fetch early and at high priority, without a <head> preload
  // that would compete with the heading font.
  const eager = priority ? ({ loading: "eager", fetchPriority: "high" } as const) : {};
  if (!img.srcNight) {
    return <Image src={img.src} alt={img.alt} {...eager} {...common} />;
  }
  return (
    <>
      <Image src={img.src} alt={img.alt} {...eager} {...common} className={`day-only ${className}`} />
      <Image
        src={img.srcNight}
        alt={img.altNight ?? img.alt}
        loading="lazy"
        {...common}
        className={`night-only ${className}`}
      />
    </>
  );
}
