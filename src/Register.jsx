// ==================== pages/Register.jsx ====================
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';
  const cartData = location.state?.cartData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Name validation
    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters long');
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

    // Phone validation (optional)
    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Terms validation
    if (!formData.agreeTerms) {
      setError('Please agree to the Terms and Conditions');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user data
      const userData = {
        id: '1',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(/\s/g, '+')}&background=3b82f6&color=fff`,
      };

      localStorage.setItem('auth_token', 'demo_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(userData));

      setSuccessMessage('Account created successfully! Redirecting...');

      // Check for pending checkout
      const checkoutIntent = localStorage.getItem('checkout_intent');
      const storedCart = localStorage.getItem('redirect_cart');

      setTimeout(() => {
        if (checkoutIntent === 'true' && storedCart) {
          localStorage.removeItem('checkout_intent');
          localStorage.removeItem('redirect_cart');
          localStorage.removeItem('redirect_cart_total');
          navigate('/checkout', {
            state: {
              cart: JSON.parse(storedCart),
              fromRegister: true,
            },
          });
        } else {
          navigate(from);
        }
      }, 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-gray-50'>
      {/* Left side - Branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 flex-col justify-between relative overflow-hidden'>
        <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
        <div className='absolute bottom-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>

        <div className='relative z-10'>
          <Link to='/'>
            <h1 className='text-3xl font-bold tracking-tight'>TROJAN</h1>
          </Link>
          <p className='text-blue-100 mt-2'>Industrial Gas Solutions</p>
        </div>

        <div className='relative z-10 max-w-md'>
          <h2 className='text-4xl font-bold mb-6'>Join Us Today!</h2>
          <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
            Create your account to start ordering industrial gases and managing
            your business.
          </p>

          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                <i className='fa-solid fa-truck'></i>
              </div>
              <div>
                <p className='font-semibold'>Bulk Pricing</p>
                <p className='text-sm text-blue-100'>
                  Volume discounts available
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                <i className='fa-solid fa-chart-line'></i>
              </div>
              <div>
                <p className='font-semibold'>Track Orders</p>
                <p className='text-sm text-blue-100'>
                  Real-time delivery tracking
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                <i className='fa-solid fa-headset'></i>
              </div>
              <div>
                <p className='font-semibold'>Priority Support</p>
                <p className='text-sm text-blue-100'>
                  Dedicated account manager
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 text-sm text-blue-200'>
          © {new Date().getFullYear()} Trojan Trading. All rights reserved.
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8'>
        <div className='max-w-md w-full animate-fade-in'>
          <div className='text-center lg:text-left mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Create Account
            </h2>
            <p className='text-gray-600'>
              Already have an account?{' '}
              <Link
                to='/login'
                state={{ from: location.state?.from, cartData: cartData }}
                className='text-blue-600 hover:text-blue-700 font-semibold hover:underline transition'>
                Sign in
              </Link>
            </p>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
              <div className='flex items-center gap-2'>
                <CheckCircleIcon className='w-5 h-5 text-green-500' />
                <p className='text-sm text-green-800'>{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
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
                Demo: Create a free account with any credentials
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name *
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <UserIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                  placeholder='John Doe'
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address *
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
                Phone Number
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <PhoneIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                  placeholder='+27 12 345 6789'
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password *
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
              <p className='text-xs text-gray-500 mt-1'>Minimum 6 characters</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Confirm Password *
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <LockClosedIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                  placeholder='••••••••'
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showConfirmPassword ? (
                    <EyeSlashIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  ) : (
                    <EyeIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer'
                disabled={isLoading}
              />
              <label className='ml-2 block text-sm text-gray-700 cursor-pointer'>
                I agree to the{' '}
                <Link to='/terms' className='text-blue-600 hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to='/privacy' className='text-blue-600 hover:underline'>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#ABCF42] text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
              {isLoading ? (
                <>
                  <ArrowPathIcon className='w-5 h-5 animate-spin' />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <div className='mt-8 pt-6 border-t border-gray-200'>
            <p className='text-xs text-center text-gray-400'>
              By creating an account, you agree to receive marketing
              communications from Trojan Trading. You can unsubscribe at any
              time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
