"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Orbit, RotateCcw, Sparkles } from "lucide-react";

type PathId = "build" | "create";
type Skill = { name: string; description: string; x: number; y: number };

const PATHS: Record<PathId, { eyebrow: string; title: string; subtitle: string; color: string; glow: string; skills: Skill[] }> = {
  build: {
    eyebrow: "FIELD 01 · TECHNICAL + EXECUTION",
    title: "Build & Engineer",
    subtitle: "A closer look at the technical tools and systems I work with.",
    color: "#9bd8ff",
    glow: "rgba(66, 153, 225, .34)",
    skills: [
      { name: "Python", description: "Used for backend logic, scripting, and AI-powered prototypes, including Karma AI.", x: 18, y: 20 },
      { name: "Web development", description: "HTML, CSS, JavaScript, React, and Next.js for responsive interfaces and interactive experiences.", x: 43, y: 13 },
      { name: "Backend & APIs", description: "Flask, REST APIs, JSON, and service integrations that connect an application.", x: 70, y: 20 },
      { name: "Databases", description: "SQL, MySQL, PostgreSQL, DBMS concepts, and working with structured data.", x: 84, y: 43 },
      { name: "AI integration", description: "Applying AI services to practical products, including conversational and voice-based workflows.", x: 76, y: 70 },
      { name: "Voice AI", description: "Speech-to-text, text-to-speech, conversational flows, WebSockets, and experiments with Sarvam AI and Twilio.", x: 50, y: 82 },
      { name: "Computer vision", description: "Image-based breed recognition explored in KrishiLens, including PyTorch and AI/ML concepts.", x: 24, y: 73 },
      { name: "C / C++", description: "Programming fundamentals, control flow, object-oriented concepts, and structured problem-solving.", x: 10, y: 48 },
      { name: "DSA & CS foundations", description: "Data structures, algorithms, operating systems, networking, and core computer science concepts.", x: 25, y: 42 },
      { name: "Git & deployment", description: "Git, GitHub, branching, debugging, and deploying web projects with tools such as Vercel.", x: 51, y: 49 },
    ],
  },
  create: {
    eyebrow: "FIELD 02 · CREATIVE + COMMUNICATION",
    title: "Create & Tell Stories",
    subtitle: "Music and film: the creative work I am still growing into.",
    color: "#e2b9ff",
    glow: "rgba(168, 85, 247, .32)",
    skills: [
      { name: "Songwriting", description: "Developing original song ideas from emotions, observations, memorable lines, and melodic fragments.", x: 20, y: 24 },
      { name: "Singing & instruments", description: "Singing, ukulele, and exploring electric guitar as part of an evolving musical identity.", x: 72, y: 24 },
      { name: "Music & recording", description: "Making demos in BandLab, experimenting with harmonies and arrangements, and keeping the production raw and honest.", x: 78, y: 65 },
      { name: "Filmmaking", description: "Exploring short-film ideas, atmosphere, visual storytelling, scenes, and emotional pacing.", x: 27, y: 68 },
      { name: "Creative storytelling", description: "Finding human details and shaping mood, imagery, sound, and narrative into a coherent experience.", x: 50, y: 45 },
    ],
  },
};

const PARTICLES = Array.from({ length: 74 }, (_, i) => ({
  x: (i * 47 + 9) % 100,
  y: (i * 71 + 13) % 100,
  size: i % 13 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
  delay: (i % 11) * 0.035,
  angle: (i * 137.5) * (Math.PI / 180),
  distance: 90 + ((i * 23) % 260),
}));

function NebulaParticles({ active = false }: { active?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.i
          key={i}
          className="absolute block rounded-full bg-white"
          style={{ left: `${active ? 50 : p.x}%`, top: `${active ? 49 : p.y}%`, width: p.size, height: p.size, boxShadow: "0 0 9px rgba(220,230,255,.65)" }}
          initial={reduced ? false : active ? { x: 0, y: 0, opacity: 0, scale: 0.2 } : { opacity: 0.12, scale: 0.8 }}
          animate={reduced ? { opacity: 0.55 } : active
            ? { x: Math.cos(p.angle) * p.distance, y: Math.sin(p.angle) * p.distance, opacity: [0, 0.95, 0.45], scale: [0.2, 1.2, 0.8] }
            : { opacity: [0.12, 0.7, 0.18], scale: [0.8, 1.25, 0.8] }}
          transition={reduced ? { duration: 0 } : active
            ? { duration: 1.8 + p.delay, delay: p.delay, ease: [0.12, 0.75, 0.2, 1] }
            : { duration: 4 + p.delay * 5, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [activePath, setActivePath] = useState<PathId | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const path = activePath ? PATHS[activePath] : null;
  const selected = path?.skills.find((skill) => skill.name === selectedSkill) ?? null;
  const starLines = useMemo(() => {
    if (!path) return [];
    return path.skills.slice(0, -1).map((skill, i) => [skill, path.skills[i + 1]]);
  }, [path]);

  const choosePath = (id: PathId) => {
    setSelectedSkill(null);
    setActivePath(id);
  };
  const returnToNebula = () => {
    setSelectedSkill(null);
    setActivePath(null);
  };
  const switchPath = () => choosePath(activePath === "build" ? "create" : "build");

  return (
    <section id="capabilities" className="relative isolate overflow-hidden px-5 py-20 md:px-6 md:py-32">
      <span id="stack" className="absolute -top-24" aria-hidden="true" />
      <span id="skills" className="absolute -top-24" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(72,88,148,.08), transparent 52%)" }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-8 max-w-3xl md:mb-12"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.2, 0.75, 0.2, 1] }}
        >
          <p className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[.3em] text-white/40">
            <span className="h-px w-7 bg-white/30" /> Capabilities / The making of things
          </p>
          <h2 className="text-4xl font-light leading-[.98] tracking-[-.055em] text-[#f0eee8] sm:text-6xl md:text-7xl">Capabilities <span className="text-white/35">&</span> Stack.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Different ways of making things real. Enter a field, follow the stars, and see what connects.
          </p>
        </motion.div>

        <div className="relative [perspective:1800px]">
          <AnimatePresence mode="wait" initial={false}>
            {!path ? (
              <motion.div
                key="nebula-front"
                initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.88, rotateX: 9, y: 28 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12, rotateY: 105, rotateZ: 12, z: -220, filter: "blur(10px)" }}
                transition={{ duration: reduced ? 0 : 1.35, ease: [0.16, 0.8, 0.2, 1] }}
                className="relative min-h-[640px] overflow-hidden sm:min-h-[720px]"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                <NebulaParticles />
                <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(7,10,23,.04), rgba(2,4,10,.3) 75%, #03050a 100%)" }} />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[43%] aspect-square w-[min(92vw,650px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(62vw,720px)]"
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={reduced ? undefined : { duration: 150, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full opacity-90" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(116,206,255,.98) 0%, rgba(75,151,236,.75) 5%, rgba(76,110,204,.52) 14%, rgba(95,83,180,.3) 27%, transparent 51%)", filter: "blur(14px)" }} />
                  <div className="absolute inset-[4%] rounded-full opacity-90" style={{ background: "conic-gradient(from 12deg at 50% 50%, transparent 0deg, rgba(66,185,219,.2) 32deg, rgba(224,160,106,.66) 65deg, rgba(80,212,226,.7) 98deg, transparent 133deg, rgba(184,112,186,.4) 174deg, rgba(67,176,220,.55) 224deg, rgba(228,152,104,.5) 276deg, transparent 330deg)", filter: "blur(24px)" }} />
                  <div className="absolute inset-[8%] rounded-full opacity-75" style={{ background: "radial-gradient(ellipse at 30% 32%, rgba(246,179,119,.82), transparent 24%), radial-gradient(ellipse at 70% 28%, rgba(66,218,229,.82), transparent 26%), radial-gradient(ellipse at 26% 72%, rgba(79,202,215,.7), transparent 27%), radial-gradient(ellipse at 75% 70%, rgba(214,130,101,.72), transparent 25%), radial-gradient(ellipse at center, transparent 22%, rgba(118,162,255,.45) 34%, transparent 57%)", filter: "blur(18px)" }} />
                  <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <defs>
                      <filter id="nebula-filaments">
                        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="3" seed="12" />
                        <feColorMatrix values="1 0 0 0 .1  0 1 0 0 .25  0 0 1 0 .35  0 0 0 1 0" />
                        <feGaussianBlur stdDeviation="1.4" />
                      </filter>
                      <radialGradient id="nebula-core">
                        <stop stopColor="#b7f3ff" stopOpacity=".98" />
                        <stop offset=".09" stopColor="#6fd7ff" stopOpacity=".86" />
                        <stop offset=".25" stopColor="#718de5" stopOpacity=".42" />
                        <stop offset=".58" stopColor="#8a6ab4" stopOpacity=".12" />
                        <stop offset="1" stopColor="#050711" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="300" cy="300" r="278" fill="url(#nebula-core)" />
                    <path d="M300 28 C390 60 492 115 555 215 S520 420 438 502 S258 584 138 500 S25 333 68 220 S204 42 300 28Z" fill="none" stroke="#69d8ec" strokeWidth="38" strokeOpacity=".32" filter="url(#nebula-filaments)" />
                    <path d="M300 45 C400 90 475 115 535 235 S485 420 412 486 S250 552 151 470 S54 325 86 225 S205 65 300 45Z" fill="none" stroke="#efb27d" strokeWidth="28" strokeOpacity=".45" filter="url(#nebula-filaments)" />
                    <path d="M300 72 C380 102 466 160 498 245 S460 398 385 455 S252 508 170 442 S86 318 112 238 S213 94 300 72Z" fill="none" stroke="#82e6ed" strokeWidth="19" strokeOpacity=".55" filter="url(#nebula-filaments)" />
                    <circle cx="300" cy="300" r="205" fill="none" stroke="#d2faff" strokeOpacity=".15" strokeWidth="1" />
                  </svg>
                  <div className="absolute inset-[20%] rounded-full" style={{ background: "radial-gradient(circle, rgba(183,238,255,.65), rgba(92,139,226,.28) 23%, rgba(8,12,28,.1) 54%, transparent 70%)", filter: "blur(18px)" }} />
                </motion.div>

                <div className="relative z-10 flex min-h-[640px] flex-col items-center sm:min-h-[720px]">
                  <div className="mt-8 text-center sm:mt-10">
                    <p className="mb-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[.3em] text-white/55"><Sparkles size={12} /> Choose your trajectory</p>
                    <h3 className="text-2xl font-light tracking-[-.04em] text-white sm:text-4xl">Two ways to make a universe.</h3>
                    <p className="mt-3 text-xs text-white/60 sm:text-sm">Enter the nebula. Follow what draws you in.</p>
                  </div>

                  <div className="absolute left-0 right-0 top-[42%] hidden -translate-y-1/2 items-center justify-between gap-8 lg:flex">
                    <motion.button type="button" onClick={() => choosePath("build")} whileHover={reduced ? undefined : { x: 7, scale: 1.035 }} whileTap={reduced ? undefined : { scale: .98 }}
                      className="group relative w-[245px] border-l border-[#9bd8ff]/55 bg-gradient-to-r from-[#9bd8ff]/[.12] to-transparent px-5 py-5 text-left backdrop-blur-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#9bd8ff]">
                      <span className="flex items-center justify-between text-[9px] uppercase tracking-[.22em] text-[#9bd8ff]/85"><span>Field 01</span><ArrowUpRight size={15} /></span>
                      <span className="mt-3 block text-2xl font-light text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.9)]">Build & Engineer</span>
                      <span className="mt-2 block text-xs leading-5 text-white/70">Code, systems, AI, and prototypes.</span>
                      <span className="mt-4 block h-px w-10 bg-[#9bd8ff]/55 transition-all duration-500 group-hover:w-full" />
                    </motion.button>
                    <motion.button type="button" onClick={() => choosePath("create")} whileHover={reduced ? undefined : { x: -7, scale: 1.035 }} whileTap={reduced ? undefined : { scale: .98 }}
                      className="group relative w-[245px] border-r border-[#e2b9ff]/55 bg-gradient-to-l from-[#e2b9ff]/[.12] to-transparent px-5 py-5 text-right backdrop-blur-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#e2b9ff]">
                      <span className="flex items-center justify-between text-[9px] uppercase tracking-[.22em] text-[#e2b9ff]/85"><ArrowUpRight size={15} /><span>Field 02</span></span>
                      <span className="mt-3 block text-2xl font-light text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.9)]">Create & Tell Stories</span>
                      <span className="mt-2 block text-xs leading-5 text-white/70">Film, music, words, and ideas.</span>
                      <span className="mt-4 ml-auto block h-px w-10 bg-[#e2b9ff]/55 transition-all duration-500 group-hover:w-full" />
                    </motion.button>
                  </div>

                  <div className="mt-auto grid w-full grid-cols-1 gap-4 px-2 pb-8 pt-[300px] sm:grid-cols-2 sm:px-8 lg:hidden">
                    <button type="button" onClick={() => choosePath("build")} className="border-l border-[#9bd8ff]/55 bg-gradient-to-r from-[#9bd8ff]/[.12] to-transparent px-4 py-4 text-left backdrop-blur-sm">
                      <span className="text-[9px] uppercase tracking-[.22em] text-[#9bd8ff]/85">Field 01</span><span className="mt-2 block text-xl text-white">Build & Engineer</span><span className="mt-1 block text-xs text-white/65">Code, systems, AI, and prototypes.</span>
                    </button>
                    <button type="button" onClick={() => choosePath("create")} className="border-r border-[#e2b9ff]/55 bg-gradient-to-l from-[#e2b9ff]/[.12] to-transparent px-4 py-4 text-right backdrop-blur-sm">
                      <span className="text-[9px] uppercase tracking-[.22em] text-[#e2b9ff]/85">Field 02</span><span className="mt-2 block text-xl text-white">Create & Tell Stories</span><span className="mt-1 block text-xs text-white/65">Film, music, words, and ideas.</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activePath}
                initial={reduced ? { opacity: 0 } : { opacity: 0, rotateY: activePath === "build" ? 78 : -78, scale: 0.92, z: -100 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, rotateY: activePath === "build" ? -76 : 76, scale: 0.92, z: -100, filter: "blur(6px)" }}
                transition={{ duration: reduced ? 0 : 1.2, ease: [0.2, 0.72, 0.18, 1] }}
                className="relative min-h-[600px] overflow-hidden sm:min-h-[680px]"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                <NebulaParticles />
                <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 42%, ${path.glow}, transparent 60%)` }} />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <button type="button" onClick={returnToNebula} className="inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.18em] text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">
                    <ArrowLeft size={14} /> Back to nebula
                  </button>
                  <button type="button" onClick={switchPath} className="inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.18em] text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">
                    {activePath === "build" ? "Create & tell stories" : "Build & engineer"} <ArrowRight size={14} />
                  </button>
                </div>

                <div className="relative mt-5">
                  <div className="relative z-10">
                    <p className="text-[9px] uppercase tracking-[.28em]" style={{ color: path.color }}>{path.eyebrow}</p>
                    <h3 className="mt-3 text-3xl font-light tracking-[-.05em] text-white sm:text-5xl">{path.title}</h3>
                    <p className="mt-3 text-sm text-white/50">{path.subtitle}</p>
                  </div>

                  <div className="relative mt-5 h-[410px] overflow-hidden sm:mt-0 sm:h-[500px]" style={{ perspective: "1200px" }}>
                    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`starline-${activePath}`} x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor={path.color} stopOpacity=".08" />
                          <stop offset=".5" stopColor={path.color} stopOpacity=".65" />
                          <stop offset="1" stopColor={path.color} stopOpacity=".08" />
                        </linearGradient>
                      </defs>
                      {starLines.map(([from, to], i) => (
                        <motion.line
                          key={`${from.name}-${to.name}`}
                          x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                          stroke={`url(#starline-${activePath})`} strokeWidth=".32" strokeDasharray="1.3 1.3"
                          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.72 }}
                          transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : i * 0.09, ease: "easeOut" }}
                        />
                      ))}
                      <ellipse cx="50" cy="46" rx="38" ry="31" fill="none" stroke={path.color} strokeOpacity=".11" strokeWidth=".25" strokeDasharray="1 2" />
                      <ellipse cx="50" cy="46" rx="26" ry="42" fill="none" stroke={path.color} strokeOpacity=".1" strokeWidth=".25" transform="rotate(38 50 46)" />
                    </svg>

                    {path.skills.map((skill, i) => (
                      <motion.button
                        key={skill.name}
                        type="button"
                        onClick={() => setSelectedSkill(skill.name)}
                        aria-pressed={selectedSkill === skill.name}
                        className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-md px-1 py-1 text-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
                        style={{ left: `${skill.x}%`, top: `${skill.y}%`, maxWidth: activePath === "build" ? "31%" : "34%" }}
                        initial={reduced ? false : { opacity: 0, scale: 0.45, y: 8 }}
                        animate={{ opacity: 1, scale: selectedSkill === skill.name ? 1.12 : 1, y: 0 }}
                        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                      >
                        <span className={`relative flex items-center justify-center ${activePath === "build" ? "h-9 w-9 sm:h-11 sm:w-11" : "h-7 w-7 sm:h-9 sm:w-9"}`}>
                          <motion.span
                            className="absolute inset-1 rounded-full blur-md"
                            style={{ background: path.glow }}
                            animate={reduced ? undefined : { scale: [0.8, 1.35, 0.8], opacity: selectedSkill === skill.name ? [0.7, 1, 0.7] : [0.35, 0.72, 0.35] }}
                            transition={reduced ? undefined : { duration: 3 + (i % 4) * 0.35, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.span
                            className={`relative rounded-full border border-white/80 ${activePath === "build" ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-2 w-2 sm:h-2.5 sm:w-2.5"}`}
                            style={{ background: selectedSkill === skill.name ? "#fff" : path.color, boxShadow: `0 0 16px ${path.color}` }}
                            whileHover={reduced ? undefined : { scale: 1.8 }}
                          />
                        </span>
                        <span className={`max-w-full leading-4 transition-colors group-hover:text-white ${activePath === "build" ? "text-[10px] text-white/80 sm:text-xs" : "text-[9px] text-white/65 sm:text-[11px]"}`}>{skill.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {activePath === "build" && (
                    <div className="relative z-20 mt-2 flex justify-center">
                      <div className="group relative">
                        <button type="button" className="inline-flex items-center gap-2 border border-white/15 bg-white/[.025] px-4 py-2.5 text-[10px] uppercase tracking-[.2em] text-white/55 transition-colors hover:border-[#9bd8ff]/40 hover:text-[#c7eaff] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#9bd8ff]">
                          <Sparkles size={12} /> Soft skills <span className="text-white/30">↗</span>
                        </button>
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-[min(290px,85vw)] -translate-x-1/2 translate-y-2 border border-white/15 bg-[#0b0d18]/95 p-4 text-left opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                          <p className="mb-3 text-[9px] uppercase tracking-[.22em] text-[#9bd8ff]/75">How I work with people</p>
                          <div className="flex flex-wrap gap-2">
                            {["Project management", "Planning & coordination", "Public speaking", "Active listening", "Team leadership", "Communication", "Collaboration", "Presenting & pitching", "Community building"].map((item) => (
                              <span key={item} className="border border-white/10 px-2 py-1 text-[10px] text-white/70">{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {selected ? (
                      <motion.div
                        key={selected.name}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: reduced ? 0 : 0.35 }}
                        className="relative z-20 mx-auto -mt-1 max-w-2xl border-t border-white/15 pt-4 sm:-mt-2"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: path.color, boxShadow: `0 0 12px ${path.color}` }} />
                          <div className="flex-1">
                            <p className="text-sm text-white/90">{selected.name}</p>
                            <p className="mt-1 text-xs leading-6 text-white/50 sm:text-sm">{selected.description}</p>
                          </div>
                          <button type="button" onClick={() => setSelectedSkill(null)} aria-label="Close skill details" className="p-1 text-white/35 hover:text-white"><RotateCcw size={13} /></button>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="relative z-20 -mt-1 text-center text-[9px] uppercase tracking-[.2em] text-white/30 sm:-mt-2">Select a star to trace the skill</p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.16em] text-white/30"><Orbit size={13} /> {path.skills.length} connected stars</span>
                  <button type="button" onClick={returnToNebula} className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-white/55 transition-colors hover:text-white"><RotateCcw size={13} /> Return to the nebula</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
