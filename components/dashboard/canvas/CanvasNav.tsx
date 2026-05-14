import { ChevronDown, SquareArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import SettingsModal from "../shared/SettingsModal";
import ReactDOM from "react-dom";
import { User, Settings, Download, LogOut } from "lucide-react";

import { AnimatedAvatar } from "@/components/ui/animated-avatar";

const Portal = ({ children }: { children: React.ReactNode }) =>
  typeof document !== "undefined"
    ? ReactDOM.createPortal(children, document.body)
    : null;

interface CanvasNavProps {
  rightPanelOpen?: boolean;
  setRightPanelOpen?: (open: boolean) => void;
  title?: string;
  showModelSelector?: boolean;
}

import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const CanvasNav = ({
  rightPanelOpen,
  setRightPanelOpen,
  title,
  showModelSelector = true,
}: CanvasNavProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { incognitoMode } = useSafeMode();

  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profilePanelRef = useRef<HTMLDivElement>(null);

  // Close profile on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        profileOpen &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(target) &&
        profilePanelRef.current &&
        !profilePanelRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  return (
    <>
      <div
        className={cn(
          "h-[52px] flex items-center justify-between px-3 sm:px-5 shrink-0 z-10 transition-all duration-500",
          incognitoMode 
            ? "bg-slate-950/10 border-b border-slate-500/10 backdrop-blur-xl" 
            : "bg-white/5 border-b border-white/5 backdrop-blur-xl"
        )}
      >
        {/* Left spacer — same width as right buttons area to keep center truly centered */}
        <div className="w-10 sm:w-16 flex items-center" />

        {/* Right */}
        <div className="flex items-center gap-2 justify-end">
          {setRightPanelOpen && (
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
                rightPanelOpen
                  ? (incognitoMode ? "bg-slate-500/20 text-slate-400" : "bg-accent/10 text-accent")
                  : (incognitoMode ? "text-slate-400/40 hover:text-slate-300 hover:bg-slate-500/10" : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/60")
              )}
            >
              <SquareArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${rightPanelOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}

          <button
            ref={profileBtnRef}
            onClick={() => setProfileOpen((v) => !v)}
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-90",
              profileOpen
                ? (incognitoMode ? "ring-2 ring-slate-500/40" : "ring-2 ring-accent/30")
                : ""
            )}
          >
            <AnimatedAvatar name="John Doe" size={32} className="rounded-xl shadow-sm" />
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileOpen && (
        <Portal>
          <div
            ref={profilePanelRef}
            className={cn(
              "border shadow-float overflow-hidden animate-in fade-in zoom-in-95 duration-200 rounded-xl transition-colors duration-500",
              incognitoMode 
                ? "bg-[#141414] border-slate-500/20 text-slate-100" 
                : "glass-strong border-border/40"
            )}
            style={{
              position: "fixed",
              top:
                (profileBtnRef.current?.getBoundingClientRect().bottom ?? 0) +
                8,
              right:
                window.innerWidth -
                (profileBtnRef.current?.getBoundingClientRect().right ?? 0),
              width: 220,
              zIndex: 9999,
            }}
          >
            <div className={cn(
              "px-4 py-4 border-b flex items-center gap-3",
              incognitoMode ? "border-slate-500/10 bg-slate-500/5" : "border-border/40 bg-muted/20"
            )}>
              <AnimatedAvatar name="John Doe" size={40} className="rounded-xl shadow-sm" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold truncate tracking-tight">
                  John Doe
                </p>
                <p className={cn(
                  "text-[11px] truncate",
                  incognitoMode ? "text-slate-400/40" : "text-muted-foreground/60"
                )}>
                  john@rivinity.ai
                </p>
              </div>
            </div>
            <div className="p-1.5 space-y-0.5">
              {[
                { icon: User, label: "View profile" },
                { icon: Settings, label: "Account settings" },
                { icon: Download, label: "Export data" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Account settings") {
                      setSettingsOpen(true);
                    }
                    setProfileOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all duration-150",
                    incognitoMode 
                      ? "text-slate-100/70 hover:bg-slate-500/10 hover:text-slate-100" 
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "w-3.5 h-3.5",
                    incognitoMode ? "text-slate-400/40" : "text-muted-foreground/50"
                  )} />
                  {item.label}
                </button>
              ))}
              <div className={cn(
                "h-px my-1.5 mx-2",
                incognitoMode ? "bg-slate-500/10" : "bg-border/40"
              )} />
              <button
                onClick={() => setProfileOpen(false)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-all duration-150",
                  incognitoMode ? "text-red-400/80 hover:bg-red-500/5 hover:text-red-400" : "text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
                )}
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </Portal>
      )}

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default CanvasNav;
