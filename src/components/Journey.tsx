"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

export default function Journey() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const events = [
    {
      year: "2023",
      title: "The Beginning",
      description: (
        <>
          Started with curiosity, not clarity. <br />
          Learned programming by solving problems, not just writing code.
        </>
      )
    },
    {
      year: "2024",
      title: "Building Foundation",
      description: (
        <>
          Moved from tutorials to building actual things. <br />
          Explored web development and core CS by creating, breaking, and fixing.
        </>
      )
    },
    {
      year: "2025",
      title: "Real-World Impact",
      description: (
        <>
          Built KrishiLens to solve a real problem, not just a project. <br />
          Started seeing AI as a tool for utility, not just experimentation.
        </>
      )
    },
    {
      year: "2026",
      title: "AI Systems",
      description: (
        <>
          Now focused on building real-time AI systems like Karma AI. <br />
          Working on latency, speed, and making interactions feel natural and usable.
        </>
      )
    }
  ];

  return (
    <section id="journey" ref={containerRef} className="py-16 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24"
        >
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">History</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white">The Journey</h2>
        </motion.div>

        <div className="relative ml-2 sm:ml-4">
          {/* Base Background Line */}
          <div className="absolute left-[-1px] top-4 bottom-4 w-[1px] bg-white/5" />
          
          {/* Scroll-driven Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[-1px] top-4 bottom-4 w-[1px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"
          />
          
          <div className="space-y-16 md:space-y-24">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative pl-8 md:pl-12 transition-all duration-500
                  ${hoveredIndex !== null && hoveredIndex !== i ? "opacity-30 blur-[1px] scale-[0.98]" : "opacity-100 scale-100"}
                `}
              >
                {/* Glowing Dot */}
                <motion.div 
                  animate={{ 
                    scale: hoveredIndex === i ? 1.5 : 1,
                    backgroundColor: hoveredIndex === i ? "#3b82f6" : "#1e40af"
                  }}
                  className={`
                    absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full transition-colors duration-300 z-20
                    ${hoveredIndex === i ? "shadow-[0_0_20px_rgba(59,130,246,0.8)]" : "shadow-[0_0_10px_rgba(59,130,246,0.2)]"}
                  `} 
                />
                
                <span className={`
                  text-[10px] font-black uppercase tracking-[0.3em] mb-4 block transition-colors duration-300
                  ${hoveredIndex === i ? "text-blue-400" : "text-white/20"}
                `}>
                  {event.year}
                </span>
                
                <h3 className={`
                  text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-5 tracking-tight transition-colors duration-300
                  ${hoveredIndex === i ? "text-white" : "text-white/80"}
                `}>
                  {event.title}
                </h3>
                
                <p className={`
                  font-light leading-relaxed text-base sm:text-lg md:text-xl max-w-xl transition-colors duration-300
                  ${hoveredIndex === i ? "text-neutral-300" : "text-neutral-500"}
                `}>
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
