// preview-mockups.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  WallpaperConfig,
  renderWallpaperToCanvas,
  PALETTES,
} from '@/lib/wallpaper-generator';

interface PreviewMockupsProps {
  config: WallpaperConfig;
}

export default function PreviewMockups({
  config,
}: PreviewMockupsProps) {
  const canvasDesktopRef = useRef<HTMLCanvasElement>(null);
  const canvasPhoneRef = useRef<HTMLCanvasElement>(null);

  const [time, setTime] = useState('09:41');
  const [date, setDate] = useState('Sunday, June 14, 1999');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
      const formatter = new Intl.DateTimeFormat('en-US', {
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

  useEffect(() => {
    const render = async () => {
      if (!canvasDesktopRef.current) return;
      const canvas = await renderWallpaperToCanvas(1600, 900, config);
      const ctx = canvasDesktopRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1600, 900);
        ctx.drawImage(canvas, 0, 0);
      }
    };
    render();
  }, [config]);

  useEffect(() => {
    const render = async () => {
      if (!canvasPhoneRef.current) return;
      const desktopCanvas = await renderWallpaperToCanvas(1600, 900, config);
      const phoneAspectRatio = 9 / 19.5;
      const targetHeight = 900;
      const targetWidth = targetHeight * phoneAspectRatio;
      const cropX = (1600 - targetWidth) / 2;

      const phoneCanvas = document.createElement('canvas');
      phoneCanvas.width = 430;
      phoneCanvas.height = 930;
      const phoneCtx = phoneCanvas.getContext('2d');
      if (!phoneCtx) return;

      const palette = PALETTES[config.palette];
      const bgColor = config.isReversed ? palette[0] : palette[palette.length - 1];
      
      phoneCtx.fillStyle = bgColor;
      phoneCtx.fillRect(0, 0, 430, 930);
      
      phoneCtx.drawImage(
        desktopCanvas,
        cropX, 0, targetWidth, targetHeight,
        0, 0, 430, 930
      );

      const ctx = canvasPhoneRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 430, 930);
        ctx.drawImage(phoneCanvas, 0, 0);
      }
    };
    render();
  }, [config]);

  return (
    <div
      className="
        flex
        flex-row
        items-center
        justify-center
        gap-3
        sm:gap-5
        md:gap-8
        lg:gap-12
        xl:gap-16
        w-full
        -translate-y-6
        sm:-translate-y-8
        md:-translate-y-10
        lg:-translate-y-20
      "
    >
      <div className="relative">
        <div
          className="
            border-2
            sm:border-3
            md:border-4
            lg:border-6
            xl:border-8
            border-black
            rounded-xl
            sm:rounded-2xl
            lg:rounded-3xl
            overflow-hidden
            shadow-2xl
            bg-black
            w-[210px]
            sm:w-[280px]
            md:w-[380px]
            lg:w-[500px]
            xl:w-[600px]
            2xl:w-[700px]
          "
          style={{
            aspectRatio: '16/9',
          }}
        >
          <canvas
            ref={canvasDesktopRef}
            width={1600}
            height={900}
            className="w-full h-full"
            style={{
              display: 'block',
            }}
          />

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none
              -translate-y-8
              sm:-translate-y-10
              md:-translate-y-12
              lg:-translate-y-16
            "
          >
            <div className="text-white text-center">
              <p
                className="
                  text-[7px]
                  sm:text-[9px]
                  md:text-xs
                  lg:text-sm
                  opacity-70
                  mb-1
                  sm:mb-2
                "
              >
                {date}
              </p>
              <p
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-7xl
                  xl:text-8xl
                  font-light
                  tracking-tight
                "
              >
                {time}
              </p>
            </div>
          </div>
        </div>

        <p
          className="
            text-center
            text-gray-500
            dark:text-gray-400
            text-[9px]
            sm:text-[10px]
            md:text-xs
            uppercase
            tracking-widest
            mt-2
            sm:mt-3
            lg:mt-4
          "
        >
          Desktop
        </p>
      </div>

      <div className="relative">
        <div
          className="
            border-2
            sm:border-3
            md:border-4
            lg:border-6
            xl:border-8
            border-black
            rounded-xl
            sm:rounded-2xl
            lg:rounded-3xl
            overflow-hidden
            shadow-2xl
            bg-black
            w-[70px]
            sm:w-[90px]
            md:w-[110px]
            lg:w-[145px]
            xl:w-[165px]
            2xl:w-[190px]
          "
          style={{
            aspectRatio: '9/19.5',
          }}
        >
          <canvas
            ref={canvasPhoneRef}
            width={430}
            height={930}
            className="w-full h-full"
            style={{
              display: 'block',
            }}
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
              -translate-y-12
              sm:-translate-y-16
              md:-translate-y-20
              lg:-translate-y-24
            "
          >
            <p
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-4xl
                xl:text-5xl
                font-light
                tracking-tight
                text-white
              "
            >
              {time}
            </p>
          </div>
        </div>

        <p
          className="
            text-center
            text-gray-500
            dark:text-gray-400
            text-[9px]
            sm:text-[10px]
            md:text-xs
            uppercase
            tracking-widest
            mt-2
            sm:mt-3
            lg:mt-4
          "
        >
          Phone
        </p>
      </div>
    </div>
  );
}