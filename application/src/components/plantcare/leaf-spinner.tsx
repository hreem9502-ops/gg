"use client";

import { motion } from "framer-motion";

/**
 * Animated botanical loader used while the AI analyzes the image.
 */
export function LeafSpinner({ size = 64 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="spinnerLeaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4caf7d" />
            <stop offset="100%" stopColor="#1e5f43" />
          </linearGradient>
        </defs>
        <path
          d="M32 8 C 18 15 12 28 16 38 C 20 48 32 52 40 46 C 48 40 47 24 40 16 C 38 13 35 10 32 8 Z"
          fill="url(#spinnerLeaf)"
        />
        <path
          d="M32 10 C 31 22 30 32 29 44"
          stroke="#eaf6ef"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
