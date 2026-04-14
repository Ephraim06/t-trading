import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  KeyIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline';
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid';

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

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
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

  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(null);

  // Mock admin credentials - replace with actual API
  const mockAdminCredentials = {
    email: 'admin@trojan.co.za',
    password: 'Admin@2024',
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Handle failed attempts and lockout
  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 5) {
      setIsLocked(true);
      showToast('Too many failed attempts. Please wait 15 minutes.', 'error');

      // Auto-unlock after 15 minutes
      const timer = setTimeout(
        () => {
          setIsLocked(false);
          setAttempts(0);
          showToast('Account unlocked. You can try again.', 'info');
        },
        15 * 60 * 1000,
      );

      setLockTimer(timer);
    } else {
      const remainingAttempts = 5 - newAttempts;
      setError(
        `Invalid credentials. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
      );
    }
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if account is locked
    if (isLocked) {
      setError('Account temporarily locked. Please try again later.');
      return;
    }

    // Validation
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      // const response = await axios.post('/api/admin/login', {
      //   email: formData.email,
      //   password: formData.password,
      //   remember_me: formData.rememberMe,
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - replace with actual API response
      if (
        formData.email === mockAdminCredentials.email &&
        formData.password === mockAdminCredentials.password
      ) {
        // Store admin session
        if (formData.rememberMe) {
          localStorage.setItem('adminRememberToken', btoa(formData.email));
        }

        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminEmail', formData.email);

        showToast('Welcome back, Administrator!', 'success');

        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        handleFailedAttempt();
        showToast('Invalid credentials. Please try again.', 'error');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      showToast('Connection error. Please check your internet.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup lock timer on unmount
  React.useEffect(() => {
    return () => {
      if (lockTimer) clearTimeout(lockTimer);
    };
  }, [lockTimer]);

  // Check for existing admin session
  React.useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800'>
      <style>{animationStyles}</style>

      {/* Toast Notification */}
      {toast && (
        <div className='fixed top-20 right-4 z-50 animate-slide-in-right'>
          <div
            className={`flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : toast.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
            } border rounded-lg p-4 shadow-lg max-w-sm`}>
            {toast.type === 'success' ? (
              <CheckCircleIcon className='w-5 h-5 text-green-500' />
            ) : toast.type === 'error' ? (
              <ExclamationCircleIcon className='w-5 h-5 text-red-500' />
            ) : (
              <ShieldCheckIcon className='w-5 h-5 text-blue-500' />
            )}
            <p className='text-sm font-medium flex-1'>{toast.message}</p>
            <div className='w-16 h-1 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className={`h-full ${
                  toast.type === 'success'
                    ? 'bg-green-500'
                    : toast.type === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                } animate-progress`}></div>
            </div>
          </div>
        </div>
      )}

      <div className='flex min-h-screen'>
        {/* Left Side - Admin Brand Section */}
        <div className='hidden lg:flex lg:w-1/2 bg-[#59B747] relative overflow-hidden'>
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-black/30'></div>
          <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

          {/* Animated Blobs */}
          <div className='absolute top-20 -left-20 w-72 h-72 bg-[#59B747] rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
          <div className='absolute bottom-20 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl'></div>

          {/* Content */}
          <div className='relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white'>
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                  <ShieldCheckSolid className='w-7 h-7 text-white' />
                </div>
                <h1 className='text-3xl font-bold bg-white bg-clip-text text-transparent'>
                  ADMIN PORTAL
                </h1>
              </div>
              <div className='h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'></div>
            </div>

            <h2 className='text-4xl font-bold mb-6'>Administrator Access</h2>
            <p className='text-xl text-gray-300 mb-8 leading-relaxed'>
              Secure login for authorized personnel only. All access is logged
              and monitored.
            </p>

            {/* Security Features */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center'>
                  <FingerPrintIcon className='w-4 h-4 text-blue-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Two-factor authentication available
                </span>
              </div>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center'>
                  <KeyIcon className='w-4 h-4 text-green-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Secure encryption for all data
                </span>
              </div>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
                  <ShieldCheckIcon className='w-4 h-4 text-purple-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Audit logging for compliance
                </span>
              </div>
            </div>

            {/* Support Text */}
            <div className='mt-12 pt-8 border-t border-white/10'>
              <p className='text-sm text-gray-400'>
                Need admin support?{' '}
                <Link
                  to='/contact'
                  className='font-semibold text-blue-400 hover:text-blue-300 transition'>
                  Contact IT Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Admin Login Form */}
        <div className='w-full lg:w-1/2 flex items-center bg-white justify-center px-6 py-12 sm:px-8 lg:px-12'>
          <div className='w-full max-w-md animate-fade-in-up'>
            {/* Mobile Logo */}
            <div className='lg:hidden text-center mb-8'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <ShieldCheckSolid className='w-8 h-8 text-blue-600' />
                <h1 className='text-2xl font-bold bg-[#ABCF42] bg-clip-text text-transparent'>
                  ADMIN PORTAL
                </h1>
              </div>
              <p className='text-sm text-gray-500'>
                Trojan Trading Administration
              </p>
            </div>

            {/* Header */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg mb-4'>
                <ShieldCheckSolid className='w-10 h-10 text-white' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                Admin Login
              </h2>
              <p className='text-gray-600'>
                Sign in to access the administration dashboard
              </p>
            </div>

            {/* Locked State Warning */}
            {isLocked && (
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 mb-6'>
                <div className='flex items-start gap-3'>
                  <ExclamationCircleIcon className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='text-sm font-semibold text-red-800 mb-1'>
                      Account Temporarily Locked
                    </p>
                    <p className='text-sm text-red-700'>
                      Too many failed attempts. Please wait 15 minutes before
                      trying again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Error Message */}
              {error && !isLocked && (
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
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading || isLocked}
                    className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed'
                    placeholder='admin@trojan.co.za'
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <LockClosedIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading || isLocked}
                    className='block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed'
                    placeholder='Enter your password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    disabled={isLoading || isLocked}>
                    {showPassword ? (
                      <EyeSlashIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                    ) : (
                      <EyeIcon className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading || isLocked}
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <span className='ml-2 text-sm text-gray-600'>
                    Remember me
                  </span>
                </label>
                <Link
                  to='/admin/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading || isLocked}
                className='w-full bg-[#ABCF42] text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden'>
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
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className='w-5 h-5' />
                    Access Admin Dashboard
                  </>
                )}
                {isLocked && (
                  <div className='absolute inset-0 bg-gray-500/20 shimmer'></div>
                )}
              </button>
            </form>

            {/* Back to Main Site */}
            <div className='mt-8 text-center'>
              <Link
                to='/login'
                className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group'>
                <ArrowLeftIcon className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
                Back to User Login
              </Link>
            </div>

            {/* Security Notice */}
            <div className='mt-8 pt-6 border-t border-gray-200'>
              <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
                <ShieldCheckIcon className='w-4 h-4' />
                <span>
                  Secure admin area | All activities are logged including the
                  detials you enter on this page
                </span>
              </div>
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
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
