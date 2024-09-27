import Image from 'next/image';
import React from 'react';
import Logo from './Logo';

function Header() {
  return (
    <div className="flex items-center h-[60px]">
      {/* Sidebar */}
      <Logo />

      {/* Main Content */}
      <div className="flex-1 bg-gray-700 text-white">
        {/* Header */}
        <header className="bg-gray-700 flex justify-between items-center px-6 py-4">
          <h1 className="text-xl">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div>Devteam!</div>
            {/* Avatar */}
            <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white">D</span>
            </div>
          </div>
        </header>
        
        {/* Page content can go here */}
      </div>
    </div>
  );
}

export default Header;
