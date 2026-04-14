// ==================== components/inventory/DeleteConfirmModal.jsx ====================
import React, { useState } from 'react';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const DeleteConfirmModal = ({ isOpen, product, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const success = await onConfirm(product.id);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm'
          onClick={onClose}
        />

        <div className='relative bg-white rounded-2xl shadow-2xl max-w-md w-full'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                <ExclamationTriangleIcon className='w-6 h-6 text-red-600' />
              </div>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600'>
                <XMarkIcon className='w-5 h-5' />
              </button>
            </div>

            <h2 className='text-xl font-bold text-gray-900 mb-2'>
              Delete Product
            </h2>
            <p className='text-gray-600 mb-6'>
              Are you sure you want to delete{' '}
              <span className='font-semibold'>{product.name}</span>? This action
              cannot be undone.
            </p>

            <div className='flex gap-3'>
              <button
                onClick={onClose}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition'>
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50'>
                {loading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
