"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroTextProps {
  text?: string;
  className?: string;
  autoReplay?: boolean;
  replayInterval?: number;
}

export default function HeroText({
  text = "IMMERSE",
  className = "",
  autoReplay = true,
  replayInterval = 8000,
}: HeroTextProps) {
  const [count, setCount] = useState(0);
  const characters = text.split("");

  useEffect(() => {
    if (!autoReplay) return;
    const interval = setInterval(() => setCount((c) => c + 1), replayInterval);
    return () => clearInterval(interval);
  }, [autoReplay, replayInterval]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full overflow-hidden select-none",
        className
      )}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--foreground))_2px,hsl(var(--foreground))_3px)]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="flex items-center justify-center"
        >
          {characters.map((char, i) => (
            <motion.div
              key={i}
              className="relative inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: i * 0.07,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Base character */}
              <motion.span
                className="inline-block text-[8vw] md:text-[6vw] font-black tracking-[-0.04em] leading-none"
                style={{ color: "hsl(var(--foreground))" }}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.07 + 0.3,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Top shutter slice */}
              <motion.span
                className="absolute inset-0 inline-block text-[8vw] md:text-[6vw] font-black tracking-[-0.04em] leading-none overflow-hidden"
                style={{
                  clipPath: "inset(0 0 70% 0)",
                  color: "hsl(var(--primary))",
                  mixBlendMode: "screen",
                }}
                initial={{ x: -60, opacity: 0, skewX: -15 }}
                animate={{ x: 0, opacity: 0.7, skewX: 0 }}
                transition={{
                  delay: i * 0.08 + 0.05,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Middle shutter slice */}
              <motion.span
                className="absolute inset-0 inline-block text-[8vw] md:text-[6vw] font-black tracking-[-0.04em] leading-none overflow-hidden"
                style={{
                  clipPath: "inset(30% 0 30% 0)",
                  color: "hsl(var(--accent))",
                  mixBlendMode: "screen",
                }}
                initial={{ x: 50, opacity: 0, skewX: 10 }}
                animate={{ x: 0, opacity: 0.5, skewX: 0 }}
                transition={{
                  delay: i * 0.08 + 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Bottom shutter slice */}
              <motion.span
                className="absolute inset-0 inline-block text-[7vw] md:text-[5vw] font-black tracking-[-0.04em] leading-none overflow-hidden"
                style={{
                  clipPath: "inset(70% 0 0 0)",
                  color: "hsl(var(--primary))",
                  mixBlendMode: "screen",
                }}
                initial={{ x: -40, opacity: 0, skewX: -8 }}
                animate={{ x: 0, opacity: 0.6, skewX: 0 }}
                transition={{
                  delay: i * 0.08 + 0.25,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Glitch flash */}
              <motion.span
                className="absolute inset-0 inline-block text-[7vw] md:text-[5vw] font-black tracking-[-0.04em] leading-none overflow-hidden"
                style={{
                  clipPath: "inset(45% 0 45% 0)",
                  color: "hsl(var(--accent))",
                }}
                initial={{ opacity: 0.8, x: -20 }}
                animate={{ opacity: 0, x: 20 }}
                transition={{
                  delay: i * 0.06 + 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
