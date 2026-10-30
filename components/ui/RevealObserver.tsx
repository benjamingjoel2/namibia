"use client";

import { useEffect } from "react";

/** Adds `is-in` to every `.reveal` once it enters the viewport (one observer for the page). */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
