'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

interface TopNavProps {
  currentPage: string;
}

export default function DashboardTopNav({ currentPage }: TopNavProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">
          T
        </div>
        <h1 className="text-xl font-semibold text-gray-900">{currentPage}</h1>
      </div>

      {/* Center */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Transition CRM"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {/* Add button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>

        {/* AI Chat */}
        <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          AI chat
        </button>

        {/* Help */}
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.75-.907.103-1.794.38-2.615.86a4.2 4.2 0 01-1.149.98V19h-2v-4.25"></path>
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-gray-500 hover:text-gray-700 p-2 relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5a7.954 7.954 0 01-3-5c0-2.21.895-4.21 2.35-5.65A8.005 8.005 0 0115 7a8.006 8.006 0 013 5zm-7 0H3l5-5v5a8.006 8.006 0 003 5zm7-7H15l3-3H4z"></path>
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
