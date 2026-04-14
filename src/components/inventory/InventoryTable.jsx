// ==================== components/inventory/InventoryTable.jsx ====================
import React, { useState } from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { CubeIcon } from '@heroicons/react/24/solid';

const InventoryTable = ({ products, onEdit, onDelete }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusBadge = (status) => {
    const badges = {
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-amber-100 text-amber-700',
      Critical: 'bg-red-100 text-red-700',
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const getStockPercentage = (quantity, maxCapacity) => {
    return Math.round((quantity / maxCapacity) * 100);
  };

  if (products.length === 0) {
    return (
      <div className='bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100'>
        <CubeIcon    className='w-16 h-16 text-gray-300 mx-auto mb-4' />
        <h3 className='text-lg font-semibold text-gray-700 mb-2'>
          No products found
        </h3>
        <p className='text-gray-500'>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
              <th className='px-6 py-4'>Product</th>
              <th className='px-6 py-4'>SKU</th>
              <th className='px-6 py-4'>Category</th>
              <th className='px-6 py-4'>Stock Level</th>
              <th className='px-6 py-4'>Location</th>
              <th className='px-6 py-4'>Price</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {displayedProducts.map((product) => (
              <tr key={product.id} className='hover:bg-gray-50 transition'>
                <td className='px-6 py-4'>
                  <div>
                    <p className='font-semibold text-gray-900'>
                      {product.name}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {product.grade}
                    </p>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <code className='text-xs font-mono bg-gray-100 px-2 py-1 rounded'>
                    {product.sku}
                  </code>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-sm text-gray-600'>
                    {product.category}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div>
                    <div className='flex justify-between text-xs mb-1'>
                      <span className='font-medium'>
                        {product.quantity.toLocaleString()}
                      </span>
                      <span className='text-gray-500'>{product.unit}</span>
                    </div>
                    <div className='w-32 bg-gray-200 rounded-full h-1.5'>
                      <div
                        className='bg-blue-600 h-1.5 rounded-full'
                        style={{
                          width: `${getStockPercentage(product.quantity, product.maxCapacity)}%`,
                        }}></div>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      Reorder at {product.reorderLevel} {product.unit}
                    </p>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span className='text-sm text-gray-600'>
                    {product.location}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <span className='font-semibold text-gray-900'>
                    R{product.price}
                  </span>
                  <span className='text-xs text-gray-500 ml-1'>/unit</span>
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => onEdit(product)}
                      className='p-1 text-gray-400 hover:text-blue-600 transition'>
                      <PencilIcon className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className='p-1 text-gray-400 hover:text-red-600 transition'>
                      <TrashIcon className='w-4 h-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50'>
          <p className='text-sm text-gray-600'>
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, products.length)} of{' '}
            {products.length} products
          </p>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className='px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'>
              Previous
            </button>
            <span className='px-3 py-1 text-sm bg-blue-600 text-white rounded-lg'>
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className='px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
