"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  AudioLines,
  Clapperboard,
  Code2,
  Film,
  Music2,
  Orbit,
  Play,
  Sparkles,
} from "lucide-react";
import ProjectCard from "./ProjectCard";

type Discipline = "tech" | "music" | "film";

const WORLDS: {
  id: Discipline;
  number: string;
  label: string;
  description: string;
  prompt: string;
}[] = [
  {
    id: "tech",
    number: "01",
    label: "Technology",
    description: "Systems, experiments, and useful things built from ideas.",
    prompt: "Explore the systems",
  },
  {
    id: "music",
    number: "02",
    label: "Music",
    description: "Songs, sketches, and sounds that are still finding their shape.",
    prompt: "Enter the listening room",
  },
  {
    id: "film",
    number: "03",
    label: "Film",
    description: "Stories told through frames, edits, and the things left unsaid.",
    prompt: "Enter the screening room",
  },
];

const TECH_PROJECTS = [
  {
    title: "Karma AI Agent",
    category: "Voice agent against scammers",
    caseStudy: [
      { label: "Overview", text: "Karma AI is a real-time voice agent that handles scam calls automatically." },
      { label: "How It Works", text: "Instead of blocking them, it answers unknown calls and keeps the caller engaged using natural Hindi-English conversation, reducing disruption for the user." },
      { label: "Current Focus", text: "A working MVP is already built and functional. I’m currently improving response latency, making interactions more natural, and evolving the system into a more scalable, upgradeable real-time AI pipeline." },
    ],
    image: "/images/karma-ai.png",
    liveLink: "https://karma-ai-xi.vercel.app/",
    codeLink: "https://github.com/Rishi-Raj25/Karma-Ai",
    featured: true,
    color: "#f59e0b",
  },
  {
    title: "KrishiLens",
    category: "Indian cattle & buffalo breed recognition",
    caseStudy: [
      { label: "Problem", text: "Identifying cattle and buffalo breeds can be difficult without accessible reference tools." },
      { label: "Solution", text: "An image-based recognition project designed to identify Indian cattle and buffalo breeds from visual input." },
      { label: "Explore", text: "Visit the project to see the current implementation and supported breeds." },
    ],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
    liveLink: "https://krishilens-wheat.vercel.app/",
    codeLink: "https://github.com/Rishi-Raj25/Krishilens",
    featured: false,
    color: "#10b981",
  },
];

function WorldArtwork({ discipline }: { discipline: Discipline }) {
  const reduced = useReducedMotion();

  if (discipline === "music") {
    const heights = [18, 31, 23, 48, 35, 68, 42, 28, 55, 78, 44, 25, 39, 62, 34, 20, 47, 72, 38, 25, 56, 33, 44, 19, 35, 63, 28, 46, 21, 39, 54, 30, 18, 43, 65, 29, 48, 23, 36, 57, 31, 20];
    return (
      <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden border border-[#e8c9a0]/20 bg-[#17110f] px-5 sm:min-h-[290px] sm:px-8">
        <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(192,119,79,.24), transparent 55%), linear-gradient(145deg, #17110f, #090a0d 75%)" }} />
        <div aria-hidden="true" className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-[#e8c9a0]/10" />
        <div aria-hidden="true" className="absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#e8c9a0]/10" />
        <div className="relative z-10 w-full max-w-xl">
          <div className="mb-7 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[#e8c9a0]/55">
            <span>Listening room / 002</span>
            <AudioLines size={15} strokeWidth={1.3} />
          </div>
          <div className="flex h-24 items-center justify-center gap-[3px] sm:h-32 sm:gap-1" aria-label="Decorative sound waveform">
            {heights.map((height, i) => (
              <motion.span
                key={i}
                className="w-full max-w-[7px] rounded-full bg-[#e8c9a0]"
                style={{ height: `${height}%`, opacity: 0.28 + (i % 5) * 0.13, transformOrigin: "center" }}
                animate={reduced ? undefined : { scaleY: [0.75, 1, 0.82] }}
                transition={reduced ? undefined : { duration: 1.8 + (i % 6) * 0.18, repeat: Infinity, repeatType: "mirror", delay: i * 0.025, ease: "easeInOut" }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[#e8c9a0]/15 pt-4 text-[9px] uppercase tracking-[0.18em] text-[#e8c9a0]/50">
            <span>Original music · works in progress</span>
            <span>Side A</span>
          </div>
        </div>
      </div>
    );
  }

  if (discipline === "film") {
    return (
      <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden border border-white/10 bg-[#101114] px-5 sm:min-h-[290px] sm:px-8">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 52%, rgba(170,170,170,.13), transparent 48%), linear-gradient(110deg, #090a0c, #17181b 50%, #08090b)" }} />
        <div aria-hidden="true" className="absolute inset-x-0 top-4 flex justify-around opacity-20">
          {Array.from({ length: 16 }).map((_, i) => <span key={i} className="h-2 w-4 rounded-[2px] border border-white/70" />)}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-4 flex justify-around opacity-20">
          {Array.from({ length: 16 }).map((_, i) => <span key={i} className="h-2 w-4 rounded-[2px] border border-white/70" />)}
        </div>
        <div className="relative z-10 w-full max-w-xl">
          <div className="mb-8 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-white/45">
            <span>Screening room / 003</span>
            <Clapperboard size={16} strokeWidth={1.2} />
          </div>
          <div className="relative mx-auto flex aspect-[2.1/1] max-w-md items-center justify-center border border-white/20 bg-black/25">
            <div aria-hidden="true" className="absolute inset-3 border border-white/[0.07]" />
            <div className="text-center">
              <Film size={25} strokeWidth={1} className="mx-auto mb-3 text-white/70" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/65">Stories in frames</p>
              <p className="mt-2 text-[9px] tracking-[0.12em] text-white/35">Short film · visual experiments</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.18em] text-white/40">
            <span>Independent filmmaking</span>
            <span>Take 01</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden border border-[#a9c2d7]/20 bg-[#090e14] px-5 sm:min-h-[290px] sm:px-8">
      <div aria-hidden="true" className="absolute inset-0 opacity-80" style={{ backgroundImage: "linear-gradient(rgba(169,194,215,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(169,194,215,.06) 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(67,121,161,.18), transparent 55%)" }} />
      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-7 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[#a9c2d7]/55">
          <span>Systems archive / 001</span>
          <Orbit size={16} strokeWidth={1.2} />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { icon: Code2, label: "Build", sub: "Interfaces" },
            { icon: Sparkles, label: "Reason", sub: "Intelligence" },
            { icon: AudioLines, label: "Connect", sub: "Signals" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div key={label} className="relative flex min-h-24 flex-col items-center justify-center border border-[#a9c2d7]/20 bg-[#101923]/80 p-3 text-center sm:min-h-28">
              <Icon size={20} strokeWidth={1.25} className="mb-3 text-[#a9c2d7]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/80">{label}</span>
              <span className="mt-1 text-[9px] text-white/40">{sub}</span>
              {i < 2 && <span aria-hidden="true" className="absolute -right-3 top-1/2 h-px w-3 bg-[#a9c2d7]/45 sm:-right-5 sm:w-5" />}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-[#a9c2d7]/15 pt-4 text-[9px] uppercase tracking-[0.18em] text-[#a9c2d7]/50">
          <span>Software · AI · experiments</span>
          <span>Build 01</span>
        </div>
      </div>
    </div>
  );
}

function CreativeEntry({
  discipline,
  eyebrow,
  title,
  description,
  status,
  meta,
}: {
  discipline: "music" | "film";
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  meta: string;
}) {
  return (
    <article className="group overflow-hidden border border-white/[0.12] bg-[#08090d]/80">
      <WorldArtwork discipline={discipline} />
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-7">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">{eyebrow}</span>
            <span className="h-px w-5 bg-white/20" />
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/55">{status}</span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-[#f4f1eb] sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">{description}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-white/35">{meta}</p>
        </div>
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowDownRight size={17} strokeWidth={1.3} />
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Discipline>("tech");
  const reduced = useReducedMotion();
  const selectedWorld = WORLDS.find((world) => world.id === active) ?? WORLDS[0];

  return (
    <section id="projects" className="relative px-5 py-20 md:px-6 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-24 h-48 w-48 rounded-full bg-[#7f9bb8]/[0.035] blur-3xl" />
        <div className="absolute right-[6%] top-[45%] h-56 w-56 rounded-full bg-[#b77f61]/[0.035] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.15fr_.85fr] md:items-end"
          initial={reduced ? undefined : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-8 bg-white/35" />
              The creation archive
              <span className="text-white/20">/ 03 worlds</span>
            </div>
            <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-[#f4f1eb] sm:text-6xl md:text-7xl">
              Things I&apos;ve brought
              <span className="block text-white/45">into existence.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-white/55 md:justify-self-end md:text-base">
            Some started with a problem. Some with a feeling. Others with a story I couldn&apos;t stop thinking about. Different mediums, one ongoing practice of making.
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 border-y border-white/[0.13] sm:grid-cols-3">
          {WORLDS.map((world, index) => {
            const selected = active === world.id;
            return (
              <button
                key={world.id}
                type="button"
                onClick={() => setActive(world.id)}
                aria-pressed={selected}
                className={`group relative min-h-[124px] border-b border-white/[0.10] px-4 py-5 text-left transition-colors duration-300 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 sm:last:border-r-0 ${selected ? "bg-white/[0.055]" : "hover:bg-white/[0.025]"}`}
              >
                <span className="mb-5 flex items-center justify-between">
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${selected ? "text-white/75" : "text-white/35"}`}>{world.number} / {world.label}</span>
                  {selected ? <ArrowDownRight size={17} strokeWidth={1.2} className="text-white/75" /> : <ArrowUpRight size={16} strokeWidth={1.2} className="text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                </span>
                <span className={`block max-w-xs text-sm leading-6 ${selected ? "text-white/80" : "text-white/45"}`}>{world.description}</span>
                {selected && <motion.span layoutId="project-world-indicator" className="absolute inset-x-0 bottom-0 h-px bg-[#d6c5a6]" transition={{ duration: reduced ? 0 : 0.25 }} />}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.35 }}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/35">World {selectedWorld.number}</p>
              <h3 className="text-2xl font-medium tracking-tight text-[#f4f1eb] sm:text-3xl">{selectedWorld.label}</h3>
            </div>
            <p className="max-w-sm text-xs leading-6 text-white/40">{selectedWorld.prompt}</p>
          </div>

          {active === "tech" && (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
              {TECH_PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} index={index} {...project} />
              ))}
            </div>
          )}

          {active === "music" && (
            <div className="space-y-5">
              <CreativeEntry
                discipline="music"
                eyebrow="Original song / 001"
                title="Whenever You Go"
                description="A song at the beginning of a new musical chapter. The archive will grow with recordings, artwork, and notes as the work becomes ready to share."
                status="In progress"
                meta="Songwriting · vocals · production experiments"
              />
              <div className="flex items-start gap-3 border-l border-[#e8c9a0]/35 py-2 pl-4">
                <Music2 size={16} strokeWidth={1.2} className="mt-1 shrink-0 text-[#e8c9a0]/65" />
                <p className="max-w-2xl text-xs leading-6 text-white/40">Early sketches and unfinished recordings can live here too—clearly marked as works in progress, never dressed up as finished releases.</p>
              </div>
            </div>
          )}

          {active === "film" && (
            <div className="space-y-5">
              <CreativeEntry
                discipline="film"
                eyebrow="Short film / 001"
                title="A story told in frames."
                description="An independent short film made for the Jharkhand Film Festival 2026. The screening archive can hold its synopsis, your role, selected stills, and production notes when you choose to share them."
                status="Film archive"
                meta="Filmmaking · visual storytelling"
              />
              <div className="flex items-start gap-3 border-l border-white/25 py-2 pl-4">
                <Play size={15} strokeWidth={1.2} className="mt-1 shrink-0 text-white/55" />
                <p className="max-w-2xl text-xs leading-6 text-white/40">No fabricated stills or trailer placeholders: real frames and film material should replace this visual treatment when they&apos;re available to publish.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
