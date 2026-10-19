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

All photographs are generated placeholders, captioned "PLACEHOLDER". Replace any file in `public/images/` with a real photo of the same name; any aspect ratio works. Update the `alt` text in `/data` at the same time. Images with a `srcNight` show that version in night mode. To regenerate the placeholders: `npm run placeholders` (add `--force` to overwrite).

## Before launch

Search the code for `PLACEHOLDER` and `verify`. In particular:

- **Entry requirements** (FAQ): visa rules changed recently. Verify against official Namibian government sources.
- **Malaria, park fees, seasons, sky notes**: each is marked *verify* on the page.
- **Cultures of Namibia**: have it reviewed with community representatives; replace placeholder partners.
- **Testimonials**: placeholders. Add real, consented quotes; names only with permission.
- **Team, stays, address, phone, NTB registration, legal pages**: placeholders.
- **Exchange rates** in `config/currency.ts` are indicative.

## Enquiries

The planning form posts to `app/api/enquiry/route.ts`, which validates with the same schema as the form (`lib/enquiry.ts`) and logs the payload. There is a `TODO` for the CRM integration.

## Day & Night

A blocking script in `components/layout/ThemeScript.tsx` sets `data-theme` before paint (saved choice → system preference → day). Use the `.day-only` and `.night-only` classes to show content in one mode. Colours are CSS variables in `app/globals.css`; night mode is designed for WCAG AA contrast.

## Design reference

Layout, spacing and interaction patterns follow the structure of a Wix "Safari Tours" template. No code, images, fonts or wording from it are used.
