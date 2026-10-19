"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ctaLabel, mainNav } from "@/config/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-[#f5f0e8] transition-[background-color,backdrop-filter] duration-500 ${
        scrolled || open ? "bg-[#1e1a17]/88 backdrop-blur-md [:root[data-theme=night]_&]:bg-[#070e1a]/90" : "bg-[#1e1a17]/30"
      }`}
    >
      <div className="gutter flex h-[3.9rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8 text-[1.0625rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`underline-offset-[5px] decoration-1 hover:underline ${isActive(item.href) ? "underline" : ""} ${
                    item.href === "/night-sky" ? "[:root[data-theme=night]_&]:text-[#f6c88f]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden text-[1.0625rem] underline decoration-1 underline-offset-[5px] hover:decoration-2 sm:inline"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            className="-mr-2 grid size-10 place-items-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="gutter h-[calc(100dvh-3.9rem)] overflow-y-auto pb-10 pt-6 xl:hidden"
      >
        <nav aria-label="Main mobile">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href} className="rule-dashed border-[#f5f0e8]/30 first:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="statement block py-3 text-[1.75rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-block text-lg underline decoration-1 underline-offset-[5px]"
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
