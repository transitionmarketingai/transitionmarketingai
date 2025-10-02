'use client';

import React from 'react';

interface MobileNavProps {
  currentPage: string;
}

export default function MobileDashboardNav({ currentPage }: MobileNavProps) {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-[73px] z-30">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px]">
          {currentPage}
        </h1>
        
        {/* Mobile Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5-5-5h5v-12"></path>
            </svg>
          </button>
          
          <button className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span className="mr-1">✨</span> AI
          </button>
        </div>
      </div>
    </div>
  );
}
