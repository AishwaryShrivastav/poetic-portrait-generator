
import React from 'react';

const AppHeader = () => {
  return (
    <header className="py-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-theme-700 to-theme-500 mb-2">
          Poem & Portrait
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Generate personalized poems and artistic portraits with AI
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
