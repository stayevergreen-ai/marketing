# Evergreen marketing site

## What this repo is

This is the marketing/website code for **stayevergreen.ai** — the public-facing site for Evergreen, an AI-native customer success platform. This repo is separate from the product app (which lives in `evergreen-cs/`). Marketing site deploys to the root domain; product app deploys to `app.stayevergreen.ai`.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Deploy target: Vercel
- Hosting: stayevergreen.ai (root) — DNS via Cloudflare

## Brand (LOCKED)

### Colors — chalk palette
- `--color-base`: `#F4F4F4` (page background)
- `--color-nav`: `#FFFFFF` (top nav background)
- `--color-card`: `#FFFFFF` (card backgrounds)
- `--color-border`: `#E8E8E8` (borders, dividers)
- `--color-text`: `#000000` (primary text)
- `--color-text-secondary`: `#999999` (secondary/muted text)

### Brand greens
- `--color-accent`: `#16A34A` (primary brand green — links, CTAs, brand accents)
- `--color-bright-green`: `#4ADE80` (highlight green — top tier of tree mark)
- `--color-dark-green`: `#14532D` (deep green — base of tree mark)

### Status colors
- Urgent: `#DC2626`
- Attention: `#FB923C`
- Opportunity: `#16A34A`
- Neutral: `#999999`

### Logo system — ST-1
Single filled tree, 3 tiers:
- Top tier: `#4ADE80` (bright green)
- Middle tier: `#16A34A` (mid green)
- Base tier: `#14532D` (dark green)
- Short trunk

### Wordmark
- "evergreen" — bold 800 weight, tight tracking
- Green period dot flush after final letter (color: `#16A34A`)
- Always lowercase
- Files in `public/`: evergreen-logo-light.png, evergreen-logo-dark.png, evergreen-logo-green.png, evergreen-icon.png, evergreen-wordmark.png, evergreen-favicon.svg

### Component conventions
- AIButton: white background primary, no black backgrounds. Applies to ALL AI-action buttons across the site.

## Design quality bar

Reference sites to study for layout, typography, restraint, and motion discipline:
- linear.app
- stripe.com
- vercel.com
- attio.com
- cursor.com

The bar is "crisp, not flashy." Generous whitespace, restrained motion, confident typography. Don't out-design Linear; hit Linear's bar.

## Sitemap (v1)

- `/` — long-scroll home page (hero + 7 sections + footer)
- `/methodology` — dedicated page (the moat — proves "defensible numbers" claim)
- `/demo` — form + Cal.com integration

Future pages (deferred until needed):
- `/about` (founder story may live on home page initially)
- `/blog` (Q3 2026 problem)
- `/pricing` (currently a section on home page)

## Locked copy — see marketing-copy.md in evergreen-cs/

The full locked copy for Hero, Section 2 (Two paths), and Section 3 (Go live in days) lives in:
`/Users/home/evergreen-cs/marketing-copy.md`

This includes:
- Strategic principles
- Locked product clarifications (Model C workspace, email's role, integration scope)
- Locked section copy
- Reserved phrases (don't reuse before reveal)
- Open decisions for upcoming sessions

When implementing sections in this repo, copy verbatim from that doc. Do not paraphrase locked copy.

## Trust rules for any copy this repo generates

1. Never claim "Evergreen accepts everything" — integration scope is bounded (Gmail, Outlook, Salesforce, HubSpot, calendar, spreadsheet/CSV; NOT Slack, NOT Zendesk yet).
2. Never claim "no implementation" — implementation exists, it's just measured in days not quarters.
3. Never claim "numbers from day one" without qualifying — defensible numbers land the moment book of business + email connect, but waterfall and quarterly historicals need data accumulation.
4. Two-audience pattern: every section addresses both CSMs (the team) and leaders (the buyer).
5. Use "your team" not "humans" or "your CSMs" alone — possessive specificity matters.
6. Reject defensive framing ("not the X"). Always rephrase as positive ("we're built for Y").

## Build/run

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm start        # production server (after build)
npm run lint     # ESLint
```

## Working agreements with Matt

- Push back when reasoning is weak. Don't soften.
- Honesty over comfort.
- Strategic copy work happens in chat (not via Claude Code agent).
- Code generation happens via Claude Code, with locked copy and locked spec as input.
- Don't proactively manage Matt's energy or session length. He sets boundaries.
- Commit messages: terse, no Co-Authored-By trailer.

## Domain & email (LOCKED May 4, 2026)

- Domain: stayevergreen.ai (Cloudflare Registrar)
- Marketing site deploys to: stayevergreen.ai
- Product app will deploy to: app.stayevergreen.ai
- Founder email: matt@stayevergreen.ai (Google Workspace Business Starter)
- Email auth: SPF + DKIM + DMARC, mail-tester 10/10
- DNS provider: Cloudflare

## Repo conventions

- No src/ directory — files live at the repo root and inside app/
- TypeScript everywhere
- Tailwind for all styling (no CSS modules, no styled-components)
- Use @/ import alias (configured by default)
- Follow Next.js App Router conventions: pages are page.tsx, layouts are layout.tsx
