import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  XMarkIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  UserIcon,
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

  @keyframes slideInUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
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

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.3s ease-out forwards;
  }

  .animate-slide-in-up {
    animation: slideInUp 0.4s ease-out forwards;
  }

  .animate-progress {
    animation: progress 3s linear forwards;
  }

  .animate-pulse-slow {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('request'); // 'request', 'verify', 'reset', 'success'
  const [resetToken, setResetToken] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: '',
  });

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const metCount = Object.values(requirements).filter(Boolean).length;

    let score = 0;
    let feedback = '';

    if (password.length === 0) {
      score = 0;
      feedback = '';
    } else if (metCount <= 2) {
      score = 1;
      feedback = 'Weak password - add more variety';
    } else if (metCount === 3) {
      score = 2;
      feedback = 'Fair password - could be stronger';
    } else if (metCount === 4) {
      score = 3;
      feedback = 'Good password!';
    } else {
      score = 4;
      feedback = 'Strong password! Excellent security';
    }

    setPasswordStrength({ score, feedback, requirements });
  };

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Handle verification code input
  const handleVerificationCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear error when typing
    if (error) setError('');
  };

  // Handle key press for verification code
  const handleKeyPress = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Step 1: Request reset link
  const handleRequestReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your admin email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Replace with actual API call
      // const response = await axios.post('/api/admin/forgot-password', { email });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success - generate verification code
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Verification code:', mockCode); // In production, this would be sent via email

      showToast('Verification code sent to your email!', 'success');
      setModalStep('verify');
      setCountdown(60); // Start 60-second countdown
    } catch (err) {
      setError('Unable to process request. Please try again.');
      showToast('Failed to send reset link. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Replace with actual API call
      // const response = await axios.post('/api/admin/verify-reset-code', {
      //   email,
      //   code,
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock verification - accept any 6-digit code for demo
      if (code.length === 6) {
        setResetToken('mock-reset-token-' + Date.now());
        setModalStep('reset');
        showToast('Verification successful! Create a new password.', 'success');
      } else {
        setError('Invalid verification code. Please try again.');
        showToast('Invalid verification code', 'error');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
      showToast('Verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('New verification code sent!', 'success');
      setCountdown(60);
    } catch (err) {
      showToast('Failed to resend code. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate password
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError('Password must contain at least one number');
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setError('Password must contain at least one special character');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Replace with actual API call
      // const response = await axios.post('/api/admin/reset-password', {
      //   email,
      //   token: resetToken,
      //   password: formData.password,
      //   password_confirmation: formData.password_confirmation,
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setModalStep('success');
      showToast('Password reset successful!', 'success');

      // Auto close modal and redirect after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/admin/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      showToast('Password reset failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getStrengthWidth = () => {
    return `${(passwordStrength.score / 4) * 100}%`;
  };

  // Handle input change for password
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    if (error) setError('');
  };

  // Modal content renderer
  const renderModalContent = () => {
    switch (modalStep) {
      case 'verify':
        return (
          <div className='animate-fade-in'>
            <div className='text-center mb-6'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <DevicePhoneMobileIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Verify Your Identity
              </h3>
              <p className='text-gray-600'>
                Enter the 6-digit verification code sent to
              </p>
              <p className='text-sm font-medium text-gray-700 mt-1'>{email}</p>
            </div>

            <form onSubmit={handleVerifyCode} className='space-y-6'>
              {/* Verification Code Input */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3 text-center'>
                  Verification Code
                </label>
                <div className='flex justify-center gap-2 sm:gap-3'>
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type='text'
                      maxLength='1'
                      value={digit}
                      onChange={(e) =>
                        handleVerificationCodeChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyPress(index, e)}
                      className='w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {error && (
                  <p className='mt-3 text-sm text-red-600 text-center'>
                    {error}
                  </p>
                )}
              </div>

              {/* Resend Code */}
              <div className='text-center'>
                <button
                  type='button'
                  onClick={handleResendCode}
                  disabled={countdown > 0 || isLoading}
                  className='text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed'>
                  {countdown > 0
                    ? `Resend code in ${countdown}s`
                    : 'Resend verification code'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setModalStep('request');
                    setVerificationCode(['', '', '', '', '', '']);
                    setError('');
                  }}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition'>
                  Back
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='flex-1 bg-[#ABCF42] text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <svg
                        className='animate-spin h-4 w-4'
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
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </div>
            </form>
          </div>
        );

      case 'reset':
        return (
          <div className='animate-fade-in'>
            <div className='text-center mb-6'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <KeyIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Create New Password
              </h3>
              <p className='text-gray-600'>
                Choose a strong password for your admin account
              </p>
            </div>

            <form onSubmit={handleResetPassword} className='space-y-5'>
              {/* New Password */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  New Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <LockClosedIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className='block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter new password'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    {showPassword ? (
                      <EyeSlashIcon className='h-5 w-5 text-gray-400' />
                    ) : (
                      <EyeIcon className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <div className='mt-3 space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-gray-600'>Password strength</span>
                      <span
                        className={`font-medium ${
                          passwordStrength.score === 1
                            ? 'text-red-600'
                            : passwordStrength.score === 2
                              ? 'text-yellow-600'
                              : passwordStrength.score === 3
                                ? 'text-blue-600'
                                : passwordStrength.score === 4
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                        }`}>
                        {passwordStrength.feedback}
                      </span>
                    </div>
                    <div className='w-full h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: getStrengthWidth() }}></div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 text-xs'>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.requirements.length
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                        {passwordStrength.requirements.length ? (
                          <CheckCircleIcon className='w-3 h-3' />
                        ) : (
                          <XMarkIcon className='w-3 h-3' />
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.requirements.uppercase
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                        {passwordStrength.requirements.uppercase ? (
                          <CheckCircleIcon className='w-3 h-3' />
                        ) : (
                          <XMarkIcon className='w-3 h-3' />
                        )}
                        <span>Uppercase</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.requirements.lowercase
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                        {passwordStrength.requirements.lowercase ? (
                          <CheckCircleIcon className='w-3 h-3' />
                        ) : (
                          <XMarkIcon className='w-3 h-3' />
                        )}
                        <span>Lowercase</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.requirements.number
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                        {passwordStrength.requirements.number ? (
                          <CheckCircleIcon className='w-3 h-3' />
                        ) : (
                          <XMarkIcon className='w-3 h-3' />
                        )}
                        <span>Number</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 col-span-2 ${
                          passwordStrength.requirements.special
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                        {passwordStrength.requirements.special ? (
                          <CheckCircleIcon className='w-3 h-3' />
                        ) : (
                          <XMarkIcon className='w-3 h-3' />
                        )}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <LockClosedIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handlePasswordChange}
                    className='block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Confirm new password'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    {showConfirmPassword ? (
                      <EyeSlashIcon className='h-5 w-5 text-gray-400' />
                    ) : (
                      <EyeIcon className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => {
                    setModalStep('verify');
                    setFormData({ password: '', password_confirmation: '' });
                    setError('');
                  }}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition'>
                  Back
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='flex-1 bg-[#ABCF42] text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <svg
                        className='animate-spin h-4 w-4'
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
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        );

      case 'success':
        return (
          <div className='text-center animate-fade-in'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4'>
              <CheckCircleIcon className='w-10 h-10 text-green-600' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>
              Password Reset Successful!
            </h3>
            <p className='text-gray-600 mb-6'>
              Your admin password has been successfully reset. You can now log
              in with your new password.
            </p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                navigate('/admin/login');
              }}
              className='w-full bg-[#ABCF42] text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition'>
              Go to Admin Login
            </button>
          </div>
        );

      default: // request
        return (
          <div className='animate-fade-in'>
            <div className='text-center mb-6'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                <EnvelopeIcon className='w-8 h-8 text-blue-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Forgot Admin Password?
              </h3>
              <p className='text-gray-600'>
                Enter your admin email address and we'll send you a verification
                code
              </p>
            </div>

            <form onSubmit={handleRequestReset} className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Admin Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='admin@trojan.co.za'
                    disabled={isLoading}
                  />
                </div>
                {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#ABCF42] text-white py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 flex items-center justify-center gap-2'>
                {isLoading ? (
                  <>
                    <svg
                      className='animate-spin h-5 w-5'
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
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          </div>
        );
    }
  };

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
        {/* Left Side - Admin Brand Section */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden'>
          <div className='absolute inset-0 bg-black/30'></div>
          <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

          <div className='absolute top-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
          <div className='absolute bottom-20 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>

          <div className='relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white'>
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                  <ShieldCheckSolid className='w-7 h-7 text-white' />
                </div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>
                  ADMIN PORTAL
                </h1>
              </div>
              <div className='h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'></div>
            </div>

            <h2 className='text-4xl font-bold mb-6'>Reset Admin Password</h2>
            <p className='text-xl text-gray-300 mb-8 leading-relaxed'>
              Secure password recovery for authorized administrators.
            </p>

            {/* Security Features */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center'>
                  <FingerPrintIcon className='w-4 h-4 text-blue-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Two-factor authentication verification
                </span>
              </div>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center'>
                  <KeyIcon className='w-4 h-4 text-green-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Secure password reset process
                </span>
              </div>
              <div className='flex items-center gap-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm'>
                <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
                  <ShieldCheckIcon className='w-4 h-4 text-purple-400' />
                </div>
                <span className='text-sm text-gray-300'>
                  Audit logging for security
                </span>
              </div>
            </div>

            {/* Support Text */}
            <div className='mt-12 pt-8 border-t border-white/10'>
              <p className='text-sm text-gray-400'>
                Need help?{' '}
                <Link
                  to='/contact'
                  className='font-semibold text-blue-400 hover:text-blue-300 transition'>
                  Contact IT Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className='w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-12 sm:px-8 lg:px-12'>
          <div className='w-full max-w-md'>
            {/* Mobile Logo */}
            <div className='lg:hidden text-center mb-8'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <ShieldCheckSolid className='w-8 h-8 text-blue-600' />
                <h1 className='text-2xl font-bold bg-[#ABCF42] bg-clip-text text-transparent'>
                  ADMIN PORTAL
                </h1>
              </div>
              <p className='text-sm text-gray-400'>
                Trojan Trading Administration
              </p>
            </div>

            {/* Forgot Password Card */}
            <div className='bg-white p-8 animate-fade-in-up'>
              <div className='text-center mb-6'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4'>
                  <KeyIcon className='w-8 h-8 text-blue-600' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Forgot Password?
                </h2>
                <p className='text-gray-600'>
                  Enter your email to reset your admin password
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRequestReset} className='space-y-5'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Admin Email Address
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      placeholder='admin@trojan.co.za'
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-[#ABCF42] text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                  {isLoading ? (
                    <>
                      <svg
                        className='animate-spin h-5 w-5'
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
                    'Send Reset Instructions'
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className='mt-6 text-center'>
                <Link
                  to='/admin/login'
                  className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group'>
                  <ArrowLeftIcon className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
                  Back to Admin Login
                </Link>
              </div>

              {/* Security Notice */}
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
                  <ShieldCheckIcon className='w-4 h-4' />
                  <span>Secure admin recovery | Multi-step verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div
              className='fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity'
              onClick={() => {
                if (modalStep !== 'success') {
                  setIsModalOpen(false);
                  setModalStep('request');
                  setVerificationCode(['', '', '', '', '', '']);
                  setFormData({ password: '', password_confirmation: '' });
                  setError('');
                }
              }}></div>

            <div className='relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-in-up'>
              <button
                onClick={() => {
                  if (modalStep !== 'success') {
                    setIsModalOpen(false);
                    setModalStep('request');
                    setVerificationCode(['', '', '', '', '', '']);
                    setFormData({ password: '', password_confirmation: '' });
                    setError('');
                  }
                }}
                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition'>
                <XMarkIcon className='w-6 h-6' />
              </button>

              {renderModalContent()}
            </div>
          </div>
        </div>
      )}

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

export default AdminForgotPassword;
