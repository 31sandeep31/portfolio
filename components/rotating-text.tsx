"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  words: string[];
  intervalMs?: number;
  /** Classes applied to each rendered word (size, weight, gradient, etc). */
  className?: string;
};

export function RotatingText({ words, intervalMs = 2600, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  const current = words[index];
  // Longest word reserves the layout slot so the container does not jump
  // width as words swap in and out.
  const longest = words.reduce(
    (acc, w) => (w.length > acc.length ? w : acc),
    "",
  );

  // The className must live on the elements that actually carry the text,
  // otherwise `bg-clip-text` has nothing to clip to and the text renders
  // invisibly (selectable but blank).
  const textClasses = className ?? "";

  return (
    <span
      aria-live="polite"
      className="relative inline-grid align-baseline"
      style={{ gridTemplateAreas: '"slot"' }}
    >
      <span
        aria-hidden
        className={`invisible whitespace-nowrap ${textClasses}`}
        style={{ gridArea: "slot" }}
      >
        {longest}
      </span>
      <span
        className="relative overflow-hidden whitespace-nowrap"
        style={{ gridArea: "slot" }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={current}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            className={`inline-block ${textClasses}`}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            transition={{
              y: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.35, ease: "easeOut" },
              filter: { duration: 0.35, ease: "easeOut" },
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
