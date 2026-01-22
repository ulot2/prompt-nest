"use client";

import { motion } from "motion/react";

export const PixelGridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none dark:block hidden">
      {/* Layer 1: Dark navy base */}
      <div className="absolute inset-0 bg-[#050810]" />

      {/* Layer 2: Ambient glow blobs */}
      <motion.div
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-radial from-blue-600/20 via-blue-900/10 to-transparent rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-gradient-radial from-purple-600/20 via-purple-900/10 to-transparent rounded-full blur-[140px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-600/15 via-indigo-900/5 to-transparent rounded-full blur-[100px]"
      />

      {/* Layer 3: Perspective grid */}
      <div className="absolute inset-0 opacity-[0.15] perspective-grid" />

      {/* Vertical grid lines (fade effect) */}
      <div className="absolute inset-0 opacity-[0.08] vertical-grid-lines" />

      {/* Layer 4: Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay noise-overlay" />

      {/* Edge vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Top/bottom gradient fade for content blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050810] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050810] to-transparent" />
    </div>
  );
};
