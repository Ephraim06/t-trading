import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  StarIcon as StarIconSolid,
  HeartIcon,
  ShoppingCartIcon,
  TruckIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {
  StarIcon as StarIconOutline,
  HeartIcon as HeartIconOutline,
} from '@heroicons/react/24/outline';

// Import products data
import { products, categories } from '../src/data/productsData';

// Animation styles
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slide-in {
    animation: slideIn 0.4s ease-out;
  }

  .animate-zoom-in {
    animation: zoomIn 0.3s ease-out;
  }
`;

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Find product by id (convert to number since URL param is string)
        const foundProduct = products.find((p) => p.id === parseInt(id));

        if (foundProduct) {
          setProduct(foundProduct);

          // Generate image array (use placeholder if no image, or create multiple angles)
          const productImages = [
            {
              url: foundProduct.image,
              alt: `${foundProduct.name} - Main View`,
            },
          ];

          // Add additional images if available (using same image or placeholder for demo)
          // In production, you'd have multiple images per product
          if (foundProduct.category === 'Gas Water Heaters') {
            productImages.push(
              {
                url: foundProduct.image,
                alt: `${foundProduct.name} - Side View`,
              },
              {
                url: foundProduct.image,
                alt: `${foundProduct.name} - Installation View`,
              },
            );
          }

          setSelectedImage(0);

          // Find related products (same category, different ID)
          const related = products
            .filter(
              (p) =>
                p.category === foundProduct.category &&
                p.id !== foundProduct.id,
            )
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          // Product not found
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showToast = (message, type = 'success') => {
    const toastId = Date.now();
    setToast({ message, type, id: toastId });
    setTimeout(() => {
      setToast((prev) => (prev?.id === toastId ? null : prev));
    }, 3000);
  };

  // To be updated with real logic
  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return;
    }
    showToast(`${quantity} × ${product.name} added to cart`, 'success');
  };

  const handleBuyNow = () => {
    if (!product.inStock) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return;
    }
    showToast('Proceeding to checkout', 'success');
    setTimeout(() => navigate('/checkout'), 1500);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleImageZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIconSolid key={i} className='w-4 h-4 text-yellow-400' />,
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className='relative'>
            <StarIconSolid className='w-4 h-4 text-yellow-400 opacity-50' />
            <div className='absolute inset-0 overflow-hidden w-1/2'>
              <StarIconSolid className='w-4 h-4 text-yellow-400' />
            </div>
          </div>,
        );
      } else {
        stars.push(
          <StarIconOutline key={i} className='w-4 h-4 text-gray-300' />,
        );
      }
    }
    return stars;
  };

  // Format price with ZAR currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get stock status display
  const getStockStatus = () => {
    if (!product.inStock)
      return { text: 'Out of Stock', color: 'text-red-600' };
    if (product.stock > 0 && product.stock <= 10)
      return { text: 'Low Stock', color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div
            className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent'
            style={{
              borderColor: '#A6CE39',
              borderTopColor: 'transparent',
            }}></div>
          <p className='mt-4 text-gray-600'>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <XMarkIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Product Not Found
          </h2>
          <p className='text-gray-600 mb-6'>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to='/products'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition'
            style={{ backgroundColor: '#A6CE39' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const productImages = [
    { url: product.image, alt: `${product.name} - Main View` },
    { url: product.image, alt: `${product.name} - Alternate View` },
    { url: product.image, alt: `${product.name} - Detail View` },
  ];

  return (
    <div className='bg-gray-50 min-h-screen'>
      <style>{animationStyles}</style>

      {/* Toast Notification */}
      {toast && (
        <div className='fixed bottom-4 right-4 z-50 animate-slide-in'>
          <div
            className='bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 border-l-4'
            style={{
              borderLeftColor: toast.type === 'error' ? '#ef4444' : '#A6CE39',
            }}>
            {toast.type === 'error' ? (
              <XMarkIcon className='w-5 h-5 text-red-500' />
            ) : (
              <CheckCircleIcon
                className='w-5 h-5'
                style={{ color: '#A6CE39' }}
              />
            )}
            <p className='text-gray-800'>{toast.message}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Link to='/' className='flex-shrink-0'>
                <h1 className='text-2xl font-bold' style={{ color: '#A6CE39' }}>
                  TROJAN
                </h1>
              </Link>
              <div className='hidden md:block ml-10'>
                <div className='flex items-center space-x-8'>
                  <Link
                    to='/'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition'>
                    Home
                  </Link>
                  <Link
                    to='/products'
                    className='text-gray-900 font-semibold px-3 py-2 text-sm border-b-2'
                    style={{ borderBottomColor: '#A6CE39' }}>
                    Products
                  </Link>
                  <Link
                    to='/industries'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition'>
                    Industries
                  </Link>
                  <Link
                    to='/about'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition'>
                    About
                  </Link>
                  <Link
                    to='/contact'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition'>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                to='/cart'
                className='relative text-gray-600 hover:text-gray-900 p-2'>
                <ShoppingCartIcon className='w-6 h-6' />
              </Link>
              <Link
                to='/login'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition'>
                Login
              </Link>
              <Link
                to='/register'
                className='text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg hover:shadow-xl'
                style={{ backgroundColor: '#A6CE39' }}>
                Get Started
              </Link>
            </div>
            <div className='md:hidden'>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='text-gray-600 p-2'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className='md:hidden bg-white border-t border-gray-200'>
            <div className='px-4 py-3 space-y-2'>
              <Link to='/' className='block text-gray-600 py-2'>
                Home
              </Link>
              <Link
                to='/products'
                className='block text-gray-900 font-semibold py-2'>
                Products
              </Link>
              <Link to='/industries' className='block text-gray-600 py-2'>
                Industries
              </Link>
              <Link to='/about' className='block text-gray-600 py-2'>
                About
              </Link>
              <Link to='/contact' className='block text-gray-600 py-2'>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className='bg-white border-b border-gray-100 py-3'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <Link to='/' className='hover:text-gray-700'>
              Home
            </Link>
            <span>/</span>
            <Link to='/products' className='hover:text-gray-700'>
              Products
            </Link>
            <span>/</span>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className='hover:text-gray-700'>
              {product.category}
            </Link>
            <span>/</span>
            <span className='text-gray-900'>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Main Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column - Images */}
          <div className='space-y-4'>
            {/* Main Image with Zoom */}
            <div
              className='relative bg-white rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in'
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleImageZoom}>
              <img
                src={productImages[selectedImage].url}
                alt={productImages[selectedImage].alt}
                className='w-full h-auto object-contain aspect-square'
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/500x500?text=Product+Image';
                }}
              />
              {showZoom && (
                <div
                  className='absolute inset-0 bg-white bg-cover bg-no-repeat pointer-events-none'
                  style={{
                    backgroundImage: `url(${productImages[selectedImage].url})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    opacity: 0.95,
                  }}
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    borderColor:
                      selectedImage === index ? '#A6CE39' : 'transparent',
                  }}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/80x80?text=Image';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className='space-y-5'>
            {/* Brand and Title */}
            <div>
              <Link
                to={`/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}`}
                className='text-sm font-medium hover:underline'
                style={{ color: '#4F86C6' }}>
                {product.brand}
              </Link>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>
                {product.name}
              </h1>
              {product.model && (
                <p className='text-sm text-gray-500 mt-1'>
                  Model: {product.model}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1'>
                {renderStars(product.rating || 4.5)}
              </div>
              <span className='text-sm text-gray-500'>
                {product.reviews || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-gray-900'>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <>
                    <span className='text-lg text-gray-400 line-through'>
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className='text-sm font-medium text-green-600'>
                      Save{' '}
                      {Math.round(
                        ((product.compareAtPrice - product.price) /
                          product.compareAtPrice) *
                          100,
                      )}
                      %
                    </span>
                  </>
                )}
            </div>

            {/* Stock Status */}
            <div className='flex items-center gap-2'>
              <div className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </div>
              {product.inStock && product.stock > 0 && (
                <div className='text-xs text-gray-500'>
                  ({product.stock} units available)
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className='text-gray-600 leading-relaxed'>
              {product.description}
            </p>

            {/* Key Specifications Highlights */}
            {product.specifications && product.specifications.length > 0 && (
              <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  Key Specifications
                </h3>
                <div className='grid grid-cols-2 gap-2'>
                  {product.specifications.slice(0, 4).map((spec, idx) => (
                    <div key={idx} className='text-sm'>
                      <span className='text-gray-500'>{spec.name}:</span>{' '}
                      <span className='text-gray-800 font-medium'>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flow Rate for Water Heaters */}
            {product.flowRate && (
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-gray-500'>Flow Rate:</span>
                <span className='font-semibold text-gray-900'>
                  {product.flowRate}
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            {product.inStock && (
              <div className='flex items-center gap-4'>
                <span className='text-gray-700 font-medium'>Quantity:</span>
                <div className='flex items-center border border-gray-300 rounded-lg'>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className='px-3 py-2 hover:bg-gray-50 transition disabled:opacity-50'
                    disabled={quantity <= 1}>
                    <MinusIcon className='w-4 h-4 text-gray-600' />
                  </button>
                  <span className='w-12 text-center font-medium'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className='px-3 py-2 hover:bg-gray-50 transition disabled:opacity-50'
                    disabled={quantity >= (product.stock || 99)}>
                    <PlusIcon className='w-4 h-4 text-gray-600' />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
                style={product.inStock ? { backgroundColor: '#A6CE39' } : {}}>
                <ShoppingCartIcon className='w-5 h-5' />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              {product.inStock && (
                <>
                  <button
                    onClick={handleBuyNow}
                    className='flex-1 px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg border-2 flex items-center justify-center gap-2'
                    style={{ borderColor: '#A6CE39', color: '#A6CE39' }}>
                    Buy Now
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className='px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition flex items-center justify-center'>
                    {isWishlisted ? (
                      <HeartIcon className='w-5 h-5 text-red-500' />
                    ) : (
                      <HeartIconOutline className='w-5 h-5 text-gray-500' />
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Delivery Info */}
            <div className='border-t border-gray-200 pt-4 space-y-3'>
              <div className='flex items-start gap-3'>
                <TruckIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Free Delivery
                  </p>
                  <p className='text-xs text-gray-500'>
                    On orders over R5000. Estimated 2-4 business days
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <ArrowPathIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Easy Returns
                  </p>
                  <p className='text-xs text-gray-500'>
                    30-day easy returns policy
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <ShieldCheckIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                <div>
                  <p className='text-sm font-medium text-gray-900'>Warranty</p>
                  <p className='text-xs text-gray-500'>
                    {product.specifications?.find((s) => s.name === 'Warranty')
                      ?.value || '12 Months'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className='mt-12 bg-white rounded-xl shadow-sm border border-gray-200'>
          <div className='border-b border-gray-200'>
            <div className='flex overflow-x-auto'>
              {[
                'description',
                'specifications',
                'features',
                'safety',
                'shipping',
              ].map((tab) => {
                // Only show safety tab if safety features exist
                if (tab === 'safety' && !product.safetyFeatures) return null;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium transition whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-b-2 text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    style={{
                      borderBottomColor:
                        activeTab === tab ? '#A6CE39' : 'transparent',
                    }}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='p-6'>
            {activeTab === 'description' && (
              <div className='prose max-w-none'>
                <div className='whitespace-pre-line text-gray-600 leading-relaxed'>
                  {product.longDescription || product.description}
                </div>
                {product.bestFor && (
                  <div className='mt-4 p-4 bg-blue-50 rounded-lg'>
                    <h4 className='font-semibold text-blue-800 mb-2'>
                      Best For
                    </h4>
                    <p className='text-blue-700'>{product.bestFor}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className='flex py-2 border-b border-gray-100'>
                    <span className='w-2/5 text-gray-500 font-medium'>
                      {spec.name}
                    </span>
                    <span className='w-3/5 text-gray-800'>{spec.value}</span>
                  </div>
                ))}
                {product.dimensions && product.dimensions.height && (
                  <>
                    <div className='flex py-2 border-b border-gray-100'>
                      <span className='w-2/5 text-gray-500 font-medium'>
                        Dimensions (H x W x D)
                      </span>
                      <span className='w-3/5 text-gray-800'>
                        {product.dimensions.height} x {product.dimensions.width}{' '}
                        x {product.dimensions.depth} mm
                      </span>
                    </div>
                    <div className='flex py-2 border-b border-gray-100'>
                      <span className='w-2/5 text-gray-500 font-medium'>
                        Weight
                      </span>
                      <span className='w-3/5 text-gray-800'>
                        {product.weight} kg
                      </span>
                    </div>
                  </>
                )}
                {product.flowRate && (
                  <div className='flex py-2 border-b border-gray-100'>
                    <span className='w-2/5 text-gray-500 font-medium'>
                      Flow Rate
                    </span>
                    <span className='w-3/5 text-gray-800'>
                      {product.flowRate}
                    </span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'features' && product.features && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {product.features.map((feature, idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    <CheckCircleIcon
                      className='w-5 h-5'
                      style={{ color: '#A6CE39' }}
                    />
                    <span className='text-gray-700'>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'safety' && product.safetyFeatures && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {product.safetyFeatures.map((feature, idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    <ShieldCheckIcon
                      className='w-5 h-5'
                      style={{ color: '#A6CE39' }}
                    />
                    <span className='text-gray-700'>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <TruckIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                  <div>
                    <p className='font-medium text-gray-900'>
                      Shipping Information
                    </p>
                    <p className='text-sm text-gray-600 mt-1'>
                      Free shipping on orders over R5000 within South Africa.
                      Standard delivery takes 2-4 business days. Express
                      delivery available at checkout.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <ArrowPathIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                  <div>
                    <p className='font-medium text-gray-900'>Returns Policy</p>
                    <p className='text-sm text-gray-600 mt-1'>
                      30-day easy returns. Products must be unused and in
                      original packaging. Contact our support team to initiate a
                      return.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <ShieldCheckIcon className='w-5 h-5 text-gray-500 mt-0.5' />
                  <div>
                    <p className='font-medium text-gray-900'>
                      Warranty Information
                    </p>
                    <p className='text-sm text-gray-600 mt-1'>
                      {product.specifications?.find(
                        (s) => s.name === 'Warranty',
                      )?.value ||
                        '12-month manufacturer warranty covering manufacturing defects.'}
                    </p>
                  </div>
                </div>
                {product.gasType && (
                  <div className='flex items-start gap-3'>
                    <div className='w-5 h-5 text-gray-500 mt-0.5'>🔥</div>
                    <div>
                      <p className='font-medium text-gray-900'>Gas Type</p>
                      <p className='text-sm text-gray-600 mt-1'>
                        {product.gasType}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Related Products You May Like
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  className='group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden'>
                  <div className='aspect-square overflow-hidden bg-gray-100'>
                    <img
                      src={related.image}
                      alt={related.name}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      onError={(e) => {
                        e.target.src =
                          'https://via.placeholder.com/400x400?text=Product';
                      }}
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 mb-1 line-clamp-2'>
                      {related.name}
                    </h3>
                    {related.model && (
                      <p className='text-xs text-gray-500 mb-2'>
                        {related.model}
                      </p>
                    )}
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='flex items-center gap-0.5'>
                        {renderStars(related.rating || 4.5)}
                      </div>
                      <span className='text-xs text-gray-500'>
                        ({related.reviews || 0})
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-lg font-bold text-gray-900'>
                        {formatPrice(related.price)}
                      </span>
                      {related.inStock ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            showToast(
                              `${related.name} added to cart`,
                              'success',
                            );
                          }}
                          className='p-2 rounded-lg transition-colors hover:bg-opacity-10'
                          style={{ color: '#A6CE39' }}>
                          <ShoppingCartIcon className='w-5 h-5' />
                        </button>
                      ) : (
                        <span className='text-xs text-red-500'>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12 mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-2xl font-bold' style={{ color: '#A6CE39' }}>
                TROJAN
              </h3>
              <p className='text-gray-400 text-sm mt-2'>
                Powering industry with reliable gas solutions since 1985.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link to='/about' className='hover:text-white transition'>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to='/products' className='hover:text-white transition'>
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to='/industries'
                    className='hover:text-white transition'>
                    Industries
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className='hover:text-white transition'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <Link to='/help' className='hover:text-white transition'>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to='/sds' className='hover:text-white transition'>
                    Safety Data Sheets
                  </Link>
                </li>
                <li>
                  <Link to='/shipping' className='hover:text-white transition'>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to='/returns' className='hover:text-white transition'>
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Connect</h4>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.682-5.282 14.2 14.2 0 001.565-6.192c.009-.21.009-.42.009-.63A9.93 9.93 0 0024 4.59a8.872 8.872 0 01-2.047.567z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition'>
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm'>
            <p>
              &copy; {new Date().getFullYear()} Trojan Trading. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductView;
