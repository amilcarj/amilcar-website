# Migration Plan: amilcarjavier.com (Squarespace → Next.js on Vercel)

## Current site inventory
- Nav: Home, About, Resume, Reels, Gallery, Contact + social links (new site: Email, Actors Access, IMDb, Instagram)
- Hero: headshot, "ACTOR | NYC | SAG-AFTRA"
- About: bio
- Resume: downloadable PDF + TV, Film, Theatre, Training, Skills
- Reels: English VO demo, Spanish VO demo (MP3)
- Gallery: 6 headshots + 8 production stills, full-size viewer
- Instagram feed embed (not carried over, see Decisions)
- Contact: email + Bicoastal Management representation
- Parallax scrolling on 4 background images
- Existing routes: `/about`, `/resume`, `/reels`, `/gallery`, `/contact`

## Stack
- Next.js 16.4 (App Router) with Cache Components and Partial Prefetching on (`cacheComponents`/`partialPrefetching` in `next.config.ts`; both become the only mode in Next 17), TypeScript strict, Tailwind, ESLint
- Static generation; content in `src/constants/*.ts`. Types live next to what they describe (`Photo`/`Media` in `constants/media.ts`, `Resume` in `constants/resume.ts`); no shared types file
- `next/image` with statically imported images from `src/assets/` (dimensions read at build time); downloads (PDF, MP3) stay in `public/`
- Tests: Vitest + React Testing Library + jsdom. Render checks for every section live in `src/components/sections/sections.test.tsx` (a `describe` per section); behavior tests with more than one case stay next to their component
- Tooling: Prettier (`npm run format`), ESLint with the voter-registration-portal rules (`curly`, `import/order`, `max-len`, `sort-keys`, …; `npm run lint:fix`), `lucide-react` icons
- Hosting: Vercel

## Decisions
- **Layout:** `/` is a single scrolling page with all sections and anchor-link nav. Home and logo links scroll to the top when already on `/` (click handler in `header.tsx`; Next.js won't scroll for a same-URL navigation while the page is visible). `/about`, `/resume`, `/reels`, `/gallery`, `/contact` each render that section alone, reusing the same components, via one dynamic route `src/app/[section]/page.tsx` (`generateStaticParams`; sections live in a `Map`, and unknown ones call `notFound()` (`sections.get(section) ?? notFound()`) (a `Map` has no inherited keys, so `/constructor` etc. 404 too). `dynamicParams` isn't allowed with Cache Components. `ensureStatic = "navigation"` is required for a real 404 status: without it, Partial Prefetching serves unknown paths the prerendered shell first, so the 404 page arrives with HTTP 200).
- **Look:** match the current site first (fonts, colors, spacing extracted from live CSS). Redesign later, if at all.
- **Parallax:** matches the live site: each image covers the viewport, is pinned to the top of its section, and moves at half scroll speed, measured from the bottom of the sticky header. Runs as a CSS scroll-driven animation (`parallax` keyframes + `parallax-section`/`parallax-layer` utilities in `globals.css`) so it stays in sync with scrolling; `src/hooks/useParallax.ts` is the JS fallback for browsers without `animation-timeline` (e.g. Firefox). Disabled under `prefers-reduced-motion`. No library.
- **Page structure:** `src/app/page.tsx` composes the sections in `src/components/sections/` with parallax bands between them; standalone routes reuse the same components. Files are kebab-case. A component is a single file (`header.tsx`, `sections/about.tsx`) unless it has sub-components or a colocated test, in which case it's a folder with `index.tsx` (`sections/contact/`, `sections/reels/`, `reels/voice-demo/`).
- **Header:** sticky, `#022222`. Below 768px (`md`): hamburger + native `<dialog>` menu, 59px tall. 768–1279px: desktop layout wrapped onto two lines like the live site (name on two lines, nav wraps), 155px. 1280px+ (`xl`): single line, 110px. Heights live in `--header-height` in `globals.css`.
- **Photo viewer:** `yet-another-react-lightbox` (approved).
- **Instagram:** decided against a feed. The Instagram icon links to the profile; a feed adds a third-party dependency and can look worse than nothing when posts go stale. (If revisited: Behold.so free tier JSON feed, fetched server-side.)
- **Contact form:** Resend via plain `fetch` (no SDK) from a server action, hand-written validation, honeypot spam field, reply-to set to the visitor. Sends from the verified domain amilcarjavier.com (see Email setup).
- **Redirects:** page routes match the old ones. `next.config.ts` redirects (308) the old Squarespace-only URLs: `/home` → `/`, `/s/Amilcar-Javier-Film-Television-Theater-Resume.pdf` → the résumé PDF, `/s/Amilcar-Javier-2.jpg` → `/gallery`.
- **Assets (downloaded):** current assets only, from the Squarespace CDN at original resolution. Images converted to WebP (quality 82, max width 2400px for parallax, 2000px for others).
  - `src/assets/parallax/`: `hero`, `cop`, `dereliction-of-duty`, `masc`
  - `src/assets/headshots/headshot-1..6` (gallery order). The About image reuses `headshot-3`, cropped to the top two-thirds.
  - `src/assets/stills/`: `smart-choice`, `our-lady-lupe`, `intimacy-workshop`, `dereliction-of-duty`, `the-diner`, `steps`, `invisible-hand`, `willie-alfonso`
  - `src/assets/icons/`: `email`, `actors-access`, `imdb`, `instagram` (lossless WebP from the live site)
  - `src/assets/bicoastal-mgmt.webp`
  - `public/Amilcar Javier Resume.pdf`, `public/audio/amilcar-javier-{english,spanish}-vo-demo.mp3`
  - `src/app/icon.png`: favicon (180x180 PNG); `src/app/opengraph-image.jpg`: share image cropped from the hero
- **Theme:** light only, no dark mode.
- **Shared styles (`globals.css`):** `section` (section padding), `section-heading`, `button-outline` (for any button or button-like link), parallax utilities, menu slide-in animation, and base rules for keyboard focus outlines (teal by default, cyan on dark backgrounds) and pointer cursors on buttons.
- **Fonts:** Raleway (free Google Font via `next/font`) for everything; Arial for the header tagline. The live site's Futura PT isn't used on any visible element, so Jost was dropped.
- **Colors:** brand tokens in `globals.css` (`teal` #004647, `header` #022222, `footer` #031c26, `link` #027678, `cyan-bright` #0af1f5, `panel` #ebfcff); everything else uses Tailwind defaults (white, black, `zinc-900` headings, `stone-100` resume stripes, `neutral-*` grays).
- **Media:** VO demos use `Media { title, src }`. The reel stores its YouTube ID directly (`reel.youtubeId`); no URL parsing.
- **Reel:** YouTube embed of https://www.youtube.com/watch?v=Z4ZE1gOybHI (video ID `Z4ZE1gOybHI`) using a click-to-load facade (thumbnail loaded from YouTube's image server + play button, iframe from `youtube-nocookie.com` loads on click). No library.

## Phases (stop for review after each)
1. **Scaffold:** Next.js + TS strict + Tailwind + ESLint + Vitest/RTL/jsdom. Scripts: `dev`, `build`, `typecheck`, `lint`, `test`. One smoke test.
2. **Assets:** list candidate files from the live site and get Amilcar's sign-off on that list, then download only the approved assets (see Decisions). Capture colors/fonts from the live site.
3. **Content layer:** typed interfaces (`Credit`, `TrainingEntry`, `Photo`, `Demo`, …), data files, tests (e.g. every photo has alt text).
4. **Layout:** header, responsive/keyboard-accessible nav, footer with social links, parallax hook.
5. **Sections, one at a time:** Hero, About, Resume, Reels (native `<audio>` + download), Gallery (lightbox), Contact (placeholder), Instagram TODO. Each section also gets its standalone route.
6. **SEO:** metadata, Open Graph image, `sitemap.xml`, `robots.txt`, Person JSON-LD.
7. **Local review**, then Vercel preview + Lighthouse audit.
8. **Domain cutover (done 2026-10-05):**
   - Vercel project domains: `amilcarjavier.com` (primary) and `www.amilcarjavier.com` (308 → apex). Let's Encrypt certificates, auto-renewed by Vercel.
   - Squarespace DNS: Squarespace Defaults deleted; custom A `@` → `216.198.79.1` and CNAME `www` → `dabfb418eeb0e0e4.vercel-dns-017.com`. Don't touch these or the email records: MX → Mailgun, SPF TXT, `_dmarc`, `smtp._domainkey` (Squarespace forwarding) and the Resend records (`resend._domainkey`, `send`, `rsend`).
   - Squarespace website plan canceled; site expires 2027-08-10 and its content may be deleted ~30 days later (nothing needed from it). Domain stays at Squarespace: auto-renews 2027-07-26 for $20/yr, WHOIS privacy on, transfer lock on.
   - Verified: all routes and files 200 on the domain, 404 for unknown paths, HTTP → HTTPS, canonical/OG/sitemap use the apex, SPF/DKIM/DMARC pass on form email, old Squarespace URLs redirected.
   - Skipped: Google Search Console (letting Google reindex on its own).
   - Optional: show `contact@amilcarjavier.com` on the site instead of the NYU address.

## Next up (Amilcar to revisit)
### Contact form (done; merged in PR #1)
- Server action `src/components/sections/contact/actions.ts` calls Resend with plain `fetch`; reply-to is the visitor. Validation in `validate.ts`; hidden `company` honeypot; `useActionState` drives sending / success / error states, keeps input on error, and falls back to the direct email. Tests are in the Contact `describe` of `sections.test.tsx`.
- Settings (`.env.local` locally, Vercel project settings in production; template in `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL` (defaults to `Website Contact <onboarding@resend.dev>`).
### Email setup (done)
- Squarespace forwarding alias `contact@amilcarjavier.com` → amilcar.javier@nyu.edu.
- amilcarjavier.com verified in Resend via DNS records in Squarespace. The existing Sending-access API key was restricted to amilcarjavier.com.
- Vercel and `.env.local`: `CONTACT_TO_EMAIL=contact@amilcarjavier.com`, `CONTACT_FROM_EMAIL=Website Contact <contact@amilcarjavier.com>`. Tested end to end from the deployed site.
- No reCAPTCHA for now. If spam shows up, add Cloudflare Turnstile. Resend's free tier caps sending at 100/day.

### Design refresh (after the contact form, on its own branch)
Order: finish the contact form so the site matches the live one, then do the redesign on a separate branch.

Chosen direction: **B · Cinematic**, latest iteration **B3**, mockups at https://claude.ai/artifact/PDwWG2A21GPkRQ93DPWLCx (private; B1 → B2 → B3 with phone versions, header states, and the earlier A/C directions kept below for reference).
- Very dark teal background (`#001212`), raised surfaces `#082424`, cyan accent, Barlow Condensed display type with Barlow body, buttons with `rounded-lg` corners.
- Nav: three links, each landing on the thing it names with related content after it:
  - **Reel** → reel (with raised VO demo buttons: play + download), then About (bio with bold recent credits).
  - **Credits** → side-heading layout on desktop: "CREDITS" and the resume download in a narrow left column that stays sticky while scrolling; the right column holds Television (with episodes), Film, Theatre, Training (Anthony Abeson Studio; Humanity Studios (Shae D'lyn)) and Skills, all in the same row style. Phones stack the heading and button above the same five groups. Then the edge-to-edge headshot strip.
  - **Contact** → Booking (agency name large; department, email and phone smaller) beside the direct contact form, then the edge-to-edge stills strip.
- Social links (email, IMDb, Actors Access, Instagram) in the hero and in a new footer.
- Header: sticky. Transparent with just the three links over the hero; fades to solid `#001212` with the name on the left after scrolling past the hero (CSS scroll-driven animation; solid everywhere as the fallback). Standalone pages start solid. Phones: name + hamburger.
- Photo strips stay square-cornered with a 4px gap for the film-strip look. Headshots: all 6. Stills: all 8 plus the Cop (Most Wanted) and Masc images, 2 rows of 5 on desktop. On phones both are horizontal swipe strips (CSS scroll-snap, about 1.5 photos visible so the next one peeks in); tapping any photo opens the lightbox.
- Skills render as one line per category (muted category name · items), matching B2.
- No parallax bands: `ParallaxImage`, `useParallax` and the parallax utilities in `globals.css` can be removed.
- Standalone pages become `/reels`, `/credits`, `/contact`; add redirects in `next.config.ts`: `/about` → `/reels`, `/gallery` and `/resume` → `/credits`.
- Copy is a draft; Amilcar will revise it.

## Status
- [x] Phase 1: Scaffold
- [x] Phase 2: Assets
- [x] Phase 3: Content layer
- [x] Phase 4: Layout
- [x] Phase 5: Sections (Hero, About, Resume, Reels, Gallery, Contact + standalone routes)
- [x] Phase 6: SEO (metadata + title template in layout, `opengraph-image.jpg`, `sitemap.ts`, `robots.ts`, Person JSON-LD via `personJsonLd()` in `src/app/page.tsx`)
- [x] Contact form + email setup
- [x] Phase 7: Review + preview deploy
- [x] Phase 8: Domain cutover
