// ==================== components/Navigation.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

// Company colors
const colors = {
  primary: '#A6CE39',
  primaryDark: '#7FBF3F',
  secondary: '#4F86C6',
  secondaryDark: '#2F5597',
  neutral: '#8A8C8E',
};

const Navigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  cartCount,
  setIsCartOpen,
}) => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products', active: true },
    { to: '/industries', label: 'Industries' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link to='/'>
                <h1
                  className='text-2xl font-bold'
                  style={{ color: colors.primaryDark }}>
                  TROJAN
                </h1>
              </Link>
            </div>
            <div className='hidden md:block ml-10'>
              <div className='flex items-center space-x-8'>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 text-sm font-medium transition ${
                      link.active
                        ? 'border-b-2'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                    style={
                      link.active
                        ? {
                            color: colors.primary,
                            borderBottomColor: colors.primary,
                            borderBottomWidth: '2px',
                          }
                        : { '--hover-color': colors.primary }
                    }>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            <button
              onClick={() => setIsCartOpen(true)}
              className='relative transition p-2'
              style={{ color: colors.neutral }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.neutral)
              }>
              <ShoppingCartIcon className='w-6 h-6' />
              {cartCount > 0 && (
                <span
                  className='absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: colors.primary }}>
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to='/login'
              className='px-3 py-2 text-sm font-medium transition'
              style={{ color: colors.neutral }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.neutral)
              }>
              Login
            </Link>
            <Link
              to='/register'
              className='text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg hover:shadow-xl'
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

          <div className='md:hidden flex items-center gap-4'>
            <button
              onClick={() => setIsCartOpen(true)}
              className='relative transition p-2'
              style={{ color: colors.neutral }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.neutral)
              }>
              <ShoppingCartIcon className='w-6 h-6' />
              {cartCount > 0 && (
                <span
                  className='absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: colors.primary }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 transition'
              style={{ color: colors.neutral }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.neutral)
              }>
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

      {/* Mobile menu */}
      <div
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className='px-4 py-3 space-y-2'>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-2 transition ${
                link.active ? 'font-semibold' : ''
              }`}
              style={
                link.active
                  ? { color: colors.primary }
                  : { color: colors.neutral }
              }
              onMouseEnter={(e) => {
                if (!link.active) e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                if (!link.active) e.currentTarget.style.color = colors.neutral;
              }}
              onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className='pt-4 space-y-2'>
            <Link
              to='/login'
              className='block text-center px-4 py-2 rounded-lg transition'
              style={{
                color: colors.neutral,
                border: `1px solid ${colors.neutral}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.neutral;
                e.currentTarget.style.borderColor = `${colors.neutral}40`;
              }}
              onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
            <Link
              to='/register'
              className='block text-center text-white px-4 py-2 rounded-lg transition'
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = colors.primaryDark)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = colors.primary)
              }
              onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Add global styles for hover effects */}
      <style jsx>{`
        .hover\\:text-primary:hover {
          color: ${colors.primary} !important;
        }
        .text-primary {
          color: ${colors.primary};
        }
        .bg-primary {
          background-color: ${colors.primary};
        }
        .border-primary {
          border-color: ${colors.primary};
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
