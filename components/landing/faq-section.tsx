"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What makes Rivinity different from other AI platforms?",
    answer:
      "Rivinity is built from the ground up for Indian languages and contexts. Our models are trained on 2 trillion tokens of Indic language data, supporting 22 Indian languages with native-level fluency. We also offer sovereign infrastructure with data residency in India, ensuring compliance with Indian data protection regulations.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer flexible usage-based pricing with a generous free tier. You only pay for what you use, with no minimum commitments. Enterprise customers can choose from volume discounts, reserved capacity pricing, or custom contracts. All pricing is transparent with no hidden fees.",
  },
  {
    question: "Can I deploy Rivinity on my own infrastructure?",
    answer:
      "Yes! Rivinity offers multiple deployment options: our managed cloud platform, deployment in your VPC, or fully on-premise installations for air-gapped environments. Enterprise customers get dedicated support for custom deployment configurations.",
  },
  {
    question: "What languages does Rivinity support?",
    answer:
      "Rivinity supports 22 Indian languages including Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Odia, Punjabi, and more. Our models also support English and 50+ global languages, with specialized capabilities for Indian accents and dialects.",
  },
  {
    question: "Is Rivinity SOC 2 compliant?",
    answer:
      "Yes, Rivinity is SOC 2 Type II certified and compliant with ISO 27001, HIPAA, and India's DPDP Act. We're also MeitY empaneled for government projects. Our security documentation is available upon request for enterprise customers.",
  },
  {
    question: "How do I get started with Rivinity?",
    answer:
      "Getting started is easy! Sign up for a free account, get your API key, and start making API calls in minutes. We have comprehensive documentation, quickstart guides, and SDKs for Python, JavaScript, Go, and Rust. Our developer relations team is always available to help.",
  },
];

import { SectionWrapper } from "../ui/section-wrapper";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper className="bg-background" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >


        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about Rivinity
        </p>
      </motion.div>

      <div className="space-y-4 max-w-4xl mx-auto" style={{ transform: "translateZ(0)" }}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={cn(
                "w-full text-left p-6 rounded-2xl border transition duration-300",
                openIndex === index
                  ? "bg-card border-accent/30 shadow-lg"
                  : "bg-card/50 border-border hover:border-accent/20 hover:bg-card",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                    openIndex === index && "rotate-180 text-accent",
                  )}
                />
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
