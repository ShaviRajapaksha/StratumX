// wallpaper-generator.ts - Fixed height adjustment
export type PatternType = 
  | 'stripes' 
  | 'layered-waves' 
  | 'mountains' 
  | 'organic' 
  | 'circles' 
  | 'layered-arches'
  | 'geometric'
  | 'gradient-mesh'
  | 'topographic'
  | 'fluid-blob'
  | 'stripes-bottom'
  | 'circles-bottom';

export type PaletteType = 'monochrome' | 'sunset' | 'emerald' | 'violet' | 'ocean' | 'retro' | 'aurora' | 'forest' | 'berry' | 'peach' | 'mint' | 'lavender' | 'coral' | 'slate';

export interface WallpaperConfig {
  pattern: PatternType;
  palette: PaletteType;
  isDark: boolean;
  isReversed: boolean;
  seed: number;
  layerCount: number;
  randomness: number;
  scale: number;
  rotation: number;
  heightAdjustment: number; // 0-1, controls how much space design takes vs depth color
}

// Color palettes
export const PALETTES: Record<PaletteType, string[]> = {
  monochrome: ['#000000', '#2a2a2a', '#555555', '#888888', '#bbbbbb', '#e8e8e8', '#ffffff'],
  sunset: ['#4a0e4e', '#8b3a62', '#c74a64', '#e87d5c', '#f5a563', '#f5d895', '#fffbe6'],
  emerald: ['#000000', '#1a4d2e', '#2d7a4f', '#4a9d6f', '#7ec176', '#b8e8c5', '#e8f7f0'],
  violet: ['#2d0a5c', '#5c1a9e', '#8b3acd', '#c76aff', '#d68fff', '#e8b3ff', '#f5e6ff'],
  ocean: ['#001f3f', '#003d7a', '#0066b3', '#0088cc', '#3399dd', '#66ccff', '#ccf0ff'],
  retro: ['#8b3a3a', '#d63b3b', '#ff6b6b', '#ffaa5c', '#ffd93d', '#f5ff8d', '#ffffff'],
  aurora: ['#0a0e27', '#1a3a52', '#2d5a7b', '#4a85b2', '#7bb4d9', '#afd6f0', '#e8f3ff'],
  forest: ['#0d1b0f', '#1b3d24', '#2d5a3d', '#4a7d5c', '#6ba87c', '#9bd9a8', '#c5f0d0'],
  berry: ['#2a0845', '#5a1b7d', '#8b2fb3', '#c74aff', '#e580ff', '#f0b3ff', '#f5e6ff'],
  peach: ['#5c2a1a', '#8b4a32', '#b85c3d', '#e8845c', '#f5a57d', '#f5c9a8', '#fff0e6'],
  mint: ['#0d3d2d', '#1a5c4a', '#2d8570', '#4aae99', '#7ddcc9', '#b3f0e6', '#dfffff'],
  lavender: ['#2d1b5c', '#5c3a8b', '#8b5acd', '#b88aff', '#d9b3ff', '#ecd9ff', '#f5f0ff'],
  coral: ['#4a1a1a', '#8b3232', '#c75050', '#ff7070', '#ff9999', '#ffb8b8', '#ffe6e6'],
  slate: ['#1a1f2e', '#2d3f52', '#4a5f7a', '#6a7f9e', '#8fa3b8', '#b8d0e6', '#dfe8f2'],
};

// Pseudo-random number generator (seeded)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Improved noise function
function noise2D(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
}

// Interpolation function
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Smooth interpolation
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

// Perlin-like noise
function perlinNoise(x: number, y: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const n00 = noise2D(xi, yi, seed);
  const n10 = noise2D(xi + 1, yi, seed);
  const n01 = noise2D(xi, yi + 1, seed);
  const n11 = noise2D(xi + 1, yi + 1, seed);

  const u = smoothstep(xf);
  const v = smoothstep(yf);

  const nx0 = lerp(n00, n10, u);
  const nx1 = lerp(n01, n11, u);
  return lerp(nx0, nx1, v);
}

// Hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

// RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Interpolate color
function interpolateColor(color1: string, color2: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = lerp(r1, r2, t);
  const g = lerp(g1, g2, t);
  const b = lerp(b1, b2, t);
  return rgbToHex(r, g, b);
}

// Get color for layer
function getLayerColor(palette: string[], layerIndex: number, totalLayers: number, isReversed: boolean = false): string {
  let t = layerIndex / (totalLayers - 1);
  if (isReversed) t = 1 - t;
  
  const paletteIndex = t * (palette.length - 1);
  const color1Index = Math.floor(paletteIndex);
  const color2Index = Math.ceil(paletteIndex);
  const colorT = paletteIndex - color1Index;
  
  if (color1Index === color2Index) {
    return palette[color1Index];
  }
  
  return interpolateColor(palette[color1Index], palette[color2Index], colorT);
}

export function generateWallpaperSVG(
  width: number,
  height: number,
  config: WallpaperConfig
): string {
  const palette = PALETTES[config.palette];
  const isBottomAligned = config.pattern.includes('-bottom');
  const basePattern = config.pattern.replace('-bottom', '') as PatternType;
  const heightAdjustment = config.heightAdjustment || 0.6; // Default 60% for design, 40% for depth
  
  const layers = config.layerCount || 12;
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Determine background color based on depth
  let bgColor: string;
  if (isBottomAligned) {
    if (config.isReversed) {
      bgColor = config.isDark ? palette[0] : palette[palette.length - 1];
    } else {
      bgColor = config.isDark ? palette[palette.length - 1] : palette[0];
    }
  } else {
    bgColor = getLayerColor(palette, 0, layers, config.isReversed);
  }
  
  svg += `<rect width="${width}" height="${height}" fill="${bgColor}"/>`;
  
  const waveAmp = seededRandom(config.seed + 1) * 0.3 + 0.1;
  
  // Handle different pattern types
  if (basePattern === 'stripes') {
    // Stripes pattern - simple horizontal bands
    for (let i = 0; i < layers; i++) {
      const yBase = (i / layers) * height;
      const color = getLayerColor(palette, i, layers, config.isReversed);
      const yEnd = (i + 1) / layers * height;
      svg += `<rect x="0" y="${yBase}" width="${width}" height="${yEnd - yBase}" fill="${color}"/>`;
    }
  } else if (basePattern === 'layered-waves') {
    // Layered Waves - smooth overlapping waves
    const waveHeight = height * 0.3;
    const waveCount = config.layerCount || 8;
    
    for (let i = 0; i < waveCount; i++) {
      const t = i / waveCount;
      const color = getLayerColor(palette, i, waveCount, config.isReversed);
      const yOffset = t * height * 0.8 + height * 0.1;
      const amplitude = waveHeight * (0.3 + t * 0.7) * config.scale;
      const frequency = 2 + t * 3;
      const phase = i * 0.5 + config.seed;
      
      svg += `<path d="`;
      svg += `M 0,${yOffset + amplitude * 0.5} `;
      
      for (let x = 0; x <= width; x += width / 100) {
        const noise = perlinNoise(x / width * frequency, phase, config.seed + i);
        const offset = Math.sin(x / width * frequency * Math.PI * 2 + phase) * amplitude * 0.5 + noise * amplitude * 0.3 * config.randomness;
        svg += `L ${x},${yOffset + offset} `;
      }
      
      svg += `L ${width},${height} L 0,${height} Z" fill="${color}" opacity="${0.7 + t * 0.3}"/>`;
    }
  } else if (basePattern === 'layered-arches') {
    // Layered Arches - nested arches/rainbows
    const archCount = config.layerCount || 8;
    const maxArchHeight = height * 0.9;
    const minArchHeight = height * 0.1;
    const centerX = width / 2;
    
    for (let i = archCount - 1; i >= 0; i--) {
      const t = i / archCount;
      const color = getLayerColor(palette, i, archCount, config.isReversed);
      const archHeight = minArchHeight + t * maxArchHeight * config.scale;
      const archWidth = archHeight * 1.2;
      const yBase = height * (0.9 - t * 0.8);
      
      const xStart = centerX - archWidth;
      const xEnd = centerX + archWidth;
      
      svg += `<path d="`;
      svg += `M ${xStart},${yBase} `;
      
      // Arc using bezier curves for smooth arches
      const cp1x = centerX - archWidth * 0.8;
      const cp1y = yBase - archHeight * 0.9;
      const cp2x = centerX + archWidth * 0.8;
      const cp2y = yBase - archHeight * 0.9;
      
      svg += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${xEnd},${yBase} `;
      svg += `L ${xEnd},${height} L ${xStart},${height} Z" fill="${color}" opacity="${0.6 + t * 0.4}"/>`;
    }
  } else if (basePattern === 'mountains') {
    // Mountain Landscape
    const mountainCount = config.layerCount || 6;
    
    for (let i = 0; i < mountainCount; i++) {
      const t = i / mountainCount;
      const color = getLayerColor(palette, i, mountainCount, config.isReversed);
      const yBase = height * (0.3 + t * 0.5);
      const peakHeight = height * (0.2 + (1 - t) * 0.4) * config.scale;
      const peakCount = Math.floor(3 + t * 5);
      
      svg += `<path d="`;
      svg += `M 0,${yBase + peakHeight * 0.2} `;
      
      for (let j = 0; j <= peakCount; j++) {
        const x = (j / peakCount) * width;
        const noiseVal = perlinNoise(x / width * 5, i * 2, config.seed + 100);
        const peakOffset = (noiseVal - 0.5) * 0.6 * (1 - t) * peakHeight;
        const peakX = x + (noiseVal - 0.5) * width * 0.1;
        const peakY = yBase - peakHeight * (0.3 + 0.7 * (1 - t) * (0.5 + 0.5 * Math.abs(noiseVal))) + peakOffset;
        
        if (j === 0) {
          svg += `L ${peakX},${peakY} `;
        } else {
          const prevX = ((j - 1) / peakCount) * width;
          const midX = (prevX + peakX) / 2;
          const midY = yBase - peakHeight * (0.1 + 0.3 * (1 - t));
          svg += `Q ${midX},${midY} ${peakX},${peakY} `;
        }
      }
      
      svg += `L ${width},${height} L 0,${height} Z" fill="${color}" opacity="${0.7 + t * 0.3}"/>`;
    }
  } else if (basePattern === 'organic') {
    // Organic fluid blobs
    const blobCount = config.layerCount || 8;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const centerX = (0.2 + t * 0.6) * width + (seededRandom(config.seed + i * 3) - 0.5) * width * 0.2;
      const centerY = (0.2 + t * 0.6) * height + (seededRandom(config.seed + i * 7) - 0.5) * height * 0.2;
      const size = (0.1 + t * 0.4) * Math.min(width, height) * config.scale * 0.5;
      const points = 12 + Math.floor(t * 12);
      
      svg += `<path d="`;
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const radiusNoise = perlinNoise(Math.cos(angle) * 2 + i, Math.sin(angle) * 2 + i, config.seed + 50);
        const radius = size * (0.7 + 0.3 * Math.abs(radiusNoise)) * (1 + config.randomness * 0.2);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (j === 0) {
          svg += `M ${x},${y} `;
        } else {
          const prevAngle = ((j - 1) / points) * Math.PI * 2;
          const prevRadius = size * (0.7 + 0.3 * Math.abs(perlinNoise(Math.cos(prevAngle) * 2 + i, Math.sin(prevAngle) * 2 + i, config.seed + 50)));
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          const cpX = centerX + Math.cos((prevAngle + angle) / 2) * (prevRadius + radius) * 0.5;
          const cpY = centerY + Math.sin((prevAngle + angle) / 2) * (prevRadius + radius) * 0.5;
          svg += `Q ${cpX},${cpY} ${x},${y} `;
        }
      }
      svg += `Z" fill="${color}" opacity="${0.4 + t * 0.6}"/>`;
    }
  } else if (basePattern === 'circles') {
    // Circular pattern
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.5;
    
    for (let i = layers - 1; i >= 0; i--) {
      const t = i / layers;
      const radius = t * maxRadius * config.scale;
      const noiseVal = perlinNoise(t * 3, config.seed, config.seed);
      const waveOffset = noiseVal * waveAmp * 0.15 * maxRadius * config.randomness;
      const finalRadius = Math.max(0, radius + waveOffset);
      
      const color = getLayerColor(palette, i, layers, config.isReversed);
      svg += `<circle cx="${centerX}" cy="${centerY}" r="${finalRadius}" fill="${color}" stroke="none"/>`;
    }
  } else if (basePattern === 'geometric') {
    // Geometric patterns
    const shapeCount = config.layerCount || 12;
    const shapes = ['rect', 'circle', 'triangle', 'polygon'];
    
    for (let i = 0; i < shapeCount; i++) {
      const t = i / shapeCount;
      const color = getLayerColor(palette, i, shapeCount, config.isReversed);
      const size = (0.05 + t * 0.3) * Math.min(width, height) * config.scale;
      const x = (seededRandom(config.seed + i * 5) * 0.6 + 0.2) * width;
      const y = (seededRandom(config.seed + i * 13) * 0.6 + 0.2) * height;
      const rotation = (seededRandom(config.seed + i * 7) * 360 + config.rotation) % 360;
      const shape = shapes[Math.floor(seededRandom(config.seed + i * 11) * shapes.length)];
      
      svg += `<g transform="translate(${x},${y}) rotate(${rotation})">`;
      
      if (shape === 'rect') {
        const w = size * (0.5 + seededRandom(config.seed + i * 3) * 0.5);
        const h = size * (0.5 + seededRandom(config.seed + i * 17) * 0.5);
        const rx = size * 0.1 * seededRandom(config.seed + i * 23);
        svg += `<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${rx}" fill="${color}" opacity="${0.3 + t * 0.7}"/>`;
      } else if (shape === 'circle') {
        const r = size * 0.4;
        svg += `<circle cx="0" cy="0" r="${r}" fill="${color}" opacity="${0.3 + t * 0.7}"/>`;
      } else if (shape === 'triangle') {
        svg += `<polygon points="0,${-size * 0.4} ${size * 0.4},${size * 0.4} ${-size * 0.4},${size * 0.4}" fill="${color}" opacity="${0.3 + t * 0.7}"/>`;
      } else if (shape === 'polygon') {
        const sides = 5 + Math.floor(seededRandom(config.seed + i * 31) * 5);
        let points = '';
        for (let j = 0; j < sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const r = size * 0.4 * (0.8 + 0.2 * seededRandom(config.seed + i * 37 + j));
          points += `${Math.cos(angle) * r},${Math.sin(angle) * r} `;
        }
        svg += `<polygon points="${points}" fill="${color}" opacity="${0.3 + t * 0.7}"/>`;
      }
      
      svg += `</g>`;
    }
  } else if (basePattern === 'gradient-mesh') {
    // Gradient Mesh - smooth color blobs
    const blobCount = config.layerCount || 10;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const x = (seededRandom(config.seed + i * 7) * 0.8 + 0.1) * width;
      const y = (seededRandom(config.seed + i * 13) * 0.8 + 0.1) * height;
      const radius = (0.1 + t * 0.3) * Math.min(width, height) * config.scale;
      
      // Create radial gradient
      const gradId = `grad-${i}`;
      svg += `<defs><radialGradient id="${gradId}">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient></defs>`;
      
      svg += `<circle cx="${x}" cy="${y}" r="${radius}" fill="url(#${gradId})" opacity="${0.3 + t * 0.7}"/>`;
    }
  } else if (basePattern === 'topographic') {
    // Topographic contour lines
    const contourCount = config.layerCount || 8;
    
    for (let i = 0; i < contourCount; i++) {
      const t = i / contourCount;
      const color = getLayerColor(palette, i, contourCount, config.isReversed);
      
      svg += `<path d="`;
      let first = true;
      const points = 60;
      
      for (let j = 0; j <= points; j++) {
        const u = j / points;
        const x = u * width;
        let y = 0;
        
        for (let k = 0; k < 3; k++) {
          const freq = 2 + k * 2 + t * 2;
          const amp = (0.1 + t * 0.3) * height * config.scale;
          const phase = config.seed + i * 10 + k * 7;
          const noise = perlinNoise(x / width * freq * 2 + i, t * 3 + k, phase);
          y += Math.sin(x / width * freq * Math.PI * 2 + phase) * amp * 0.3 + noise * amp * 0.3 * config.randomness;
        }
        
        y = height * (0.1 + t * 0.8) + y * 0.5;
        
        if (first) {
          svg += `M ${x},${y} `;
          first = false;
        } else {
          svg += `L ${x},${y} `;
        }
      }
      
      svg += `" fill="none" stroke="${color}" stroke-width="${1 + t * 3}" opacity="${0.3 + t * 0.7}"/>`;
    }
  } else if (basePattern === 'fluid-blob') {
    // Fluid Blob - organic overlapping blobs
    const blobCount = config.layerCount || 8;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const centerX = (0.1 + t * 0.8) * width + (seededRandom(config.seed + i * 5) - 0.5) * width * 0.2;
      const centerY = (0.1 + t * 0.8) * height + (seededRandom(config.seed + i * 13) - 0.5) * height * 0.2;
      const size = (0.1 + t * 0.4) * Math.min(width, height) * config.scale;
      const points = 16 + Math.floor(t * 16);
      
      svg += `<path d="`;
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const noise1 = perlinNoise(Math.cos(angle) * 3 + i * 2, Math.sin(angle) * 3 + i * 2, config.seed + 100);
        const noise2 = perlinNoise(Math.cos(angle) * 5 + i * 3, Math.sin(angle) * 5 + i * 3, config.seed + 200);
        const radius = size * (0.6 + 0.4 * Math.abs(noise1 + noise2 * 0.3)) * (1 + config.randomness * 0.1);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (j === 0) {
          svg += `M ${x},${y} `;
        } else {
          const prevAngle = ((j - 1) / points) * Math.PI * 2;
          const prevNoise1 = perlinNoise(Math.cos(prevAngle) * 3 + i * 2, Math.sin(prevAngle) * 3 + i * 2, config.seed + 100);
          const prevNoise2 = perlinNoise(Math.cos(prevAngle) * 5 + i * 3, Math.sin(prevAngle) * 5 + i * 3, config.seed + 200);
          const prevRadius = size * (0.6 + 0.4 * Math.abs(prevNoise1 + prevNoise2 * 0.3)) * (1 + config.randomness * 0.1);
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          
          const cpX = (prevX + x) / 2 + (seededRandom(config.seed + i * 7 + j) - 0.5) * size * 0.2;
          const cpY = (prevY + y) / 2 + (seededRandom(config.seed + i * 11 + j) - 0.5) * size * 0.2;
          svg += `Q ${cpX},${cpY} ${x},${y} `;
        }
      }
      svg += `Z" fill="${color}" opacity="${0.3 + t * 0.7}"/>`;
    }
  } else if (isBottomAligned) {
    // Bottom-aligned patterns - FIXED to use heightAdjustment properly
    const patternStartY = height * (1 - heightAdjustment);
    const patternHeight = height * heightAdjustment;
    const patternLayers = Math.max(2, Math.ceil(layers * heightAdjustment));
    const bottomLayerHeight = patternHeight / patternLayers;
    
    if (basePattern.includes('stripes')) {
      for (let i = 0; i < patternLayers; i++) {
        const yBase = patternStartY + (i / patternLayers) * patternHeight;
        const color = getLayerColor(palette, i, patternLayers, config.isReversed);
        const yEnd = patternStartY + ((i + 1) / patternLayers) * patternHeight;
        svg += `<rect x="0" y="${yBase}" width="${width}" height="${yEnd - yBase}" fill="${color}"/>`;
      }
    } else if (basePattern.includes('circles')) {
      // Circles at bottom - expanded to cover desktop width
      const centerX = width / 2;
      const centerY = height;
      const maxRadius = Math.max(width, height) * 0.8 * config.scale;
      const gapFactor = config.randomness > 0 ? 1 + config.randomness * 0.3 : 1;
      
      for (let i = patternLayers - 1; i >= 0; i--) {
        const t = i / patternLayers;
        const baseRadius = t * maxRadius * gapFactor;
        const noiseVal = perlinNoise(t * 3, config.seed, config.seed);
        const waveOffset = noiseVal * waveAmp * 0.15 * maxRadius * config.randomness;
        const finalRadius = Math.max(0, baseRadius + waveOffset);
        
        const color = getLayerColor(palette, i, patternLayers, config.isReversed);
        svg += `<circle cx="${centerX}" cy="${centerY}" r="${finalRadius}" fill="${color}" stroke="none"/>`;
      }
    }
  }
  
  svg += '</svg>';
  return svg;
}

export async function renderWallpaperToCanvas(
  width: number,
  height: number,
  config: WallpaperConfig
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  const palette = PALETTES[config.palette];
  const isBottomAligned = config.pattern.endsWith('-bottom');
  const basePattern = (isBottomAligned ? config.pattern.slice(0, -7) : config.pattern) as PatternType;
  const heightAdjustment = config.heightAdjustment || 0.6;
  
  const layers = config.layerCount || 12;
  
  // Fill background
  let bgColor: string;
  if (isBottomAligned) {
    if (config.isReversed) {
      bgColor = config.isDark ? palette[0] : palette[palette.length - 1];
    } else {
      bgColor = config.isDark ? palette[palette.length - 1] : palette[0];
    }
  } else {
    bgColor = getLayerColor(palette, 0, layers, config.isReversed);
  }
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  const waveAmp = (seededRandom(config.seed + 1) * 0.3 + 0.1) * (config.randomness || 1);
  
  // Handle different pattern types
  if (basePattern === 'stripes') {
    for (let i = 0; i < layers; i++) {
      const yBase = (i / layers) * height;
      const color = getLayerColor(palette, i, layers, config.isReversed);
      const yEnd = (i + 1) / layers * height;
      ctx.fillStyle = color;
      ctx.fillRect(0, yBase, width, yEnd - yBase);
    }
  } else if (basePattern === 'layered-waves') {
    const waveHeight = height * 0.3;
    const waveCount = config.layerCount || 8;
    
    for (let i = 0; i < waveCount; i++) {
      const t = i / waveCount;
      const color = getLayerColor(palette, i, waveCount, config.isReversed);
      const yOffset = t * height * 0.8 + height * 0.1;
      const amplitude = waveHeight * (0.3 + t * 0.7) * config.scale;
      const frequency = 2 + t * 3;
      const phase = i * 0.5 + config.seed;
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7 + t * 0.3;
      ctx.beginPath();
      ctx.moveTo(0, yOffset + amplitude * 0.5);
      
      for (let x = 0; x <= width; x += width / 100) {
        const noise = perlinNoise(x / width * frequency, phase, config.seed + i);
        const offset = Math.sin(x / width * frequency * Math.PI * 2 + phase) * amplitude * 0.5 + noise * amplitude * 0.3 * config.randomness;
        ctx.lineTo(x, yOffset + offset);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'layered-arches') {
    const archCount = config.layerCount || 8;
    const maxArchHeight = height * 0.9;
    const minArchHeight = height * 0.1;
    const centerX = width / 2;
    
    for (let i = archCount - 1; i >= 0; i--) {
      const t = i / archCount;
      const color = getLayerColor(palette, i, archCount, config.isReversed);
      const archHeight = minArchHeight + t * maxArchHeight * config.scale;
      const archWidth = archHeight * 1.2;
      const yBase = height * (0.9 - t * 0.8);
      
      const xStart = centerX - archWidth;
      const xEnd = centerX + archWidth;
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6 + t * 0.4;
      ctx.beginPath();
      ctx.moveTo(xStart, yBase);
      
      const cp1x = centerX - archWidth * 0.8;
      const cp1y = yBase - archHeight * 0.9;
      const cp2x = centerX + archWidth * 0.8;
      const cp2y = yBase - archHeight * 0.9;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, xEnd, yBase);
      ctx.lineTo(xEnd, height);
      ctx.lineTo(xStart, height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'mountains') {
    const mountainCount = config.layerCount || 6;
    
    for (let i = 0; i < mountainCount; i++) {
      const t = i / mountainCount;
      const color = getLayerColor(palette, i, mountainCount, config.isReversed);
      const yBase = height * (0.3 + t * 0.5);
      const peakHeight = height * (0.2 + (1 - t) * 0.4) * config.scale;
      const peakCount = Math.floor(3 + t * 5);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7 + t * 0.3;
      ctx.beginPath();
      ctx.moveTo(0, yBase + peakHeight * 0.2);
      
      for (let j = 0; j <= peakCount; j++) {
        const x = (j / peakCount) * width;
        const noiseVal = perlinNoise(x / width * 5, i * 2, config.seed + 100);
        const peakOffset = (noiseVal - 0.5) * 0.6 * (1 - t) * peakHeight;
        const peakX = x + (noiseVal - 0.5) * width * 0.1;
        const peakY = yBase - peakHeight * (0.3 + 0.7 * (1 - t) * (0.5 + 0.5 * Math.abs(noiseVal))) + peakOffset;
        
        if (j === 0) {
          ctx.lineTo(peakX, peakY);
        } else {
          const prevX = ((j - 1) / peakCount) * width;
          const midX = (prevX + peakX) / 2;
          const midY = yBase - peakHeight * (0.1 + 0.3 * (1 - t));
          ctx.quadraticCurveTo(midX, midY, peakX, peakY);
        }
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'organic') {
    const blobCount = config.layerCount || 8;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const centerX = (0.2 + t * 0.6) * width + (seededRandom(config.seed + i * 3) - 0.5) * width * 0.2;
      const centerY = (0.2 + t * 0.6) * height + (seededRandom(config.seed + i * 7) - 0.5) * height * 0.2;
      const size = (0.1 + t * 0.4) * Math.min(width, height) * config.scale * 0.5;
      const points = 12 + Math.floor(t * 12);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.4 + t * 0.6;
      ctx.beginPath();
      
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const radiusNoise = perlinNoise(Math.cos(angle) * 2 + i, Math.sin(angle) * 2 + i, config.seed + 50);
        const radius = size * (0.7 + 0.3 * Math.abs(radiusNoise)) * (1 + config.randomness * 0.2);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = ((j - 1) / points) * Math.PI * 2;
          const prevRadius = size * (0.7 + 0.3 * Math.abs(perlinNoise(Math.cos(prevAngle) * 2 + i, Math.sin(prevAngle) * 2 + i, config.seed + 50)));
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          const cpX = centerX + Math.cos((prevAngle + angle) / 2) * (prevRadius + radius) * 0.5;
          const cpY = centerY + Math.sin((prevAngle + angle) / 2) * (prevRadius + radius) * 0.5;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'circles') {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.5;
    
    for (let i = layers - 1; i >= 0; i--) {
      const t = i / layers;
      const radius = t * maxRadius * config.scale;
      const noiseVal = perlinNoise(t * 3, config.seed, config.seed);
      const waveOffset = noiseVal * waveAmp * 0.15 * maxRadius * config.randomness;
      const finalRadius = Math.max(0, radius + waveOffset);
      
      const color = getLayerColor(palette, i, layers, config.isReversed);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, finalRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (basePattern === 'geometric') {
    const shapeCount = config.layerCount || 12;
    const shapes = ['rect', 'circle', 'triangle', 'polygon'];
    
    for (let i = 0; i < shapeCount; i++) {
      const t = i / shapeCount;
      const color = getLayerColor(palette, i, shapeCount, config.isReversed);
      const size = (0.05 + t * 0.3) * Math.min(width, height) * config.scale;
      const x = (seededRandom(config.seed + i * 5) * 0.6 + 0.2) * width;
      const y = (seededRandom(config.seed + i * 13) * 0.6 + 0.2) * height;
      const rotation = (seededRandom(config.seed + i * 7) * 360 + config.rotation) % 360;
      const shape = shapes[Math.floor(seededRandom(config.seed + i * 11) * shapes.length)];
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3 + t * 0.7;
      
      if (shape === 'rect') {
        const w = size * (0.5 + seededRandom(config.seed + i * 3) * 0.5);
        const h = size * (0.5 + seededRandom(config.seed + i * 17) * 0.5);
        const rx = size * 0.1 * seededRandom(config.seed + i * 23);
        ctx.beginPath();
        ctx.roundRect(-w/2, -h/2, w, h, rx);
        ctx.fill();
      } else if (shape === 'circle') {
        const r = size * 0.4;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.4);
        ctx.lineTo(size * 0.4, size * 0.4);
        ctx.lineTo(-size * 0.4, size * 0.4);
        ctx.closePath();
        ctx.fill();
      } else if (shape === 'polygon') {
        const sides = 5 + Math.floor(seededRandom(config.seed + i * 31) * 5);
        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const r = size * 0.4 * (0.8 + 0.2 * seededRandom(config.seed + i * 37 + j));
          if (j === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  } else if (basePattern === 'gradient-mesh') {
    const blobCount = config.layerCount || 10;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const x = (seededRandom(config.seed + i * 7) * 0.8 + 0.1) * width;
      const y = (seededRandom(config.seed + i * 13) * 0.8 + 0.1) * height;
      const radius = (0.1 + t * 0.3) * Math.min(width, height) * config.scale;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '00');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.3 + t * 0.7;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'topographic') {
    const contourCount = config.layerCount || 8;
    
    for (let i = 0; i < contourCount; i++) {
      const t = i / contourCount;
      const color = getLayerColor(palette, i, contourCount, config.isReversed);
      
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.3 + t * 0.7;
      ctx.lineWidth = 1 + t * 3;
      ctx.beginPath();
      
      let first = true;
      const points = 60;
      
      for (let j = 0; j <= points; j++) {
        const u = j / points;
        const x = u * width;
        let y = 0;
        
        for (let k = 0; k < 3; k++) {
          const freq = 2 + k * 2 + t * 2;
          const amp = (0.1 + t * 0.3) * height * config.scale;
          const phase = config.seed + i * 10 + k * 7;
          const noise = perlinNoise(x / width * freq * 2 + i, t * 3 + k, phase);
          y += Math.sin(x / width * freq * Math.PI * 2 + phase) * amp * 0.3 + noise * amp * 0.3 * config.randomness;
        }
        
        y = height * (0.1 + t * 0.8) + y * 0.5;
        
        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  } else if (basePattern === 'fluid-blob') {
    const blobCount = config.layerCount || 8;
    
    for (let i = 0; i < blobCount; i++) {
      const t = i / blobCount;
      const color = getLayerColor(palette, i, blobCount, config.isReversed);
      const centerX = (0.1 + t * 0.8) * width + (seededRandom(config.seed + i * 5) - 0.5) * width * 0.2;
      const centerY = (0.1 + t * 0.8) * height + (seededRandom(config.seed + i * 13) - 0.5) * height * 0.2;
      const size = (0.1 + t * 0.4) * Math.min(width, height) * config.scale;
      const points = 16 + Math.floor(t * 16);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3 + t * 0.7;
      ctx.beginPath();
      
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const noise1 = perlinNoise(Math.cos(angle) * 3 + i * 2, Math.sin(angle) * 3 + i * 2, config.seed + 100);
        const noise2 = perlinNoise(Math.cos(angle) * 5 + i * 3, Math.sin(angle) * 5 + i * 3, config.seed + 200);
        const radius = size * (0.6 + 0.4 * Math.abs(noise1 + noise2 * 0.3)) * (1 + config.randomness * 0.1);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = ((j - 1) / points) * Math.PI * 2;
          const prevNoise1 = perlinNoise(Math.cos(prevAngle) * 3 + i * 2, Math.sin(prevAngle) * 3 + i * 2, config.seed + 100);
          const prevNoise2 = perlinNoise(Math.cos(prevAngle) * 5 + i * 3, Math.sin(prevAngle) * 5 + i * 3, config.seed + 200);
          const prevRadius = size * (0.6 + 0.4 * Math.abs(prevNoise1 + prevNoise2 * 0.3)) * (1 + config.randomness * 0.1);
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          
          const cpX = (prevX + x) / 2 + (seededRandom(config.seed + i * 7 + j) - 0.5) * size * 0.2;
          const cpY = (prevY + y) / 2 + (seededRandom(config.seed + i * 11 + j) - 0.5) * size * 0.2;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  } else if (isBottomAligned) {
    // Bottom-aligned patterns - FIXED to use heightAdjustment properly
    const patternStartY = height * (1 - heightAdjustment);
    const patternHeight = height * heightAdjustment;
    const patternLayers = Math.max(2, Math.ceil(layers * heightAdjustment));
    const bottomLayerHeight = patternHeight / patternLayers;
    
    if (basePattern === 'stripes-bottom') {
      for (let i = 0; i < patternLayers; i++) {
        const yBase = patternStartY + (i / patternLayers) * patternHeight;
        const color = getLayerColor(palette, i, patternLayers, config.isReversed);
        const yEnd = patternStartY + ((i + 1) / patternLayers) * patternHeight;
        ctx.fillStyle = color;
        ctx.fillRect(0, yBase, width, yEnd - yBase);
      }
    } else if (basePattern === 'circles-bottom') {
      const centerX = width / 2;
      const centerY = height;
      const maxRadius = Math.max(width, height) * 0.8 * config.scale;
      const gapFactor = config.randomness > 0 ? 1 + config.randomness * 0.3 : 1;
      
      for (let i = patternLayers - 1; i >= 0; i--) {
        const t = i / patternLayers;
        const baseRadius = t * maxRadius * gapFactor;
        const noiseVal = perlinNoise(t * 3, config.seed, config.seed);
        const waveOffset = noiseVal * waveAmp * 0.15 * maxRadius * config.randomness;
        const finalRadius = Math.max(0, baseRadius + waveOffset);
        
        const color = getLayerColor(palette, i, patternLayers, config.isReversed);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, finalRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  return canvas;
}

export async function downloadWallpaper(
  canvas: HTMLCanvasElement,
  filename: string
): Promise<void> {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  link.click();
}