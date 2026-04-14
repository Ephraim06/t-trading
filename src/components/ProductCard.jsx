// ==================== components/ProductCard.jsx ====================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EyeIcon,
  ShoppingCartIcon,
  StarIcon as StarIconSolid,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <StarIconSolid
          key={i}
          className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400'
        />,
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className='relative'>
          <StarIconOutline className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400' />
          <div className='absolute inset-0 overflow-hidden w-1/2'>
            <StarIconSolid className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400' />
          </div>
        </div>,
      );
    } else {
      stars.push(
        <StarIconOutline
          key={i}
          className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300'
        />,
      );
    }
  }
  return stars;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getStockInfo = () => {
    if (!product.inStock)
      return {
        text: 'Out of Stock',
        color: 'bg-red-500',
        textColor: 'text-red-600',
      };
    if (product.stock > 50)
      return {
        text: 'In Stock',
        color: 'bg-green-500',
        textColor: 'text-green-600',
      };
    if (product.stock > 20)
      return {
        text: 'Low Stock',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
      };
    return {
      text: 'Limited Stock',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    };
  };

  const stockInfo = getStockInfo();

  const getGradient = () => {
    const gradients = {
      'Gas Water Heaters': 'from-blue-50 to-cyan-50',
      'Camp Kits': 'from-emerald-50 to-teal-50',
      'Brass Fittings': 'from-amber-50 to-orange-50',
      'PEX Fittings': 'from-indigo-50 to-purple-50',
      'Cages & Cabinets': 'from-slate-50 to-gray-50',
    };
    return gradients[product.category] || 'from-gray-50 to-blue-50';
  };

  const gradient = getGradient();

  return (
    <div
      className='group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Amazon-style badge for deals */}
      {product.compareAtPrice && product.compareAtPrice > product.price && (
        <div className='absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
          Save{' '}
          {Math.round(
            ((product.compareAtPrice - product.price) /
              product.compareAtPrice) *
              100,
          )}
          %
        </div>
      )}

      {/* Wishlist button  */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 ${
          isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}>
        <HeartIcon className='w-4 h-4' />
      </button>

      {/* Product Image Section  */}
      <Link to={`/product/${product.id}`} className='block'>
        <div
          className='flex items-center justify-center overflow-hidden rounded-lg'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Product';
            }}
          />

          {/* Hover overlay  */}
          {isHovered && (
            <div className='absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className='bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-white transition'>
                Quick Look
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info Section  */}
      <div className='p-3 sm:p-4'>
        {/* Brand/Category */}
        <div className='text-xs text-gray-500 mb-1'>
          {product.brand || product.category}
        </div>

        {/* Product Title  with line clamp */}
        <Link to={`/product/${product.id}`}>
          <h3 className='font-medium text-gray-800 text-sm sm:text-base mb-1 line-clamp-2 hover:text-green-500 transition min-h-[40px]'>
            {product.name}
          </h3>
        </Link>

        {/* Rating  */}
        <div className='flex items-center gap-2 mb-2'>
          <div className='flex items-center gap-0.5'>
            {renderStars(product.rating || 4.5)}
          </div>
          <span className='text-xs text-gray-500'>
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price  */}
        <div className='mb-2'>
          <div className='flex items-baseline gap-2 flex-wrap'>
            <span className='text-lg sm:text-xl font-bold text-gray-900'>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice &&
              product.compareAtPrice > product.price && (
                <span className='text-xs sm:text-sm text-gray-400 line-through'>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
          </div>

          {/* Prime delivery indicator  */}
          {product.inStock && (
            <div className='flex items-center gap-1 mt-1'>
              <TruckIcon className='w-3 h-3 text-gray-500' />
              <span className='text-xs text-gray-600'>
                FREE Delivery on R5000+
              </span>
            </div>
          )}
        </div>

        {/* Stock Status  */}
        {product.inStock && product.stock <= 20 && (
          <div className='mb-3'>
            <span className={`text-xs font-medium ${stockInfo.textColor}`}>
              {stockInfo.text}
            </span>
            {product.stock <= 10 && (
              <p className='text-xs text-gray-500 mt-0.5'>
                Only {product.stock} left in stock
              </p>
            )}
          </div>
        )}

        {!product.inStock && (
          <div className='mb-3'>
            <span className='text-xs font-medium text-red-600'>
              Currently unavailable
            </span>
          </div>
        )}

        {/* Action Buttons  */}
        <div className='flex gap-2 mt-3'>
          {product.inStock ? (
            <>
              <button
                onClick={() => onAddToCart(product)}
                className='flex-1 bg-[#A6CE39] hover:bg-[#8BCD39] text-gray-900 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1'>
                <ShoppingCartIcon className='w-4 h-4' />
                Add to Cart
              </button>
              <button
                onClick={() => onQuickView(product)}
                className='px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors'>
                <EyeIcon className='w-4 h-4 text-gray-600' />
              </button>
            </>
          ) : (
            <button
              disabled
              className='w-full bg-gray-200 text-gray-500 py-2 rounded-md text-sm font-medium cursor-not-allowed'>
              Out of Stock
            </button>
          )}
        </div>

        {/* Amazon-style assurance */}
        {product.inStock && (
          <div className='flex items-center justify-center gap-2 mt-3 pt-2 border-t border-gray-100'>
            <ShieldCheckIcon className='w-3 h-3 text-green-600' />
            <span className='text-xs text-gray-500'>Secure checkout</span>
            <span className='text-xs text-gray-300'>•</span>
            <span className='text-xs text-gray-500'>30-day returns</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
