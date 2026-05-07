"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({ words, interval = 5000, className = "" }: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const longestWord = useMemo(() => {
    return words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? "");
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Container animation for the whole word
  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: [0.64, 0, 0.78, 0] as const
      }
    }
  };

  return (
    <span className="relative inline-grid whitespace-nowrap align-baseline">
      {/* Width anchor keeps all cycles the same visual movement. */}
      <span aria-hidden="true" className={`invisible col-start-1 row-start-1 inline-block font-bold ${className}`}>
        {longestWord}
      </span>
      <motion.span className="col-start-1 row-start-1 inline-block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
