import React, { useState, useEffect } from 'react';
import { KeyIcon, CloseIcon } from './Icons';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  initialKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, initialKey }) => {
  const [keyInput, setKeyInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setKeyInput(initialKey);
    }
  }, [isOpen, initialKey]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(keyInput.trim());
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-charcoal-900 hover:bg-charcoal-100 rounded-full transition-colors"
        >
          <CloseIcon />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-charcoal-100 rounded-xl text-charcoal-800">
                <KeyIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-charcoal-900">API Anahtarı Ayarları</h2>
          </div>

          <p className="text-charcoal-600 text-sm mb-6 leading-relaxed">
            Bu uygulamanın çalışabilmesi için kendi Google Gemini API anahtarınıza ihtiyacınız vardır. Anahtarınız sadece tarayıcınızda saklanır ve sunucularımıza gönderilmez.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-charcoal-700 mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 rounded-xl border border-charcoal-300 focus:border-charcoal-800 focus:ring-2 focus:ring-charcoal-200 outline-none transition-all bg-charcoal-50 font-mono text-sm"
              />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-800 flex flex-col gap-1">
                   <span>Henüz anahtarınız yok mu?</span>
                   <a 
                     href="https://aistudio.google.com/app/apikey" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="font-bold underline hover:text-blue-600"
                   >
                     Google AI Studio'dan ücretsiz anahtar alın →
                   </a>
                </p>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => { setKeyInput(''); onSave(''); }}
                    className="px-4 py-3 rounded-xl text-charcoal-600 font-medium bg-charcoal-100 hover:bg-charcoal-200 transition-colors text-sm"
                >
                    Anahtarı Sil
                </button>
                <button
                    type="submit"
                    disabled={!keyInput}
                    className="flex-1 px-4 py-3 rounded-xl text-white font-bold bg-charcoal-900 hover:bg-black transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Kaydet ve Devam Et
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;