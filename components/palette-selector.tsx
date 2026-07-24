'use client';

import { PaletteType, PALETTES } from '@/lib/wallpaper-generator';

interface PaletteSelectorProps {
  value: PaletteType;
  onChange: (palette: PaletteType) => void;
}

// Map to fix the import
const PALETTE_OPTIONS: Record<PaletteType, { name: string; colors: string[] }> = {
  monochrome: {
    name: 'Monochrome',
    colors: ['#000000', '#2a2a2a', '#555555', '#888888', '#bbbbbb', '#e8e8e8', '#ffffff'],
  },
  sunset: {
    name: 'Sunset',
    colors: ['#4a0e4e', '#8b3a62', '#c74a64', '#e87d5c', '#f5a563', '#f5d895', '#fffbe6'],
  },
  emerald: {
    name: 'Emerald',
    colors: ['#000000', '#1a4d2e', '#2d7a4f', '#4a9d6f', '#7ec176', '#b8e8c5', '#e8f7f0'],
  },
  violet: {
    name: 'Violet',
    colors: ['#2d0a5c', '#5c1a9e', '#8b3acd', '#c76aff', '#d68fff', '#e8b3ff', '#f5e6ff'],
  },
  ocean: {
    name: 'Ocean',
    colors: ['#001f3f', '#003d7a', '#0066b3', '#0088cc', '#3399dd', '#66ccff', '#ccf0ff'],
  },
  retro: {
    name: 'Retro',
    colors: ['#8b3a3a', '#d63b3b', '#ff6b6b', '#ffaa5c', '#ffd93d', '#f5ff8d', '#ffffff'],
  },
  aurora: {
    name: 'Aurora',
    colors: ['#0a0e27', '#1a3a52', '#2d5a7b', '#4a85b2', '#7bb4d9', '#afd6f0', '#e8f3ff'],
  },
  forest: {
    name: 'Forest',
    colors: ['#0d1b0f', '#1b3d24', '#2d5a3d', '#4a7d5c', '#6ba87c', '#9bd9a8', '#c5f0d0'],
  },
  berry: {
    name: 'Berry',
    colors: ['#2a0845', '#5a1b7d', '#8b2fb3', '#c74aff', '#e580ff', '#f0b3ff', '#f5e6ff'],
  },
  peach: {
    name: 'Peach',
    colors: ['#5c2a1a', '#8b4a32', '#b85c3d', '#e8845c', '#f5a57d', '#f5c9a8', '#fff0e6'],
  },
  mint: {
    name: 'Mint',
    colors: ['#0d3d2d', '#1a5c4a', '#2d8570', '#4aae99', '#7ddcc9', '#b3f0e6', '#dfffff'],
  },
  lavender: {
    name: 'Lavender',
    colors: ['#2d1b5c', '#5c3a8b', '#8b5acd', '#b88aff', '#d9b3ff', '#ecd9ff', '#f5f0ff'],
  },
  coral: {
    name: 'Coral',
    colors: ['#4a1a1a', '#8b3232', '#c75050', '#ff7070', '#ff9999', '#ffb8b8', '#ffe6e6'],
  },
  slate: {
    name: 'Slate',
    colors: ['#1a1f2e', '#2d3f52', '#4a5f7a', '#6a7f9e', '#8fa3b8', '#b8d0e6', '#dfe8f2'],
  },
};

const PALETTES_LIST: PaletteType[] = ['monochrome', 'sunset', 'emerald', 'violet', 'ocean', 'retro', 'aurora', 'forest', 'berry', 'peach', 'mint', 'lavender', 'coral', 'slate'];

export default function PaletteSelector({ value, onChange }: PaletteSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {PALETTES_LIST.map(palette => {
        const { colors } = PALETTE_OPTIONS[palette];
        return (
          <button
            key={palette}
            onClick={() => onChange(palette)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all h-10 sm:h-12 ${
              value === palette
                ? 'border-black dark:border-white shadow-md'
                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
            }`}
            title={PALETTE_OPTIONS[palette].name}
          >
            <div className="flex h-full">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
