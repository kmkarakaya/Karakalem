import React from 'react';
import { CloseIcon, ImageIconStyled } from './Icons';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-charcoal-900 hover:bg-charcoal-100 rounded-full transition-colors"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-charcoal-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
            <ImageIconStyled className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
            Murat Karakaya Akademi
          </h2>
          <h3 className="text-lg font-medium text-charcoal-600 mb-6">
            Karakalem<span className="text-charcoal-400 font-light">AI</span>
          </h3>

          <div className="text-charcoal-600 text-sm leading-relaxed space-y-4 mb-8">
            <p>
              Bu uygulama, yüklediğiniz fotoğrafları yapay zeka teknolojisi kullanarak saniyeler içinde sanatsal karakalem çizimlerine dönüştürür.
            </p>
            <p>
              <strong>Google Gemini 2.5 Flash</strong> modeli kullanılarak geliştirilmiştir. Farklı çizim stilleri (Eskiz, Gölge, Tarama) ile fotoğraflarınıza sanatsal bir dokunuş katabilirsiniz.
            </p>
          </div>

          <div className="border-t border-charcoal-100 pt-6">
            <p className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-2">
              Geliştirici
            </p>
            <a 
              href="https://muratkarakaya.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-charcoal-800 font-semibold hover:underline decoration-2 underline-offset-2"
            >
              Murat Karakaya Akademi
            </a>
          </div>
        </div>
        
        <div className="bg-charcoal-50 px-6 py-4 flex justify-center">
            <button 
                onClick={onClose}
                className="text-sm font-medium text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
                Kapat
            </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;