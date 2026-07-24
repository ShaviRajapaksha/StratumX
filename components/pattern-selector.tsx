// pattern-selector.tsx - Updated with new patterns
'use client';

import { PatternType, renderWallpaperToCanvas } from '@/lib/wallpaper-generator';
import { useEffect, useRef, useState } from 'react';

interface PatternSelectorProps {
  value: PatternType;
  onChange: (pattern: PatternType) => void;
}

const PATTERNS: PatternType[] = [
  'stripes',           // 1st - Stripes (kept)
  'layered-waves',     // 2nd - Layered Waves (new)
  'mountains',         // 3rd - Mountains (kept)
  'organic',           // 4th - Organic (kept)
  'circles',           // 5th - Circles (kept)
  'layered-arches',    // 6th - Layered Arches (new)
  'geometric',         // 7th - Geometric (new)
  'gradient-mesh',     // 8th - Gradient Mesh (new)
  'topographic',       // 9th - Topographic (new)
  'fluid-blob',        // 10th - Fluid Blob (new)
  'stripes-bottom',    // Bottom-aligned stripes
  'circles-bottom',    // Bottom-aligned circles
];

const PATTERN_LABELS: Record<PatternType, string> = {
  stripes: 'Stripes',
  'layered-waves': 'Layered Waves',
  mountains: 'Mountains',
  organic: 'Organic',
  circles: 'Circles',
  'layered-arches': 'Layered Arches',
  geometric: 'Geometric',
  'gradient-mesh': 'Gradient Mesh',
  topographic: 'Topographic',
  'fluid-blob': 'Fluid Blob',
  'stripes-bottom': 'Stripes Bottom',
  'circles-bottom': 'Circles Bottom',
};

export default function PatternSelector({ value, onChange }: PatternSelectorProps) {
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  useEffect(() => {
    PATTERNS.forEach(pattern => {
      const render = async () => {
        const canvasEl = canvasRefs.current[pattern];
        if (!canvasEl) return;
        
        const canvas = await renderWallpaperToCanvas(120, 120, {
          pattern,
          palette: 'emerald',
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
          ctx.drawImage(canvas, 0, 0);
        }
      };
      render();
    });
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {PATTERNS.map(pattern => (
        <button
          key={pattern}
          onClick={() => onChange(pattern)}
          className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-square ${
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
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
      ))}
    </div>
  );
}