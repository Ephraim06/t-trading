import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.3s ease-out forwards;
  }

  .animate-progress {
    animation: progress 3s linear forwards;
  }

  .animate-pulse-slow {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  // Mock API call - replace with actual API integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      // const response = await axios.post('/api/forgot-password', { email });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success
      setIsSubmitted(true);
      showToast('Password reset link sent to your email!', 'success');

      // Optional: Clear form after success
      setEmail('');
    } catch (err) {
      setError('Unable to process request. Please try again.');
      showToast('Failed to send reset link. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Resend reset link
  const handleResend = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Reset link resent successfully!', 'success');
    } catch (err) {
      showToast('Failed to resend. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <style>{animationStyles}</style>

      {/* Toast Notification */}
      {toast && (
        <div className='fixed top-20 right-4 z-50 animate-slide-in-right'>
          <div
            className={`flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            } border rounded-lg p-4 shadow-lg max-w-sm`}>
            {toast.type === 'success' ? (
              <CheckCircleIcon className='w-5 h-5 text-green-500' />
            ) : (
              <ExclamationCircleIcon className='w-5 h-5 text-red-500' />
            )}
            <p className='text-sm font-medium flex-1'>{toast.message}</p>
            <div className='w-16 h-1 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className={`h-full ${
                  toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } animate-progress`}></div>
            </div>
          </div>
        </div>
      )}

      <div className='flex min-h-screen'>
        {/* Left Side - Brand Section */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden'>
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>

          {/* Animated Blobs */}
          <div className='absolute top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
          <div className='absolute bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>

          {/* Content */}
          <div className='relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white'>
            <div className='mb-8'>
              <Link to='/' className='inline-block'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                  TROJAN
                </h1>
              </Link>
            </div>

            <h2 className='text-4xl font-bold mb-6'>Reset Your Password</h2>
            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            {/* Features List */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6-4h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10-4V6a2 2 0 00-2-2H8a2 2 0 00-2 2v3'
                    />
                  </svg>
                </div>
                <span className='text-sm text-blue-100'>
                  Secure password reset link
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <span className='text-sm text-blue-100'>
                  Instant email delivery
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <span className='text-sm text-blue-100'>
                  Link expires in 24 hours
                </span>
              </div>
            </div>

            {/* Support Text */}
            <div className='mt-12 pt-8 border-t border-white/20'>
              <p className='text-sm text-blue-200'>
                Need help?{' '}
                <Link
                  to='/contact'
                  className='font-semibold underline hover:text-white transition'>
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className='w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8 lg:px-12'>
          <div className='w-full max-w-md animate-fade-in-up'>
            {/* Mobile Logo */}
            <div className='lg:hidden text-center mb-8'>
              <Link to='/'>
                <h1 className='text-3xl font-bold bg-[#ABCF42] bg-clip-text text-transparent'>
                  TROJAN
                </h1>
              </Link>
            </div>

            {/* Header */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <EnvelopeIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                Forgot Password?
              </h2>
              <p className='text-gray-600'>
                No worries! Enter your email and we'll send you reset
                instructions.
              </p>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className='bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center'>
                <CheckCircleIcon className='w-12 h-12 text-green-500 mx-auto mb-3' />
                <h3 className='text-lg font-semibold text-green-800 mb-2'>
                  Check Your Email
                </h3>
                <p className='text-sm text-green-700 mb-4'>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className='text-sm text-green-700 hover:text-green-800 font-medium underline'>
                  Didn't receive the email? Click to resend
                </button>
              </div>
            ) : (
              /* Forgot Password Form */
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Error Message */}
                {error && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <div className='flex items-center gap-2'>
                      <ExclamationCircleIcon className='w-5 h-5 text-red-500' />
                      <p className='text-sm text-red-700'>{error}</p>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      placeholder='you@example.com'
                      disabled={isLoading}
                    />
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    We'll send a password reset link to this email
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-[#ABCF42] text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <svg
                        className='animate-spin h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'>
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className='w-5 h-5' />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            <div className='mt-8 text-center'>
              <Link
                to='/login'
                className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group'>
                <ArrowLeftIcon className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
                Back to Login
              </Link>
            </div>

            {/* Help Text */}
            <div className='mt-8 pt-6 border-t border-gray-200 text-center'>
              <p className='text-xs text-gray-500'>
                By continuing, you agree to our{' '}
                <Link to='/terms' className='text-blue-600 hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to='/privacy' className='text-blue-600 hover:underline'>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Animation Styles */}
      <style>{`
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
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
