import React from 'react';

interface ImageGridProps {
  images: string[];
  onImageSelect: (image: string) => void;
  onImageDelete: (index: number) => void;
  onImageDownload: (image: string) => void;
}

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageSelect, onImageDownload, onImageDelete }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Your Pet Characters!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square bg-white p-2 rounded-xl shadow-md overflow-hidden group relative">
            <img src={image} alt={`Generated character ${index + 1}`} className="w-full h-full object-contain" />
             <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    title="Preview on Goods"
                    onClick={() => onImageSelect(image)} 
                    className="p-3 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                    <EyeIcon />
                </button>
                <button 
                    title="Download Image"
                    onClick={() => onImageDownload(image)} 
                    className="p-3 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                    <DownloadIcon />
                </button>
                <button 
                    title="Delete Image"
                    onClick={() => onImageDelete(index)} 
                    className="p-3 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                    <TrashIcon />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;