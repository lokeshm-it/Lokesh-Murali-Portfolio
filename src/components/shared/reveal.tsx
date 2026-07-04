"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  as?: keyof typeof tags;
}

/** Fade-and-rise reveal triggered when the element scrolls into view. */
export function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = tags[as];
  return (
    <MotionTag
      className={className}
      custom={delayIndex}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
