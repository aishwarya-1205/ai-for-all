"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Cloud, Server } from "lucide-react";
import Link from "next/link";
import {
  SiOpenai,
  SiGooglecloud,
  SiSlack,
  SiDiscord,
  SiGithub,
  SiNotion,
  SiLinear,
  SiVercel,
  SiSupabase,
  SiMongodb,
  SiRedis,
  SiStripe,
  SiTwilio,
  SiSendgrid,
  SiZapier,
} from "react-icons/si";
import { useTheme } from "next-themes";
import { SectionWrapper } from "../ui/section-wrapper";

const integrations = [
  { icon: SiOpenai, color: "#10A37F" },
  { icon: Cloud, color: "#FF9900" },
  { icon: Server, color: "#0078D4" },
  { icon: SiGooglecloud, color: "#4285F4" },
  { icon: SiSlack, color: "#4A154B" },
  { icon: SiDiscord, color: "#5865F2" },
  { icon: SiGithub, color: "#000000", invertInDark: true },
  { icon: SiNotion, color: "#000000", invertInDark: true },
  { icon: SiLinear, color: "#5E6AD2" },
  { icon: SiVercel, color: "#000000", invertInDark: true },
  { icon: SiSupabase, color: "#3ECF8E" },
  { icon: SiMongodb, color: "#47A248" },
  { icon: SiRedis, color: "#DC382D" },
  { icon: SiStripe, color: "#635BFF" },
  { icon: SiTwilio, color: "#F22F46" },
  { icon: SiSendgrid, color: "#1A82E2" },
  { icon: SiZapier, color: "#FF4A00" },
  { icon: Brain, color: "#D4A574" },
];

export function IntegrationsSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <SectionWrapper
      className="bg-background"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" } as React.CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side - Content */}
        <div>


          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
            Connect to <span className="text-gradient">everything</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Seamlessly integrate Rivinity with your existing tools and
            workflows. Connect to 100+ services with our pre-built connectors
            and universal API.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-12 px-6 bg-gradient-to-r from-accent to-highlight text-white hover:opacity-90 rounded-full border-0">
              <Link href="/platform" className="flex items-center gap-2">
                Browse Integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="h-12 px-6 rounded-full">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Hexagonal Grid */}
        <div className="relative" style={{ transform: "translateZ(0)" }}>
          <div className="grid grid-cols-6 gap-3 will-change-transform">
            {integrations.map((integration, idx) => {
              const Icon = integration.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="relative aspect-square"
                >
                  <div
                    className="absolute inset-0 bg-card dark:bg-white/[0.03] border border-border shadow-sm flex items-center justify-center transition duration-300 hover:shadow-lg hover:border-accent/30 will-change-transform"
                    style={{
                      clipPath:
                        "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
                      style={{
                        color:
                          isDark &&
                            ["#000000", "#181717"].includes(integration.color)
                            ? "rgb(24, 23, 23)"
                            : integration.color,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-highlight/5 blur-3xl pointer-events-none" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
