// ==================== components/CartSidebar.jsx ====================
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  XMarkIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CreditCardIcon,
  UserCircleIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onUpdateQuantity,
  onRemoveItem,
  showToast,
  setCart,
}) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);

  // Check authentication status
  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    setIsAuthenticated(!!userToken || !!userData);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate savings and discounts
  const bulkDiscount = cartTotal > 1000 ? cartTotal * 0.05 : 0;
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal - bulkDiscount + shippingCost;
  const amountToFreeShipping = Math.max(0, 500 - cartTotal);

  // Get cart item count
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingAuth(true);

    const userToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (!userToken && !userData) {
      localStorage.setItem('redirect_cart', JSON.stringify(cart));
      localStorage.setItem('redirect_cart_total', cartTotal.toString());
      localStorage.setItem('checkout_intent', 'true');

      showToast('Please sign in to continue with checkout', 'info');
      onClose();

      setTimeout(() => {
        navigate('/login', {
          state: {
            from: '/checkout',
            returnTo: '/checkout',
            cartData: cart,
          },
        });
      }, 500);

      setIsCheckingAuth(false);
      return;
    }

    try {
      localStorage.setItem('cart_items', JSON.stringify(cart));
      localStorage.setItem('cart_total', cartTotal.toString());
      localStorage.setItem('cart_last_updated', new Date().toISOString());

      showToast('Redirecting to checkout...', 'success');
      onClose();

      setTimeout(() => {
        navigate('/checkout', {
          state: {
            cart: cart,
            cartTotal: cartTotal,
            bulkDiscount: bulkDiscount,
            shippingCost: shippingCost,
            finalTotal: finalTotal,
          },
        });
      }, 500);
    } catch (error) {
      console.error('Checkout error:', error);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleClearCart = async () => {
    setIsClearingCart(true);
    setTimeout(() => {
      if (window.confirm('Are you sure you want to clear your cart?')) {
        setCart([]);
        localStorage.removeItem('cart_items');
        localStorage.removeItem('cart_total');
        showToast('Cart cleared successfully', 'info');
      }
      setIsClearingCart(false);
    }, 300);
  };

  const getGradient = (category) => {
    const gradients = {
      'Gas Water Heaters': 'from-blue-500 to-cyan-500',
      'Camp Kits': 'from-emerald-500 to-teal-500',
      'Brass Fittings': 'from-amber-500 to-orange-500',
      'PEX Fittings': 'from-indigo-500 to-purple-500',
      'Cages & Cabinets': 'from-slate-500 to-gray-500',
    };
    return gradients[category] || 'from-blue-500 to-indigo-500';
  };

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-96 md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Header - Premium Design */}
        <div className='sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200'>
          <div className='flex items-center justify-between p-5'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg'>
                  <ShoppingCartIcon className='w-5 h-5 text-white' />
                </div>
                {itemCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white'>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>
                  Shopping Cart
                </h2>
                <p className='text-xs text-gray-500'>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className='w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110'>
              <XMarkIcon className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cart.length > 0 && amountToFreeShipping > 0 && (
            <div className='px-5 pb-4'>
              <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3'>
                <div className='flex items-center justify-between text-xs mb-2'>
                  <span className='text-gray-600 flex items-center gap-1'>
                    <TruckIcon className='w-3.5 h-3.5 text-blue-600' />
                    Add R{amountToFreeShipping.toFixed(2)} more for free
                    shipping
                  </span>
                  <span className='text-blue-600 font-semibold'>
                    {Math.min(100, Math.round((cartTotal / 500) * 100))}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 overflow-hidden'>
                  <div
                    className='bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500'
                    style={{
                      width: `${Math.min(100, (cartTotal / 500) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items - Scrollable Area */}
        <div
          className='flex-1 overflow-y-auto p-5 space-y-4'
          style={{ maxHeight: 'calc(100vh - 500px)' }}>
          {cart.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center'>
                <ShoppingCartIcon className='w-12 h-12 text-gray-400' />
              </div>
              <p className='text-gray-600 font-medium mb-2'>
                Your cart is empty
              </p>
              <p className='text-sm text-gray-400 mb-6'>
                Looks like you haven't added any items yet
              </p>
              <button
                onClick={onClose}
                className='px-6 py-2.5 text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95'
                style={{ backgroundColor: '#A6CE39' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const gradient = getGradient(item.category);
              const Icon = item.icon || ShoppingCartIcon;

              return (
                <div
                  key={item.id}
                  className='group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden'>
                  <div className='flex gap-4 p-4'>
                    {/* Product Image */}
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-14 h-14 object-contain'
                        />
                      ) : (
                        <Icon className='w-10 h-10 text-white' />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1'>
                          <h4 className='font-semibold text-gray-900 text-sm line-clamp-2'>
                            {item.name}
                          </h4>
                          <p className='text-xs text-gray-500 mt-0.5'>
                            {item.category}
                          </p>
                          <p
                            className='text-sm font-semibold mt-1'
                            style={{ color: '#A6CE39' }}>
                            R{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 p-1'>
                          <TrashIcon className='w-4 h-4' />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-2 bg-gray-50 rounded-lg p-1'>
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className='w-7 h-7 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors active:scale-95 shadow-sm'>
                            <MinusIcon className='w-3.5 h-3.5 text-gray-600' />
                          </button>
                          <span className='text-sm font-semibold w-8 text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className='w-7 h-7 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors active:scale-95 shadow-sm'>
                            <PlusIcon className='w-3.5 h-3.5 text-gray-600' />
                          </button>
                        </div>
                        <p className='font-bold text-gray-900'>
                          R{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer - Premium Design */}
        {cart.length > 0 && (
          <div className='sticky bottom-0 bg-white border-t border-gray-200 shadow-lg'>
            {/* Promo Banner */}
            <div className='p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200'>
              <div className='flex items-center gap-2 text-sm'>
                <GiftIcon className='w-4 h-4 text-amber-600' />
                <span className='text-gray-700 text-xs sm:text-sm'>
                  {cartTotal > 500
                    ? '✓ Free shipping applied to your order!'
                    : `Add R${amountToFreeShipping.toFixed(2)} more for free shipping`}
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className='p-5 space-y-3'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Subtotal</span>
                <span className='font-medium text-gray-900'>
                  R{cartTotal.toFixed(2)}
                </span>
              </div>

              {bulkDiscount > 0 && (
                <div className='flex justify-between text-sm'>
                  <span className='text-green-600 flex items-center gap-1'>
                    <SparklesIcon className='w-4 h-4' />
                    Bulk Discount (5%)
                  </span>
                  <span className='text-green-600 font-medium'>
                    -R{bulkDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className='flex justify-between text-sm'>
                <span className='text-gray-600 flex items-center gap-1'>
                  <TruckIcon className='w-4 h-4' />
                  Shipping
                </span>
                <span className='font-medium text-gray-900'>
                  {shippingCost === 0 ? 'Free' : `R${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className='border-t border-gray-200 pt-3 mt-2'>
                <div className='flex justify-between items-baseline'>
                  <span className='text-base font-semibold text-gray-900'>
                    Total
                  </span>
                  <div className='text-right'>
                    <span
                      className='text-2xl font-bold'
                      style={{ color: '#A6CE39' }}>
                      R{finalTotal.toFixed(2)}
                    </span>
                    <p className='text-xs text-gray-500 mt-0.5'>VAT included</p>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className='flex items-center justify-center gap-2 text-xs text-gray-500 pt-2'>
                <ClockIcon className='w-3.5 h-3.5' />
                <span>Estimated delivery: 2-4 business days</span>
              </div>

              {/* Trust Badges */}
              <div className='flex justify-center gap-4 pt-2'>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <ShieldCheckIcon className='w-3.5 h-3.5' />
                  <span>Secure</span>
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <CreditCardIcon className='w-3.5 h-3.5' />
                  <span>Card/PayPal</span>
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <ArrowPathIcon className='w-3.5 h-3.5' />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='p-5 pt-0 space-y-3'>
              <button
                onClick={handleCheckout}
                disabled={isCheckingAuth}
                className='w-full text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
                style={{ backgroundColor: '#A6CE39' }}>
                {isCheckingAuth ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCardIcon className='w-5 h-5' />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>

              <button
                onClick={handleClearCart}
                disabled={isClearingCart}
                className='w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50'>
                {isClearingCart ? (
                  <>
                    <div className='w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin' />
                    <span>Clearing...</span>
                  </>
                ) : (
                  <>
                    <TrashIcon className='w-4 h-4' />
                    <span>Clear Cart</span>
                  </>
                )}
              </button>

              {!isAuthenticated && cart.length > 0 && (
                <div className='flex items-center justify-center gap-2 text-xs text-gray-500 pt-2'>
                  <UserCircleIcon className='w-3.5 h-3.5' />
                  <span>Sign in for faster checkout and order tracking</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 animate-fade-in'
          onClick={onClose}
        />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartSidebar;
