// ==================== components/dashboard/OrdersAndActivities.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  TruckIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  success: CheckCircleIcon,
  info: DocumentTextIcon,
  warning: TruckIcon,
  error: ExclamationTriangleIcon,
};

const getActivityIconColor = (type) => {
  const colors = {
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600',
    warning: 'bg-yellow-100 text-yellow-600',
    error: 'bg-red-100 text-red-600',
  };
  return colors[type] || 'bg-gray-100 text-gray-600';
};

const getStatusColor = (status) => {
  const colors = {
    Delivered: 'bg-green-100 text-green-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    Processing: 'bg-amber-100 text-amber-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const OrdersAndActivities = ({ orders, activities }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
      {/* Recent Orders */}
      <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-900'>Recent Orders</h3>
          <Link
            to='/orders'
            className='text-sm text-blue-600 hover:text-blue-700'>
            View All
          </Link>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-[500px]'>
            <thead>
              <tr className='text-xs text-gray-500 border-b border-gray-200'>
                <th className='text-left pb-3'>Order ID</th>
                <th className='text-left pb-3'>Customer</th>
                <th className='text-left pb-3'>Product</th>
                <th className='text-left pb-3'>Status</th>
                <th className='text-left pb-3'>Amount</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {orders.map((order) => (
                <tr key={order.id} className='hover:bg-gray-50 transition'>
                  <td className='py-3 text-sm font-medium'>{order.id}</td>
                  <td className='py-3'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-8 h-8 bg-${order.statusColor}-100 rounded-full flex items-center justify-center text-${order.statusColor}-600 text-xs font-bold`}>
                        {order.initials}
                      </div>
                      <span className='text-sm'>{order.customer}</span>
                    </div>
                  </td>
                  <td className='py-3 text-sm'>{order.product}</td>
                  <td className='py-3'>
                    <span
                      className={`text-xs ${getStatusColor(order.status)} px-2 py-1 rounded-full`}>
                      {order.status}
                    </span>
                  </td>
                  <td className='py-3 text-sm font-medium'>
                    R{order.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Feed */}
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-6'>
          Activity Feed
        </h3>
        <div className='space-y-4'>
          {activities.map((activity) => {
            const IconComponent = iconMap[activity.type] || DocumentTextIcon;
            return (
              <div key={activity.id} className='flex items-start gap-3'>
                <div
                  className={`w-8 h-8 ${getActivityIconColor(activity.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className='w-4 h-4' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>{activity.message}</p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {activity.time} • by {activity.user}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          to='/activities'
          className='block w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium text-center'>
          View All Activity
        </Link>
      </div>
    </div>
  );
};

export default OrdersAndActivities;
