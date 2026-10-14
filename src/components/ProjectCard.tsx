"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, BrainCircuit, Mic, Radio, Volume2 } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

interface ProjectCardProps {
  title: string;
  category: string;
  description?: string;
  caseStudy: { label: string; text: string }[];
  image: string;
  liveLink: string;
  codeLink: string;
  index: number;
  featured?: boolean;
  color?: string;
}

const pipeline = [
  { label: "Browser mic", short: "INPUT", icon: Mic },
  { label: "Speech to text", short: "STT", icon: AudioLines },
  { label: "AI response", short: "LLM", icon: BrainCircuit },
  { label: "Voice synthesis", short: "TTS", icon: Radio },
  { label: "Speaker", short: "OUTPUT", icon: Volume2 },
];

function SignalTrace({ reduced }: { reduced: boolean }) {
  const bars = [12, 22, 15, 31, 20, 42, 27, 17, 36, 24, 46, 18, 30, 13, 25, 40, 21, 33, 15, 27, 43, 19, 29, 12, 35, 23, 16, 38, 21, 31, 14, 25, 41, 17, 28, 12, 34, 20, 44, 16, 27, 11, 36, 22, 30, 14, 25, 39];
  return (
    <div aria-hidden="true" className="relative flex h-20 items-center gap-[3px] overflow-hidden border-y border-white/[0.08] px-3 sm:h-24 sm:gap-1 sm:px-5">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.08]" />
      {bars.map((height, i) => (
        <motion.span
          key={i}
          className="relative z-10 flex-1 rounded-full bg-[#b9c8a9]/80"
          style={{ height: `${height}%`, opacity: 0.25 + ((i % 5) * 0.13) }}
          animate={reduced ? undefined : { scaleY: [0.6, 1, 0.72], opacity: [0.25, 0.8, 0.35] }}
          transition={reduced ? undefined : { duration: 1.2 + (i % 7) * 0.15, repeat: Infinity, repeatType: "mirror", delay: i * 0.025, ease: "easeInOut" }}
        />
      ))}
      <span className="absolute left-1/2 top-0 h-full w-px bg-[#e8e2d6]/40" />
      <span className="absolute left-1/2 top-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8e2d6] shadow-[0_0_18px_rgba(232,226,214,0.85)]" />
    </div>
  );
}

function VoicePipeline() {
  const reduced = useReducedMotion();
  return (
    <div className="relative h-full min-h-[300px] overflow-hidden border border-white/[0.12] bg-[#0b0c0a]/85 p-4 sm:p-6 lg:min-h-[370px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/40">System map / 001</p>
          <p className="mt-2 text-sm text-white/80 sm:text-base">Voice in. Intelligence through. Voice out.</p>
        </div>
        <div className="flex items-center gap-2 border border-[#b9c8a9]/25 bg-[#b9c8a9]/[0.07] px-2 py-1.5 text-[8px] uppercase tracking-[0.15em] text-[#b9c8a9] sm:text-[9px]">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && <motion.span className="absolute inline-flex h-full w-full rounded-full bg-[#b9c8a9]" animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#b9c8a9]" />
          </span>
          Active loop
        </div>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-5 gap-1 sm:mt-10 sm:gap-2">
        {pipeline.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.short} className="relative flex min-w-0 flex-col items-center text-center">
              <div className="relative flex h-9 w-9 items-center justify-center border border-white/15 bg-[#11130f] text-[#e8e2d6] sm:h-12 sm:w-12">
                <Icon size={17} strokeWidth={1.4} />
                {index < pipeline.length - 1 && <span className="absolute -right-[calc(50%+1px)] top-1/2 z-10 h-px w-[calc(50%+2px)] bg-[#b9c8a9]/50" />}
              </div>
              <span className="mt-3 text-[8px] uppercase tracking-[0.12em] text-[#b9c8a9]/75 sm:text-[9px]">{step.short}</span>
              <span className="mt-1 text-[8px] leading-tight text-white/45 sm:text-[10px]">{step.label}</span>
              {index < pipeline.length - 1 && !reduced && (
                <motion.span aria-hidden="true" className="absolute right-[-4px] top-[18px] z-20 h-1.5 w-1.5 rounded-full bg-[#e8e2d6] shadow-[0_0_10px_rgba(232,226,214,0.8)] sm:right-[-6px] sm:top-[23px]" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-7 sm:mt-8">
        <SignalTrace reduced={!!reduced} />
        <div className="mt-3 flex items-center justify-between gap-3 text-[8px] uppercase tracking-[0.17em] text-white/30 sm:text-[9px]">
          <span>Speech signal / live path</span>
          <span>01 — 05</span>
        </div>
      </div>
      <span aria-hidden="true" className="absolute -bottom-20 -right-12 h-48 w-48 rounded-full border border-[#b9c8a9]/10 sm:h-64 sm:w-64" />
      <span aria-hidden="true" className="absolute -bottom-12 -right-4 h-32 w-32 rounded-full border border-[#b9c8a9]/10 sm:h-44 sm:w-44" />
    </div>
  );
}

export default function ProjectCard({ title, category, caseStudy, image, liveLink, codeLink, index, featured, color }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <motion.article
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`Open ${title} case study`}
        className={`group relative mx-auto block w-full cursor-pointer overflow-hidden border border-white/[0.12] bg-[#0a0a09] text-[#f4f1eb] transition-colors duration-500 hover:border-white/25 ${featured ? "max-w-6xl md:col-span-2" : "max-w-5xl md:col-span-2"}`}
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-[0.06] grayscale transition-opacity duration-700 group-hover:opacity-[0.11]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_15%,rgba(185,200,169,0.09),transparent_42%)]" />
          <div className="absolute inset-y-0 left-[8.333%] w-px bg-white/[0.035]" />
          <div className="absolute inset-y-0 right-[8.333%] w-px bg-white/[0.035]" />
        </div>

        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.12] px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-5 bg-[#b9c8a9]" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/45">{category}</span>
          </div>
          <span className="text-[9px] tabular-nums uppercase tracking-[0.2em] text-white/35">Selected system / 0{index + 1}</span>
        </div>

        <div className={`relative z-10 grid gap-8 p-5 sm:p-8 md:gap-10 md:p-10 lg:p-12 ${featured ? "lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch" : "lg:grid-cols-[1fr_0.85fr] lg:items-center"}`}>
          <div className="relative flex min-w-0 flex-col items-start justify-center">
            <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-12 select-none text-[8rem] font-medium leading-none tracking-[-0.1em] text-white/[0.035] sm:-left-3 sm:-top-16 sm:text-[12rem]">{String(index + 1).padStart(2, "0")}</span>
            <div className="relative mb-6 flex flex-wrap items-center gap-3">
              {featured && <span className="border border-[#b9c8a9]/30 bg-[#b9c8a9]/[0.08] px-2.5 py-1.5 text-[8px] uppercase tracking-[0.2em] text-[#c7d4bb]">Flagship project</span>}
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">{featured ? "Conversational AI / Voice" : "Applied AI / Engineering"}</span>
            </div>
            <h3 className={`relative mb-5 max-w-full break-words font-medium leading-[0.82] tracking-[-0.085em] ${featured ? "text-[clamp(3.7rem,9vw,7.6rem)]" : "text-[clamp(3rem,7vw,5.5rem)]"}`}>
              {title}
              <span className="text-[#b9c8a9]">.</span>
            </h3>
            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              {featured
                ? "A real-time voice agent that keeps scam callers talking through a natural, AI-driven conversation. Built to listen, reason, and answer out loud."
                : caseStudy.find((item) => item.label === "Solution")?.text || caseStudy[0]?.text}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {(featured ? ["Speech recognition", "LLM response", "Voice synthesis"] : ["Computer vision", "Applied AI"]).map((tag) => (
                <span key={tag} className="border border-white/[0.12] px-2.5 py-1.5 text-[8px] uppercase tracking-[0.12em] text-white/45 sm:text-[9px]">{tag}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="inline-flex items-center gap-2 border-b border-[#e8e2d6]/55 pb-2 text-sm text-[#f4f1eb] transition-colors group-hover:border-[#b9c8a9]">
                Explore case study <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </div>
              <a href={liveLink} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white">
                View live <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            {featured ? (
              <VoicePipeline />
            ) : (
              <div className="relative min-h-[260px] overflow-hidden border border-white/[0.12] bg-[#0b0c0a] sm:min-h-[320px]">
                <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-[#080808]/10" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Visual index / 0{index + 1}</span>
                  <ArrowRight size={18} className="text-[#b9c8a9] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/[0.12] px-5 py-4 sm:px-8 sm:py-5">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/30 sm:text-[9px]">{featured ? "Real-time voice systems" : "Selected work / Case study"}</span>
          <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-white/75">Inspect project <ArrowRight size={12} /></span>
        </div>
      </motion.article>

      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{ title, category, image, color: color || "#3b82f6", caseStudy, liveLink, codeLink }}
      />
    </>
  );
}
