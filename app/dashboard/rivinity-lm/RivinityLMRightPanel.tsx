import { useState } from "react";
import {
  Brain,
  Zap,
  FolderOpen,
  Upload,
  FileText,
  ChevronDown,
  MessageSquare,
  StickyNote,
  Layers,
  HelpCircle,
  Podcast,
  FileAudio,
  CalendarCheck,
  GraduationCap,
  Swords,
  Bot,
  BarChart3,
  Star,
  Clock,
  BookOpen,
  X,
} from "lucide-react";
import Image from "next/image";

const tools = [
  {
    id: "contextual-chat",
    icon: MessageSquare,
    label: "Chat",
    color: "text-accent",
  },
  {
    id: "smart-notes",
    icon: StickyNote,
    label: "SmartNotes",
    color: "text-accent",
  },
  { id: "flashcards", icon: Layers, label: "Flashcards", color: "text-accent" },
  { id: "quizzes", icon: HelpCircle, label: "Quizzes", color: "text-accent" },
  { id: "ai-podcast", icon: Podcast, label: "Podcast", color: "text-accent" },
  {
    id: "voice-transcribe",
    icon: FileAudio,
    label: "Transcribe",
    color: "text-accent",
  },
  {
    id: "homework-planner",
    icon: CalendarCheck,
    label: "Homework",
    color: "text-accent",
  },
  {
    id: "exam-lab",
    icon: GraduationCap,
    label: "ExamLab",
    color: "text-accent",
  },
  { id: "debate", icon: Swords, label: "Debate", color: "text-accent" },
  {
    id: "study-companion",
    icon: Bot,
    label: "Companion",
    color: "text-accent",
  },
  {
    id: "data-analyst",
    icon: BarChart3,
    label: "Analyst",
    color: "text-accent",
  },
];

const recentItems = [
  { label: "French Revolution Notes", time: "5m ago", icon: StickyNote },
  { label: "Calculus Quiz", time: "1h ago", icon: HelpCircle },
  { label: "Biology Flashcards", time: "3h ago", icon: Layers },
  { label: "Essay on Climate", time: "Yesterday", icon: FileText },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const RivinityLMRightPanel = ({
  activeFeature,
  onFeatureChange,
  isOpen,
  onClose,
}: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  return (
    <aside className="h-full w-full flex flex-col py-3 px-3.5 gap-4 overflow-y-auto no-scrollbar bg-background">
      {/* Mobile-only close header */}
      <div className="flex items-center justify-between px-1 lg:hidden">
        <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">
          Panel
        </span>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/40 transition-all duration-150"
          aria-label="Close panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Model */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
          AI Model
        </p>
        <div className="glass rounded-2xl p-4 border border-glass shadow-float">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Rivinity Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">RivinityLM</p>
              <p className="text-[11px] text-muted-foreground/60">
                v1.0 · 256k ctx
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[11px] text-muted-foreground/60">
              Learning AI · Online
            </span>
          </div>
        </div>
      </div>

      {/* Learning Tools */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
          Learning Tools
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => onFeatureChange(t.id)}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-150 ${
                activeFeature === t.id
                  ? "glass border-accent/20 shadow-glow-accent"
                  : "border-transparent hover:glass hover:border-glass hover:shadow-float"
              }`}
            >
              <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
              <span className="text-[10px] font-medium text-foreground/60 leading-tight text-center">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Context */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
          Study Materials
        </p>
        <div className="glass rounded-2xl p-4 border border-glass border-dashed">
          {uploadedFiles.length === 0 ? (
            <div className="flex flex-col items-center text-center py-2">
              <Upload className="w-6 h-6 text-muted-foreground/25 mb-1.5" />
              <p className="text-[11px] text-muted-foreground/50">
                Drop PDFs, DOCX, or notes
              </p>
              <p className="text-[10px] text-muted-foreground/30 mt-0.5">
                AI will learn from your materials
              </p>
              <button className="mt-3 px-4 py-1.5 rounded-lg text-[11px] font-medium text-accent bg-accent/10 hover:bg-accent/15 transition-colors">
                Browse Files
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-[11px] text-foreground/60"
                >
                  <FileText className="w-3 h-3" />
                  <span className="truncate flex-1">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
          Recent
        </p>
        <div className="space-y-1">
          {recentItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-accent/50 transition-colors text-left"
            >
              <item.icon className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-foreground/65 truncate">
                  {item.label}
                </p>
                <p className="text-[10px] text-muted-foreground/35">
                  {item.time}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Study Stats */}
      <div className="mt-auto">
        <div className="glass rounded-2xl p-4 border border-glass">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <p className="text-[11px] font-medium text-foreground/70">
              Today's Progress
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-lg font-bold text-foreground/80">12</p>
              <p className="text-[10px] text-muted-foreground/40">
                Cards reviewed
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">3</p>
              <p className="text-[10px] text-muted-foreground/40">
                Quizzes taken
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">85%</p>
              <p className="text-[10px] text-muted-foreground/40">Accuracy</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">2h</p>
              <p className="text-[10px] text-muted-foreground/40">Study time</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RivinityLMRightPanel;
