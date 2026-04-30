"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-[100] transition-all duration-500 py-4 md:py-6"
      >
        <div className="max-w-5xl mx-auto px-5 md:px-6">
          <div className={`
            flex items-center justify-between transition-all duration-500 rounded-full px-4 sm:px-6 py-3
            ${isScrolled ? "bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl scale-[0.98]" : "bg-transparent border-transparent"}
          `}>
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                Rishi Raj
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-white/60 hover:text-white transition-colors uppercase">
                  {link.name}
                </Link>
              ))}
              <Link href="#contact" className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors uppercase">
                Contact
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-3 text-white/60 hover:text-white -mr-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-neutral-950 flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xl font-bold tracking-tight">Rishi Raj</span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-white/60 hover:text-white transition-all hover:translate-x-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-bold tracking-tighter text-blue-400 hover:text-blue-300 transition-all hover:translate-x-2"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
