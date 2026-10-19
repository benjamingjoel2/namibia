/**
 * Draws the moon's lit shape for a phase fraction (0 = new, 0.5 = full).
 * Southern-hemisphere view: a waxing moon is lit on the left.
 */
export function MoonGlyph({ fraction, size = 48, className = "" }: { fraction: number; size?: number; className?: string }) {
  const r = 20;
  const waxing = fraction < 0.5;
  // Terminator ellipse x-radius: r at new/full, 0 at the quarters.
  const k = Math.cos(2 * Math.PI * fraction);
  const rx = Math.abs(k) * r;
  // Lit limb is on the left when waxing (southern hemisphere).
  const limbSweep = waxing ? 0 : 1;
  const gibbous = k < 0;
  const termSweep = gibbous ? limbSweep : 1 - limbSweep;
  const d = `M 24 4 A ${r} ${r} 0 0 ${limbSweep} 24 44 A ${rx} ${r} 0 0 ${termSweep} 24 4 Z`;

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} role="img" aria-label={`Moon, ${Math.round(((1 - k) / 2) * 100)}% lit`}>
      <circle cx="24" cy="24" r={r} fill="#24324d" stroke="#f1e8da" strokeOpacity="0.35" />
      {fraction > 0.01 && fraction < 0.99 && <path d={d} fill="#f1e8da" />}
    </svg>
  );
}
