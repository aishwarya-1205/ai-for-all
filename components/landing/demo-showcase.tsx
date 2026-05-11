"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { VoiceDemo } from "./VoiceDemo";
import { ChatDemo } from "./ChatDemo";
import { CodeDemo } from "./CodeDemo";
import {
  MessageSquare,
  Mic,
  Code2,
  Search,
  Play,
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
            {activeDemo.id === "search" && <SearchDemo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

/* ---------------- SEARCH DEMO ---------------- */

const SearchDemo = memo(function SearchDemo() {
  const results = [
    "Enterprise Refund Policy",
    "Customer Support Guidelines",
    "Billing FAQ",
  ];

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="flex items-center border border-border rounded-xl px-4 py-3 gap-3 bg-secondary">
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          What is our refund policy for enterprise customers?
        </span>
      </div>

      <div className="space-y-3">
        {results.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-secondary transition"
          >
            <span>{r}</span>
            <Play className="w-4 h-4 text-accent" />
          </div>
        ))}
      </div>
    </div>
  );
});
