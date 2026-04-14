// ==================== components/dashboard/FooterStats.jsx ====================
import React from 'react';
import {
  TruckIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  TruckIcon: TruckIcon,
  CheckCircleIcon: CheckCircleIcon,
  Cog6ToothIcon: Cog6ToothIcon,
  ChartBarIcon: ChartBarIcon,
};

const FooterStats = ({ stats }) => {
  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.icon] || TruckIcon;
        return (
          <div
            key={stat.label}
            className='bg-white rounded-lg p-4 border border-gray-100'>
            <div className='flex items-center gap-2 text-gray-600 mb-1'>
              <IconComponent className='w-4 h-4 text-blue-500' />
              <span className='text-xs'>{stat.label}</span>
            </div>
            <p className='text-xl font-bold text-gray-900'>{stat.value}</p>
            <p
              className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {stat.change} vs last month
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FooterStats;
