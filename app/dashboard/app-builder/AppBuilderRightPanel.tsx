import {
  Brain,
  Zap,
  Globe,
  Layout,
  Palette,
  Smartphone,
  FolderOpen,
  X,
} from "lucide-react";
import Image from "next/image";
import { useFiles } from "@/components/dashboard/context/FileContext";

const tools = [
  { icon: Globe, label: "Web Search", color: "text-accent" },
  { icon: Layout, label: "Templates", color: "text-accent" },
  { icon: Palette, label: "Design", color: "text-accent" },
  { icon: Smartphone, label: "Preview", color: "text-accent" },
];

interface AppBuilderRightPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AppBuilderRightPanel = ({
  isOpen,
  onClose,
}: AppBuilderRightPanelProps) => {
  const { files, addFiles, removeFile } = useFiles();
  return (
    <aside className="h-full w-full flex flex-col py-3 px-3.5 gap-4 overflow-y-auto no-scrollbar bg-background">
      {/* Mobile-only close header */}
      <div className="flex items-center justify-between px-1 lg:hidden">
        <span className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest">
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

      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Model
        </p>
        <div className="rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Rivinity Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-foreground leading-tight">
                Rivinity Builder
              </p>
              <p className="text-[10px] text-muted-foreground/45">
                v2.4 · 128k ctx
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-accent" />
            <span className="text-[10px] text-muted-foreground/45">
              Fast inference · Online
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Tools
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.label}
              className={`glass flex flex-col items-center gap-1.5 p-3 rounded-xl border border-glass border-glass-hover transition-all duration-150 cursor-pointer hover:shadow-float`}
            >
              <t.icon className={`w-4 h-4 ${t.color}`} />
              <span className="text-[11px] font-medium text-foreground/70">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-6 flex flex-col items-center text-center border border-dashed border-border/40 hover:border-accent/40 transition gap-2"
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
          id="fileUpload-appbuilder"
          onChange={(e) => {
            if (!e.target.files) return;
            addFiles(Array.from(e.target.files));
          }}
        />

        <label
          htmlFor="fileUpload-appbuilder"
          className="cursor-pointer flex flex-col items-center justify-center w-full"
        >
          <FolderOpen className="w-7 h-7 text-muted-foreground/40 mb-2" />

          <p className="text-[11px] text-muted-foreground/50">
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
                className="flex items-center justify-between text-[10px] bg-muted/40 px-2 py-1 rounded"
              >
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-400 text-[9px]"
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

export default AppBuilderRightPanel;
