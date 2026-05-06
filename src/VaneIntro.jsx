import React from "react";
import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const scenes = [
  {
    start: 0,
    end: 210,
    eyebrow: "MEET VANE",
    title: "A Hermes agent for Chutes.ai",
    body: "Persistent context. Live tools. Real execution.",
    chips: ["Research", "Writing", "Automation"],
    statLabel: "Role",
    statValue: "Execution layer",
  },
  {
    start: 210,
    end: 480,
    eyebrow: "TEAM CONTEXT",
    title: "I already know some of the room",
    body: "Sirouk: backend and systems. Timon: sales and customer success. Kyle: TEE and secure inference. Rykorb and Vonkaiser: deep technical work. Vince: product story, launches, and coordination.",
    chips: ["Sirouk", "Algowary", "Kyle", "Rykorb", "Vonkaiser", "Vince"],
    statLabel: "State",
    statValue: "Team-aware",
  },
  {
    start: 480,
    end: 780,
    eyebrow: "INSPECT + VERIFY",
    title: "I inspect, research, and verify",
    body: "Websites, signup paths, SEO surfaces, competitors, and messaging gaps.",
    chips: ["Live web", "Competitors", "Trust surface"],
    statLabel: "Output",
    statValue: "Checked findings",
  },
  {
    start: 780,
    end: 1110,
    eyebrow: "WRITE + ORGANIZE",
    title: "I turn ideas into usable assets",
    body: "SEO-ready blogs, Notion hubs, GitHub tasks, terminal work, and recurring workflows.",
    chips: ["Blogs", "Notion", "GitHub", "Automation"],
    statLabel: "Formats",
    statValue: "Docs, plans, copy",
  },
  {
    start: 1110,
    end: 1380,
    eyebrow: "PROMPT TO OUTPUT",
    title: "Give me the messy request",
    body: "I will turn it into checked output for the Chutes team.",
    chips: ["Research", "Execution", "Coordination"],
    statLabel: "Promise",
    statValue: "From ask to asset",
  },
];

const captions = [
  {
    start: 0,
    end: 150,
    text: "Hi team, I am Vane, a Hermes agent aligned to Chutes.ai.",
  },
  {
    start: 150,
    end: 480,
    text: "I already know some of the room: Sirouk on backend and systems, Timon on sales and customer success, Kyle on TEE, Rykorb and Vonkaiser on deep technical work, and Vince on launches and coordination.",
  },
  {
    start: 480,
    end: 610,
    text: "I do more than talk.",
  },
  {
    start: 610,
    end: 850,
    text: "I can inspect live websites and product flows, research competitors, and draft SEO-ready content.",
  },
  {
    start: 850,
    end: 1080,
    text: "I can organize work in Notion, use GitHub and the terminal, and automate recurring tasks.",
  },
  {
    start: 1080,
    end: 1320,
    text: "Give me a messy request, and I will turn it into checked output for the Chutes team.",
  },
  {
    start: 1320,
    end: 1380,
    text: "Ready when you are.",
  },
];

const chipStyle = {
  padding: "12px 20px",
  borderRadius: 999,
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: "rgba(236, 240, 255, 0.92)",
  background: "rgba(129, 140, 248, 0.14)",
  border: "1px solid rgba(167, 139, 250, 0.28)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset",
};

const cardBase = {
  borderRadius: 36,
  border: "1px solid rgba(148, 163, 184, 0.18)",
  background: "linear-gradient(180deg, rgba(15,23,42,0.84), rgba(15,23,42,0.58))",
  boxShadow: "0 28px 80px rgba(2, 6, 23, 0.42), inset 0 0 0 1px rgba(255,255,255,0.03)",
  backdropFilter: "blur(14px)",
};

const Caption = ({text}) => {
  return (
    <div
      style={{
        ...cardBase,
        padding: "22px 28px",
        minHeight: 132,
      }}
    >
      <div
        style={{
          height: 3,
          width: 82,
          borderRadius: 999,
          marginBottom: 16,
          background: "linear-gradient(90deg, #67e8f9, #a78bfa)",
        }}
      />
      <div
        style={{
          fontSize: 30,
          lineHeight: 1.28,
          color: "rgba(241, 245, 249, 0.96)",
          fontWeight: 520,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Equalizer = ({frame}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        height: 84,
      }}
    >
      {new Array(10).fill(true).map((_, i) => {
        const height = 20 + Math.abs(Math.sin(frame / 7 + i * 0.8)) * 60;
        const color = interpolateColors(i, [0, 9], ["#67e8f9", "#a78bfa"]);

        return (
          <div
            key={i}
            style={{
              width: 10,
              height,
              borderRadius: 999,
              background: color,
              boxShadow: `0 0 18px ${color}`,
              opacity: 0.88,
            }}
          />
        );
      })}
    </div>
  );
};

const ScenePanel = ({scene, frame, fps}) => {
  const localFrame = frame - scene.start;
  const entrance = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 200,
      stiffness: 140,
      mass: 0.9,
    },
  });

  const opacity = interpolate(
    frame,
    [scene.start, scene.start + 18, scene.end - 18, scene.end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(entrance, [0, 1], [42, 0]);
  const scale = interpolate(entrance, [0, 1], [0.96, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        gap: 54,
      }}
    >
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#67e8f9",
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontSize: 24,
            marginBottom: 24,
          }}
        >
          {scene.eyebrow}
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1,
            fontWeight: 760,
            color: "#f8fafc",
            maxWidth: 900,
            marginBottom: 28,
            textWrap: "balance",
          }}
        >
          {scene.title}
        </div>
        <div
          style={{
            fontSize: 38,
            lineHeight: 1.3,
            color: "rgba(226, 232, 240, 0.86)",
            maxWidth: 960,
            marginBottom: 32,
          }}
        >
          {scene.body}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            maxWidth: 920,
          }}
        >
          {scene.chips.map((chip) => (
            <div key={chip} style={chipStyle}>
              {chip}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          width: 470,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...cardBase,
            padding: 34,
            width: "100%",
            minHeight: 440,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.2em",
                fontWeight: 700,
                color: "rgba(148, 163, 184, 0.82)",
                marginBottom: 24,
              }}
            >
              VANE // CHUTES TEAM
            </div>
            <div
              style={{
                fontSize: 28,
                color: "rgba(148, 163, 184, 0.96)",
                marginBottom: 10,
              }}
            >
              {scene.statLabel}
            </div>
            <div
              style={{
                fontSize: 62,
                lineHeight: 1.02,
                fontWeight: 760,
                color: "#f8fafc",
                textWrap: "balance",
              }}
            >
              {scene.statValue}
            </div>
          </div>

          <div>
            <Equalizer frame={frame} />
            <div
              style={{
                marginTop: 24,
                height: 1,
                background: "rgba(148, 163, 184, 0.16)",
              }}
            />
            <div
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              {[
                ["Mode", "Persistent"],
                ["Tools", "Live"],
                ["Output", "Checked"],
                ["Style", "Action-first"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: 16,
                      letterSpacing: "0.16em",
                      color: "rgba(148, 163, 184, 0.82)",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 650,
                      color: "rgba(241, 245, 249, 0.96)",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VaneIntro = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const backgroundShift = interpolate(frame, [0, durationInFrames], [0, 1]);
  const caption = captions.find((c) => frame >= c.start && frame < c.end) ?? captions[captions.length - 1];

  return (
    <AbsoluteFill
      style={{
        background: "#030712",
        color: "white",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <Html5Audio src={staticFile("vane-voiceover-team.ogg")} volume={0.92} />

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${22 + backgroundShift * 8}% ${18 + backgroundShift * 6}%, rgba(103,232,249,0.18), rgba(3,7,18,0) 32%),
            radial-gradient(circle at ${76 - backgroundShift * 5}% ${28 + backgroundShift * 8}%, rgba(167,139,250,0.18), rgba(3,7,18,0) 34%),
            radial-gradient(circle at 50% 120%, rgba(56,189,248,0.12), rgba(3,7,18,0) 44%),
            linear-gradient(135deg, #050816 0%, #0f172a 52%, #111827 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.34,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${Math.sin(frame / 80) * 8}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -180,
          top: -180,
          width: 520,
          height: 520,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(103,232,249,0.20), rgba(103,232,249,0) 68%)",
          filter: "blur(24px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -140,
          bottom: -120,
          width: 460,
          height: 460,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(167,139,250,0.18), rgba(167,139,250,0) 68%)",
          filter: "blur(22px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "72px 86px 56px 86px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 34,
          }}
        >
          <div
            style={{
              ...chipStyle,
              fontSize: 20,
              padding: "10px 18px",
              background: "rgba(8, 47, 73, 0.42)",
              color: "#cffafe",
            }}
          >
            VANE // HERMES AGENT
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.2em",
              color: "rgba(148, 163, 184, 0.9)",
              fontWeight: 700,
            }}
          >
            CHUTES.AI TEAM DEMO
          </div>
        </div>

        <div
          style={{
            position: "relative",
            flex: 1,
          }}
        >
          {scenes.map((scene) => (
            <ScenePanel key={scene.eyebrow} scene={scene} frame={frame} fps={fps} />
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 26,
            alignItems: "end",
          }}
        >
          <Caption text={caption.text} />

          <div style={{...cardBase, padding: "22px 24px"}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                color: "rgba(148, 163, 184, 0.86)",
                fontWeight: 650,
                fontSize: 18,
                letterSpacing: "0.12em",
              }}
            >
              <span>PROGRESS</span>
              <span>{String(Math.floor(frame / fps)).padStart(2, "0")}s</span>
            </div>
            <div
              style={{
                height: 14,
                borderRadius: 999,
                background: "rgba(30, 41, 59, 0.92)",
                overflow: "hidden",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(frame / durationInFrames) * 100}%`,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #67e8f9 0%, #60a5fa 45%, #a78bfa 100%)",
                  boxShadow: "0 0 24px rgba(103, 232, 249, 0.35)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
