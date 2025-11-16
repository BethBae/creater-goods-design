
import React from 'react';

interface GoodsPreviewProps {
  image: string | null;
  onClose: () => void;
}

const GoodsPreview: React.FC<GoodsPreviewProps> = ({ image, onClose }) => {
  if (!image) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 max-w-4xl w-11/12 max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Goods Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* T-Shirt */}
          <div className="text-center">
            <h3 className="font-semibold text-slate-700 mb-2">T-Shirt</h3>
            <div className="bg-slate-100 rounded-lg p-4 relative aspect-square flex items-center justify-center">
              <img src="https://picsum.photos/seed/tshirt/400/400?grayscale" alt="T-shirt mockup" className="w-full h-full object-contain" />
              <img src={image} alt="Character on t-shirt" className="absolute w-1/3 h-1/3 object-contain" style={{ top: '30%' }} />
            </div>
          </div>

          {/* Mug */}
          <div className="text-center">
            <h3 className="font-semibold text-slate-700 mb-2">Mug</h3>
            <div className="bg-slate-100 rounded-lg p-4 relative aspect-square flex items-center justify-center">
              <img src="https://picsum.photos/seed/mug/400/400?grayscale" alt="Mug mockup" className="w-full h-full object-contain" />
              <img src={image} alt="Character on mug" className="absolute w-1/3 h-1/3 object-contain" style={{ left: '33%', top: '35%' }} />
            </div>
          </div>
          
          {/* Phone Case */}
          <div className="text-center">
            <h3 className="font-semibold text-slate-700 mb-2">Phone Case</h3>
            <div className="bg-slate-100 rounded-lg p-4 relative aspect-square flex items-center justify-center">
              <img src="https://picsum.photos/seed/phone/400/400?grayscale" alt="Phone case mockup" className="w-full h-full object-contain" />
              <img src={image} alt="Character on phone case" className="absolute w-1/2 h-1/2 object-contain" />
            </div>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-6 text-sm">This is a concept preview. You can use the generated image to create real products!</p>
      </div>
    </div>
  );
};

export default GoodsPreview;
