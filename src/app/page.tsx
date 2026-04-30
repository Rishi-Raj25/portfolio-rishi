"use client";

import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <main ref={containerRef} className="flex min-h-screen flex-col bg-[#0a0a0a] text-white relative">
      <Navbar />
      
      {/* Refined Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Parallax Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" 
          />
        </div>

        <motion.div 
          style={{ opacity }}
          className="container mx-auto px-6 relative z-10 text-center max-w-4xl flex flex-col items-center"
        >
          {/* Intriguing & Balanced Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group mb-16 cursor-default flex flex-col items-center gap-4"
          >
            <div className="relative">
              <span className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-white/30 group-hover:text-white transition-all duration-700 ease-in-out">
                Rishi Raj
              </span>
              {/* Dynamic Expanding Underline */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-blue-500/30 group-hover:w-full group-hover:bg-blue-500 transition-all duration-700 ease-in-out" />
            </div>
            
            {/* Minimalist "01" marker to balance the verticality */}
            <span className="text-[10px] font-black text-white/10 tracking-widest mt-2">
              EST — 2026
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[1.1]">
              <span className="block text-white">Most people learn AI.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">I build with it.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl text-neutral-500 max-w-xl mx-auto mb-14 leading-relaxed font-light">
              Focused on real-time systems, speed, and making things actually usable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <a 
              href="#projects" 
              className="group flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-bold transition-all hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#journey"
              className="text-white/40 hover:text-white font-bold transition-all tracking-tight"
            >
              See My Journey
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      <About />
      <Journey />
      <Projects />
      <TechStack />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
