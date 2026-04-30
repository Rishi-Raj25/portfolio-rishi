"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const PROJECTS = [
  {
    title: "Karma AI Agent",
    category: "Voice Agent Against Scammers",
    caseStudy: [
      { label: "Overview", text: "Karma AI is a real-time voice agent that handles scam calls automatically." },
      { label: "How It Works", text: "Instead of blocking them, it answers unknown calls and keeps the caller engaged using natural Hindi-English conversation, reducing disruption for the user." },
      { label: "Current Focus", text: "A working MVP is already built and functional. I’m currently improving response latency, making interactions more natural, and evolving the system into a more scalable, upgradeable real-time AI pipeline." }
    ],
    image: "/images/karma-ai.png",
    liveLink: "https://karma-ai-xi.vercel.app/",
    codeLink: "https://github.com/Rishi-Raj25/Karma-Ai",
    featured: true,
    color: "#f59e0b" // yellow
  },
  {
    title: "KrishiLens",
    category: "Crop Intelligence System",
    caseStudy: [
      { label: "Problem", text: "Farmers often struggle to detect crop diseases early, leading to preventable losses." },
      { label: "Solution", text: "Built a computer vision system that identifies crop issues in real time using image input." },
      { label: "How It Works", text: "Processes field images, detects patterns, and provides actionable insights for early intervention." },
      { label: "Impact", text: "Deployed locally with NABARD support—focused on real-world usability, not just experimentation." }
    ],
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
    liveLink: "https://krishilens-wheat.vercel.app/",
    codeLink: "https://github.com/Rishi-Raj25/Krishilens",
    featured: false,
    color: "#10b981" // green
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-32 px-5 md:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="mb-12 md:mb-24 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Portfolio</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-8 text-white">Selected Engineering</h2>
          <p className="text-neutral-500 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            A focused collection of systems and applications where AI meets real-world utility.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={index}
              index={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
