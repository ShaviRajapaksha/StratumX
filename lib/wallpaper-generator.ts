export type PatternType = 
  | 'stripes' 
  | 'layered-waves' 
  | 'mountains' 
  | 'organic' 
  | 'circles' 
  | 'layered-arches'
  | 'geometric'
  | 'gradient-mesh'
  | 'liquid-mixed'
  | 'abstract-flow'
  | 'nebula'
  | 'crystal'
  | 'ripple'
  | 'cosmic'
  | 'fluid-blob'
  | 'terrain-layers'
  | 'liquid-blend'
  | 'plasma-flow'
  | 'mixed-fluid'
  | 'sand-dunes'
  | 'aurora-veil';

export type PaletteType = 
  | 'monochrome' 
  | 'sunset' 
  | 'emerald' 
  | 'violet' 
  | 'ocean' 
  | 'retro' 
  | 'aurora' 
  | 'forest' 
  | 'berry' 
  | 'peach' 
  | 'mint' 
  | 'lavender' 
  | 'coral' 
  | 'slate' 
  | 'midnight' 
  | 'terra' 
  | 'neon'
  | 'autumn'
  | 'arctic'
  | 'desert';

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
  heightAdjustment: number;
}

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
  midnight: ['#050a15', '#0d1b3d', '#1a2d5c', '#2d4a7d', '#4a7db8', '#7db8e8', '#e8f0ff'],
  terra: ['#1a0f0a', '#3d2a1a', '#5c3d2d', '#7d5a4a', '#b88a7d', '#e8c9b8', '#fff5e8'],
  neon: ['#0a0a0a', '#1a0a2d', '#2d0a5c', '#4a0a8b', '#7d3acd', '#b88aff', '#f5e6ff'],
  autumn: ['#3d1a0a', '#7d3a1a', '#b85c2d', '#e8844a', '#f5a56b', '#f5d08d', '#fff5e6'],
  arctic: ['#0a1a2a', '#1a3d5c', '#2d6a8b', '#4a9db8', '#7dd0e8', '#b8e8f5', '#e6f5ff'],
  desert: ['#2a1a0a', '#5c3d1a', '#8b5c2d', '#b8844a', '#e8b87d', '#f5d9b8', '#fff5e6'],
};

export const PATTERN_LABELS: Record<PatternType, string> = {
  stripes: 'Stripes',
  'layered-waves': 'Layered Waves',
  mountains: 'Mountains',
  organic: 'Organic',
  circles: 'Circles',
  'layered-arches': 'Layered Arches',
  geometric: 'Geometric',
  'gradient-mesh': 'Gradient Mesh',
  'liquid-mixed': 'Liquid Mixed',
  'abstract-flow': 'Abstract Flow',
  nebula: 'Nebula',
  crystal: 'Crystal',
  ripple: 'Ripple',
  cosmic: 'Cosmic',
  'fluid-blob': 'Fluid Blob',
  'terrain-layers': 'Terrain Layers',
  'liquid-blend': 'Liquid Blend',
  'plasma-flow': 'Plasma Flow',
  'mixed-fluid': 'Mixed Fluid',
  'sand-dunes': 'Sand Dunes',
  'aurora-veil': 'Aurora Veil',
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function noise2D(x: number, y: number, seed: number): number {
  const n =
    Math.sin(
      x * 12.9898 +
      y * 78.233 +
      seed * 43758.5453
    ) * 43758.5453;

  return n - Math.floor(n);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function perlinNoise(
  x: number,
  y: number,
  seed: number
): number {
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

function hexToRgb(
  hex: string
): [number, number, number] {
  const result =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) return [0, 0, 0];

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function rgbToHex(
  r: number,
  g: number,
  b: number
): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function interpolateColor(
  color1: string,
  color2: string,
  t: number
): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const r = lerp(r1, r2, t);
  const g = lerp(g1, g2, t);
  const b = lerp(b1, b2, t);

  return rgbToHex(r, g, b);
}

export function getLayerColor(
  palette: string[],
  layerIndex: number,
  totalLayers: number,
  isReversed: boolean = false
): string {
  let t = layerIndex / (totalLayers - 1);

  if (isReversed) {
    t = 1 - t;
  }

  const paletteIndex = t * (palette.length - 1);

  const color1Index = Math.floor(paletteIndex);
  const color2Index = Math.ceil(paletteIndex);

  const colorT = paletteIndex - color1Index;

  if (color1Index === color2Index) {
    return palette[color1Index];
  }

  return interpolateColor(
    palette[color1Index],
    palette[color2Index],
    colorT
  );
}

export async function renderWallpaperToCanvas(
  width: number,
  height: number,
  config: WallpaperConfig
): Promise<HTMLCanvasElement> {
  const outWidth = width;
  const outHeight = height;

  const diag = Math.ceil(
    Math.sqrt(
      outWidth * outWidth +
      outHeight * outHeight
    )
  );

  width = diag;
  height = diag;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;

  const palette = PALETTES[config.palette];

  const isBottomAligned =
    config.pattern.endsWith('-bottom');

  const basePattern = (
    isBottomAligned
      ? config.pattern.slice(0, -7)
      : config.pattern
  ) as PatternType;

  const heightAdjustment =
    config.heightAdjustment || 0.6;

  const layers =
    config.layerCount || 12;

  let bgColor: string;

  if (isBottomAligned) {
    if (config.isReversed) {
      bgColor = config.isDark
        ? palette[0]
        : palette[palette.length - 1];
    } else {
      bgColor = config.isDark
        ? palette[palette.length - 1]
        : palette[0];
    }
  } else {
    bgColor = getLayerColor(
      palette,
      0,
      layers,
      config.isReversed
    );
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  const waveAmp =
    (
      seededRandom(config.seed + 1) *
      0.3 +
      0.1
    ) *
    (config.randomness || 1);

  ctx.save();

  const centerX = width / 2;
  const centerY = height / 2;

  ctx.translate(
    centerX,
    centerY
  );

  ctx.rotate(
    (config.rotation || 0) *
    Math.PI /
    180
  );

  ctx.translate(
    -centerX,
    -centerY
  );

  if (basePattern === 'stripes') {
    for (let i = 0; i < layers; i++) {
      const yBase =
        (i / layers) *
        height;

      const color =
        getLayerColor(
          palette,
          i,
          layers,
          config.isReversed
        );

      const yEnd =
        ((i + 1) / layers) *
        height;

      ctx.fillStyle = color;

      ctx.fillRect(
        0,
        yBase,
        width,
        yEnd - yBase
      );
    }

  } else if (basePattern === 'layered-waves') {
    const waveHeight =
      height * 0.3;

    const waveCount =
      config.layerCount || 8;

    for (let i = 0; i < waveCount; i++) {
      const t =
        i / waveCount;

      const color =
        getLayerColor(
          palette,
          i,
          waveCount,
          config.isReversed
        );

      const yOffset =
        t * height * 0.8 +
        height * 0.1;

      const amplitude =
        waveHeight *
        (0.3 + t * 0.7) *
        config.scale;

      const frequency =
        2 + t * 3;

      const phase =
        i * 0.5 +
        config.seed;

      ctx.fillStyle = color;
      ctx.globalAlpha =
        0.7 +
        t * 0.3;

      ctx.beginPath();

      ctx.moveTo(
        0,
        yOffset +
        amplitude *
        0.5
      );

      for (
        let x = 0;
        x <= width;
        x += width / 100
      ) {
        const noise =
          perlinNoise(
            (x / width) *
            frequency,
            phase,
            config.seed + i
          );

        const offset =
          Math.sin(
            (x / width) *
            frequency *
            Math.PI *
            2 +
            phase
          ) *
          amplitude *
          0.5 +
          noise *
          amplitude *
          0.3 *
          config.randomness;

        ctx.lineTo(
          x,
          yOffset +
          offset
        );
      }

      ctx.lineTo(
        width,
        height
      );

      ctx.lineTo(
        0,
        height
      );

      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'layered-arches') {
    const archCount =
      config.layerCount || 8;

    const maxArchHeight =
      height * 0.9;

    const minArchHeight =
      height * 0.1;

    const centerX2 =
      width / 2;

    for (
      let i = archCount - 1;
      i >= 0;
      i--
    ) {
      const t =
        i / archCount;

      const color =
        getLayerColor(
          palette,
          i,
          archCount,
          config.isReversed
        );

      const archHeight =
        minArchHeight +
        t *
        maxArchHeight *
        config.scale;

      const archWidth =
        archHeight *
        1.2;

      const yBase =
        height *
        (0.9 - t * 0.8);

      const xStart =
        centerX2 -
        archWidth;

      const xEnd =
        centerX2 +
        archWidth;

      ctx.fillStyle = color;

      ctx.globalAlpha =
        0.6 +
        t * 0.4;

      ctx.beginPath();

      ctx.moveTo(
        xStart,
        yBase
      );

      const cp1x =
        centerX2 -
        archWidth *
        0.8;

      const cp1y =
        yBase -
        archHeight *
        0.9;

      const cp2x =
        centerX2 +
        archWidth *
        0.8;

      const cp2y =
        yBase -
        archHeight *
        0.9;

      ctx.bezierCurveTo(
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        xEnd,
        yBase
      );

      ctx.lineTo(
        xEnd,
        height
      );

      ctx.lineTo(
        xStart,
        height
      );

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'mountains') {
    const mountainCount =
      config.layerCount || 6;

    for (
      let i = 0;
      i < mountainCount;
      i++
    ) {
      const t =
        i / mountainCount;

      const color =
        getLayerColor(
          palette,
          i,
          mountainCount,
          config.isReversed
        );

      const yBase =
        height *
        (0.3 + t * 0.5);

      const peakHeight =
        height *
        (0.2 + (1 - t) * 0.4) *
        config.scale;

      const peakCount =
        Math.floor(
          3 +
          t *
          5
        );

      ctx.fillStyle = color;

      ctx.globalAlpha =
        0.7 +
        t * 0.3;

      ctx.beginPath();

      ctx.moveTo(
        0,
        yBase +
        peakHeight *
        0.2
      );

      for (
        let j = 0;
        j <= peakCount;
        j++
      ) {
        const x =
          (j / peakCount) *
          width;

        const noiseVal =
          perlinNoise(
            (x / width) *
            5,
            i * 2,
            config.seed + 100
          );

        const peakOffset =
          (noiseVal - 0.5) *
          0.6 *
          (1 - t) *
          peakHeight;

        const peakX =
          x +
          (noiseVal - 0.5) *
          width *
          0.1;

        const peakY =
          yBase -
          peakHeight *
          (
            0.3 +
            0.7 *
            (1 - t) *
            (
              0.5 +
              0.5 *
              Math.abs(noiseVal)
            )
          ) +
          peakOffset;

        if (j === 0) {
          ctx.lineTo(
            peakX,
            peakY
          );
        } else {
          const prevX =
            ((j - 1) / peakCount) *
            width;

          const midX =
            (prevX + peakX) /
            2;

          const midY =
            yBase -
            peakHeight *
            (
              0.1 +
              0.3 *
              (1 - t)
            );

          ctx.quadraticCurveTo(
            midX,
            midY,
            peakX,
            peakY
          );
        }
      }

      ctx.lineTo(
        width,
        height
      );

      ctx.lineTo(
        0,
        height
      );

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'organic') {
    const blobCount =
      config.layerCount || 8;

    for (
      let i = 0;
      i < blobCount;
      i++
    ) {
      const t =
        i / blobCount;

      const color =
        getLayerColor(
          palette,
          i,
          blobCount,
          config.isReversed
        );

      const centerX2 =
        (
          0.2 +
          t *
          0.6
        ) *
        width +
        (
          seededRandom(
            config.seed +
            i *
            3
          ) -
          0.5
        ) *
        width *
        0.2;

      const centerY2 =
        (
          0.2 +
          t *
          0.6
        ) *
        height +
        (
          seededRandom(
            config.seed +
            i *
            7
          ) -
          0.5
        ) *
        height *
        0.2;

      const size =
        (
          0.1 +
          t *
          0.4
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale *
        0.5;

      const points =
        12 +
        Math.floor(
          t *
          12
        );

      ctx.fillStyle = color;

      ctx.globalAlpha =
        0.4 +
        t *
        0.6;

      ctx.beginPath();

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const angle =
          (j / points) *
          Math.PI *
          2;

        const radiusNoise =
          perlinNoise(
            Math.cos(angle) *
            2 +
            i,
            Math.sin(angle) *
            2 +
            i,
            config.seed +
            50
          );

        const radius =
          size *
          (
            0.7 +
            0.3 *
            Math.abs(
              radiusNoise
            )
          ) *
          (
            1 +
            config.randomness *
            0.2
          );

        const x =
          centerX2 +
          Math.cos(angle) *
          radius;

        const y =
          centerY2 +
          Math.sin(angle) *
          radius;

        if (j === 0) {
          ctx.moveTo(
            x,
            y
          );
        } else {
          const prevAngle =
            (
              (j - 1) /
              points
            ) *
            Math.PI *
            2;

          const prevRadius =
            size *
            (
              0.7 +
              0.3 *
              Math.abs(
                perlinNoise(
                  Math.cos(
                    prevAngle
                  ) *
                  2 +
                  i,
                  Math.sin(
                    prevAngle
                  ) *
                  2 +
                  i,
                  config.seed +
                  50
                )
              )
            );

          const prevX =
            centerX2 +
            Math.cos(
              prevAngle
            ) *
            prevRadius;

          const prevY =
            centerY2 +
            Math.sin(
              prevAngle
            ) *
            prevRadius;

          const cpX =
            centerX2 +
            Math.cos(
              (
                prevAngle +
                angle
              ) /
              2
            ) *
            (
              prevRadius +
              radius
            ) *
            0.5;

          const cpY =
            centerY2 +
            Math.sin(
              (
                prevAngle +
                angle
              ) /
              2
            ) *
            (
              prevRadius +
              radius
            ) *
            0.5;

          ctx.quadraticCurveTo(
            cpX,
            cpY,
            x,
            y
          );
        }
      }

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'circles') {
    const centerX2 =
      width / 2;

    const centerY2 =
      height / 2;

    const maxRadius =
      Math.sqrt(
        centerX2 *
        centerX2 +
        centerY2 *
        centerY2
      ) *
      1.5;

    for (
      let i = layers - 1;
      i >= 0;
      i--
    ) {
      const t =
        i / layers;

      const radius =
        t *
        maxRadius *
        config.scale;

      const noiseVal =
        perlinNoise(
          t * 3,
          config.seed,
          config.seed
        );

      const waveOffset =
        noiseVal *
        waveAmp *
        0.15 *
        maxRadius *
        config.randomness;

      const finalRadius =
        Math.max(
          0,
          radius +
          waveOffset
        );

      const color =
        getLayerColor(
          palette,
          i,
          layers,
          config.isReversed
        );

      ctx.fillStyle = color;

      ctx.beginPath();

      ctx.arc(
        centerX2,
        centerY2,
        finalRadius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

  } else if (basePattern === 'geometric') {
    const shapeCount =
      config.layerCount || 12;

    const shapes = [
      'rect',
      'circle',
      'triangle',
      'polygon',
    ];

    for (
      let i = 0;
      i < shapeCount;
      i++
    ) {
      const t =
        i / shapeCount;

      const color =
        getLayerColor(
          palette,
          i,
          shapeCount,
          config.isReversed
        );

      const size =
        (
          0.05 +
          t *
          0.3
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const x =
        (
          seededRandom(
            config.seed +
            i *
            5
          ) *
          0.6 +
          0.2
        ) *
        width;

      const y =
        (
          seededRandom(
            config.seed +
            i *
            13
          ) *
          0.6 +
          0.2
        ) *
        height;

      const shape =
        shapes[
          Math.floor(
            seededRandom(
              config.seed +
              i *
              11
            ) *
            shapes.length
          )
        ];

      ctx.save();

      ctx.translate(
        x,
        y
      );

      ctx.fillStyle = color;

      ctx.globalAlpha =
        0.3 +
        t *
        0.7;

      if (shape === 'rect') {
        const w =
          size *
          (
            0.5 +
            seededRandom(
              config.seed +
              i *
              3
            ) *
            0.5
          );

        const h =
          size *
          (
            0.5 +
            seededRandom(
              config.seed +
              i *
              17
            ) *
            0.5
          );

        const rx =
          size *
          0.1 *
          seededRandom(
            config.seed +
            i *
            23
          );

        ctx.beginPath();

        ctx.roundRect(
          -w / 2,
          -h / 2,
          w,
          h,
          rx
        );

        ctx.fill();

      } else if (shape === 'circle') {
        const r =
          size *
          0.4;

        ctx.beginPath();

        ctx.arc(
          0,
          0,
          r,
          0,
          Math.PI * 2
        );

        ctx.fill();

      } else if (shape === 'triangle') {
        ctx.beginPath();

        ctx.moveTo(
          0,
          -size *
          0.4
        );

        ctx.lineTo(
          size *
          0.4,
          size *
          0.4
        );

        ctx.lineTo(
          -size *
          0.4,
          size *
          0.4
        );

        ctx.closePath();

        ctx.fill();

      } else if (shape === 'polygon') {
        const sides =
          5 +
          Math.floor(
            seededRandom(
              config.seed +
              i *
              31
            ) *
            5
          );

        ctx.beginPath();

        for (
          let j = 0;
          j < sides;
          j++
        ) {
          const angle =
            (
              j /
              sides
            ) *
            Math.PI *
            2;

          const r =
            size *
            0.4 *
            (
              0.8 +
              0.2 *
              seededRandom(
                config.seed +
                i *
                37 +
                j
              )
            );

          if (j === 0) {
            ctx.moveTo(
              Math.cos(angle) *
              r,
              Math.sin(angle) *
              r
            );
          } else {
            ctx.lineTo(
              Math.cos(angle) *
              r,
              Math.sin(angle) *
              r
            );
          }
        }

        ctx.closePath();

        ctx.fill();
      }

      ctx.globalAlpha = 1;

      ctx.restore();
    }

  } else if (basePattern === 'gradient-mesh') {
    const blobCount =
      config.layerCount || 10;

    for (
      let i = 0;
      i < blobCount;
      i++
    ) {
      const t =
        i / blobCount;

      const color =
        getLayerColor(
          palette,
          i,
          blobCount,
          config.isReversed
        );

      const x =
        (
          seededRandom(
            config.seed +
            i *
            7
          ) *
          0.8 +
          0.1
        ) *
        width;

      const y =
        (
          seededRandom(
            config.seed +
            i *
            13
          ) *
          0.8 +
          0.1
        ) *
        height;

      const radius =
        (
          0.1 +
          t *
          0.3
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius
        );

      gradient.addColorStop(
        0,
        color
      );

      gradient.addColorStop(
        1,
        color +
        '00'
      );

      ctx.fillStyle =
        gradient;

      ctx.globalAlpha =
        0.3 +
        t *
        0.7;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'liquid-mixed') {
    const layerCount =
      config.layerCount || 10;

    for (
      let i = 0;
      i < layerCount;
      i++
    ) {
      const t =
        i / layerCount;

      const color =
        getLayerColor(
          palette,
          i,
          layerCount,
          config.isReversed
        );

      const centerX2 =
        (
          0.1 +
          t *
          0.8
        ) *
        width +
        (
          seededRandom(
            config.seed +
            i *
            7
          ) -
          0.5
        ) *
        width *
        0.15;

      const centerY2 =
        (
          0.1 +
          t *
          0.8
        ) *
        height +
        (
          seededRandom(
            config.seed +
            i *
            13
          ) -
          0.5
        ) *
        height *
        0.15;

      const size =
        (
          0.05 +
          t *
          0.35
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const points =
        20 +
        Math.floor(
          t *
          20
        );

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.2 +
        t *
        0.6;

      ctx.beginPath();

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const angle =
          (
            j /
            points
          ) *
          Math.PI *
          2;

        const noise1 =
          perlinNoise(
            Math.cos(angle) *
            4 +
            i *
            3,
            Math.sin(angle) *
            4 +
            i *
            3,
            config.seed +
            100
          );

        const noise2 =
          perlinNoise(
            Math.cos(angle) *
            6 +
            i *
            5,
            Math.sin(angle) *
            6 +
            i *
            5,
            config.seed +
            200
          );

        const noise3 =
          perlinNoise(
            Math.cos(angle) *
            2 +
            i,
            Math.sin(angle) *
            2 +
            i,
            config.seed +
            50
          );

        const radius =
          size *
          (
            0.5 +
            0.5 *
            Math.abs(
              noise1 +
              noise2 *
              0.3 +
              noise3 *
              0.2
            )
          ) *
          (
            1 +
            config.randomness *
            0.15
          );

        const x =
          centerX2 +
          Math.cos(
            angle +
            noise3 *
            0.5
          ) *
          radius;

        const y =
          centerY2 +
          Math.sin(
            angle +
            noise3 *
            0.5
          ) *
          radius;

        if (j === 0) {
          ctx.moveTo(
            x,
            y
          );
        } else {
          ctx.lineTo(
            x,
            y
          );
        }
      }

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'abstract-flow') {
    const flowCount =
      config.layerCount || 8;

    for (
      let i = 0;
      i < flowCount;
      i++
    ) {
      const t =
        i / flowCount;

      const color =
        getLayerColor(
          palette,
          i,
          flowCount,
          config.isReversed
        );

      const yBase =
        t *
        height;

      const amplitude =
        (
          0.1 +
          t *
          0.3
        ) *
        height *
        0.3 *
        config.scale;

      const frequency =
        1 +
        t *
        4;

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.4 +
        t *
        0.6;

      ctx.lineWidth =
        2 +
        t *
        12;

      ctx.beginPath();

      for (
        let x = 0;
        x <= width;
        x += 2
      ) {
        const noiseVal =
          perlinNoise(
            (x / width) *
            frequency,
            t *
            3,
            config.seed +
            i *
            10
          );

        const flowOffset =
          Math.sin(
            (x / width) *
            frequency *
            Math.PI *
            2 +
            config.seed
          ) *
          amplitude *
          0.5;

        const flowOffset2 =
          Math.cos(
            (x / width) *
            frequency *
            0.7 *
            Math.PI *
            2 +
            config.seed *
            0.5
          ) *
          amplitude *
          0.3;

        const y =
          yBase +
          flowOffset +
          flowOffset2 +
          noiseVal *
          amplitude *
          0.3 *
          config.randomness;

        if (x === 0) {
          ctx.moveTo(
            x,
            y
          );
        } else {
          const prevX =
            x -
            2;

          const prevNoiseVal =
            perlinNoise(
              (prevX / width) *
              frequency,
              t *
              3,
              config.seed +
              i *
              10
            );

          const prevFlowOffset =
            Math.sin(
              (prevX / width) *
              frequency *
              Math.PI *
              2 +
              config.seed
            ) *
            amplitude *
            0.5;

          const prevFlowOffset2 =
            Math.cos(
              (prevX / width) *
              frequency *
              0.7 *
              Math.PI *
              2 +
              config.seed *
              0.5
            ) *
            amplitude *
            0.3;

          const prevY =
            yBase +
            prevFlowOffset +
            prevFlowOffset2 +
            prevNoiseVal *
            amplitude *
            0.3 *
            config.randomness;

          const cpX =
            (
              prevX +
              x
            ) /
            2;

          const cpY =
            (
              prevY +
              y
            ) /
            2 +
            (
              seededRandom(
                config.seed +
                i *
                5 +
                x
              ) -
              0.5
            ) *
            amplitude *
            0.2;

          ctx.quadraticCurveTo(
            cpX,
            cpY,
            x,
            y
          );
        }
      }

      ctx.stroke();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'nebula') {
    const cloudCount =
      config.layerCount || 12;

    for (
      let i = 0;
      i < cloudCount;
      i++
    ) {
      const t =
        i / cloudCount;

      const color =
        getLayerColor(
          palette,
          i,
          cloudCount,
          config.isReversed
        );

      const x =
        (
          seededRandom(
            config.seed +
            i *
            11
          ) *
          0.9 +
          0.05
        ) *
        width;

      const y =
        (
          seededRandom(
            config.seed +
            i *
            17
          ) *
          0.9 +
          0.05
        ) *
        height;

      const radius =
        (
          0.05 +
          t *
          0.4
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius
        );

      gradient.addColorStop(
        0,
        color
      );

      gradient.addColorStop(
        1,
        color +
        '00'
      );

      ctx.fillStyle =
        gradient;

      ctx.globalAlpha =
        0.1 +
        t *
        0.5;

      ctx.beginPath();

      const points =
        24;

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const angle =
          (
            j /
            points
          ) *
          Math.PI *
          2;

        const noise1 =
          perlinNoise(
            Math.cos(angle) *
            5 +
            i *
            2,
            Math.sin(angle) *
            5 +
            i *
            2,
            config.seed +
            300
          );

        const noise2 =
          perlinNoise(
            Math.cos(angle) *
            8 +
            i *
            3,
            Math.sin(angle) *
            8 +
            i *
            3,
            config.seed +
            400
          );

        const r =
          radius *
          (
            0.7 +
            0.3 *
            Math.abs(
              noise1 +
              noise2 *
              0.2
            )
          ) *
          (
            1 +
            config.randomness *
            0.1
          );

        const px =
          x +
          Math.cos(angle) *
          r;

        const py =
          y +
          Math.sin(angle) *
          r;

        if (j === 0) {
          ctx.moveTo(
            px,
            py
          );
        } else {
          ctx.lineTo(
            px,
            py
          );
        }
      }

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'crystal') {
    const crystalCount =
      config.layerCount || 10;

    for (
      let i = 0;
      i < crystalCount;
      i++
    ) {
      const t =
        i / crystalCount;

      const color =
        getLayerColor(
          palette,
          i,
          crystalCount,
          config.isReversed
        );

      const size =
        (
          0.03 +
          t *
          0.25
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const x =
        (
          seededRandom(
            config.seed +
            i *
            5
          ) *
          0.7 +
          0.15
        ) *
        width;

      const y =
        (
          seededRandom(
            config.seed +
            i *
            13
          ) *
          0.7 +
          0.15
        ) *
        height;

      const sides =
        5 +
        Math.floor(
          seededRandom(
            config.seed +
            i *
            19
          ) *
          4
        );

      const skew =
        seededRandom(
          config.seed +
          i *
          23
        ) *
        0.3;

      ctx.save();

      ctx.translate(
        x,
        y
      );

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.4 +
        t *
        0.6;

      ctx.beginPath();

      for (
        let j = 0;
        j < sides;
        j++
      ) {
        const angle =
          (
            j /
            sides
          ) *
          Math.PI *
          2;

        const r =
          size *
          (
            0.8 +
            0.2 *
            Math.sin(
              j *
              1.7 +
              skew
            )
          );

        const px =
          Math.cos(angle) *
          r *
          (
            1 +
            skew *
            0.2
          );

        const py =
          Math.sin(angle) *
          r *
          (
            1 -
            skew *
            0.2
          );

        if (j === 0) {
          ctx.moveTo(
            px,
            py
          );
        } else {
          ctx.lineTo(
            px,
            py
          );
        }
      }

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;

      ctx.restore();
    }

  } else if (basePattern === 'ripple') {
    const rippleCount =
      config.layerCount || 8;

    const centerX2 =
      width / 2;

    const centerY2 =
      height / 2;

    const maxRadius =
      Math.min(
        width,
        height
      ) *
      0.9 *
      config.scale;

    for (
      let i = 0;
      i < rippleCount;
      i++
    ) {
      const t =
        i / rippleCount;

      const color =
        getLayerColor(
          palette,
          i,
          rippleCount,
          config.isReversed
        );

      const radius =
        (
          0.05 +
          t *
          0.9
        ) *
        maxRadius;

      const waveOffset =
        Math.sin(
          t *
          10 +
          config.seed
        ) *
        0.05 *
        maxRadius *
        config.randomness;

      const finalRadius =
        Math.max(
          0,
          radius +
          waveOffset
        );

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.2 +
        t *
        0.8;

      ctx.lineWidth =
        1 +
        t *
        8;

      ctx.beginPath();

      const points =
        60;

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const angle =
          (
            j /
            points
          ) *
          Math.PI *
          2;

        const noiseVal =
          perlinNoise(
            Math.cos(angle) *
            3 +
            i,
            Math.sin(angle) *
            3 +
            i,
            config.seed +
            500
          );

        const r =
          finalRadius *
          (
            1 +
            noiseVal *
            0.1 *
            config.randomness
          );

        const px =
          centerX2 +
          Math.cos(angle) *
          r;

        const py =
          centerY2 +
          Math.sin(angle) *
          r;

        if (j === 0) {
          ctx.moveTo(
            px,
            py
          );
        } else {
          ctx.lineTo(
            px,
            py
          );
        }
      }

      ctx.closePath();

      ctx.stroke();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'cosmic') {
    const swirlCount =
      config.layerCount || 10;

    const centerX2 =
      width / 2;

    const centerY2 =
      height / 2;

    for (
      let i = 0;
      i < swirlCount;
      i++
    ) {
      const t =
        i / swirlCount;

      const color =
        getLayerColor(
          palette,
          i,
          swirlCount,
          config.isReversed
        );

      const radius =
        (
          0.05 +
          t *
          0.45
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const startAngle =
        t *
        5 +
        config.seed *
        0.1;

      const endAngle =
        startAngle +
        Math.PI *
        2 *
        (
          0.5 +
          t *
          0.5
        );

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.1 +
        t *
        0.7;

      ctx.lineWidth =
        1 +
        t *
        15;

      ctx.beginPath();

      const points =
        40;

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const progress =
          j /
          points;

        const angle =
          startAngle +
          (
            endAngle -
            startAngle
          ) *
          progress;

        const r =
          radius *
          (
            0.3 +
            0.7 *
            progress
          );

        const noiseVal =
          perlinNoise(
            Math.cos(angle) *
            2 +
            i *
            2,
            Math.sin(angle) *
            2 +
            i *
            2,
            config.seed +
            600
          );

        const finalR =
          r *
          (
            1 +
            noiseVal *
            0.2 *
            config.randomness
          );

        const px =
          centerX2 +
          Math.cos(angle) *
          finalR;

        const py =
          centerY2 +
          Math.sin(angle) *
          finalR;

        if (j === 0) {
          ctx.moveTo(
            px,
            py
          );
        } else {
          ctx.lineTo(
            px,
            py
          );
        }
      }

      ctx.stroke();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'fluid-blob') {
    const blobCount =
      config.layerCount || 8;

    for (
      let i = 0;
      i < blobCount;
      i++
    ) {
      const t =
        i / blobCount;

      const color =
        getLayerColor(
          palette,
          i,
          blobCount,
          config.isReversed
        );

      const centerX2 =
        (
          0.1 +
          t *
          0.8
        ) *
        width +
        (
          seededRandom(
            config.seed +
            i *
            5
          ) -
          0.5
        ) *
        width *
        0.2;

      const centerY2 =
        (
          0.1 +
          t *
          0.8
        ) *
        height +
        (
          seededRandom(
            config.seed +
            i *
            13
          ) -
          0.5
        ) *
        height *
        0.2;

      const size =
        (
          0.1 +
          t *
          0.4
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale;

      const points =
        16 +
        Math.floor(
          t *
          16
        );

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.3 +
        t *
        0.7;

      ctx.beginPath();

      for (
        let j = 0;
        j <= points;
        j++
      ) {
        const angle =
          (
            j /
            points
          ) *
          Math.PI *
          2;

        const noise1 =
          perlinNoise(
            Math.cos(angle) *
            3 +
            i *
            2,
            Math.sin(angle) *
            3 +
            i *
            2,
            config.seed +
            100
          );

        const noise2 =
          perlinNoise(
            Math.cos(angle) *
            5 +
            i *
            3,
            Math.sin(angle) *
            5 +
            i *
            3,
            config.seed +
            200
          );

        const radius =
          size *
          (
            0.6 +
            0.4 *
            Math.abs(
              noise1 +
              noise2 *
              0.3
            )
          ) *
          (
            1 +
            config.randomness *
            0.1
          );

        const x =
          centerX2 +
          Math.cos(angle) *
          radius;

        const y =
          centerY2 +
          Math.sin(angle) *
          radius;

        if (j === 0) {
          ctx.moveTo(
            x,
            y
          );
        } else {
          const prevAngle =
            (
              (j - 1) /
              points
            ) *
            Math.PI *
            2;

          const prevNoise1 =
            perlinNoise(
              Math.cos(
                prevAngle
              ) *
              3 +
              i *
              2,
              Math.sin(
                prevAngle
              ) *
              3 +
              i *
              2,
              config.seed +
              100
            );

          const prevNoise2 =
            perlinNoise(
              Math.cos(
                prevAngle
              ) *
              5 +
              i *
              3,
              Math.sin(
                prevAngle
              ) *
              5 +
              i *
              3,
              config.seed +
              200
            );

          const prevRadius =
            size *
            (
              0.6 +
              0.4 *
              Math.abs(
                prevNoise1 +
                prevNoise2 *
                0.3
              )
            ) *
            (
              1 +
              config.randomness *
              0.1
            );

          const prevX =
            centerX2 +
            Math.cos(
              prevAngle
            ) *
            prevRadius;

          const prevY =
            centerY2 +
            Math.sin(
              prevAngle
            ) *
            prevRadius;

          const cpX =
            (
              prevX +
              x
            ) /
            2 +
            (
              seededRandom(
                config.seed +
                i *
                7 +
                j
              ) -
              0.5
            ) *
            size *
            0.2;

          const cpY =
            (
              prevY +
              y
            ) /
            2 +
            (
              seededRandom(
                config.seed +
                i *
                11 +
                j
              ) -
              0.5
            ) *
            size *
            0.2;

          ctx.quadraticCurveTo(
            cpX,
            cpY,
            x,
            y
          );
        }
      }

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'terrain-layers') {
    const layerN =
      layers;

    for (
      let i = 0;
      i < layerN;
      i++
    ) {
      const t =
        i / layerN;

      const color =
        getLayerColor(
          palette,
          i,
          layerN,
          config.isReversed
        );

      const yBase =
        height *
        (
          0.25 +
          t *
          0.6
        );

      const hillHeight =
        height *
        (
          0.06 +
          (1 - t) *
          0.22
        ) *
        config.scale;

      const freq1 =
        0.6 +
        t *
        1.2;

      const freq2 =
        1.8 +
        t *
        2.4;

      const phase =
        i *
        1.3 +
        config.seed;

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.75 +
        t *
        0.25;

      ctx.beginPath();

      ctx.moveTo(
        0,
        height
      );

      ctx.lineTo(
        0,
        yBase
      );

      for (
        let x = 0;
        x <= width;
        x += width / 140
      ) {
        const n =
          perlinNoise(
            (x / width) *
            freq2,
            phase,
            config.seed +
            i *
            17
          );

        const rollingY =
          yBase -
          Math.sin(
            (x / width) *
            freq1 *
            Math.PI *
            2 +
            phase
          ) *
          hillHeight *
          0.6 -
          Math.cos(
            (x / width) *
            freq2 *
            Math.PI *
            2 +
            phase *
            0.7
          ) *
          hillHeight *
          0.25 -
          n *
          hillHeight *
          0.4 *
          config.randomness;

        ctx.lineTo(
          x,
          rollingY
        );
      }

      ctx.lineTo(
        width,
        height
      );

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'liquid-blend') {
    // Browser-compatible liquid blend.
    // No canvas blur filter is used here.
    // Radial gradients create the soft transitions consistently
    // across Chrome, Safari, Firefox, and other browsers.

    const blobN =
      layers;

    for (
      let i = 0;
      i < blobN;
      i++
    ) {
      const t =
        i / blobN;

      const color =
        getLayerColor(
          palette,
          i,
          blobN,
          config.isReversed
        );

      const cx =
        (
          0.1 +
          seededRandom(
            config.seed +
            i *
            4
          ) *
          0.8
        ) *
        width;

      const cy =
        (
          0.12 +
          seededRandom(
            config.seed +
            i *
            9
          ) *
          0.76
        ) *
        height;

      const rx =
        (
          0.16 +
          t *
          0.3
        ) *
        width *
        config.scale;

      const ry =
        rx *
        (
          0.55 +
          seededRandom(
            config.seed +
            i *
            13
          ) *
          0.75
        );

      const rot =
        seededRandom(
          config.seed +
          i *
          21
        ) *
        Math.PI;

      const radius =
        Math.max(
          rx,
          ry
        );

      const gradient =
        ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          radius
        );

      gradient.addColorStop(
        0,
        color
      );

      gradient.addColorStop(
        0.45,
        color +
        'CC'
      );

      gradient.addColorStop(
        0.75,
        color +
        '55'
      );

      gradient.addColorStop(
        1,
        color +
        '00'
      );

      ctx.save();

      ctx.translate(
        cx,
        cy
      );

      ctx.rotate(
        rot
      );

      ctx.scale(
        1,
        ry / rx
      );

      ctx.globalAlpha =
        0.35 +
        t *
        0.35;

      ctx.fillStyle =
        gradient;

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        rx,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    }

    ctx.globalAlpha = 1;

  } else if (basePattern === 'plasma-flow') {
    const blobN =
      layers;

    const prevComposite =
      ctx.globalCompositeOperation;

    ctx.globalCompositeOperation =
      'lighter';

    for (
      let i = 0;
      i < blobN;
      i++
    ) {
      const t =
        i / blobN;

      const color =
        getLayerColor(
          palette,
          i,
          blobN,
          config.isReversed
        );

      const cx =
        (
          0.12 +
          seededRandom(
            config.seed +
            i *
            4
          ) *
          0.76
        ) *
        width;

      const cy =
        (
          0.12 +
          seededRandom(
            config.seed +
            i *
            9
          ) *
          0.76
        ) *
        height;

      const r =
        (
          0.12 +
          t *
          0.4
        ) *
        Math.min(
          width,
          height
        ) *
        config.scale *
        (
          0.6 +
          config.randomness *
          0.4
        );

      const grad =
        ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          r
        );

      grad.addColorStop(
        0,
        color
      );

      grad.addColorStop(
        0.5,
        color +
        '55'
      );

      grad.addColorStop(
        1,
        color +
        '00'
      );

      ctx.fillStyle =
        grad;

      ctx.globalAlpha =
        0.22 +
        t *
        0.22;

      ctx.beginPath();

      ctx.arc(
        cx,
        cy,
        r,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation =
      prevComposite;

  } else if (basePattern === 'mixed-fluid') {
    const streamN =
      layers;

    const blurAmount =
      Math.min(
        width,
        height
      ) *
      (
        0.018 +
        config.randomness *
        0.018
      );

    const prevFilter =
      ctx.filter;

    const prevComposite =
      ctx.globalCompositeOperation;

    ctx.globalCompositeOperation =
      config.isDark
        ? 'screen'
        : 'multiply';

    ctx.lineCap =
      'round';

    ctx.lineJoin =
      'round';

    for (
      let i = 0;
      i < streamN;
      i++
    ) {
      const t =
        i / streamN;

      const color =
        getLayerColor(
          palette,
          i,
          streamN,
          config.isReversed
        );

      const segments =
        70;

      const stepLen =
        Math.min(
          width,
          height
        ) *
        (
          0.018 +
          config.scale *
          0.012
        );

      const lw =
        (
          0.05 +
          (1 - t) *
          0.14
        ) *
        Math.min(
          width,
          height
        ) *
        (
          0.5 +
          config.scale *
          0.6
        );

      let x =
        seededRandom(
          config.seed +
          i *
          6
        ) *
        width;

      let y =
        seededRandom(
          config.seed +
          i *
          11
        ) *
        height;

      let angle =
        seededRandom(
          config.seed +
          i *
          17
        ) *
        Math.PI *
        2;

      ctx.filter =
        `blur(${blurAmount}px)`;

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.4 +
        t *
        0.3;

      ctx.lineWidth =
        lw;

      ctx.beginPath();

      ctx.moveTo(
        x,
        y
      );

      for (
        let s = 0;
        s < segments;
        s++
      ) {
        const n =
          perlinNoise(
            x / width * 3,
            y / height * 3,
            config.seed +
            i *
            40 +
            s *
            0.4
          );

        angle +=
          (
            n -
            0.5
          ) *
          0.9 *
          config.randomness;

        x +=
          Math.cos(angle) *
          stepLen;

        y +=
          Math.sin(angle) *
          stepLen;

        ctx.lineTo(
          x,
          y
        );
      }

      ctx.stroke();
    }

    ctx.globalAlpha = 1;

    ctx.filter =
      prevFilter;

    ctx.globalCompositeOperation =
      prevComposite;

  } else if (basePattern === 'sand-dunes') {
    const duneN =
      Math.max(
        3,
        Math.floor(
          layers *
          0.6
        )
      );

    for (
      let i = 0;
      i < duneN;
      i++
    ) {
      const t =
        i / duneN;

      const color =
        getLayerColor(
          palette,
          i,
          duneN,
          config.isReversed
        );

      const yBase =
        height *
        (
          0.3 +
          t *
          0.6
        );

      const duneHeight =
        height *
        (
          0.05 +
          (1 - t) *
          0.18
        ) *
        config.scale;

      const freq =
        0.35 +
        t *
        0.5;

      const phase =
        i *
        2.1 +
        config.seed;

      ctx.fillStyle =
        color;

      ctx.globalAlpha =
        0.8 +
        t *
        0.2;

      ctx.beginPath();

      ctx.moveTo(
        0,
        height
      );

      ctx.lineTo(
        0,
        yBase
      );

      for (
        let x = 0;
        x <= width;
        x += width / 120
      ) {
        const n =
          perlinNoise(
            (x / width) *
            freq *
            3,
            phase,
            config.seed +
            i *
            31
          );

        const crest =
          Math.pow(
            Math.sin(
              (x / width) *
              freq *
              Math.PI *
              2 +
              phase
            ) *
            0.5 +
            0.5,
            1.5
          );

        const y =
          yBase -
          crest *
          duneHeight -
          n *
          duneHeight *
          0.3 *
          config.randomness;

        ctx.lineTo(
          x,
          y
        );
      }

      ctx.lineTo(
        width,
        height
      );

      ctx.closePath();

      ctx.fill();

      ctx.globalAlpha = 1;
    }

  } else if (basePattern === 'aurora-veil') {
    const veilN =
      layers;

    for (
      let i = 0;
      i < veilN;
      i++
    ) {
      const t =
        i / veilN;

      const color =
        getLayerColor(
          palette,
          i,
          veilN,
          config.isReversed
        );

      const xBase =
        (
          0.08 +
          t *
          0.84
        ) *
        width;

      const ampl =
        width *
        (
          0.06 +
          t *
          0.14
        ) *
        config.scale;

      const freq =
        0.7 +
        t *
        1.3;

      const phase =
        i *
        0.8 +
        config.seed;

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.15 +
        t *
        0.35;

      ctx.lineWidth =
        (
          width *
          (
            0.015 +
            (1 - t) *
            0.05
          )
        ) *
        (
          1 +
          config.randomness *
          0.5
        );

      ctx.lineCap =
        'round';

      ctx.beginPath();

      for (
        let y = 0;
        y <= height;
        y += height / 140
      ) {
        const n =
          perlinNoise(
            phase,
            (y / height) *
            freq *
            1.3,
            config.seed +
            i *
            41
          );

        const x =
          xBase +
          Math.sin(
            (y / height) *
            freq *
            Math.PI *
            2 +
            phase
          ) *
          ampl +
          n *
          ampl *
          0.6 *
          config.randomness;

        if (y === 0) {
          ctx.moveTo(
            x,
            y
          );
        } else {
          ctx.lineTo(
            x,
            y
          );
        }
      }

      ctx.stroke();

      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();

  const outCanvas =
    document.createElement(
      'canvas'
    );

  outCanvas.width =
    outWidth;

  outCanvas.height =
    outHeight;

  const outCtx =
    outCanvas.getContext(
      '2d'
    )!;

  const srcX =
    (
      width -
      outWidth
    ) /
    2;

  const srcY =
    (
      height -
      outHeight
    ) /
    2;

  outCtx.drawImage(
    canvas,
    srcX,
    srcY,
    outWidth,
    outHeight,
    0,
    0,
    outWidth,
    outHeight
  );

  return outCanvas;
}

export async function downloadWallpaper(
  canvas: HTMLCanvasElement,
  filename: string
): Promise<void> {
  const link =
    document.createElement(
      'a'
    );

  link.href =
    canvas.toDataURL(
      'image/png'
    );

  link.download =
    filename;

  link.click();
}