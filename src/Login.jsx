// ==================== pages/Login.jsx ====================
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check for return URL from previous page (like cart checkout)
  const from = location.state?.from?.pathname || '/dashboard';
  const returnTo = location.state?.returnTo || '/dashboard';
  const cartData = location.state?.cartData;

  // Check if there's a stored cart after redirect
  useEffect(() => {
    const storedCart = localStorage.getItem('redirect_cart');
    const checkoutIntent = localStorage.getItem('checkout_intent');
    if (storedCart && checkoutIntent === 'true') {
      setSuccessMessage('Please sign in to complete your purchase');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth redirect
    setTimeout(() => {
      // In production, redirect to Google OAuth endpoint
      window.location.href = '/api/auth/google';
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call - Replace with your actual authentication
    try {
      // For demo purposes, accept any credentials
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user data (replace with actual auth response)
      const userData = {
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${formData.email.split('@')[0]}&background=3b82f6&color=fff`,
      };

      localStorage.setItem('auth_token', 'demo_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(userData));

      if (formData.rememberMe) {
        localStorage.setItem('remember_me', 'true');
        localStorage.setItem('user_email', formData.email);
      } else {
        sessionStorage.setItem('auth_token', 'demo_token_' + Date.now());
        sessionStorage.setItem('user_data', JSON.stringify(userData));
      }

      // Check if there was a pending checkout
      const checkoutIntent = localStorage.getItem('checkout_intent');
      const storedCart = localStorage.getItem('redirect_cart');

      if (checkoutIntent === 'true' && storedCart) {
        // Clear the checkout intent
        localStorage.removeItem('checkout_intent');
        localStorage.removeItem('redirect_cart');
        localStorage.removeItem('redirect_cart_total');

        // Navigate to checkout with cart data
        navigate('/checkout', {
          state: {
            cart: JSON.parse(storedCart),
            fromLogin: true,
          },
        });
      } else {
        // Navigate to the intended page or dashboard
        navigate(returnTo);
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation styles
  const animationStyles = `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className='min-h-screen flex bg-gray-50'>
        {/* Left side - Branding */}
        <div className='hidden lg:flex lg:w-1/2 bg-[#59B747] text-white p-12 flex-col justify-between relative overflow-hidden'>
          {/* Animated background blobs */}
          <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>
          <div className='absolute top-0 -left-4 w-72 h-72 bg-[#ABCF42] rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
          <div className='absolute bottom-0 -right-4 w-72 h-72 bg-[#ABCF42] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-50'></div>

          <div className='relative z-10'>
            <Link to='/'>
              <h1 className='text-3xl font-bold tracking-tight'>TROJAN</h1>
            </Link>
            <p className='text-blue-100 mt-2'>Industrial Gas Solutions</p>
          </div>

          <div className='relative z-10 max-w-md'>
            <h2 className='text-4xl font-bold mb-6'>Welcome Back!</h2>
            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              Access your account to manage orders, track deliveries, and more.
            </p>

            <div className='space-y-4'>
              <div className='flex items-center gap-3 group'>
                <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <TruckIcon className='w-5 h-5' />
                </div>
                <div>
                  <p className='font-semibold'>Nationwide Delivery</p>
                  <p className='text-sm text-blue-100'>
                    Fast shipping across South Africa
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 group'>
                <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <ShieldCheckIcon className='w-5 h-5' />
                </div>
                <div>
                  <p className='font-semibold'>Secure Platform</p>
                  <p className='text-sm text-blue-100'>
                    Enterprise-grade security
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 group'>
                <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <ClockIcon className='w-5 h-5' />
                </div>
                <div>
                  <p className='font-semibold'>24/7 Support</p>
                  <p className='text-sm text-blue-100'>Always here to help</p>
                </div>
              </div>
            </div>
          </div>

          <div className='relative z-10 text-sm text-blue-200'>
            © {new Date().getFullYear()} Trojan Trading. All rights reserved.
          </div>
        </div>

        {/* Right side - Login form */}
        <div className='w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8'>
          <div className='max-w-md w-full animate-fade-in'>
            <div className='text-center lg:text-left mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>Sign In</h2>
              <p className='text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  state={{ from: location.state?.from, cartData: cartData }}
                  className='text-[#ABCF42] hover:text-blue-700 font-semibold hover:underline transition'>
                  Sign up
                </Link>
              </p>
            </div>

            {/* Success message */}
            {successMessage && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in'>
                <div className='flex items-center gap-2'>
                  <CheckCircleIcon className='w-5 h-5 text-green-500' />
                  <p className='text-sm text-green-800'>{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-fade-in'>
                <div className='flex items-center gap-2'>
                  <ExclamationTriangleIcon className='w-5 h-5 text-red-500' />
                  <p className='text-sm text-red-800'>{error}</p>
                </div>
              </div>
            )}

            {/* Demo notice */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
              <div className='flex items-start gap-2'>
                <InformationCircleIcon className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5' />
                <p className='text-sm text-blue-800'>
                  Demo: Use any email and password to login (min 6 characters)
                </p>
              </div>
            </div>

            {/* Google SSO Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className='w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 mb-6 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed'>
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span className='font-medium'>Continue with Google</span>
            </button>

            <div className='relative mb-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-50 text-gray-500'>
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    placeholder='you@example.com'
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <LockClosedIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    placeholder='••••••••'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    {showPassword ? (
                      <EyeSlashIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                    ) : (
                      <EyeIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='h-4 w-4 text-[#ABCF42] focus:ring-blue-500 border-gray-300 rounded cursor-pointer'
                    disabled={isLoading}
                  />
                  <label className='ml-2 block text-sm text-gray-700 cursor-pointer'>
                    Remember me
                  </label>
                </div>
                <Link
                  to='/forgot-password'
                  className='text-sm text-[#ABCF42] hover:text-blue-700 hover:underline transition'>
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#ABCF42] text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                {isLoading ? (
                  <>
                    <ArrowPathIcon className='w-5 h-5 animate-spin' />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Admin login hint */}
            <p className='text-center text-sm text-gray-500 mt-6'>
              Are you an admin?{' '}
              <Link
                to='/admin/login'
                className='text-[#ABCF42] hover:text-blue-700 font-medium hover:underline transition'>
                Admin Login
              </Link>
            </p>

            {/* Demo credentials hint */}
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <p className='text-xs text-center text-gray-400'>
                Demo credentials: any email / any password (min 6 characters)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
