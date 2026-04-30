"use client";

import { motion, Variants } from "framer-motion";

const techStack = [
  {
    category: "Languages",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    dot: "bg-blue-400",
    items: [
      { name: "Python", emoji: "🐍" },
      { name: "C", emoji: "⚙️" },
      { name: "C++", emoji: "🔩" },
      { name: "JavaScript", emoji: "🟨" },
    ],
  },
  {
    category: "Web Technologies",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
    glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]",
    dot: "bg-purple-400",
    items: [
      { name: "HTML5", emoji: "🌐" },
      { name: "CSS3", emoji: "🎨" },
      { name: "React", emoji: "⚛️" },
      { name: "Next.js", emoji: "▲" },
    ],
  },
  {
    category: "AI / ML",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]",
    dot: "bg-emerald-400",
    items: [
      { name: "Machine Learning", emoji: "🤖" },
      { name: "NLP", emoji: "🧠" },
      { name: "Voice AI", emoji: "🎙️" },
      { name: "Computer Vision", emoji: "👁️" },
    ],
  },
  {
    category: "Tools & Infra",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
    glow: "hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]",
    dot: "bg-orange-400",
    items: [
      { name: "Git & GitHub", emoji: "🗂️" },
      { name: "REST APIs", emoji: "🔗" },
      { name: "Tailwind CSS", emoji: "💨" },
      { name: "Framer Motion", emoji: "✨" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function TechStack() {
  return (
    <section id="stack" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-20 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
            Tech Stack
          </h2>
          <p className="text-neutral-400 text-xl max-w-2xl">
            The technologies and concepts I work with — from systems programming to applied AI.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {techStack.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className={`rounded-3xl border ${group.border} bg-gradient-to-br ${group.color} p-8 backdrop-blur-sm transition-all duration-500 ${group.glow} hover:-translate-y-1`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${group.dot} shadow-lg`} />
                <h3 className="text-white font-semibold text-lg tracking-wide uppercase">
                  {group.category}
                </h3>
              </div>

              {/* Badge Grid */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium cursor-default transition-colors hover:bg-white/10 hover:text-white hover:border-white/20"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
