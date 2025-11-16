
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
        <h2 className="text-xl font-semibold text-slate-700 mb-2 text-center"><span className="bg-rose-500 text-white rounded-full h-8 w-8 inline-flex items-center justify-center mr-2">1</span>Upload Your Pet's Photo</h2>
        <div 
            onClick={handleClick}
            className="mt-4 w-full aspect-square bg-white rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all duration-300 relative overflow-hidden group"
        >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Pet preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold">Click to change image</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <UploadIcon />
            <p className="mt-2 text-slate-500">Click here to upload an image</p>
            <p className="text-xs text-slate-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
