// pattern-selector.tsx
'use client';

import { PatternType, PATTERN_LABELS, renderWallpaperToCanvas } from '@/lib/wallpaper-generator';
import { useEffect, useRef } from 'react';

interface PatternSelectorProps {
  value: PatternType;
  onChange: (pattern: PatternType) => void;
}

const PATTERNS: PatternType[] = [
  'stripes',
  'layered-waves',
  'mountains',
  'organic',
  'circles',
  'layered-arches',
  'gradient-mesh',
  'nebula',
  'fluid-blob',
  'terrain-layers',
  'liquid-blend',
  'plasma-flow',
  'mixed-fluid',
  'sand-dunes',
  'aurora-veil',
];

export default function PatternSelector({ value, onChange }: PatternSelectorProps) {
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  useEffect(() => {
    PATTERNS.forEach(pattern => {
      const render = async () => {
        const canvasEl = canvasRefs.current[pattern];
        if (!canvasEl) return;
        
        const canvas = await renderWallpaperToCanvas(120, 120, {
          pattern,
          palette: 'monochrome',
          isDark: true,
          isReversed: false,
          seed: 42,
          layerCount: 12,
          randomness: 1,
          scale: 1,
          rotation: 0,
          heightAdjustment: 0.6,
        });
        
        const ctx = canvasEl.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, 120, 120);
          ctx.drawImage(canvas, 0, 0);
        }
      };
      render();
    });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {PATTERNS.map(pattern => (
        <button
          key={pattern}
          onClick={() => onChange(pattern)}
          className={`relative rounded-md overflow-hidden border-2 transition-all aspect-square ${
            value === pattern
              ? 'border-black dark:border-white shadow-md'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
          title={PATTERN_LABELS[pattern]}
        >
          <canvas
            ref={el => {
              if (el) canvasRefs.current[pattern] = el;
            }}
            width={120}
            height={120}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity" />
        </button>
      ))}
    </div>
  );
}