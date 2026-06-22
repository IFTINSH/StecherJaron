# Übergabe — Stecher Jaron Website 2.0

_Stand: 17.06.2026 (Ende Tag 1 / Phase 1)_

---

## 1. Was das ist
Neue Website für das Tattoo-Studio **Stecher Jaron** (Passau). Neuaufbau der ersten
Beispiel-Seite (`C:\Users\Moritz\Development\Stecher Jaron Website`) — gleicher
Schwarz-Weiß-Stil, aber moderner Stack, mobil-first, CMS-fähig.

## 2. Wie starten / ansehen
```bash
cd "C:\Users\Moritz\Development\Jaron Website 2.0"
npm run dev
```
- **PC:** http://localhost:3000
- **Handy (gleiches WLAN):** http://192.168.178.40:3000
  - Firewall einmalig freigeben (PowerShell **als Admin**):
    `New-NetFirewallRule -DisplayName "Next dev 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow -Profile Private,Public`
  - **NordVPN** ggf. trennen oder „LAN zulassen" aktivieren, sonst blockiert es den Zugriff.

## 3. Tech-Stack (fix)
Next.js 15 (App Router) · TypeScript · Tailwind v4 · Motion · Lenis (Smooth-Scroll)
· @paper-design/shaders-react (Mesh-Hintergrund). Schriften lokal via `next/font`
(**Jost** = Display/Wortmarke, **Inter** = Fließtext). Hosting später **Vercel**.

## 4. Seitenaufbau (aktuell)
`Loader → Hero → Über mich → Video → Galerie → Studio → Events → Kontakt → Footer`
+ durchgehender **„How to Book"**-Button (unten links) → Overlay.

| Sektion | Mobil | PC |
|---|---|---|
| **Loader** | Monogramm-Reveal, **nur 1× pro Session** | dito |
| **Hero** | Foto formatfüllend, Name unten | **Split**: Foto links, Name rechts |
| **Über mich** | zentrierter Text | zentrierter Text |
| **Video** | scrollt rein, wächst 0.82→1; Ton bei voller Sicht (+ „Ton aktivieren") | dito, breit (max 1800px) |
| **Galerie** | Filter + 2-Spalten-Grid + Lightbox | Filter + 3-Spalten-Grid |
| **Studio** | 2-Spalten-Masonry + Lightbox | sticky Text links + 3-Spalten-Masonry rechts |
| **Events** | 1 Spalte → Detailseite | 2–3 Spalten → Detailseite |
| **Kontakt** | Instagram + Adresse + Karte | dito |

## 5. Designentscheidungen
- Reines **Schwarz/Weiß**, durchgehender **Mesh-Hintergrund** (opacity-50 + black/40 Scrim) → Seite als **ein Flow**, Sektionen transparent.
- **Jost** dünn, uppercase, weit getrackt (Wortmarke + Headings).
- Hauptsektionen einheitlich **max-w-[1800px], px-4** (bündige Kanten).
- Reduced-Motion wird respektiert.

## 6. Assets im Projekt
`public/hero/hero.jpeg` · `public/video/intro.mp4` · `public/misc/how-to-book.jpeg`
· `public/studio/` (8) · `public/tattoos/` (8) · `public/events/<slug>/` (6 Events)
· `public/brand/monogramm.png` (aus Website 1).
Originale liegen zusätzlich in `Studiobilder/`, `Tattoobilder/`, `Eventbilder/`.

## 7. Bewusste Platzhalter / noch offen (Phase 2)
- [ ] **Tattoo-Stile** echt zuordnen (aktuell geraten: Dotwork/Blackwork/Fine-Line) — Liste von Jaron
- [ ] **Event-Daten/Beschreibungen** echt einpflegen
- [ ] **Event-Videos** (noch keine vorhanden, Struktur ist bereit)
- [ ] **Sanity CMS** anbinden (damit Jaron selbst pflegt)
- [ ] **Impressum/Datenschutz** mit echten Inhalten füllen (DE-Pflicht)
- [ ] eigene **Domain** + **Vercel-Deploy**
- [ ] Echte Bio / Studio-Text final

## 8. Schnelle Stellschrauben (Datei → was)
- Mesh-Stärke: `components/BackgroundShader.tsx` → `opacity-50` / `bg-black/40`
- Hero-Bildausschnitt: `components/Hero.tsx` → `objectPosition` (mobil/desktop)
- Video Start-/Endgröße: `components/IntroVideo.tsx` → `scale [0.82, 1]`, Breite `max-w-[1800px]`
- Studio-Kompaktheit: `components/Studio.tsx` → `columns-2 lg:columns-3`
- Inhalte/Texte/Events/Galerie: alles zentral in `lib/content.ts`

## 9. WICHTIG ab morgen
**Immer in zwei Versionen planen & besprechen: MOBIL und PC getrennt.**
(Moritz gefällt die mobile Version aktuell besser — Mobil hat Priorität.)

## 10. Plan für morgen (Tag 2)
1. **Fragerunde** zum aktuellen Stand:
   - Was gefällt auf **Mobil** gut / was fehlt / was stört?
   - Was gefällt auf **PC** gut / was fehlt / was stört?
   - Pro Sektion durchgehen (Hero, Über mich, Video, Galerie, Studio, Events, Kontakt, How to Book).
2. Danach: Feinschliff priorisieren → dann Phase-2-Themen (Kategorien, Sanity, rechtliches, Deploy).
