
import React from 'react';

const ProcessingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-t-4 border-theme-500 animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-t-4 border-theme-300 animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-theme-500 rounded-full animate-pulse-slow"></div>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-xl font-semibold text-theme-700 dark:text-theme-300">
          Creating Your Masterpiece
        </h3>
        
        <div className="max-w-sm mx-auto">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p className="animate-pulse-slow">Crafting your personalized poem...</p>
            <p className="animate-pulse-slow" style={{ animationDelay: "0.5s" }}>
              Generating artistic portrait...
            </p>
            <p className="animate-pulse-slow" style={{ animationDelay: "1s" }}>
              Finalizing your unique creation...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoader;
