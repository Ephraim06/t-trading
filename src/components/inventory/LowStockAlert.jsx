// ==================== components/inventory/LowStockAlert.jsx ====================
import React from 'react';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const LowStockAlert = ({ products }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (products.length === 0 || dismissed) return null;

  const criticalProducts = products.filter((p) => p.status === 'Critical');
  const lowStockProducts = products.filter((p) => p.status === 'Low Stock');

  return (
    <div className='bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-3'>
          <ExclamationTriangleIcon className='w-5 h-5 text-amber-600 mt-0.5' />
          <div>
            <h4 className='text-sm font-semibold text-amber-800 mb-1'>
              Low Stock Alert
            </h4>
            <div className='space-y-1 text-sm text-amber-700'>
              {criticalProducts.length > 0 && (
                <p>
                  <span className='font-bold'>Critical:</span>{' '}
                  {criticalProducts.map((p) => p.name).join(', ')} - Immediate
                  reorder required!
                </p>
              )}
              {lowStockProducts.length > 0 && (
                <p>
                  <span className='font-bold'>Low Stock:</span>{' '}
                  {lowStockProducts.map((p) => p.name).join(', ')} - Reorder
                  soon
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className='text-amber-600 hover:text-amber-800'>
          <XMarkIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default LowStockAlert;
