"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Contact() {
  const reduced = useReducedMotion();
  const emailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=rishiraj.that236@gmail.com&su=Quick%20question%20for%20Rishi&body=Hey%20Rishi%2C%0A%0AI%20found%20your%20portfolio%20and%20wanted%20to%20ask%20you%20about%20something.%0A%0A%5BThe%20actual%20reason%20I%27m%20emailing%5D%0A%0AThanks%2C%0A%5BMy%20name%5D";

  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[15%] top-[12%] h-[360px] w-[65%] rounded-full bg-[#8fa9b8]/[.07] blur-[100px]" />
        <div className="absolute -right-[14%] bottom-[-10%] h-[390px] w-[60%] rounded-full bg-[#a98273]/[.055] blur-[110px]" />
        <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <path d="M-60 460 C180 330 250 510 440 360 S790 190 1260 300" fill="none" stroke="#a8bac0" strokeOpacity=".26" strokeWidth="1" strokeDasharray="1 9" />
          <path d="M-30 500 C190 390 300 560 520 405 S880 260 1240 360" fill="none" stroke="#c29a82" strokeOpacity=".2" strokeWidth=".8" strokeDasharray="1 13" />
          {Array.from({ length: 75 }, (_, i) => {
            const x = (i * 193 + 37) % 1200;
            const y = (i * 107 + 53) % 600;
            const r = i % 17 === 0 ? 1.5 : i % 4 === 0 ? .9 : .5;
            return <circle key={i} cx={x} cy={y} r={r} fill="#e8e2d6" opacity={i % 3 === 0 ? .52 : .2} />;
          })}
        </svg>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduced ? 0 : .8, ease: [0.2, .75, .2, 1] }}
        className="relative mx-auto max-w-6xl border-t border-white/10 pt-10 sm:pt-14"
      >
        <p className="mb-7 text-[10px] uppercase tracking-[.2em] text-[#b5c2bd]/60">One last thing</p>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-light leading-[.98] tracking-[-.06em] text-[#f0eee8] sm:text-6xl md:text-7xl">
              Have a thought? <span className="text-[#b5c2bd]/65">Make it my problem.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
              Projects, music, films, weird little ideas. Good questions welcome. “Hey” is a start, technically.
            </p>
          </div>

          <div className="shrink-0">
            <motion.a
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? undefined : { x: 4 }}
              whileTap={reduced ? undefined : { scale: .98 }}
              className="group inline-flex items-center gap-4 border-b border-[#b5c2bd]/45 pb-3 text-base text-[#f0eee8] transition-colors hover:border-[#c29a82] sm:text-lg"
            >
              <Mail size={18} className="text-[#b5c2bd]/75" />
              <span>Send me an email</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
            <p className="mt-3 text-[11px] text-white/30">I’ve even done the subject line for you. You’re welcome.</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/[.07] pt-5 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>End of transmission. Probably.</span>
          <a href="#journey" className="inline-flex items-center gap-2 self-start transition-colors hover:text-[#b5c2bd] sm:self-auto">Go back and snoop around <ArrowUpRight size={12} /></a>
        </div>
      </motion.div>
    </section>
  );
}
