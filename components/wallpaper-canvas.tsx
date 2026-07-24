'use client';

import { useEffect, useRef } from 'react';
import { WallpaperConfig, renderWallpaperToCanvas } from '@/lib/wallpaper-generator';

interface WallpaperCanvasProps {
  config: WallpaperConfig;
  width: number;
  height: number;
}

export default function WallpaperCanvas({ config, width, height }: WallpaperCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = async () => {
      if (!canvasRef.current) return;
      const canvas = await renderWallpaperToCanvas(width, height, config);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
      }
    };
    render();
  }, [config, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="max-w-full h-auto"
      style={{ display: 'block' }}
    />
  );
}
