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
        initial={{ y: -100, opacity: 0 }}
        animate={isScrolled ? { y: -2, opacity: 0.34, scale: 0.965 } : { y: 0, opacity: 1, scale: 1 }}
        whileHover={isScrolled ? { opacity: 0.96, scale: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: [0.22, 0.75, 0.22, 1] }}
        aria-label="Main navigation"
        className={`journey-global-nav fixed top-0 w-full z-[40] py-4 md:py-6 ${isScrolled ? "journey-global-nav--receded" : "journey-global-nav--front"}`}
      >
        <div className="max-w-5xl mx-auto px-5 md:px-6">
          <div className={`
            journey-nav-content flex items-center justify-between transition-all duration-500 rounded-full px-4 sm:px-6 py-3
            ${isScrolled ? "bg-transparent border-transparent shadow-none" : "bg-transparent border-transparent"}
          `}>
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                Rishi Raj
              </span>
            </Link>

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

            <button
              aria-label="Open navigation menu"
              className="md:hidden p-3 text-white/60 hover:text-white -mr-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="journey-mobile-menu fixed inset-0 z-[200] bg-neutral-950 flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xl font-bold tracking-tight">Rishi Raj</span>
              </Link>
              <button
                aria-label="Close navigation menu"
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
