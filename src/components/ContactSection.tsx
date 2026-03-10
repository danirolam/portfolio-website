"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 md:px-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-white/20 mx-auto mb-6"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/20 block mb-4"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl font-extralight text-white/60 tracking-tight mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-white/25 max-w-md mx-auto"
          >
            Have a question or want to work together? Send a message and
            I&apos;ll get back to you.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* Decorative border */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] pointer-events-none" />
          <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-white/[0.04]">
            {/* Name & Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <FloatingInput
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                isFocused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
              />
              <FloatingInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isFocused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            {/* Subject */}
            <div className="mb-6">
              <FloatingInput
                label="Subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                isFocused={focusedField === "subject"}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Message */}
            <div className="mb-8">
              <FloatingTextarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                isFocused={focusedField === "message"}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <MagneticSubmitButton status={status} />

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xs text-emerald-400/70 tracking-wide"
                  >
                    Message sent successfully
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xs text-red-400/70 tracking-wide"
                  >
                    Something went wrong — try again
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ──────────────── Floating Label Input ──────────────── */

function FloatingInput({
  label,
  name,
  type,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
}) {
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="peer w-full bg-transparent border-b border-white/10 focus:border-white/30 outline-none px-0 pt-5 pb-2 text-sm text-white/80 transition-colors duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-0 text-[9px] tracking-[0.2em] uppercase text-white/30"
            : "top-5 text-sm text-white/20"
        }`}
      >
        {label}
      </label>
      {/* Focus line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-white/40"
        initial={false}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ──────────────── Floating Label Textarea ──────────────── */

function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
}) {
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        rows={4}
        className="peer w-full bg-transparent border-b border-white/10 focus:border-white/30 outline-none px-0 pt-5 pb-2 text-sm text-white/80 transition-colors duration-300 placeholder-transparent resize-none"
        placeholder={label}
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-0 text-[9px] tracking-[0.2em] uppercase text-white/30"
            : "top-5 text-sm text-white/20"
        }`}
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-white/40"
        initial={false}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ──────────────── Magnetic Submit Button ──────────────── */

function MagneticSubmitButton({ status }: { status: FormStatus }) {
  const ref = useRef<HTMLButtonElement>(null);
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
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={status === "sending"}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/15 hover:border-white/30 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center bg-white/[0.04]" />
      <span className="relative text-[11px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white/80 transition-colors duration-300">
        {status === "sending" ? "Sending..." : "Send Message"}
      </span>
      {status !== "sending" && (
        <svg
          className="relative w-4 h-4 text-white/40 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1"
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
      )}
      {status === "sending" && (
        <div className="relative w-4 h-4 border border-white/30 border-t-white/70 rounded-full animate-spin" />
      )}
    </motion.button>
  );
}
