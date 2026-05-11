import {
  Sparkles,
  Plus,
  MessageSquare,
  Bookmark,
  Clock,
  X,
} from "lucide-react";
import Image from "next/image";

const conversations = [
  { id: 1, title: "Build a REST API endpoint", time: "2m ago" },
  { id: 2, title: "Design system architecture", time: "1h ago" },
  { id: 3, title: "Optimize database queries", time: "3h ago" },
  { id: 4, title: "React component patterns", time: "Yesterday" },
  { id: 5, title: "Auth flow implementation", time: "Yesterday" },
];

const saved = [
  { id: 6, title: "ML pipeline docs", time: "2d ago" },
  { id: 7, title: "Deployment checklist", time: "5d ago" },
];

import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

interface CanvasSidebarProps {
  onClose?: () => void;
}

const CanvasSidebar = ({ onClose }: CanvasSidebarProps) => {
  const { incognitoMode } = useSafeMode();

  return (
    <aside className={cn(
      "w-[260px] h-full flex flex-col shrink-0 transition-colors duration-500",
      incognitoMode ? "bg-[#0a0510]" : "bg-background"
    )}>
      <div className="px-5 pt-5 pb-4 relative flex items-center justify-center">
        {/* Centered Logo + Text */}
        <div className="flex items-center gap-2.5">
          <div className={`relative w-10 h-10 transition-all duration-500 ${incognitoMode ? "shadow-[0_0_20px_rgba(168,85,247,0.3)]" : ""}`}>
            <Image
              src="/logo.png"
              alt="Rivinity Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className={cn(
            "font-semibold tracking-tight text-[17px] transition-colors",
            incognitoMode ? "text-purple-100" : "text-foreground"
          )}>
            Rivinity
          </span>
        </div>

        {/* Close button (stays right) */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className={cn(
              "absolute right-5 w-7 h-7 rounded-lg flex items-center justify-center transition-all lg:hidden",
              incognitoMode ? "text-purple-400/50 hover:text-purple-300" : "text-muted-foreground/50 hover:text-foreground/70"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="px-4 mb-4">
        <button className={cn(
          "w-full h-9 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300",
          incognitoMode
            ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            : "gradient-accent text-primary-foreground hover:opacity-90"
        )}>
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-5">
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <MessageSquare className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
              Conversations
            </span>
          </div>
          {conversations.map((c) => (
            <button
              key={c.id}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl transition-all duration-150",
                incognitoMode ? "hover:bg-purple-500/10" : "hover:bg-muted/50"
              )}
            >
              <p className={cn(
                "text-[13px] truncate transition-colors",
                incognitoMode ? "text-purple-100/70" : "text-foreground/70"
              )}>
                {c.title}
              </p>
              <p className={cn(
                "text-[11px] mt-0.5 transition-colors",
                incognitoMode ? "text-purple-400/30" : "text-muted-foreground/40"
              )}>
                {c.time}
              </p>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <Bookmark className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
              Saved
            </span>
          </div>
          {saved.map((c) => (
            <button
              key={c.id}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl transition-all duration-150",
                incognitoMode ? "hover:bg-purple-500/10" : "hover:bg-muted/50"
              )}
            >
              <p className={cn(
                "text-[13px] truncate transition-colors",
                incognitoMode ? "text-purple-100/70" : "text-foreground/70"
              )}>
                {c.title}
              </p>
              <p className={cn(
                "text-[11px] mt-0.5 transition-colors",
                incognitoMode ? "text-purple-400/30" : "text-muted-foreground/40"
              )}>
                {c.time}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
          <Clock className="w-3 h-3" />
          <span>7 chats this week</span>
        </div>
      </div>
    </aside>
  );
};

export default CanvasSidebar;
