// page.tsx
'use client';

import { useState } from 'react';
import { Settings, Download, RotateCw, Sun, Moon } from 'lucide-react';
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

  // Slate/Dark theme colors - lighter and more refined
  const bgClass = uiTheme === 'dark' 
    ? 'bg-[#1a1a1e] text-[#e8e8ea]' 
    : 'bg-white text-gray-900';
  const borderClass = uiTheme === 'dark' 
    ? 'border-[#2a2a30]' 
    : 'border-gray-200';
  const secondaryBgClass = uiTheme === 'dark' 
    ? 'bg-[#121215]' 
    : 'bg-gray-50';
  const hoverClass = uiTheme === 'dark' 
    ? 'hover:bg-[#2a2a30]' 
    : 'hover:bg-gray-50';
  const textSecondaryClass = uiTheme === 'dark' 
    ? 'text-[#8888aa]' 
    : 'text-gray-500';
  const inputBgClass = uiTheme === 'dark'
    ? 'bg-[#1a1a1e]'
    : 'bg-white';
  const cardBgClass = uiTheme === 'dark'
    ? 'bg-[#141418] border-[#2a2a30]'
    : 'bg-white border-gray-200';

  return (
    <main className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`border-b ${borderClass} ${bgClass} px-3 sm:px-8 py-3 sm:py-6`}>
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`${uiTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold`}>
              STRX
            </div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">StratumX</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={toggleUiTheme}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${hoverClass}`}
            >
              {uiTheme === 'light' ? (
                <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
              ) : (
                <Sun className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
              )}
            </button>
            <button className={`p-1.5 sm:p-2 rounded-lg transition-colors ${hoverClass}`}>
              <Settings className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Sidebar - Pattern & Palette (Desktop) */}
        <div className={`hidden lg:block w-72 border-r ${borderClass} ${bgClass} p-6 overflow-y-auto`}>
          <div className="mb-6">
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-3`}>Patterns</h3>
            <PatternSelector value={config.pattern} onChange={handlePatternChange} />
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

        {/* Mobile Controls (Below Preview) */}
        <div className="lg:hidden order-2 px-3 py-3 space-y-4 bg-inherit">
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-2`}>Patterns</h3>
            <PatternSelector value={config.pattern} onChange={handlePatternChange} />
          </div>

          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-widest ${textSecondaryClass} mb-2`}>Palettes</h3>
            <PaletteSelector value={config.palette} onChange={handlePaletteChange} />
          </div>

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
                className={`w-full accent-black dark:accent-white ${inputBgClass}`}
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
                className={`w-full accent-black dark:accent-white ${inputBgClass}`}
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
                className={`w-full accent-black dark:accent-white ${inputBgClass}`}
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
                className={`w-full accent-black dark:accent-white ${inputBgClass}`}
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
            <div className={`text-center text-xs ${textSecondaryClass}`}>1290 × 2796 px</div>
          </div>
        </div>

        {/* Mobile Advanced Controls & Download */}
        <div className="lg:hidden order-3 px-3 py-3 border-t bg-inherit ${borderClass}">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Layers: {config.layerCount}</label>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={config.layerCount}
                  onChange={(e) => handleLayerCountChange(parseInt(e.target.value))}
                  className="w-full accent-black dark:accent-white"
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
                  className="w-full accent-black dark:accent-white"
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
                  className="w-full accent-black dark:accent-white"
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
                  className="w-full accent-black dark:accent-white"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={`text-xs font-medium ${textSecondaryClass}`}>Height: {Math.round(config.heightAdjustment * 100)}%</label>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.01"
                value={config.heightAdjustment}
                onChange={(e) => handleHeightAdjustmentChange(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
            </div>

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
        </div>
      </div>
    </main>
  );
}