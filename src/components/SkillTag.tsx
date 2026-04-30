"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillTagProps {
  name: string;
  tooltip: string;
  accent: string;
  variants: any;
}

export default function SkillTag({ name, tooltip, accent, variants }: SkillTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const tagRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Split tooltip into tech and description
  const [tech, ...descriptionParts] = tooltip ? tooltip.split("\n") : ["", ""];
  const description = descriptionParts.join("\n");

  useEffect(() => {
    if (isHovered && tagRef.current) {
      const rect = tagRef.current.getBoundingClientRect();
      if (rect.top < 140) {
        setPosition("below");
      } else {
        setPosition("above");
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  return (
    <motion.div 
      className="relative inline-block"
      variants={variants}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: position === "above" ? 10 : -10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: position === "above" ? 10 : -10, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute left-1/2 z-[100] w-max max-w-[280px] p-4 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none ${
              position === "above" ? "bottom-full mb-4" : "top-full mt-4"
            }`}
          >
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-[13px] font-bold text-white leading-tight whitespace-pre-line">
                {tech}
              </p>
              {description && (
                <p className="text-[12px] font-medium text-neutral-400 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              )}
            </div>
            
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] border-r border-b border-white/10 rotate-45 ${
                position === "above" ? "-bottom-1.5" : "-top-1.5 border-t border-l border-r-0 border-b-0"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        ref={tagRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.04,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: `${accent}88`,
          color: "#ffffff",
        }}
        whileTap={{ scale: 0.96 }}
        style={{ borderColor: `${accent}33` }}
        className="px-6 py-3 rounded-full border bg-white/[0.04] text-neutral-300 text-sm font-medium cursor-pointer transition-all duration-300 block text-center min-w-[120px]"
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
