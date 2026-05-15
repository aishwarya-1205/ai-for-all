import { useState, useRef, useCallback, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  Code,
  FileText,
  Lightbulb,
  Search,
  Image as ImageIcon,
  ChevronDown,
  Plus,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pencil,
  BarChart3,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}
interface Tab {
  id: number;
  icon: typeof Search;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: Search, label: "Prompt Enhancer" },
  { id: 2, icon: FileText, label: "Smart Summarization" },
  { id: 3, icon: Lightbulb, label: "Citation Generator" },
];
const tabTemplates = [
  { icon: Search, label: "Prompt Enhancer" },
  { icon: FileText, label: "Smart Summarization" },
  { icon: Lightbulb, label: "Citation Generator" },
  { icon: BarChart3, label: "Deep Analysis" },
  { icon: BookOpen, label: "Literature Review" },
];
const suggestions = [
  { icon: Code, label: "Write code" },
  { icon: Search, label: "Research" },
  { icon: FileText, label: "Summarize" },
  { icon: Image, label: "Generate" },
  { icon: Lightbulb, label: "Brainstorm" },
];
const quickCards = [
  {
    icon: Code,
    title: "Build an API",
    desc: "RESTful endpoint with auth and validation",
  },
  {
    icon: FileText,
    title: "Write docs",
    desc: "Clean technical docs for any codebase",
  },
  {
    icon: Lightbulb,
    title: "Architect a system",
    desc: "Scalable patterns and data models",
  },
];

const MessageActions = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<"up" | "down" | null>(null);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-0.5 mt-1.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={copy}
        title="Copy"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <button
        title="Good response"
        onClick={() => setLiked(liked === "up" ? null : "up")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "up" ? "text-accent bg-accent/10" : "text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10"}`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        title="Bad response"
        onClick={() => setLiked(liked === "down" ? null : "down")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "down" ? "text-red-400 bg-red-400/10" : "text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10"}`}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
      <button
        title="Share"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <button
        title="Regenerate"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
      <button
        title="Read aloud"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const UserMessageActions = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-0.5 mt-1.5 mr-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        title="Edit"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={copy}
        title="Copy"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};

const SuggestionsCarousel = ({
  suggestions,
}: {
  suggestions: { icon: React.ElementType; label: string }[];
}) => {
  const { incognitoMode } = useSafeMode();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative group">
      <button
        onClick={() => scroll("left")}
        className={cn(
          "absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100",
          incognitoMode
            ? "bg-slate-950/20 border-slate-500/20 text-slate-400 hover:text-slate-300"
            : "glass border-glass text-muted-foreground/40 hover:text-foreground",
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-none px-2 justify-center no-scrollbar"
        style={
          {
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {suggestions.map((s) => (
          <button
            key={s.label}
            style={{ scrollSnapAlign: "center" }}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors text-[11.5px] font-medium",
              incognitoMode
                ? "bg-slate-500/10 text-slate-300/70 hover:bg-slate-500/20 hover:text-slate-100"
                : "bg-muted hover:bg-muted/80 text-muted-foreground",
            )}
          >
            <s.icon className="w-3 h-3" />
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={cn(
          "absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100",
          incognitoMode
            ? "bg-slate-950/20 border-slate-500/20 text-slate-400 hover:text-slate-300"
            : "glass border-glass text-muted-foreground/40 hover:text-foreground",
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const QuickCardsCarousel = ({
  cards,
  onSelect,
  textareaRef,
}: {
  cards: { icon: React.ElementType; title: string; desc: string }[];
  onSelect: (val: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
  const { incognitoMode } = useSafeMode();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    setIsMoved(false);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const delta = x - startX.current;
    if (Math.abs(delta) > 4) setIsMoved(true);
    trackRef.current.scrollLeft = scrollLeftRef.current - delta;
  };
  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="flex gap-2 overflow-x-auto cursor-grab active:cursor-grabbing select-none no-scrollbar"
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {cards.map((c, i) => (
          <button
            key={`${c.title}-${i}`}
            onClick={() => {
              if (!isMoved) {
                onSelect(c.desc);
                setTimeout(() => textareaRef.current?.focus(), 0);
              }
            }}
            className={cn(
              "shrink-0 text-left p-3 rounded-xl border transition-all duration-300 group flex flex-col items-start gap-2",
              incognitoMode
                ? "bg-slate-900/10 border-slate-500/10 hover:border-slate-500/30 hover:bg-slate-500/20"
                : "glass border-glass hover:border-glass-hover hover:shadow-float",
            )}
            style={{ width: "clamp(160px, 42vw, 220px)" }}
          >
            <c.icon
              className={cn(
                "w-4 h-4 transition-colors",
                incognitoMode
                  ? "text-slate-400 group-hover:text-slate-300"
                  : "text-accent/70 group-hover:text-accent",
              )}
            />
            <div>
              <p
                className={cn(
                  "text-[12.5px] font-medium transition-colors",
                  incognitoMode ? "text-slate-100/90" : "text-foreground/80",
                )}
              >
                {c.title}
              </p>
              <p
                className={cn(
                  "text-[11px] mt-0.5 leading-relaxed transition-colors",
                  incognitoMode
                    ? "text-slate-400/30 group-hover:text-slate-400/50"
                    : "text-muted-foreground/50",
                )}
              >
                {c.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("code") || l.includes("dev") || l.includes("script"))
    return Code;
  if (l.includes("search") || l.includes("find") || l.includes("look"))
    return Search;
  if (
    l.includes("image") ||
    l.includes("pic") ||
    l.includes("draw") ||
    l.includes("gen")
  )
    return ImageIcon;
  if (l.includes("idea") || l.includes("think") || l.includes("brain"))
    return Lightbulb;
  if (
    l.includes("doc") ||
    l.includes("report") ||
    l.includes("file") ||
    l.includes("text")
  )
    return FileText;
  return Search;
};

import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const CanvasMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { incognitoMode, setIncognitoMode } = useSafeMode();

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTab === id) setActiveTab((tabs[idx + 1] || tabs[idx - 1]).id);
    setTabs((p) => p.filter((t) => t.id !== id));
  };
  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((p) => [...p, { id: Date.now(), role: "user", content: text }]);
    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 50);
    setTimeout(
      () =>
        setMessages((p) => [
          ...p,
          {
            id: Date.now() + 1,
            role: "ai",
            content:
              "I'd be happy to help with that. Let me analyze your request and provide a comprehensive, well-structured solution.",
          },
        ]),
      700,
    );
  }, [input]);

  const isEmpty = messages.length === 0;

  const inputArea = (
    <div className="w-full max-w-[660px]">
      <div
        className={cn(
          "border rounded-2xl shadow-float transition-all duration-300 overflow-hidden",
          incognitoMode
            ? "bg-[#141414] border-slate-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-background border-border/60",
        )}
      >
        <div className="flex items-center overflow-x-auto scrollbar-none gap-0.5 px-2 py-1.5">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "group relative flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all duration-150 rounded-lg shrink-0 cursor-pointer",
                activeTab === tab.id
                  ? incognitoMode
                    ? "bg-slate-500/20 text-slate-200"
                    : "bg-muted/60 text-foreground"
                  : incognitoMode
                    ? "text-slate-400/40 hover:text-slate-300 hover:bg-slate-500/10"
                    : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-3 h-3 shrink-0" />
              {editingTabId === tab.id ? (
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => {
                    if (editingName.trim()) {
                      setTabs((p) =>
                        p.map((t) =>
                          t.id === tab.id
                            ? {
                                ...t,
                                label: editingName.trim(),
                                icon: getTabIcon(editingName.trim()),
                              }
                            : t,
                        ),
                      );
                    }
                    setEditingTabId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (editingName.trim()) {
                        setTabs((p) =>
                          p.map((t) =>
                            t.id === tab.id
                              ? {
                                  ...t,
                                  label: editingName.trim(),
                                  icon: getTabIcon(editingName.trim()),
                                }
                              : t,
                          ),
                        );
                      }
                      setEditingTabId(null);
                    }
                  }}
                  className="bg-transparent outline-none w-24"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span
                    className="truncate max-w-[120px]"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingTabId(tab.id);
                      setEditingName(tab.label);
                    }}
                  >
                    {tab.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <Pencil
                      className="w-2.5 h-2.5 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTabId(tab.id);
                        setEditingName(tab.label);
                      }}
                    />
                    {tabs.length > 1 && (
                      <X
                        className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity"
                        onClick={(e) => closeTab(tab.id, e)}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          <button
            onClick={() => setIsAddingTab(!isAddingTab)}
            className={cn(
              "px-3 py-2 flex items-center gap-1 text-[12px] font-medium transition-all shrink-0",
              isAddingTab
                ? incognitoMode
                  ? "text-slate-400 bg-slate-500/10"
                  : "bg-accent/10 text-accent"
                : incognitoMode
                  ? "text-slate-400/40 hover:text-slate-300 hover:bg-slate-500/10"
                  : "text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/60",
            )}
          >
            <Plus
              className={`w-3 h-3 transition-transform duration-300 ${isAddingTab ? "rotate-45" : ""}`}
            />
            <span className="sr-only">New Tab</span>
          </button>
        </div>

        {/* Template Selection Grid */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isAddingTab ? "max-h-[400px] opacity-100 border-b border-border/40" : "max-h-0 opacity-0"}`}
        >
          <div
            className={cn(
              "p-4",
              incognitoMode ? "bg-slate-950/10" : "bg-muted/20",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest px-1",
                  incognitoMode
                    ? "text-slate-400/30"
                    : "text-muted-foreground/40",
                )}
              >
                Research Tools
              </p>
              <div className="flex items-center gap-2">
                <input
                  value={newTabName}
                  onChange={(e) => setNewTabName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTabName.trim()) {
                      const tab = {
                        id: Date.now(),
                        icon: getTabIcon(newTabName.trim()),
                        label: newTabName.trim(),
                      };
                      setTabs((p) => [...p, tab]);
                      setActiveTab(tab.id);
                      setIsAddingTab(false);
                      setNewTabName("");
                    }
                  }}
                  className={cn(
                    "border rounded-lg px-3 py-1 text-[11px] outline-none transition-all w-36",
                    incognitoMode
                      ? "bg-slate-950/20 border-slate-500/20 focus:border-slate-500/40 text-slate-100"
                      : "bg-background/50 border-border/40 focus:border-accent/40",
                  )}
                  placeholder="Custom name..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {tabTemplates.map((template) => (
                <button
                  key={template.label}
                  onClick={() => {
                    const tab = {
                      id: Date.now(),
                      icon: template.icon,
                      label: template.label,
                    };
                    setTabs((p) => [...p, tab]);
                    setActiveTab(tab.id);
                    setIsAddingTab(false);
                  }}
                  className={cn(
                    "flex items-center w-full h-11 px-4 rounded-xl border border-transparent transition-all group",
                    incognitoMode
                      ? "hover:border-slate-500/20 hover:bg-slate-500/5"
                      : "hover:border-accent/20 bg-background/0 hover:bg-background/40 hover:shadow-sm",
                  )}
                >
                  <p
                    className={cn(
                      "text-[14px] font-medium transition-all group-hover:pl-2",
                      incognitoMode
                        ? "text-slate-100/60 group-hover:text-slate-400"
                        : "text-foreground/60 group-hover:text-accent",
                    )}
                  >
                    {template.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Curious? Ask and dive into scholarly insights"
          rows={2}
          className={cn(
            "w-full bg-transparent text-sm focus:outline-none px-4 pt-3 pb-1 resize-none",
            incognitoMode
              ? "text-slate-50 placeholder:text-slate-400/20"
              : "text-foreground placeholder:text-muted-foreground/40",
          )}
        />
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-0.5">
            <button
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                incognitoMode
                  ? "text-slate-400/30 hover:text-slate-400/60 hover:bg-slate-500/10"
                  : "text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40",
              )}
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
            <button
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                incognitoMode
                  ? "text-slate-400/30 hover:text-slate-400/60 hover:bg-slate-500/10"
                  : "text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40",
              )}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            {/* Radio Toggle for Model Selection */}
            <div
              className={cn(
                "flex p-0.5 rounded-lg border ml-1 hidden sm:flex transition-all duration-500",
                incognitoMode
                  ? "bg-slate-950/20 border-slate-500/10"
                  : "bg-muted/30 border-border/40",
              )}
            >
              {/* arc-1a button with hover popover */}
              <div className="relative group/enhancer">
                <button
                  onClick={() => setIncognitoMode(false)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-semibold transition-all duration-200",
                    !incognitoMode
                      ? "bg-background shadow-sm text-foreground ring-1 ring-accent/20"
                      : "text-muted-foreground/50 hover:text-muted-foreground",
                  )}
                >
                  <Sparkles
                    className={cn(
                      "w-3 h-3",
                      !incognitoMode ? "text-accent" : "",
                    )}
                  />
                  <span className={cn(!incognitoMode ? "text-accent" : "")}>
                    arc-1a
                  </span>
                </button>

                {/* Popup — only shown on hover */}
                <div
                  className={cn(
                    "absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50",
                    "opacity-0 pointer-events-none",
                    "group-hover/enhancer:opacity-100 group-hover/enhancer:pointer-events-auto",
                    "transition-all duration-200 translate-y-1 group-hover/enhancer:translate-y-0",
                    "bg-[#1c1c1e] rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap",
                  )}
                >
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1c1c1e]" />

                  <p className="text-white text-[11.5px] font-medium">
                    Prompt Enhancer
                  </p>
                </div>
              </div>

              {/* Incognito button — completely unchanged */}
              <button
                onClick={() => setIncognitoMode(!incognitoMode)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-semibold transition-all duration-200",
                  incognitoMode
                    ? "bg-slate-500/10 shadow-sm text-slate-400"
                    : "text-muted-foreground/50 hover:text-muted-foreground",
                )}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Incognito
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:opacity-80 transition-all",
              incognitoMode
                ? "bg-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.4)]"
                : "bg-foreground",
            )}
          >
            <Send
              className={cn(
                "w-3 h-3",
                incognitoMode ? "text-white" : "text-background",
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden transition-colors duration-500",
        incognitoMode ? "bg-[#0c0a09]" : "",
      )}
    >
      {/* Safe Mode Indicator */}
      {incognitoMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              History disabled
            </span>
          </div>
        </div>
      )}

      {/* Conditional Background Glow */}
      {incognitoMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-500/5 blur-[120px] rounded-full" />
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto relative">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center px-4 sm:px-6">
            <div className="flex-[4]" />

            {/* Content block */}
            <div className="w-full max-w-[660px] flex flex-col items-center">
              <div
                className={cn(
                  "relative w-18 h-18 sm:w-16 sm:h-16 mb-3 transition-all duration-500",
                  incognitoMode
                    ? "shadow-[0_0_40px_rgba(148,163,184,0.4)] scale-110"
                    : "shadow-glow-accent",
                )}
              >
                <Image
                  src="/logo.png"
                  alt="Rivinity Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p
                className={cn(
                  "text-[10px] tracking-widest uppercase mb-2 transition-colors",
                  incognitoMode
                    ? "text-slate-400/40"
                    : "text-muted-foreground/40",
                )}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h1
                className={cn(
                  "text-2xl sm:text-3xl lg:text-4xl font-semibold text-center leading-tight tracking-tight mb-1 transition-colors",
                  incognitoMode ? "text-slate-100" : "text-foreground/85",
                )}
              >
                What can I help you build?
              </h1>
              <div
                className={cn(
                  "h-0.5 w-12 rounded-full mt-3 mb-4 sm:mb-5 transition-all duration-500",
                  incognitoMode
                    ? "bg-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.5)]"
                    : "gradient-accent",
                )}
              />
              <div className="w-full mb-4">{inputArea}</div>

              <div className="w-full">
                <QuickCardsCarousel
                  cards={quickCards}
                  onSelect={setInput}
                  textareaRef={textareaRef}
                />
              </div>
            </div>

            <div className="flex-[1.5]" />

            <div className="w-full flex justify-center py-4 shrink-0">
              <p
                className={cn(
                  "text-[10px] transition-colors",
                  incognitoMode
                    ? "text-slate-400/20"
                    : "text-muted-foreground/30",
                )}
              >
                Rivinity can make mistakes. Review generated code before
                deploying.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[700px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group animate-float-in flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed transition-all duration-300",
                    msg.role === "user"
                      ? incognitoMode
                        ? "rounded-2xl rounded-br-lg bg-gradient-to-br from-slate-600 to-zinc-600 text-white shadow-[0_4px_15px_rgba(148,163,184,0.2)]"
                        : "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground"
                      : incognitoMode
                        ? "rounded-2xl rounded-bl-lg bg-slate-900/10 border border-slate-500/10 text-slate-100/80"
                        : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/80",
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === "ai" && <MessageActions content={msg.content} />}
                {msg.role === "user" && (
                  <UserMessageActions content={msg.content} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div
          className={cn(
            "px-3 sm:px-6 pb-3 sm:pb-4 pt-2 flex justify-center shrink-0 border-t transition-colors duration-500",
            incognitoMode
              ? "border-slate-500/10 bg-slate-950/5"
              : "border-border/30",
          )}
        >
          {inputArea}
        </div>
      )}
    </div>
  );
};

export default CanvasMain;
