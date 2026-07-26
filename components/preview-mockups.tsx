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
  const frameBorderColor = isDarkMode ? 'border-gray-10' : 'border-black';
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
        sm:gap-4
        md:gap-6
        lg:gap-8
        xl:gap-10

        pt-5
        sm:pt-4
        md:pt-3
        lg:pt-0

        -translate-y-2
        sm:-translate-y-3
        md:-translate-y-4
        lg:-translate-y-24
      `}
    >
      {/* DESKTOP */}
      <div className="relative">
        <div
          className={`
            relative

            h-[110px]
            sm:h-[145px]
            md:h-[190px]
            lg:h-[250px]
            xl:h-[300px]
            2xl:h-[350px]

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
              sm:w-[20%]
              md:w-[20%]
              lg:w-[20%]

              h-[5px]
              sm:h-[9px]
              md:h-[11px]
              lg:h-[14px]
              xl:h-[16px]

              rounded-b-md
              sm:rounded-b-lg

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

              -translate-y-4
              sm:-translate-y-5
              md:-translate-y-6
              lg:-translate-y-18
            `}
          >
            <div className="text-white text-center">
              <p
                className={`
                  text-[6px]
                  sm:text-[7px]
                  md:text-[9px]
                  lg:text-xs
                  mb-[-2.5]
                  opacity-70
                  
                `}
              >
                {date}
              </p>

              <p
                className={`
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                  xl:text-6xl

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

            text-[8px]
            sm:text-[9px]
            md:text-[10px]

            uppercase
            tracking-widest

            mt-1.5
            sm:mt-2
            lg:mt-3
          `}
        >
          Desktop
        </p>
      </div>

      {/* PHONE */}
      <div className="relative">
        <div
          className={`
            relative

            h-[110px]
            sm:h-[145px]
            md:h-[190px]
            lg:h-[250px]
            xl:h-[300px]
            2xl:h-[350px]

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

          {/* iPhone 17 Dynamic Island */}
          <div
            className={`
              absolute
              left-1/2
              -translate-x-1/2
              z-10

              top-[2%]
              sm:top-[2%]
              md:top-[2%]

              w-[26%]
              sm:w-[24%]
              md:w-[22%]
              lg:w-[30%]

              h-[5px]
              sm:h-[10px]
              md:h-[12px]
              lg:h-[16px]
              xl:h-[14px]

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

              -translate-y-6
              sm:-translate-y-8
              md:-translate-y-10
              lg:-translate-y-20
            `}
          >
            <div className="text-white text-center">
              <p
                className={`
                  text-[4px]
                  sm:text-[5px]
                  md:text-[6px]
                  lg:text-[7px]

                  opacity-60
                  mb-[-2.5]
                `}
              >
                {date}
              </p>

              <p
                className={`
                  text-sm
                  sm:text-base
                  md:text-lg
                  lg:text-4xl
                  xl:text-3xl

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

            text-[8px]
            sm:text-[9px]
            md:text-[10px]

            uppercase
            tracking-widest

            mt-1.5
            sm:mt-2
            lg:mt-3
          `}
        >
          Phone
        </p>
      </div>
    </div>
  );
}