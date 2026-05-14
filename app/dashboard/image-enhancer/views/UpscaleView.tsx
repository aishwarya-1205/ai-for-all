import { useState, useRef } from "react";
import { Upload, Sparkles, Download, ImageIcon, Loader2, ChevronDown, Check, Wand2, Layers, Zap } from "lucide-react";
import { useSafeMode } from "@/lib/safe-mode-context";
import { cn } from "@/lib/utils";

const models = [
    { id: "general-real", label: "General Photo (Real-ESRGAN)", desc: "Best for real-world photographs" },
    { id: "general-fast", label: "General Photo (Fast Real-ESRGAN)", desc: "Faster, slightly lower fidelity" },
    { id: "remacri", label: "General Photo (Remacri)", desc: "Crisp natural details" },
    { id: "ultramix", label: "General Photo (Ultramix Balanced)", desc: "Balanced sharpness & smoothness" },
    { id: "ultrasharp", label: "General Photo (Ultrasharp)", desc: "Maximum sharpness for prints" },
    { id: "digital-art", label: "Digital Art", desc: "Optimized for illustrations & paintings" },
    { id: "manga", label: "2x_mangascale", desc: "Tuned for manga & line art" },
];

const scales = [2, 3, 4, 6, 8];

const UpscaleView = () => {
    const { incognitoMode } = useSafeMode();
    const fileInput = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [model, setModel] = useState(models[5]);
    const [modelOpen, setModelOpen] = useState(false);
    const [scale, setScale] = useState(4);
    const [doubleUpscale, setDoubleUpscale] = useState(false);
    const [batch, setBatch] = useState(false);
    const [outputFolder, setOutputFolder] = useState("Defaults to image's path");
    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);

    const handleFile = (file?: File) => {
        if (!file) return;
        setImageName(file.name);
        setImageUrl(URL.createObjectURL(file));
        setDone(false);
    };

    const handleUpscay = () => {
        if (!imageUrl) return;
        setProcessing(true);
        setDone(false);
        setTimeout(() => {
            setProcessing(false);
            setDone(true);
        }, 1800);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
            {/* Steps panel */}
            <div className={cn(
                "rounded-2xl border transition-colors p-5 space-y-5 self-start",
                incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass shadow-float"
            )}>
                <div className="flex items-center justify-between">
                    <p className={cn("text-[10px] font-medium uppercase tracking-widest", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>Workflow</p>
                    <button
                        onClick={() => setBatch(!batch)}
                        className={cn(
                            "flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-full transition-colors",
                            batch
                                ? incognitoMode ? "bg-slate-500/20 text-slate-200" : "bg-primary/15 text-primary"
                                : incognitoMode ? "bg-slate-500/5 text-slate-400/40 hover:bg-slate-500/10" : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"
                        )}
                    >
                        <Layers className="w-3 h-3" /> Batch
                    </button>
                </div>

                {/* Step 1 */}
                <div>
                    <p className={cn("text-[11px] font-semibold mb-1.5", incognitoMode ? "text-slate-200/80" : "text-foreground/80")}>Step 1</p>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    <button
                        onClick={() => fileInput.current?.click()}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-[12px] font-medium transition-colors flex items-center gap-2",
                            incognitoMode ? "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20" : "bg-accent/60 hover:bg-accent text-foreground/80"
                        )}
                    >
                        <Upload className="w-3.5 h-3.5" /> Select Image
                    </button>
                    {imageName && (
                        <p className={cn("text-[10px] mt-1.5 truncate", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>{imageName}</p>
                    )}
                </div>

                {/* Step 2 */}
                <div>
                    <p className={cn("text-[11px] font-semibold mb-1.5", incognitoMode ? "text-slate-200/80" : "text-foreground/80")}>Step 2</p>
                    <p className={cn("text-[11px] mb-1.5", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>Select Model</p>
                    <div className="relative">
                        <button
                            onClick={() => setModelOpen(!modelOpen)}
                            className={cn(
                                "w-full px-3.5 py-2.5 rounded-xl text-left text-[12px] transition-colors flex items-center justify-between",
                                incognitoMode ? "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20" : "bg-accent/60 hover:bg-accent text-foreground/80"
                            )}
                        >
                            <span className="truncate">{model.label}</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60", modelOpen ? "rotate-180" : "")} />
                        </button>
                        {modelOpen && (
                            <div className={cn(
                                "absolute top-full mt-1.5 left-0 right-0 z-50 rounded-xl border shadow-float overflow-hidden animate-float-in max-h-[280px] overflow-y-auto no-scrollbar",
                                incognitoMode ? "bg-[#111111] border-slate-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : "glass-strong border-glass"
                            )}>
                                {models.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => { setModel(m); setModelOpen(false); }}
                                        className={cn(
                                            "w-full text-left px-3.5 py-2.5 transition-colors",
                                            m.id === model.id
                                                ? incognitoMode ? "bg-slate-500/20 text-slate-100" : "bg-accent text-foreground"
                                                : incognitoMode ? "text-slate-400/40 hover:bg-slate-500/10 hover:text-slate-200" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        )}
                                    >
                                        <p className="text-[12px] font-medium">{m.label}</p>
                                        <p className={cn("text-[10px]", incognitoMode ? "text-slate-500" : "text-muted-foreground/60")}>{m.desc}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <button
                            onClick={() => setDoubleUpscale(!doubleUpscale)}
                            className={cn(
                                "w-4 h-4 rounded border transition-colors flex items-center justify-center",
                                doubleUpscale
                                    ? incognitoMode ? "bg-slate-400 border-slate-400" : "bg-primary border-primary"
                                    : incognitoMode ? "border-slate-500/20 bg-transparent" : "border-border bg-transparent"
                            )}
                        >
                            {doubleUpscale && <Check className={cn("w-3 h-3", incognitoMode ? "text-slate-950" : "text-primary-foreground")} />}
                        </button>
                        <span className={cn("text-[11px]", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/70")}>Double Upscayl</span>
                    </label>

                    <div className="mt-3">
                        <p className={cn("text-[11px] mb-1.5", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>Image Scale ({scale}x)</p>
                        <div className="flex items-center gap-1.5">
                            {scales.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setScale(s)}
                                    className={cn(
                                        "flex-1 h-8 rounded-lg text-[11px] font-medium transition-all",
                                        s === scale
                                            ? incognitoMode ? "bg-slate-400 text-slate-950" : "gradient-accent text-primary-foreground shadow-glow-accent"
                                            : incognitoMode ? "bg-slate-500/10 text-slate-400/40 hover:bg-slate-500/20 hover:text-slate-300" : "bg-accent/50 text-muted-foreground/70 hover:bg-accent"
                                    )}
                                >
                                    {s}x
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div>
                    <p className={cn("text-[11px] font-semibold mb-1.5", incognitoMode ? "text-slate-200/80" : "text-foreground/80")}>Step 3</p>
                    <p className={cn("text-[11px] mb-1.5", incognitoMode ? "text-slate-400/30" : "text-muted-foreground/60")}>{outputFolder}</p>
                    <button
                        onClick={() => setOutputFolder("~/Pictures/Rivinity")}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-[12px] font-medium transition-colors",
                            incognitoMode ? "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20" : "bg-accent/60 hover:bg-accent text-foreground/80"
                        )}
                    >
                        Set Output Folder
                    </button>
                </div>

                {/* Step 4 */}
                <div>
                    <p className={cn("text-[11px] font-semibold mb-1.5", incognitoMode ? "text-slate-200/80" : "text-foreground/80")}>Step 4</p>
                    <button
                        onClick={handleUpscay}
                        disabled={!imageUrl || processing}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed",
                            incognitoMode
                                ? "bg-slate-400 text-slate-950 hover:bg-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                                : "gradient-accent text-primary-foreground hover:opacity-90"
                        )}
                    >
                        {processing ? (
                            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Upscaling…</>
                        ) : (
                            <><Wand2 className="w-3.5 h-3.5" /> Upscale</>
                        )}
                    </button>
                </div>
            </div>

            {/* Preview area */}
            <div className={cn(
                "rounded-2xl border transition-colors min-h-[460px] flex items-center justify-center relative overflow-hidden",
                incognitoMode ? "bg-slate-950/10 border-slate-500/10" : "glass border-glass shadow-float"
            )}>
                {!imageUrl && (
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
                        className="text-center px-8 py-12 max-w-[420px]"
                    >
                        <div className={cn(
                            "w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-glow-accent",
                            incognitoMode ? "bg-slate-400" : "gradient-accent"
                        )}>
                            <ImageIcon className={cn("w-6 h-6", incognitoMode ? "text-slate-950" : "text-primary-foreground")} />
                        </div>
                        <h3 className={cn("text-[15px] font-semibold", incognitoMode ? "text-slate-200" : "text-foreground/90")}>Select an Image to Enhance</h3>
                        <p className={cn("text-[12px] mt-1.5", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/60")}>
                            Select or drag and drop a PNG, JPG, JPEG or WEBP image.
                        </p>
                        <button
                            onClick={() => fileInput.current?.click()}
                            className={cn(
                                "mt-5 px-4 py-2 rounded-full text-[12px] font-medium transition-colors",
                                incognitoMode ? "bg-slate-500/10 text-slate-400/40 hover:bg-slate-500/20 hover:text-slate-200" : "bg-accent/70 hover:bg-accent text-foreground/80"
                            )}
                        >
                            Rivinity Enhance v1.0
                        </button>
                    </div>
                )}

                {imageUrl && (
                    <div className="w-full h-full p-5">
                        {/* Blurred backdrop */}
                        <div
                            className="absolute inset-0 opacity-30 blur-2xl"
                            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        />
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img src={imageUrl} alt="preview" className="max-h-[420px] max-w-full rounded-xl shadow-float object-contain" />

                            {processing && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={cn(
                                        "rounded-2xl border shadow-float px-6 py-5 text-center animate-float-in",
                                        incognitoMode ? "bg-[#111111] border-slate-500/20" : "glass-strong border-glass"
                                    )}>
                                        <Sparkles className={cn("w-5 h-5 mx-auto mb-2 animate-pulse", incognitoMode ? "text-slate-400" : "text-primary")} />
                                        <p className={cn("text-[13px] font-semibold", incognitoMode ? "text-slate-200" : "text-foreground")}>Hold on…</p>
                                        <p className={cn("text-[11px] mt-0.5", incognitoMode ? "text-slate-400/40" : "text-muted-foreground/60")}>Doing the Rivinity magic</p>
                                        <button
                                            onClick={() => setProcessing(false)}
                                            className={cn(
                                                "mt-3 px-4 py-1.5 rounded-full border text-[11px] font-medium transition-colors",
                                                incognitoMode ? "border-slate-500/20 text-slate-400/40 hover:bg-slate-500/10 hover:text-slate-200" : "border-border text-foreground/70 hover:bg-accent/50"
                                            )}
                                        >
                                            STOP
                                        </button>
                                    </div>
                                </div>
                            )}

                            {done && !processing && (
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium",
                                        incognitoMode ? "bg-slate-400/20 text-slate-300" : "bg-primary/15 text-primary"
                                    )}>
                                        <Zap className="w-3 h-3" /> {scale}x Enhanced
                                    </div>
                                    <button className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all",
                                        incognitoMode
                                            ? "bg-slate-400 text-slate-950 hover:bg-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                                            : "gradient-accent text-primary-foreground shadow-glow-accent hover:opacity-90"
                                    )}>
                                        <Download className="w-3 h-3" /> Download
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpscaleView;
