"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowUpRight,
  ChevronRight, Clapperboard, Code2, ExternalLink, Headphones, Mail,
  Waves, X
} from "lucide-react";

type WorldId = "tech" | "music" | "film";
type Phase = "observatory" | "galaxy" | "archive";

const WORLDS: { id: WorldId; number: string; label: string; line: string; tone: string }[] = [
  { id: "tech", number: "01", label: "Technology", line: "Ideas made tangible.", tone: "#9fc8e8" },
  { id: "music", number: "02", label: "Music", line: "Things I couldn't leave unsaid.", tone: "#d7b6e8" },
  { id: "film", number: "03", label: "Film", line: "Stories that won't let go.", tone: "#e8c9a0" },
];

const TECH_PROJECTS = [
  {
    title: "Karma AI", tag: "FEATURED PROJECT", year: "VOICE · AI",
    line: "A real-time voice agent that keeps scam callers talking.",
    detail: "Karma AI is a working MVP for a conversational scam-baiting agent. It uses natural Hindi-English dialogue to keep callers engaged, and is being refined for more natural conversations and lower latency.",
    live: "https://karma-ai-xi.vercel.app/", code: "https://github.com/Rishi-Raj25/Karma-Ai",
  },
  {
    title: "KrishiLens", tag: "COMPUTER VISION", year: "AGRI · AI",
    line: "Recognising Indian cattle and buffalo breeds from an image.",
    detail: "An image-based breed recognition project built to make visual identification of Indian cattle and buffalo breeds more accessible.",
    live: "https://krishilens-wheat.vercel.app/", code: "https://github.com/Rishi-Raj25/Krishilens",
  },
  {
    title: "ReLoop", tag: "CIRCULAR ECONOMY", year: "E-WASTE · PLATFORM",
    line: "Connecting local scrap collectors with authorised recyclers.",
    detail: "A concept for bringing informal kabadiwalas into the formal recycling chain, with item lots, image-based listings, price guidance, and connections to verified buyers.",
  },
  {
    title: "Jeeva", tag: "CREATOR ECONOMY", year: "ARTISANS · MARKETPLACE",
    line: "Giving local artisans a clearer path from craft to customer.",
    detail: "An AI-assisted cataloguing and market-linkage concept for marginalized artisans, designed to help document handmade work and connect makers with buyers.",
  },
  {
    title: "Atlas", tag: "INFORMATION SYSTEMS", year: "CPSE · STANDARDS",
    line: "Making CPSE material-standardisation codes easier to navigate.",
    detail: "A structured approach to organising and standardising CPSE material codes so related materials are easier to identify, compare, and manage.",
  },
];

const MUSIC_PROJECTS = [
  {
    title: "Whenever You Go", tag: "FEATURED · ORIGINAL", year: "SONG IN PROGRESS",
    line: "The first page of a new musical chapter.",
    detail: "An original song taking shape around a raw, honest sound. This space will grow with the recording as it becomes ready to share.",
  },
  {
    title: "Petrichor", tag: "ORIGINAL", year: "SLOW · EMOTIONAL",
    line: "A quieter song for the feeling that stays after the rain.",
    detail: "A slow, emotional piece built around atmosphere and feeling. Still in progress; not presented as a released track.",
  },
  {
    title: "Ukulele sketches & acoustic covers", tag: "THE LISTENING NOTES", year: "ONGOING",
    line: "Small arrangements, familiar songs, and ideas caught before they disappear.",
    detail: "A home for ukulele sketches, acoustic covers, and informal musical experiments—kept deliberately close to their raw beginnings.",
  },
];

const FILM_IDEAS = [
  {
    title: "The Pyramid Dream", tag: "FOLK HORROR", line: "A dream that keeps borrowing details from the waking world.",
    detail: "A strange village, a field at the edge of the forest, and a rusted swing become pieces of a nightmare. The deeper the protagonist goes, the less certain it becomes whether they ever woke up.",
  },
  {
    title: "The Woman Who Killed My Mother", tag: "PSYCHOLOGICAL THRILLER", line: "A disappearance becomes unbearable when the person who returns knows too much.",
    detail: "After his mother vanishes, a young man is left alone with a woman who claims responsibility—and a truth he feels powerless to confront.",
  },
  {
    title: "Untitled / Story fragment", tag: "IN DEVELOPMENT", line: "Some stories are still only a scene, a question, or an image that refuses to leave.",
    detail: "This idea is still taking shape. The fragment is here as a marker for a story in progress, not a finished premise.",
  },
];

const STAR_POSITIONS = Array.from({ length: 74 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  top: (i * 67 + 7) % 100,
  size: i % 11 === 0 ? 2.5 : i % 4 === 0 ? 1.8 : 1,
  delay: (i % 9) * 0.23,
}));

function StarField({ active }: { active?: WorldId }) {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STAR_POSITIONS.map((star, i) => (
        <motion.i key={i} className="absolute block rounded-full bg-[#e7e5df]"
          style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size, boxShadow: star.size > 2 ? "0 0 10px rgba(230,230,230,.65)" : "0 0 5px rgba(230,230,230,.3)" }}
          animate={reduced ? undefined : { opacity: [0.25, star.size > 2 ? 0.95 : 0.62, 0.25], scale: [1, 1.22, 1] }}
          transition={reduced ? undefined : { duration: 3.5 + star.delay, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {active && <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse at 50% 50%, ${WORLDS.find(w => w.id === active)?.tone}16, transparent 60%)` }} />}
    </div>
  );
}

function TelescopeScene({ onEnter, reduced }: { onEnter: () => void; reduced: boolean | null }) {
  return (
    <motion.button type="button" onClick={onEnter} aria-label="Enter the telescope and explore projects"
      className="group relative mx-auto flex min-h-[440px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-sm border border-white/[0.08] bg-[#07090d] px-5 py-12 text-center sm:min-h-[520px] sm:py-16"
      whileHover={reduced ? undefined : { borderColor: "rgba(210,220,235,.25)" }}
      whileTap={reduced ? undefined : { scale: 0.995 }}>
      <StarField />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 64%, rgba(95,119,153,.16), transparent 42%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,.55))" }} />
      <div className="relative z-10 mb-8 flex items-center gap-3 text-[9px] uppercase tracking-[.32em] text-white/40 sm:mb-10">
        <span className="h-px w-7 bg-white/25" /> Observatory 01 <span className="h-px w-7 bg-white/25" />
      </div>
      <motion.div className="relative z-10 mb-8 flex h-48 w-full max-w-md items-center justify-center sm:mb-10 sm:h-56"
        animate={reduced ? undefined : { y: [0, -3, 0], rotate: [0, .25, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <svg viewBox="0 0 520 260" className="h-full w-full overflow-visible" role="img" aria-label="A telescope aimed toward a distant star">
          <defs>
            <linearGradient id="scopeMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4d9dc" stopOpacity=".9" /><stop offset="32%" stopColor="#66717c" /><stop offset="70%" stopColor="#242b35" /><stop offset="100%" stopColor="#a9b4bf" stopOpacity=".7" />
            </linearGradient>
            <linearGradient id="scopeGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b7e0ef" stopOpacity=".75" /><stop offset="48%" stopColor="#7890b8" stopOpacity=".5" /><stop offset="100%" stopColor="#141d2c" stopOpacity=".95" />
            </linearGradient>
            <filter id="scopeGlow"><feGaussianBlur stdDeviation="8" /></filter>
          </defs>
          <ellipse cx="245" cy="217" rx="128" ry="14" fill="#000" opacity=".55" />
          <path d="M247 135 L208 226 M247 135 L292 226 M247 135 L247 228" stroke="#6b7480" strokeWidth="7" strokeLinecap="round" />
          <path d="M190 225 L307 225" stroke="#555f6c" strokeWidth="5" strokeLinecap="round" />
          <g transform="rotate(-22 255 112)">
            <path d="M154 77 L357 77 L389 96 L389 127 L357 145 L154 145 Z" fill="url(#scopeMetal)" stroke="#c3cbd1" strokeOpacity=".4" />
            <path d="M173 84 L347 84 L347 138 L173 138 Z" fill="#101722" opacity=".9" />
            <path d="M175 87 L344 87 L344 135 L175 135 Z" fill="url(#scopeGlass)" opacity=".65" />
            <ellipse cx="156" cy="111" rx="18" ry="40" fill="#303b49" stroke="#bac4cd" strokeWidth="2" />
            <ellipse cx="153" cy="111" rx="11" ry="32" fill="url(#scopeGlass)" />
            <ellipse cx="153" cy="111" rx="5" ry="22" fill="#b4e4ff" opacity=".6" filter="url(#scopeGlow)" />
            <path d="M360 81 L385 96 L385 127 L360 141 Z" fill="#111720" stroke="#aeb9c5" strokeOpacity=".5" />
            <path d="M372 88 L396 100 L396 122 L372 134 Z" fill="#778594" stroke="#d5dbe0" strokeOpacity=".6" />
            <path d="M200 78 L200 145 M214 78 L214 145 M329 78 L329 145" stroke="#e3e7ea" strokeOpacity=".2" strokeWidth="3" />
            <path d="M247 145 L247 160" stroke="#c0c8d0" strokeWidth="10" />
          </g>
          <circle cx="422" cy="45" r="2.5" fill="#f4e9cf" /><circle cx="422" cy="45" r="13" fill="#f4e9cf" opacity=".1" />
          <path d="M405 45 H439 M422 28 V62" stroke="#f4e9cf" strokeOpacity=".45" strokeWidth=".7" />
        </svg>
      </motion.div>
      <h3 className="relative z-10 text-3xl font-light tracking-[-.04em] text-[#f0eee8] sm:text-5xl">The universe of things I make.</h3>
      <p className="relative z-10 mt-4 max-w-md text-sm leading-6 text-white/45">Three disciplines. Many ways of seeing. Look a little closer.</p>
      <span className="relative z-10 mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.24em] text-white/70 transition-colors group-hover:text-white">
        Look through the telescope <ArrowDownRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
      </span>
    </motion.button>
  );
}

function Constellation({ world, index, onSelect, reduced }: {
  world: typeof WORLDS[number]; index: number; onSelect: () => void; reduced: boolean | null;
}) {
  const coords = world.id === "tech"
    ? [[50, 12], [28, 31], [72, 32], [39, 55], [65, 67], [25, 78], [82, 82]]
    : world.id === "music"
      ? [[17, 45], [30, 28], [44, 55], [56, 24], [70, 49], [83, 34], [78, 73]]
      : [[23, 20], [50, 13], [76, 25], [32, 49], [61, 48], [46, 77], [78, 80]];
  return (
    <motion.button type="button" onClick={onSelect} aria-label={`Explore ${world.label} projects`}
      className="group relative min-h-[280px] overflow-hidden border-t border-white/[.14] px-4 py-7 text-left sm:min-h-[340px] sm:px-6"
      initial={reduced ? undefined : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : .55, delay: reduced ? 0 : index * .12 }}
      whileHover={reduced ? undefined : { backgroundColor: "rgba(255,255,255,.018)" }}
      style={{ ["--world-tone" as string]: world.tone }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55 transition-opacity duration-500 group-hover:opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {coords.slice(0, -1).map((point, i) => {
          const next = coords[i + 1];
          return <line key={i} x1={point[0]} y1={point[1]} x2={next[0]} y2={next[1]} stroke={world.tone} strokeOpacity=".3" strokeWidth=".24" strokeDasharray={world.id === "film" ? "1 1" : "none"} />;
        })}
        {world.id === "music" && <path d="M8 62 C20 24 29 85 41 50 S62 20 72 53 S88 78 94 36" fill="none" stroke={world.tone} strokeOpacity=".24" strokeWidth=".4" />}
        {world.id === "film" && <path d="M12 9 L88 9 L88 91 L12 91 Z" fill="none" stroke={world.tone} strokeOpacity=".13" strokeWidth=".35" />}
      </svg>
      {coords.map((point, i) => (
        <motion.i key={i} className="absolute block rounded-full"
          style={{ left: `${point[0]}%`, top: `${point[1]}%`, width: i === 0 ? 5 : 3, height: i === 0 ? 5 : 3, background: world.tone, boxShadow: `0 0 12px ${world.tone}88` }}
          animate={reduced ? undefined : { opacity: [.45, 1, .45], scale: [1, i === 0 ? 1.25 : 1.12, 1] }}
          transition={reduced ? undefined : { duration: 2.8 + i * .31, delay: i * .1, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      <span className="relative z-10 flex items-center justify-between text-[9px] uppercase tracking-[.25em] text-white/35">
        <span>Constellation {world.number}</span><ArrowUpRight size={15} className="text-white/35 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
      </span>
      <span className="relative z-10 mt-28 block text-2xl font-light tracking-[-.035em] text-[#f0eee8] sm:mt-36 sm:text-3xl">{world.label}</span>
      <span className="relative z-10 mt-2 block text-xs text-white/45 transition-colors duration-300 group-hover:text-white/75">{world.line}</span>
      <span className="relative z-10 mt-4 block h-px w-8 origin-left bg-[var(--world-tone)] transition-all duration-500 group-hover:w-16" />
    </motion.button>
  );
}

function ArchiveRow({ item, index, featured, onClick, reduced }: {
  item: { title: string; tag: string; year: string; line: string; detail: string; live?: string; code?: string };
  index: number; featured?: boolean; onClick: () => void; reduced: boolean | null;
}) {
  return (
    <motion.button type="button" onClick={onClick}
      className={`group relative grid w-full grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-white/[.12] py-5 text-left sm:grid-cols-[56px_1fr_170px_auto] sm:gap-5 sm:py-7 ${featured ? "border-t border-t-white/35" : ""}`}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : index * .06 }}>
      <span className={`font-mono text-[10px] ${featured ? "text-[#e8c9a0]" : "text-white/25"}`}>{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0">
        <span className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`text-[9px] uppercase tracking-[.19em] ${featured ? "text-[#e8c9a0]" : "text-white/35"}`}>{item.tag}</span>
          {featured && <span className="text-[8px] uppercase tracking-[.2em] text-[#e8c9a0]/70">✳ Highlighted</span>}
        </span>
        <span className="block text-lg font-light tracking-[-.025em] text-white/85 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-2xl">{item.title}</span>
        <span className="mt-1 block max-w-2xl text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">{item.line}</span>
      </span>
      <span className="hidden text-[9px] uppercase leading-5 tracking-[.13em] text-white/30 sm:block">{item.year}</span>
      <span className="flex h-8 w-8 items-center justify-center text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"><ArrowUpRight size={16} strokeWidth={1.2} /></span>
    </motion.button>
  );
}

export default function Projects() {
  const [phase, setPhase] = useState<Phase>("observatory");
  const [activeWorld, setActiveWorld] = useState<WorldId>("tech");
  const [selectedItem, setSelectedItem] = useState<{ title: string; tag: string; year: string; line: string; detail: string; live?: string; code?: string } | null>(null);
  const reduced = useReducedMotion();
  const world = WORLDS.find((item) => item.id === activeWorld) ?? WORLDS[0];
  const archiveItems = activeWorld === "tech" ? TECH_PROJECTS : activeWorld === "music" ? MUSIC_PROJECTS : FILM_IDEAS;

  useEffect(() => {
    if (phase === "observatory") return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = old; };
  }, [phase]);

  const enterWorld = (id: WorldId) => {
    setActiveWorld(id);
    setPhase("archive");
  };

  return (
    <section id="projects" className="relative px-5 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-14"
          initial={reduced ? undefined : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
          <div>
            <p className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[.28em] text-white/35"><span className="h-px w-7 bg-white/35" /> Projects / The observatory</p>
            <h2 className="text-4xl font-light leading-[.98] tracking-[-.055em] text-[#f0eee8] sm:text-6xl md:text-7xl">Look closer.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/45">A living archive of systems, songs, and stories. Start at the lens.</p>
        </motion.div>
        <AnimatePresence mode="wait">
          {phase === "observatory" && (
            <motion.div key="observatory" initial={reduced ? undefined : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : .96, filter: reduced ? "none" : "blur(5px)" }} transition={{ duration: reduced ? 0 : .55 }}>
              <TelescopeScene onEnter={() => setPhase("galaxy")} reduced={reduced} />
            </motion.div>
          )}
          {phase === "galaxy" && (
            <motion.div key="galaxy" className="relative min-h-[560px] overflow-hidden border border-white/[.08] bg-[#07090d] px-4 py-8 sm:px-8 sm:py-10"
              initial={reduced ? undefined : { opacity: 0, scale: .72, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: reduced ? 1 : 1.3, filter: reduced ? "none" : "blur(6px)" }} transition={{ duration: reduced ? 0 : .75, ease: [.2, .75, .2, 1] }}>
              <StarField />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(90,100,139,.13), transparent 53%)" }} />
              <div className="relative z-10 mb-8 flex flex-wrap items-start justify-between gap-4">
                <div><p className="mb-2 text-[9px] uppercase tracking-[.26em] text-white/35">Beyond the lens</p><h3 className="text-2xl font-light tracking-[-.04em] text-white/90 sm:text-4xl">Choose a constellation.</h3><p className="mt-2 text-xs text-white/40">Hover to find its signal. Select to travel there.</p></div>
                <button type="button" onClick={() => setPhase("observatory")} className="inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.18em] text-white/45 transition-colors hover:text-white"><ArrowDownLeft size={14} /> Back to telescope</button>
              </div>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
                {WORLDS.map((item, index) => <Constellation key={item.id} world={item} index={index} onSelect={() => enterWorld(item.id)} reduced={reduced} />)}
              </div>
              <p className="relative z-10 mt-5 text-[9px] uppercase tracking-[.18em] text-white/25">Three disciplines · one maker's universe</p>
            </motion.div>
          )}
          {phase === "archive" && (
            <motion.div key={`archive-${activeWorld}`} className="relative min-h-[560px] overflow-hidden border border-white/[.1] bg-[#08090d] px-5 py-6 sm:px-9 sm:py-8"
              initial={reduced ? undefined : { opacity: 0, scale: .82, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: reduced ? 1 : .86, filter: reduced ? "none" : "blur(5px)" }} transition={{ duration: reduced ? 0 : .65, ease: [.2, .75, .2, 1] }}>
              <StarField active={activeWorld} />
              <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 78% 8%, ${world.tone}12, transparent 42%)` }} />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[.14] pb-5">
                  <button type="button" onClick={() => setPhase("galaxy")} className="group inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.2em] text-white/50 transition-colors hover:text-white"><ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to constellations</button>
                  <span className="text-[9px] uppercase tracking-[.2em]" style={{ color: world.tone }}>World {world.number} / {world.label}</span>
                </div>
                <div className="grid gap-5 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:py-10">
                  <div><p className="mb-3 text-[9px] uppercase tracking-[.25em] text-white/35">Signal acquired</p><h3 className="text-4xl font-light tracking-[-.05em] text-[#f0eee8] sm:text-6xl">{world.label}</h3><p className="mt-3 text-sm text-white/45">{world.line}</p></div>
                  <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-white/30">{activeWorld === "tech" ? <Code2 size={15} /> : activeWorld === "music" ? <Headphones size={15} /> : <Clapperboard size={15} />}{archiveItems.length} entries logged</span>
                </div>
                <div className="relative">
                  {archiveItems.map((item, index) => <ArchiveRow key={item.title} item={item} index={index} featured={activeWorld === "tech" ? item.title === "Karma AI" : activeWorld === "music" ? item.title === "Whenever You Go" : false} onClick={() => setSelectedItem(item)} reduced={reduced} />)}
                </div>
                {activeWorld === "film" && <p className="mt-6 max-w-2xl text-xs leading-6 text-white/35">These are story fragments, not published films. The fuller versions stay private for now.</p>}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.12] pt-5">
                  <span className="text-[9px] uppercase tracking-[.18em] text-white/25">End of current archive</span>
                  <div className="flex gap-4">
                    {WORLDS.filter((item) => item.id !== activeWorld).map((item) => <button key={item.id} type="button" onClick={() => enterWorld(item.id)} className="text-[9px] uppercase tracking-[.13em] text-white/45 transition-colors hover:text-white">{item.label} <ChevronRight size={11} className="inline" /></button>)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="project-detail-title"
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#090a0e] p-6 sm:p-10"
              initial={reduced ? undefined : { opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} onClick={(event) => event.stopPropagation()}>
              <StarField active={activeWorld} />
              <button type="button" aria-label="Close project details" onClick={() => setSelectedItem(null)} className="absolute right-4 top-4 z-20 p-2 text-white/45 transition-colors hover:text-white"><X size={18} /></button>
              <div className="relative z-10">
                <p className="mb-4 text-[9px] uppercase tracking-[.24em]" style={{ color: world.tone }}>{selectedItem.tag}</p>
                <h3 id="project-detail-title" className="max-w-xl text-3xl font-light leading-tight tracking-[-.04em] text-white sm:text-5xl">{selectedItem.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{selectedItem.detail}</p>
                {activeWorld === "film" ? (
                  <div className="mt-10 border-t border-white/15 pt-6">
                    <p className="text-sm leading-7 text-white/65">Interested? I&apos;m not giving this idea away that easily.</p>
                    <p className="mt-2 text-sm leading-7 text-white/45">If you&apos;re genuinely curious about the story, let&apos;s talk.</p>
                    <a href="#contact" onClick={() => setSelectedItem(null)} className="mt-6 inline-flex items-center gap-3 border-b border-[#e8c9a0]/60 pb-2 text-[10px] uppercase tracking-[.2em] text-[#e8c9a0] transition-colors hover:text-white">Contact me <Mail size={14} /></a>
                  </div>
                ) : (
                  <div className="mt-10 flex flex-wrap gap-5 border-t border-white/15 pt-6">
                    {selectedItem.live && <a href={selectedItem.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/75 transition-colors hover:text-white">View live <ExternalLink size={13} /></a>}
                    {selectedItem.code && <a href={selectedItem.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/50 transition-colors hover:text-white">Source code <Code2 size={13} /></a>}
                    {activeWorld === "music" && <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[.16em] text-white/30"><Waves size={13} /> Work in progress</span>}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
