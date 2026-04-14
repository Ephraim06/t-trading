// ==================== components/dashboard/ChartsSection.jsx ====================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ChartsSection = ({ revenueData, inventoryData }) => {
  const [chartPeriod, setChartPeriod] = useState('weekly');

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
      {/* Revenue Chart */}
      <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-3 sm:mb-0'>
            Revenue Overview
          </h3>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setChartPeriod('weekly')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                chartPeriod === 'weekly'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}>
              Weekly
            </button>
            <button
              onClick={() => setChartPeriod('monthly')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                chartPeriod === 'monthly'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setChartPeriod('yearly')}
              className={`px-3 py-1 text-xs rounded-full transition ${
                chartPeriod === 'yearly'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}>
              Yearly
            </button>
          </div>
        </div>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='current' fill='#3b82f6' name='2026' />
              <Bar dataKey='previous' fill='#93c5fd' name='2025' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Status */}
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Inventory Status
        </h3>
        <div className='space-y-4'>
          {inventoryData.map((item) => (
            <div key={item.name}>
              <div className='flex justify-between text-sm mb-1'>
                <span className='text-gray-600'>{item.name}</span>
                <span className='font-medium'>{item.percentage}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='h-2 rounded-full transition-all duration-500'
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}></div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to='/inventory'
          className='block w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium text-center'>
          View Detailed Inventory
        </Link>
      </div>
    </div>
  );
};

export default ChartsSection;
