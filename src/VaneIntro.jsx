import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BRAND = {
  bg: "#05070d",
  panel: "rgba(10, 14, 24, 0.78)",
  panelBorder: "rgba(255, 255, 255, 0.08)",
  text: "#f8fafc",
  muted: "rgba(226, 232, 240, 0.76)",
  subtext: "rgba(148, 163, 184, 0.88)",
  mint: "#b9ff66",
  lime: "#d9ff72",
  purple: "#8b5cf6",
  violet: "#c084fc",
  cyan: "#38bdf8",
  blue: "#60a5fa",
  amber: "#fbbf24",
  coral: "#fb7185",
};

const scenes = [
  {
    start: 0,
    end: 180,
    eyebrow: "MEET VANE",
    title: "A Hermes agent built for Chutes.ai",
    body: "Persistent context, live tools, and real execution for the team.",
    chips: ["Research", "Writing", "Automation"],
    metrics: [
      ["Mode", "Execution"],
      ["Context", "Persistent"],
      ["Tools", "Live"],
      ["Output", "Usable"],
    ],
    statLabel: "Role",
    statValue: "Operator layer",
  },
  {
    start: 180,
    end: 390,
    eyebrow: "WHAT CHUTES IS",
    title: "Serverless AI compute for open models",
    body: "Production-scale inference, confidential compute through TEEs, and deep Bittensor roots.",
    chips: ["Open-source", "Serverless", "TEE", "Bittensor"],
    metrics: [
      ["Scale", "Production"],
      ["Privacy", "Verified"],
      ["Models", "Open"],
      ["Speed", "Fast launch"],
    ],
    statLabel: "Positioning",
    statValue: "Private AI at scale",
  },
  {
    start: 390,
    end: 690,
    eyebrow: "TEAM CONTEXT",
    title: "I already know the room",
    body: "I can start with real team context instead of a blank page, and work in the lanes that already exist inside Chutes.",
    chips: ["Backend", "Frontend", "Sales", "Marketing", "Technical"],
    panel: "roster",
    statLabel: "Known roster",
    statValue: "10 teammates",
  },
  {
    start: 690,
    end: 900,
    eyebrow: "WHAT I DO",
    title: "Inspect. Verify. Write. Organize.",
    body: "Websites, product flows, SEO surfaces, competitor claims, GitHub tasks, Notion hubs, and recurring ops.",
    chips: ["Live web", "SEO", "GitHub", "Notion"],
    metrics: [
      ["Web", "Inspect"],
      ["Claims", "Verify"],
      ["Content", "Draft"],
      ["Ops", "Automate"],
    ],
    statLabel: "Default output",
    statValue: "Checked work",
  },
  {
    start: 900,
    end: 1080,
    eyebrow: "FROM ASK TO ASSET",
    title: "Turn the messy request into something usable",
    body: "Strategy docs, launch assets, research, planning, and repeatable workflows for the Chutes team.",
    chips: ["Launches", "Docs", "Planning", "Workflows"],
    metrics: [
      ["Style", "Action-first"],
      ["Scope", "Team-wide"],
      ["Format", "Deliverable"],
      ["Speed", "Same session"],
    ],
    statLabel: "Promise",
    statValue: "Prompt to output",
  },
];

const footnotes = [
  {start: 0, end: 180, text: "Persistent context + live tools + real execution."},
  {start: 180, end: 390, text: "Branded for Chutes: dark mode, mint accents, holographic cubes."},
  {start: 390, end: 690, text: "Team-aware by default: backend, launches, sales, marketing, and technical staff."},
  {start: 690, end: 900, text: "Inspect the live surface. Verify the claim. Turn it into usable work."},
  {start: 900, end: 1080, text: "Give Vane the rough prompt. Get a checked asset back."},
];

const teamGroups = [
  {
    label: "Backend",
    names: "Jon, Cxmplex, Florian, Kyle, Chris / Sirouk",
    color: BRAND.mint,
  },
  {
    label: "Frontend + launches",
    names: "Vince / Veight",
    color: BRAND.cyan,
  },
  {
    label: "Sales + customer success",
    names: "Timon / Algowary",
    color: BRAND.purple,
  },
  {
    label: "Marketing + community",
    names: "Fezicles",
    color: BRAND.amber,
  },
  {
    label: "Technical staff",
    names: "Rykorb, Vonkaiser",
    color: BRAND.coral,
  },
];

const chipColors = [
  "rgba(185,255,102,0.16)",
  "rgba(56,189,248,0.14)",
  "rgba(139,92,246,0.16)",
  "rgba(251,191,36,0.14)",
];

const cardBase = {
  borderRadius: 34,
  border: `1px solid ${BRAND.panelBorder}`,
  background: `linear-gradient(180deg, rgba(11,16,29,0.92), ${BRAND.panel})`,
  boxShadow:
    "0 30px 90px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255,255,255,0.02)",
  backdropFilter: "blur(18px)",
};

const ChipRow = ({chips}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 900,
      }}
    >
      {chips.map((chip, index) => (
        <div
          key={chip}
          style={{
            padding: "12px 20px",
            borderRadius: 999,
            fontSize: 23,
            fontWeight: 650,
            color: BRAND.text,
            background: chipColors[index % chipColors.length],
            border: `1px solid ${index % 2 === 0 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          {chip}
        </div>
      ))}
    </div>
  );
};

const Footer = ({frame, fps, durationInFrames, text}) => {
  return (
    <div
      style={{
        marginTop: 26,
        display: "grid",
        gridTemplateColumns: "1.45fr 0.9fr",
        gap: 26,
        alignItems: "end",
      }}
    >
      <div
        style={{
          ...cardBase,
          padding: "20px 26px",
          minHeight: 116,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: 4,
            width: 92,
            borderRadius: 999,
            marginBottom: 16,
            background:
              "linear-gradient(90deg, rgba(185,255,102,1) 0%, rgba(56,189,248,1) 45%, rgba(139,92,246,1) 100%)",
          }}
        />
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.25,
            color: BRAND.text,
            fontWeight: 560,
          }}
        >
          {text}
        </div>
      </div>

      <div style={{...cardBase, padding: "22px 24px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            color: BRAND.subtext,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "0.16em",
          }}
        >
          <span>PROGRESS</span>
          <span>{String(Math.floor(frame / fps)).padStart(2, "0")}s</span>
        </div>
        <div
          style={{
            height: 14,
            borderRadius: 999,
            background: "rgba(15, 23, 42, 0.95)",
            overflow: "hidden",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(frame / durationInFrames) * 100}%`,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #b9ff66 0%, #38bdf8 32%, #8b5cf6 68%, #fbbf24 100%)",
              boxShadow: "0 0 28px rgba(185,255,102,0.28)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const MetricGrid = ({metrics}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {metrics.map(([label, value], index) => (
        <div
          key={label}
          style={{
            borderRadius: 22,
            padding: "18px 18px 16px 18px",
            background:
              index % 4 === 0
                ? "rgba(185,255,102,0.10)"
                : index % 4 === 1
                  ? "rgba(56,189,248,0.10)"
                  : index % 4 === 2
                    ? "rgba(139,92,246,0.11)"
                    : "rgba(251,191,36,0.10)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.16em",
              fontWeight: 700,
              color: BRAND.subtext,
              marginBottom: 9,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.1,
              fontWeight: 700,
              color: BRAND.text,
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

const BrandImagePanel = ({frame, metrics, statLabel, statValue}) => {
  const floatY = Math.sin(frame / 28) * 12;
  const rotate = Math.sin(frame / 44) * 4;

  return (
    <div
      style={{
        ...cardBase,
        padding: 26,
        width: "100%",
        minHeight: 470,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: BRAND.subtext,
            marginBottom: 18,
          }}
        >
          CHUTES.AI VISUAL SYSTEM
        </div>
        <div
          style={{
            fontSize: 28,
            color: BRAND.subtext,
            marginBottom: 8,
          }}
        >
          {statLabel}
        </div>
        <div
          style={{
            fontSize: 56,
            lineHeight: 1.02,
            fontWeight: 760,
            color: BRAND.text,
            marginBottom: 20,
          }}
        >
          {statValue}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 210,
          borderRadius: 28,
          overflow: "hidden",
          marginBottom: 22,
          background:
            "radial-gradient(circle at 24% 24%, rgba(185,255,102,0.22), rgba(185,255,102,0) 34%), radial-gradient(circle at 76% 22%, rgba(139,92,246,0.32), rgba(139,92,246,0) 36%), linear-gradient(135deg, rgba(9,14,24,0.98), rgba(14,23,42,0.96))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(185,255,102,0.12), rgba(56,189,248,0.06) 35%, rgba(139,92,246,0.12) 72%, rgba(251,191,36,0.10) 100%)",
          }}
        />
        <Img
          src={staticFile("chutes-cubes.png")}
          style={{
            position: "absolute",
            right: -10,
            bottom: -14,
            width: 300,
            transform: `translateY(${floatY}px) rotate(${rotate}deg)`,
            filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.42))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 24,
            width: 176,
          }}
        >
          <div
            style={{
              fontSize: 15,
              letterSpacing: "0.16em",
              color: BRAND.subtext,
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            BRAND CUES
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            {[
              ["Dark mode", BRAND.text],
              ["Mint action accents", BRAND.mint],
              ["Holographic cubes", BRAND.violet],
            ].map(([label, color]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 18,
                  color: BRAND.text,
                  fontWeight: 560,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: color,
                    boxShadow: `0 0 18px ${color}`,
                  }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MetricGrid metrics={metrics} />
    </div>
  );
};

const TeamRosterPanel = ({statLabel, statValue}) => {
  return (
    <div
      style={{
        ...cardBase,
        padding: 24,
        width: "100%",
        minHeight: 470,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 16,
          letterSpacing: "0.18em",
          fontWeight: 700,
          color: BRAND.subtext,
          marginBottom: 18,
        }}
      >
        TEAM SNAPSHOT
      </div>
      <div
        style={{
          fontSize: 26,
          color: BRAND.subtext,
          marginBottom: 8,
        }}
      >
        {statLabel}
      </div>
      <div
        style={{
          fontSize: 56,
          lineHeight: 1.02,
          fontWeight: 760,
          color: BRAND.text,
          marginBottom: 20,
        }}
      >
        {statValue}
      </div>

      <div style={{display: "flex", flexDirection: "column", gap: 12, flex: 1}}>
        {teamGroups.map((group) => (
          <div
            key={group.label}
            style={{
              borderRadius: 22,
              padding: "16px 18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 4px 0 0 0 transparent",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 5,
                background: group.color,
              }}
            />
            <div
              style={{
                fontSize: 15,
                letterSpacing: "0.14em",
                fontWeight: 700,
                color: group.color,
                marginBottom: 8,
                marginLeft: 4,
              }}
            >
              {group.label}
            </div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.22,
                color: BRAND.text,
                fontWeight: 560,
                marginLeft: 4,
              }}
            >
              {group.names}
            </div>
          </div>
        ))}
      </div>
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
    [scene.start, scene.start + 16, scene.end - 18, scene.end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(entrance, [0, 1], [38, 0]);
  const scale = interpolate(entrance, [0, 1], [0.97, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        gap: 52,
      }}
    >
      <div
        style={{
          flex: 1.18,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: BRAND.mint,
              boxShadow: `0 0 18px ${BRAND.mint}`,
            }}
          />
          <div
            style={{
              color: BRAND.mint,
              fontWeight: 760,
              letterSpacing: "0.18em",
              fontSize: 22,
            }}
          >
            {scene.eyebrow}
          </div>
        </div>
        <div
          style={{
            fontSize: 88,
            lineHeight: 0.98,
            fontWeight: 780,
            color: BRAND.text,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          {scene.title}
        </div>
        <div
          style={{
            fontSize: 35,
            lineHeight: 1.28,
            color: BRAND.muted,
            maxWidth: 910,
            marginBottom: 34,
          }}
        >
          {scene.body}
        </div>
        <ChipRow chips={scene.chips} />
      </div>

      <div
        style={{
          width: 484,
          display: "flex",
          alignItems: "center",
        }}
      >
        {scene.panel === "roster" ? (
          <TeamRosterPanel statLabel={scene.statLabel} statValue={scene.statValue} />
        ) : (
          <BrandImagePanel
            frame={frame}
            metrics={scene.metrics}
            statLabel={scene.statLabel}
            statValue={scene.statValue}
          />
        )}
      </div>
    </div>
  );
};

export const VaneIntro = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const backgroundShift = frame / durationInFrames;
  const footer =
    footnotes.find((entry) => frame >= entry.start && frame < entry.end) ?? footnotes[footnotes.length - 1];

  return (
    <AbsoluteFill
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${18 + backgroundShift * 10}% ${18 + backgroundShift * 4}%, rgba(185,255,102,0.18), rgba(185,255,102,0) 28%),
            radial-gradient(circle at ${78 - backgroundShift * 8}% ${16 + backgroundShift * 10}%, rgba(139,92,246,0.22), rgba(139,92,246,0) 30%),
            radial-gradient(circle at 78% 84%, rgba(251,191,36,0.12), rgba(251,191,36,0) 26%),
            radial-gradient(circle at 26% 86%, rgba(56,189,248,0.16), rgba(56,189,248,0) 28%),
            linear-gradient(145deg, #02040a 0%, #05070d 30%, #090f1b 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          transform: `translateY(${Math.sin(frame / 80) * 10}px)`,
        }}
      />

      <Img
        src={staticFile("chutes-cubes.png")}
        style={{
          position: "absolute",
          right: -150,
          top: 90,
          width: 760,
          opacity: 0.1,
          transform: `rotate(${8 + Math.sin(frame / 50) * 2}deg)`,
          filter: "blur(1px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "64px 84px 54px 84px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderRadius: 999,
              background: "rgba(185,255,102,0.12)",
              border: "1px solid rgba(185,255,102,0.22)",
              color: BRAND.lime,
              fontSize: 19,
              fontWeight: 760,
              letterSpacing: "0.16em",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: BRAND.mint,
                boxShadow: `0 0 18px ${BRAND.mint}`,
              }}
            />
            VANE // CHUTES.AI
          </div>

          <div
            style={{
              fontSize: 19,
              letterSpacing: "0.22em",
              color: BRAND.subtext,
              fontWeight: 760,
            }}
          >
            TEAM DEMO // SILENT CUT
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

        <Footer frame={frame} fps={fps} durationInFrames={durationInFrames} text={footer.text} />
      </div>
    </AbsoluteFill>
  );
};
