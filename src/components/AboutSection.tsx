"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "ECAD & Simulation",
    skills: ["Ansys HFSS", "Altium Designer", "KiCad", "LTSpice", "AutoCAD"],
    accent: "#60A5FA",
  },
  {
    title: "Lab & Manufacturing",
    skills: [
      "VNA",
      "Oscilloscope",
      "Multimeter",
      "PCB Rework",
      "Wire Harnessing",
    ],
    accent: "#34D399",
  },
  {
    title: "Hardware & Embedded",
    skills: ["Raspberry Pi", "Arduino", "FPGA (VHDL)", "CAN Bus", "RTL-SDR"],
    accent: "#F472B6",
  },
  {
    title: "Programming",
    skills: [
      "Python",
      "C++",
      "C",
      "Java",
      "ARM Assembly",
      "TypeScript",
      "SQL",
      "Bash",
    ],
    accent: "#A78BFA",
  },
];

const highlights = [
  { label: "Education", value: "B.Eng. Honours, Electrical Engineering" },
  { label: "Languages", value: "English · French · Russian · Spanish" },
  {
    label: "Focus Areas",
    value: "Power Systems · RF · Electronics · Applied AI",
  },
];

const experienceItems = [
  {
    role: "Intern — Project on Next Gen Simulators",
    org: "CAE Inc.",
    period: "Mar 2026 – Present",
    description:
      "Building a next-gen competitive intelligence web portal covering naval, air, terrestrial, and civil/military simulation domains. Features an interactive competitor matrix, AI-driven research integration, and a deep-tech radar surfacing translated patents, IEEE Xplore breakthroughs, and conference proceedings.",
  },
  {
    role: "Software Engineer (Intern → Part-Time)",
    org: "GeoSift",
    period: "May 2025 – Present",
    description:
      "Built the core application and a secure RAG LLM chatbot, helping secure $50K in venture funding.",
  },
  {
    role: "Undergraduate Researcher",
    org: "McGill Networks Lab",
    period: "Feb 2026 – Present",
    description:
      "Developing a verification framework to reduce LLM hallucinations under Prof. Mark Coates and PhD candidate Joseph Cotnareanu.",
  },
  {
    role: "Undergraduate Researcher",
    org: "CompEM Lab, McGill",
    period: "Sept 2025 – Jan 2026",
    description:
      "Microwave imaging research for early breast cancer detection under Prof. Milica Popović and PhD candidate Milad Mokhtari. Ansys HFSS simulations and VNA testing.",
  },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="h-px bg-white/20"
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[10px] tracking-[0.4em] uppercase text-white/25"
      >
        {label}
      </motion.span>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="h-px bg-white/10 flex-1"
      />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 md:px-20">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-white/20 mb-6"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/20 block mb-4"
          >
            About
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl font-extralight text-white/60 tracking-tight"
          >
            Background
          </motion.h2>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-sm md:text-base text-white/35 leading-[1.9] mb-4">
            Electrical engineering student with a background in computer
            science, working across the stack — from antenna simulations and PCB
            fabrication to full-stack development and applied AI. Drawn to
            problems at the intersection of hardware and software.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">
                  {h.label}
                </span>
                <span className="text-xs text-white/40">{h.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <SectionDivider label="Experience" />
        <div className="grid gap-6 mb-20">
          {experienceItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative pl-6 border-l border-white/8 hover:border-white/20 transition-colors duration-500"
            >
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 -translate-x-[3.5px] rounded-full bg-white/15 group-hover:bg-white/40 transition-colors duration-500" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-1">
                <h4 className="text-sm text-white/60 font-medium">
                  {item.role}
                </h4>
                <span className="text-[10px] tracking-[0.15em] text-white/20 uppercase">
                  {item.org}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/15 tracking-wider block mb-2">
                {item.period}
              </span>
              <p className="text-xs text-white/25 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <SectionDivider label="Technical Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: `${cat.accent}50` }}
                />
                <h3
                  className="text-[10px] md:text-xs tracking-[0.3em] uppercase"
                  style={{ color: `${cat.accent}80` }}
                >
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.3 + si * 0.05,
                    }}
                    className="px-3 py-1.5 text-[9px] md:text-[10px] tracking-[0.15em] uppercase rounded-full border backdrop-blur-sm"
                    style={{
                      color: `${cat.accent}70`,
                      borderColor: `${cat.accent}15`,
                      background: `${cat.accent}06`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
