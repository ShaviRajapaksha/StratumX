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

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // Detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

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

  // Desktop wallpaper
  useEffect(() => {
    const render = async () => {
      if (!canvasDesktopRef.current) return;

      const canvas = await renderWallpaperToCanvas(
        1600,
        900,
        config
      );

      const ctx = canvasDesktopRef.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, 1600, 900);
        ctx.drawImage(canvas, 0, 0);
      }
    };

    render();
  }, [config]);

  // Phone wallpaper
  useEffect(() => {
    const render = async () => {
      if (!canvasPhoneRef.current) return;

      const desktopCanvas = await renderWallpaperToCanvas(
        1600,
        900,
        config
      );

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

      const bgColor = config.isReversed
        ? palette[0]
        : palette[palette.length - 1];

      phoneCtx.fillStyle = bgColor;
      phoneCtx.fillRect(0, 0, 430, 930);

      phoneCtx.drawImage(
        desktopCanvas,
        cropX,
        0,
        targetWidth,
        targetHeight,
        0,
        0,
        430,
        930
      );

      const ctx = canvasPhoneRef.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, 430, 930);
        ctx.drawImage(phoneCanvas, 0, 0);
      }
    };

    render();
  }, [config]);

  // Frame colors based on theme
  const frameBorderColor = isDarkMode ? 'border-black' : 'border-black';
  const frameBgColor = isDarkMode ? 'bg-gray-10' : 'bg-black';
  const frameShadowClass = isDarkMode ? 'shadow-white/5' : 'shadow-xl';

  return (
    <div
      className={`
        w-full
        flex
        flex-row
        items-center
        justify-center

        gap-2
        sm:gap-3
        md:gap-4
        lg:gap-6
        xl:gap-8
        2xl:gap-10
      `}
    >
      {/* DESKTOP */}
      <div className="relative flex-shrink-0">
        <div
          className={`
            relative

            h-[120px]
            sm:h-[160px]
            md:h-[200px]
            lg:h-[240px]
            xl:h-[300px]
            2xl:h-[360px]

            border
            sm:border-2
            md:border-3
            lg:border-4
            xl:border-5

            ${frameBorderColor}
            rounded-lg
            sm:rounded-xl
            lg:rounded-2xl

            overflow-hidden
            shadow-lg
            ${frameShadowClass}
            ${frameBgColor}
          `}
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

          {/* MacBook Pro M4 notch */}
          <div
            className={`
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              z-10

              w-[14%]
              sm:w-[18%]
              md:w-[20%]
              lg:w-[20%]

              h-[7px]
              sm:h-[7px]
              md:h-[9px]
              lg:h-[12px]
              xl:h-[15px]
              2xl:h-[18px]

              rounded-b-[1.5px]
              sm:rounded-b-[2.5px]
              md:rounded-b-[3px]
              lg:rounded-b-[4px]
              xl:rounded-b-[5.5px]
              2xl:rounded-b-[7px]

              bg-black
              pointer-events-none
            `}
          />

          {/* Desktop Clock */}
          <div
            className={`
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none

              -translate-y-6
              sm:-translate-y-10
              md:-translate-y-14
              lg:-translate-y-16
              xl:-translate-y-20
              2xl:-translate-y-24
            `}
          >
            <div className="text-white text-center">
              <p
                className={`
                  text-[5px]
                  sm:text-[6px]
                  md:text-[8px]
                  lg:text-[10px]
                  xl:text-xs
                  2xl:text-sm
                  mb-[-1px]
                  sm:mb-[-2px]
                  md:mb-[-2.5px]
                  opacity-70
                `}
              >
                {date}
              </p>

              <p
                className={`
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  lg:text-4xl
                  xl:text-5xl
                  2xl:text-6xl

                  font-light
                  tracking-tight
                `}
              >
                {time}
              </p>
            </div>
          </div>
        </div>

        <p
          className={`
            text-center
            text-gray-500
            dark:text-gray-400

            text-[7px]
            sm:text-[8px]
            md:text-[9px]
            lg:text-[10px]
            xl:text-[11px]

            uppercase
            tracking-widest

            mt-1
            sm:mt-1.5
            lg:mt-2
          `}
        >
          Desktop
        </p>
      </div>

      {/* PHONE */}
      <div className="relative flex-shrink-0">
        <div
          className={`
            relative

            h-[120px]
            sm:h-[160px]
            md:h-[200px]
            lg:h-[240px]
            xl:h-[300px]
            2xl:h-[360px]

            border
            sm:border-2
            md:border-3
            lg:border-4
            xl:border-5

            ${frameBorderColor}
            rounded-lg
            sm:rounded-xl
            lg:rounded-2xl

            overflow-hidden
            shadow-lg
            ${frameShadowClass}
            ${frameBgColor}
          `}
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

          {/* iPhone Dynamic Island */}
          <div
            className={`
              absolute
              left-1/2
              -translate-x-1/2
              z-10

              top-[2%]

              w-[25%]
              sm:w-[28%]
              md:w-[30%]
              lg:w-[32%]
              xl:w-[30%]

              h-[5px]
              sm:h-[7px]
              md:h-[9px]
              lg:h-[12px]
              xl:h-[15px]
              2xl:h-[18px]

              rounded-full

              bg-black
              pointer-events-none
            `}
          />

          {/* Phone Clock */}
          <div
            className={`
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none

              -translate-y-8
              sm:-translate-y-10
              md:-translate-y-14
              lg:-translate-y-16
              xl:-translate-y-20
              2xl:-translate-y-24
            `}
          >
            <div className="text-white text-center">
              <p
                className={`
                  text-[3px]
                  sm:text-[4px]
                  md:text-[5px]
                  lg:text-[7px]
                  xl:text-[9px]
                  2xl:text-[10px]

                  opacity-60
                  mb-[-1px]
                  sm:mb-[-1.5px]
                  md:mb-[-2px]
                  lg:mb-[-3px]
                  xl:mb-[-3.5px]
                `}
              >
                {date}
              </p>

              <p
                className={`
                  text-xs
                  sm:text-sm
                  md:text-base
                  lg:text-xl
                  xl:text-2xl
                  2xl:text-3xl

                  font-light
                  tracking-tight
                `}
              >
                {time}
              </p>
            </div>
          </div>
        </div>

        <p
          className={`
            text-center
            text-gray-500
            dark:text-gray-400

            text-[7px]
            sm:text-[8px]
            md:text-[9px]
            lg:text-[10px]
            xl:text-[11px]

            uppercase
            tracking-widest

            mt-1
            sm:mt-1.5
            lg:mt-2
          `}
        >
          Phone
        </p>
      </div>
    </div>
  );
}