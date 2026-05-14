import { useState, useRef } from "react";
import { Upload, Scissors, Loader2, Download, Palette } from "lucide-react";

const colors = ["transparent", "#ffffff", "#000000", "#f97316", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981"];

const BackgroundView = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [bg, setBg] = useState<string>("transparent");
    const [processing, setProcessing] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
            <div className="glass rounded-2xl border border-glass shadow-float p-5 space-y-4 self-start">
                <div>
                    <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-2">Background</p>
                    <p className="text-[11px] text-muted-foreground/60 mb-2">Replace background color</p>
                    <div className="grid grid-cols-4 gap-2">
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => setBg(c)}
                                className={`h-9 rounded-lg border-2 transition-all ${bg === c ? "border-primary scale-95" : "border-border/40"}`}
                                style={{
                                    background: c === "transparent"
                                        ? "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 10px 10px"
                                        : c,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <input type="file" accept="image/*" ref={fileInput} className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setImageUrl(URL.createObjectURL(f)); }} />

                <button
                    onClick={() => fileInput.current?.click()}
                    className="w-full px-4 py-2.5 rounded-xl bg-accent/60 hover:bg-accent text-foreground/80 text-[12px] font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Upload className="w-3.5 h-3.5" /> Upload Image
                </button>

                <button
                    onClick={() => { if (!imageUrl) return; setProcessing(true); setTimeout(() => setProcessing(false), 1300); }}
                    disabled={!imageUrl || processing}
                    className="w-full px-4 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40"
                >
                    {processing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Removing…</> : <><Scissors className="w-3.5 h-3.5" /> Remove Background</>}
                </button>
            </div>

            <div
                className="glass rounded-2xl border border-glass shadow-float min-h-[460px] flex items-center justify-center p-5 relative overflow-hidden"
                style={{ background: bg === "transparent" ? undefined : bg }}
            >
                {!imageUrl ? (
                    <div className="text-center">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-accent">
                            <Palette className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-foreground/90">Smart Background Removal</h3>
                        <p className="text-[12px] text-muted-foreground/60 mt-1.5 max-w-[320px]">
                            Cut subjects from any photo with AI precision and place them on any background.
                        </p>
                    </div>
                ) : (
                    <>
                        <img src={imageUrl} alt="bg" className="relative max-h-[420px] max-w-full rounded-xl shadow-float object-contain" />
                        {!processing && (
                            <button className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-accent text-primary-foreground text-[11px] font-semibold shadow-glow-accent">
                                <Download className="w-3 h-3" /> Download
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BackgroundView;
