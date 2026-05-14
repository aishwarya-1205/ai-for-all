import { useState, useRef } from "react";
import { Upload, Sparkles, Wand2, ImageIcon, Loader2, Download } from "lucide-react";
import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const presets = [
    { id: "face", label: "Face Restore", desc: "Bring blurry faces back to life" },
    { id: "denoise", label: "Denoise", desc: "Remove grain & compression artifacts" },
    { id: "deblur", label: "Deblur", desc: "Sharpen out-of-focus images" },
    { id: "colorize", label: "Colorize", desc: "Add color to black & white photos" },
];

const RestoreView = () => {
    const { incognitoMode } = useSafeMode();
    const fileInput = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [active, setActive] = useState(presets[0].id);
    const [strength, setStrength] = useState(70);
    const [processing, setProcessing] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
            <div className={cn(
                "rounded-2xl border transition-colors p-5 space-y-4 self-start",
                incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass shadow-float"
            )}>
                <div>
                    <p className={cn("text-[10px] font-medium uppercase tracking-widest mb-2", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>Restore Mode</p>
                    <div className="space-y-1.5">
                        {presets.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setActive(p.id)}
                                className={cn(
                                    "w-full text-left px-3 py-2.5 rounded-xl transition-colors",
                                    active === p.id
                                        ? incognitoMode ? "bg-slate-500/20 text-slate-100" : "bg-accent text-foreground"
                                        : incognitoMode ? "text-slate-400/40 hover:bg-slate-500/10 hover:text-slate-200" : "hover:bg-accent/50 text-muted-foreground"
                                )}
                            >
                                <p className="text-[12px] font-medium">{p.label}</p>
                                <p className={cn("text-[10px]", incognitoMode ? "text-slate-500" : "text-muted-foreground/60")}>{p.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className={cn("text-[11px] mb-1.5", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>Strength ({strength}%)</p>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={strength}
                        onChange={(e) => setStrength(Number(e.target.value))}
                        className={cn("w-full accent-primary", incognitoMode && "accent-slate-400")}
                    />
                </div>

                <input type="file" accept="image/*" ref={fileInput} className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setImageUrl(URL.createObjectURL(f)); }} />

                <button
                    onClick={() => fileInput.current?.click()}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-xl text-[12px] font-medium transition-colors flex items-center justify-center gap-2",
                        incognitoMode ? "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20" : "bg-accent/60 hover:bg-accent text-foreground/80"
                    )}
                >
                    <Upload className="w-3.5 h-3.5" /> Upload Image
                </button>

                <button
                    onClick={() => { if (!imageUrl) return; setProcessing(true); setTimeout(() => setProcessing(false), 1500); }}
                    disabled={!imageUrl || processing}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40",
                        incognitoMode
                            ? "bg-slate-400 text-slate-950 hover:bg-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                            : "gradient-accent text-primary-foreground hover:opacity-90"
                    )}
                >
                    {processing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Restoring…</> : <><Wand2 className="w-3.5 h-3.5" /> Restore</>}
                </button>
            </div>

            <div className={cn(
                "rounded-2xl border transition-colors min-h-[460px] flex items-center justify-center p-5 relative overflow-hidden",
                incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass shadow-float"
            )}>
                {!imageUrl ? (
                    <div className="text-center">
                        <div className={cn(
                            "w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-glow-accent",
                            incognitoMode ? "bg-slate-400" : "gradient-accent"
                        )}>
                            <Sparkles className={cn("w-6 h-6", incognitoMode ? "text-slate-950" : "text-primary-foreground")} />
                        </div>
                        <h3 className={cn("text-[15px] font-semibold", incognitoMode ? "text-slate-200" : "text-foreground/90")}>Restore Your Photo</h3>
                        <p className={cn("text-[12px] mt-1.5 max-w-[320px]", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/60")}>
                            Upload a damaged, blurry, or faded image and let Rivinity bring it back to life.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-20 blur-2xl" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }} />
                        <img src={imageUrl} alt="restore" className="relative max-h-[420px] max-w-full rounded-xl shadow-float object-contain" />
                        {!processing && (
                            <button className={cn(
                                "absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-glow-accent",
                                incognitoMode
                                    ? "bg-slate-400 text-slate-950 hover:bg-slate-300"
                                    : "gradient-accent text-primary-foreground"
                            )}>
                                <Download className="w-3 h-3" /> Download
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RestoreView;
