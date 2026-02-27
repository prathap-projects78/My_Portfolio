"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface HeroTextProps {
  text?: string;
  className?: string;
}

export default function HeroText({
  text = "IMMERSE",
  className = "",
}: HeroTextProps) {
  const [count, setCount] = useState(0);
  const characters = text.split("");

  return (
    <div className={cn("relative flex items-center justify-center w-full h-full overflow-hidden", className)}>
      {/* Immersive Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Text Container */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            {characters.map((char, i) => (
              <motion.div
                key={i}
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
              >
                {/* Main Character */}
                <motion.span
                  className="inline-block text-[8vw] font-black tracking-tighter text-foreground select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.3, duration: 0.3 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>

                {/* Top Slice Layer */}
                <motion.span
                  className="absolute inset-0 inline-block text-[8vw] font-black tracking-tighter text-foreground/80 select-none overflow-hidden"
                  style={{ clipPath: "inset(0 0 66% 0)" }}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  {char}
                </motion.span>

                {/* Middle Slice Layer */}
                <motion.span
                  className="absolute inset-0 inline-block text-[8vw] font-black tracking-tighter text-foreground/60 select-none overflow-hidden"
                  style={{ clipPath: "inset(33% 0 33% 0)" }}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  {char}
                </motion.span>

                {/* Bottom Slice Layer */}
                <motion.span
                  className="absolute inset-0 inline-block text-[8vw] font-black tracking-tighter text-foreground/40 select-none overflow-hidden"
                  style={{ clipPath: "inset(66% 0 0 0)" }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.3, duration: 0.5, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating UI Controls */}
      <div className="absolute bottom-8 flex flex-col items-center gap-3 z-20">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl transition-colors duration-300"
        >
          <RefreshCw size={20} />
        </button>
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Click to re-shutter
        </span>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-foreground/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-foreground/20" />
    </div>
  );
}
