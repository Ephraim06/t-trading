// ==================== components/dashboard/QuickActionsAndProducts.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';

const iconMap = {
  ShoppingCartIcon: ShoppingCartIcon,
  DocumentTextIcon: DocumentTextIcon,
  RocketLaunchIcon: RocketLaunchIcon,
  ChartBarIcon: ChartBarIcon,
  FireIcon: (props) => (
    <svg {...props} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M12 2L15 8H9L12 2zM12 22L9 16H15L12 22z' />
    </svg>
  ),
  BeakerIcon: (props) => (
    <svg {...props} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M7 2H17V4H7V2zM10 6H14V8H10V6zM5 10H19V12H5V10zM4 14H20V16H4V14zM6 18H18V20H6V18z' />
    </svg>
  ),
  CloudIcon: (props) => (
    <svg {...props} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' />
    </svg>
  ),
  BoltIcon: (props) => (
    <svg {...props} viewBox='0 0 24 24' fill='currentColor'>
      <path d='M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z' />
    </svg>
  ),
};

const getColorClasses = (color) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-200',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      hover: 'hover:bg-indigo-200',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      hover: 'hover:bg-purple-200',
    },
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      hover: 'hover:bg-emerald-200',
    },
  };
  return colorMap[color] || colorMap.blue;
};

const QuickActionsAndProducts = ({ products }) => {
  const quickActions = [
    {
      icon: ShoppingCartIcon,
      label: 'New Order',
      description: 'Create purchase order',
      color: 'blue',
    },
    {
      icon: DocumentTextIcon,
      label: 'Generate Invoice',
      description: 'Create new invoice',
      color: 'indigo',
    },
    {
      icon: RocketLaunchIcon,
      label: 'Schedule Delivery',
      description: 'Arrange shipment',
      color: 'purple',
    },
    {
      icon: ChartBarIcon,
      label: 'Run Report',
      description: 'Generate analytics',
      color: 'emerald',
    },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      {/* Quick Actions */}
      <div className='lg:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Quick Actions
        </h3>
        <div className='space-y-3'>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            const colorClasses = getColorClasses(action.color);
            return (
              <button
                key={action.label}
                className='w-full flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-xl transition group'>
                <div
                  className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center group-hover:${colorClasses.hover} transition`}>
                  <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
                </div>
                <div>
                  <p className='text-sm font-medium'>{action.label}</p>
                  <p className='text-xs text-gray-500'>{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Products */}
      <div className='lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Top Selling Products
          </h3>
          <Link
            to='/products'
            className='text-sm text-blue-600 hover:text-blue-700'>
            View All
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {products.map((product) => {
            const IconComponent = iconMap[product.icon] || iconMap.FireIcon;
            return (
              <div
                key={product.name}
                className='bg-gray-50 rounded-xl p-4 hover:shadow-md transition'>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-lg flex items-center justify-center mb-3`}>
                  <IconComponent className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-semibold text-gray-900'>{product.name}</h4>
                <p className='text-xs text-gray-500 mt-1'>{product.grade}</p>
                <div className='flex items-center justify-between mt-3'>
                  <span className='text-sm font-bold text-gray-900'>
                    R{product.price}
                  </span>
                  <span className='text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full'>
                    +{product.sold} sold
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsAndProducts;
