// ==================== components/dashboard/KPICards.jsx ====================
import React from 'react';
import {
  CubeIcon,
  TruckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const KPICards = ({ data }) => {
  const cards = [
    {
      icon: CubeIcon,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Total Products',
      value: data.totalProducts.toLocaleString(),
      growth: `+${data.productsGrowth}%`,
      progress: 75,
    },
    {
      icon: TruckIcon,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      title: 'Active Orders',
      value: data.activeOrders,
      growth: '+8.2%',
      subtitle: `${data.ordersInTransit} in transit`,
    },
    {
      icon: ChartBarIcon,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Monthly Revenue',
      value: `R${data.monthlyRevenue.toLocaleString()}`,
      growth: '+23.1%',
      subtitle: `Target: R${data.revenueTarget.toLocaleString()} (${Math.round((data.monthlyRevenue / data.revenueTarget) * 100)}% achieved)`,
    },
    {
      icon: ExclamationTriangleIcon,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Pending Alerts',
      value: data.pendingAlerts,
      growth: '-2',
      alerts: [
        { color: 'red', message: 'Low oxygen levels - Bay 4' },
        { color: 'yellow', message: 'Maintenance due - Tank 7' },
      ],
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {cards.map((card, index) => (
        <div
          key={index}
          className='bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100'>
          <div className='flex items-center justify-between mb-4'>
            <div
              className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <span
              className={`text-xs font-semibold ${card.growth.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-full`}>
              {card.growth}
            </span>
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>{card.value}</h3>
            <p className='text-sm text-gray-500 mt-1'>{card.title}</p>
          </div>
          {card.progress && (
            <div className='mt-3 w-full bg-gray-200 rounded-full h-1.5'>
              <div
                className='bg-blue-600 h-1.5 rounded-full'
                style={{ width: `${card.progress}%` }}></div>
            </div>
          )}
          {card.subtitle && (
            <p className='text-xs text-gray-500 mt-2'>{card.subtitle}</p>
          )}
          {card.alerts && (
            <div className='mt-3 space-y-1'>
              {card.alerts.map((alert, i) => (
                <div key={i} className='flex items-center gap-2 text-xs'>
                  <div
                    className={`w-2 h-2 bg-${alert.color}-500 rounded-full`}></div>
                  <span className='text-gray-600'>{alert.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default KPICards;
