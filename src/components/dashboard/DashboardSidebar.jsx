// ==================== components/dashboard/DashboardSidebar.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChartPieIcon,
  CubeIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ScaleIcon,
  UsersIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const DashboardSidebar = ({ isOpen, onClose, user, onLogout }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const mainNavItems = [
    {
      icon: ChartPieIcon,
      label: 'Dashboard',
      active: true,
      href: '/dashboard',
    },
    { icon: CubeIcon, label: 'Inventory', href: '/inventory' },
    { icon: TruckIcon, label: 'Orders', href: '/orders', badge: 12 },
    { icon: BuildingStorefrontIcon, label: 'Warehouse', href: '/warehouse' },
    { icon: DocumentTextIcon, label: 'Invoices', href: '/invoices' },
  ];

  const analyticsNavItems = [
    { icon: ChartBarIcon, label: 'Reports', href: '/reports' },
    { icon: ArrowTrendingUpIcon, label: 'Forecasting', href: '/forecasting' },
    { icon: ScaleIcon, label: 'Compliance', href: '/compliance' },
  ];

  const managementNavItems = [
    { icon: UsersIcon, label: 'Customers', href: '/customers' },
    { icon: UserGroupIcon, label: 'Suppliers', href: '/suppliers' },
    { icon: Cog6ToothIcon, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Sidebar Header */}
      <div className='p-6 border-b border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>
              TROJAN FORGE
            </h2>
            <p className='text-xs text-gray-400 mt-1'>
              Operations Platform v2.0
            </p>
          </div>
          <button
            onClick={onClose}
            className='lg:hidden text-gray-400 hover:text-white'>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>
      </div>

      {/* User Info (Mobile) */}
      {user && (
        <div className='p-6 border-b border-gray-700 lg:hidden'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-[#ABCF42] rounded-xl flex items-center justify-center text-white font-bold text-lg'>
              {getInitials(user.name)}
            </div>
            <div>
              <p className='font-semibold'>{user.name}</p>
              <p className='text-xs text-gray-400'>Operations Manager</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className='p-4'>
        <div className='mb-6'>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2'>
            Main
          </p>
          <ul className='space-y-1'>
            {mainNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}>
                  <item.icon className='w-5 h-5' />
                  <span className='text-sm font-medium'>{item.label}</span>
                  {item.badge && (
                    <span className='ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full'>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-6'>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2'>
            Analytics
          </p>
          <ul className='space-y-1'>
            {analyticsNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className='flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-xl transition-all duration-200'>
                  <item.icon className='w-5 h-5' />
                  <span className='text-sm font-medium'>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-6'>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2'>
            Management
          </p>
          <ul className='space-y-1'>
            {managementNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className='flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 rounded-xl transition-all duration-200'>
                  <item.icon className='w-5 h-5' />
                  <span className='text-sm font-medium'>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sidebar Footer */}
      {user && (
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-[#ABCF42] rounded-lg flex items-center justify-center text-white font-semibold'>
              {getInitials(user.name)}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold truncate'>{user.name}</p>
              <p className='text-xs text-gray-400 truncate'>{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className='text-gray-400 hover:text-white transition'>
              <ArrowRightOnRectangleIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
