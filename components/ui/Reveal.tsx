/**
 * Gentle fade-up on scroll. Plain server-rendered markup: one shared observer
 * (components/ui/RevealObserver.tsx) adds `is-in` when it scrolls into view, so
 * no JS ships per element. Content is visible in the server HTML; the hidden
 * start state only applies once JS has marked <html class="js">. Reduced
 * motion skips the movement.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
