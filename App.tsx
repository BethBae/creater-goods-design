import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import LoadingSpinner from './components/LoadingSpinner';
import ImageGrid from './components/ImageGrid';
import GoodsPreview from './components/GoodsPreview';
import { generateCharacterImage } from './services/geminiService';
import { STYLES } from './constants';

const LOCAL_STORAGE_KEY = 'pet-character-images';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>(() => {
    try {
      const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGoodsImage, setSelectedGoodsImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(generatedImages));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [generatedImages]);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Clear images for the *new* pet, but keep old ones if the user re-uploads the same pet
    // For simplicity here, we clear on any new upload.
    setGeneratedImages([]); 
    setError(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyleId) {
      setError("Please upload an image and select a style.");
      return;
    }
    
    const selectedStyle = STYLES.find(s => s.id === selectedStyleId);
    if (!selectedStyle) {
        setError("Invalid style selected.");
        return;
    }

    setIsLoading(true);
    setError(null);
    // Do not clear images here to allow multiple generations
    // setGeneratedImages([]);

    try {
      const resultImage = await generateCharacterImage(uploadedImage, selectedStyle.prompt);
      setGeneratedImages(prevImages => [resultImage, ...prevImages]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setGeneratedImages(currentImages => currentImages.filter((_, index) => index !== indexToDelete));
  };

  const handleImageDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const timestamp = new Date().getTime();
    link.download = `pet-character-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isGenerateDisabled = !uploadedImage || !selectedStyleId || isLoading;

  const generateButtonText = useMemo(() => {
    if (isLoading) return "Generating...";
    if (!uploadedImage) return "Upload an Image";
    if (!selectedStyleId) return "Select a Style";
    return "Generate Character";
  }, [isLoading, uploadedImage, selectedStyleId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <ImageUploader onImageUpload={handleImageUpload} previewUrl={previewUrl} />
                <StyleSelector 
                    onStyleSelect={setSelectedStyleId} 
                    selectedStyleId={selectedStyleId}
                    disabled={!uploadedImage}
                />
            </div>
            
            <div className="mt-8 text-center">
                 <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full md:w-auto px-12 py-4 bg-rose-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                    {generateButtonText}
                </button>
            </div>
        </div>

        {error && (
            <div className="mt-6 max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Oh no!</p>
                <p>{error}</p>
            </div>
        )}

        <div className="mt-8 max-w-4xl mx-auto">
            {isLoading ? (
                <div className="flex justify-center items-center h-48 bg-white rounded-2xl shadow-lg p-6">
                    <LoadingSpinner />
                </div>
            ) : (
                <ImageGrid 
                    images={generatedImages} 
                    onImageSelect={setSelectedGoodsImage}
                    onImageDelete={handleImageDelete}
                    onImageDownload={handleImageDownload}
                />
            )}
        </div>
      </main>
      <GoodsPreview image={selectedGoodsImage} onClose={() => setSelectedGoodsImage(null)} />
       <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Powered by Gemini. Create your own pet-tastic merchandise!</p>
      </footer>
    </div>
  );
};

export default App;