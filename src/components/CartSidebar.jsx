// ==================== components/CartSidebar.jsx ====================
import React, { useState, useEffect } from 'react';
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status (simulate auth check - replace with your actual auth logic)
  useEffect(() => {
    // Check if user is logged in (example: check localStorage or auth context)
    const userToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    setIsAuthenticated(!!userToken || !!userData);
  }, []);

  // Calculate savings (example: 5% bulk discount for orders over R1000)
  const bulkDiscount = cartTotal > 1000 ? cartTotal * 0.05 : 0;
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal - bulkDiscount + shippingCost;

  const handleCheckout = async () => {
    setIsCheckingAuth(true);

    // Simulate auth check with actual implementation
    // Replace this with your actual authentication check logic
    const userToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (!userToken && !userData) {
      // Store cart data before redirect
      localStorage.setItem('redirect_cart', JSON.stringify(cart));
      localStorage.setItem('redirect_cart_total', cartTotal.toString());
      localStorage.setItem('checkout_intent', 'true');

      showToast('Please sign in to continue with checkout', 'info');

      // Close cart sidebar
      onClose();

      // Navigate to login page with return URL
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

    // User is authenticated, proceed with checkout
    try {
      // Save cart to localStorage for persistence
      localStorage.setItem('cart_items', JSON.stringify(cart));
      localStorage.setItem('cart_total', cartTotal.toString());
      localStorage.setItem('cart_last_updated', new Date().toISOString());

      showToast('Redirecting to checkout...', 'success');

      // Close cart sidebar
      onClose();

      // Navigate to checkout page
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

  // Clear cart with confirmation
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      localStorage.removeItem('cart_items');
      localStorage.removeItem('cart_total');
      showToast('Cart cleared successfully', 'info');
    }
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <ShoppingCartIcon className='w-6 h-6 text-blue-600' />
              {cart.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse'>
                  {cart.length}
                </span>
              )}
            </div>
            <h2 className='text-xl font-bold text-gray-900'>Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200'>
            <XMarkIcon className='w-5 h-5' />
          </button>
        </div>

        {/* Cart Items */}
        <div className='flex-1 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-280px)]'>
          {cart.length === 0 ? (
            <div className='text-center py-12'>
              <div className='bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4'>
                <ShoppingCartIcon className='w-12 h-12 text-gray-400' />
              </div>
              <p className='text-gray-500 font-medium mb-2'>
                Your cart is empty
              </p>
              <p className='text-sm text-gray-400'>
                Add some products to get started
              </p>
              <button
                onClick={onClose}
                className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className='flex gap-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg transition-all duration-200 group'>
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className='w-10 h-10 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-900 truncate'>
                          {item.name}
                        </h4>
                        <p className='text-xs text-gray-500 mt-0.5'>
                          {item.grade}
                        </p>
                        <p className='text-sm font-medium text-blue-600 mt-1'>
                          R{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200'>
                        <TrashIcon className='w-4 h-4' />
                      </button>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95'>
                          <MinusIcon className='w-3.5 h-3.5 text-gray-600' />
                        </button>
                        <span className='text-sm font-semibold w-8 text-center'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95'>
                          <PlusIcon className='w-3.5 h-3.5 text-gray-600' />
                        </button>
                      </div>
                      <p className='font-bold text-gray-900'>
                        R{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className='border-t border-gray-200 bg-gray-50'>
            {/* Promo Banner */}
            <div className='p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200'>
              <div className='flex items-center gap-2 text-sm'>
                <TruckIcon className='w-4 h-4 text-blue-600' />
                <span className='text-gray-700'>
                  {cartTotal > 500
                    ? '✓ Free shipping applied!'
                    : `Add R${(500 - cartTotal).toFixed(2)} more for free shipping`}
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className='p-6 space-y-3'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Subtotal</span>
                <span className='font-medium text-gray-900'>
                  R{cartTotal.toFixed(2)}
                </span>
              </div>

              {bulkDiscount > 0 && (
                <div className='flex justify-between text-sm'>
                  <span className='text-green-600 flex items-center gap-1'>
                    <ArrowPathIcon className='w-4 h-4' />
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
                    <span className='text-2xl font-bold text-blue-600'>
                      R{finalTotal.toFixed(2)}
                    </span>
                    <p className='text-xs text-gray-500 mt-1'>VAT included</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className='flex justify-center gap-4 pt-3'>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <ShieldCheckIcon className='w-3.5 h-3.5' />
                  <span>Secure checkout</span>
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <CreditCardIcon className='w-3.5 h-3.5' />
                  <span>Pay with card</span>
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                  <ArrowPathIcon className='w-3.5 h-3.5' />
                  <span>Easy returns</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='p-6 pt-0 space-y-3'>
              <button
                onClick={handleCheckout}
                disabled={isCheckingAuth}
                className={`w-full bg-[#ABCF42] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  isCheckingAuth
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'
                }`}>
                {isCheckingAuth ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Checking...</span>
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
                className='w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2'>
                <TrashIcon className='w-4 h-4' />
                Clear Cart
              </button>

              {!isAuthenticated && (
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
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300'
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CartSidebar;
