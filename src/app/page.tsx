"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-[#080808] text-[#f4f1eb]">
      <Navbar />
      <Hero />
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
