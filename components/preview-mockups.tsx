// preview-mockups.tsx - Fixed mobile preview
'use client';

import { useEffect, useRef, useState } from 'react';
import { WallpaperConfig, renderWallpaperToCanvas } from '@/lib/wallpaper-generator';

interface PreviewMockupsProps {
  config: WallpaperConfig;
}

export default function PreviewMockups({ config }: PreviewMockupsProps) {
  const canvasDesktopRef = useRef<HTMLCanvasElement>(null);
  const canvasPhoneRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState('09:41');
  const [date, setDate] = useState('Sunday, 14 de Junho');

  // Update time and date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      const formatter = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      setDate(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Render desktop canvas
  useEffect(() => {
    const render = async () => {
      if (!canvasDesktopRef.current) return;
      const canvas = await renderWallpaperToCanvas(1600, 900, config);
      const ctx = canvasDesktopRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
      }
    };
    render();
  }, [config]);

  // Render phone canvas - crop from desktop design
  useEffect(() => {
    const render = async () => {
      if (!canvasPhoneRef.current) return;
      
      // First render the full desktop version
      const desktopCanvas = await renderWallpaperToCanvas(1600, 900, config);
      
      // Crop the center portion for mobile (portrait crop from landscape)
      // The phone aspect ratio is ~9:19.5, so we need a tall narrow crop
      const phoneAspectRatio = 9 / 19.5; // ~0.4615
      const desktopAspectRatio = 16 / 9; // ~1.7778
      
      // For phone, we want to show the center portion of the desktop design
      // We'll crop a vertical strip from the center
      let cropWidth, cropHeight, cropX, cropY;
      
      // We want to show the full height of the design, cropped to phone aspect ratio
      // The phone is taller, so we crop width from the center
      const targetHeight = 900; // Use full desktop height
      const targetWidth = targetHeight * phoneAspectRatio; // ~415px
      
      cropWidth = targetWidth;
      cropHeight = targetHeight;
      cropX = (1600 - cropWidth) / 2; // Center horizontally
      cropY = 0; // Full height
      
      // Create a canvas for the phone preview
      const phoneCanvas = document.createElement('canvas');
      phoneCanvas.width = 430;
      phoneCanvas.height = 930;
      const phoneCtx = phoneCanvas.getContext('2d');
      
      if (phoneCtx) {
        // Draw the cropped portion scaled to fit the phone preview
        phoneCtx.drawImage(
          desktopCanvas,
          cropX, cropY, cropWidth, cropHeight, // Source
          0, 0, 430, 930 // Destination
        );
        
        // Draw the phone preview canvas onto the ref
        const ctx = canvasPhoneRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(phoneCanvas, 0, 0);
        }
      }
    };
    render();
  }, [config]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center w-full">
      {/* Desktop Preview */}
      <div className="relative">
        <div className="border-4 sm:border-8 border-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black" style={{ width: 'clamp(280px, 70vw, 560px)', aspectRatio: '16/9' }}>
          <canvas
            ref={canvasDesktopRef}
            width={1600}
            height={900}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
          {/* Overlay clock and date */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-white text-center">
              <p className="text-xs opacity-70 mb-1 sm:mb-2">{date}</p>
              <p className="text-3xl sm:text-5xl font-light tracking-tight">{time}</p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest mt-3 sm:mt-4">Desktop</p>
      </div>

      {/* iPhone Preview - Shows cropped version of desktop design */}
      <div className="relative">
        <div className="border-4 sm:border-8 border-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black" style={{ width: 'clamp(100px, 25vw, 145px)', aspectRatio: '9/19.5' }}>
          <canvas
            ref={canvasPhoneRef}
            width={430}
            height={930}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
          {/* Overlay clock */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-white text-center">
              <p className="text-sm sm:text-lg font-light tracking-tight">{time}</p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest mt-3 sm:mt-4">phone</p>
      </div>
    </div>
  );
}