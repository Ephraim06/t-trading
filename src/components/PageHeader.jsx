// ==================== components/PageHeader.jsx ====================
import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className='bg-[#ABCF42] text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold mb-4'>{title}</h1>
        <p className='text-xl text-blue-100'>{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
