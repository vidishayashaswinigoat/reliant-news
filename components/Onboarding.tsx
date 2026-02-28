
import React, { useState } from 'react';
import { genres } from '../data/mockData';

interface OnboardingProps {
  onComplete: (selectedGenres: string[]) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const MAX_GENRES = 10;

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(genre)) {
        newSet.delete(genre);
      } else if (newSet.size < MAX_GENRES) {
        newSet.add(genre);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    if (selectedGenres.size > 0) {
      onComplete(Array.from(selectedGenres));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
        Welcome to Reliant
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        What kind of news do you like to read? Choose up to {MAX_GENRES} genres to personalize your feed.
      </p>
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {genres.map(genre => {
          const isSelected = selectedGenres.has(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {selectedGenres.size} / {MAX_GENRES} selected
        </p>
        <button
          onClick={handleSubmit}
          disabled={selectedGenres.size === 0}
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          Build My Feed
        </button>
      </div>
    </div>
  );
};
   