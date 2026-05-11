import {
  Brain,
  Zap,
  Globe,
  Layout,
  Database,
  Shield,
  FolderOpen,
  AudioWaveform,
  GraduationCap,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFiles } from "@/components/dashboard/context/FileContext";
import { useState } from "react";

const tools = [
  { icon: Globe, label: "Web Search", color: "text-accent" },
  {
    icon: Layout,
    label: "App Builder",
    color: "text-accent",
    route: "/dashboard/app-builder",
  },
  { icon: Database, label: "Database", color: "text-accent" },
  { icon: Shield, label: "Security", color: "text-accent" },
  {
    icon: AudioWaveform,
    label: "Audio Lab",
    color: "text-accent",
    route: "/dashboard/audio-lab",
  },
  {
    icon: GraduationCap,
    label: "RivinityLM",
    color: "text-accent",
    route: "/dashboard/rivinity-lm",
  },
];

interface CanvasRightPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const CanvasRightPanel = ({ isOpen, onClose }: CanvasRightPanelProps) => {
  const router = useRouter();
  const { files, addFiles, removeFile } = useFiles();
  const { incognitoMode } = useSafeMode();
  const [activeTool, setActiveTool] = useState("Web Search");

  return (
    <aside
      className={cn(
        "h-full w-full flex flex-col py-3 px-3.5 gap-4 overflow-y-auto no-scrollbar transition-colors duration-500",
        incognitoMode ? "bg-[#0a0510]" : "bg-background",
      )}
    >
      {/* Mobile-only close header */}
      <div className="flex items-center justify-between px-1 lg:hidden">
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-widest",
            incognitoMode ? "text-purple-400/30" : "text-muted-foreground/35",
          )}
        >
          Panel
        </span>
        <button
          onClick={onClose}
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150",
            incognitoMode
              ? "text-purple-400/50 hover:text-purple-300 hover:bg-purple-500/10"
              : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/40",
          )}
          aria-label="Close panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        <p
          className={cn(
            "text-[10px] font-medium uppercase tracking-widest mb-2 px-1",
            incognitoMode ? "text-purple-400/30" : "text-muted-foreground/35",
          )}
        >
          Model
        </p>
        <div
          className={cn(
            "rounded-xl p-3 px-1 transition-colors",
            incognitoMode
              ? "bg-purple-950/10 border border-purple-500/10"
              : "bg-transparent",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                "relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-500",
                incognitoMode ? "shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "",
              )}
            >
              <Image
                src="/logo.png"
                alt="Rivinity Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p
                className={cn(
                  "text-[12.5px] font-medium leading-tight transition-colors",
                  incognitoMode ? "text-purple-100" : "text-foreground",
                )}
              >
                Rivinity Core
              </p>
              <p
                className={cn(
                  "text-[10px] transition-colors",
                  incognitoMode
                    ? "text-purple-400/40"
                    : "text-muted-foreground/45",
                )}
              >
                v2.4 · 128k ctx
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap
              className={cn(
                "w-2.5 h-2.5",
                incognitoMode ? "text-purple-400" : "text-accent",
              )}
            />
            <span
              className={cn(
                "text-[10px] transition-colors",
                incognitoMode
                  ? "text-purple-400/40"
                  : "text-muted-foreground/45",
              )}
            >
              Fast inference · Online
            </span>
          </div>
        </div>
      </div>

      <div>
        <p
          className={cn(
            "text-[10px] font-medium uppercase tracking-widest mb-2 px-1",
            incognitoMode ? "text-purple-400/30" : "text-muted-foreground/35",
          )}
        >
          Tools
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.label}
              onClick={() => {
                setActiveTool(t.label);
                if (t.route) router.push(t.route);
              }}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-300",
                activeTool === t.label
                  ? incognitoMode
                    ? "bg-purple-500/20 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    : "bg-accent/10 border-accent/30 shadow-sm"
                  : incognitoMode
                    ? "bg-purple-950/5 border-purple-500/5 hover:border-purple-500/20 hover:bg-purple-500/10"
                    : "glass border-glass hover:border-glass-hover hover:shadow-float",
                t.route ? "cursor-pointer" : "",
              )}
            >
              <t.icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  activeTool === t.label
                    ? incognitoMode
                      ? "text-purple-400"
                      : "text-accent"
                    : incognitoMode
                      ? "text-purple-400/40"
                      : t.color,
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors",
                  activeTool === t.label
                    ? incognitoMode
                      ? "text-purple-200"
                      : "text-accent"
                    : incognitoMode
                      ? "text-purple-100/50"
                      : "text-foreground/70",
                )}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "rounded-xl px-4 py-6 flex flex-col items-center text-center border border-dashed transition-all duration-300 gap-2",
          incognitoMode
            ? "border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5"
            : "border-border/40 hover:border-accent/40 bg-muted/5",
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = Array.from(e.dataTransfer.files);
          addFiles(dropped);
        }}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          className="hidden"
          id="fileUpload-canvas"
          onChange={(e) => {
            if (!e.target.files) return;
            addFiles(Array.from(e.target.files));
          }}
        />

        <label
          htmlFor="fileUpload-canvas"
          className="cursor-pointer flex flex-col items-center justify-center w-full"
        >
          <FolderOpen
            className={cn(
              "w-7 h-7 mb-2 transition-colors",
              incognitoMode ? "text-purple-400/30" : "text-muted-foreground/40",
            )}
          />
          <p
            className={cn(
              "text-[11px] transition-colors",
              incognitoMode ? "text-purple-400/40" : "text-muted-foreground/50",
            )}
          >
            {files.length === 0
              ? "Drop files or click to upload"
              : "Add more files"}
          </p>
        </label>

        {files.length > 0 && (
          <div className="mt-3 w-full space-y-1">
            {files.map((file, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between text-[10px] px-2 py-1 rounded transition-colors",
                  incognitoMode
                    ? "bg-purple-500/10 text-purple-200/70"
                    : "bg-muted/40 text-foreground",
                )}
              >
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className={cn(
                    "transition-colors text-[9px]",
                    incognitoMode
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-red-400 hover:text-red-500",
                  )}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CanvasRightPanel;
