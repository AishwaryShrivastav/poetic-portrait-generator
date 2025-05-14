
import React from 'react';
import logoLeft from '../assets/logo-left.svg';
import logoRight from '../assets/logo-right.svg';

const AppHeader = () => {
  return (
    <header className="py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-16 h-16">
          <img src={logoLeft} alt="Left Logo" className="w-full h-full object-contain" />
        </div>
        <div className="w-16 h-16">
          <img src={logoRight} alt="Right Logo" className="w-full h-full object-contain" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
