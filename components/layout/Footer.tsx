import Link from "next/link";
import { footerNav, legalNav, site } from "@/config/site";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-deep text-on-deep">
      <div className="gutter pb-6 pt-16 md:pt-20">
        <div className="flex items-start justify-between gap-6">
          <Logo />
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5 sm:max-w-md">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="statement space-y-5 not-italic text-[1.6rem] md:text-[2.5rem]">
            <p>
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={`mailto:${site.contact.email}`} className="break-all underline-offset-[6px] hover:underline">
                {site.contact.email}
              </a>
            </p>
          </address>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-sm text-on-deep/80 md:mt-20">
          <span />
          <CurrencySwitcher />
        </div>

        <div className="rule-dashed mt-6 flex flex-col gap-4 border-[#f5f0e8]/30 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
