"use client";

import { motion, Variants } from "framer-motion";
import SkillTag from "./SkillTag";

const skills = [
  {
    category: "Programming & Technical Execution",
    description: "The stack I use to build and ship real-world projects.",
    accent: "#3b82f6", // blue
    tags: [
      { name: "Programming Languages", tooltip: "Python, JavaScript, C, C++, Node.js, PostgreSQL\nUsed for backend logic, scripting, and problem solving" },
      { name: "Backend Development", tooltip: "Node.js, Express.js, Next.js\nAPI development, routing, server-side architecture" },
      { name: "API Integration", tooltip: "REST APIs, JSON handling, third-party integrations\nRequest/response handling and service connections" },
      { name: "System Debugging", tooltip: "Debugging tools, logs, error tracing\nFixing bugs and optimizing performance" },
      { name: "Database Basics", tooltip: "MongoDB, PostgreSQL, SQL\nSchema design, queries, data management" },
      { name: "Frontend Development", tooltip: "HTML5, CSS3, JavaScript, React.js, TypeScript\nBuilding interfaces and connecting frontend-backend" },
      { name: "Version Control (Git)", tooltip: "Git, GitHub workflows\nVersion tracking, branching, collaboration" },
      { name: "Rapid Prototyping", tooltip: "Quick MVP builds, iterative development\nTesting ideas with working systems" },
    ],
  },
  {
    category: "Product, Growth & Business Awareness",
    description: "How I think about users, products, and real-world impact.",
    accent: "#f59e0b", // amber
    tags: [
      { name: "Marketing Basics", tooltip: "Positioning, messaging, basic outreach\nUnderstanding how products reach users" },
      { name: "User Behavior Understanding", tooltip: "User flows, interaction patterns\nObserving and improving user experience" },
      { name: "Growth-Oriented Thinking", tooltip: "Iteration, feedback loops, improvement cycles\nThinking in terms of scale and adoption" },
      { name: "Basic Financial Awareness", tooltip: "Cost vs value, basic budgeting logic\nUnderstanding trade-offs in decisions" },
      { name: "Product Thinking", tooltip: "Feature prioritization, usability focus\nBuilding for real-world usefulness" },
      { name: "User-Centric Approach", tooltip: "Designing around user needs\nImproving accessibility and clarity" },
      { name: "Clear Communication", tooltip: "Explaining technical ideas simply\nStructured and concise thinking" },
      { name: "Ownership & Execution", tooltip: "Taking responsibility for tasks\nShipping work end-to-end" },
    ],
  },
  {
    category: "Problem Solving & Thinking",
    description: "How I approach a problem before writing a single line of code.",
    accent: "#8b5cf6", // purple
    tags: [
      { name: "Breaking Down Complex Problems", tooltip: "Decomposing problems into smaller parts\nStructured approach to solutions" },
      { name: "Picking Up New Skills Fast", tooltip: "Learning through building\nAdapting quickly to new tools" },
      { name: "First-Principles Thinking", tooltip: "Reasoning from basics\nAvoiding assumptions and copying" },
      { name: "Getting Things Done", tooltip: "Execution-focused mindset\nPrioritizing action over delay" },
      { name: "Thinking Before Coding", tooltip: "Planning logic before implementation\nReducing unnecessary rework" },
      { name: "Consistency Over Perfection", tooltip: "Shipping regularly\nImproving through iteration" },
    ],
  },
  {
    category: "AI & Real-Time Systems",
    description: "Actively building in this space — learning by doing.",
    accent: "#10b981", // emerald
    tags: [
      { name: "AI Fundamentals", tooltip: "Machine Learning basics, NLP concepts\nModel usage, inference understanding" },
      { name: "Real-Time Systems", tooltip: "Low latency handling, async processing\nFast response system design" },
      { name: "Voice-Based AI", tooltip: "Speech-to-text, text-to-speech\nConversational interaction systems" },
      { name: "Practical AI Use-Cases", tooltip: "Automation, assistants, problem-solving tools\nApplying AI to real scenarios" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } as any },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } as any },
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-32 px-5 md:px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-20 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 md:mb-5 text-white">
            Builder's Toolkit
          </h2>
          <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Not a resume. A snapshot of how I think, build, and ship.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <motion.div
          className="flex flex-col gap-12 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skills.map((group) => (
            <motion.div key={group.category} variants={sectionVariants}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-4 md:mb-5">
                <div
                  className="w-1 h-6 md:h-8 rounded-full flex-shrink-0"
                  style={{ backgroundColor: group.accent }}
                />
                <div>
                  <h3 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
                    {group.category}
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">{group.description}</p>
                </div>
              </div>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3 pl-0 sm:pl-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.tags.map((tag) => (
                  <SkillTag
                    key={tag.name}
                    name={tag.name}
                    tooltip={tag.tooltip}
                    accent={group.accent}
                    variants={tagVariants}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
