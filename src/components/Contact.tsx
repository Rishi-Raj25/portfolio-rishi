"use client";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32 px-5 md:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 bg-neutral-900/40 backdrop-blur-xl p-8 sm:p-12 md:p-24 text-center group"
      >
        {/* Animated Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="inline-block px-5 py-2 rounded-xl border border-white/5 bg-white/[0.02] mb-6 md:mb-10">
            <span className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              Get in Touch
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-white leading-[1.1]">
            Let's build something <br className="hidden md:block" /> that actually matters.
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-500 mb-10 md:mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            I'm always looking for interesting problems to solve. Whether it's real-time AI, 
            system architecture, or a new project idea — let's talk.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
              <motion.a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rishiraj.that236@gmail.com&su=Let%27s%20Build%20Something%20Real&body=Hey%20Rishi,%0A%0ACame%20across%20your%20portfolio%E2%80%94really%20like%20the%20direction%20you%27re%20building%20in.%0AWould%20be%20great%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn relative flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden min-w-[200px] md:min-w-[220px] justify-center"
              >
                <Mail size={18} className="relative z-10" />
                <span className="relative z-10 text-sm sm:text-base transition-all duration-300 group-hover/btn:hidden">
                  Say Hello
                </span>
                <span className="relative z-10 hidden group-hover/btn:flex items-center gap-2 text-sm sm:text-base">
                  Send an Email <ArrowUpRight size={18} />
                </span>
              </motion.a>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase"
                style={{ textShadow: "0 0 6px rgba(255,255,255,0.15)" }}
              >
                Best way to reach me: email.
              </motion.p>
            </div>
            
            <motion.a 
              href="#journey"
              whileHover={{ scale: 1.04, boxShadow: "0 0 15px rgba(255,255,255,0.15)" }}
              className="text-neutral-400 hover:text-white transition-all font-bold text-base sm:text-lg tracking-tight border-b border-white/10 hover:border-white/30 pb-1 px-4 py-2 rounded-lg"
              style={{ boxShadow: "0 0 10px rgba(255,255,255,0.12)" }}
            >
              View Journey
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
