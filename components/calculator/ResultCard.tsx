"use client";

import { motion } from "framer-motion";

type ResultCardProps = {
  title: string;
  value: string;
  description: string;
  accent?: "blue" | "red";
};

export function ResultCard({
  title,
  value,
  description,
  accent = "blue",
}: ResultCardProps) {
  const accentClasses =
    accent === "red"
      ? "from-[rgba(218,56,50,0.14)] to-white text-[var(--accent-red)]"
      : "from-[rgba(34,76,135,0.16)] to-white text-[var(--primary-blue)]";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-[1.75rem] border border-[var(--border-soft)] bg-gradient-to-br ${accentClasses} p-5 shadow-[var(--shadow-soft)]`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </motion.article>
  );
}
