// ==================== components/inventory/InventoryStats.jsx ====================
import React from 'react';
import {
  CubeIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const InventoryStats = ({ stats }) => {
  const statCards = [
    {
      icon: CubeIcon,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: CurrencyDollarIcon,
      label: 'Inventory Value',
      value: `R${stats.totalValue.toLocaleString()}`,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: ExclamationTriangleIcon,
      label: 'Low Stock Items',
      value: stats.lowStockCount,
      color: 'amber',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      warning: true,
    },
    {
      icon: ExclamationTriangleIcon,
      label: 'Out of Stock',
      value: stats.outOfStockCount,
      color: 'red',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      warning: true,
    },
    {
      icon: BuildingStorefrontIcon,
      label: 'Categories',
      value: stats.categories,
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
      {statCards.map((stat, index) => (
        <div
          key={index}
          className='bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100'>
          <div className='flex items-center justify-between mb-3'>
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            {stat.warning &&
              stats[stat.label.toLowerCase().replace(' ', '')] > 0 && (
                <span className='text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full'>
                  Action Needed
                </span>
              )}
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
            <p className='text-sm text-gray-500 mt-1'>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;
