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
    ],  },
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
    ],  },
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
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06, rotateY: -82, z: -120, filter: "blur(8px)" }}
                transition={{ duration: reduced ? 0 : 1.15, ease: [0.16, 0.8, 0.2, 1] }}
                className="relative min-h-[560px] overflow-hidden sm:min-h-[650px]"
              >
                <NebulaParticles />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[45%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[55px] sm:h-[520px] sm:w-[520px]"
                  initial={reduced ? false : { scale: 0.08, opacity: 0 }}
                  whileInView={reduced ? undefined : { scale: [0.08, 1.28, 1.08], opacity: [0, 0.95, 0.62] }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduced ? 0 : 2.3, times: [0, 0.56, 1], ease: [0.12, 0.75, 0.2, 1] }}
                  style={{ background: "radial-gradient(ellipse at 48% 47%, rgba(242,232,255,.9) 0%, rgba(155,179,255,.55) 8%, rgba(115,95,207,.42) 22%, rgba(67,123,201,.24) 43%, rgba(143,82,177,.15) 60%, transparent 75%)" }}
                />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[45%] h-[270px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[32px] sm:h-[350px] sm:w-[680px]"
                  initial={reduced ? false : { scale: 0.12, rotate: -20, opacity: 0 }}
                  whileInView={reduced ? undefined : { scale: [0.12, 1.18, 1], rotate: [-20, 12, 0], opacity: [0, 0.85, 0.52] }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduced ? 0 : 2.6, delay: 0.12, times: [0, 0.62, 1], ease: [0.12, 0.75, 0.2, 1] }}
                  style={{ background: "radial-gradient(ellipse, rgba(112,174,237,.52), rgba(157,94,207,.24) 42%, rgba(216,174,230,.12) 58%, transparent 73%)" }}
                />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[45%] h-[180px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[22px] sm:h-[220px] sm:w-[850px]"
                  initial={reduced ? false : { scale: 0.05, rotate: 20, opacity: 0 }}
                  whileInView={reduced ? undefined : { scale: [0.05, 1.1, 1], rotate: [20, -8, 0], opacity: [0, 0.56, 0.32] }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduced ? 0 : 2.8, delay: 0.18, times: [0, 0.6, 1], ease: [0.12, 0.75, 0.2, 1] }}
                  style={{ background: "linear-gradient(90deg, transparent, rgba(120,184,239,.2), rgba(224,184,255,.35), rgba(126,155,228,.24), transparent)" }}
                />

                <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-end pb-10 text-center sm:min-h-[650px] sm:pb-12">
                  <motion.div
                    initial={reduced ? undefined : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: reduced ? 0 : 0.8, delay: 0.35 }}
                    className="mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[.3em] text-white/45"
                  >
                    <Sparkles size={12} /> Choose your trajectory
                  </motion.div>
                  <h3 className="max-w-2xl text-2xl font-light tracking-[-.04em] text-white/90 sm:text-4xl">Two ways to make a universe.</h3>
                  <p className="mt-3 max-w-md text-xs leading-6 text-white/45 sm:text-sm">A little engineering. A little imagination. A lot of curiosity.</p>
                  <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:gap-8 sm:px-0">
                    <motion.button
                      type="button"
                      onClick={() => choosePath("build")}
                      whileHover={reduced ? undefined : { y: -5, scale: 1.025 }}
                      whileTap={reduced ? undefined : { scale: 0.985 }}
                      className="group relative overflow-hidden py-4 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#9bd8ff]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#6abaff]/[.08] via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      <span className="relative flex items-center justify-between gap-3 border-b border-[#9bd8ff]/25 pb-3">
                        <span className="text-[9px] uppercase tracking-[.22em] text-[#9bd8ff]/70">Field 01</span><ArrowUpRight size={15} className="text-[#9bd8ff]/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </span>
                      <span className="relative mt-4 block text-xl font-light text-white/90 sm:text-2xl">Build & Engineer</span>
                      <span className="relative mt-2 block text-xs leading-5 text-white/45">Code, systems, AI, and prototypes.</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => choosePath("create")}
                      whileHover={reduced ? undefined : { y: -5, scale: 1.025 }}
                      whileTap={reduced ? undefined : { scale: 0.985 }}
                      className="group relative overflow-hidden py-4 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#e2b9ff]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#c48bff]/[.08] via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      <span className="relative flex items-center justify-between gap-3 border-b border-[#e2b9ff]/25 pb-3">
                        <span className="text-[9px] uppercase tracking-[.22em] text-[#e2b9ff]/70">Field 02</span><ArrowUpRight size={15} className="text-[#e2b9ff]/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </span>
                      <span className="relative mt-4 block text-xl font-light text-white/90 sm:text-2xl">Create & Tell Stories</span>
                      <span className="relative mt-2 block text-xs leading-5 text-white/45">Film, music, words, and ideas.</span>
                    </motion.button>
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
