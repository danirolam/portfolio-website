"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

// Dynamically import Globe to avoid SSR issues
const GlobeVisualization = dynamic(
  () => import("@/components/GlobeVisualization"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    ),
  },
);

export default function Home() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] bg-[#030712] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#030712] to-[#030712]" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] flex items-center justify-center">
        {/* Globe Container - positioned for visual impact */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full">
            <GlobeVisualization />
          </div>
        </div>

        {/* Hero Content - overlaid on globe */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-6 sm:mb-8"
          >
            <span className="block">Welcome</span>
            <span className="block text-white/60">Bienvenue</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/40 max-w-xl mx-auto font-light leading-relaxed px-2"
          >
            | McGill | Electrical Engineering | 
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-12 flex items-center justify-center"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-sm tracking-wide text-white/90 hover:text-white transition-colors"
            >
              <span>View Work</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span className="absolute bottom-2 left-6 right-6 h-px bg-white/30 group-hover:bg-white/60 transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          />
        </motion.div>
      </section>
    </main>
  );
}
