// ==================== components/inventory/InventoryHeader.jsx ====================
import React from 'react';
import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const InventoryHeader = ({ title, subtitle, onAddProduct, onBulkOrder }) => {
  return (
    <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
      <div className='px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
            <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={onBulkOrder}
              className='inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition'>
              <ShoppingCartIcon className='w-4 h-4' />
              Bulk Order
            </button>
            <button
              onClick={onAddProduct}
              className='inline-flex items-center gap-2 px-4 py-2 bg-[#ABCF42] text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-sm'>
              <PlusIcon className='w-4 h-4' />
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;
