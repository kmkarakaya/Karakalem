import React, { useCallback, useState } from 'react';
import { UploadIcon } from './Icons';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelected(file);
      } else {
        alert("Lütfen geçerli bir resim dosyası yükleyin.");
      }
    }
  }, [onFileSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  }, [onFileSelected]);

  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <div 
        className={`
          relative group cursor-pointer
          flex flex-col items-center justify-center 
          w-full h-64 rounded-3xl 
          border-2 border-dashed transition-all duration-300 ease-in-out
          bg-white shadow-sm hover:shadow-md
          ${isDragging ? 'border-charcoal-600 bg-charcoal-50 scale-[1.02]' : 'border-charcoal-300 hover:border-charcoal-500'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="text-center pointer-events-none">
          <div className="flex justify-center transition-transform duration-300 group-hover:-translate-y-2">
             <UploadIcon />
          </div>
          <p className="text-lg font-semibold text-charcoal-800 mb-1">Resim Yükle</p>
          <p className="text-sm text-charcoal-500 px-4">
            Sürükleyip bırakın veya dosya seçmek için tıklayın
          </p>
          <p className="text-xs text-charcoal-400 mt-4 uppercase tracking-wide font-medium">
            JPG, PNG, WEBP
          </p>
        </div>
      </div>
      <p className="text-center text-charcoal-500 mt-6 text-sm max-w-md mx-auto">
        Karakalem efekti için net ve iyi aydınlatılmış portreler veya manzaralar en iyi sonucu verir.
      </p>
    </div>
  );
};

export default UploadZone;