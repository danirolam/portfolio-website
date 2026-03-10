"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ADS-B GROUND STATION — CASE STUDY
   ═══════════════════════════════════════════════════════════════ */

const screenshots = [
  {
    src: "/images/projects/datalink/signal-decode.png",
    alt: "ADS-B signal decoding interface",
    caption: "Decoding live ADS-B frames as they come in",
  },
  {
    src: "/images/projects/datalink/live-tracking.png",
    alt: "Live aircraft tracking dashboard",
    caption: "Aircraft showing up on the map from decoded transponder data",
  },
  {
    src: "/images/projects/datalink/telemetry-view.png",
    alt: "Decoded telemetry display",
    caption:
      "ICAO hex matched against a database to get registration, airline, route info",
  },
];

const specs = [
  { label: "Carrier Frequency", value: "1090 MHz" },
  { label: "Modulation", value: "Pulse Position Modulation (PPM)" },
  { label: "Frame Size", value: "112-bit Extended Squitter" },
  { label: "Data Rate", value: "1 Mbit/s (Mode S)" },
  { label: "Tx Power", value: "200 – 500 W" },
  { label: "ICAO Address", value: "24-bit (16.7M unique)" },
  { label: "ADC", value: "Realtek RTL2832U" },
  { label: "Integrity", value: "CRC-24 (0xFFF409)" },
  { label: "Position Encoding", value: "Compact Position Reporting" },
];

const frameSegments = [
  { label: "DF", bits: 5, color: "#60A5FA", desc: "Downlink Format" },
  { label: "CA", bits: 3, color: "#818CF8", desc: "Capability" },
  { label: "ICAO", bits: 24, color: "#A78BFA", desc: "Aircraft Address" },
  { label: "PAYLOAD", bits: 56, color: "#C084FC", desc: "Encoded Telemetry" },
  { label: "CRC", bits: 24, color: "#E879F9", desc: "Parity Check" },
];

/* ─────────────── Helper Components ─────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="w-10 h-px bg-white/20" />
      <span className="text-[10px] tracking-[0.4em] uppercase text-white/25">
        {text}
      </span>
    </div>
  );
}

function PhaseMarker({
  number,
  label,
  accent,
}: {
  number: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span
        className="text-[10px] tracking-[0.3em] uppercase font-mono px-3 py-1 rounded-full border"
        style={{
          color: `${accent}90`,
          borderColor: `${accent}25`,
          background: `${accent}08`,
        }}
      >
        Phase {number}
      </span>
      <span
        className="text-[10px] tracking-[0.25em] uppercase"
        style={{ color: `${accent}60` }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────── Frame Structure Diagram ─────────────── */

function FrameDiagram() {
  const totalBits = 112;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12"
    >
      <div className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-4 font-mono">
        112-BIT ADS-B FRAME STRUCTURE
      </div>
      <div className="flex w-full rounded-lg overflow-hidden border border-white/[0.06]">
        {frameSegments.map((seg, i) => (
          <motion.div
            key={seg.label}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              width: `${(seg.bits / totalBits) * 100}%`,
              background: `${seg.color}15`,
              borderRight:
                i < frameSegments.length - 1
                  ? `1px solid ${seg.color}20`
                  : "none",
              transformOrigin: "left",
            }}
            className="py-3 px-2 flex flex-col items-center justify-center min-w-0"
          >
            <span
              className="text-[10px] md:text-xs font-mono font-medium truncate"
              style={{ color: `${seg.color}CC` }}
            >
              {seg.label}
            </span>
            <span className="text-[8px] md:text-[9px] text-white/20 font-mono mt-0.5">
              {seg.bits}b
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex w-full mt-2">
        {frameSegments.map((seg) => (
          <div
            key={seg.label}
            style={{ width: `${(seg.bits / totalBits) * 100}%` }}
            className="text-[7px] md:text-[8px] text-white/15 text-center truncate px-0.5"
          >
            {seg.desc}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────── Screenshot Gallery ─────────────── */

function ScreenshotGallery() {
  return (
    <div className="grid grid-cols-1 gap-8 md:gap-12">
      {screenshots.map((shot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="group relative"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15 rounded-tl-sm z-10" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15 rounded-tr-sm z-10" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15 rounded-bl-sm z-10" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15 rounded-br-sm z-10" />
            <img
              src={shot.src}
              alt={shot.alt}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030712]/80 to-transparent pointer-events-none" />
          </div>
          <p className="mt-4 text-xs md:text-sm text-white/25 leading-relaxed max-w-xl">
            <span className="text-white/40 font-mono text-[10px] tracking-wider mr-3">
              FIG.{String(i + 1).padStart(2, "0")}
            </span>
            {shot.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function DatalinkProject() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.95]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, 80]);

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* ── Back Nav ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-[11px] tracking-[0.2em] uppercase">Back</span>
          </Link>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/15">
            Case Study
          </span>
        </div>
      </motion.div>

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <svg viewBox="0 0 800 200" className="w-full max-w-6xl">
            <motion.path
              d="M0,100 Q50,20 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
            <motion.path
              d="M0,100 Q50,60 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-[#60A5FA]/40" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#60A5FA]/60 font-mono">
              1090 MHz · Mode-S Extended Squitter
            </span>
            <span className="w-12 h-px bg-[#60A5FA]/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.95] mb-6"
          >
            <span className="block text-white/90">ADS-B</span>
            <span className="block text-white/40">Ground Station</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-base text-white/30 max-w-xl mx-auto leading-relaxed mb-8"
          >
            I built a ground station that receives 1090 MHz ADS-B transponder
            signals and decodes them into a live tracking display.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {[
              "RTL-SDR",
              "RF Engineering",
              "ADS-B",
              "DSP",
              "Mode-S",
              "CRC-24",
            ].map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase rounded-full border border-[#60A5FA]/15 text-[#60A5FA]/50 bg-[#60A5FA]/[0.04]"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-white/0 via-white/30 to-white/0"
          />
        </motion.div>
      </section>

      {/* ═══════════ SYSTEM OBJECTIVE ═══════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="System Objective" />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/60 tracking-tight mb-8">
              What this is
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                Commercial aircraft broadcast their position, altitude, speed,
                and identity on 1090 MHz, unencrypted, at hundreds of watts. I
                used a $25 RTL-SDR dongle and a tuned antenna to receive those
                signals, decode them, and display the telemetry live.
              </p>
              <p>
                The project goes from RF hardware all the way through signal
                processing, protocol parsing, and data fusion. Basically a small
                scale version of the kind of systems integration that aerospace
                standards like ARP4754A and DO-178C are written for.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SYSTEM SPECS ═══════════ */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.04]"
          >
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#030712] p-5 md:p-6"
              >
                <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/20 block mb-2">
                  {spec.label}
                </span>
                <span className="text-xs md:text-sm text-white/50 font-mono leading-relaxed">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PHASE 01: RF SUBSYSTEM ═══════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhaseMarker
              number="01"
              label="RF Subsystem & Physical Layer"
              accent="#60A5FA"
            />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/70 tracking-tight mb-8">
              Picking up the signal
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                Mode-S transponders broadcast 112-bit messages on 1090 MHz at
                200 to 500 watts, so you can pick them up with a pretty basic
                setup. The antenna just has to be the right length to resonate
                at that frequency. Quarter wavelength:
              </p>
            </div>

            {/* ── Wavelength Equation ── */}
            <div className="my-10 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 md:p-8">
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/20 mb-5 font-mono">
                Antenna Element Derivation
              </div>
              <div className="space-y-3 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm md:text-base text-[#60A5FA]/80">
                    λ = c / f
                  </span>
                  <span className="text-[10px] md:text-xs text-white/15">
                    wavelength from the wave equation
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm md:text-base text-[#60A5FA]/80">
                    λ = 3×10⁸ m/s ÷ 1090×10⁶ Hz
                  </span>
                  <span className="text-[10px] md:text-xs text-white/15">
                    substituting for 1090 MHz
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm md:text-base text-[#60A5FA]">
                    λ ≈ 0.275 m → λ/4 ≈ 6.9 cm
                  </span>
                  <span className="text-[10px] md:text-xs text-white/15">
                    quarter-wave monopole element length
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                So I set the RTL-SDR&apos;s telescopic antenna to 6.9 cm. Gets
                the impedance matched, keeps VSWR low, best SNR you can get
                before the signal even hits the electronics.
              </p>
              <p>
                The signal goes through the coax into the dongle. The tuner chip
                downconverts from 1090 MHz to baseband, then the RTL2832U ADC
                digitizes it into I/Q samples at a few million samples per
                second. I/Q gives you amplitude and phase, so you can
                reconstruct the full signal in software.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PHASE 02: DRIVER BYPASS ═══════════ */}
      <section className="relative py-24 md:py-32 bg-white/[0.008]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhaseMarker
              number="02"
              label="Hardware-to-Software Interface"
              accent="#818CF8"
            />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/70 tracking-tight mb-8">
              Bypassing the default driver
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9] mb-10">
              <p>
                These SDR dongles were originally made for European digital TV.
                Plug one in, Windows installs a DVB-T driver and tries to decode
                video. Obviously not what I need.
              </p>
              <p>
                I used Zadig to rip out the default driver and replace it with
                WinUSB. That gives direct access to the raw I/Q byte stream.
              </p>
            </div>

            {/* ── Terminal Block ── */}
            <div className="my-10 bg-[#0a0e1a] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="ml-2 text-[9px] tracking-[0.2em] uppercase text-white/15 font-mono">
                  driver replacement
                </span>
              </div>
              <div className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed space-y-1.5">
                <div className="text-white/25">
                  <span className="text-[#818CF8]/70">$</span> zadig.exe
                  --replace-driver
                </div>
                <div className="text-white/15 pl-4">
                  Device: &nbsp;RTL2832U DVB-T Demodulator
                </div>
                <div className="text-white/15 pl-4">
                  Current: Realtek DVB-T Driver
                </div>
                <div className="text-white/15 pl-4">
                  Target: &nbsp;WinUSB (v6.1.7600.16385)
                </div>
                <div className="text-emerald-400/50 pl-4 mt-1">
                  ✓ Driver replaced successfully
                </div>
                <div className="mt-4 text-white/25">
                  <span className="text-[#818CF8]/70">$</span> rtl_test -t
                </div>
                <div className="text-white/15 pl-4">
                  Found 1 device(s): Generic RTL2832U
                </div>
                <div className="text-emerald-400/50 pl-4 mt-1">
                  ✓ Direct I/Q data pipeline via librtlsdr established
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                After that, librtlsdr talks to the chip directly. Set frequency,
                sample rate, gain, and it starts streaming raw I/Q over USB.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PHASE 03: DSP & DEMODULATION ═══════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhaseMarker
              number="03"
              label="Digital Signal Processing & Demodulation"
              accent="#A78BFA"
            />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/70 tracking-tight mb-8">
              From noise floor to binary
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                dump1090 (a C decoder) takes the I/Q stream and does the signal
                processing.
              </p>

              <div
                className="pl-4 border-l-2 rounded-sm"
                style={{ borderColor: "#A78BFA20" }}
              >
                <p className="text-xs md:text-[13px] text-white/20 leading-[1.8] italic">
                  <strong className="text-white/30 not-italic">
                    Preamble Detection
                  </strong>{" "}
                  Scans for a specific 8μs energy pattern that marks the start
                  of an ADS-B message. Miss the preamble, miss the data.
                </p>
              </div>

              <div
                className="pl-4 border-l-2 rounded-sm"
                style={{ borderColor: "#A78BFA20" }}
              >
                <p className="text-xs md:text-[13px] text-white/20 leading-[1.8] italic">
                  <strong className="text-white/30 not-italic">
                    PPM Demodulation
                  </strong>{" "}
                  Each bit is a 1μs window. Energy in the first half = 1, second
                  half = 0.
                </p>
              </div>

              <p>Out comes a 112-bit binary stream split into fields:</p>
            </div>

            {/* ── Frame Structure Diagram ── */}
            <FrameDiagram />

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                DF tells you the message type (DF17 = ADS-B). ICAO is a 24-bit
                hex code unique to every aircraft. The payload has the
                telemetry: altitude, speed, heading, encoded GPS.
              </p>
              <p>
                Last 24 bits are a CRC checksum. Decoder runs the same math on
                the frame it received. If even one bit flipped, the checksums
                don&apos;t match and the packet gets discarded.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PHASE 04: DATA FUSION ═══════════ */}
      <section className="relative py-24 md:py-32 bg-white/[0.008]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhaseMarker
              number="04"
              label="Systems Integration & Data Fusion"
              accent="#C084FC"
            />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/70 tracking-tight mb-8">
              Building the complete picture
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                Aircraft don&apos;t broadcast plain lat/lon. They use Compact
                Position Reporting, which compresses coordinates into fractions
                of a global grid. One message alone maps to multiple possible
                locations.
              </p>

              <div
                className="pl-4 border-l-2 rounded-sm"
                style={{ borderColor: "#C084FC20" }}
              >
                <p className="text-xs md:text-[13px] text-white/20 leading-[1.8] italic">
                  <strong className="text-white/30 not-italic">
                    Local CPR Decoding
                  </strong>{" "}
                  If you give the decoder your own coordinates as a reference
                  point, it can resolve the right position from one frame
                  instead of needing an Odd/Even pair. Way faster.
                </p>
              </div>

              <p>
                I also added data fusion on top. The ICAO hex from each aircraft
                gets looked up in a database via API, which gives you the stuff
                the transponder never sends: registration number, airline, where
                it took off, where it&apos;s going. Similar to how an FMS and
                transponder share a data bus to populate the cockpit displays.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SCREENSHOTS ═══════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel text="In Action" />
            <h2 className="text-2xl md:text-4xl font-extralight text-white/60 tracking-tight">
              The system running
            </h2>
          </motion.div>

          <ScreenshotGallery />
        </div>
      </section>

      {/* ═══════════ PHASE 05: THE ANOMALY ═══════════ */}
      <section className="relative py-24 md:py-32 bg-white/[0.008]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PhaseMarker
              number="05"
              label="Verification, Validation & EMI Testing"
              accent="#F59E0B"
            />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/70 tracking-tight mb-8">
              The anomaly
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9] mb-12">
              <p>
                Compared everything against FlightRadar24 to check it. Lat, lon,
                altitude all lined up.
              </p>
              <p>
                Then I unplugged the antenna to confirm it would lose signal. It
                kept tracking aircraft.
              </p>
            </div>

            {/* ── Anomaly Report Card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative my-12 border border-[#F59E0B]/15 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-[#F59E0B]/[0.04] border-b border-[#F59E0B]/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]/60 animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#F59E0B]/70 font-mono">
                  Anomaly Report — EMI Susceptibility
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#F59E0B]/40 font-mono block mb-2">
                    Observation
                  </span>
                  <p className="text-sm text-white/35 leading-[1.8]">
                    Unplugged the antenna. Nearby aircraft kept showing up.
                  </p>
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#F59E0B]/40 font-mono block mb-2">
                    Root Cause Analysis
                  </span>
                  <p className="text-sm text-white/35 leading-[1.8]">
                    I&apos;m close to a major airport and transponders push over
                    200W. The bare SMA connector on the dongle was acting as a
                    parasitic antenna, picking up enough signal on its own.
                  </p>
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#F59E0B]/40 font-mono block mb-2">
                    Engineering Significance
                  </span>
                  <p className="text-sm text-white/35 leading-[1.8]">
                    This is basically why DO-160 shielding standards exist. If a
                    bare connector picks up this much, imagine the inside of a
                    fuselage where hundreds of systems are packed together.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ ENGINEERING TAKEAWAYS ═══════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="Reflections" />

            <h2 className="text-2xl md:text-4xl font-extralight text-white/60 tracking-tight mb-8">
              Takeaways
            </h2>

            <div className="space-y-6 text-sm md:text-[15px] text-white/30 leading-[1.9]">
              <p>
                The interesting part of this project was that every stage
                required something different. Antenna tuning, driver hacking,
                binary protocol parsing, coordinate math, API integration. None
                of it was particularly hard on its own but wiring it all
                together into one working system was the actual challenge.
              </p>
              <p>
                The EMI discovery was probably the most useful thing I got out
                of this. I&apos;d read about parasitic antenna effects before
                but actually seeing it happen on my desk made the concept stick
                in a way that a textbook never could.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative py-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/20 hover:text-white/50 transition-colors"
          >
            <svg
              className="w-3 h-3 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-[10px] tracking-[0.2em] uppercase">
              All Projects
            </span>
          </Link>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/10">
            drolam.ca
          </span>
        </div>
      </footer>
    </main>
  );
}
