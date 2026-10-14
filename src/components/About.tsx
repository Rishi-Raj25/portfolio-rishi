"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Compass, Orbit, Sparkles } from "lucide-react";

type WorldId = "tech" | "music" | "film" | "nontech";

type Star = {
  id: string;
  name: string;
  kind: string;
  description: string;
  status: string;
  link?: string;
};

type World = {
  id: WorldId;
  name: string;
  short: string;
  description: string;
  color: string;
  x: number;
  y: number;
  radius: number;
  stars: Star[];
};

const worlds: World[] = [
  {
    id: "tech",
    name: "Tech",
    short: "Ideas made tangible",
    description: "I like turning curious questions into things people can actually use—from real-time voice systems to tools built around everyday problems.",
    color: "#b9c8a9",
    x: 220,
    y: 210,
    radius: 26,
    stars: [
      { id: "karma", name: "Karma AI", kind: "Voice AI", description: "A real-time conversational agent designed to keep scam callers talking through natural, AI-driven voice interactions.", status: "Built · Hackathon project", link: "https://github.com/Rishi-Raj25" },
      { id: "krishilens", name: "KrishiLens", kind: "Applied AI", description: "An image-based cattle and buffalo breed recognition concept built to make Indian livestock identification more accessible.", status: "Built · Project", link: "https://github.com/Rishi-Raj25/Krishilens" },
      { id: "reloop", name: "ReLoop", kind: "Circular technology", description: "A concept for connecting informal scrap collectors with authorized recycling partners through smarter cataloguing and discovery.", status: "Exploring · Concept" },
      { id: "jiva", name: "Jiva", kind: "Digital craft", description: "A concept for helping marginalized artisans present their work and reach new markets with AI-assisted cataloguing.", status: "Exploring · Concept" },
    ],
  },
  {
    id: "music",
    name: "Music",
    short: "Feelings finding a sound",
    description: "Songs are where I get to be honest without explaining everything. I'm learning to write, record, and release music that feels like me.",
    color: "#c7b6e6",
    x: 520,
    y: 105,
    radius: 22,
    stars: [
      { id: "whenever", name: "Whenever You Go", kind: "Original song", description: "A song intended to introduce this chapter of my musical identity: raw, personal, and honest rather than polished into someone else's sound.", status: "In progress" },
      { id: "ukulele", name: "Ukulele sketches", kind: "Songwriting", description: "Small melodies and unfinished ideas built around ukulele, voice, and the feeling a simple recording can hold.", status: "Ongoing practice" },
      { id: "new-songs", name: "Songs still forming", kind: "Future releases", description: "A growing collection of ideas that may become acoustic, alternative, pop-punk, or something that doesn't fit a single genre.", status: "Future ideas" },
    ],
  },
  {
    id: "film",
    name: "Filmmaking",
    short: "Stories made visible",
    description: "I keep coming back to storytelling: the framing, the silence, the little details that make a feeling stay with you after the screen goes dark.",
    color: "#e0bca4",
    x: 650,
    y: 210,
    radius: 24,
    stars: [
      { id: "jharkhand-film", name: "Jharkhand Film Festival", kind: "Short film", description: "A short film made for the 2026 Jharkhand Film Festival. It wasn't selected, but making it brought me closer to the kind of storyteller I want to become.", status: "Completed · Submission" },
      { id: "next-film", name: "The next frame", kind: "Future film", description: "More short films, more experiments, and more chances to tell a story with the tools and people I have around me.", status: "On the horizon" },
    ],
  },
  {
    id: "nontech",
    name: "Non-tech",
    short: "People, ideas, momentum",
    description: "Not everything meaningful happens in code. I enjoy bringing people together, organizing experiences, communicating ideas, and learning by doing.",
    color: "#a9c9dc",
    x: 520,
    y: 390,
    radius: 20,
    stars: [
      { id: "ambassador", name: "Gemini Student Ambassador", kind: "Community", description: "Helping bring AI tools and hands-on experiences into student spaces through events, product exploration, and community activities.", status: "Ongoing · 2026" },
      { id: "hackathons", name: "Hackathon rooms", kind: "Collaboration", description: "Building with a team under a deadline—learning how to share ideas, make trade-offs, and turn a rough concept into a working demo.", status: "Experience" },
      { id: "campus-events", name: "Campus experiences", kind: "Events & community", description: "Music nights, student events, and creative collaborations that turn a plan into something people can actually experience together.", status: "Ongoing exploration" },
    ],
  },
];

const starPositions = [
  { x: 540, y: 90 },
  { x: 690, y: 132 },
  { x: 830, y: 82 },
  { x: 620, y: 238 },
  { x: 785, y: 280 },
  { x: 910, y: 190 },
];

function StarField({ reduced }: { reduced: boolean }) {
  const stars = Array.from({ length: 42 }, (_, i) => ({
    x: (i * 173 + 43) % 980 + 10,
    y: (i * 97 + 23) % 410 + 18,
    r: i % 7 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
    delay: (i % 9) * 0.22,
  }));

  return (
    <g aria-hidden="true">
      {stars.map((star, i) => (
        <motion.circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="#d9dfed"
          initial={{ opacity: 0.2 }}
          animate={reduced ? undefined : { opacity: [0.15, 0.75, 0.25] }}
          transition={reduced ? undefined : { duration: 3 + star.delay, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

export default function About() {
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId | null>(null);
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [hoveredWorldId, setHoveredWorldId] = useState<WorldId | null>(null);
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const selectedWorld = worlds.find((world) => world.id === selectedWorldId) ?? null;
  const selectedStar = selectedWorld?.stars.find((star) => star.id === selectedStarId) ?? null;

  const chooseWorld = (id: WorldId) => {
    setSelectedWorldId(id);
    setSelectedStarId(null);
    setHoveredStarId(null);
  };

  const returnToUniverse = () => {
    setSelectedWorldId(null);
    setSelectedStarId(null);
    setHoveredWorldId(null);
    setHoveredStarId(null);
  };

  const sceneWorlds = selectedWorld ? [selectedWorld] : worlds;

  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 text-[#f4f1eb] sm:px-6 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[#9c9fca]/[0.035] blur-[100px]" />
        <div className="absolute bottom-[8%] right-[4%] h-80 w-80 rounded-full bg-[#8ba9a0]/[0.04] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(rgba(210,220,245,.38) .55px, transparent .55px)", backgroundSize: "43px 43px" }} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/40 sm:text-xs">
              <span className="h-px w-8 bg-[#b9c8a9]/70" />
              02 — A universe of my own
            </p>
            <h2 className="max-w-3xl text-[clamp(2.8rem,7vw,6.4rem)] font-medium leading-[0.86] tracking-[-0.075em]">
              More than one <span className="text-white/35">world.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-base">
            I'm a BCA student, a maker, and a storyteller in progress. Pick a world and see what lives there.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-y border-white/[0.08] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
              <Orbit size={13} strokeWidth={1.5} />
              <span>{selectedWorld ? `World / ${selectedWorld.name}` : "Personal cosmos / 001"}</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/30 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b9c8a9]" />
              <span>{selectedWorld ? "Constellation view" : "Universe view"}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-4 z-20 max-w-[145px] sm:left-6 sm:top-6 sm:max-w-[210px]">
              <AnimatePresence mode="wait">
                <motion.div key={selectedWorld?.id ?? "universe"} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: reduced ? 0 : 0.25 }}>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 sm:text-[9px]">{selectedWorld ? "You entered" : "Choose your orbit"}</p>
                  <p className="mt-1 text-sm text-white/80 sm:text-base">{selectedWorld ? selectedWorld.name : "Four worlds, one person."}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <svg viewBox="0 0 1000 430" role="group" aria-label="Interactive map of four personal worlds and their constellation stars" className="block h-auto min-h-[250px] w-full sm:min-h-[320px] lg:min-h-[390px]">
              <defs>
                <radialGradient id="cosmicCore">
                  <stop offset="0%" stopColor="#fff7df" stopOpacity="1" />
                  <stop offset="18%" stopColor="#f2d8a0" stopOpacity=".92" />
                  <stop offset="42%" stopColor="#c4a6e8" stopOpacity=".34" />
                  <stop offset="100%" stopColor="#a7b5e7" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="planet-tech" cx="30%" cy="24%" r="78%">
                  <stop offset="0%" stopColor="#dcebd0" />
                  <stop offset="34%" stopColor="#819a77" />
                  <stop offset="72%" stopColor="#34483b" />
                  <stop offset="100%" stopColor="#111b19" />
                </radialGradient>
                <radialGradient id="planet-music" cx="30%" cy="24%" r="78%">
                  <stop offset="0%" stopColor="#f1e5ff" />
                  <stop offset="34%" stopColor="#a996c9" />
                  <stop offset="72%" stopColor="#514461" />
                  <stop offset="100%" stopColor="#17131f" />
                </radialGradient>
                <radialGradient id="planet-film" cx="30%" cy="24%" r="78%">
                  <stop offset="0%" stopColor="#ffe7d5" />
                  <stop offset="34%" stopColor="#c99979" />
                  <stop offset="72%" stopColor="#624638" />
                  <stop offset="100%" stopColor="#201510" />
                </radialGradient>
                <radialGradient id="planet-nontech" cx="30%" cy="24%" r="78%">
                  <stop offset="0%" stopColor="#dff4ff" />
                  <stop offset="34%" stopColor="#83b4ca" />
                  <stop offset="72%" stopColor="#355969" />
                  <stop offset="100%" stopColor="#111b24" />
                </radialGradient>
                <radialGradient id="planet-shadow" cx="28%" cy="24%" r="82%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="62%" stopColor="#000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000" stopOpacity=".72" />
                </radialGradient>
                <radialGradient id="planet-atmosphere">
                  <stop offset="65%" stopColor="#d9e4f2" stopOpacity="0" />
                  <stop offset="100%" stopColor="#d9e4f2" stopOpacity=".18" />
                </radialGradient>
                <filter id="planetTexture" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="8" />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer><feFuncA type="table" tableValues="0 .12" /></feComponentTransfer>
                </filter>
                <filter id="starGlow" x="-200%" y="-200%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <StarField reduced={!!reduced} />

              <AnimatePresence mode="wait">
                {!selectedWorld && (
                  <motion.g key="universe-orbits" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
                    {[105, 132, 180, 300].map((radius, i) => (
                      <g key={radius}>
                        <circle cx="520" cy="210" r={radius} fill="none" stroke={["#c7b6e6", "#e0bca4", "#a9c9dc", "#b9c8a9"][i]} strokeOpacity={i === 3 ? ".1" : ".14"} strokeWidth=".8" strokeDasharray={i % 2 ? "1 7" : "2 9"} />
                        <circle cx="520" cy={210 - radius} r="1.6" fill="#dfe5f4" opacity=".45" />
                      </g>
                    ))}
                    <circle cx="520" cy="210" r="74" fill="url(#cosmicCore)" opacity=".26" />
                    <motion.circle cx="520" cy="210" r="17" fill="#f7e8c4" opacity=".85" animate={reduced ? undefined : { opacity: [.72, 1, .78], r: [15, 18, 15] }} transition={reduced ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
                    <circle cx="520" cy="210" r="5" fill="#fff8e7" opacity=".95" />
                    <text x="520" y="240" fill="#e8e2d6" opacity=".58" fontSize="9" letterSpacing="3" textAnchor="middle">YOU · THE CENTRE</text>
                  </motion.g>
                )}

                {selectedWorld && (
                  <motion.g key={`constellation-${selectedWorld.id}`} initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 85, damping: 20, mass: 0.7 }} style={{ transformOrigin: "500px 210px" }}>
                    <motion.ellipse cx="245" cy="212" rx="100" ry="120" fill="none" stroke={selectedWorld.color} strokeOpacity=".28" strokeWidth="1" animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 100, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "245px 212px" }} />
                    <circle cx="245" cy="212" r="74" fill={selectedWorld.color} opacity=".045" />
                    <circle cx="245" cy="212" r="49" fill={selectedWorld.color} opacity=".06" />
                    {selectedWorld.stars.map((star, i) => {
                      const pos = starPositions[i % starPositions.length];
                      return <line key={star.id} x1="245" y1="212" x2={pos.x} y2={pos.y} stroke={selectedWorld.color} strokeOpacity={selectedStarId === star.id ? ".7" : ".22"} strokeWidth={selectedStarId === star.id ? 1.5 : 1} strokeDasharray={selectedStarId === star.id ? "0" : "3 7"} />;
                    })}
                    {selectedWorld.stars.length > 2 && <path d={selectedWorld.stars.slice(0, 3).map((_, i) => `${i === 0 ? "M" : "L"} ${starPositions[i].x} ${starPositions[i].y}`).join(" ") + " Z"} fill="none" stroke={selectedWorld.color} strokeOpacity=".24" strokeWidth="1" />}
                  </motion.g>
                )}
              </AnimatePresence>

              {sceneWorlds.map((world, index) => {
                const isSelected = selectedWorld?.id === world.id;
                const isHovered = hoveredWorldId === world.id;
                const planetR = world.radius;
                const orbit = [
                  { rx: 170, ry: 92, phase: Math.PI, speed: 0.00015 },
                  { rx: 105, ry: 145, phase: -Math.PI / 2, speed: 0.00021 },
                  { rx: 245, ry: 112, phase: 0, speed: 0.00017 },
                  { rx: 150, ry: 178, phase: Math.PI / 2, speed: 0.00012 },
                ][index];
                const isUniverse = !selectedWorld;
                return (
                  <motion.g
                    key={world.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore ${world.name}: ${world.short}`}
                    onClick={() => chooseWorld(world.id)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); chooseWorld(world.id); } }}
                    onMouseEnter={() => setHoveredWorldId(world.id)}
                    onMouseLeave={() => setHoveredWorldId(null)}
                    onFocus={() => setHoveredWorldId(world.id)}
                    onBlur={() => setHoveredWorldId(null)}
                    className="cursor-pointer outline-none"
                    initial={false}
                    animate={isSelected
                      ? { x: 245 - world.x, y: 212 - world.y, scale: 2.7, opacity: 1 }
                      : isUniverse
                        ? { x: 0, y: 0, scale: 1, opacity: 1 }
                        : { x: 0, y: 0, scale: 1, opacity: 0 }}
                    transition={reduced
                      ? { duration: 0 }
                      : isSelected
                        ? { type: "spring", stiffness: 190, damping: 25, mass: 0.55 }
                        : { duration: 0.24, ease: "easeOut" }}
                    style={{ transformOrigin: `${world.x}px ${world.y}px`, pointerEvents: selectedWorld && !isSelected ? "none" : "auto" }}
                  >
                    <motion.g
                      animate={reduced || !isUniverse
                        ? { x: 0, y: 0 }
                        : { x: [orbit.rx * Math.cos(orbit.phase), orbit.rx * Math.cos(orbit.phase + Math.PI / 2), orbit.rx * Math.cos(orbit.phase + Math.PI), orbit.rx * Math.cos(orbit.phase + Math.PI * 1.5), orbit.rx * Math.cos(orbit.phase + Math.PI * 2)],
                            y: [orbit.ry * Math.sin(orbit.phase), orbit.ry * Math.sin(orbit.phase + Math.PI / 2), orbit.ry * Math.sin(orbit.phase + Math.PI), orbit.ry * Math.sin(orbit.phase + Math.PI * 1.5), orbit.ry * Math.sin(orbit.phase + Math.PI * 2)] }}
                      transition={reduced || !isUniverse
                        ? { duration: 0 }
                        : { duration: [34, 25, 29, 39][index], repeat: Infinity, ease: "linear" }}
                    >
                      <motion.g
                        animate={reduced ? undefined : { rotate: 360 }}
                        transition={reduced ? undefined : { rotate: { duration: [17, 21, 19, 24][index], repeat: Infinity, ease: "linear" } }}
                        style={{ transformOrigin: `${world.x}px ${world.y}px` }}
                      >
                        <motion.circle cx={world.x} cy={world.y} r={planetR * 2.25} fill={world.color} initial={false} animate={{ opacity: isHovered || isSelected ? .12 : .035 }} transition={{ duration: reduced ? 0 : .25 }} />
                        <circle cx={world.x} cy={world.y} r={planetR + 5} fill="none" stroke={world.color} strokeOpacity={isHovered || isSelected ? ".65" : ".17"} strokeWidth=".7" strokeDasharray="1 8" />
                        <circle cx={world.x} cy={world.y} r={planetR} fill={`url(#planet-${world.id})`} stroke={world.color} strokeOpacity={isHovered || isSelected ? ".82" : ".36"} strokeWidth={isSelected ? 1.2 : .8} />
                        <circle cx={world.x} cy={world.y} r={planetR} fill="url(#planet-shadow)" />
                        <circle cx={world.x} cy={world.y} r={planetR} fill="url(#planet-atmosphere)" />
                        <circle cx={world.x} cy={world.y} r={planetR} filter="url(#planetTexture)" opacity=".15" />
                        {world.id === "tech" && <g fill="none" stroke="#d8e8c9" strokeWidth=".8" strokeOpacity=".45"><path d={`M ${world.x - 17} ${world.y - 9} Q ${world.x - 4} ${world.y - 18} ${world.x + 4} ${world.y - 6} T ${world.x + 17} ${world.y + 3}`} /><path d={`M ${world.x - 18} ${world.y + 8} Q ${world.x - 5} ${world.y - 1} ${world.x + 1} ${world.y + 9} T ${world.x + 14} ${world.y + 10}`} strokeOpacity=".3" /></g>}
                        {world.id === "music" && <g fill="none" stroke="#f0e6ff" strokeOpacity=".48"><path d={`M ${world.x - 17} ${world.y - 3} Q ${world.x - 12} ${world.y - 15} ${world.x - 7} ${world.y - 3} T ${world.x + 3} ${world.y - 3} T ${world.x + 13} ${world.y - 3}`} strokeWidth="1.4" /><path d={`M ${world.x - 16} ${world.y + 7} Q ${world.x - 11} ${world.y - 1} ${world.x - 6} ${world.y + 7} T ${world.x + 4} ${world.y + 7} T ${world.x + 14} ${world.y + 7}`} strokeWidth="1" strokeOpacity=".32" /></g>}
                        {world.id === "film" && <g fill="none" stroke="#ffe6d2"><ellipse cx={world.x} cy={world.y + 2} rx={planetR * .83} ry={planetR * .34} transform={`rotate(-28 ${world.x} ${world.y + 2})`} strokeOpacity=".48" strokeWidth="1.2" /><ellipse cx={world.x} cy={world.y + 2} rx={planetR * .63} ry={planetR * .2} transform={`rotate(-28 ${world.x} ${world.y + 2})`} strokeOpacity=".22" strokeWidth=".8" /></g>}
                        {world.id === "nontech" && <g fill="none" stroke="#d8f0fb"><path d={`M ${world.x - 13} ${world.y - 8} Q ${world.x - 4} ${world.y - 17} ${world.x + 3} ${world.y - 7} T ${world.x + 14} ${world.y - 2}`} strokeOpacity=".45" strokeWidth="1.5" /><path d={`M ${world.x - 15} ${world.y + 7} Q ${world.x - 4} ${world.y + 1} ${world.x + 5} ${world.y + 9} T ${world.x + 13} ${world.y + 5}`} strokeOpacity=".32" strokeWidth="1.2" /></g>}
                      </motion.g>
                    </motion.g>
                    <motion.g
                      animate={reduced || !isUniverse ? { x: 0, y: 0 } : {
                        x: [orbit.rx * Math.cos(orbit.phase), orbit.rx * Math.cos(orbit.phase + Math.PI / 2), orbit.rx * Math.cos(orbit.phase + Math.PI), orbit.rx * Math.cos(orbit.phase + Math.PI * 1.5), orbit.rx * Math.cos(orbit.phase + Math.PI * 2)],
                        y: [orbit.ry * Math.sin(orbit.phase), orbit.ry * Math.sin(orbit.phase + Math.PI / 2), orbit.ry * Math.sin(orbit.phase + Math.PI), orbit.ry * Math.sin(orbit.phase + Math.PI * 1.5), orbit.ry * Math.sin(orbit.phase + Math.PI * 2)]
                      }}
                      transition={reduced || !isUniverse ? { duration: 0 } : { duration: 1 / orbit.speed, repeat: Infinity, ease: "linear" }}
                      style={{ pointerEvents: "none" }}
                    >
                      <g>
                        <text x={world.x + 32} y={world.y - 4} textAnchor="start" fill="#f4f1eb" fontSize="10" letterSpacing=".5" opacity={isSelected ? 0 : .82}>{world.name}</text>
                        {isHovered && isUniverse && (
                          <g>
                            <rect x={world.x + 30} y={world.y + 4} width="170" height="37" rx="8" fill="#10111a" fillOpacity=".94" stroke={world.color} strokeOpacity=".4" />
                            <text x={world.x + 40} y={world.y + 19} fill="#f4f1eb" fontSize="9.5">{world.name}</text>
                            <text x={world.x + 40} y={world.y + 32} fill="#c9cad8" fontSize="8">{world.short}</text>
                          </g>
                        )}
                      </g>
                    </motion.g>
                  </motion.g>
                );
              })}

              {selectedWorld && selectedWorld.stars.map((star, i) => {
                const pos = starPositions[i % starPositions.length];
                const isChosen = selectedStarId === star.id;
                const isHovered = hoveredStarId === star.id;
                return (
                  <motion.g
                    key={star.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${star.name}`}
                    onClick={() => setSelectedStarId(star.id)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedStarId(star.id); } }}
                    onMouseEnter={() => setHoveredStarId(star.id)}
                    onMouseLeave={() => setHoveredStarId(null)}
                    onFocus={() => setHoveredStarId(star.id)}
                    onBlur={() => setHoveredStarId(null)}
                    className="cursor-pointer outline-none"
                    initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : i * 0.08 }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  >
                    <circle cx={pos.x} cy={pos.y} r={isChosen || isHovered ? 15 : 10} fill={selectedWorld.color} opacity={isChosen || isHovered ? ".18" : ".07"} />
                    <motion.circle cx={pos.x} cy={pos.y} r={isChosen ? 5 : isHovered ? 4 : 2.8} fill={selectedWorld.color} filter={isChosen ? "url(#starGlow)" : undefined} animate={reduced ? undefined : { opacity: isChosen ? 1 : [0.55, 1, 0.65] }} transition={reduced ? undefined : { duration: 2.4 + i * .2, repeat: Infinity, ease: "easeInOut" }} />
                    {(isHovered || isChosen) && (
                      <g>
                        <rect x={pos.x - 57} y={pos.y + 13} width="114" height="23" rx="11.5" fill="#0a0c13" stroke={selectedWorld.color} strokeOpacity=".4" />
                        <text x={pos.x} y={pos.y + 28} textAnchor="middle" fill="#f4f1eb" fontSize="9">{star.name.length > 18 ? star.name.slice(0, 17) + "…" : star.name}</text>
                      </g>
                    )}
                  </motion.g>
                );
              })}
            </svg>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3 sm:px-6">
              {selectedWorld ? (
                <button type="button" onClick={returnToUniverse} className="inline-flex min-h-10 items-center gap-2 text-xs text-white/55 transition-colors hover:text-white">
                  <ArrowLeft size={14} /> Back to all worlds
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/30"><Compass size={13} /> Select a planet to begin</span>
              )}
              <span className="text-right text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">Move slowly. Explore freely.</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedWorld && (
              <motion.div
                key={selectedWorld.id}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0 : 0.24 }}
                className="grid gap-6 border-t border-white/[0.1] py-7 sm:py-9 md:grid-cols-[0.8fr_1.2fr] md:gap-10"
              >
                <div>
                  <p className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em]" style={{ color: selectedWorld.color }}>
                    <Sparkles size={12} /> World notes / {String(worlds.findIndex((w) => w.id === selectedWorld.id) + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-3xl font-medium tracking-[-0.06em] sm:text-4xl">{selectedWorld.name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/55">{selectedWorld.description}</p>
                </div>

                <div className="min-w-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">In this constellation</p>
                    <span className="text-[9px] text-white/30">{selectedWorld.stars.length} stars</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedWorld.stars.map((star) => (
                      <button
                        type="button"
                        key={star.id}
                        onClick={() => setSelectedStarId(star.id)}
                        className={`group flex w-full min-w-0 items-center justify-between gap-4 py-3 text-left transition-colors ${selectedStarId === star.id ? "text-white" : "text-white/55 hover:text-white/90"}`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="truncate text-sm text-white/85">{star.name}</span>
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selectedWorld.color }} />
                        </span>
                        <span className="mt-1 block text-[9px] uppercase tracking-[0.15em] text-white/35">{star.kind}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedWorld && selectedStar && (
              <motion.div
                key={selectedStar.id}
                initial={reduced ? false : { opacity: 0, y: 16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className="overflow-hidden border-t border-white/[0.1]"
              >
                <div className="grid gap-5 bg-white/[0.025] p-5 sm:p-7 md:grid-cols-[1fr_1.2fr_auto] md:items-center md:gap-8 md:p-9">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.2em]" style={{ color: selectedWorld.color }}>{selectedStar.kind}</p>
                    <h4 className="text-2xl font-medium tracking-[-0.05em] sm:text-3xl">{selectedStar.name}</h4>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/35">{selectedStar.status}</p>
                  </div>
                  <p className="text-sm leading-7 text-white/55">{selectedStar.description}</p>
                  {selectedStar.link && (
                    <a href={selectedStar.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-white/65 transition-colors hover:text-white">
                      Explore <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-white/25">A work in progress, just like the person behind it.</p>
      </div>
    </section>
  );
}
