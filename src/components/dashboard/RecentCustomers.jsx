// ==================== components/dashboard/RecentCustomers.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';

const getColorClasses = (color) => {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  };
  return colorMap[color] || colorMap.blue;
};

const RecentCustomers = ({ customers }) => {
  return (
    <div className='mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Recent Customers
        </h3>
        <Link
          to='/customers'
          className='text-sm text-blue-600 hover:text-blue-700'>
          View All
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {customers.map((customer) => {
          const colorClasses = getColorClasses(customer.color);
          return (
            <div
              key={customer.name}
              className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition'>
              <div
                className={`w-10 h-10 ${colorClasses.bg} rounded-full flex items-center justify-center ${colorClasses.text} font-bold`}>
                {customer.initials}
              </div>
              <div>
                <p className='text-sm font-semibold'>{customer.name}</p>
                <p className='text-xs text-gray-500'>
                  Last order: {customer.lastOrder}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCustomers;
