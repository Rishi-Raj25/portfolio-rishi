"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight, Orbit, Sparkles } from "lucide-react";

export default function Contact() {
  const reduced = useReducedMotion();
  const emailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=rishiraj.that236@gmail.com&su=Signal%20from%20your%20corner%20of%20the%20universe&body=Hey%20Rishi%2C%0A%0AI%20found%20your%20little%20corner%20of%20the%20internet%20and%20thought%20I%27d%20send%20a%20signal.%0A%0AI%27d%20love%20to%20talk%20about%20%5Bthe%20idea%2C%20project%2C%20or%20story%20on%20my%20mind%5D.%0A%0AHere%27s%20a%20little%20context%3A%0A%0A%5BWrite%20a%20few%20lines%20here%5D%0A%0AUntil%20the%20stars%20align%2C%0A%5BYour%20name%5D";

  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-20 md:px-6 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[12%] top-[8%] h-[420px] w-[70%] rounded-full bg-sky-500/[.07] blur-[100px]" />
        <div className="absolute -right-[12%] bottom-[-4%] h-[460px] w-[65%] rounded-full bg-violet-500/[.08] blur-[110px]" />
        <div className="absolute left-[25%] top-[40%] h-[260px] w-[50%] rounded-full bg-rose-400/[.035] blur-[90px]" />
        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="contact-dust-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#77d5ff" stopOpacity="0" />
              <stop offset=".42" stopColor="#77d5ff" stopOpacity=".32" />
              <stop offset=".7" stopColor="#c9a2ff" stopOpacity=".28" />
              <stop offset="1" stopColor="#ffb58a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-40 520 C190 240 260 600 480 360 S830 120 1240 290" fill="none" stroke="url(#contact-dust-line)" strokeWidth="1.1" strokeDasharray="2 8" />
          <path d="M-20 575 C210 330 335 650 560 410 S900 220 1230 370" fill="none" stroke="url(#contact-dust-line)" strokeWidth=".7" strokeDasharray="1 12" />
          {Array.from({ length: 100 }, (_, i) => {
            const x = (i * 193 + 37) % 1200;
            const y = (i * 107 + 53) % 720;
            const r = i % 17 === 0 ? 1.8 : i % 4 === 0 ? 1.1 : .55;
            return <circle key={i} cx={x} cy={y} r={r} fill="#e6f1ff" opacity={i % 3 === 0 ? .65 : .25} />;
          })}
        </svg>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32, rotateX: 4 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduced ? 0 : 1, ease: [0.2, 0.75, 0.2, 1] }}
        className="relative mx-auto max-w-6xl border-y border-white/10 py-12 sm:py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/[.025] via-transparent to-white/[.015]" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-7 flex items-center gap-3 text-[9px] uppercase tracking-[.32em] text-sky-100/60">
              <span className="h-px w-8 bg-sky-200/45" /> Open channel <Orbit size={13} />
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-[.98] tracking-[-.06em] text-[#f4f1eb] sm:text-6xl md:text-7xl">
              Some of the best things start with a <span className="text-sky-100/55">signal.</span>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              A project with a pulse. A strange idea that won’t leave you alone. A song, a story, a problem worth untangling. Send a little signal across the void — I’m listening.
            </p>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-5 border border-white/[.08]" style={{ clipPath: "polygon(0 8%, 92% 0, 100% 86%, 8% 100%)" }} />
            <div className="relative border border-sky-100/15 bg-[#060a13]/80 p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.24em] text-sky-100/65"><Sparkles size={13} /> Transmission ready</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-[0_0_12px_rgba(167,243,208,.8)]" />
              </div>
              <p className="text-2xl font-light leading-snug tracking-[-.03em] text-white sm:text-3xl">
                “Hello from somewhere out there.”
              </p>
              <p className="mt-4 text-xs leading-6 text-white/45">
                The first message is already drafted. Add your own details, change the coordinates, make it yours.
              </p>
              <motion.a
                href={emailHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? undefined : { y: -3, boxShadow: "0 0 34px rgba(108,190,255,.2)" }}
                whileTap={reduced ? undefined : { scale: .98 }}
                className="mt-7 inline-flex w-full items-center justify-between gap-4 border border-sky-100/25 bg-sky-100/[.08] px-5 py-4 text-sm text-white transition-colors hover:border-sky-100/55 hover:bg-sky-100/[.13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-100"
              >
                <span className="flex items-center gap-3"><Mail size={17} /> Send a signal to Rishi</span>
                <ArrowUpRight size={17} />
              </motion.a>
              <p className="mt-4 text-[9px] uppercase tracking-[.18em] text-white/30">Opens Gmail with a ready-to-edit message</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[.08] pt-5 text-[9px] uppercase tracking-[.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Coordinates: wherever a good idea begins</span>
          <a href="#journey" className="inline-flex items-center gap-2 self-start transition-colors hover:text-white/70 sm:self-auto">Before you go, explore the journey <ArrowUpRight size={12} /></a>
        </div>
      </motion.div>
    </section>
  );
}
