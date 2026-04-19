// ==================== components/Navigation.jsx ====================
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartSolid } from '@heroicons/react/24/solid';

// Company colors
const colors = {
  primary: '#A6CE39',
  primaryDark: '#7FBF3F',
  secondary: '#4F86C6',
  secondaryDark: '#2F5597',
  neutral: '#8A8C8E',
  dark: '#1F2937',
};

const Navigation = ({ cartCount = 0, setIsCartOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/industries', label: 'Industries' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  // Check if link is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        } border-b border-gray-100`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 lg:h-20'>
            {/* Logo Section */}
            <div className='flex items-center'>
              <Link
                to='/'
                className='flex-shrink-0 transition-transform hover:scale-105 duration-200'>
                <h1 className='text-2xl lg:text-3xl font-extrabold tracking-tight'>
                  <span style={{ color: colors.primaryDark }}>TROJAN</span>
                  <span style={{ color: colors.secondary }}> Trading</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center space-x-1'>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive(link.to)
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  {link.label}
                  {isActive(link.to) && (
                    <span
                      className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full'
                      style={{ backgroundColor: colors.primary }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className='hidden lg:flex items-center space-x-4'>
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className='p-2 rounded-full transition-all duration-200 hover:bg-gray-100'
                style={{ color: colors.neutral }}>
                <MagnifyingGlassIcon className='w-5 h-5' />
              </button>

              {/* Wishlist */}
              <Link
                to='/wishlist'
                className='p-2 rounded-full transition-all duration-200 hover:bg-gray-100'
                style={{ color: colors.neutral }}>
                <HeartIcon className='w-5 h-5' />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className='relative p-2 rounded-full transition-all duration-200 hover:bg-gray-100 group'>
                <ShoppingCartIcon
                  className='w-5 h-5'
                  style={{ color: colors.neutral }}
                />
                {cartCount > 0 && (
                  <span
                    className='absolute -top-1 -right-1 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-pulse'
                    style={{ backgroundColor: colors.primary }}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Auth Buttons */}
              <div className='flex items-center gap-2 ml-2'>
                <Link
                  to='/login'
                  className='px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100'
                  style={{ color: colors.neutral }}>
                  Sign In
                </Link>
                <Link
                  to='/register'
                  className='px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  style={{ backgroundColor: colors.primary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.primaryDark)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.primary)
                  }>
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile Right Section */}
            <div className='flex lg:hidden items-center gap-2'>
              {/* Mobile Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className='relative p-2 rounded-full transition-all duration-200'
                style={{ color: colors.neutral }}>
                <ShoppingCartIcon className='w-6 h-6' />
                {cartCount > 0 && (
                  <span
                    className='absolute -top-1 -right-1 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1'
                    style={{ backgroundColor: colors.primary }}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='p-2 rounded-lg transition-all duration-200 hover:bg-gray-100'
                style={{ color: colors.neutral }}>
                {mobileMenuOpen ? (
                  <XMarkIcon className='w-6 h-6' />
                ) : (
                  <Bars3Icon className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {searchOpen && (
            <div className='absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slide-down z-40'>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                <div className='relative'>
                  <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Search products...'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50'
                    style={{ focusRingColor: colors.primary }}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className='fixed inset-0 z-40 lg:hidden'>
            {/* Backdrop */}
            <div
              className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div className='absolute top-16 left-0 right-0 bg-white shadow-xl animate-slide-down'>
              <div className='max-h-[calc(100vh-4rem)] overflow-y-auto'>
                {/* Mobile Navigation Links */}
                <div className='p-4 space-y-1'>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(link.to)
                          ? 'bg-gray-50 font-semibold'
                          : 'hover:bg-gray-50'
                      }`}
                      style={
                        isActive(link.to)
                          ? { color: colors.primary }
                          : { color: colors.dark }
                      }
                      onClick={() => setMobileMenuOpen(false)}>
                      <span>{link.label}</span>
                      {isActive(link.to) && (
                        <span
                          className='w-1.5 h-1.5 rounded-full'
                          style={{ backgroundColor: colors.primary }}
                        />
                      )}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className='border-t border-gray-100 my-2' />

                {/* Mobile Action Buttons */}
                <div className='p-4 space-y-2'>
                  <Link
                    to='/wishlist'
                    className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200'
                    style={{ color: colors.dark }}
                    onClick={() => setMobileMenuOpen(false)}>
                    <HeartIcon
                      className='w-5 h-5'
                      style={{ color: colors.neutral }}
                    />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to='/login'
                    className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200'
                    style={{ color: colors.dark }}
                    onClick={() => setMobileMenuOpen(false)}>
                    <UserIcon
                      className='w-5 h-5'
                      style={{ color: colors.neutral }}
                    />
                    <span>Sign In</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-100 my-2' />

                {/* Mobile Auth Buttons */}
                <div className='p-4 space-y-3'>
                  <Link
                    to='/register'
                    className='block text-center text-white py-3 rounded-xl font-semibold transition-all duration-200'
                    style={{ backgroundColor: colors.primary }}
                    onClick={() => setMobileMenuOpen(false)}>
                    Create Account
                  </Link>
                  <p className='text-center text-xs text-gray-500'>
                    By continuing, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: pulse 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navigation;
