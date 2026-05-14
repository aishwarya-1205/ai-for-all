import { useState } from "react";
import { Mic, Volume2, AudioWaveform, Users, ChevronRight } from "lucide-react";
import TextToSpeechView from "./views/TextToSpeechView";
import SpeechToTextView from "./views/SpeechToTextView";
import AudioGeneratorView from "./views/AudioGeneratorView";
import VoiceCloneView from "./views/VoiceCloneView";

const features = [
  {
    id: "text-to-speech",
    icon: Volume2,
    label: "Text to Speech",
    desc: "Convert text into lifelike speech",
  },
  {
    id: "speech-to-text",
    icon: Mic,
    label: "Speech to Text",
    desc: "Transcribe audio into text",
  },
  {
    id: "audio-generator",
    icon: AudioWaveform,
    label: "Audio Generator",
    desc: "Generate any sound or voice",
  },
  {
    id: "voice-clone",
    icon: Users,
    label: "Voice Clone",
    desc: "Clone & transform voices",
  },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const AudioLabMain = ({ activeFeature, onFeatureChange }: Props) => {
  const renderView = () => {
    switch (activeFeature) {
      case "text-to-speech":
        return <TextToSpeechView />;
      case "speech-to-text":
        return <SpeechToTextView />;
      case "audio-generator":
        return <AudioGeneratorView />;
      case "voice-clone":
        return <VoiceCloneView />;
      default:
        return <TextToSpeechView />;
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col min-w-0 min-h-0">
      {/* Feature tabs — horizontal scroll on mobile */}
      <div className="px-3 sm:px-6 pt-4 pb-2 flex items-center justify-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
        {features.map((f) => (
          <button
            key={f.id}
            onClick={() => onFeatureChange(f.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${activeFeature === f.id
              ? "glass border border-glass shadow-float text-foreground"
              : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
            }`}
          >
            <f.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Active view */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 no-scrollbar">
        <div className="animate-float-in min-h-full">{renderView()}</div>
      </div>
    </div>
  );
};

export default AudioLabMain;
