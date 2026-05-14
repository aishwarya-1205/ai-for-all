"use client";

import {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
} from "react";
import { Play, Pause } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   AUDIO SOURCES
   • Middle card (TTS / Voice Clone) are embedded as base64.
   • Side cards: drop your mp3 paths here ↓
──────────────────────────────────────────────────────────────────── */
const TTS_SRC = "/Text_to_Speech.mp3"
const VC_SRC = "/Voice_cloning.mp3"
const CHARACTER_SRC = "/Text_to_sound.mp3";
const COMPANION_SRC = "/Voice_cloning.mp3";

/* ─── TYPES ─────────────────────────────────────────────── */
interface PoemLine { text: string; start: number; end: number }
interface WaveformProps { visible: boolean; playing: boolean; accent?: string }
interface SideCard { id: string; category: string; title: string; tags: string; audioSrc: string; imageSrc: string; bgStyle: CSSProperties; lyrics: PoemLine[] }
interface SideVoiceCardProps { card: SideCard }

/* ─── POEM LINES ──────────────────────────────────────────────── */
const POEM_LINES: PoemLine[] = [
  { text: "Where the mind is without fear", start: 0.0, end: 3.2 },
  { text: "and the head is held high,", start: 3.2, end: 5.8 },
  { text: "Where knowledge is free,", start: 5.8, end: 8.2 },
  { text: "Where the world has not been broken up", start: 8.2, end: 11.5 },
  { text: "into fragments by narrow domestic walls,", start: 11.5, end: 15.0 },
  { text: "Into that heaven of freedom,", start: 15.0, end: 18.2 },
  { text: "my Father, let my country awake.", start: 18.2, end: 22.5 },
];

const JUNGLE_LYRICS: PoemLine[] = [
  { text: "Tropical jungle ambience with", start: 0.0, end: 2.8 },
  { text: "diverse toucan and parrot chirps,", start: 2.8, end: 5.5 },
  { text: "soft wind through leaves,", start: 5.5, end: 8.2 },
  { text: "and distant forest air.", start: 8.2, end: 11.5 },
];

const BAR_HEIGHTS: number[] = [3, 5, 9, 15, 21, 26, 28, 26, 21, 15, 9, 5, 3];
const DOT_COUNT = 9;

/* ─── SIDE CARDS DATA ─────────────────────────────────────────── */
const SIDE_CARDS: (SideCard & { lyrics: PoemLine[] })[] = [
  {
    id: "character",
    category: "Character",
    title: "Voice Acting",
    tags: "Expressive • Lively • Charismatic",
    audioSrc: CHARACTER_SRC,
    imageSrc: "/texture-white.jpg",
    bgStyle: { background: "linear-gradient(160deg, #c8885a 0%, #b07248 35%, #956040 65%, #7a4c30 100%)" },
    lyrics: JUNGLE_LYRICS,
  },
  {
    id: "companion",
    category: "Companion",
    title: "Intimate Conversation",
    tags: "Sensual • Flirty • Emotional",
    audioSrc: COMPANION_SRC,
    imageSrc: "/concrete.jpg",
    bgStyle: { background: "linear-gradient(160deg, #d87090 0%, #c05878 35%, #a84068 65%, #8c2c52 100%)" },
    lyrics: POEM_LINES,
  },
];

/* ─── ACTIVE LINE HELPER ──────────────────────────────────────── */
function getActiveIdx(t: number, lines: PoemLine[]): number {
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (t >= lines[i].start) idx = i; else break;
  }
  return idx;
}

/* ─── WAVEFORM ────────────────────────────────────────────────── */
const dotStyle: CSSProperties = {
  display: "block", width: 3, height: 3,
  borderRadius: "50%", background: "rgba(255,255,255,0.45)",
};

const Waveform = memo(function Waveform({ visible, playing, accent }: WaveformProps) {
  return (
    <div
      className="flex items-center gap-[3px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span key={`dl-${i}`} style={dotStyle} />
      ))}
      {BAR_HEIGHTS.map((h, i) => (
        <span key={`b-${i}`} style={{
          display: "block", width: 3, height: h, borderRadius: 2,
          background: accent ?? "white", transformOrigin: "center",
          animation: playing ? `fishWave 0.7s ease-in-out ${i * 50}ms infinite alternate` : "none",
          willChange: playing ? "transform" : "auto",
        }} />
      ))}
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span key={`dr-${i}`} style={dotStyle} />
      ))}
    </div>
  );
});

/* ─── PLAY BUTTON ─────────────────────────────────────────────── */
const PlayButton = memo(function PlayButton({
  playing, hovered, onClick, size,
}: { playing: boolean; hovered: boolean; onClick: (e: React.MouseEvent) => void; size: number }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: "50%",
      background: "rgba(255,255,255,0.92)", border: "none",
      cursor: "pointer", display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0,
      transform: hovered ? "scale(1.08)" : "scale(1)",
      transition: "transform 0.2s ease",
    }}>
      {playing
        ? <Pause style={{ width: size * 0.35, height: size * 0.35, color: "#1a1a1a" }} />
        : <Play style={{ width: size * 0.35, height: size * 0.35, color: "#1a1a1a", marginLeft: 1 }} />
      }
    </button>
  );
});

/* ─── LYRICS PANEL — Static display ───── */
const LyricsPanel = memo(function LyricsPanel({ accentColor, label, lines }: { accentColor: string; label: string; lines: PoemLine[] }) {
  return (
    <div style={lyricsPanelOuter}>
      <div style={{
        padding: "8px 14px 4px", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase" as const,
        color: accentColor, opacity: 0.9
      }}>
        {label}
      </div>
      <div style={lyricsScrollStyle}>
        {lines.map((line, i) => (
          <p key={i} style={{
            margin: "0 0 5px", lineHeight: 1.45,
            fontSize: 11.5,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            transition: "color 0.3s ease",
          }}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
});

const lyricsPanelOuter: CSSProperties = { height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" };
const lyricsScrollStyle: CSSProperties = { flex: 1, overflowY: "auto", padding: "2px 14px 10px", scrollbarWidth: "none" };

/* ─── AUDIO HOOK — fully lazy, no network until first play ────── */
function useAudio(src: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const listenerAttached = useRef(false);
  const onEndedRef = useRef<(() => void) | null>(null);

  const get = useCallback((): HTMLAudioElement => {
    if (!ref.current) {
      ref.current = new Audio(src);
      ref.current.preload = "none";
    }
    // Attach ended listener lazily on first get, if a handler is registered
    if (!listenerAttached.current && onEndedRef.current) {
      ref.current.addEventListener("ended", onEndedRef.current);
      listenerAttached.current = true;
    }
    return ref.current;
  }, [src]);

  const setOnEnded = useCallback((handler: () => void) => {
    onEndedRef.current = handler;
    // If audio already exists, attach immediately
    if (ref.current && !listenerAttached.current) {
      ref.current.addEventListener("ended", handler);
      listenerAttached.current = true;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.pause();
        ref.current.removeAttribute("src");
        ref.current.load();
        ref.current = null;
      }
      listenerAttached.current = false;
    };
  }, []);

  return { ref, get, setOnEnded };
}

/* ─── VOICE CLONE CARD (middle — split top/bottom) ───────────── */
function VoiceCloneCard() {
  const [topPlaying, setTopPlaying] = useState(false);
  const [botPlaying, setBotPlaying] = useState(false);
  const [topHover, setTopHover] = useState(false);
  const [botHover, setBotHover] = useState(false);

  const top = useAudio(TTS_SRC);
  const bot = useAudio(VC_SRC);

  const stop = useCallback((a: HTMLAudioElement | null, setP: (v: boolean) => void) => {
    if (!a) return; a.pause(); a.currentTime = 0; setP(false);
  }, []);

  // Register ended handlers lazily (no audio creation)
  useEffect(() => {
    top.setOnEnded(() => setTopPlaying(false));
    bot.setOnEnded(() => setBotPlaying(false));
  }, [top, bot]);

  const toggleTop = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const a = top.get();
    stop(bot.ref.current, setBotPlaying);
    if (topPlaying) { stop(a, setTopPlaying); }
    else { a.play().catch(() => setTopPlaying(false)); setTopPlaying(true); }
  }, [topPlaying, top, bot, stop]);

  const toggleBot = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const a = bot.get();
    stop(top.ref.current, setTopPlaying);
    if (botPlaying) { stop(a, setBotPlaying); }
    else { a.play().catch(() => setBotPlaying(false)); setBotPlaying(true); }
  }, [botPlaying, top, bot, stop]);

  return (
    <div style={cloneCardOuter}>
      {/* TOP */}
      <div
        style={halfStyle("linear-gradient(160deg, #d0c8c0 0%, #b8b0a8 35%, #a09890 65%, #888480 100%)", topHover)}
        onMouseEnter={() => setTopHover(true)}
        onMouseLeave={() => setTopHover(false)}
        onClick={toggleTop}
      >
        <div style={cardHeaderRow}>
          <span style={cardLabelStyle}>Original Voice</span>
          <div style={{ opacity: topHover || topPlaying ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <Waveform visible={topHover || topPlaying} playing={topPlaying} accent="rgba(255,255,255,0.9)" />
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <LyricsPanel accentColor="rgba(220,210,200,1)" label="Text to Speech" lines={POEM_LINES} />
        </div>
        <div style={cardFooterRow}>
          <div>
            <p style={titleStyle}>Audiobook</p>
            <p style={subStyle}>Professional · Calm · Articulate</p>
          </div>
          <PlayButton playing={topPlaying} hovered={topHover} onClick={toggleTop} size={34} />
        </div>
      </div>

      {/* Divider */}
      <div style={dividerStyle} />

      {/* BOTTOM */}
      <div
        style={halfStyle("linear-gradient(160deg, #7a9fd4 0%, #5a82b8 35%, #3f68a0 65%, #2a5088 100%)", botHover)}
        onMouseEnter={() => setBotHover(true)}
        onMouseLeave={() => setBotHover(false)}
        onClick={toggleBot}
      >
        <div style={cardHeaderRow}>
          <span style={cardLabelStyle}>Cloned Voice</span>
          <div style={{ opacity: botHover || botPlaying ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <Waveform visible={botHover || botPlaying} playing={botPlaying} accent="rgba(180,210,255,0.95)" />
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <LyricsPanel accentColor="rgba(160,200,255,1)" label="Voice Cloning" lines={POEM_LINES} />
        </div>
        <div style={cardFooterRow}>
          <div>
            <p style={titleStyle}>Cloned Narrator</p>
            <p style={subStyle}>Identical · Replicated · Indistinguishable</p>
          </div>
          <PlayButton playing={botPlaying} hovered={botHover} onClick={toggleBot} size={34} />
        </div>
      </div>
    </div>
  );
}

/* ─── SIDE VOICE CARD — with texture image overlay ───────────── */
const SideVoiceCard = memo(function SideVoiceCard({ card }: SideVoiceCardProps) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audio = useAudio(card.audioSrc);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!card.audioSrc) return;

    const a = audio.get();
    if (playing) {
      a.pause();
      a.currentTime = 0;
      setPlaying(false);
    } else {
      a.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }, [playing, card.audioSrc, audio]);

  // Register ended handler lazily — no audio object created on mount
  useEffect(() => {
    audio.setOnEnded(() => setPlaying(false));
  }, [audio]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer group"
      style={{ isolation: "isolate" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggle}
    >
      {/* Texture image */}
      <img
        src={card.imageSrc}
        alt={card.category}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: hovered ? "brightness(1.05)" : "brightness(0.95)",
          transform: hovered ? "scale(1.07)" : "scale(1.0)",
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        ...card.bgStyle,
        opacity: 0.72,
        transform: hovered ? "scale(1.07)" : "scale(1.0)",
        transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div style={cardHeaderRow}>
          <span style={cardLabelStyle}>{card.category}</span>
          <div style={{ opacity: hovered || playing ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <Waveform visible={hovered || playing} playing={playing} />
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <LyricsPanel accentColor="rgba(255,255,255,0.9)" label="Live Lyrics" lines={card.lyrics} />
        </div>

        <div style={cardFooterRow}>
          <div>
            <p style={titleStyle}>{card.title}</p>
            <p style={subStyle}>{card.tags}</p>
          </div>
          <PlayButton playing={playing} hovered={hovered} onClick={toggle} size={34} />
        </div>
      </div>
    </div>
  );
});

/* ─── STATIC STYLES ───────────────────────────────────────────── */
const cloneCardOuter: CSSProperties = { display: "flex", flexDirection: "column", height: "100%", borderRadius: 16, overflow: "hidden" };
const dividerStyle: CSSProperties = { height: 1.5, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)", flexShrink: 0 };
const cardHeaderRow: CSSProperties = { padding: "10px 14px 0", display: "flex", justifyContent: "space-between", alignItems: "center" };
const cardFooterRow: CSSProperties = { padding: "6px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" };
const cardLabelStyle: CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.88)" };
const titleStyle: CSSProperties = { margin: 0, fontSize: 12, fontWeight: 600, color: "white" };
const subStyle: CSSProperties = { margin: "1px 0 0", fontSize: 10, color: "rgba(255,255,255,0.6)" };

function halfStyle(gradient: string, isHovered: boolean): CSSProperties {
  return {
    position: "relative", flex: 1, overflow: "hidden",
    background: gradient, cursor: "pointer",
    filter: isHovered ? "brightness(1.08)" : "brightness(1)",
    transition: "filter 0.3s ease",
    display: "flex", flexDirection: "column",
  };
}

/* ─── MAIN EXPORT
     Smooth tab-open: the heavy base64 Audio objects are created lazily
     (only when first played). The component itself mounts instantly.
     Cards fade + slide in via CSS animation staggered per column.
──────────────────────────────────────────────────────────────────── */
export const VoiceDemo = memo(function VoiceDemo() {
  return (
    <>
      <div className="flex flex-col h-full px-5 pt-4 pb-5 gap-3">
        <p style={headingStyle}>AI Voice but this time, it&apos;s alive.</p>

        <div style={{ display: "flex", gap: 20, flex: 1, minHeight: 0 }}>
          <div className="voice-card-col" style={colStyle}>
            <SideVoiceCard card={SIDE_CARDS[0]} />
          </div>
          <div className="voice-card-col" style={colStyle}>
            <VoiceCloneCard />
          </div>
          <div className="voice-card-col" style={colStyle}>
            <SideVoiceCard card={SIDE_CARDS[1]} />
          </div>
        </div>
      </div>
    </>
  );
});

const headingStyle: CSSProperties = {
  textAlign: "center", fontSize: 10, fontWeight: 700,
  letterSpacing: "0.16em", textTransform: "uppercase",
  color: "var(--muted-foreground)", margin: 0,
};
const colStyle: CSSProperties = { flex: 1, minWidth: 0 };