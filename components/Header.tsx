
import React from 'react';

const PawPrintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a2.5 2.5 0 015 0c0 1.624-.96 3-2.5 3S10 5.124 10 3.5zM5 3.5a2.5 2.5 0 00-5 0c0 1.624.96 3 2.5 3S5 5.124 5 3.5zM10 10c-1.933 0-3.5 1.567-3.5 3.5S8.067 17 10 17s3.5-1.567 3.5-3.5S11.933 10 10 10zM17.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM2.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
        <div className="flex justify-center items-center gap-4">
            <PawPrintIcon />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                Pet Character Goods Studio
            </h1>
        </div>
        <p className="mt-2 text-md md:text-lg text-slate-600 max-w-2xl mx-auto">
            Turn your pet's photo into an adorable character and see it come to life on custom goods!
        </p>
    </header>
  );
};

export default Header;
