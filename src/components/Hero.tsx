"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const headline = [
  { text: "I build", muted: false },
  { text: "intelligent", muted: true },
  { text: "systems.", muted: false },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const headlineY = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : -96]);
  const headlineOpacity = useTransform(progress, [0, 0.78, 1], [1, 1, 0.15]);
  const detailY = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : -32]);

  const enter = reduceMotion
    ? { duration: 0 }
    : { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[100svh] overflow-clip border-b border-white/10 bg-[#080808] text-[#f4f1eb]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute inset-y-0 left-[8.333%] w-px bg-white/[0.055]" />
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/[0.035]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.035]" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/[0.035]" />
        <div className="absolute inset-y-0 right-[8.333%] w-px bg-white/[0.055]" />
        <div className="absolute right-[-12rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[120] h-px origin-left bg-[#e8e2d6]"
        style={{ scaleX: progress }}
      />

      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 pt-24 sm:pb-5 sm:pt-28">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-xs"
          >
            Rishi Raj <span className="text-white/25">/</span> Portfolio
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...enter, delay: 0.18 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#a8b59a]" />
            Building what's next
          </motion.div>
        </div>

        <motion.div
          style={reduceMotion ? undefined : { y: headlineY, opacity: headlineOpacity }}
          className="flex flex-1 flex-col justify-center py-14 sm:py-20 lg:py-24"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.08 }}
            className="mb-8 text-[10px] uppercase tracking-[0.24em] text-white/40 sm:mb-10 sm:text-xs"
          >
            01 — Introduction
          </motion.p>

          <h1 className="max-w-[1200px] text-[clamp(3.7rem,10.7vw,10.5rem)] font-medium leading-[0.82] tracking-[-0.085em]">
            {headline.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    ...enter,
                    delay: reduceMotion ? 0 : 0.12 + index * 0.13,
                  }}
                  className={line.muted ? "block text-white/40" : "block"}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            style={reduceMotion ? undefined : { y: detailY }}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.58 }}
            className="mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between lg:mt-16"
          >
            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Exploring the intersection of artificial intelligence, software engineering, and ideas worth building.
            </p>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 border-b border-white/45 pb-2 text-sm text-white transition-colors hover:border-white"
              >
                Explore selected work
                <ArrowDownRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
              >
                Get in touch
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-between gap-4 border-t border-white/15 py-5">
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 sm:text-[10px] sm:tracking-[0.19em]">
            AI / Engineering / Experimentation
          </span>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white sm:text-[10px]"
          >
            Scroll to discover
            <ArrowDownRight size={13} className="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
