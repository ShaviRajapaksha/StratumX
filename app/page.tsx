'use client';

import { useState, useEffect } from 'react';
import { Settings, Download, RotateCw, Sun, Moon, Heart, Sparkles } from 'lucide-react';
import PatternSelector from '@/components/pattern-selector';
import PaletteSelector from '@/components/palette-selector';
import PreviewMockups from '@/components/preview-mockups';
import { WallpaperConfig, PatternType, PaletteType, renderWallpaperToCanvas, downloadWallpaper } from '@/lib/wallpaper-generator';

export default function Page() {
  const [config, setConfig] = useState<WallpaperConfig>({
    pattern: 'stripes',
    palette: 'monochrome',
    isDark: false,
    isReversed: false,
    seed: Math.random() * 10000,
    layerCount: 12,
    randomness: 1,
    scale: 1,
    rotation: 0,
    heightAdjustment: 0.6,
  });

  const [uiTheme, setUiTheme] = useState<'light' | 'dark'>('light');
  const [isDownloading, setIsDownloading] = useState(false);

  // Synchronize state with Tailwind v4's `.dark` class ancestor rule
  useEffect(() => {
    const root = document.documentElement;
    if (uiTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [uiTheme]);

  const handlePatternChange = (pattern: PatternType) => {
    setConfig(prev => ({ ...prev, pattern }));
  };

  const handlePaletteChange = (palette: PaletteType) => {
    setConfig(prev => ({ ...prev, palette }));
  };

  const handleReverseChange = (isReversed: boolean) => {
    setConfig(prev => ({ ...prev, isReversed }));
  };

  const handleGenerateNew = () => {
    setConfig(prev => ({
      ...prev,
      seed: Math.random() * 10000,
    }));
  };

  const toggleUiTheme = () => {
    setUiTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLayerCountChange = (count: number) => {
    setConfig(prev => ({ ...prev, layerCount: Math.max(4, Math.min(30, count)) }));
  };

  const handleRandomnessChange = (value: number) => {
    setConfig(prev => ({ ...prev, randomness: Math.max(0, Math.min(1.5, value)) }));
  };

  const handleScaleChange = (value: number) => {
    setConfig(prev => ({ ...prev, scale: Math.max(0.5, Math.min(2, value)) }));
  };

  const handleRotationChange = (value: number) => {
    setConfig(prev => ({ ...prev, rotation: value % 360 }));
  };

  const handleHeightAdjustmentChange = (value: number) => {
    setConfig(prev => ({ ...prev, heightAdjustment: Math.max(0.2, Math.min(1, value)) }));
  };

  const handleDownload = async (type: 'desktop' | 'mobile') => {
    setIsDownloading(true);
    try {
      const width = type === 'desktop' ? 3840 : 1290;
      const height = 2160;

      const canvas = await renderWallpaperToCanvas(width, height, config);
      const filename = type === 'desktop' ? 'StratumXY-desktop-4k.png' : 'StratumXY-mobile.png';

      await downloadWallpaper(canvas, filename);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const bgClass = uiTheme === 'dark' ? 'bg-[#1a1a1e] text-[#e8e8ea]' : 'bg-white text-gray-900';
  const borderClass = uiTheme === 'dark' ? 'border-[#2a2a30]' : 'border-gray-200';
  const secondaryBgClass = uiTheme === 'dark' ? 'bg-[#121215]' : 'bg-gray-50';
  const hoverClass = uiTheme === 'dark' ? 'hover:bg-[#2a2a30]' : 'hover:bg-gray-50';
  const textSecondaryClass = uiTheme === 'dark' ? 'text-[#8888aa]' : 'text-gray-500';

  return (
    <main className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`border-b ${borderClass} ${bgClass} px-3 sm:px-8 py-3 sm:py-6`}>
        <div className="relative flex items-center justify-between max-w-full">
          {/* Left - STRX and StratumXY (desktop) */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            <div className={`${uiTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold`}>
              STRX
            </div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">StratumXY</h1>
          </div>

          {/* Left - STRX only (mobile) */}
          <div className="lg:hidden flex items-center">
            <div className={`${uiTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} px-2 py-1 rounded-lg text-xs font-semibold`}>
              STRX
            </div>
          </div>

          {/* Center - Description (desktop) */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <p className="text-2xs text-gray-500 dark:text-gray-400 font-light tracking-wider whitespace-nowrap">
              Create your own wallpaper
            </p>
          </div>

          {/* Center - StratumXY (mobile) */}
          <div className="lg:hidden flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl font-bold tracking-tight">StratumXY</h1>
          </div>

          {/* Right - Theme toggle & Settings */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleUiTheme}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${hoverClass}`}
              aria-label="Toggle Theme"
            >
              {uiTheme === 'light' ? (
                <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
              ) : (
                <Sun className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
              )}
            </button>
            <button className={`p-1.5 sm:p-2 rounded-lg transition-colors ${hoverClass}`} aria-label="Settings">
              <Settings className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Sidebar - Pattern & Palette (Desktop) */}
        <div className={`hidden lg:block w-72 border-r ${borderClass} ${bgClass} p-6 overflow-y-auto`}>
          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3`}>Patterns</h3>
            <PatternSelector
              value={config.pattern}
              palette={config.palette}
              onChange={handlePatternChange}
            />
          </div>

          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3`}>Palettes</h3>
            <PaletteSelector value={config.palette} onChange={handlePaletteChange} />
          </div>

          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3`}>Depth</h3>
            <button
              onClick={() => handleReverseChange(!config.isReversed)}
              className={`w-full px-4 py-2.5 rounded-lg transition-colors text-sm font-medium border ${
                config.isReversed
                  ? `${uiTheme === 'dark' ? 'bg-[#2a2a30] border-[#3a3a44]' : 'bg-gray-100 border-gray-300'}`
                  : `border-gray-300 ${hoverClass}`
              }`}
            >
              {config.isReversed ? '⟲ Reversed' : 'Normal'}
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden order-2 px-3 py-3 space-y-4 bg-inherit">
          {/* Pattern */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-2`}>Patterns</h3>
            <PatternSelector
              value={config.pattern}
              palette={config.palette}
              onChange={handlePatternChange}
            />
          </div>

          {/* Advanced Controls (Mobile) */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-2`}>Advanced</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Layers: {config.layerCount}</label>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={config.layerCount}
                  onChange={(e) => handleLayerCountChange(parseInt(e.target.value))}
                  className="slider-input w-full"
                />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Random: {config.randomness.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={config.randomness}
                  onChange={(e) => handleRandomnessChange(parseFloat(e.target.value))}
                  className="slider-input w-full"
                />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Scale: {config.scale.toFixed(2)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={config.scale}
                  onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                  className="slider-input w-full"
                />
              </div>
              <div>
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Rotate: {config.rotation}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={config.rotation}
                  onChange={(e) => handleRotationChange(parseFloat(e.target.value))}
                  className="slider-input w-full"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateNew}
              className={`w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5 border ${borderClass} rounded-lg transition-colors text-sm font-medium ${hoverClass}`}
            >
              <RotateCw className="w-4 h-4" />
              Generate New
            </button>
          </div>

          {/* Palettes */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-2`}>Palettes</h3>
            <PaletteSelector value={config.palette} onChange={handlePaletteChange} />
          </div>

          {/* Depth */}
          <button
            onClick={() => handleReverseChange(!config.isReversed)}
            className={`w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium border ${
              config.isReversed
                ? `${uiTheme === 'dark' ? 'bg-[#2a2a30] border-[#3a3a44]' : 'bg-gray-100 border-gray-300'}`
                : `border-gray-300 ${hoverClass}`
            }`}
          >
            {config.isReversed ? '⟲ Reversed' : 'Normal'}
          </button>

          {/* Download */}
          <div className="flex gap-2">
            <button
              onClick={handleGenerateNew}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 border ${borderClass} rounded-lg transition-colors text-xs font-medium ${hoverClass}`}
            >
              <RotateCw className="w-3 h-3" />
              New
            </button>
            <button
              onClick={() => handleDownload('desktop')}
              disabled={isDownloading}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 ${
                uiTheme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              } rounded-lg transition-colors text-xs font-medium disabled:opacity-50`}
            >
              <Download className="w-3 h-3" />
              Desktop
            </button>
            <button
              onClick={() => handleDownload('mobile')}
              disabled={isDownloading}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 border ${borderClass} rounded-lg transition-colors text-xs font-medium ${hoverClass} disabled:opacity-50`}
            >
              <Download className="w-3 h-3" />
              Phone
            </button>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className={`flex-1 flex flex-col items-center justify-center gap-4 sm:gap-8 p-3 sm:p-8 ${secondaryBgClass} order-1 lg:order-2`}>
          <PreviewMockups config={config} />
        </div>

        {/* Right Sidebar - Advanced Controls & Download (Desktop) */}
        <div className={`hidden lg:block w-72 border-l ${borderClass} ${bgClass} p-6 overflow-y-auto order-3`}>
          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-4`}>Advanced</h3>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Layers: {config.layerCount}</label>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={config.layerCount}
                onChange={(e) => handleLayerCountChange(parseInt(e.target.value))}
                className="slider-input w-full"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Randomness: {config.randomness.toFixed(2)}</label>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={config.randomness}
                onChange={(e) => handleRandomnessChange(parseFloat(e.target.value))}
                className="slider-input w-full"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Scale: {config.scale.toFixed(2)}</label>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={config.scale}
                onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                className="slider-input w-full"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Rotation: {config.rotation}°</label>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={config.rotation}
                onChange={(e) => handleRotationChange(parseFloat(e.target.value))}
                className="slider-input w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3`}>Variation</h3>
            <button
              onClick={handleGenerateNew}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border ${borderClass} rounded-lg transition-colors text-sm font-medium ${hoverClass}`}
            >
              <RotateCw className="w-4 h-4" />
              Generate New
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleDownload('desktop')}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 ${
                uiTheme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              } rounded-lg transition-colors text-sm font-medium disabled:opacity-50`}
            >
              <Download className="w-4 h-4" />
              Download Desktop
            </button>
            <div className={`text-center text-xs ${textSecondaryClass}`}>3840 × 2160 px</div>

            <button
              onClick={() => handleDownload('mobile')}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border ${borderClass} rounded-lg transition-colors text-sm font-medium ${hoverClass} disabled:opacity-50`}
            >
              <Download className="w-4 h-4" />
              Download Phone
            </button>
            <div className={`text-center text-xs ${textSecondaryClass}`}>1290 × 2160 px</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">StratumXY</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Developed by Shavindu Rajapaksha</span>
          </div>
        </div>
      </footer>
    </main>
  );
}