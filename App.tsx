import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ComparisonView from './components/ComparisonView';
import StyleSelector from './components/StyleSelector';
import AboutModal from './components/AboutModal';
import ApiKeyModal from './components/ApiKeyModal';
import { LoadingIcon, ErrorIcon } from './components/Icons';
import { AppState, ErrorState, CharcoalStyle } from './types';
import { fileToBase64 } from './utils/imageUtils';
import { generateCharcoalSketch } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<CharcoalStyle>(CharcoalStyle.STANDARD);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // API Key Management
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  // Load key on startup
  useEffect(() => {
    // Strictly check localStorage only. Do not fallback to process.env to ensure BYOK behavior.
    const storedKey = localStorage.getItem('gemini_api_key') || '';
    setApiKey(storedKey);
    
    // If no key found in local storage, prompt user immediately
    if (!storedKey) {
        setIsKeyModalOpen(true);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    if (key) {
        localStorage.setItem('gemini_api_key', key);
    } else {
        localStorage.removeItem('gemini_api_key');
    }
    setApiKey(key);
    setIsKeyModalOpen(false);
  };

  const handleFileSelection = useCallback((file: File) => {
    // Preview the original image immediately
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);
    setImageFile(file);
    setAppState(AppState.IDLE); // Ready to process
    setError(null);
    // Reset style to standard on new file
    setSelectedStyle(CharcoalStyle.STANDARD);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!imageFile) return;

    if (!apiKey) {
        setIsKeyModalOpen(true);
        return;
    }

    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      const base64 = await fileToBase64(imageFile);
      // Pass the current API key to the service
      const resultUrl = await generateCharcoalSketch(base64, imageFile.type, selectedStyle, apiKey);
      setGeneratedImage(resultUrl);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error("Processing failed:", err);
      setAppState(AppState.ERROR);
      
      // Check if error is related to authentication or permissions
      if (err.message.includes('API key') || err.message.includes('API Anahtarı') || err.message.includes('403')) {
        setError({
            message: "Yetkilendirme Hatası",
            details: "API anahtarınız geçersiz, süresi dolmuş veya yetkisi yok. Lütfen anahtar simgesine tıklayarak kontrol edin."
        });
      } else {
        setError({
            message: "İşlem Başarısız",
            details: err.message
        });
      }
    }
  }, [imageFile, selectedStyle, apiKey]);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setOriginalImage(null);
    setGeneratedImage(null);
    setImageFile(null);
    setError(null);
    setSelectedStyle(CharcoalStyle.STANDARD);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onAboutClick={() => setIsAboutOpen(true)} 
        onKeyClick={() => setIsKeyModalOpen(true)}
      />
      
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ApiKeyModal 
        isOpen={isKeyModalOpen} 
        onClose={() => setIsKeyModalOpen(false)} 
        onSave={handleSaveKey}
        initialKey={apiKey}
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        
        {/* IDLE or Initial Preview State */}
        {appState === AppState.IDLE && !originalImage && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
                Fotoğraflarınızı Sanata Dönüştürün
              </h2>
              <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                Yapay zeka teknolojisi ile fotoğraflarınızı saniyeler içinde profesyonel bir karakalem çizimine çevirin.
              </p>
            </div>
            <UploadZone onFileSelected={handleFileSelection} />
          </div>
        )}

        {/* Preview Selected Image before Processing */}
        {appState === AppState.IDLE && originalImage && (
          <div className="max-w-md mx-auto animate-fade-in flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-charcoal-200 mb-6">
              <img src={originalImage} alt="Preview" className="w-full h-auto max-h-[50vh] object-contain bg-charcoal-50" />
            </div>
            
            <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />

            <div className="flex gap-4 w-full">
               <button 
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl font-medium text-charcoal-600 bg-white border border-charcoal-300 hover:bg-charcoal-50 transition-colors"
              >
                Vazgeç
              </button>
              <button 
                onClick={handleProcess}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-charcoal-900 hover:bg-black transition-all shadow-lg hover:shadow-charcoal-500/25 transform active:scale-95"
              >
                Karakalem Yap
              </button>
            </div>
          </div>
        )}

        {/* LOADING State */}
        {appState === AppState.PROCESSING && (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 bg-charcoal-200 rounded-full animate-ping opacity-20"></div>
              <LoadingIcon className="w-16 h-16 text-charcoal-800 relative z-10" />
            </div>
            <h3 className="mt-8 text-xl font-semibold text-charcoal-800">Sanat Eseriniz Hazırlanıyor...</h3>
            <p className="mt-2 text-charcoal-500">Yapay zeka çizimi tamamlıyor, lütfen bekleyin.</p>
          </div>
        )}

        {/* ERROR State */}
        {appState === AppState.ERROR && (
          <div className="max-w-md mx-auto mt-12 text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100">
            <div className="flex justify-center">
              <ErrorIcon />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mt-4">{error?.message}</h3>
            <p className="text-charcoal-500 mt-2 mb-6">{error?.details}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-charcoal-800 text-white font-medium hover:bg-charcoal-900 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* SUCCESS State */}
        {appState === AppState.SUCCESS && originalImage && generatedImage && (
          <ComparisonView 
            originalUrl={originalImage} 
            generatedUrl={generatedImage}
            onReset={handleReset}
          />
        )}

      </main>

      <footer className="bg-white border-t border-charcoal-200 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-charcoal-400">
          <p>&copy; {new Date().getFullYear()} Karakalem AI. Gemini 2.5 Flash ile güçlendirilmiştir.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;