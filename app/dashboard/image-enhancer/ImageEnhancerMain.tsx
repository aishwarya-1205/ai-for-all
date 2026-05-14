import { Sparkles, Wand2, Scissors } from "lucide-react";
import UpscaleView from "./views/UpscaleView";
import RestoreView from "./views/RestoreView";
import BackgroundView from "./views/BackgroundView";
import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const features = [
    { id: "upscale", icon: Sparkles, label: "AI Upscale" },
    { id: "restore", icon: Wand2, label: "Restore & Enhance" },
    { id: "background", icon: Scissors, label: "Background" },
];

interface Props {
    activeFeature: string;
    onFeatureChange: (id: string) => void;
}

const ImageEnhancerMain = ({ activeFeature, onFeatureChange }: Props) => {
    const { incognitoMode } = useSafeMode();

    const renderView = () => {
        switch (activeFeature) {
            case "restore": return <RestoreView />;
            case "background": return <BackgroundView />;
            default: return <UpscaleView />;
        }
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="px-6 pt-2 pb-3">
                <h2 className={cn("text-xl font-semibold", incognitoMode ? "text-slate-100" : "text-foreground/90")}>Image Enhancer</h2>
                <p className={cn("text-[13px] mt-1", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/60")}>Enlarge and enhance low-resolution images using advanced AI — like magic.</p>
            </div>

            <div className="px-6 pb-2 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
                {features.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => onFeatureChange(f.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap",
                            activeFeature === f.id
                                ? incognitoMode
                                    ? "bg-slate-500/20 border border-slate-500/40 text-slate-100 shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                                    : "glass border border-glass shadow-float text-foreground"
                                : incognitoMode
                                    ? "text-slate-400/40 hover:text-slate-200 hover:bg-slate-500/10"
                                    : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                        )}
                    >
                        <f.icon className="w-4 h-4" />
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="animate-float-in">{renderView()}</div>
            </div>
        </div>
    );
};

export default ImageEnhancerMain;
