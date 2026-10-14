import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AudioLines, BrainCircuit, Mic, Radio, Volume2 } from "lucide-react";
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

function VoicePipeline() {
  return (
    <div className="relative w-full max-w-[650px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/35">Karma AI / live architecture</p>
          <p className="mt-1 text-sm font-medium text-white/80">A conversation, in real time</p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-emerald-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Pipeline
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {pipeline.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.short} className="relative flex min-w-0 flex-col items-center text-center">
              <div className="relative mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75 sm:h-11 sm:w-11">
                <Icon size={17} strokeWidth={1.6} />
                {index < pipeline.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute -right-[calc(50%+1px)] top-1/2 z-10 h-px w-[calc(50%+2px)] origin-left bg-white/20"
                  />
                )}
              </div>
              <span className="text-[8px] uppercase tracking-[0.13em] text-white/35 sm:text-[9px]">{step.short}</span>
              <span className="mt-1 text-[9px] leading-tight text-white/70 sm:text-[10px]">{step.label}</span>
              {index < pipeline.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  className="absolute right-[-5px] top-[18px] z-20 h-1 w-1 rounded-full bg-amber-200 shadow-[0_0_9px_rgba(253,230,138,0.9)] sm:right-[-7px] sm:top-[22px]"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.25, 0.8] }}
                  transition={{ duration: 1.8, delay: index * 0.24, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
        <motion.span
          className="h-1 w-1 rounded-full bg-amber-200"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <p className="text-[9px] tracking-wide text-white/35 sm:text-[10px]">Listen → understand → respond → speak</p>
      </div>
    </div>
  );
}

export default function ProjectCard({ title, category, caseStudy, image, liveLink, codeLink, index, featured, color }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
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
        className={`group relative mx-auto block w-full cursor-pointer overflow-hidden border bg-neutral-900/40 transition-all duration-700 hover:bg-neutral-900/60
        ${featured ? "min-h-[560px] max-w-6xl rounded-[1.75rem] border-white/10 shadow-[0_0_40px_rgba(245,158,11,0.05)] hover:border-white/25 md:col-span-2 md:min-h-[620px]" : "min-h-[440px] max-w-5xl rounded-[1.75rem] border-white/5 hover:border-white/20 md:col-span-2 md:min-h-[500px]"}
        `}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ y: -6, boxShadow: `0 30px 60px -20px ${color || "#3b82f6"}33` }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-105 object-cover opacity-20 grayscale transition-all duration-[2s] ease-out group-hover:scale-100 group-hover:opacity-30"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#080808]/95 via-[#080808]/80 to-[#080808]/95" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(245,158,11,0.09),transparent_48%)]" />
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem] border border-white/[0.035]"
            style={{ boxShadow: `inset 0 0 70px ${color || "#3b82f6"}12` }}
          />
        </div>

        {featured && (
          <div className="absolute right-5 top-5 z-20 hidden w-[min(55%,650px)] sm:block md:right-10 md:top-10">
            <VoicePipeline />
          </div>
        )}

        <div className="relative z-20 flex min-h-[inherit] flex-col justify-end p-6 sm:p-10 md:p-14">
          <div className={featured ? "max-w-xl sm:max-w-[43%]" : "max-w-2xl"}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.22em]" style={{ color: color || "#d4d4d4" }}>
                {category}
              </span>
              {featured && <span className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/55">Featured project</span>}
            </div>
            <h3 className={`mb-4 font-medium leading-[0.92] tracking-[-0.07em] text-[#f4f1eb] ${featured ? "text-5xl sm:text-6xl md:text-7xl" : "text-4xl sm:text-5xl md:text-6xl"}`}>
              {title}
            </h3>
            <p className="max-w-lg text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
              {featured
                ? "A real-time voice agent built to engage scam callers through a natural, AI-driven conversation."
                : caseStudy.find((item) => item.label === "Solution")?.text || caseStudy[0]?.text}
            </p>
            {featured && (
              <div className="mt-5 sm:hidden">
                <VoicePipeline />
              </div>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 border-b border-white/50 pb-2 text-sm text-white transition-colors group-hover:border-white">
                Explore case study
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs text-white/70 transition-colors hover:border-white/35 hover:text-white"
              >
                View live project <ArrowRight size={13} />
              </a>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.18em] text-white/30">
            <span>{featured ? "Real-time AI / Voice systems" : "Selected work"}</span>
            <span>0{index + 1} / 0{featured ? 2 : 2}</span>
          </div>
        </div>
      </motion.div>

      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{ title, category, image, color: color || "#3b82f6", caseStudy, liveLink, codeLink }}
      />
    </>
  );
}
