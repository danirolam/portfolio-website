"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ───────────────────────────── Data ───────────────────────────── */

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  year: string;
  accent: string;
  logo?: string;
  image?: string;
  href?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Next Gen Portal",
    subtitle: "Internship — CAE Inc.",
    description:
      "Building a next-generation web portal for competitive intelligence in the simulation industry. Features an interactive competitor matrix with filtering across naval, air, terrestrial, and civil/military domains. Integrates AI-driven research capabilities, a deep-tech radar surfacing translated patents, academic breakthroughs (IEEE Xplore), and conference proceedings — designed to uncover non-public technical intelligence.",
    tech: ["Next.js", "TypeScript", "AI Integration", "Data Visualization"],
    year: "2026",
    accent: "#F59E0B",
    logo: "/images/logos/cae_logo.png",
  },
  {
    id: 2,
    title: "GeoSift Platform",
    subtitle: "Software Engineering",
    description:
      "Built the core application and a secure RAG-based LLM chatbot for a geospatial startup, helping secure a $50,000 investment from Front Row Ventures. Designed the architecture from the ground up, handling both the frontend and backend systems.",
    tech: ["Next.js", "TypeScript", "RAG", "LLM"],
    year: "2025",
    accent: "#A78BFA",
    logo: "/images/logos/geosift_logo.png",
  },
  {
    id: 3,
    title: "Embedded Retrofit",
    subtitle: "Automotive Hardware",
    description:
      "Designed hardware retrofits for vehicle systems — PCB rework under a microscope, custom wiring harnesses, and tracing complex electrical faults using multimeters, oscilloscopes, and OEM schematics. Brought systems back online by reprogramming control modules (ECUs) with specialized diagnostic software.",
    tech: ["Embedded", "PCB Rework", "Oscilloscope", "CAN Bus"],
    year: "2024",
    accent: "#F472B6",
    image: "/images/projects/automotive_project.jpg",
  },
  {
    id: 4,
    title: "Avionics Datalink",
    subtitle: "RF & Signal Processing",
    description:
      "Designed a ground station using RTL-SDR to intercept and decode commercial aviation networks — ADS-B transponder signals and ACARS VHF datalink. Processed raw data frames to extract and validate real-time telemetry including GPS, altitude, and heading. Defined system requirements for antenna gain and RF filtering, documenting reception performance.",
    tech: ["RTL-SDR", "Python", "Signal Processing", "VHF"],
    year: "2026",
    accent: "#60A5FA",
    image: "/images/projects/rtl-sdr_project.png",
    href: "/projects/datalink",
  },
  {
    id: 5,
    title: "Microwave Imaging",
    subtitle: "Computational EM Research",
    description:
      "Worked on a microwave imaging project for early breast cancer detection at McGill's CompEM Lab under Prof. Milica Popović and PhD candidate Milad Mokhtari. Ran antenna simulations using Ansys HFSS, built prototypes by precision-soldering SMA connectors onto flexible PCBs and microstrip patch antennas, testing energy transmission with a Vector Network Analyzer.",
    tech: ["Ansys HFSS", "PCB", "VNA", "Antenna Design"],
    year: "2025",
    accent: "#34D399",
    logo: "/images/logos/compem_logo.png",
  },
  {
    id: 6,
    title: "LLM Verification",
    subtitle: "AI Research",
    description:
      "Developing a verification framework to reduce LLM hallucinations at McGill's Networks Research Lab under Prof. Mark Coates and PhD candidate Joseph Cotnareanu. Researching and implementing techniques to improve the reliability and factual accuracy of large language model outputs.",
    tech: ["Python", "LLM", "NLP", "Research"],
    year: "2026",
    accent: "#FBBF24",
    logo: "/images/logos/networks_lab_logo.png",
  },
];

/* ──────────── Character-by-character text reveal ──────────── */

function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className={`inline-block ${className}`}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{
            whiteSpace: char === " " ? "pre" : undefined,
            willChange: "transform, opacity",
          }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.025,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ──────────── Animated line draw ──────────── */

function LineReveal({ accent }: { accent: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-full origin-left"
      style={{
        background: `linear-gradient(90deg, ${accent}40, ${accent}10, transparent)`,
      }}
    />
  );
}

/* ──────────── 3D Tilt Preview Card (mouse-tracking) ──────────── */

function TiltCard({
  accent,
  children,
  image,
  logo,
}: {
  accent: string;
  children?: React.ReactNode;
  image?: string;
  logo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs for the rotation
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      rotateX.set((y - 0.5) * -20);
      rotateY.set((x - 0.5) * 20);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [rotateX, rotateY, glowX, glowY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
      }}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Base */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          border: `1px solid ${accent}${isHovered ? "30" : "12"}`,
          background: `linear-gradient(160deg, ${accent}08, transparent 50%)`,
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovered ? 0.08 : 0.03,
          backgroundImage: `
            linear-gradient(${accent}30 1px, transparent 1px),
            linear-gradient(90deg, ${accent}30 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Mouse-following glow */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${accent}, transparent 60%)`,
        }}
      />

      {/* Shimmer edge on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${accent}20, 0 0 40px ${accent}08`,
        }}
      />

      {/* Corner brackets */}
      <svg
        className="absolute top-3 left-3 w-4 h-4 opacity-20"
        viewBox="0 0 16 16"
      >
        <path d="M0 5V0h5" fill="none" stroke={accent} strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute top-3 right-3 w-4 h-4 opacity-20"
        viewBox="0 0 16 16"
      >
        <path d="M16 5V0h-5" fill="none" stroke={accent} strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute bottom-3 left-3 w-4 h-4 opacity-20"
        viewBox="0 0 16 16"
      >
        <path d="M0 11v5h5" fill="none" stroke={accent} strokeWidth="1.5" />
      </svg>
      <svg
        className="absolute bottom-3 right-3 w-4 h-4 opacity-20"
        viewBox="0 0 16 16"
      >
        <path d="M16 11v5h-5" fill="none" stroke={accent} strokeWidth="1.5" />
      </svg>

      {/* Content slot */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}

/* ──────────── Magnetic CTA Button ──────────── */

function MagneticLink({
  accent,
  href = "#",
}: {
  accent: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 hover:shadow-lg"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background fill on hover */}
      <span
        className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"
        style={{ background: `${accent}12`, borderColor: `${accent}30` }}
      />

      <span
        className="relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
        style={{ color: `${accent}90` }}
      >
        View Project
      </span>
      <svg
        className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ color: `${accent}70` }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>

      {/* Border */}
      <span
        className="absolute inset-0 rounded-full border transition-colors duration-500"
        style={{ borderColor: `${accent}20` }}
      />
    </motion.a>
  );
}

/* ──────────── Full Project Block ──────────── */

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the giant number
  const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.04, 0.04, 0],
  );

  // Clip-path reveal — content is masked until scrolled into view
  const clipProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const clipPath = useTransform(clipProgress, (v: number) => {
    const size = v * 150; // percentage
    return `circle(${size}% at 50% 50%)`;
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={blockRef} className="relative py-20 md:py-32">
      {/* Giant floating number — parallax */}
      <motion.span
        style={{ y: numberY, opacity: numberOpacity }}
        className={`absolute top-0 ${isEven ? "-left-8 md:left-8" : "-right-8 md:right-8"} text-[35vw] md:text-[22vw] font-extralight text-white select-none pointer-events-none leading-none z-0`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Content with clip-path reveal */}
      <motion.div
        style={{ clipPath }}
        className="relative z-10 px-6 sm:px-10 md:px-20 lg:px-32"
      >
        <div
          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-start lg:items-center gap-12 lg:gap-20 max-w-7xl mx-auto`}
        >
          {/* ── Text Column ── */}
          <div className="flex-1 max-w-xl">
            {/* Subtitle pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="inline-block w-8 h-px"
                style={{ background: project.accent }}
              />
              <span
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase"
                style={{ color: `${project.accent}CC` }}
              >
                {project.subtitle}
              </span>
            </motion.div>

            {/* Title — character-by-character reveal */}
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.05] mb-2">
              {project.title.split(" ").map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <SplitText
                    text={word}
                    delay={wi * 0.1}
                    className={wi > 0 ? "text-white/40" : "text-white/90"}
                  />
                </span>
              ))}
            </h3>

            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="text-white/12 text-xs font-mono tracking-widest">
                {project.year}
              </span>
            </motion.div>

            {/* Description — fade up */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm md:text-[15px] text-white/30 leading-[1.8] mb-8 max-w-md"
            >
              {project.description}
            </motion.p>

            {/* Tech stack — staggered cascade */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.4 + ti * 0.08,
                  }}
                  className="px-3.5 py-1.5 text-[9px] md:text-[10px] tracking-[0.2em] uppercase rounded-full border backdrop-blur-sm"
                  style={{
                    color: `${project.accent}80`,
                    borderColor: `${project.accent}18`,
                    background: `${project.accent}06`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* Magnetic CTA */}
            {project.href && (
              <MagneticLink accent={project.accent} href={project.href} />
            )}
          </div>

          {/* ── Visual Column — 3D Tilt Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full lg:max-w-lg xl:max-w-xl"
          >
            <TiltCard
              accent={project.accent}
              image={project.image}
              logo={project.logo}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-700"
                />
              ) : project.logo ? (
                <div className="flex flex-col items-center justify-center gap-3 p-8">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] brightness-110"
                  />
                </div>
              ) : null}
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Separator line draw — skip for last project */}
      {index < projects.length - 1 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 lg:px-32 mt-20 md:mt-32">
          <LineReveal accent={project.accent} />
        </div>
      )}
    </div>
  );
}

/* ────────────────────── Main Section ─────────────── */

export default function ProjectsSection() {
  return (
    <section id="work" className="relative overflow-hidden">
      {/* Section entrance */}
      <div className="h-[40vh] flex items-end justify-center pb-12 relative">
        <div className="text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-px bg-white/20 mx-auto mb-6"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/20 block mb-4"
          >
            Selected Work
          </motion.span>
          <h2 className="overflow-hidden">
            <SplitText
              text="Things I've built"
              className="text-2xl md:text-4xl font-extralight text-white/50 tracking-tight"
              delay={0.4}
            />
          </h2>
        </div>
      </div>

      {/* Projects */}
      {projects.map((project, i) => (
        <ProjectBlock key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
