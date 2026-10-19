# Namib Light

Private journeys across Namibia: *Follow the light. Stay for the stars.*

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · MDX.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all pages are static)
npm test             # moon phase, route totals, data integrity, enquiry validation
npm run lint
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` (for example in Vercel project settings) to the live domain; it's used for canonical URLs, the sitemap and structured data.

## Where things live

| What | Where |
|---|---|
| Brand name, contact details, nav, NTB registration | `config/site.ts` |
| Palette (mirrored in `app/globals.css`) | `config/theme.ts` |
| Currencies and indicative exchange rates | `config/currency.ts` |
| Destinations (14) | `data/destinations.ts` |
| Journeys (8) with day-by-day route data | `data/journeys.ts` |
| Stays (placeholder names) | `data/stays.ts` |
| Etosha month by month | `data/etosha.ts` |
| Southern sky month by month | `data/sky.ts` |
| Cultures of Namibia | `data/cultures.ts` |
| Team, testimonials, FAQ | `data/team.ts`, `data/testimonials.ts`, `data/faq.ts` |
| Travel styles and the chooser's questions and scoring | `data/travelStyles.ts` |
| Journal posts (MDX with frontmatter) | `content/journal/*.mdx` |
| Content types | `types/content.ts` |

### Editing route data

Each journey day in `data/journeys.ts` has `distanceKm`, `gravelKm` (tarmac is the rest), `driveHours`, `fuelStops`, `vehicle`, light notes (`sunrise`, `sunset`), `stargazing` and `stayId`. Every figure is an **editable estimate**: check against current road reports before quoting. `npm test` catches broken references (an unknown `stayId`, gravel longer than the day, and so on).

### Images

Photographs are from Unsplash (Unsplash License), self-hosted in `public/photos/`; photographers are listed in `data/imageCredits.ts` and on `/credits`. To swap a photo, add it under a **new** file name (image caches are keyed on the URL, so reusing a name can keep serving the old picture), then update the path and `alt` text in `/data` and the entry in `data/imageCredits.ts`. Images with a `srcNight` show that version in night mode.

Photos live in `public/photos/`. Team portraits (`public/images/team-*.jpg`) are still generated placeholders; `npm run placeholders` regenerates only those.

## Before launch

Search the code for `PLACEHOLDER` and `verify`. In particular:

- **Entry requirements** (FAQ): visa rules changed recently. Verify against official Namibian government sources.
- **Malaria, park fees, seasons, sky notes**: each is marked *verify* on the page.
- **Cultures of Namibia**: have it reviewed with community representatives; replace placeholder partners.
- **Team portraits**: placeholders; use real, consented photos of the actual team.
- **Testimonials**: placeholders. Add real, consented quotes; names only with permission.
- **Team, stays, address, phone, NTB registration, legal pages**: placeholders.
- **Exchange rates** in `config/currency.ts` are indicative.

## Enquiries

The planning form posts to `app/api/enquiry/route.ts`, which validates with the same schema as the form (`lib/enquiry.ts`) and logs the payload. There is a `TODO` for the CRM integration.

## Day & Night

A blocking script in `components/layout/ThemeScript.tsx` sets `data-theme` before paint (saved choice → system preference → day). Use the `.day-only` and `.night-only` classes to show content in one mode. Colours are CSS variables in `app/globals.css`; night mode is designed for WCAG AA contrast.

## Design reference

Layout, spacing and interaction patterns follow the structure of a Wix "Safari Tours" template. No code, images, fonts or wording from it are used.
