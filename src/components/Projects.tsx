"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowUpRight, ChevronRight,
  Clapperboard, Code2, ExternalLink, Headphones, Mail, Waves, X,
} from "lucide-react";

type WorldId = "tech" | "music" | "film";
type Phase = "observatory" | "looking" | "closing" | "galaxy" | "archive";
type ArchiveItem = {
  title: string;
  tag: string;
  meta: string;
  line: string;
  detail: string;
  live?: string;
  code?: string;
  featured?: boolean;
};

const WORLDS: { id: WorldId; number: string; label: string; line: string; tone: string }[] = [
  { id: "tech", number: "01", label: "Technology", line: "Ideas made tangible.", tone: "#a9c7dd" },
  { id: "music", number: "02", label: "Music", line: "Things I couldn't leave unsaid.", tone: "#d7b6e8" },
  { id: "film", number: "03", label: "Film", line: "Stories that won't let go.", tone: "#e8c9a0" },
];

const ARCHIVES: Record<WorldId, ArchiveItem[]> = {
  tech: [
    {
      title: "Karma AI", tag: "FEATURED PROJECT", meta: "VOICE · CONVERSATIONAL AI",
      line: "A real-time voice agent that keeps scam callers talking.",
      detail: "Karma AI is a working MVP for a conversational scam-baiting agent. It uses natural Hindi-English dialogue to keep callers engaged. The current focus is making conversations feel more natural while improving latency and the real-time pipeline.",
      live: "https://karma-ai-xi.vercel.app/", code: "https://github.com/Rishi-Raj25/Karma-Ai", featured: true,
    },
    {
      title: "KrishiLens", tag: "COMPUTER VISION", meta: "AGRICULTURE · AI",
      line: "Recognising Indian cattle and buffalo breeds from an image.",
      detail: "An image-based breed recognition project designed to make visual identification of Indian cattle and buffalo breeds more accessible.",
      live: "https://krishilens-wheat.vercel.app/", code: "https://github.com/Rishi-Raj25/Krishilens",
    },
    {
      title: "ReLoop", tag: "CIRCULAR ECONOMY", meta: "E-WASTE · PLATFORM",
      line: "Connecting local scrap collectors with authorised recyclers.",
      detail: "A concept for bringing informal kabadiwalas into the formal recycling chain, with item lots, image-based listings, price guidance, and connections to verified buyers.",
    },
    {
      title: "Jeeva", tag: "CREATOR ECONOMY", meta: "ARTISANS · MARKETPLACE",
      line: "Giving local artisans a clearer path from craft to customer.",
      detail: "An AI-assisted cataloguing and market-linkage concept for marginalized artisans, designed to help document handmade work and connect makers with buyers.",
    },
    {
      title: "Atlas", tag: "INFORMATION SYSTEMS", meta: "CPSE · STANDARDS",
      line: "Making CPSE material-standardisation codes easier to navigate.",
      detail: "A structured approach to organising and standardising CPSE material codes so related materials are easier to identify, compare, and manage.",
    },
  ],
  music: [
    {
      title: "Whenever You Go", tag: "FEATURED · ORIGINAL", meta: "SONG IN PROGRESS",
      line: "The first page of a new musical chapter.",
      detail: "An original song taking shape around a raw, honest sound. This space will grow with the recording as it becomes ready to share. It is a work in progress, not a released track.",
      featured: true,
    },
    {
      title: "Petrichor", tag: "ORIGINAL", meta: "SLOW · EMOTIONAL",
      line: "A quieter song for the feeling that stays after the rain.",
      detail: "A slow, emotional piece built around atmosphere and feeling. Still in progress; not presented as a released track.",
    },
    {
      title: "Ukulele sketches & acoustic covers", tag: "LISTENING NOTES", meta: "ONGOING",
      line: "Small arrangements, familiar songs, and ideas caught before they disappear.",
      detail: "A home for ukulele sketches, acoustic covers, and informal musical experiments—kept deliberately close to their raw beginnings.",
    },
  ],
  film: [
    {
      title: "The Pyramid Dream", tag: "FOLK HORROR", meta: "PRIVATE STORY",
      line: "A dream that keeps borrowing details from the waking world.",
      detail: "A strange village, a field at the edge of the forest, and a rusted swing become pieces of a nightmare. The deeper the protagonist goes, the less certain it becomes whether they ever woke up.",
    },
    {
      title: "The Woman Who Killed My Mother", tag: "PSYCHOLOGICAL THRILLER", meta: "PRIVATE STORY",
      line: "A disappearance becomes unbearable when the person who returns knows too much.",
      detail: "After his mother vanishes, a young man is left alone with a woman who claims responsibility—and a truth he feels powerless to confront.",
    },
    {
      title: "Untitled / Story fragment", tag: "IN DEVELOPMENT", meta: "EARLY NOTES",
      line: "Some stories are still only a scene, a question, or an image that refuses to leave.",
      detail: "This idea is still taking shape. The fragment is here as a marker for a story in progress, not a finished premise.",
    },
  ],
};

const STARS = Array.from({ length: 86 }, (_, i) => ({
  x: (i * 43 + 11) % 100,
  y: (i * 67 + 5) % 100,
  size: i % 13 === 0 ? 2.4 : i % 4 === 0 ? 1.6 : 1,
  delay: (i % 9) * 0.21,
}));

function StarField({ tone }: { tone?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((star, i) => (
        <motion.i key={i} className="absolute block rounded-full bg-[#e7e5df]"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, boxShadow: star.size > 2 ? "0 0 11px rgba(230,230,230,.7)" : "0 0 5px rgba(230,230,230,.35)" }}
          animate={reduced ? undefined : { opacity: [0.2, star.size > 2 ? 0.95 : 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={reduced ? undefined : { duration: 3.2 + star.delay, delay: star.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      {tone && <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse at 55% 48%, ${tone}18, transparent 62%)` }} />}
    </div>
  );
}

function TelescopeEntrance({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.button type="button" onClick={onEnter} aria-label="Look through the telescope and enter the project universe"
      className="group relative mx-auto flex min-h-[480px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden border border-white/[.1] bg-[#03050a] px-5 py-12 text-center sm:min-h-[600px] sm:py-16"
      whileHover={reduced ? undefined : { borderColor: "rgba(210,220,235,.3)" }}
      whileTap={reduced ? undefined : { scale: 0.996 }}>
      <StarField />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(60,95,150,.2), transparent 44%), linear-gradient(180deg, transparent 54%, rgba(0,0,0,.72))" }} />
      <div className="relative z-10 mb-7 flex items-center gap-3 text-[9px] uppercase tracking-[.32em] text-white/40 sm:mb-9">
        <span className="h-px w-7 bg-white/25" /> Observatory 01 <span className="h-px w-7 bg-white/25" />
      </div>
      <motion.div className="relative z-10 mb-7 flex aspect-square w-[min(68vw,340px)] items-center justify-center sm:mb-9 sm:w-[360px]"
        animate={reduced ? undefined : { rotate: [0, 1.5, 0], scale: [1, 1.012, 1] }}
        transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}>
        <div className="absolute inset-0 rounded-full border-[10px] border-[#242a36] shadow-[0_0_0_2px_#697384,0_0_0_8px_#111722,0_0_0_10px_#515a69,0_0_45px_rgba(97,139,205,.25)]" />
        <div className="absolute inset-[7%] rounded-full border-[3px] border-[#8b95a6]/70 bg-[conic-gradient(from_15deg,#101a2b_0deg,#53648c_30deg,#161c2b_55deg,#8a6aa9_78deg,#111b2b_112deg,#2b7594_150deg,#101522_195deg,#6a77a2_245deg,#1a2031_300deg,#101a2b_360deg)] shadow-[inset_0_0_35px_#02040a,0_0_24px_rgba(95,145,210,.25)]" />
        <div className="absolute inset-[14%] rounded-full border border-white/20 bg-[radial-gradient(ellipse_at_42%_48%,rgba(125,185,232,.22),transparent_38%),radial-gradient(ellipse_at_58%_45%,rgba(182,119,214,.2),transparent_45%),radial-gradient(circle_at_center,#050914_0%,#090f1c_48%,#02040a_74%)] shadow-[inset_0_0_35px_#000]" />
        <div className="absolute inset-[23%] rounded-full border border-white/10 bg-[radial-gradient(ellipse_at_35%_42%,rgba(74,158,207,.18),transparent_25%),radial-gradient(ellipse_at_66%_59%,rgba(173,120,204,.17),transparent_28%),radial-gradient(circle_at_center,#101a2a_0%,#050914_64%,#02040a_100%)]" />
        <div className="absolute inset-[31%] rounded-full border border-white/10 bg-[radial-gradient(ellipse_at_30%_45%,#b9d9ed_0%,rgba(77,126,183,.35)_8%,transparent_30%),radial-gradient(ellipse_at_68%_58%,rgba(200,151,220,.5),transparent_30%),radial-gradient(circle_at_center,#050914_0%,#02040a_78%)] shadow-[0_0_30px_rgba(95,157,219,.15)]" />
        <div className="absolute inset-[42%] rounded-full border border-white/20 bg-[#02040a] shadow-[0_0_25px_rgba(112,171,230,.25),inset_0_0_18px_#000]" />
        <div className="absolute inset-[47%] rounded-full bg-[radial-gradient(circle,#6d91b7_0%,#18243a_45%,#02040a_75%)]" />
        <span className="absolute left-[8%] top-[28%] h-3 w-3 rounded-full bg-[#9fd7ff] shadow-[0_0_18px_#9fd7ff]" />
        <span className="absolute right-[12%] top-[60%] h-2 w-2 rounded-full bg-[#d9b5ff] shadow-[0_0_15px_#d9b5ff]" />
        <span className="absolute right-[26%] top-[13%] h-1.5 w-1.5 rounded-full bg-[#f5dfbd] shadow-[0_0_12px_#f5dfbd]" />
        <span className="absolute bottom-[15%] left-[31%] h-1 w-1 rounded-full bg-white shadow-[0_0_9px_white]" />
      </motion.div>
      <h3 className="relative z-10 text-3xl font-light tracking-[-.045em] text-[#f0eee8] sm:text-5xl">View the galaxy of projects?</h3>
      <p className="relative z-10 mt-4 max-w-md text-sm leading-6 text-white/45">A closer look at the things I build, the music I make, and the stories I keep.</p>
      <span className="relative z-10 mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.24em] text-white/70 transition-colors group-hover:text-white">
        Enter the observatory <ArrowDownRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
      </span>
    </motion.button>
  );
}

function TelescopeDive({ direction, onComplete }: { direction: "in" | "out"; onComplete: () => void }) {
  const reduced = useReducedMotion();
  const entering = direction === "in";
  return (
    <motion.div
      key={direction === "in" ? "looking-in" : "looking-out"}
      className="relative flex min-h-[580px] items-center justify-center overflow-hidden border border-white/[.08] bg-[#010207] sm:min-h-[700px]"
      initial={{ opacity: entering ? 0 : 1 }}
      animate={{ opacity: entering ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <StarField />
      <motion.div
        className="absolute inset-0"
        initial={reduced ? { scale: 1, opacity: 1 } : entering ? { scale: 0.16, opacity: 0.35, filter: "blur(0px)" } : { scale: 7, opacity: 0.15, filter: "blur(12px)" }}
        animate={reduced ? { scale: 1, opacity: 1 } : entering
          ? { scale: [0.16, 0.48, 1.15, 2.7, 7], opacity: [0.35, 1, 1, 0.85, 0.12], filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(3px)", "blur(12px)"] }
          : { scale: [7, 2.7, 1.15, 0.48, 0.16], opacity: [0.12, 0.85, 1, 1, 0.35], filter: ["blur(12px)", "blur(3px)", "blur(0px)", "blur(0px)", "blur(0px)"] }}
        transition={{ duration: reduced ? 0 : 1.65, times: [0, 0.18, 0.48, 0.76, 1], ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onComplete}
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="absolute inset-[-45%] rounded-full border-[clamp(12px,4vw,42px)] border-[#202a3a] shadow-[0_0_0_3px_#718096,0_0_0_12px_#111722,0_0_0_15px_#4a5362,0_0_100px_rgba(83,142,213,.35)]" />
        <div className="absolute inset-[-36%] rounded-full border border-white/25 bg-[conic-gradient(from_20deg,#101a2b,#53648c,#161c2b,#8a6aa9,#111b2b,#2b7594,#101522,#6a77a2,#1a2031,#101a2b)] opacity-80" />
        <div className="absolute inset-[-25%] rounded-full border border-white/20 bg-[radial-gradient(ellipse_at_42%_48%,rgba(125,185,232,.35),transparent_38%),radial-gradient(ellipse_at_58%_45%,rgba(182,119,214,.3),transparent_45%),radial-gradient(circle_at_center,#050914_0%,#090f1c_48%,#02040a_74%)]" />
        <div className="absolute inset-[-10%] rounded-full border border-white/20 bg-[radial-gradient(ellipse_at_35%_42%,rgba(74,158,207,.25),transparent_25%),radial-gradient(ellipse_at_66%_59%,rgba(173,120,204,.25),transparent_28%),radial-gradient(circle_at_center,#101a2a_0%,#050914_64%,#02040a_100%)]" />
        <div className="absolute inset-[8%] rounded-full border border-white/20 bg-[radial-gradient(circle_at_center,#050914_0%,#02040a_78%)] shadow-[0_0_70px_rgba(95,157,219,.2)]" />
      </motion.div>
      {!reduced && (
        <motion.div className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: entering ? [0, 0, 0.82] : [0.82, 0, 0] }}
          transition={{ duration: 1.65, times: [0, 0.68, 1], ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle at center, #02040a 0%, rgba(2,4,10,.25) 42%, transparent 72%)" }} />
      )}
      <motion.p className="relative z-10 mt-[330px] text-[9px] uppercase tracking-[.32em] text-white/45 sm:mt-[390px]"
        initial={{ opacity: 0 }} animate={{ opacity: reduced ? 0 : [0, 0.55, 0] }}
        transition={{ duration: reduced ? 0 : 1.2, ease: "easeInOut" }}>
        {entering ? "Looking through the lens" : "Returning to the observatory"}
      </motion.p>
    </motion.div>
  );
}

function GalaxyWorld({ world, index, onSelect }: { world: (typeof WORLDS)[number]; index: number; onSelect: () => void }) {
  const reduced = useReducedMotion();
  const palettes: Record<WorldId, { core: string; haze: string; arm: string }> = {
    tech: { core: "#d6f4ff", haze: "#3688e8", arm: "#71d9f5" },
    music: { core: "#ffe3ff", haze: "#a34bdf", arm: "#e4a1ff" },
    film: { core: "#fff0c9", haze: "#df7e48", arm: "#ffc58b" },
  };
  const palette = palettes[world.id];
  const dust = Array.from({ length: 42 }, (_, i) => ({
    x: (i * 37 + 9 + index * 13) % 100,
    y: (i * 61 + 17 + index * 7) % 100,
    size: i % 11 === 0 ? 2.2 : i % 4 === 0 ? 1.5 : 0.8,
    delay: (i % 8) * 0.3,
  }));
  return (
    <motion.button type="button" onClick={onSelect} aria-label={`Explore ${world.label} galaxy`}
      className="group relative flex min-h-[340px] w-full flex-col items-center justify-center overflow-hidden text-center sm:min-h-[430px]"
      initial={reduced ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 48%, ${palette.haze}18, transparent 58%)` }} />
      {dust.map((star, i) => <motion.i key={i} className="absolute block rounded-full bg-white"
        style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, boxShadow: `0 0 7px ${palette.arm}99` }}
        animate={reduced ? undefined : { opacity: [0.12, 0.8, 0.12], scale: [0.8, 1.35, 0.8] }}
        transition={reduced ? undefined : { duration: 4 + star.delay, delay: star.delay, repeat: Infinity, ease: "easeInOut" }} />)}
      <motion.div className="relative mb-[-12px] aspect-square w-[min(72vw,330px)] sm:w-[min(28vw,360px)]"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { duration: world.id === "music" ? 110 : world.id === "film" ? 135 : 120, repeat: Infinity, ease: "linear" }}>
        <div className="absolute inset-[8%] rounded-full opacity-80 blur-2xl" style={{ background: `radial-gradient(ellipse, ${palette.haze}66, transparent 68%)` }} />
        <div className="absolute left-1/2 top-1/2 h-[20%] w-[86%] -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] rounded-[50%] opacity-80 blur-xl" style={{ background: `linear-gradient(90deg, transparent, ${palette.arm}66, ${palette.core}cc, ${palette.arm}66, transparent)` }} />
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id={`core-${world.id}`}><stop stopColor={palette.core} stopOpacity="1" /><stop offset=".16" stopColor={palette.arm} stopOpacity=".8" /><stop offset=".43" stopColor={palette.haze} stopOpacity=".28" /><stop offset="1" stopColor={palette.haze} stopOpacity="0" /></radialGradient>
            <linearGradient id={`arm-${world.id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={palette.core} stopOpacity=".05" /><stop offset=".45" stopColor={palette.arm} stopOpacity=".7" /><stop offset="1" stopColor={palette.haze} stopOpacity=".04" /></linearGradient>
            <filter id={`glow-${world.id}`}><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
          <ellipse cx="160" cy="160" rx="122" ry="42" transform="rotate(-24 160 160)" fill={palette.haze} opacity=".12" />
          <ellipse cx="160" cy="160" rx="100" ry="30" transform="rotate(-24 160 160)" fill="none" stroke={palette.arm} strokeOpacity=".3" strokeWidth="1.2" />
          <path d="M160 160 C212 111 263 151 235 190 C204 232 139 211 130 168 C120 112 190 73 233 113 C280 157 230 235 172 246 C98 260 50 190 84 125 C116 65 201 57 251 99" fill="none" stroke={`url(#arm-${world.id})`} strokeWidth="17" strokeLinecap="round" opacity=".56" filter={`url(#glow-${world.id})`} />
          <path d="M160 160 C212 111 263 151 235 190 C204 232 139 211 130 168 C120 112 190 73 233 113 C280 157 230 235 172 246 C98 260 50 190 84 125 C116 65 201 57 251 99" fill="none" stroke={`url(#arm-${world.id})`} strokeWidth="5" strokeLinecap="round" opacity=".72" />
          <path d="M160 160 C115 120 76 145 90 178 C106 219 167 219 190 177 C214 133 172 97 139 111 C98 129 105 180 135 194 C171 211 216 187 220 151" fill="none" stroke={palette.core} strokeOpacity=".36" strokeWidth="2" strokeLinecap="round" />
          <circle cx="160" cy="160" r="49" fill={`url(#core-${world.id})`} />
          <circle cx="160" cy="160" r="9" fill={palette.core} opacity=".9" filter={`url(#glow-${world.id})`} />
          {Array.from({ length: 70 }, (_, i) => {
            const angle = i * 2.399 + index * 0.8;
            const radius = 15 + ((i * 29) % 120);
            const x = 160 + Math.cos(angle) * radius;
            const y = 160 + Math.sin(angle) * radius * 0.55;
            return <circle key={i} cx={x} cy={y} r={i % 9 === 0 ? 1.4 : 0.65} fill={i % 3 === 0 ? palette.core : "#ffffff"} opacity={0.18 + (i % 6) * 0.1} />;
          })}
        </svg>
        <div className="absolute inset-[12%] rounded-full border border-white/[.08]" />
      </motion.div>
      <span className="relative z-10 mt-3 text-xl font-light tracking-[-.035em] text-white/90 transition-colors group-hover:text-white sm:text-2xl">{world.label}</span>
      <span className="relative z-10 mt-2 text-[9px] uppercase tracking-[.24em] text-white/45 group-hover:text-white/70">{world.line}</span>
      <span className="relative z-10 mt-4 h-px w-8 transition-all duration-700 group-hover:w-16" style={{ background: palette.arm }} />
    </motion.button>
  );
}

function Constellation({ world, index, onSelect }: { world: (typeof WORLDS)[number]; index: number; onSelect: () => void }) {
  const reduced = useReducedMotion();
  const points = world.id === "tech"
    ? [[50, 13], [28, 31], [72, 32], [39, 55], [65, 67], [25, 78], [82, 82]]
    : world.id === "music"
      ? [[17, 45], [30, 28], [44, 55], [56, 24], [70, 49], [83, 34], [78, 73]]
      : [[23, 20], [50, 13], [76, 25], [32, 49], [61, 48], [46, 77], [78, 80]];
  return (
    <motion.button type="button" onClick={onSelect} aria-label={`Explore ${world.label} projects`}
      className="group relative min-h-[290px] overflow-hidden border-t border-white/[.14] px-4 py-7 text-left sm:min-h-[340px] sm:px-6"
      initial={reduced ? undefined : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : .55, delay: reduced ? 0 : index * .12 }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55 transition-opacity duration-500 group-hover:opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {points.slice(0, -1).map((point, i) => <line key={i} x1={point[0]} y1={point[1]} x2={points[i + 1][0]} y2={points[i + 1][1]} stroke={world.tone} strokeOpacity=".32" strokeWidth=".24" strokeDasharray={world.id === "film" ? "1 1" : "none"} />)}
        {world.id === "music" && <path d="M8 62 C20 24 29 85 41 50 S62 20 72 53 S88 78 94 36" fill="none" stroke={world.tone} strokeOpacity=".24" strokeWidth=".4" />}
        {world.id === "film" && <path d="M12 9 L88 9 L88 91 L12 91 Z" fill="none" stroke={world.tone} strokeOpacity=".13" strokeWidth=".35" />}
      </svg>
      {points.map((point, i) => <motion.i key={i} className="absolute block rounded-full"
        style={{ left: `${point[0]}%`, top: `${point[1]}%`, width: i === 0 ? 5 : 3, height: i === 0 ? 5 : 3, background: world.tone, boxShadow: `0 0 12px ${world.tone}88` }}
        animate={reduced ? undefined : { opacity: [.4, 1, .4], scale: [1, i === 0 ? 1.25 : 1.12, 1] }}
        transition={reduced ? undefined : { duration: 2.8 + i * .31, delay: i * .1, repeat: Infinity, ease: "easeInOut" }} />)}
      <span className="relative z-10 flex items-center justify-between text-[9px] uppercase tracking-[.25em] text-white/35">
        <span>Constellation {world.number}</span><ArrowUpRight size={15} className="text-white/35 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
      </span>
      <span className="relative z-10 mt-32 block text-2xl font-light tracking-[-.035em] text-[#f0eee8] sm:mt-36 sm:text-3xl">{world.label}</span>
      <span className="relative z-10 mt-2 block text-xs text-white/45 transition-colors duration-300 group-hover:text-white/75">{world.line}</span>
      <span className="relative z-10 mt-4 block h-px w-8 origin-left transition-all duration-500 group-hover:w-16" style={{ background: world.tone }} />
    </motion.button>
  );
}

function ArchiveRow({ item, index, onClick }: { item: ArchiveItem; index: number; onClick: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.button type="button" onClick={onClick}
      className={`group relative grid w-full grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-white/[.12] py-5 text-left sm:grid-cols-[56px_1fr_170px_auto] sm:gap-5 sm:py-7 ${item.featured ? "border-t border-t-white/35" : ""}`}
      initial={reduced ? undefined : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : index * .06 }}>
      <span className={`font-mono text-[10px] ${item.featured ? "text-[#e8c9a0]" : "text-white/25"}`}>{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0">
        <span className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`text-[9px] uppercase tracking-[.19em] ${item.featured ? "text-[#e8c9a0]" : "text-white/35"}`}>{item.tag}</span>
          {item.featured && <span className="text-[8px] uppercase tracking-[.2em] text-[#e8c9a0]/70">✳ Highlighted</span>}
        </span>
        <span className="block text-lg font-light tracking-[-.025em] text-white/85 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-2xl">{item.title}</span>
        <span className="mt-1 block max-w-2xl text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">{item.line}</span>
      </span>
      <span className="hidden text-[9px] uppercase leading-5 tracking-[.13em] text-white/30 sm:block">{item.meta}</span>
      <span className="flex h-8 w-8 items-center justify-center text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"><ArrowUpRight size={16} strokeWidth={1.2} /></span>
    </motion.button>
  );
}

export default function Projects() {
  const [phase, setPhase] = useState<Phase>("observatory");
  const [activeWorld, setActiveWorld] = useState<WorldId>("tech");
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const reduced = useReducedMotion();
  const world = WORLDS.find((item) => item.id === activeWorld) ?? WORLDS[0];
  const items = ARCHIVES[activeWorld];

  useEffect(() => {
    if (!selectedItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem]);

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
            <motion.div key="observatory" initial={reduced ? undefined : { opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: reduced ? 1 : .96, filter: reduced ? "none" : "blur(5px)" }}
              transition={{ duration: reduced ? 0 : .5 }}>
              <TelescopeEntrance onEnter={() => setPhase("looking")} />
            </motion.div>
          )}
          {phase === "looking" && <TelescopeDive direction="in" onComplete={() => setPhase("galaxy")} />}\n          {phase === "closing" && <TelescopeDive direction="out" onComplete={() => setPhase("observatory")} />}\n          {phase === "galaxy" && (
            <motion.div key="galaxy" className="relative min-h-[580px] overflow-hidden border border-white/[.08] bg-[#02040a] px-4 py-8 sm:min-h-[700px] sm:px-8 sm:py-10"
              initial={reduced ? undefined : { opacity: 0, scale: .72, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: reduced ? 1 : 1.18, filter: reduced ? "none" : "blur(8px)" }}
              transition={{ duration: reduced ? 0 : .9, ease: [.16, .8, .2, 1] }}>
              <StarField />
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 48%, rgba(40,90,145,.22), transparent 55%), radial-gradient(ellipse at 72% 44%, rgba(141,75,165,.12), transparent 40%)" }} />
              <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-4">
                <div><p className="mb-2 text-[9px] uppercase tracking-[.26em] text-white/35">Optical field · 001</p><h3 className="text-2xl font-light tracking-[-.04em] text-white/90 sm:text-4xl">The universe of things I make.</h3></div>
                <button type="button" onClick={() => setPhase("closing")} className="inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.18em] text-white/45 transition-colors hover:text-white"><ArrowLeft size={14} /> Back to telescope</button>
              </div>
              <div className="relative z-10 grid grid-cols-1 items-center sm:grid-cols-3 sm:gap-2">
                {WORLDS.map((item, index) => (
                  <GalaxyWorld key={item.id} world={item} index={index} onSelect={() => enterWorld(item.id)} />
                ))}
              </div>
              <p className="relative z-10 mt-2 text-center text-[9px] uppercase tracking-[.18em] text-white/25">Three disciplines · one maker's universe</p>
            </motion.div>
          )}
          {phase === "archive" && (
            <motion.div key={`archive-${activeWorld}`} className="relative min-h-[560px] overflow-hidden border border-white/[.1] bg-[#08090d] px-5 py-6 sm:px-9 sm:py-8"
              initial={reduced ? undefined : { opacity: 0, scale: .84, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: reduced ? 1 : .9, filter: reduced ? "none" : "blur(5px)" }}
              transition={{ duration: reduced ? 0 : .6, ease: [.2, .75, .2, 1] }}>
              <StarField tone={world.tone} />
              <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at 78% 8%, ${world.tone}12, transparent 42%)` }} />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[.14] pb-5">
                  <button type="button" onClick={() => setPhase("galaxy")} className="group inline-flex items-center gap-2 py-2 text-[9px] uppercase tracking-[.2em] text-white/50 transition-colors hover:text-white"><ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to constellations</button>
                  <span className="text-[9px] uppercase tracking-[.2em]" style={{ color: world.tone }}>World {world.number} / {world.label}</span>
                </div>
                <div className="grid gap-5 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:py-10">
                  <div><p className="mb-3 text-[9px] uppercase tracking-[.25em] text-white/35">Signal acquired</p><h3 className="text-4xl font-light tracking-[-.05em] text-[#f0eee8] sm:text-6xl">{world.label}</h3><p className="mt-3 text-sm text-white/45">{world.line}</p></div>
                  <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-white/30">{activeWorld === "tech" ? <Code2 size={15} /> : activeWorld === "music" ? <Headphones size={15} /> : <Clapperboard size={15} />}{items.length} entries logged</span>
                </div>
                <div className="relative">
                  {items.map((item, index) => <ArchiveRow key={item.title} item={item} index={index} onClick={() => setSelectedItem(item)} />)}
                </div>
                {activeWorld === "film" && <p className="mt-6 max-w-2xl text-xs leading-6 text-white/35">These are private story fragments, not published films. The fuller versions stay private for now.</p>}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.12] pt-5">
                  <span className="text-[9px] uppercase tracking-[.18em] text-white/25">End of current archive</span>
                  <div className="flex flex-wrap gap-4">
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="project-detail-title"
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#090a0e] p-6 sm:p-10"
              initial={reduced ? undefined : { opacity: 0, y: 24, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}
              onClick={(event) => event.stopPropagation()}>
              <StarField tone={world.tone} />
              <button type="button" aria-label="Close project details" onClick={() => setSelectedItem(null)} className="absolute right-4 top-4 z-20 p-2 text-white/45 transition-colors hover:text-white"><X size={18} /></button>
              <div className="relative z-10">
                <p className="mb-4 text-[9px] uppercase tracking-[.24em]" style={{ color: world.tone }}>{selectedItem.tag}</p>
                <h3 id="project-detail-title" className="max-w-xl text-3xl font-light leading-tight tracking-[-.04em] text-white sm:text-5xl">{selectedItem.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/65">{activeWorld === "film" ? "I'm not gonna give you my idea this easily." : selectedItem.detail}</p>
                {activeWorld === "film" ? (
                  <div className="mt-10 border-t border-white/15 pt-6">
                    <p className="text-sm leading-7 text-white/65">If you're genuinely curious about the story, let's talk.</p>
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
