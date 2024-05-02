"use client";

import { useRef, type PropsWithChildren } from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useKeyListen } from "~/hook/useKeyListen";
import { useIsVisible } from "~/hook/useIsVisible/useIsVisible";

export function Flashcard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isVisibile = useIsVisible(ref);

  const flipCard = () => {
    if (!isAnimating && isVisibile) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  useKeyListen([" "], flipCard);

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={flipCard}
      ref={ref}
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
