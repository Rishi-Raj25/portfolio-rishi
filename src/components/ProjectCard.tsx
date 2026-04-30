import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

interface ProjectCardProps {
  title: string;
  category: string;
  description?: string;
  caseStudy: { label: string; text: string }[];
  image: string;
  liveLink: string;
  codeLink: string;
  index: number;
  featured?: boolean;
  color?: string;
}

export default function ProjectCard({ title, category, caseStudy, image, liveLink, codeLink, index, featured, color }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setIsModalOpen(true)}
        className={`group block relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border bg-neutral-900/40 backdrop-blur-md transition-all duration-700 hover:bg-neutral-900/60 cursor-pointer w-full mx-auto will-change-transform
        ${featured ? "md:col-span-2 min-h-[400px] md:min-h-[600px] max-w-6xl border-white/10 hover:border-white/30 shadow-[0_0_40px_rgba(245,158,11,0.05)]" : "md:col-span-2 min-h-[350px] md:min-h-[500px] max-w-5xl border-white/5 hover:border-white/20"}
        `}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ 
          y: -12,
          boxShadow: `0 30px 60px -20px ${color || "#3b82f6"}44`
        }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Cinematic Image with Contrast and Tint */}
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transform scale-110 group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-40 brightness-[0.7] contrast-[1.2] grayscale-[0.2] group-hover:grayscale-0 group-hover:opacity-60"
          />
          
          {/* Color Tint Overlay */}
          <div 
            className="absolute inset-0 z-10 mix-blend-overlay opacity-30 group-hover:opacity-40 transition-opacity duration-700"
            style={{ backgroundColor: color || "#3b82f6" }}
          />

          {/* Deep Gradient / Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
          
          {/* Subtle Glow Ring */}
          <div 
            className={`absolute inset-0 border-[4px] border-transparent rounded-[2rem] md:rounded-[2.5rem] transition-all duration-700 pointer-events-none ${featured ? "group-hover:border-white/10" : "group-hover:border-white/5"}`}
            style={{ boxShadow: `inset 0 0 ${featured ? '80px' : '50px'} ${color || "#3b82f6"}${featured ? '22' : '11'}` }}
          />
        </div>
        
        <div className="absolute inset-0 p-6 sm:p-10 md:p-16 z-20 flex flex-col justify-end">
          <div className="md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <p className="font-bold text-[10px] mb-4 md:mb-6 uppercase tracking-[0.3em] transition-colors"
               style={{ color: color }}>
              {category}
            </p>
            
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="max-w-2xl">
                <h3 className={`font-bold text-white mb-4 md:mb-8 tracking-tighter leading-[0.9] transition-colors ${featured ? "text-3xl sm:text-5xl md:text-[7rem]" : "text-2xl sm:text-4xl md:text-6xl"}`}>
                  {title}
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="group/btn px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 sm:gap-3 hover:bg-white hover:text-black transition-all duration-500 shadow-xl font-bold tracking-tight">
                  <span className="text-xs sm:text-sm">View Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
                
                <a 
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/live px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white/10 rounded-full flex items-center gap-2 sm:gap-3 hover:bg-white/10 hover:border-white/30 text-white transition-all duration-500 font-bold tracking-tight"
                >
                  <span className="text-xs sm:text-sm">View Live</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      </motion.div>

      <CaseStudyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={{ title, category, image, color: color || "#3b82f6", caseStudy, liveLink, codeLink }} 
      />
    </>
  );
}
