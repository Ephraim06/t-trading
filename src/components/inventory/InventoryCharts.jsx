// ==================== components/inventory/InventoryCharts.jsx ====================
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const InventoryCharts = ({ products }) => {
  // Category distribution data
  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find((item) => item.name === product.category);
    if (existing) {
      existing.value += product.quantity;
    } else {
      acc.push({ name: product.category, value: product.quantity });
    }
    return acc;
  }, []);

  // Stock status distribution
  const statusData = [
    {
      name: 'In Stock',
      value: products.filter((p) => p.status === 'In Stock').length,
    },
    {
      name: 'Low Stock',
      value: products.filter((p) => p.status === 'Low Stock').length,
    },
    {
      name: 'Critical',
      value: products.filter((p) => p.status === 'Critical').length,
    },
  ];

  // Top products by value
  const topProducts = [...products]
    .sort((a, b) => b.quantity * b.price - a.quantity * a.price)
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      value: p.quantity * p.price,
    }));

  const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
      {/* Category Distribution */}
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Stock by Category
        </h3>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={categoryData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'>
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock Status Distribution */}
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Stock Status Distribution
        </h3>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='value' fill='#3b82f6'>
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products by Value */}
      <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Top Products by Inventory Value
        </h3>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={topProducts} layout='vertical'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis dataKey='name' type='category' width={120} />
              <Tooltip formatter={(value) => `R${value.toLocaleString()}`} />
              <Bar dataKey='value' fill='#3b82f6' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryCharts;
