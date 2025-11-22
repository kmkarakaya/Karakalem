import React from 'react';
import { CharcoalStyle, CHARCOAL_STYLE_LABELS } from '../types';

interface StyleSelectorProps {
  selectedStyle: CharcoalStyle;
  onSelect: (style: CharcoalStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  const styles = [
    { id: CharcoalStyle.STANDARD, desc: 'Dengeli kontrast' },
    { id: CharcoalStyle.LIGHT, desc: 'İnce çizgiler, hafif tonlar' },
    { id: CharcoalStyle.HEAVY, desc: 'Koyu tonlar, dramatik' },
    { id: CharcoalStyle.CROSS_HATCH, desc: 'Çizgisel tarama tekniği' },
  ];

  return (
    <div className="w-full mb-6">
      <h3 className="text-sm font-semibold text-charcoal-700 mb-3 uppercase tracking-wider">Çizim Stili Seçin</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {styles.map((style) => (
            <div
                key={style.id}
                onClick={() => onSelect(style.id)}
                className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 flex flex-col justify-center ${
                    selectedStyle === style.id
                    ? 'border-charcoal-800 bg-charcoal-100 shadow-sm'
                    : 'border-charcoal-200 hover:border-charcoal-400 bg-white'
                }`}
            >
                <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-sm ${selectedStyle === style.id ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                        {CHARCOAL_STYLE_LABELS[style.id]}
                    </span>
                    {selectedStyle === style.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-charcoal-800" />
                    )}
                </div>
                <p className="text-xs text-charcoal-500">{style.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;