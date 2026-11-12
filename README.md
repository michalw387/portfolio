# Portfolio — Michał Wiśniewski

Jednostronicowe portfolio (PL/EN): React 19, TypeScript, Vite, Tailwind CSS 4 i Three.js.

- Tło 3D (sieć węzłów) reaguje na ruch myszy i przewijanie — `src/Scene.tsx`
- Poświata tła podąża za kursorem i zmienia barwę; karty przechylają się pod myszą
- Respektuje `prefers-reduced-motion`; działa bez WebGL

## Uruchomienie

```bash
npm install
npm run dev      # serwer deweloperski
npm run build    # produkcyjny build do dist/
npm run preview  # podgląd builda
npm run lint
```

## Edycja treści

Wszystkie teksty, projekty i linki są w `src/content.ts` (osobno `pl` i `en`).
CV: `public/CV_Michal_Wisniewski.pdf`.
Podglądy projektów są generowane w `src/ProjectArt.tsx`; można je zastąpić zrzutami ekranu.

## Publikacja na GitHub Pages

Build używa ścieżek względnych (`base: './'`), więc `dist/` działa pod dowolnym adresem.
Workflow `.github/workflows/deploy.yml` publikuje stronę po każdym pushu na `main`
(w ustawieniach repo: Settings → Pages → Source: GitHub Actions).
