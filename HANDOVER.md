# Übergabe — Stecher Jaron Website

_Stand: 29.06.2026._ Was steht, wie man's startet, wie es weitergeht.

---

## 1. Projekt & Stack
Tattoo-Studio-Website für **Stecher Jaron** (Passau), Deutsch, Schwarz-Weiß/Grau, mobil-first.
- **Next.js 15** (App Router) · TypeScript · **Tailwind v4** · **motion** (Framer Motion) · **Lenis** (Smooth-Scroll) · `@paper-design/shaders-react` (Mesh-Hintergrund) · **Sanity** (CMS).
- Schriften via `next/font`: **Jost** (Display/Wortmarke, dünn/uppercase/getrackt), **Inter** (Fließtext).
- **Repo:** https://github.com/MoritzLindebner/StecherJaron · Branch `master`. **Hosting:** Netlify (Repo verbunden, s. u.).

> **Arbeitsweise (wichtig):** Immer **Mobil und PC getrennt** denken/besprechen. Moritz priorisiert **Mobil**.

## 2. Lokal starten
```
npm install
npm run dev      # http://localhost:3000 (oder 3001, falls belegt)
npm run build    # vor Deploy: muss grün sein
```
- Lenis-Smooth-Scroll aktiv → scrollbare Overlays brauchen `data-lenis-prevent`.
- Next-Dev-Indikator („N") ist aus (`devIndicators: false`).

## 3. Mobil testen
- **Gleiches WLAN:** `http://<lokale-IP>:3000` (Firewall einmalig freigeben; NordVPN ggf. „LAN zulassen").
- **Öffentliches WLAN / unterwegs:** Cloudflare-Quick-Tunnel:
  `cloudflared tunnel --url http://localhost:3001 --protocol http2`
  (`--protocol http2` nötig, weil WLANs oft UDP blocken). URLs sind **Wegwerf** (pro Session neu).
- **Jaron etwas Dauerhaftes zeigen → Netlify** (s. u.), nicht den Tunnel.

## 4. Was steht (fertig)
- **Hero:** Foto + Chrome-„Intro-Linie" um Jaron (`components/FlowLine.tsx`): poppt einmal auf, flackert weich (Bloom), zieht sich symmetrisch zurück. Eigene Mobil-Silhouette; Foto+Linie gekoppelt (`HeroPhotoBackground.tsx`, `heroSilhouette.ts`). Pfade getract mit `scripts/trace-extract.cjs` (Desktop) / `scripts/trace-mobile.cjs` (Mobil).
- **Design-System** (`app/globals.css` `@theme`): Tokens `text-body / text-secondary / text-muted / bg-surface / border-line`, keine rohen Hex in Komponenten. Gutter `px-6 md:px-12`, breite Sektionen `max-w-[1800px]`.
- **Einheitlicher Rhythmus:** alle Content-Sektionen „Überschrift oben → Inhalt volle Breite". Heading-Ausrichtung PC: Raster-Sektionen (Portfolio/Studio/Events) links, Text-Sektionen (Über mich/Kontakt) mittig; Mobile immer zentriert.
- **Portfolio & Studio:** gleiches Raster (`aspect-[4/5]`, `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`) + **Scroll-Parallax in den Bildern** (`ParallaxImage.tsx` via `lenisStore.ts`).
- **How to Book:** Floating-Button unten rechts → Panel mit Buchungstext (`HowToBook.tsx`), scrollbar.
- **Feine Übergangslinie** auf der Naht Hero↔Über-mich (`About.tsx`, pulsiert dezent).
- **Quality:** Reduced-Motion respektiert, `:focus-visible`-Ringe, Scroll-Restoration „manual" (lädt immer oben).
- **Sanity-Integration** (Code fertig — Projekt noch nicht angelegt, s. u.).

## 5. Inhalte / Daten
- Zentral in `lib/content.ts` (Fallback) → über `lib/data.ts` aus Sanity gelesen, sonst Fallback.
- Assets: `public/hero/` (hero-16x9, hero-4x3, **hero-mobile.jpg**, jaron-cutout), `public/tattoos/` (8), `public/studio-photos/` (8, umbenannt wegen `/studio`-Route!), `public/events/<slug>/`, `public/video/intro.mp4`, `public/brand/monogramm.png`.

## 6. Deployment (Netlify)
- Repo ist auf app.netlify.com verbunden (Next.js-Runtime wird autoerkannt, Production-Branch `master`). Jeder `git push` deployt automatisch, Link `*.netlify.app`.
- Build-Konfiguration liegt in `netlify.toml` (Build `npm run build`, Publish `.next`).
- Env-Vars setzen (s. Sanity): Site configuration → **Environment variables**.
- Optional Domain `stecherjaron.de` unter **Domain management**.

## 7. Sanity (CMS) — Status & Aktivierung
**Code fertig, Projekt noch nicht angelegt.** Solange `NEXT_PUBLIC_SANITY_PROJECT_ID` fehlt/leer ist, läuft die Seite auf den Fallback-Inhalten.
- **Dashboard:** `/studio` (eingebettetes Studio, Sanity-Login). Bearbeitbar: **Über mich** (Text), **Portfolio** (Bilder + selbst angelegte **Kategorien**), **Events** (Cover + Bilder).
- **Schemas:** `sanity/schemas/` (`about`, `category`, `tattoo`, `event`). **Daten:** `lib/data.ts` (ISR `revalidate=60`, Fallback auf `content.ts` wenn leer).
- **Versionen:** next-sanity **9** / sanity 3 — **nicht** auf next-sanity 13 (verlangt Next 16).
- **Aktivierung (einmalig):** Projekt auf sanity.io/manage anlegen (Dataset `production`, public) → Project ID; `.env.example`→`.env.local` mit ID; CORS-Origins (localhost + Netlify-URL) hinzufügen; gleiche Env-Vars in Netlify; `/studio` öffnen, Inhalte anlegen.
- **Account:** Owner = Moritz, **Jaron als Editor einladen** (Übertragung an Jaron später möglich). Kein API-Token nötig (öffentliches Dataset + Studio-Login).

## 8. Offene To-dos
- [ ] **Sanity-Arbeit committen & pushen** (aktuell nur lokal, noch nicht auf GitHub).
- [ ] **Netlify-Deploy** fertigstellen (Env-Vars in Netlify, Sanity-CORS, ggf. Domain).
- [ ] **Sanity-Projekt** anlegen, echte Inhalte einpflegen (Portfolio, Events, Über-mich), Jaron einladen.
- [ ] **Hi-Res `public/hero/hero-mobile.jpg`** (aktuell nur 578 px, leicht weich) — gleicher Ausschnitt, dann bleibt die Linie gültig.
- [ ] **Impressum/Datenschutz** mit echten Angaben füllen (DE-Pflicht, aktuell Platzhalter).
- [ ] Optional später: **Videos in Events** (Schema-Feld ergänzen).
- [ ] Aufräumen: ungenutzte Experimente `HeroPattern.tsx` / `PatternBackground.tsx` prüfen/entfernen.

## 9. Schnelle Stellschrauben (Datei → was)
- Hero-Linie Timing/Stärke: `components/FlowLine.tsx` (`APPEAR/HOLD/RETRACT`, `MAG`, Bloom).
- Parallax-Stärke: `components/ParallaxImage.tsx` (`MAG = 11`).
- Mobile-Hero: `HeroPhotoBackground.tsx` (`top-[12vw]`, `MOBILE_MASK`) · Hero-Höhe `Hero.tsx` (`h-[100vw] md:h-[100svh]`).
- Übergangslinie: `About.tsx` (`top-2 md:top-6`).
- Mesh-Hintergrund: `BackgroundShader.tsx` (`opacity-50`, `bg-black/40`).
- Texte/Fallback-Inhalte: `lib/content.ts`.
