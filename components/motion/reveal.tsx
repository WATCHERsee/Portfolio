"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "ul" | "li";
  stagger?: boolean;
}

const container = (stagger: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: stagger ? { staggerChildren: 0.09 } : undefined,
  },
});

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  stagger = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? container(true) : item}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
