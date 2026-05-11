"use client";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Cpu,
  Globe,
  Layers,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const roadmapData = [
  {
    id: 1,
    title: "Foundation",
    date: "Q1 2024",
    content:
      "Core AI infrastructure and neural processing units deployed. Established the foundational layer for all Rivinity services.",
    category: "Infrastructure",
    icon: Cpu,
    relatedIds: [2, 8],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Agent Protocol",
    date: "Q2 2024",
    content:
      "Autonomous AI agents framework launched. Self-learning systems that evolve and adapt to complex tasks.",
    category: "AI Agents",
    icon: Brain,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "Voice AI",
    date: "Q3 2024",
    content:
      "Natural voice synthesis and real-time conversation AI. Human-like interactions across all channels.",
    category: "Voice",
    icon: Sparkles,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Global Network",
    date: "Q4 2024",
    content:
      "Planet-scale infrastructure expansion. Edge computing nodes deployed across 50+ regions worldwide.",
    category: "Scale",
    icon: Globe,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 5,
    title: "Multi-Modal",
    date: "Q1 2025",
    content:
      "Unified multi-modal AI processing. Text, image, audio, and video understanding in a single API.",
    category: "Models",
    icon: Layers,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 6,
    title: "Zero-Trust",
    date: "Q2 2025",
    content:
      "Enterprise-grade security layer. End-to-end encryption and compliance certifications.",
    category: "Security",
    icon: Shield,
    relatedIds: [5, 7],
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 7,
    title: "Hyperscale",
    date: "Q3 2025",
    content:
      "Unlimited scaling capabilities. Auto-scaling infrastructure that handles billions of requests.",
    category: "Performance",
    icon: Zap,
    relatedIds: [6, 8],
    status: "pending" as const,
    energy: 25,
  },
  {
    id: 8,
    title: "AGI Layer",
    date: "Q4 2025",
    content:
      "Advanced general intelligence capabilities. The next frontier of artificial intelligence.",
    category: "Future",
    icon: Rocket,
    relatedIds: [7, 1],
    status: "pending" as const,
    energy: 10,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(counter);
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

import { SectionWrapper } from "../ui/section-wrapper";

export function RoadmapSection() {
  return (
    <SectionWrapper
      className="bg-background"
      id="roadmap"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 1000px" } as React.CSSProperties}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >


        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
          Building the Future of{" "}
          <span className="text-gradient">
            Intelligence Infrastructure
          </span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Our roadmap represents our commitment to democratizing AI. Each
          milestone brings us closer to universal intelligence access for
          humanity.
        </p>
      </motion.div>

      {/* Orbital Timeline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <RadialOrbitalTimeline timelineData={roadmapData} />

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          Click on any node to explore details. Click outside to resume
          rotation.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
