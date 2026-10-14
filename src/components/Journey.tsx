"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, AudioLines, Clapperboard, Code2, Compass,
  Orbit, Sparkles, X, Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

type Artifact = {
  id: string;
  label: string;
  title: string;
  teaser: string;
  note: string;
  detailTitle: string;
  detail: string;
  scribble: string;
};

type Galaxy = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  orbit: string;
  position: string;
  icon: typeof Orbit;
  artifacts: Artifact[];
};

const galaxies: Galaxy[] = [
  {
    id: "story",
    index: "01",
    name: "Before the code",
    subtitle: "Where the instinct began",
    orbit: "galaxy-amber",
    position: "lg:col-span-2 lg:translate-y-8",
    icon: Clapperboard,
    artifacts: [
      {
        id: "story-first",
        label: "FRAGMENT 01",
        title: "Wanting to tell stories",
        teaser: "The feeling before there was a plan",
        note: "ORIGIN NOTE",
        detailTitle: "I wanted to make people feel something",
        detail: "Before I had a neat career plan, I was drawn to storytelling: the way a scene could stay with you, how a small moment could mean more than a long explanation, how making something could help another person feel understood. That instinct didn't disappear when I moved toward technology. It just had to wait for a way back in.",
        scribble: "start with the feeling",
      },
      {
        id: "story-camera",
        label: "FRAGMENT 02",
        title: "Learning to look closer",
        teaser: "A frame can change what a moment means",
        note: "OBSERVATION",
        detailTitle: "The story starts before the camera rolls",
        detail: "I began paying attention to framing, timing, silence, and the details people might miss. I didn't have every tool or every answer. I had curiosity and the desire to make something that felt honest. This page is a place for real observations and story ideas as I recover and add them.",
        scribble: "what is the shot not saying?",
      },
      {
        id: "story-unfinished",
        label: "FRAGMENT 03",
        title: "The stories I carried",
        teaser: "Ideas that stayed, even when the path changed",
        note: "UNFINISHED THOUGHT",
        detailTitle: "Changing direction isn't the same as forgetting",
        detail: "As I got deeper into technology, storytelling became less visible in my day-to-day life, but it never stopped mattering. This fragment marks the thread I want to follow through the rest of the archive: not a perfectly straight line, but a creative instinct that keeps resurfacing.",
        scribble: "keep this thread",
      },
    ],
  },
  {
    id: "tech",
    index: "02",
    name: "The machine room",
    subtitle: "Curiosity found another language",
    orbit: "galaxy-blue",
    position: "lg:col-span-2 lg:translate-y-0",
    icon: Code2,
    artifacts: [
      {
        id: "tech-first",
        label: "FRAGMENT 01",
        title: "Wanting to know how it works",
        teaser: "Curiosity became code",
        note: "LEARNING LOG",
        detailTitle: "I followed the questions into technology",
        detail: "The urge to understand how things work opened a new path. Programming gave me a way to turn an idea into something that could actually do something. It was a different creative language: logic, structure, trial, error, and the satisfaction of finally making a stubborn thing work.",
        scribble: "understand it, then build it",
      },
      {
        id: "tech-friction",
        label: "FRAGMENT 02",
        title: "The errors were part of it",
        teaser: "Nothing worked just because I wanted it to",
        note: "DEBUGGING NOTE",
        detailTitle: "Progress was mostly trying again",
        detail: "Learning technology wasn't a montage of instant breakthroughs. It meant reading errors, retracing assumptions, changing approaches, and accepting that confusion is often part of understanding. That patience now belongs to my creative work too: make a version, look at it honestly, and keep going.",
        scribble: "one more attempt",
      },
      {
        id: "tech-voice",
        label: "FRAGMENT 03",
        title: "Making systems feel human",
        teaser: "The technical question became a human one",
        note: "TURNING POINT",
        detailTitle: "What if the technology could tell a story?",
        detail: "Building AI systems pushed me to think beyond whether something technically works. How does it sound? Does the interaction feel natural? Can a system hold someone's attention? Projects such as Karma AI brought engineering and character, voice, and performance into the same room.",
        scribble: "not just functional — felt",
      },
    ],
  },
  {
    id: "mistakes",
    index: "03",
    name: "The wrong turns",
    subtitle: "The parts that did not go to plan",
    orbit: "galaxy-smoke",
    position: "lg:col-span-2 lg:translate-y-12",
    icon: Compass,
    artifacts: [
      {
        id: "mistake-plan",
        label: "FRAGMENT 01",
        title: "No straight line",
        teaser: "A path can make sense only in hindsight",
        note: "MARGIN NOTE",
        detailTitle: "I didn't arrive here with a map",
        detail: "The route from storytelling toward technology, and the pull back toward creative work, has not been a tidy sequence. Interests compete for time. Plans change. Sometimes the next step is simply the one available. I want this archive to leave room for that uncertainty instead of rewriting it as a perfect strategy.",
        scribble: "detours count too",
      },
      {
        id: "mistake-film",
        label: "FRAGMENT 02",
        title: "A film that didn't get selected",
        teaser: "Making it still mattered",
        note: "FILM NOTE",
        detailTitle: "The work existed, even without the selection",
        detail: "I made a short film for the Jharkhand Film Festival 2026, and it wasn't selected. That disappointment is part of the story, but it isn't the whole story. I still made the thing, learned from the attempt, and kept the desire to tell stories. The outcome doesn't erase the act of making.",
        scribble: "keep making things",
      },
      {
        id: "mistake-reset",
        label: "FRAGMENT 03",
        title: "Letting an old version go",
        teaser: "Not every draft has to represent you forever",
        note: "REVISION LOG",
        detailTitle: "You can outgrow your own work",
        detail: "Creative work records who you were when you made it. Sometimes it stops sounding like you. Instead of pretending every old attempt belongs in the final archive, I want to make space for revision: keeping what taught me something and allowing the next version to sound more like the person I'm becoming.",
        scribble: "revise without erasing",
      },
    ],
  },
  {
    id: "making",
    index: "04",
    name: "Things made real",
    subtitle: "Ideas left the notebook",
    orbit: "galaxy-paper",
    position: "lg:col-span-3 lg:col-start-2 lg:-translate-y-1",
    icon: Zap,
    artifacts: [
      {
        id: "making-krishi",
        label: "FRAGMENT 01",
        title: "A problem worth building for",
        teaser: "KrishiLens and practical AI",
        note: "PROJECT TRACE",
        detailTitle: "Technology became more than an exercise",
        detail: "KrishiLens explored image-based recognition for cattle and buffalo breeds in India. Building something aimed at a real use case changed the question from “Can I code this?” to “Will this help someone, and what does it need to work well?” That shift made the technical details feel connected to people beyond the screen.",
        scribble: "build for someone",
      },
      {
        id: "making-karma",
        label: "FRAGMENT 02",
        title: "Giving a system a voice",
        teaser: "Karma AI brought character into engineering",
        note: "SYSTEM NOTE",
        detailTitle: "A project can have both logic and personality",
        detail: "Karma AI explored a conversational scam-baiting agent built around a character voice. Speech recognition, model responses, voice generation, and real-time interaction had to work together. It reminded me that the experience is not just the code underneath; pacing, language, character, and how a moment lands matter too.",
        scribble: "make the interaction feel alive",
      },
      {
        id: "making-learning",
        label: "FRAGMENT 03",
        title: "The unfinished versions",
        teaser: "Every working thing began as a rough one",
        note: "BUILD LOG",
        detailTitle: "A project is a trail of decisions",
        detail: "The polished demo is only the visible end of many small choices: what to simplify, what to fix, what to postpone, and what to try differently. This part of the archive will hold real snippets, screenshots, and notes from that process as they are collected—rather than inventing a perfect behind-the-scenes story.",
        scribble: "save the rough drafts",
      },
    ],
  },
  {
    id: "return",
    index: "05",
    name: "The way back",
    subtitle: "Tech did not replace the storyteller",
    orbit: "galaxy-violet",
    position: "lg:col-span-2 lg:col-start-5 lg:translate-y-10",
    icon: AudioLines,
    artifacts: [
      {
        id: "return-music",
        label: "FRAGMENT 01",
        title: "Feelings needed somewhere to go",
        teaser: "Music kept the door open",
        note: "MUSIC NOTE",
        detailTitle: "Music became another way to tell the truth",
        detail: "Writing and making music lets me work with feelings that don't always fit into a technical explanation. A melody, a rough lyric, or an imperfect recording can carry something a polished paragraph can't. I want the songs in this archive to be real drafts from the process, not props arranged to look artistic.",
        scribble: "leave the rough edge in",
      },
      {
        id: "return-film",
        label: "FRAGMENT 02",
        title: "Finding my way back to the frame",
        teaser: "Storytelling is still part of the plan",
        note: "DIRECTION NOTE",
        detailTitle: "I don't want to choose only one side of myself",
        detail: "I found a way into technology, and I value what I've learned there. But I also want to give more room to filmmaking, music, and storytelling. The aim isn't to reject the technical path; it's to bring these paths into the same life and see what becomes possible when they inform one another.",
        scribble: "not back to the start — forward",
      },
      {
        id: "return-next",
        label: "FRAGMENT 03",
        title: "The next signal is unwritten",
        teaser: "This archive grows when life does",
        note: "OPEN ENTRY",
        detailTitle: "The journey is still happening",
        detail: "There is no final lesson yet. There are songs to finish, stories to tell, things to build, and plenty left to learn. This page is a living record, not a claim that everything has already come together. New fragments will be added as the next chapter actually happens.",
        scribble: "to be continued",
      },
    ],
  },
];

export default function Journey() {
  const [activeGalaxy, setActiveGalaxy] = useState<Galaxy | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const archiveOpen = Boolean(activeGalaxy || activeArtifact);

  useEffect(() => {
    if (!archiveOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.classList.add("journey-archive-open");
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    lenis?.stop();
    const onPointerMove = (event: PointerEvent) => setCursorPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.body.classList.remove("journey-archive-open");
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      lenis?.start();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [archiveOpen, lenis]);

  useEffect(() => {
    if (!activeGalaxy && !activeArtifact) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeArtifact) setActiveArtifact(null);
        else setActiveGalaxy(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGalaxy, activeArtifact]);

  const closeGalaxy = () => {
    setActiveArtifact(null);
    setActiveGalaxy(null);
  };

  return (
    <section id="journey" className="relative isolate overflow-hidden px-5 py-24 text-[#eeeae1] sm:px-8 md:py-36" aria-labelledby="journey-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-28 h-48 w-48 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute right-[8%] top-[48%] h-64 w-64 rounded-full bg-[#a4a9b9]/[0.035] blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" viewBox="0 0 1200 1200" fill="none">
          <path d="M-80 340C180 80 470 140 620 390S940 760 1280 520" stroke="white" strokeWidth="0.7" strokeDasharray="2 10" />
          <path d="M-100 840C180 1080 500 890 650 720S990 450 1290 850" stroke="white" strokeWidth="0.7" strokeDasharray="1 12" />
          <circle cx="620" cy="390" r="3" fill="#e9e1cf" />
          <circle cx="650" cy="720" r="2" fill="#e9e1cf" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_280px] md:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              <span className="h-px w-8 bg-white/35" />
              Personal universe / Journey archive
            </div>
            <h2 id="journey-heading" className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.065em] text-[#f3f0e9] sm:text-7xl md:text-8xl">
              Every path
              <br />
              <span className="font-serif font-normal italic text-[#bdb7aa]">leaves a signal.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/55 md:justify-self-end">
            Five galaxies from one unfinished journey — from the stories that pulled me in, through the systems I learned to build, and toward the stories I want to tell next.
          </p>
        </motion.header>

        <div className="relative">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-30 lg:block" viewBox="0 0 1000 700" fill="none" preserveAspectRatio="none">
            <path d="M120 130C300 40 400 160 510 250S760 390 850 190" stroke="white" strokeWidth="0.7" strokeDasharray="2 8" />
            <path d="M120 130C220 320 380 400 500 440S730 560 850 190" stroke="white" strokeWidth="0.7" strokeDasharray="2 10" />
            <circle cx="120" cy="130" r="2" fill="#d5c9b3" /><circle cx="510" cy="250" r="2" fill="#d5c9b3" /><circle cx="850" cy="190" r="2" fill="#d5c9b3" />
          </svg>
          <div className="relative grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-16">
            {galaxies.map((galaxy, index) => {
              const Icon = galaxy.icon;
              return (
                <motion.button
                  key={galaxy.id}
                  type="button"
                  onClick={() => setActiveGalaxy(galaxy)}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.08 }}
                  className={`journey-galaxy ${galaxy.orbit} ${galaxy.position} group relative flex min-h-[250px] flex-col items-center justify-center px-5 py-8 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white/70`}
                  aria-label={`Explore galaxy ${galaxy.name}`}
                >
                  <span aria-hidden="true" className="galaxy-orbit galaxy-orbit-one" />
                  <span aria-hidden="true" className="galaxy-orbit galaxy-orbit-two" />
                  <span aria-hidden="true" className="galaxy-core">
                    <span className="galaxy-core-glow" />
                    <Icon size={24} strokeWidth={1.15} className="relative z-10 text-[#e8e0d2]/85" />
                  </span>
                  <span className="relative z-10 mt-7 font-mono text-[9px] tracking-[0.24em] text-white/40">{galaxy.index} / GALAXY</span>
                  <span className="relative z-10 mt-2 font-serif text-2xl tracking-[-0.035em] text-[#eeeae1] sm:text-[1.65rem]">{galaxy.name}</span>
                  <span className="relative z-10 mt-2 max-w-[220px] text-xs leading-5 text-white/50">{galaxy.subtitle}</span>
                  <span className="galaxy-invitation" aria-hidden="true"><span className="galaxy-leader" />Want to know more? <ArrowUpRight size={12} /></span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.19em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Five galaxies / One continuing journey</span>
          <span>Follow a signal. Open a fragment. Keep going.</span>
        </div>
      </div>

      <AnimatePresence>
        {activeGalaxy && !activeArtifact && (
          <motion.div
            key={activeGalaxy.id}
            className="journey-archive-overlay fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-[#080807] text-[#eeeae1]"
            onWheel={(event) => event.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="galaxy-title"
          >
            <div aria-hidden="true" className="journey-archive-cursor" style={{ left: cursorPosition.x, top: cursorPosition.y }}><span /></div>
            <div className="mx-auto min-h-full max-w-6xl px-5 py-8 sm:px-8 md:py-12">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <button type="button" onClick={closeGalaxy} className="inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  <ArrowLeft size={15} /> Back to the universe
                </button>
                <div className="flex items-center gap-4"><span className="hidden font-mono text-[9px] tracking-[0.2em] text-white/35 sm:inline">GALAXY {activeGalaxy.index} / ARCHIVE</span><button type="button" onClick={closeGalaxy} aria-label="Close galaxy archive" className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X size={16} /></button></div>
              </div>
              <div className="grid gap-8 py-10 md:grid-cols-[0.8fr_1.2fr] md:items-end md:py-14">
                <div>
                  <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/40"><Sparkles size={12} /> A CHAPTER IN THE JOURNEY</p>
                  <h3 id="galaxy-title" className="font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-7xl">{activeGalaxy.name}<span className="text-[#aaa395]">.</span></h3>
                </div>
                <p className="max-w-xl text-sm leading-7 text-white/60 md:justify-self-end">{activeGalaxy.subtitle}. These are the loose pages inside this galaxy. Open a fragment to read the longer note.</p>
              </div>
              <div className="grid gap-5 pb-16 md:grid-cols-3 md:gap-6">
                {activeGalaxy.artifacts.map((artifact, index) => (
                  <motion.button
                    key={artifact.id}
                    type="button"
                    onClick={() => setActiveArtifact(artifact)}
                    initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: index % 2 ? 2 : -2, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1.4 : -1.4, scale: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 17, delay: reduceMotion ? 0 : index * 0.12 }}
                    whileHover={reduceMotion ? undefined : { y: -5, rotate: 0, scale: 1.015 }}
                    className={`artifact-paper ${["paper-ivory", "paper-warm", "paper-grey"][index]} group relative flex min-h-[300px] flex-col justify-between p-6 text-left text-[#292720] shadow-[0_20px_60px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6cdbb] sm:p-7`}
                  >
                    <span aria-hidden="true" className="paper-fold" />
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <span className="font-mono text-[9px] tracking-[0.18em] text-[#625d53]">{artifact.label}</span>
                      <ArrowUpRight size={15} strokeWidth={1.4} className="text-[#777064] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <div className="relative z-10 py-8">
                      <p className="mb-3 font-mono text-[9px] tracking-[0.17em] text-[#777064]">{artifact.note}</p>
                      <h4 className="font-serif text-2xl leading-[1.08] tracking-[-0.035em]">{artifact.title}</h4>
                      <p className="mt-3 text-xs leading-5 text-[#696358]">{artifact.teaser}</p>
                    </div>
                    <div className="relative z-10 border-t border-[#423c32]/20 pt-3 font-serif text-sm italic text-[#6d665a]">{artifact.scribble}</div>
                  </motion.button>
                ))}
              </div>
              <p className="pb-8 text-center font-mono text-[9px] tracking-[0.18em] text-white/30">THE ARCHIVE IS IN PROGRESS — MORE FRAGMENTS WILL BE ADDED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeArtifact && (
          <motion.div
            key={activeArtifact.id}
            className="journey-archive-overlay fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#080807] px-4 py-8 sm:px-8"
            onWheel={(event) => event.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artifact-detail-title"
          >
            <div aria-hidden="true" className="journey-archive-cursor" style={{ left: cursorPosition.x, top: cursorPosition.y }}><span /></div>
            <button type="button" onClick={() => setActiveArtifact(null)} className="fixed right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Back to galaxy"><X size={17} /></button>
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, scale: 0.76, rotate: -4, y: 25, filter: "blur(7px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, rotate: 2, y: 12, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 145, damping: 18, duration: reduceMotion ? 0 : undefined }}
              className="artifact-paper paper-ivory relative my-auto w-full max-w-3xl p-7 text-[#292720] shadow-[0_35px_100px_rgba(0,0,0,0.5)] sm:p-12 md:p-16"
            >
              <span aria-hidden="true" className="paper-fold" />
              <div className="relative z-10">
                <div className="mb-12 flex items-center justify-between gap-4 border-b border-[#423c32]/20 pb-4 font-mono text-[9px] tracking-[0.18em] text-[#6d665a]">
                  <span>{activeArtifact.label}</span><span>{activeArtifact.note}</span>
                </div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.17em] text-[#777064]">A page from the journey</p>
                <h3 id="artifact-detail-title" className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">{activeArtifact.detailTitle}</h3>
                <p className="mt-8 max-w-2xl whitespace-pre-line text-sm leading-8 text-[#575247] sm:text-base sm:leading-9">{activeArtifact.detail}</p>
                <div className="mt-14 flex flex-wrap items-end justify-between gap-5 border-t border-[#423c32]/20 pt-4">
                  <span className="font-serif text-lg italic text-[#777064]">{activeArtifact.scribble}</span>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#575247]">
                    <button type="button" onClick={() => setActiveArtifact(null)} className="inline-flex items-center gap-2 underline decoration-[#575247]/30 underline-offset-4 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#302d27]"><ArrowLeft size={13} /> Back to this galaxy</button>
                    <button type="button" onClick={() => { const items = activeGalaxy?.artifacts ?? []; const index = items.findIndex((item) => item.id === activeArtifact.id); if (index > 0) setActiveArtifact(items[index - 1]); }} disabled={(activeGalaxy?.artifacts.findIndex((item) => item.id === activeArtifact.id) ?? 0) === 0} className="underline decoration-[#575247]/30 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-25">Previous</button>
                    <button type="button" onClick={() => { const items = activeGalaxy?.artifacts ?? []; const index = items.findIndex((item) => item.id === activeArtifact.id); if (index >= 0 && index < items.length - 1) setActiveArtifact(items[index + 1]); }} disabled={(activeGalaxy?.artifacts.findIndex((item) => item.id === activeArtifact.id) ?? -1) >= (activeGalaxy?.artifacts.length ?? 0) - 1} className="underline decoration-[#575247]/30 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-25">Next fragment</button>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
