// ==================== components/Filters.jsx ====================
import React, { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid';
import { FunnelIcon as FunnelOutline } from '@heroicons/react/24/outline';

const Filters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  sortOptions,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current sort option label
  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt === sortBy);
    return option || 'Sort by';
  };

  return (
    <>
      {/* Mobile Filter Bar - Amazon style */}
      <div className='sticky top-16 z-40 bg-white border-b border-gray-200 lg:hidden'>
        <div className='px-4 py-3'>
          <div className='flex items-center gap-3'>
            {/* Mobile Search */}
            <div className='flex-1 relative'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400'
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition'>
              <FunnelOutline className='w-4 h-4' />
              Filters
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {isMobileFiltersOpen && (
            <div className='mt-3 pt-3 border-t border-gray-100'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-700'>
                  Categories
                </span>
                <button
                  onClick={() => setSelectedCategory('All Products')}
                  className='text-xs text-blue-600 hover:text-blue-700'>
                  Clear all
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
                      selectedCategory === category
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={
                      selectedCategory === category
                        ? { backgroundColor: '#A6CE39' }
                        : {}
                    }>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filters - Amazon style */}
      <div className='hidden lg:block bg-white border-b border-gray-200 sticky top-16 z-40'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between gap-6'>
            {/* Categories - Amazon style horizontal scroll */}
            <div className='flex-1 overflow-x-auto'>
              <div className='flex items-center gap-1'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                      selectedCategory === category
                        ? 'text-gray-900 border-b-2'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={
                      selectedCategory === category
                        ? { borderBottomColor: '#A6CE39', color: '#A6CE39' }
                        : {}
                    }>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side controls */}
            <div className='flex items-center gap-4 flex-shrink-0'>
              {/* Search - Amazon style */}
              <div className='relative'>
                <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-64 focus:outline-none focus:border-gray-400'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-3 top-1/2 -translate-y-1/2'>
                    <XMarkIcon className='w-4 h-4 text-gray-400 hover:text-gray-600' />
                  </button>
                )}
              </div>

              {/* Sort Dropdown - Amazon style */}
              <div className='relative' ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-400 transition bg-white'>
                  <AdjustmentsHorizontalIcon className='w-4 h-4' />
                  {getCurrentSortLabel()}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isSortOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${
                          sortBy === option
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600'
                        }`}
                        style={sortBy === option ? { color: '#A6CE39' } : {}}>
                        {option}
                        {sortBy === option && (
                          <span className='float-right'>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar - Amazon style */}
      {(selectedCategory !== 'All Products' || searchQuery) && (
        <div className='bg-gray-50 border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2'>
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='text-xs text-gray-500'>Active filters:</span>
              {selectedCategory !== 'All Products' && (
                <div className='flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md text-xs'>
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory('All Products')}
                    className='ml-1 text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='w-3 h-3' />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className='flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md text-xs'>
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className='ml-1 text-gray-400 hover:text-gray-600'>
                    <XMarkIcon className='w-3 h-3' />
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSearchQuery('');
                }}
                className='text-xs text-blue-600 hover:text-blue-700'>
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results count - Amazon style */}
      <div className='hidden lg:block bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
          <p className='text-sm text-gray-600'>
            Showing <span className='font-medium text-gray-900'>0</span> results
          </p>
        </div>
      </div>
    </>
  );
};

export default Filters;
