import React from 'react';
import { ImageIconStyled, KeyIcon } from './Icons';

interface HeaderProps {
  onAboutClick: () => void;
  onKeyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onKeyClick }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-charcoal-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-charcoal-800 p-2 rounded-lg flex-shrink-0">
             <ImageIconStyled className="text-white" />
          </div>
          <h1 className="text-sm sm:text-lg md:text-xl font-bold text-charcoal-900 tracking-tight truncate">
            Murat Karakaya Akademi Karakalem<span className="text-charcoal-500 font-light">AI</span>
          </h1>
        </div>
        <nav className="flex-shrink-0 ml-2 sm:ml-4 flex items-center gap-2">
          <button 
            onClick={onKeyClick}
            className="p-2 text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-100 rounded-full transition-colors focus:outline-none"
            title="API Anahtarı Ayarları"
          >
            <KeyIcon />
          </button>
          <button 
            onClick={onAboutClick}
            className="text-sm font-medium text-charcoal-600 hover:text-charcoal-900 transition-colors focus:outline-none px-3 py-2 rounded-md hover:bg-charcoal-50"
          >
            Hakkında
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;