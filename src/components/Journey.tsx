"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, AudioLines, Code2, Film, NotebookPen, X } from "lucide-react";
import { useEffect, useState } from "react";

type Artifact = {
  id: string;
  number: string;
  kind: string;
  title: string;
  hint: string;
  icon: typeof NotebookPen;
  rotation: number;
  paper: string;
  detailTitle: string;
  detail: string;
  fragment: string;
};

const artifacts: Artifact[] = [
  {
    id: "field-note",
    number: "NOTE 001",
    kind: "FIELD NOTE",
    title: "Things I noticed",
    hint: "A note from the margins",
    icon: NotebookPen,
    rotation: -3,
    paper: "paper-ivory",
    detailTitle: "The things that stay with you",
    detail: "Some moments are too small to become stories immediately. They sit in the margins for a while: a line someone said, a light through a window, the feeling that a day might matter later. This space is for those observations, added as they become real notes.",
    fragment: "keep the small things",
  },
  {
    id: "music",
    number: "ARTIFACT 002",
    kind: "MUSIC FRAGMENT",
    title: "A melody in progress",
    hint: "An unfinished musical thought",
    icon: AudioLines,
    rotation: 2.5,
    paper: "paper-warm",
    detailTitle: "Not every song arrives finished",
    detail: "A place for actual chord progressions, lyric scraps, voice memos transcribed into notes, and musical ideas that haven't found their final shape. The first version can be messy. That's usually the point.",
    fragment: "verse idea / revisit",
  },
  {
    id: "code",
    number: "ARTIFACT 003",
    kind: "WORKING SCRAP",
    title: "Something finally worked",
    hint: "A small technical breakthrough",
    icon: Code2,
    rotation: -1.5,
    paper: "paper-grey",
    detailTitle: "The useful part was figuring it out",
    detail: "A home for real code fragments, failed approaches, tiny breakthroughs, and the decisions behind projects. Not a second projects gallery—more like the loose notes left beside the keyboard.",
    fragment: "try the simpler version",
  },
  {
    id: "film",
    number: "NOTE 004",
    kind: "FRAME NOTE",
    title: "A story waiting for a frame",
    hint: "A thought for the camera",
    icon: Film,
    rotation: 3.5,
    paper: "paper-ivory",
    detailTitle: "Before the shot, there's a feeling",
    detail: "Film ideas often start as a mood, a fragment of dialogue, or an image that won't leave your head. This slot is for genuine story notes, shot ideas, and storyboard fragments—not invented production history.",
    fragment: "hold the shot a little longer",
  },
  {
    id: "unfinished",
    number: "FRAGMENT 005",
    kind: "UNFINISHED THOUGHT",
    title: "I haven't figured this out",
    hint: "Room for the next signal",
    icon: NotebookPen,
    rotation: -2,
    paper: "paper-tan",
    detailTitle: "An archive can leave things unresolved",
    detail: "Not every entry needs a lesson or a neat ending. This last page is deliberately open: a thought in progress, a question, or something that only makes sense when there's more of the story to tell.",
    fragment: "to be continued",
  },
];

export default function Journey() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!activeArtifact) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArtifact(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArtifact]);

  return (
    <section
      id="journey"
      className="relative isolate overflow-hidden px-5 py-24 text-[#eeeae1] sm:px-8 md:py-36"
      aria-labelledby="journey-heading"
    >
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
              Personal archive / Chapter 01
            </div>
            <h2 id="journey-heading" className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.065em] text-[#f3f0e9] sm:text-7xl md:text-8xl">
              The first
              <br />
              <span className="font-serif font-normal italic text-[#bdb7aa]">signal.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/55 md:justify-self-end">
            A few loose pages from a story still being written. Pick one up. The rest can wait.
          </p>
        </motion.header>

        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[88%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/[0.09] lg:block" />
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-6 lg:gap-x-7 lg:gap-y-12">
            {artifacts.map((artifact, index) => {
              const Icon = artifact.icon;
              const layout = ["lg:col-span-2 lg:translate-y-6", "lg:col-span-2 lg:translate-y-0", "lg:col-span-2 lg:translate-y-12", "lg:col-span-3 lg:col-start-2 lg:translate-x-1 lg:-translate-y-1", "lg:col-span-2 lg:col-start-5 lg:translate-y-10"][index];
              return (
                <motion.button
                  key={artifact.id}
                  type="button"
                  onClick={() => setActiveArtifact(artifact)}
                  initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: artifact.rotation * 1.6 }}
                  whileInView={{ opacity: 1, y: 0, rotate: artifact.rotation }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.07 }}
                  whileHover={reduceMotion ? undefined : { y: -7, rotate: 0, scale: 1.015 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.975 }}
                  className={`artifact-paper ${artifact.paper} ${layout} group relative min-h-[250px] w-full overflow-hidden p-6 text-left text-[#292720] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6cdbb] sm:min-h-[280px] sm:p-7`}
                  aria-label={`Open ${artifact.title}`}
                >
                  <span aria-hidden="true" className="paper-fold" />
                  <div className="relative flex h-full min-h-[202px] flex-col justify-between sm:min-h-[230px]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[9px] font-medium tracking-[0.18em] text-[#625d53]">{artifact.number}</span>
                      <Icon size={17} strokeWidth={1.4} className="text-[#777064] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <div className="py-7">
                      <div className="mb-3 font-mono text-[9px] tracking-[0.17em] text-[#777064]">{artifact.kind}</div>
                      <h3 className="max-w-[18rem] font-serif text-2xl leading-[1.08] tracking-[-0.035em] sm:text-[1.8rem]">{artifact.title}</h3>
                      <p className="mt-3 max-w-[17rem] text-xs leading-5 text-[#696358]">{artifact.hint}</p>
                    </div>
                    <div className="flex items-end justify-between gap-4 border-t border-[#423c32]/20 pt-3">
                      <span className="font-serif text-sm italic text-[#6d665a]">{artifact.fragment}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#5b554a]/25 transition-all duration-300 group-hover:bg-[#302d27] group-hover:text-[#f0eadf]">
                        <ArrowUpRight size={15} strokeWidth={1.4} />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.19em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Five fragments / More to be added</span>
          <span className="flex items-center gap-2 normal-case tracking-normal text-white/45">
            <ArrowDownLeft size={13} strokeWidth={1.3} />
            Select a page to unfold it
          </span>
        </div>
      </div>

      <AnimatePresence>
        {activeArtifact && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#050507]/85 px-4 py-8 backdrop-blur-sm sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveArtifact(null);
            }}
            role="presentation"
          >
            <motion.article
              key={activeArtifact.id}
              role="dialog"
              aria-modal="true"
              aria-labelledby="artifact-dialog-title"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.84, rotate: activeArtifact.rotation * 2, y: 24, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, rotate: -2, y: 12, filter: "blur(3px)" }}
              transition={{ type: "spring", stiffness: 170, damping: 20, duration: reduceMotion ? 0 : undefined }}
              className={`artifact-paper ${activeArtifact.paper} relative my-auto w-full max-w-2xl p-7 text-[#292720] shadow-[0_35px_100px_rgba(0,0,0,0.5)] sm:p-12`}
            >
              <button
                type="button"
                onClick={() => setActiveArtifact(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#5b554a]/25 transition-colors hover:bg-[#302d27] hover:text-[#f0eadf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#302d27]"
                aria-label="Close artifact"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
              <div className="mb-12 flex items-center justify-between gap-4 pr-10 font-mono text-[10px] tracking-[0.18em] text-[#6d665a]">
                <span>{activeArtifact.number}</span>
                <span>{activeArtifact.kind}</span>
              </div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.17em] text-[#777064]">From the margins</p>
              <h3 id="artifact-dialog-title" className="max-w-xl font-serif text-3xl leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                {activeArtifact.detailTitle}
              </h3>
              <p className="mt-7 max-w-xl whitespace-pre-line text-sm leading-7 text-[#575247] sm:text-base sm:leading-8">
                {activeArtifact.detail}
              </p>
              <div className="mt-12 flex items-end justify-between gap-6 border-t border-[#423c32]/20 pt-4">
                <span className="font-serif text-sm italic text-[#777064]">{activeArtifact.fragment}</span>
                <span className="font-mono text-[9px] tracking-[0.15em] text-[#777064]">ARCHIVE / IN PROGRESS</span>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
