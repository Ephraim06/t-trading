// ==================== components/inventory/BulkOrderModal.jsx ====================
import React, { useState } from 'react';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const BulkOrderModal = ({ isOpen, onClose, onSubmit, products }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts({
      ...selectedProducts,
      [productId]: {
        ...selectedProducts[productId],
        quantity: parseInt(quantity) || 0,
      },
    });
  };

  const handleSelectProduct = (product) => {
    if (selectedProducts[product.id]) {
      const newSelected = { ...selectedProducts };
      delete newSelected[product.id];
      setSelectedProducts(newSelected);
    } else {
      setSelectedProducts({
        ...selectedProducts,
        [product.id]: {
          product: product,
          quantity: product.reorderLevel - product.quantity,
        },
      });
    }
  };

  const calculateTotal = () => {
    return Object.values(selectedProducts).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const orderData = {
      products: Object.values(selectedProducts).map((item) => ({
        id: item.product.id,
        name: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        unitPrice: item.product.price,
        total: item.product.price * item.quantity,
      })),
      total: calculateTotal(),
      date: new Date().toISOString(),
    };

    const success = await onSubmit(orderData);
    setLoading(false);
    if (success) {
      onClose();
      setSelectedProducts({});
    }
  };

  if (!isOpen) return null;

  const criticalProducts = products.filter((p) => p.status === 'Critical');
  const lowStockProducts = products.filter((p) => p.status === 'Low Stock');

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm'
          onClick={onClose}
        />

        <div className='relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
          <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <ShoppingCartIcon className='w-6 h-6 text-blue-600' />
              <h2 className='text-xl font-bold text-gray-900'>
                Create Bulk Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600'>
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>

          <div className='p-6'>
            {/* Critical Stock Alert */}
            {criticalProducts.length > 0 && (
              <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <h4 className='text-sm font-semibold text-red-800 mb-2'>
                  Critical Stock Items
                </h4>
                <p className='text-sm text-red-700'>
                  The following items are critically low and require immediate
                  reorder:
                </p>
                <ul className='mt-2 space-y-1'>
                  {criticalProducts.map((p) => (
                    <li key={p.id} className='text-sm text-red-700'>
                      • {p.name}: Only {p.quantity} {p.unit} remaining (Reorder
                      level: {p.reorderLevel})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Selection */}
            <div className='space-y-4'>
              <h3 className='font-semibold text-gray-900'>
                Select Products to Reorder
              </h3>
              <div className='space-y-3'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition ${
                      selectedProducts[product.id]
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <div className='flex items-center gap-4 flex-1'>
                      <input
                        type='checkbox'
                        checked={!!selectedProducts[product.id]}
                        onChange={() => handleSelectProduct(product)}
                        className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
                      />
                      <div className='flex-1'>
                        <p className='font-semibold text-gray-900'>
                          {product.name}
                        </p>
                        <p className='text-xs text-gray-500 mt-0.5'>
                          SKU: {product.sku} | Current Stock: {product.quantity}{' '}
                          {product.unit}
                        </p>
                        <p className='text-xs text-gray-500'>
                          Reorder at: {product.reorderLevel} {product.unit}
                        </p>
                      </div>
                    </div>
                    {selectedProducts[product.id] && (
                      <div className='flex items-center gap-3'>
                        <input
                          type='number'
                          value={selectedProducts[product.id].quantity}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                          className='w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                          min='1'
                        />
                        <span className='text-sm font-medium text-gray-900'>
                          R
                          {product.price *
                            selectedProducts[product.id].quantity}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {Object.keys(selectedProducts).length > 0 && (
              <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <h3 className='font-semibold text-gray-900 mb-3'>
                  Order Summary
                </h3>
                <div className='space-y-2 mb-4'>
                  {Object.values(selectedProducts).map((item) => (
                    <div
                      key={item.product.id}
                      className='flex justify-between text-sm'>
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>R{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className='border-t border-gray-200 pt-3'>
                  <div className='flex justify-between font-semibold'>
                    <span>Total</span>
                    <span className='text-lg text-blue-600'>
                      R{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className='flex gap-3 mt-6'>
              <button
                onClick={onClose}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition'>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedProducts).length === 0 || loading}
                className='flex-1 px-4 py-2 bg-[#ABCF42] text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50'>
                {loading ? 'Creating Order...' : 'Create Purchase Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderModal;
