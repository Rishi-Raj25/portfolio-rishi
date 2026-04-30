"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import Portal from "./Portal";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    image: string;
    color: string;
    liveLink: string;
    codeLink: string;
    caseStudy: { label: string; text: string }[];
  };
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalHeight = document.body.style.height;
      
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("height", "100vh", "important");
      
      return () => {
        document.body.style.overflow = originalOverflow || "";
        document.body.style.height = originalHeight || "";
      };
    }
  }, [isOpen]);

  // Prevent scroll propagation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  if (!project.caseStudy) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          /* 1. OVERLAY (Fixed, 100vh) */
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10 overflow-hidden bg-black/60 backdrop-blur-[4px] pointer-events-auto">
            {/* Backdrop click-to-close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* 2. MODAL CONTAINER (Overflow Hidden, touch-action none) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden z-10 touch-none"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-[1002] w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <X className="w-5 h-5 md:w-7 md:h-7 transition-transform group-hover:rotate-90" />
              </button>

              {/* 3. SCROLL CONTENT (The only part that scrolls) */}
              <div 
                ref={scrollRef}
                className="h-full overflow-y-auto scroll-smooth overscroll-contain custom-scrollbar pointer-events-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="flex flex-col">
                  {/* Hero Section */}
                  <div className="relative w-full h-[350px] md:h-[550px] shrink-0 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-125"
                    />
                    <div 
                      className="absolute inset-0 opacity-30 mix-blend-overlay"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    
                    <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 right-10 md:right-20 z-10">
                      <p className="text-[11px] font-black uppercase tracking-[0.5em] mb-6" style={{ color: project.color }}>
                        {project.category}
                      </p>
                      <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85]">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="p-10 md:p-20 lg:p-24 bg-[#0a0a0a]">
                    <div className="max-w-3xl mx-auto flex flex-col gap-20 md:gap-32">
                      <div className="flex flex-col gap-16 md:gap-24">
                        {project.caseStudy.map((item, i) => (
                          <motion.div 
                            key={i} 
                            className="flex flex-col gap-6 md:gap-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: project.color }} />
                              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
                                {item.label}
                              </span>
                            </div>
                            <p className="text-2xl md:text-4xl text-neutral-200 font-light leading-[1.4] tracking-tight">
                              {item.text}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-16 md:pt-24 border-t border-white/5 flex flex-wrap items-center gap-8 md:gap-12">
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative px-10 py-5 md:px-14 md:py-6 bg-white text-black rounded-full font-bold text-lg flex items-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                        >
                          <span>View Live</span>
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>

                        <a 
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative px-2 py-4 text-white/40 hover:text-white font-bold text-lg flex items-center gap-4 transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                          <span>View Code</span>
                          <div className="absolute bottom-4 left-0 right-0 h-[1px] bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}


