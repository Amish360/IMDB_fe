import React from 'react';

const PALETTES = [
  'from-amber-500/30 via-slate-800 to-slate-900',
  'from-indigo-500/30 via-slate-800 to-slate-900',
  'from-rose-500/30 via-slate-800 to-slate-900',
  'from-emerald-500/30 via-slate-800 to-slate-900',
  'from-sky-500/30 via-slate-800 to-slate-900',
];

const hashToIndex = (str, mod) => {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 997;
  }
  return Math.abs(hash) % mod;
};

const PosterPlaceholder = ({ title, seed, className = '' }) => {
  const palette = PALETTES[hashToIndex(seed || title || '', PALETTES.length)];

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${palette} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-1/3 w-1/3 text-white/40"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M7 3v18M17 3v18M2 8h5M17 8h5M2 16h5M17 16h5" />
      </svg>
    </div>
  );
};

export default PosterPlaceholder;
