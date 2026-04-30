"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
            Building digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              experiences
            </span> that matter.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12">
            A creative developer blending design and technology to craft premium web applications.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#work" className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#contact" className="text-white/60 hover:text-white transition-colors font-medium">
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
