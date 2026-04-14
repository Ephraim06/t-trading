// ==================== components/dashboard/WelcomeBanner.jsx ====================
import React from 'react';

const WelcomeBanner = ({ userName }) => {
  const firstName = userName?.split(' ')[0] || 'User';

  return (
    <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-2'>
            Welcome back, {firstName}!
          </h2>
          <p className='text-blue-100'>
            Here's your operations overview for today. All systems are
            operational.
          </p>
        </div>
        <div className='mt-4 md:mt-0'>
          <span className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
            <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></div>
            <span className='text-sm'>System Status: Healthy</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
