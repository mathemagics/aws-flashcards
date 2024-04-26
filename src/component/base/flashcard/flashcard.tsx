"use client";

import { type PropsWithChildren } from "react";

import { useState } from "react";
import { motion } from "framer-motion";

export function Flashcard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const flipCard = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={flipCard}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          flipCard();
        }
      }}
    >
      <motion.div
        className="size-full tstyle-preserve"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {children}
      </motion.div>
    </div>
  );
}