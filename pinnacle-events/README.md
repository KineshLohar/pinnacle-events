# Pinnacle Events — Website

Premium corporate event management website, built with Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, GSAP, Lenis and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's built

- Fully designed **Home page** with all sections from the brief: cinematic hero,
  company intro, trusted-brands marquee, featured services, featured portfolio,
  why-Pinnacle strengths, awards/recognition teaser, animated stats, testimonials,
  industries served, and a closing contact CTA.
- Full **folder structure and routing** for every page in the sitemap: About,
  Services (hub + all 18 individual service pages via one dynamic template),
  Portfolio (index + dynamic case-study template), Clients, Awards, Testimonials,
  and Contact (with a working form UI, ready to be wired to an email/CRM endpoint).
- Shared **design system**: color tokens, type scale, and the signature gold
  corner-bracket motif, all defined in `app/globals.css` and documented in
  `01-IA-and-Design-System.md`.
- SEO: per-route `generateMetadata`, Open Graph/Twitter defaults in the root
  layout, and static generation (`generateStaticParams`) for every service and
  case-study page.

## Next steps to go to production

1. Replace placeholder copy/images in `content/*.ts` with real client-approved
   content and photography.
2. Wire `components/shared/contact-form.tsx` to a real email or CRM endpoint.
3. Add the real Google Maps embed on `/contact`.
4. Swap the placeholder image blocks (`bg-bg-surface` boxes) for `next/image`
   with real photography once assets are available.

## Note on fonts

This project uses `next/font/google` for Fraunces, Manrope and IBM Plex Mono,
which self-hosts the fonts at build time. This requires outbound access to
`fonts.googleapis.com` at build time (available on any normal machine/CI with
internet access).
