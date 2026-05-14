import { Brain, Zap, ImageIcon, Sparkles, Wand2, Scissors, X } from "lucide-react";
import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";
import Image from "next/image";

const recents = [
    { label: "Portrait_4x.png", time: "2m ago", icon: Sparkles },
    { label: "Landscape_restored.jpg", time: "1h ago", icon: Wand2 },
    { label: "Product_cutout.png", time: "Yesterday", icon: Scissors },
];

interface Props {
    isOpen?: boolean;
    onClose?: () => void;
}

const ImageEnhancerRightPanel = ({ isOpen, onClose }: Props) => {
    const { incognitoMode } = useSafeMode();

    return (
        <aside className={cn(
            "w-full h-full flex flex-col py-6 px-4 gap-6 overflow-y-auto no-scrollbar transition-colors duration-500",
            incognitoMode ? "bg-[#0c0a09]" : "bg-background"
        )}>
            {/* Mobile-only close header */}
            <div className="flex items-center justify-between px-1 lg:hidden">
                <span className={cn(
                    "text-[10px] font-medium uppercase tracking-widest",
                    incognitoMode ? "text-slate-400/30" : "text-muted-foreground/35"
                )}>
                    Panel
                </span>
                <button
                    onClick={onClose}
                    className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150",
                        incognitoMode
                            ? "text-slate-400/50 hover:text-slate-300 hover:bg-slate-500/10"
                            : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-muted/40"
                    )}
                    aria-label="Close panel"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            <div>
                <p className={cn(
                    "text-[10px] font-medium uppercase tracking-widest mb-3 px-1",
                    incognitoMode ? "text-slate-400/30" : "text-muted-foreground/35"
                )}>AI Model</p>
                <div className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Rivinity Logo"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Rivinity Enhance</p>
                            <p className="text-[11px] text-muted-foreground/60">v1.0 · Vision AI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[11px] text-muted-foreground/60">GPU accelerated · Online</span>
                    </div>
                </div>
            </div>

            <div>
                <p className={cn(
                    "text-[10px] font-medium uppercase tracking-widest mb-3 px-1",
                    incognitoMode ? "text-slate-400/30" : "text-muted-foreground/35"
                )}>Tips</p>
                <div className={cn(
                    "rounded-2xl p-4 border transition-colors",
                    incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass"
                )}>
                    <p className={cn("text-[11px] leading-relaxed", incognitoMode ? "text-slate-400/70" : "text-muted-foreground/70")}>• Use <span className={cn("font-medium", incognitoMode ? "text-slate-200" : "text-foreground/80")}>Digital Art</span> for illustrations.</p>
                    <p className={cn("text-[11px] leading-relaxed", incognitoMode ? "text-slate-400/70" : "text-muted-foreground/70")}>• Use <span className={cn("font-medium", incognitoMode ? "text-slate-200" : "text-foreground/80")}>Real-ESRGAN</span> for photos.</p>
                    <p className={cn("text-[11px] leading-relaxed", incognitoMode ? "text-slate-400/70" : "text-muted-foreground/70")}>• Enable <span className={cn("font-medium", incognitoMode ? "text-slate-200" : "text-foreground/80")}>Double Upscayl</span> for extreme enlargement.</p>
                </div>
            </div>

            <div>
                <p className={cn(
                    "text-[10px] font-medium uppercase tracking-widest mb-3 px-1",
                    incognitoMode ? "text-slate-400/30" : "text-muted-foreground/35"
                )}>Recent</p>
                <div className="space-y-2">
                    {recents.map((r) => (
                        <button key={r.label} className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left",
                            incognitoMode ? "hover:bg-slate-500/10" : "hover:bg-accent/50"
                        )}>
                            <r.icon className={cn("w-3.5 h-3.5", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/50")} />
                            <div className="flex-1 min-w-0">
                                <p className={cn("text-[12px] font-medium truncate", incognitoMode ? "text-slate-200/70" : "text-foreground/70")}>{r.label}</p>
                                <p className={cn("text-[10px]", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/40")}>{r.time}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-auto">
                <div className={cn(
                    "rounded-2xl p-4 border transition-colors",
                    incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass"
                )}>
                    <div className="flex items-center justify-between mb-2">
                        <p className={cn("text-[11px] font-medium", incognitoMode ? "text-slate-200/70" : "text-foreground/70")}>Enhance Credits</p>
                        <p className="text-[11px] font-semibold text-primary">9,200</p>
                    </div>
                    <div className={cn("h-1.5 rounded-full overflow-hidden", incognitoMode ? "bg-slate-500/10" : "bg-muted")}>
                        <div className="h-full rounded-full gradient-accent" style={{ width: "92%" }} />
                    </div>
                    <p className={cn("text-[10px] mt-2", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/40")}>800 / 10,000 images processed</p>
                </div>
            </div>
        </aside>
    );
};

export default ImageEnhancerRightPanel;
