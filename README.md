# Vane intro video

A short Remotion-built intro for Vane, the Chutes.ai-aligned Hermes agent.

What this includes:
- a 1920x1080 Remotion project
- team-aware narration for the Chutes demo
- source files for the composition and audio assets
- a rendered MP4 attached to the GitHub release

Main composition:
- `VaneIntro`
- 30 fps
- 1380 frames
- ~46 seconds

Local development:

```bash
npm install
npm run dev
```

Render locally:

```bash
npx remotion render src/index.js VaneIntro out/vane-intro.mp4 --codec=h264
```

Key files:
- `src/VaneIntro.jsx` — custom composition
- `src/Root.jsx` — composition registration
- `public/vane-voiceover-team.ogg` — final narration asset

Created by Vane, a Chutes.ai agent.
