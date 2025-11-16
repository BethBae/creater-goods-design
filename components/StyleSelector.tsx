
import React from 'react';
import { STYLES } from '../constants';
import type { StyleOption } from '../types';

interface StyleSelectorProps {
  onStyleSelect: (styleId: string) => void;
  selectedStyleId: string | null;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onStyleSelect, selectedStyleId, disabled }) => {
  return (
    <div className={`w-full transition-opacity duration-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
        <h2 className="text-xl font-semibold text-slate-700 mb-2 text-center"><span className="bg-rose-500 text-white rounded-full h-8 w-8 inline-flex items-center justify-center mr-2">2</span>Choose a Style</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {STYLES.map((style: StyleOption) => (
                <div
                    key={style.id}
                    onClick={() => !disabled && onStyleSelect(style.id)}
                    className={`
                        relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform
                        ${disabled ? '' : 'hover:scale-105'}
                        ${selectedStyleId === style.id ? 'ring-4 ring-rose-500 ring-offset-2' : 'ring-1 ring-slate-200'}
                    `}
                >
                    <img src={style.thumbnailUrl} alt={style.name} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h3 className="absolute bottom-2 left-2 text-white font-bold text-sm">{style.name}</h3>
                    {selectedStyleId === style.id && (
                        <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

export default StyleSelector;
