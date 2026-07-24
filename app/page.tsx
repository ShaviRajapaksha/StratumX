// page.tsx - Updated with fixes and height adjustment
'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings, Download, RotateCw, Sun, Moon } from 'lucide-react';
import WallpaperCanvas from '@/components/wallpaper-canvas';
import PatternSelector from '@/components/pattern-selector';
import PaletteSelector from '@/components/palette-selector';
import PreviewMockups from '@/components/preview-mockups';
import { WallpaperConfig, PatternType, PaletteType, renderWallpaperToCanvas, downloadWallpaper } from '@/lib/wallpaper-generator';

export default function Page() {
  const [config, setConfig] = useState<WallpaperConfig>({
    pattern: 'stripes',
    palette: 'emerald',
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    setUiTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLayerCountChange = (count: number) => {
    setConfig(prev => ({ ...prev, layerCount: Math.max(4, Math.min(30, count)) }));
  };

  const handleRandomnessChange = (value: number) => {
    setConfig(prev => ({ ...prev, randomness: Math.max(0, Math.min(3, value)) }));
  };

  const handleScaleChange = (value: number) => {
    setConfig(prev => ({ ...prev, scale: Math.max(0.5, Math.min(3, value)) }));
  };

  const handleRotationChange = (value: number) => {
    setConfig(prev => ({ ...prev, rotation: value % 360 }));
  };

  const handleHeightAdjustmentChange = (value: number) => {
    setConfig(prev => ({ ...prev, heightAdjustment: Math.max(0.2, Math.min(0.8, value)) }));
  };

  const handleDownload = async (type: 'desktop' | 'mobile') => {
    setIsDownloading(true);
    try {
      const width = type === 'desktop' ? 3840 : 1290;
      const height = type === 'desktop' ? 2160 : 2796;
      
      const canvas = await renderWallpaperToCanvas(width, height, config);
      const filename = type === 'desktop' ? 'StratumX-desktop-4k.png' : 'StratumX-mobile.png';
      
      await downloadWallpaper(canvas, filename);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const bgClass = uiTheme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-gray-900';
  const borderClass = uiTheme === 'dark' ? 'border-gray-800' : 'border-gray-200';
  const secondaryBgClass = uiTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const hoverClass = uiTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const textSecondaryClass = uiTheme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <main className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-200`}>
      {/* Header */}
      <header className={`border-b ${borderClass} ${bgClass} px-4 sm:px-8 py-6`}>
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-black text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold">STR</div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">StratumX</h1>
          </div>
          <p className={`text-xs sm:text-sm uppercase tracking-widest hidden sm:block flex-1 text-center mx-4 ${textSecondaryClass}`}>Create your minimalist wallpaper.</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleUiTheme}
              className={`p-2 rounded-lg transition-colors ${hoverClass}`}
            >
              {uiTheme === 'light' ? (
                <Moon className={`w-5 h-5 ${textSecondaryClass}`} />
              ) : (
                <Sun className={`w-5 h-5 ${textSecondaryClass}`} />
              )}
            </button>
            <button className={`p-2 rounded-lg transition-colors ${hoverClass}`}>
              <Settings className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Sidebar - Main Controls */}
        <div className={`w-full lg:w-80 border-b lg:border-b-0 lg:border-r ${borderClass} ${bgClass} p-4 sm:p-8 overflow-y-auto max-h-screen lg:max-h-none`}>
          {/* Pattern Selection */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3 sm:mb-4`}>Standard</h3>
            <PatternSelector value={config.pattern} onChange={handlePatternChange} />
          </div>

          {/* Palette Selection */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3 sm:mb-4`}>Palette</h3>
            <PaletteSelector value={config.palette} onChange={handlePaletteChange} />
          </div>

          {/* Depth Reversal */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3 sm:mb-4`}>Depth</h3>
            <button
              onClick={() => handleReverseChange(!config.isReversed)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm font-medium border ${
                config.isReversed 
                  ? `${uiTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`
                  : `border-gray-300 ${hoverClass}`
              }`}
            >
              {config.isReversed ? '⟲ Reversed' : 'Normal'}
            </button>
          </div>

        </div>

        {/* Main Preview Area */}
        <div className={`flex-1 flex flex-col items-center justify-center gap-4 sm:gap-8 p-4 sm:p-8 ${secondaryBgClass}`}>
          <PreviewMockups config={config} />
        </div>

        {/* Right Sidebar - Advanced Controls & Download */}
        <div className={`w-full lg:w-80 border-t lg:border-t-0 lg:border-l ${borderClass} ${bgClass} p-4 sm:p-8 overflow-y-auto max-h-screen lg:max-h-none`}>
          {/* Advanced Options */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-4`}>Advanced</h3>
            
            {/* Layer Count */}
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
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Randomness - Fixed */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Randomness: {config.randomness.toFixed(2)}</label>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.05"
                value={config.randomness}
                onChange={(e) => handleRandomnessChange(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Scale - Fixed */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Scale: {config.scale.toFixed(2)}</label>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={config.scale}
                onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Rotation - Fixed */}
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
                className="w-full accent-black dark:accent-white"
              />
            </div>

            {/* Height Adjustment - New */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Height Adjustment: {Math.round(config.heightAdjustment * 100)}%</label>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.01"
                value={config.heightAdjustment}
                onChange={(e) => handleHeightAdjustmentChange(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>More Depth</span>
                <span>More Design</span>
              </div>
            </div>
          </div>

          {/* Generate New */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3 sm:mb-4`}>Variation</h3>
            <button
              onClick={handleGenerateNew}
              className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border ${borderClass} rounded-lg transition-colors text-xs sm:text-sm font-medium ${hoverClass}`}
            >
              <RotateCw className="w-4 h-4" />
              Generate a New One
            </button>
          </div>
          {/* Download Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={() => handleDownload('desktop')}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 ${
                uiTheme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              } rounded-lg transition-colors text-xs sm:text-sm font-medium disabled:opacity-50`}
            >
              <Download className="w-4 h-4" />
              Download Desktop
            </button>
            <div className={`text-center text-xs ${textSecondaryClass}`}>3840 × 2160 px</div>

            <button
              onClick={() => handleDownload('mobile')}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border ${borderClass} rounded-lg transition-colors text-xs sm:text-sm font-medium ${hoverClass} disabled:opacity-50`}
            >
              <Download className="w-4 h-4" />
              Download Phone
            </button>
            <div className={`text-center text-xs ${textSecondaryClass}`}>1290 × 2796 px</div>
          </div>
        </div>
      </div>
    </main>
  );
}