// ==================== components/inventory/InventoryFilters.jsx ====================
import React from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const InventoryFilters = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockStatusFilter,
  onStockStatusChange,
  sortBy,
  onSortChange,
}) => {
  const categories = ['all', 'Industrial', 'Medical', 'Specialty'];
  const stockStatuses = ['all', 'In Stock', 'Low Stock', 'Critical'];

  return (
    <div className='bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {/* Search */}
        <div className='relative'>
          <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search products, SKU, or category...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* Category Filter */}
        <div className='relative'>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className='w-full appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <ChevronDownIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
        </div>

        {/* Stock Status Filter */}
        <div className='relative'>
          <select
            value={stockStatusFilter}
            onChange={(e) => onStockStatusChange(e.target.value)}
            className='w-full appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'>
            {stockStatuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Stock Status' : status}
              </option>
            ))}
          </select>
          <ChevronDownIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
        </div>

        {/* Sort By */}
        <div className='relative'>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className='w-full appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'>
            <option value='name'>Sort by: Name</option>
            <option value='quantity'>Sort by: Stock Level</option>
            <option value='price'>Sort by: Price</option>
            <option value='status'>Sort by: Status</option>
          </select>
          <ChevronDownIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
