"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Rivinity has transformed how we handle customer support. Response quality improved by 60% while cutting costs. The Hindi language support is exceptional.",
    image: "RK",
    name: "Rajesh Kumar",
    role: "CTO at TechMahindra",
  },
  {
    text: "Finally, an AI platform that truly understands Indian context. Built our entire voice AI product on Rivinity in just 2 weeks. Game changer.",
    image: "PS",
    name: "Priya Sharma",
    role: "Founder at AIStartup",
  },
  {
    text: "The API design is beautiful. Type-safe, well-documented, and incredibly fast. Best DX I've experienced with any AI platform.",
    image: "AV",
    name: "Amit Verma",
    role: "Lead Engineer at Flipkart",
  },
  {
    text: "Impressed by the quality of Rivinity's multilingual models. Outperforms GPT-4 on Telugu and Kannada benchmarks by a significant margin.",
    image: "SR",
    name: "Sneha Reddy",
    role: "ML Engineer at Google",
  },
  {
    text: "Deployed Rivinity agents across 500+ retail stores. Real-time inventory predictions with 95% accuracy. The on-premise option sealed the deal.",
    image: "VS",
    name: "Vikram Singh",
    role: "Data Scientist at Reliance",
  },
  {
    text: "Our food recommendation engine powered by Rivinity increased order value by 23%. The regional language understanding is unmatched.",
    image: "AP",
    name: "Ananya Patel",
    role: "Product Manager at Swiggy",
  },
  {
    text: "Rivinity's fraud detection models caught 40% more suspicious transactions than our previous system. India-specific training data makes all the difference.",
    image: "KM",
    name: "Karthik Menon",
    role: "VP Engineering at Razorpay",
  },
  {
    text: "Collaborating with Rivinity on constitutional AI for Indian legal context. Their commitment to responsible AI development is exemplary.",
    image: "MI",
    name: "Meera Iyer",
    role: "Research Lead at IIT Bombay",
  },
  {
    text: "Building on Rivinity's infrastructure has reduced our AI deployment costs by 60% while maintaining enterprise-grade security and India compliance.",
    image: "AP",
    name: "Amit Patel",
    role: "VP Engineering at Infosys AI Labs",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

import { SectionWrapper } from "../ui/section-wrapper";

export function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-background" id="testimonials">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center"
      >


        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground text-balance">
          What our <span className="text-gradient">users</span> say
        </h2>
        <p className="text-lg text-muted-foreground text-balance">
          See how organizations across Bharat trust Rivinity to build
          population-scale AI applications.
        </p>
      </motion.div>

      {/* Animated Testimonial Columns */}
      <div className="relative mt-16 h-[600px] xl:h-[700px] overflow-hidden">
        {/* Top Fade Overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />

        <div
          className="flex justify-center gap-6 h-full relative"
          style={{ transform: "translateZ(0)" }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={35}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={28}
          />
        </div>

        {/* Bottom Fade Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </div>
    </SectionWrapper>
  );
}
