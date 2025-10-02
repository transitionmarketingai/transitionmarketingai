'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  status: 'active' | 'inactive' | 'draft';
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  badge?: string;
}

const categories: CategoryItem[] = [
  { id: 'products', name: 'Products', icon: '📦', badge: 'NEW' },
  { id: 'projects', name: 'Projects', icon: '✅' },
  { id: 'campaigns', name: 'Campaigns', icon: '📢' },
  { id: 'marketplace', name: 'Marketplace', icon: '🏪', badge: '1' },
  { id: 'automations', name: 'Automations', icon: '⚙️' },
  { id: 'auto-assignment', name: 'Automatic assignment', icon: '👥' },
  { id: 'sequences', name: 'Sequences', icon: '📋', badge: 'NEW' },
  { id: 'documents', name: 'Documents', icon: '📄' },
  { id: 'import', name: 'Import data', icon: '📥' },
  { id: 'export', name: 'Export data', icon: '📤' }
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('products');
  const [activeFilter, setActiveFilter] = useState('Transition Marketing');

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'products':
        return (
          <div className="space-y-6">
            {/* Products Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">0 products</span>
                  <div className="flex items-center space-x-2">
                    <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                      </svg>
                      {activeFilter}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex items-center justify-center h-96">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  📦
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No matched products</h2>
                <p className="text-gray-600 mb-6">
                  Try resetting your filter or{' '}
                  <button className="text-blue-600 hover:text-blue-800">view all products</button>.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
                  + Add Product
                </button>
              </div>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">1</span>
                <h3 className="font-semibold text-gray-900">New Marketplace Add-ons Available</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover powerful integrations and add-ons to enhance your CRM functionality.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Browse Marketplace
              </button>
            </div>

            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                🏪
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketplace</h2>
              <p className="text-gray-600 mb-6">
                Explore integrations, automations, and add-ons to supercharge your CRM.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
                Browse Add-ons
              </button>
            </div>
          </div>
        );

      case 'campaigns':
        return (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              📢
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketing Campaigns</h2>
            <p className="text-gray-600 mb-6">
              Create and manage marketing campaigns to drive sales growth.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
              Create Campaign
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              {activeCategory === 'projects' ? '✅' : '📋'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace(/-/g, ' ')}
            </h2>
            <p className="text-gray-600 mb-6">
              This feature is coming soon. Stay tuned for updates!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-100 border-r h-screen overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">🔧</h2>
            <div className="text-sm text-gray-600">Tools and apps</div>
          </div>

          {/* Categories */}
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                
                {category.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.badge === 'NEW' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Active Products:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span>Total Campaigns:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span>Marketplace Items:</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {renderCategoryContent()}
      </div>
    </div>
  );
}
