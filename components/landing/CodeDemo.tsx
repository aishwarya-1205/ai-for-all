"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import { Paperclip, ArrowUp, Sparkles, RotateCcw, Code2, Terminal, Check, Copy } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────── */
const PROMPT = "Build a high-performance React component with Framer Motion animations";

const RESPONSE_LINES = [
  "Absolutely! I've architected a production-ready component for you:",
  "",
  "→  Modular design with strict separation of concerns",
  "→  Framer Motion integration for liquid-smooth transitions",
  "→  Optimized re-renders using memo and useCallback",
  "",
  "Starting generation now...",
];

const RESPONSE_TEXT = RESPONSE_LINES.join("\n");

const CODE_SNIPPET = `import { motion } from "framer-motion";
import { memo } from "react";

export const AnimatedCard = memo(({ title, desc }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-card border"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </motion.div>
  );
});`;

// Timing constants (ms)
const PROMPT_CHAR_DELAY = 30; 
const PROMPT_DONE_PAUSE = 600; 
const THINKING_DURATION = 900; 
const RESPONSE_CHAR_DELAY = 12; 
const CODE_CHAR_DELAY = 6; // Fast streaming for code
const DONE_PAUSE = 4000; 
const INITIAL_DELAY = 500; 

/* ─────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────── */
type Phase = "idle" | "typing-prompt" | "sent" | "thinking" | "streaming-text" | "streaming-code" | "done";

/* ─────────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────────── */
function Cursor() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 2,
        height: "1em",
        verticalAlign: "text-bottom",
        background: "var(--accent)",
        borderRadius: 1,
        marginLeft: 1,
        animation: "rivCursor .85s step-end infinite",
      }}
    />
  );
}

function ThinkingDots() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--muted-foreground)",
            opacity: 0.5,
            animation: "rivDot 1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   CODE DEMO
   ───────────────────────────────────────────────────────── */
export const CodeDemo = memo(function CodeDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [promptChars, setPromptChars] = useState(0);
  const [respChars, setRespChars] = useState(0);
  const [codeChars, setCodeChars] = useState(0);

  const rafRef = useRef<number>(0);
  const stateRef = useRef({ phase: "idle" as Phase, promptChars: 0, respChars: 0, codeChars: 0 });

  stateRef.current = { phase, promptChars, respChars, codeChars };

  const runDemo = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPhase("idle");
    setPromptChars(0);
    setRespChars(0);
    setCodeChars(0);

    let startTime: number | null = null;

    const T_PROMPT_START = INITIAL_DELAY;
    const T_PROMPT_END = T_PROMPT_START + PROMPT.length * PROMPT_CHAR_DELAY;
    const T_SENT = T_PROMPT_END + PROMPT_DONE_PAUSE;
    const T_THINKING = T_SENT + 50;
    const T_TEXT_START = T_THINKING + THINKING_DURATION;
    const T_TEXT_END = T_TEXT_START + RESPONSE_TEXT.length * RESPONSE_CHAR_DELAY;
    const T_CODE_START = T_TEXT_END + 400;
    const T_CODE_END = T_CODE_START + CODE_SNIPPET.length * CODE_CHAR_DELAY;
    const T_DONE = T_CODE_END + 100;
    const T_RESTART = T_DONE + DONE_PAUSE;

    function tick(ts: number) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;

      if (elapsed < T_PROMPT_START) {
        // idle
      } else if (elapsed < T_PROMPT_END) {
        const chars = Math.floor((elapsed - T_PROMPT_START) / PROMPT_CHAR_DELAY);
        if (stateRef.current.phase !== "typing-prompt") setPhase("typing-prompt");
        if (stateRef.current.promptChars !== chars) setPromptChars(chars);
      } else if (elapsed < T_SENT) {
        if (stateRef.current.promptChars !== PROMPT.length) setPromptChars(PROMPT.length);
        if (stateRef.current.phase !== "typing-prompt") setPhase("typing-prompt");
      } else if (elapsed < T_THINKING) {
        if (stateRef.current.phase !== "sent") setPhase("sent");
      } else if (elapsed < T_TEXT_START) {
        if (stateRef.current.phase !== "thinking") setPhase("thinking");
      } else if (elapsed < T_TEXT_END) {
        const chars = Math.floor((elapsed - T_TEXT_START) / RESPONSE_CHAR_DELAY);
        if (stateRef.current.phase !== "streaming-text") setPhase("streaming-text");
        if (stateRef.current.respChars !== chars) setRespChars(chars);
      } else if (elapsed < T_CODE_START) {
        if (stateRef.current.respChars !== RESPONSE_TEXT.length) setRespChars(RESPONSE_TEXT.length);
        if (stateRef.current.phase !== "streaming-text") setPhase("streaming-text");
      } else if (elapsed < T_CODE_END) {
        const chars = Math.floor((elapsed - T_CODE_START) / CODE_CHAR_DELAY);
        if (stateRef.current.phase !== "streaming-code") setPhase("streaming-code");
        if (stateRef.current.codeChars !== chars) setCodeChars(chars);
      } else if (elapsed < T_DONE) {
        if (stateRef.current.codeChars !== CODE_SNIPPET.length) setCodeChars(CODE_SNIPPET.length);
        if (stateRef.current.phase !== "done") setPhase("done");
      } else if (elapsed < T_RESTART) {
        if (stateRef.current.phase !== "done") setPhase("done");
      } else {
        startTime = ts;
        setPhase("idle");
        setPromptChars(0);
        setRespChars(0);
        setCodeChars(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    runDemo();
    return () => cancelAnimationFrame(rafRef.current);
  }, [runDemo]);

  const isTyping = phase === "typing-prompt";
  const showPrompt = phase !== "idle";
  const showThink = phase === "thinking";
  const showRespText = phase === "streaming-text" || phase === "streaming-code" || phase === "done";
  const showRespCode = phase === "streaming-code" || phase === "done";
  const isDone = phase === "done";

  const visiblePrompt = PROMPT.slice(0, promptChars);
  const visibleResponse = RESPONSE_TEXT.slice(0, respChars);
  const visibleCode = CODE_SNIPPET.slice(0, codeChars);

  return (
    <>
      <style>{`
        @keyframes rivCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rivDot { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
        @keyframes rivSlideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rivFadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px 20px 16px",
        gap: 12,
        fontFamily: "var(--font-sans, 'Space Grotesk', sans-serif)",
      }}>
        {/* Response bubble */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 10,
          overflow: "hidden",
        }}>
          {/* User prompt bubble */}
          {showPrompt && (
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              animation: phase === "typing-prompt" ? "none" : "rivSlideUp 0.3s ease both",
            }}>
              <div style={{
                maxWidth: "80%",
                background: "var(--foreground)",
                color: "var(--background)",
                borderRadius: "18px 18px 4px 18px",
                padding: "10px 14px",
                fontSize: 13,
                lineHeight: 1.5,
              }}>
                {visiblePrompt}
                {isTyping && <Cursor />}
              </div>
            </div>
          )}

          {/* AI Response bubble */}
          {(showThink || showRespText) && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              animation: "rivSlideUp 0.3s ease both",
            }}>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1px solid var(--border)",
              }}>
                <Code2 size={16} color="white" />
              </div>

              <div style={{
                flex: 1,
                background: "var(--secondary)",
                border: "1px solid var(--border)",
                borderRadius: "4px 18px 18px 18px",
                padding: "10px 14px",
                fontSize: 12.5,
                lineHeight: 1.65,
                color: "var(--muted-foreground)",
                wordBreak: "break-word",
              }}>
                {showThink && <ThinkingDots />}
                {showRespText && (
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {visibleResponse}
                    {phase === "streaming-text" && <Cursor />}
                  </div>
                )}

                {showRespCode && (
                  <div style={{
                    marginTop: 12,
                    background: "rgba(0,0,0,0.03)",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    animation: "rivFadeIn 0.5s ease both",
                  }}>
                    <div style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(0,0,0,0.02)",
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.5 }}>AnimatedCard.tsx</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Terminal size={12} style={{ opacity: 0.3 }} />
                        <Copy size={12} style={{ opacity: 0.3 }} />
                      </div>
                    </div>
                    <pre style={{
                      padding: 12,
                      margin: 0,
                      fontSize: 11,
                      fontFamily: "var(--font-mono, monospace)",
                      lineHeight: 1.5,
                      color: "var(--foreground)",
                      overflowX: "auto",
                      background: "transparent",
                    }}>
                      {visibleCode}
                      {phase === "streaming-code" && <Cursor />}
                    </pre>
                  </div>
                )}

                {isDone && (
                  <div style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    animation: "rivFadeIn 0.4s ease both",
                  }}>
                    <Sparkles size={11} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: 11 }}>Codebase generated successfully</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input UI */}
        <div style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "14px 16px 12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            fontSize: 13.5,
            color: "var(--muted-foreground)",
            minHeight: 24,
            marginBottom: 14,
            opacity: 0.6,
          }}>
            Ask Rivinity to build something amazing...
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Paperclip size={16} style={{ color: "var(--muted-foreground)", opacity: 0.7 }} />
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 11,
              color: "var(--muted-foreground)",
              opacity: 0.7,
            }}>
              <span style={{ fontSize: 12 }}>⌘</span>
              <span>+</span>
              <span>K</span>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: isDone ? "var(--accent)" : "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {isDone ? <RotateCcw size={14} color="white" /> : <ArrowUp size={14} color="var(--muted-foreground)" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
