import React from 'react';
import { Link } from 'react-router-dom';
import {
  XMarkIcon,
  ShoppingCartIcon,
  HeartIcon,
  CheckCircleIcon,
  StarIcon as StarIconSolid,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
`;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<StarIconSolid key={i} className='w-4 h-4 text-yellow-400' />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className='relative'>
          <StarIconOutline className='w-4 h-4 text-yellow-400' />
          <div className='absolute inset-0 overflow-hidden w-1/2'>
            <StarIconSolid className='w-4 h-4 text-yellow-400' />
          </div>
        </div>,
      );
    } else {
      stars.push(<StarIconOutline key={i} className='w-4 h-4 text-gray-300' />);
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

const ProductModal = ({ isOpen, product, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  // Helper to get stock color class
  const getStockColorClass = () => {
    if (!product.inStock) return 'text-red-600';
    if (product.stock > 50) return 'text-green-600';
    if (product.stock > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStockText = () => {
    if (!product.inStock) return 'Out of Stock';
    if (product.stock > 50) return 'In Stock';
    if (product.stock > 20) return 'Low Stock';
    return 'Limited Stock';
  };

  const getProgressBarColor = () => {
    if (!product.inStock) return 'bg-red-500';
    if (product.stock > 50) return 'bg-green-500';
    if (product.stock > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getGradient = () => {
    const gradients = {
      'Gas Water Heaters': 'from-blue-500 to-cyan-500',
      'Camp Kits': 'from-emerald-500 to-teal-500',
      'Brass Fittings': 'from-amber-500 to-orange-500',
      'PEX Fittings': 'from-indigo-500 to-purple-500',
      'Cages & Cabinets': 'from-slate-500 to-gray-500',
    };
    return gradients[product.category] || 'from-blue-500 to-indigo-500';
  };

  const deliveryEstimate = product.inStock
    ? product.stock > 20
      ? '2-3 business days'
      : '5-7 business days'
    : 'Notify when available';

  const gradient = getGradient();

  return (
    <>
      <style>{animationStyles}</style>
      <div className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen px-4 py-8'>
          <div
            className='fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
            onClick={onClose}
          />

          <div className='relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up'>
            
            <button
              onClick={onClose}
              className='absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 z-10 shadow-lg transition-all hover:scale-110'>
              <XMarkIcon className='w-5 h-5' />
            </button>

            <div className='p-6 md:p-8'>
              <div className='flex flex-col lg:flex-row gap-8'>
                {/* Product Image Section */}
                <div className='lg:w-5/12'>
                  <div className='flex items-center justify-center relative overflow-hidden group'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-full h-full object-contain p-4 rounded-2xl'
                      onError={(e) => {
                        e.target.src =
                          'https://via.placeholder.com/400x400?text=Product+Image';
                      }}
                    />
                  </div>

                  {/* Trust Badges */}
                  {/* <div className='grid grid-cols-2 gap-3 mt-6'>
                    <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-xl'>
                      <TruckIcon className='w-5 h-5 text-blue-600' />
                      <div>
                        <p className='text-xs font-semibold text-gray-700'>
                          Free Shipping
                        </p>
                        <p className='text-xs text-gray-500'>
                          On orders R5000+
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-xl'>
                      <ShieldCheckIcon className='w-5 h-5 text-green-600' />
                      <div>
                        <p className='text-xs font-semibold text-gray-700'>
                          Quality Guarantee
                        </p>
                        <p className='text-xs text-gray-500'>
                          Certified products
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-xl'>
                      <ArrowPathIcon className='w-5 h-5 text-purple-600' />
                      <div>
                        <p className='text-xs font-semibold text-gray-700'>
                          Easy Returns
                        </p>
                        <p className='text-xs text-gray-500'>30-day policy</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-xl'>
                      <ClockIcon className='w-5 h-5 text-orange-600' />
                      <div>
                        <p className='text-xs font-semibold text-gray-700'>
                          24/7 Support
                        </p>
                        <p className='text-xs text-gray-500'>
                          Expert assistance
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Product Details Section */}
                <div className='lg:w-7/12'>
                  {/* Category Badge */}
                  <div className='flex items-center gap-3 mb-4'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700'>
                      {product.category}
                    </span>
                    <div className='flex items-center gap-1'>
                      {renderStars(product.rating || 4.5)}
                      <span className='text-sm text-gray-500 ml-1'>
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                    {product.model && (
                      <span className='text-sm text-gray-500'>
                        Model: {product.model}
                      </span>
                    )}
                  </div>

                  <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                    {product.name}
                  </h2>
                  {product.brand && (
                    <p className='text-gray-500 text-sm mb-4'>
                      by{' '}
                      <span className='font-medium text-gray-700'>
                        {product.brand}
                      </span>
                    </p>
                  )}

                  {/* Price Section */}
                  <div className='mb-6'>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-4xl font-bold text-gray-900'>
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice &&
                        product.compareAtPrice > product.price && (
                          <span className='text-lg text-gray-400 line-through'>
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                    </div>
                    <p className='text-sm text-green-600 mt-1'>
                      Best price guaranteed
                    </p>
                  </div>

                  {/* Description */}
                  {/* <div className='mb-6'>
                    <h3 className='font-semibold text-gray-900 mb-2'>
                      Description
                    </h3>
                    <p className='text-gray-600 leading-relaxed line-clamp-3'>
                      {product.description}
                    </p>
                  </div> */}

                  {/* Stock Status */}
                  {/* <div className='mb-6 p-4 bg-gray-50 rounded-xl'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='font-medium text-gray-700'>
                        Stock Status
                      </span>
                      <span className={`font-semibold ${getStockColorClass()}`}>
                        {getStockText()}
                      </span>
                    </div>
                    {product.inStock && product.stock > 0 && (
                      <>
                        <div className='w-full bg-gray-200 rounded-full h-2.5'>
                          <div
                            className={`${getProgressBarColor()} h-2.5 rounded-full transition-all duration-500`}
                            style={{
                              width: `${Math.min(product.stock, 100)}%`,
                            }}
                          />
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                          <p className='text-xs text-gray-500'>
                            {product.stock} units remaining
                          </p>
                          <p className='text-xs text-gray-500 flex items-center gap-1'>
                            <TruckIcon className='w-3 h-3' />
                            Est. delivery: {deliveryEstimate}
                          </p>
                        </div>
                      </>
                    )}
                  </div> */}

                  {/* Key Specifications */}
                  {/* {product.specifications &&
                    product.specifications.length > 0 && (
                      <div className='mb-6'>
                        <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                          <CheckCircleIcon className='w-5 h-5 text-green-500' />
                          Key Specifications
                        </h3>
                        <div className='grid grid-cols-2 gap-2'>
                          {product.specifications
                            .slice(0, 4)
                            .map((spec, index) => {
                              if (typeof spec === 'string') {
                                const parts = spec.split(':');
                                const key = parts[0];
                                const value = parts.slice(1).join(':');
                                return (
                                  <div
                                    key={index}
                                    className='flex items-start gap-2 text-sm'>
                                    <span className='font-medium text-gray-700 min-w-[70px]'>
                                      {key}:
                                    </span>
                                    <span className='text-gray-600'>
                                      {value}
                                    </span>
                                  </div>
                                );
                              } else if (
                                typeof spec === 'object' &&
                                spec.name &&
                                spec.value
                              ) {
                                return (
                                  <div
                                    key={index}
                                    className='flex items-start gap-2 text-sm'>
                                    <span className='font-medium text-gray-700 min-w-[70px]'>
                                      {spec.name}:
                                    </span>
                                    <span className='text-gray-600'>
                                      {spec.value}
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </div>
                      </div>
                    )} */}

                  {/* Key Features */}
                  {/* {product.features && product.features.length > 0 && (
                    <div className='mb-8'>
                      <h3 className='font-semibold text-gray-900 mb-3'>
                        Key Features
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {product.features.slice(0, 4).map((feature, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm'>
                            <StarIconSolid className='w-3 h-3' />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* Action Buttons */}
                  <div className='flex gap-4 pt-4 border-t border-gray-100'>
                    {product.inStock ? (
                      <>
                        {/* <button
                          onClick={() => {
                            onAddToCart(product);
                            onClose();
                          }}
                          className='flex-1 text-white py-3.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                          style={{ backgroundColor: '#A6CE39' }}>
                          <ShoppingCartIcon className='w-5 h-5' />
                          Add to Cart
                        </button> */}
                        <Link
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className='flex-1 border-2 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2'
                          style={{ borderColor: '#A6CE39', color: '#A6CE39' }}>
                          <EyeIcon className='w-5 h-5' />
                          See Product Details
                        </Link>
                      </>
                    ) : (
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className='flex-1 bg-gray-500 text-white py-3.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2'>
                        <EyeIcon className='w-5 h-5' />
                        See Product Details
                      </Link>
                    )}
                    <button className='w-12 h-12 border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition-all group flex items-center justify-center'>
                      <HeartIcon className='w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors' />
                    </button>
                  </div>

                  {/* Additional Info */}
                  <p className='text-xs text-gray-400 text-center mt-4'>
                    Secure checkout • 100% satisfaction guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
