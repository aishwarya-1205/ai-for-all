"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo, useRef, useEffect } from "react";
import { VoiceDemo } from "./VoiceDemo";
import { ChatDemo } from "./ChatDemo";
import { CodeDemo } from "./CodeDemo";
import {
  MessageSquare,
  Mic,
  Code2,
  Search,
  Play,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  ChevronRight,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../ui/section-wrapper";

const demos = [
  {
    id: "chat",
    label: "Conversational AI",
    icon: MessageSquare,
    title: "Rivinity Chat Workspace",
  },
  {
    id: "voice",
    label: "Voice AI",
    icon: Mic,
    title: "Voice Intelligence",
  },
  {
    id: "code",
    label: "Code Generation",
    icon: Code2,
    title: "AI Code Assistant",
  },
  {
    id: "search",
    label: "AI Search",
    icon: Search,
    title: "Semantic Search",
  },
];

export function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [demoState, setDemoState] = useState(0);

  const restart = () => setDemoState((p) => p + 1);

  return (
    <SectionWrapper className="bg-background" id="experience">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Experience <span className="text-gradient">Rivinity</span>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore interactive demos that simulate real Rivinity workflows.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="w-full max-w-5xl flex flex-wrap justify-between gap-2 p-2 rounded-xl bg-card border border-border">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => {
                setActiveDemo(demo);
                restart();
              }}
              className={cn(
                "flex items-center justify-center gap-2 px-2 sm:px-4 py-2 rounded-lg text-[11px] sm:text-sm font-medium transition text-center",
                activeDemo.id === demo.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <demo.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="h-[360px] sm:h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDemo.id}-${demoState}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {activeDemo.id === "chat" && <ChatDemo />}
            {activeDemo.id === "voice" && <VoiceDemo />}
            {activeDemo.id === "code" && <CodeDemo />}
            {activeDemo.id === "search" && <SearchDemo onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

const SearchDemo = memo(function SearchDemo({ onRestart }: { onRestart: () => void }) {
  const [phase, setPhase] = useState<
    "idle" | "typing" | "searching" | "sources" | "streaming" | "done"
  >("idle");
  const [queryChars, setQueryChars] = useState(0);
  const [answerChars, setAnswerChars] = useState(0);

  const FULL_QUERY = "What are AI agents and how do they work?";
  const FULL_ANSWER =
    "AI agents are autonomous systems designed to perceive their environment, reason about goals, and take actions to achieve them. They represent a shift from reactive tools to proactive collaborators.";

  const suggestedQuestions = [
    "How do I build my first AI agent?",
    "What's the difference between an agent and an LLM?",
    "Can agents work together in a swarm?",
    "What are the best frameworks for AI agents?",
  ];

  const sources = [
    { name: "rivinity.ai", icon: "R" },
    { name: "github.com", icon: "G" },
    { name: "arxiv.org", icon: "A" },
  ];

  const rafRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;

      const T_TYPING_START = 500;
      const T_TYPING_END = T_TYPING_START + FULL_QUERY.length * 40;
      const T_SEARCHING = T_TYPING_END + 400;
      const T_SOURCES = T_SEARCHING + 1200;
      const T_STREAMING_START = T_SOURCES + 400;
      const T_STREAMING_END = T_STREAMING_START + FULL_ANSWER.length * 15;
      const T_DONE = T_STREAMING_END + 400;

      if (elapsed < T_TYPING_START) {
        setPhase("idle");
      } else if (elapsed < T_TYPING_END) {
        setPhase("typing");
        setQueryChars(Math.floor((elapsed - T_TYPING_START) / 40));
      } else if (elapsed < T_SEARCHING) {
        setQueryChars(FULL_QUERY.length);
        setPhase("typing");
      } else if (elapsed < T_SOURCES) {
        setPhase("searching");
      } else if (elapsed < T_STREAMING_START) {
        setPhase("sources");
      } else if (elapsed < T_STREAMING_END) {
        setPhase("streaming");
        setAnswerChars(Math.floor((elapsed - T_STREAMING_START) / 15));
      } else {
        setAnswerChars(FULL_ANSWER.length);
        setPhase("done");
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
        {/* Response Area */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 10,
          overflow: "hidden",
        }}>
          {/* User prompt bubble */}
          {(phase !== "idle") && (
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              animation: phase === "typing" ? "none" : "rivSlideUp 0.3s ease both",
            }}>
              <div style={{
                maxWidth: "80%",
                background: "var(--foreground)",
                color: "var(--background)",
                borderRadius: "18px 18px 4px 18px",
                padding: "10px 14px",
                fontSize: 13,
                lineHeight: 1.5,
                wordBreak: "break-word",
              }}>
                {FULL_QUERY.slice(0, queryChars)}
                {phase === "typing" && <span style={{ display: "inline-block", width: 2, height: "1em", verticalAlign: "text-bottom", background: "var(--accent)", borderRadius: 1, marginLeft: 1, animation: "rivCursor .85s step-end infinite" }} />}
              </div>
            </div>
          )}

          {/* AI Response Area */}
          {(phase === "searching" || phase === "sources" || phase === "streaming" || phase === "done") && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              animation: "rivSlideUp 0.3s ease both",
            }}>
              {/* Avatar */}
              <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, overflow: "hidden", border: "1px solid var(--border)" }}>
                <img src="/logo.png" alt="Rivinity" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Bubble */}
              <div style={{
                flex: 1,
                background: "var(--secondary)",
                border: "1px solid var(--border)",
                borderRadius: "4px 18px 18px 18px",
                padding: "12px 14px",
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--muted-foreground)",
                wordBreak: "break-word",
              }}>
                {phase === "searching" && (
                  <div className="flex flex-col items-center justify-center py-4 space-y-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Searching the web...</span>
                  </div>
                )}

                {(phase === "sources" || phase === "streaming" || phase === "done") && (
                  <div className="space-y-5 animate-in fade-in duration-500">
                    {/* Sources */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
                        <Globe className="w-3 h-3" /> Sources
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sources.map((source, i) => (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                            className="flex items-center gap-2 px-2 py-1 bg-background border border-border rounded-full shadow-sm"
                          >
                            <div className="w-3.5 h-3.5 rounded-full bg-accent/10 flex items-center justify-center text-[9px] font-bold text-accent border border-accent/20">
                              {source.icon}
                            </div>
                            <span className="text-[10px] font-medium">{source.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-4">
                      <div className="text-sm leading-relaxed text-foreground/90 font-medium">
                        {FULL_ANSWER.slice(0, answerChars)}
                        {phase === "streaming" && <span style={{ display: "inline-block", width: 2, height: "1em", verticalAlign: "text-bottom", background: "var(--accent)", borderRadius: 1, marginLeft: 1, animation: "rivCursor .85s step-end infinite" }} />}
                        {phase === "done" && (
                          <span className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-accent/10 text-[9px] font-bold text-accent border border-accent/20">1</span>
                        )}
                      </div>

                      {phase === "done" && (
                        <div className="space-y-3 pt-1 animate-in fade-in duration-700">
                          <div className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-accent font-bold">→</span>
                            <span>
                              <strong>Task Decomposition:</strong> Agents break down complex goals into manageable steps using iterative reasoning.
                              <span className="inline-flex items-center justify-center w-3.5 h-3.5 ml-1 rounded-full bg-accent/10 text-[8px] font-bold text-accent border border-accent/20">2</span>
                            </span>
                          </div>
                          <div className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-accent font-bold">→</span>
                            <span>
                              <strong>Tool Usage:</strong> They can interact with external APIs, databases, and web browsers to fetch real-time data.
                              <span className="inline-flex items-center justify-center w-3.5 h-3.5 ml-1 rounded-full bg-accent/10 text-[8px] font-bold text-accent border border-accent/20">3</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Suggested */}
                    {phase === "done" && (
                      <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-700 border-t border-border/50">
                        <div className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest mb-2">Suggested questions</div>
                        <div className="space-y-1.5">
                          {suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              className="flex items-center justify-between w-full p-2 text-[11px] text-left border border-border rounded-lg hover:bg-background transition group"
                            >
                              <span className="text-muted-foreground group-hover:text-foreground transition line-clamp-1">{q}</span>
                              <ChevronRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-accent transition flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Card */}
        <div style={{
          background: "var(--card, #fff)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "14px 16px 12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: 13.5,
            color: "var(--muted-foreground)",
            minHeight: 24,
            lineHeight: 1.5,
            marginBottom: 14,
            wordBreak: "break-word",
          }}>
            <span style={{ opacity: phase === "idle" ? 0.6 : 0.45 }}>Search with Rivinity Intelligence…</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", color: "var(--muted-foreground)", opacity: 0.7 }}>
              <Globe size={16} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 3, border: "1px solid var(--border)", borderRadius: 6, padding: "2px 7px", fontSize: 11, color: "var(--muted-foreground)", opacity: 0.7 }}>
              <span style={{ fontSize: 12 }}>⌘</span><span>+</span><span>G</span>
            </div>
            <div style={{ flex: 1 }} />
            <button
              onClick={onRestart}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: phase === "done" ? "var(--foreground)" : "var(--secondary)",
                border: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {phase === "done" ? <RotateCcw size={14} className="text-background" /> : <Search size={14} className="text-muted-foreground" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
