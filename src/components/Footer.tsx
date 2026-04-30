"use client";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  {
    name: "Twitter",
    icon: XIcon,
    url: "https://x.com/1emon_adee"
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Rishi-Raj25"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/rishi-raj-2b3651370"
  }
];

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className="py-16 md:py-24 border-t border-white/5 px-5 md:px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
        
        {/* Left Side: Credits */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-xl font-bold tracking-tight text-white">
              Rishi Raj
            </span>
          </div>
          <p className="text-white/20 text-[10px] md:text-xs font-medium tracking-widest uppercase">
            Crafted with Next.js & Framer Motion.
          </p>
          <p className="text-white/10 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase mt-4">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
          {SOCIALS.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.05 }}
              className="group flex flex-col items-center gap-3 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all">
                <social.icon size={18} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </motion.footer>
  );
}
