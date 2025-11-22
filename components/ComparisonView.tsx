import React from 'react';
import { DownloadIcon, RefreshIcon } from './Icons';
import { downloadImage } from '../utils/imageUtils';

interface ComparisonViewProps {
  originalUrl: string;
  generatedUrl: string;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ originalUrl, generatedUrl, onReset }) => {
  
  const handleDownload = () => {
    const timestamp = new Date().getTime();
    downloadImage(generatedUrl, `karakalem-ai-${timestamp}.png`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-fade-in">
      
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal-600 bg-white border border-charcoal-200 rounded-full hover:bg-charcoal-50 hover:text-charcoal-900 transition-all shadow-sm"
        >
          <RefreshIcon className="w-4 h-4" />
          Yeni Resim
        </button>
        
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-charcoal-800 rounded-full hover:bg-charcoal-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <DownloadIcon className="w-4 h-4" />
          Karakalemi İndir
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Original */}
        <div className="flex flex-col space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-charcoal-100 aspect-[3/4] group">
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              Orijinal
            </div>
            <img 
              src={originalUrl} 
              alt="Original Upload" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Generated */}
        <div className="flex flex-col space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-charcoal-800 aspect-[3/4] group">
            <div className="absolute top-3 left-3 bg-charcoal-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
              Karakalem (AI)
            </div>
            <img 
              src={generatedUrl} 
              alt="Generated Sketch" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;