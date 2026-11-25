/**
 * PlantCare AI logo - a botanical leaf inside a scan ring.
 */
export function LeafLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="PlantCare AI leaf logo"
    >
      <defs>
        <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4caf7d" />
          <stop offset="100%" stopColor="#1e5f43" />
        </linearGradient>
      </defs>
      {/* scan ring */}
      <path
        d="M10 22 V12 a2 2 0 0 1 2-2 H22"
        fill="none"
        stroke="url(#leafGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M42 10 H52 a2 2 0 0 1 2 2 V22"
        fill="none"
        stroke="url(#leafGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M54 42 V52 a2 2 0 0 1-2 2 H42"
        fill="none"
        stroke="url(#leafGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 54 H12 a2 2 0 0 1-2-2 V42"
        fill="none"
        stroke="url(#leafGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* leaf blade */}
      <path
        d="M33 15 C 21 20 15 31 19 40 C 23 49 34 52 41 47 C 48 42 47 28 41 21 C 39 19 36 16 33 15 Z"
        fill="url(#leafGradient)"
      />
      {/* main vein */}
      <path
        d="M33 16 C 32 26 31 34 30 46"
        fill="none"
        stroke="#eaf6ef"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* side veins */}
      <path
        d="M32 22 L 25 26 M32 27 L 27 31 M31 33 L 25 37 M31 33 L 38 38 M32 27 L 39 30"
        fill="none"
        stroke="#eaf6ef"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
