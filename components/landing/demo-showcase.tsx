"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo, useRef } from "react";
import { VoiceDemo } from "./VoiceDemo";
import { ChatDemo } from "./ChatDemo";
import {
  MessageSquare,
  Mic,
  Code2,
  Search,
  RotateCcw,
  Sparkles,
  Send,
  Upload,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

import { SectionWrapper } from "../ui/section-wrapper";

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

/* ---------------- CHAT DEMO ---------------- */

// const ChatDemo = memo(function ChatDemo() {
//   const messages = [
//     {
//       role: "user",
//       content: "मुझे भारत के टॉप 5 स्टार्टअप यूनिकॉर्न के बारे में बताओ",
//     },
//     {
//       role: "assistant",
//       content:
//         "भारत के टॉप 5 स्टार्टअप यूनिकॉर्न हैं:\n\n1. Flipkart — $37.6B valuation\n2. BYJU'S — $22B valuation\n3. Swiggy — $10.7B valuation\n4. Ola Cabs — $7.3B valuation\n5. PhonePe — $12B valuation",
//     },
//   ];

//   const [visible, setVisible] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setVisible((v) => (v < messages.length ? v + 1 : v));
//     }, 1200);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="flex flex-col h-full">
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {messages.slice(0, visible).map((msg, i) => (
//           <div
//             key={i}
//             className={cn(
//               "flex gap-4",
//               msg.role === "user" ? "justify-end" : "",
//             )}
//           >
//             {msg.role === "assistant" && (
//               <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
//                 R
//               </div>
//             )}

//             <div
//               className={cn(
//                 "max-w-md rounded-xl px-4 py-3 text-sm",
//                 msg.role === "user"
//                   ? "bg-foreground text-background"
//                   : "bg-secondary border border-border",
//               )}
//             >
//               {msg.content}
//             </div>

//             {msg.role === "user" && (
//               <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-sm">
//                 U
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="border-t border-border p-4 flex items-center gap-3">
//         <div className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
//           Ask Rivinity something...
//         </div>

//         <button className="p-2 rounded-lg bg-accent text-white">
//           <Send className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// });

/* ---------------- VOICE DEMO ---------------- */

// const VoiceDemo = memo(function VoiceDemo() {
//   return (
//     <div className="flex flex-col h-full justify-between p-8">
//       <div className="flex flex-col items-center justify-center flex-1 text-center gap-6">
//         <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
//           <Mic className="w-10 h-10 text-accent" />
//         </div>

//         <p className="text-lg font-medium">Enable mic access or upload audio</p>

//         <p className="text-sm text-muted-foreground max-w-md">
//           Record your voice or upload an audio sample to generate speech in
//           different voices.
//         </p>
//       </div>

//       <div className="flex justify-end gap-3 border-t pt-6">
//         <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
//           <Upload className="w-4 h-4" />
//           Upload Audio
//         </button>

//         <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg">
//           <Mic className="w-4 h-4" />
//           Start Recording
//         </button>
//       </div>
//     </div>
//   );
// });

/* ---------------- CODE DEMO ---------------- */

const CodeDemo = memo(function CodeDemo() {
  const code = `const response = await rivinity.chat({
  model: "rivinity-turbo",
  messages: [{ role: "user", content: prompt }]
})`;

  const textRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (textRef.current) {
        textRef.current.textContent = code.slice(0, i);
      }
      i++;
      if (i > code.length) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-secondary">
        <pre ref={textRef}></pre>
      </div>

      <div className="border-t border-border px-6 py-3 text-xs text-muted-foreground">
        Rivinity Turbo Model Active
      </div>
    </div>
  );
});

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
