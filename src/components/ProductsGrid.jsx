// ==================== components/ProductsGrid.jsx ====================
import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';
import ProductCard from './ProductCard';

const ProductsGrid = ({ products, onQuickView, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center py-16'>
          <FunnelIcon className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>
            No products found
          </h3>
          <p className='text-gray-500'>
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
