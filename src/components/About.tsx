"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  const lines = [
    { text: "I build things, break them, and figure them out.", type: "main" },
    { text: "Focused on using AI to solve real-world problems.", type: "main" },
    { text: "Not just learning theory.", type: "sub" },
    { 
      text: (
        <>
          Working on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">real-time AI</span> systems.
        </>
      ), 
      type: "main" 
    },
    { text: "Improving latency. Making interactions natural.", type: "main" },
    { text: "Systems over concepts. Always.", type: "sub" },
    { text: "I learn fast, execute faster.", type: "main" },
    { text: "I prefer shipping over overthinking.", type: "main" },
    { text: "Still early, but already building things that matter.", type: "sub" }
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-5 md:px-6 relative">
      <div className="max-w-3xl mx-auto border-l-2 border-blue-500/10 pl-6 md:pl-8">
        {/* Confident & Clean Intro Line */}
        <div className="relative inline-block mb-12">
          {/* Floating Text Reveal */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 bottom-full mb-3 px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl shadow-lg z-50 pointer-events-none"
              >
                <p className="text-xs sm:text-sm md:text-base font-bold text-blue-400 tracking-tight whitespace-nowrap">
                  I learn by building, not waiting.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intro Text Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer py-1"
          >
            <span className={`
              text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase transition-colors duration-300
              ${isHovered ? "text-white" : "text-white/60"}
            `}>
              I'm a first-year student
            </span>
            
            {/* Permanent Underline (Faint) */}
            <div className={`
              absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-300
              ${isHovered ? "bg-blue-500/50" : "bg-white/10"}
            `} />

            {/* Hover Underline (Active Sweep) */}
            <motion.div 
              className="absolute bottom-0 left-0 h-[1px] bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        {/* Main Content Lines */}
        <div className="space-y-6 md:space-y-8 relative z-10">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`
                ${line.type === "main" ? "text-lg sm:text-xl md:text-3xl font-bold text-white/90 leading-tight tracking-tight" : ""}
                ${line.type === "sub" ? "text-sm sm:text-base md:text-xl text-white/40 font-medium italic" : ""}
              `}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
