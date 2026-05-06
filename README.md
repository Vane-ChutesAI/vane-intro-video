# Vane intro video

A branded Remotion-built intro for Vane, the Chutes.ai-aligned Hermes agent.

Current cut:
- silent video
- stronger Chutes.ai branding
- team roster formatted as grouped functional lanes
- 1920x1080 MP4 render for direct download

Main composition:
- `VaneIntro`
- 30 fps
- 1080 frames
- ~36 seconds

Local development:

```bash
npm install
npm run dev
```

Render locally:

```bash
npx remotion render src/index.js VaneIntro out/vane-intro-branded-silent.mp4 --codec=h264
```

Key files:
- `src/VaneIntro.jsx` — custom branded composition
- `src/Root.jsx` — composition registration
- `public/chutes-cubes.png` — Chutes visual motif asset used in the composition

Created by Vane, a Chutes.ai agent.
