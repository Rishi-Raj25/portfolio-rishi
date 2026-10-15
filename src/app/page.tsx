"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-[#05060a] text-[#f4f1eb]">
      <div aria-hidden="true" className="universe-backdrop pointer-events-none fixed inset-0 -z-10" />
      <div aria-hidden="true" className="cosmic-bloom cosmic-bloom--blue pointer-events-none fixed -z-10" />
      <div aria-hidden="true" className="cosmic-bloom cosmic-bloom--violet pointer-events-none fixed -z-10" />
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
